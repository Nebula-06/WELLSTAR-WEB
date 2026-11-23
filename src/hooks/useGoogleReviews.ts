import { useEffect, useState } from "react";
import { GOOGLE_MAPS_API_KEY, GOOGLE_PLACE_ID, type Testimonial } from "@/data/site";

export type GoogleReviewsState = {
  live: boolean;
  rating?: number;
  count?: number;
  reviews: Testimonial[];
};

type PlaceReview = {
  rating?: number | null;
  text?: string | null;
  relativePublishTimeDescription?: string | null;
  authorAttribution?: { displayName?: string | null; uri?: string | null } | null;
};

type PlaceInstance = {
  rating?: number | null;
  userRatingCount?: number | null;
  reviews?: PlaceReview[] | null;
  fetchFields(options: { fields: string[] }): Promise<unknown>;
};

type PlacesLibrary = { Place: new (options: { id: string }) => PlaceInstance };

type GoogleMapsGlobal = {
  maps?: { importLibrary?: (name: string) => Promise<unknown> };
};

let mapsScript: Promise<void> | null = null;

/** Loads the Maps JavaScript API once (official script URL, async loading). */
function loadMapsApi(apiKey: string) {
  if (mapsScript) return mapsScript;
  mapsScript = new Promise<void>((resolve, reject) => {
    const callbackName = "__wellstarMapsReady";
    (window as unknown as Record<string, () => void>)[callbackName] = () => resolve();
    const script = document.createElement("script");
    const params = new URLSearchParams({ key: apiKey, v: "weekly", loading: "async", callback: callbackName });
    script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    script.async = true;
    script.onerror = () => {
      mapsScript = null;
      reject(new Error("Google Maps JavaScript API could not load."));
    };
    document.head.append(script);
  });
  return mapsScript;
}

async function fetchGoogleReviews(): Promise<GoogleReviewsState> {
  await loadMapsApi(GOOGLE_MAPS_API_KEY);
  const google = (window as unknown as { google?: GoogleMapsGlobal }).google;
  const importLibrary = google?.maps?.importLibrary;
  if (!importLibrary) throw new Error("Google Maps importLibrary unavailable.");

  const { Place } = (await importLibrary("places")) as PlacesLibrary;
  const place = new Place({ id: GOOGLE_PLACE_ID });
  await place.fetchFields({ fields: ["rating", "userRatingCount", "reviews"] });

  const reviews: Testimonial[] = (place.reviews ?? [])
    .filter((review) => review.text && review.authorAttribution?.displayName)
    .map((review) => ({
      name: review.authorAttribution?.displayName ?? "Google user",
      quote: review.text ?? "",
      rating: review.rating ?? undefined,
      when: review.relativePublishTimeDescription ?? undefined,
      url: review.authorAttribution?.uri ?? undefined,
    }));

  return {
    live: true,
    rating: place.rating ?? undefined,
    count: place.userRatingCount ?? undefined,
    reviews,
  };
}

/**
 * Live Google rating + reviews when VITE_GOOGLE_MAPS_API_KEY and VITE_GOOGLE_PLACE_ID are set;
 * otherwise (or on any error) returns the curated fallback reviews.
 */
export function useGoogleReviews(fallback: Testimonial[]): GoogleReviewsState {
  const [state, setState] = useState<GoogleReviewsState>({ live: false, reviews: fallback });

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY || !GOOGLE_PLACE_ID) return;
    let cancelled = false;
    fetchGoogleReviews()
      .then((result) => {
        if (!cancelled && result.reviews.length > 0) setState(result);
      })
      .catch((error: unknown) => {
        console.warn("[Wellstar] Falling back to curated reviews:", error);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
