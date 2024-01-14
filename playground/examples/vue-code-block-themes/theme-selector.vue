<script setup lang="ts">
import { defineCodeBlockShikiji } from 'prosekit/extensions/code-block'
import { useExtension } from 'prosekit/vue'
import { bundledThemesInfo, type BundledTheme } from 'shikiji'
import { computed } from 'vue'

const theme = defineModel({ default: 'github-dark' })
const extension = computed(() => {
  return defineCodeBlockShikiji({ theme: theme.value as BundledTheme })
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
