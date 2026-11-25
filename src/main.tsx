import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { lazyPages } from './routes'

/**
 * Resolves after the browser has painted the current frame. Background tabs never fire
 * requestAnimationFrame, so a timeout makes sure the page still becomes interactive there.
 */
const afterFirstPaint = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => setTimeout(resolve, 0))
    setTimeout(resolve, 250)
  })

async function start() {
  const container = document.getElementById('root')!
  const prerendered = container.hasChildNodes()

  // Let the browser paint the pre-rendered HTML before doing any React work,
  // so text and the hero image show immediately instead of after hydration.
  if (prerendered) await afterFirstPaint()

  // On a direct visit to an inner page, load that page's code first so hydration
  // matches the pre-rendered HTML in one step (no blank flash).
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  await lazyPages[path]?.preload().catch(() => undefined)

  const app = (
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  )

  // Pre-rendered pages are hydrated (React reuses the existing HTML); the dev server renders from scratch.
  if (prerendered) {
    hydrateRoot(container, app)
  } else {
    createRoot(container).render(app)
  }
}

void start()
