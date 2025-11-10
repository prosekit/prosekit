import type { Ref } from 'vue'
import {
  ref,
  watchEffect,
} from 'vue'

import { users as allUsers } from '../../sample/user-data'

/**
 * Simulate a user searching with some delay.
 */
export function useUserQuery(query: Ref<string>, enabled: Ref<boolean>) {
  const users = ref<{ name: string; id: number }[]>([])
  const loading = ref(true)

  watchEffect(
    (onCleanup) => {
      if (!enabled.value) {
        users.value = []
        return
      }

      loading.value = true

      const searchQuery = query.value.toLowerCase()

      const id = setTimeout(async () => {
        await waitForTestBlocking()

        loading.value = false

        users.value = allUsers
          .filter((user) => user.name.toLowerCase().includes(searchQuery))
          .slice(0, 10)
      }, 500)

      onCleanup(() => {
        clearTimeout(id)
      })
    },
  )

  return { loading, users }
}

/**
 * Use a global variable to simulate a network request delay.
 */
async function waitForTestBlocking() {
  return await new Promise((resolve) => {
    const id = setInterval(() => {
      const hasTestBlocking = !!window._PROSEKIT_TEST_BLOCKING
      if (!hasTestBlocking) {
        clearInterval(id)
        resolve(true)
      }
    }, 100)
  })
}

declare global {
  interface Window {
    _PROSEKIT_TEST_BLOCKING: boolean | undefined
  }
}
