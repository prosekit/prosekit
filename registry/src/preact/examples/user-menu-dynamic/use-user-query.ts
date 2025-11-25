import {
  useEffect,
  useState,
} from 'preact/hooks'

import type { User } from '../../sample/query-users'
import { queryUsers } from '../../sample/query-users'

/**
 * Simulate a user searching with some delay.
 */
export function useUserQuery(query: string, enabled: boolean) {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!enabled) {
      setUsers([])
      return
    }

    let cancelled = false
    setLoading(true)
    void queryUsers(query).then((users) => {
      if (cancelled) {
        return
      }
      setUsers(users)
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [enabled, query])

  return { loading, users }
}
