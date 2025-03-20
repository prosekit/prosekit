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
  return new PersistedState('prosekit-docs-framework', frameworks[0])
}
