<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import Button from './button.vue'
import { useReadonly } from './use-readonly'

const { readonly } = useReadonly()
</script>

<template>
  <div :class="Themes.TOOLBAR">
    <Button :pressed="readonly" :onClick="() => (readonly = true)">
      Readonly
    </Button>
    <Button :pressed="!readonly" :onClick="() => (readonly = false)">
      Editable
    </Button>
  </div>
</template>
