import { useEffect, useState } from 'react'

import { users as allUsers } from './user-data'

export function useUserQuery(query: string) {
  const [users, setUsers] = useState<{ name: string; id: number }[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const id = setTimeout(() => {
      setLoading(false)

      // Pick some random users
      const userCount = Math.round(Math.random() * 10)
      const randomUsers = allUsers
        .sort(() => Math.random() - 0.5)
        .slice(0, userCount)

      setUsers(
        randomUsers.map((user) => ({
          name: user.name + ` (${query}'s friend)`,
          id: user.id,
        })),
      )
    }, 1500)

    return () => {
      clearTimeout(id)
    }
  }, [query])

  return { users, loading }
}
