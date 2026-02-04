import { createSignal, type JSX } from 'solid-js'

import { UserMenu } from '../../ui/user-menu'

import { useUserQuery } from './use-user-query'

export default function UserMenuDynamic(): JSX.Element {
  const [query, setQuery] = createSignal('')
  const [open, setOpen] = createSignal(false)

  const { loading, users } = useUserQuery(query, open)

  return (
    <UserMenu
      users={users()}
      loading={loading()}
      onQueryChange={setQuery}
      onOpenChange={setOpen}
    />
  )
}
