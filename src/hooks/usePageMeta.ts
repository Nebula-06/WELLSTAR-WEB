import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { metaFor, normalizePath } from "@/data/pageMeta";
import { SITE_URL } from "@/data/site";

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.append(tag);
  }
  tag.content = content;
}

/** Keeps <title>, description, canonical URL and social tags in sync with the current route. */
export function usePageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const { title, description } = metaFor(pathname);
    const url = `${SITE_URL}${normalizePath(pathname)}`;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = url;
  }, [pathname]);
}
