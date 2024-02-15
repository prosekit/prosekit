<script setup lang="ts">
import {
  defineCodeBlockShiki,
  shikiBundledThemesInfo,
} from 'prosekit/extensions/code-block'
import { useExtension } from 'prosekit/vue'
import { computed } from 'vue'

const theme = defineModel({ default: 'github-dark' })
const extension = computed(() => {
  return defineCodeBlockShiki({ themes: [theme.value] })
})
useExtension(extension)
</script>

<template>
  <label>Theme:</label>
  <select v-model="theme" class="TOGGLE_BUTTON">
    <option
      v-for="info of shikiBundledThemesInfo"
      :key="info.id"
      :value="info.id"
    >
      {{ info.id }}
    </option>
  </select>
</template>
