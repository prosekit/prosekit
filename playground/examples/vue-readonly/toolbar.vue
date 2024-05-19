<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import Toggle from './toggle.vue'
import { useReadonly } from './use-readonly'

const { readonly } = useReadonly()
</script>

<template>
  <div :class="Themes.TOOLBAR">
    <Toggle :pressed="readonly" :onClick="() => (readonly = true)">
      Readonly
    </Toggle>
    <Toggle :pressed="!readonly" :onClick="() => (readonly = false)">
      Editable
    </Toggle>
  </div>
</template>
