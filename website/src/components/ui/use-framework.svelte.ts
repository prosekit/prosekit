import { PersistedState } from 'runed'

export function useFramework(frameworks: string[]) {
  const preferredFramework = new PersistedState('prosekit-docs-framework', 'react')
  return {
    get current() {
      return frameworks.includes(preferredFramework.current) ? preferredFramework.current : frameworks[0]
    },
    set current(value: string) {
      preferredFramework.current = value
    },
  }
}
