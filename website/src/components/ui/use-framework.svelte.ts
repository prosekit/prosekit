import { PersistedState } from 'runed'

export function useFramework(frameworks: string[]): { current: string } {
  return typeof window === 'undefined'
    ? useFrameworkServer(frameworks)
    : useFrameworkClient(frameworks)
}

function useFrameworkServer(frameworks: string[]) {
  return { current: frameworks[0] }
}

function useFrameworkClient(frameworks: string[]) {
  const preferredFramework = new PersistedState('prosekit-docs-framework', frameworks[0])

  return {
    get current() {
      return preferredFramework.current
    },
    set current(value: string) {
      preferredFramework.current = value
    },
  }
}
