<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import {
  defineCodeBlockShiki,
  shikiBundledThemesInfo,
  type ShikiBundledTheme,
} from 'prosekit/extensions/code-block'
import { useExtension } from 'prosekit/vue'
import { computed } from 'vue'

const theme = defineModel({ default: 'github-dark', type: String })
const extension = computed(() => {
  return defineCodeBlockShiki({ themes: [theme.value as ShikiBundledTheme] })
})
useExtension(extension)
</script>

<template>
  <label for="code-block-theme-selector">Theme</label>
  <select
    id="code-block-theme-selector"
    v-model="theme"
    :class="Themes.TOGGLE_BUTTON"
  >
    <option
      v-for="info of shikiBundledThemesInfo"
      :key="info.id"
      :value="info.id"
    >
      {{ info.id }}
    </option>
  </select>
</template>
