const STORAGE_KEY = 'prosekit-docs-framework'

function consumeFrameworkFromQuery(): string | undefined | null {
  if (typeof window === 'undefined') return undefined
  try {
    const url = new URL(window.location.href)
    if (!url.searchParams.has('framework')) return
    const value = url.searchParams.get('framework')
    url.searchParams.delete('framework')
    window.history.replaceState(window.history.state, '', url.toString())
    return value
  } catch {
    return undefined
  }
}

function getPerfectFramework(): string | undefined | null {
  return typeof localStorage !== 'undefined'
    ? localStorage.getItem(STORAGE_KEY)
    : undefined
}

function getValidFramework(
  value: string | undefined | null,
  frameworks: readonly string[],
): string | undefined {
  if (!value) return undefined
  const trimmed = value.trim()
  if (!trimmed) return undefined
  return frameworks.includes(trimmed) ? trimmed : undefined
}

function setPerfectFramework(value: string) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, value)
  }
  for (const subscription of subscriptions) {
    subscription()
  }
}

const subscriptions = new Set<() => void>()

export function useFramework(frameworks: string[]) {
  const queryValue = consumeFrameworkFromQuery()
  const queryFramework = getValidFramework(queryValue, frameworks)

  // If a framework is provided via query, it overrides localStorage.
  if (queryFramework) {
    setPerfectFramework(queryFramework)
  }

  const initialFramework = queryFramework
    ?? getValidFramework(getPerfectFramework(), frameworks)
    ?? frameworks[0]
  let framework = $state<string>(initialFramework)

  const refreshFromStorage = () => {
    const stored = getValidFramework(getPerfectFramework(), frameworks)
    if (stored && stored !== framework) {
      framework = stored
    }
  }

  $effect(() => {
    subscriptions.add(refreshFromStorage)
    return () => {
      subscriptions.delete(refreshFromStorage)
    }
  })

  const set = (value: string) => {
    const next = getValidFramework(value, frameworks)
    if (!next) return
    framework = next
    setPerfectFramework(next)
  }

  const get = () => framework

  return [get, set] as const
}
