<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import { AutocompleteEmpty } from 'prosekit/vue/autocomplete'
</script>

<template>
  <AutocompleteEmpty :class="Themes.AUTOCOMPLETE_MENU_ITEM">
    <span>No results</span>
  </AutocompleteEmpty>
</template>
