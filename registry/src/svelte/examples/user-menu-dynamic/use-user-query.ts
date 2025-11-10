import { users as allUsers } from '../../sample/user-data'

type User = { id: number; name: string }

interface UseUserQueryOptions {
  onUsersChange: (users: User[]) => void
  onLoadingChange: (loading: boolean) => void
}

export function useUserQuery(options: UseUserQueryOptions) {
  let timeout: ReturnType<typeof setTimeout> | undefined
  let destroyed = false

  const run = (query: string, enabled: boolean) => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = undefined
    }

    if (!enabled) {
      options.onUsersChange([])
      return
    }

    options.onLoadingChange(true)

    const searchQuery = query.toLowerCase()

    timeout = setTimeout(async () => {
      await waitForTestBlocking()

      if (destroyed) {
        return
      }

      options.onLoadingChange(false)
      options.onUsersChange(
        allUsers
          .filter((user) => user.name.toLowerCase().includes(searchQuery))
          .slice(0, 10),
      )
    }, 500)
  }

  const destroy = () => {
    destroyed = true
    if (timeout) {
      clearTimeout(timeout)
      timeout = undefined
    }
  }

  return { run, destroy }
}

/**
 * Use a global variable to simulate a network request delay.
 */
async function waitForTestBlocking() {
  return await new Promise((resolve) => {
    const id = setInterval(() => {
      const hasTestBlocking = !!window._PROSEKIT_TEST_BLOCKING
      if (!hasTestBlocking) {
        clearInterval(id)
        resolve(true)
      }
    }, 100)
  })
}

declare global {
  interface Window {
    _PROSEKIT_TEST_BLOCKING: boolean | undefined
  }
}
