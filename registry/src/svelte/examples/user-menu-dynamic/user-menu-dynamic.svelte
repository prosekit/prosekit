<script lang="ts">
import { UserMenu } from '../../ui/user-menu'

import { useUserQuery } from './use-user-query.svelte.ts'

let query = $state('')
let open = $state(false)

const { getLoading, getUsers } = useUserQuery(() => query, () => open)

function handleQueryChange(value: string) {
  query = value
}

function handleOpenChange(value: boolean) {
  open = value
}
</script>

<UserMenu
  users={getUsers()}
  loading={getLoading()}
  onQueryChange={handleQueryChange}
  onOpenChange={handleOpenChange}
/>
