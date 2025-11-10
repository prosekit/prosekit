<script setup lang="ts">
import { ref } from 'vue'

import { UserMenu } from '../../ui/user-menu'

import { useUserQuery } from './use-user-query'

const query = ref('')
const open = ref(false)

const { loading, users } = useUserQuery(query, open)

function handleQueryChange(q: string) {
  query.value = q
}

function handleOpenChange(o: boolean) {
  open.value = o
}
</script>

<template>
  <UserMenu
    :users="users"
    :loading="loading"
    @query-change="handleQueryChange"
    @open-change="handleOpenChange"
  />
</template>
