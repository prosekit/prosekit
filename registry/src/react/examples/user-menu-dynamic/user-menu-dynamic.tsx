'use client'

import { useState } from 'react'

import { UserMenu } from '../../ui/user-menu/index.ts'

import { useUserQuery } from './use-user-query.ts'

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
