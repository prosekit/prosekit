<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import { AutocompleteItem } from 'prosekit/vue/autocomplete'

defineProps<{
  label: string
  kbd?: string
  onSelect: () => void
}>()
</script>

<template>
  <AutocompleteItem :class="Themes.CSS_AUTOCOMPLETE_MENU_ITEM" @select="onSelect">
    <span>{{ label }}</span>
    <kbd v-if="kbd" :class="Themes.CSS_AUTOCOMPLETE_MENU_KEYBOARD">{{ kbd }}</kbd>
  </AutocompleteItem>
</template>
