import { useEffect } from 'react'
import { MotionConfig } from 'motion/react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { SiteLayout } from '@/components/SiteLayout'
import Home from '@/pages/Home'
import { lazyPages } from '@/routes'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    // The target may live in a page that is still loading, so look for it for a moment.
    const id = decodeURIComponent(hash.slice(1))
    let tries = 0
    const timer = window.setInterval(() => {
      const el = document.getElementById(id)
      if (el) {
        window.clearInterval(timer)
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else if (++tries > 30) {
        window.clearInterval(timer)
        window.scrollTo(0, 0)
      }
    }, 50)
    return () => window.clearInterval(timer)
  }, [pathname, hash])

  return null
}

/** The app without a router, so the browser (BrowserRouter) and the pre-renderer (StaticRouter) can each wrap it. */
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          {Object.entries(lazyPages).map(([path, Page]) => (
            <Route key={path} path={path.slice(1)} element={<Page />} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </MotionConfig>
  )
}
