<script setup lang="ts">
import { AutocompleteItem } from 'prosekit/vue/autocomplete'

const props = defineProps<{
  label: string
  kbd?: string
  onSelect: () => void
}>()
</script>

<template>
  <AutocompleteItem class="CSS_AUTOCOMPLETE_MENU_ITEM" @select="props.onSelect">
    <span>{{ props.label }}</span>
    <kbd v-if="props.kbd" class="CSS_AUTOCOMPLETE_MENU_KEYBOARD">{{ props.kbd }}</kbd>
  </AutocompleteItem>
</template>
