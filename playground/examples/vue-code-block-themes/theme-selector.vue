<script setup lang="ts">
import { defineCodeBlockShiki } from 'prosekit/extensions/code-block'
import { useExtension } from 'prosekit/vue'
import { bundledThemesInfo, type BundledTheme } from 'shiki'
import { computed } from 'vue'

const theme = defineModel({ default: 'github-dark' })
const extension = computed(() => {
  return defineCodeBlockShiki({ theme: theme.value as BundledTheme })
})
useExtension(extension)
</script>

<template>
  <label>Theme:</label>
  <select v-model="theme" class="TOGGLE_BUTTON">
    <option v-for="info of bundledThemesInfo" :key="info.id" :value="info.id">
      {{ info.id }}
    </option>
  </select>
</template>
