<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import ThemeSelector from './theme-selector.vue'
</script>

<template>
  <div class="TOOLBAR">
    <ThemeSelector />
  </div>
</template>
