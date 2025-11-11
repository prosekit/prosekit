const STORAGE_KEY = 'prosekit-docs-framework'

function getPerfectFramework(): string | undefined | null {
  return typeof localStorage !== 'undefined'
    ? localStorage.getItem(STORAGE_KEY)
    : undefined
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
  let perfectFramework = getPerfectFramework()
  let initialFramework = (perfectFramework && frameworks.includes(perfectFramework)) ? perfectFramework : frameworks[0]
  let framework = $state<string>(initialFramework)

  const refresh = () => {
    let perfectFramework = getPerfectFramework()
    if (perfectFramework && frameworks.includes(perfectFramework) && perfectFramework !== framework) {
      framework = perfectFramework
    }
  }

  $effect(() => {
    subscriptions.add(refresh)
    return () => {
      subscriptions.delete(refresh)
    }
  })

  const set = (value: string) => {
    framework = value
    setPerfectFramework(value)
  }

  const get = () => framework

  return [get, set] as const
}
