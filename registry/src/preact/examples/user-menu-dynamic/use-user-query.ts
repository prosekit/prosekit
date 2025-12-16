import {
  useEffect,
  useState,
} from 'preact/hooks'

import type { User } from '../../sample/sample-query-users'
import { queryUsers } from '../../sample/sample-query-users'

/**
 * Simulate a user searching with some delay.
 */
export function useUserQuery(query: string, enabled: boolean) {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  if (!enabled && users.length > 0) {
    setUsers([])
  }

  useEffect(() => {
    if (!enabled) {
      return
    }

    let cancelled = false

    void (async () => {
      setLoading(true)
      const filteredUsers = await queryUsers(query)
      if (cancelled) {
        return
      }
      setUsers(filteredUsers)
      setLoading(false)
    })()

    return () => {
      cancelled = true
    }
  }, [enabled, query])

  return { loading, users }
}
