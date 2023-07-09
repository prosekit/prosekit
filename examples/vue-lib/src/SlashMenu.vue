<script setup lang="ts">
import {
  PopoverSuggestion,
  PredictionRule,
} from 'prosekit/vue/components/popover-suggestion'
import { useSlashMenu } from './use-slash-menu'
import { Menu } from 'prosekit/vue/components/menu'
import { MenuItem } from 'prosekit/vue/components/menu-item'

const { editor, getItems } = useSlashMenu()

const rules: PredictionRule[] = [
  {
    match: /\/.*$/iu,
    matchAfter: /^\S*/,
  },
]
</script>

<template>
  <PopoverSuggestion :editor="editor" :rules="rules" v-slot="contextA">
    <Menu v-if="contextA?.active" .editor="editor" className="my-slash-menu">
      <template v-for="item in getItems(contextA)" :key="item.id">
        <MenuItem .onSelect="item.callback" className="my-slash-menu-item">
          {{ item.text }}
        </MenuItem>
      </template>
    </Menu>
  </PopoverSuggestion>
</template>
