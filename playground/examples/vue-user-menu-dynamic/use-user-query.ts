import { ref, watchEffect, type Ref } from 'vue'

import { users as allUsers } from './user-data'

/**
 * Simulate a user searching with some delay.
 */
export function useUserQuery(query: Ref<string>) {
  const users = ref<{ id: number; name: string }[]>([])
  const loading = ref(true)

  watchEffect((onInvalidate) => {
    loading.value = true

    const searchQuery = query.value.toLowerCase()

    const timeoutId = setTimeout(() => {
      loading.value = false

      users.value = allUsers
        .filter((user) => user.name.toLowerCase().includes(searchQuery))
        .slice(0, 10)
    }, 500)

    onInvalidate(() => {
      clearTimeout(timeoutId)
    })
  })

  return { loading, users }
}
