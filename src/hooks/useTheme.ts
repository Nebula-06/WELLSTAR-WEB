import { useCallback, useSyncExternalStore } from 'react'

export type ThemeMode = 'light' | 'dark'

const STORAGE_KEY = 'wellstar-theme'
const listeners = new Set<() => void>()

/** The inline script in index.html applies the saved theme to <html> before first paint. */
function readTheme(): ThemeMode {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function applyTheme(mode: ThemeMode) {
  document.documentElement.classList.toggle('dark', mode === 'dark')
  try {
    window.localStorage.setItem(STORAGE_KEY, mode)
  } catch {
    /* storage unavailable (private mode) — theme still applies for this visit */
  }
  listeners.forEach((listener) => listener())
}

/**
 * Light/dark theme. Pre-rendered HTML is always light; during hydration React uses the
 * server snapshot, then switches to the visitor's saved theme without a mismatch.
 */
export function useTheme() {
  const theme = useSyncExternalStore<ThemeMode>(subscribe, readTheme, () => 'light')

  const setTheme = useCallback((mode: ThemeMode) => applyTheme(mode), [])
  const toggleTheme = useCallback(() => applyTheme(readTheme() === 'dark' ? 'light' : 'dark'), [])

  return { theme, setTheme, toggleTheme }
}
