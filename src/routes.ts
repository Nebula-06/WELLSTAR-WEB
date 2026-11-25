import { lazyPage, type PreloadablePage } from "@/lib/lazyPage";

// Home ships in the main bundle; the other pages load on first visit (or are preloaded on direct visits).
export const lazyPages: Record<string, PreloadablePage> = {
  "/about": lazyPage(() => import("@/pages/About")),
  "/contact": lazyPage(() => import("@/pages/Contact")),
  "/doctors": lazyPage(() => import("@/pages/Doctors")),
  "/lab": lazyPage(() => import("@/pages/Lab")),
  "/pharmacy": lazyPage(() => import("@/pages/Pharmacy")),
  "/services": lazyPage(() => import("@/pages/Services")),
};

/** Every route that gets a pre-rendered HTML file. */
export const prerenderRoutes = ["/", ...Object.keys(lazyPages)];
