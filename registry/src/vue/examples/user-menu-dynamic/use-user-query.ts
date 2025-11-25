import type { Ref } from 'vue'
import {
  ref,
  watchEffect,
} from 'vue'

import {
  queryUsers,
  type User,
} from '../../sample/query-users'

/**
 * Simulate a user searching with some delay.
 */
export function useUserQuery(query: Ref<string>, enabled: Ref<boolean>) {
  const users = ref<User[]>([])
  const loading = ref(true)

  watchEffect(
    (onCleanup) => {
      if (!enabled.value) {
        users.value = []
        return
      }

      loading.value = true
      let cancelled = false
      void queryUsers(query.value).then((result) => {
        if (cancelled) {
          return
        }
        users.value = result
        loading.value = false
      })
      onCleanup(() => {
        cancelled = true
      })
    },
  )

  return { loading, users }
}
