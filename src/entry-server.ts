/**
 * Build-time renderer used by scripts/prerender.mjs (built with `vite build --ssr`).
 * Renders a route to a complete HTML string.
 */
import { createElement, StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import App from './App'
import { lazyPages } from './routes'

export { metaFor } from './data/pageMeta'
export { SITE_URL } from './data/site'
export { prerenderRoutes } from './routes'

export async function render(url: string): Promise<string> {
  // Load every page up front so nothing suspends and the HTML has no streaming placeholders.
  await Promise.all(Object.values(lazyPages).map((page) => page.preload()))
  const tree = createElement(StrictMode, null, createElement(StaticRouter, { location: url }, createElement(App)))
  // Never split large Suspense sections out for streaming; emit one complete document.
  const { prelude } = await prerender(tree, { progressiveChunkSize: Number.MAX_SAFE_INTEGER })
  return new Response(prelude).text()
}
