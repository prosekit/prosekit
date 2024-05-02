import { ref, watchEffect, type Ref } from 'vue'

import { users as allUsers } from './user-data'

export function useUserQuery(query: Ref<string>) {
  const users = ref<{ id: number; name: string }[]>([])
  const loading = ref(false)

  watchEffect((onInvalidate) => {
    loading.value = true
    const timeoutId = setTimeout(() => {
      loading.value = false
      const searchQuery = query.value.toLowerCase()
      users.value = allUsers
        .filter((user) => user.name.toLowerCase().includes(searchQuery))
        .slice(0, 10)
    }, 1000)

    onInvalidate(() => {
      clearTimeout(timeoutId)
    })
  })

  return { loading, users }
}
