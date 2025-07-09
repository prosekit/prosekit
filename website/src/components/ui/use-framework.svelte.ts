import { PersistedState } from 'runed'

export function useFramework(frameworks: string[]): {
  get current(): string
  set current(value: string)
} {
  return typeof window === 'undefined'
    ? useFrameworkServer(frameworks)
    : useFrameworkClient(frameworks)
}

function useFrameworkServer(frameworks: string[]) {
  return { current: frameworks[0] }
}

function useFrameworkClient(frameworks: string[]) {
  const defaultFramework = frameworks[0]
  const state = new PersistedState('prosekit-docs-framework', defaultFramework)
  return {
    get current() {
      const persisted = state.current
      if (frameworks.includes(persisted)) {
        return persisted
      }
      return defaultFramework
    },
    set current(value) {
      state.current = value
    },
  }
}
