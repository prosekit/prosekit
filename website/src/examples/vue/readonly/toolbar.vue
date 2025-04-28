<script setup lang="ts">
import Button from './button.vue'
import { useReadonly } from './use-readonly'

const { readonly } = useReadonly()
</script>

<template>
  <div class="CSS_TOOLBAR">
    <Button :pressed="readonly" @click="() => (readonly = true)">
      Readonly
    </Button>
    <Button :pressed="!readonly" @click="() => (readonly = false)">
      Editable
    </Button>
  </div>
</template>
