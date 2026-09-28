import { createContext, flushSync } from 'octane'

export type Theme = 'dark' | 'light'

export interface ThemeState {
  theme: Theme
  setTheme: (update: (current: Theme) => Theme) => void
}

export const ThemeContext = createContext<ThemeState>({ theme: 'light', setTheme: () => {} })

let activeReveal: ViewTransition | null = null

/**
 * Flip the theme inside a typed transition. The CSS keyed on
 * `:active-view-transition-type(theme)` clips the new root snapshot open as a
 * circle centred on the pointer (or on the trigger, for keyboard activation).
 */
export function revealTheme(state: ThemeState, event: MouseEvent) {
  // Keep another click from interrupting the snapshots of the current reveal.
  if (activeReveal !== null) return
  const updateTheme = () => {
    flushSync(() => state.setTheme((current) => (current === 'dark' ? 'light' : 'dark')))
  }
  if (typeof document.startViewTransition !== 'function' || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    updateTheme()
    return
  }
  const target = event.currentTarget as HTMLElement | null
  let x = event.clientX
  let y = event.clientY
  if (event.detail === 0 && target !== null) {
    const rect = target.getBoundingClientRect()
    x = rect.left + rect.width / 2
    y = rect.top + rect.height / 2
  }
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
  const root = document.documentElement.style
  const previousName = root.getPropertyValue('view-transition-name')
  const previousPriority = root.getPropertyPriority('view-transition-name')
  root.setProperty('--reveal-x', `${x}px`)
  root.setProperty('--reveal-y', `${y}px`)
  root.setProperty('--reveal-r', `${radius}px`)
  // Octane keeps the root out of the snapshot (`view-transition-name: none`)
  // so untouched content stays live. The reveal needs the whole page, so opt
  // the root back in for this one transition only.
  root.setProperty('view-transition-name', 'root')
  const transition = document.startViewTransition({
    update: updateTheme,
    types: ['theme'],
  })
  activeReveal = transition
  // A skipped animation still commits its update; don't leave a rejected ready promise.
  void transition.ready.catch(() => {})
  void transition.finished.catch(() => {}).finally(() => {
    if (previousName) root.setProperty('view-transition-name', previousName, previousPriority)
    else root.removeProperty('view-transition-name')
    activeReveal = null
  })
}
