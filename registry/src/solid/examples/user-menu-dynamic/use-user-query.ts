import {
  createEffect,
  createSignal,
} from 'solid-js'

import type { User } from '../../sample/sample-query-users'
import { queryUsers } from '../../sample/sample-query-users'

/**
 * Simulate a user searching with some delay.
 */
export function useUserQuery(
  getQuery: () => string,
  getEnabled: () => boolean,
) {
  const [users, setUsers] = createSignal<User[]>([])
  const [loading, setLoading] = createSignal(true)

  createEffect(() => {
    const query = getQuery()
    const enabled = getEnabled()

    if (!enabled) {
      setUsers([])
      return
    }

    setLoading(true)
    let cancelled = false

    void queryUsers(query).then((filteredUsers) => {
      if (cancelled) {
        return
      }
      setUsers(filteredUsers)
      setLoading(false)
    })

    return () => {
      cancelled = true
    }
  })

  return { loading, users }
}
