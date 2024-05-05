import { useEffect, useState } from 'react'

import { users as allUsers } from './user-data'

/**
 * Simulate a user searching with some delay.
 */
export function useUserQuery(query: string, enabled: boolean) {
  const [users, setUsers] = useState<{ name: string; id: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!enabled) {
      return
    }

    setLoading(true)

    const searchQuery = query.toLowerCase()

    const id = setTimeout(() => {
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
  }, [query])

  return { loading, users }
}
