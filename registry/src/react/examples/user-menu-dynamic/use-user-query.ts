import {
  useEffect,
  useState,
} from 'react'

import { queryUsersWithDelay } from '../../sample/query-users'

/**
 * Simulate a user searching with some delay.
 */
export function useUserQuery(query: string, enabled: boolean) {
  const [users, setUsers] = useState<{ name: string; id: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!enabled) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUsers([])
      return
    }

    let cancelled = false
    setLoading(true)
    void queryUsersWithDelay(query).then((users) => {
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
