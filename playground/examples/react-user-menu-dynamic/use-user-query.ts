import { useEffect, useState } from 'react'

import { users as allUsers } from './user-data'

export function useUserQuery(query: string) {
  const [users, setUsers] = useState<{ name: string; id: number }[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    const id = setTimeout(() => {
      setLoading(false)

      query = query.toLowerCase()

      setUsers(
        allUsers
          .filter((user) => user.name.toLowerCase().includes(query))
          .slice(0, 10),
      )
    }, 1000)

    return () => {
      clearTimeout(id)
    }
  }, [query])

  return { loading, users: loading ? [] : users }
}
