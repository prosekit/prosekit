import {
  queryUsers,
  type User,
} from '../../sample/query-users'

export function useUserQuery(
  getQuery: () => string,
  getEnabled: () => boolean,
) {
  let loading = $state(true)
  let users = $state<User[]>([])

  $effect(() => {
    const query = getQuery()
    const enabled = getEnabled()

    if (!enabled) {
      users = []
      return
    }

    loading = true
    let cancelled = false
    void queryUsers(query).then((result) => {
      if (cancelled) {
        return
      }
      users = result
      loading = false
    })
    return () => {
      cancelled = true
    }
  })

  return {
    getLoading: () => loading,
    getUsers: () => users,
  }
}
