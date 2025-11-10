<script lang="ts">
import { onDestroy } from 'svelte'

import { UserMenu } from '../../ui/user-menu'

import { useUserQuery } from './use-user-query'

let query = $state('')
let open = $state(false)
let loading = $state(true)
let users = $state<{ id: number; name: string }[]>([])

const userQuery = useUserQuery({
  onLoadingChange(value) {
    loading = value
  },
  onUsersChange(value) {
    users = value
  },
})

$effect(() => {
  userQuery.run(query, open)
})

onDestroy(() => {
  userQuery.destroy()
})

function handleQueryChange(value: string) {
  query = value
}

function handleOpenChange(value: boolean) {
  open = value
}
</script>

<UserMenu
  {users}
  {loading}
  onQueryChange={handleQueryChange}
  onOpenChange={handleOpenChange}
/>
