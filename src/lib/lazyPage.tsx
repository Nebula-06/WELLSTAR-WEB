import { lazy, type ComponentType } from "react";

type PageModule = { default: ComponentType };

export type PreloadablePage = ComponentType & { preload: () => Promise<void> };

/**
 * React.lazy page that can also be loaded ahead of time. Once preloaded it renders
 * synchronously (no Suspense fallback), so pre-rendered HTML is swapped without a flash.
 */
export function lazyPage(loader: () => Promise<PageModule>): PreloadablePage {
  let Loaded: ComponentType | null = null;
  const LazyPage = lazy(loader);

  function Page() {
    return Loaded ? <Loaded /> : <LazyPage />;
  }
  return Object.assign(Page, {
    preload: () =>
      loader().then((module) => {
        Loaded = module.default;
      }),
  });
}
