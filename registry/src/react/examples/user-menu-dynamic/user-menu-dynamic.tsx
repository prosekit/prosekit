import { useState } from 'react'

import { UserMenu } from '../../ui/user-menu'

import { useUserQuery } from './use-user-query'

export default function UserMenuDynamic() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const { loading, users } = useUserQuery(query, open)

  return (
    <UserMenu
      users={users}
      loading={loading}
      onQueryChange={setQuery}
      onOpenChange={setOpen}
    />
  )
}
