<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import { AutocompleteItem } from 'prosekit/vue/autocomplete'

defineProps<{
  onSelect: () => void
  label: string
  kbd?: string
}>()
</script>

<template>
  <AutocompleteItem :class="Themes.AUTOCOMPLETE_MENU_ITEM" @select="onSelect">
    <span>{{ label }}</span>
    <kbd v-if="kbd" :class="Themes.AUTOCOMPLETE_MENU_KEYBOARD">{{ kbd }}</kbd>
  </AutocompleteItem>
</template>
