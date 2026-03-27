import { useCallback, useLayoutEffect, useRef, useSyncExternalStore } from 'react'

export function useFramework(
  frameworks: string[],
): [string, (value: string) => void] {
  const frameworksRef = useRef(frameworks)

  useLayoutEffect(() => {
    frameworksRef.current = frameworks
  }, [frameworks])

  const storedFramework = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  )

  const framework = getValidFramework(storedFramework, frameworks) || frameworks[0] || ''

  const setFramework = useCallback(
    (value: string) => {
      updateStoredFramework(value, frameworksRef.current)
    },
    [],
  )

  useLayoutEffect(() => {
    const queryValue = consumeFrameworkFromQuery()
    updateStoredFramework(queryValue, frameworksRef.current)
  }, [])

  return [framework, setFramework]
}

const STORAGE_KEY = 'prosekit-docs-framework'

const listeners = new Set<() => void>()

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot(): string | undefined {
  return getStoredFramework()
}

function getServerSnapshot(): string | undefined {
  return
}

function setStoredFramework(value: string): void {
  if (typeof localStorage === 'undefined') {
    return
  }

  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch (error) {
    console.error('Failed to set stored framework:', error)
  }

  for (const listener of listeners) {
    listener()
  }
}

function updateStoredFramework(value: string | undefined, frameworks: readonly string[]): void {
  const next = value && getValidFramework(value, frameworks)
  if (next) {
    setStoredFramework(next)
  }
}

function getStoredFramework(): string | undefined {
  if (typeof localStorage === 'undefined') {
    return
  }

  try {
    return localStorage.getItem(STORAGE_KEY) || undefined
  } catch (error) {
    console.error('Failed to get stored framework:', error)
  }
}

function consumeFrameworkFromQuery(): string | undefined {
  try {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    if (!url.searchParams.has('framework')) return
    const value = url.searchParams.get('framework')
    url.searchParams.delete('framework')
    window.history.replaceState(window.history.state, '', url.toString())
    return value || undefined
  } catch (error) {
    console.error('Failed to consume framework from query:', error)
  }
}

function getValidFramework(
  value: string | null | undefined,
  frameworks: readonly string[],
): string | undefined {
  const trimmed = value && value.trim()
  if (trimmed && frameworks.includes(trimmed)) {
    return trimmed
  }
}
