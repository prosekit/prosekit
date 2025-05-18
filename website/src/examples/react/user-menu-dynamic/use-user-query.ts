import {
  useEffect,
  useState,
} from 'react'

import { users as allUsers } from './user-data'

/**
 * Simulate a user searching with some delay.
 */
export function useUserQuery(query: string, enabled: boolean) {
  const [users, setUsers] = useState<{ name: string; id: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!enabled) {
      setUsers([])
      return
    }

    setLoading(true)

    const searchQuery = query.toLowerCase()

    const id = setTimeout(async () => {
      await waitForTestBlocking()

      setLoading(false)

      setUsers(
        allUsers
          .filter((user) => user.name.toLowerCase().includes(searchQuery))
          .slice(0, 10),
      )
    }, 500)

    return () => {
      clearTimeout(id)
    }
  }, [enabled, query])

  return { loading, users }
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
