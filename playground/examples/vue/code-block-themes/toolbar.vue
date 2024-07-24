<script setup lang="ts">
import { Themes } from '@prosekit/themes'

import ThemeSelector from './theme-selector.vue'
</script>

<template>
  <div :class="Themes.TOOLBAR">
    <ThemeSelector />
  </div>
</template>
