<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/vue'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/vue/autocomplete'

import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>()

function isBlockEmpty() {
  let selection = editor.value.view.state.selection
  return selection.empty && selection.$from.parent.content.size === 0
}

function handleSelectHeading(level: number) {
  if (isBlockEmpty()) {
    editor.value.commands.setHeading({ level })
  } else {
    editor.value.commands.insertHeading({ level })
  }
}

function handleSelectList(kind: 'task' | 'bullet' | 'ordered' | 'toggle') {
  if (isBlockEmpty()) {
    editor.value.commands.wrapInList({ kind })
  } else {
    editor.value.commands.insertList({ kind })
  }
}
</script>

<template>
  <AutocompletePopover :regex="/\/.*$/iu" :class="Themes.AUTOCOMPLETE_MENU">
    <AutocompleteList>
      <AutocompleteEmpty :class="Themes.AUTOCOMPLETE_MENU_ITEM">
        No results
      </AutocompleteEmpty>

      <AutocompleteItem
        :class="Themes.AUTOCOMPLETE_MENU_ITEM"
        :on-select="() => handleSelectHeading(1)"
      >
        Heading 1
      </AutocompleteItem>
      <AutocompleteItem
        :class="Themes.AUTOCOMPLETE_MENU_ITEM"
        :on-select="() => handleSelectHeading(2)"
      >
        Heading 2
      </AutocompleteItem>

      <AutocompleteItem
        :class="Themes.AUTOCOMPLETE_MENU_ITEM"
        :on-select="() => handleSelectList('task')"
      >
        Task list
      </AutocompleteItem>

      <AutocompleteItem
        :class="Themes.AUTOCOMPLETE_MENU_ITEM"
        :on-select="() => handleSelectList('bullet')"
      >
        Bullet list
      </AutocompleteItem>

      <AutocompleteItem
        :class="Themes.AUTOCOMPLETE_MENU_ITEM"
        :on-select="() => handleSelectList('ordered')"
      >
        Ordered list
      </AutocompleteItem>

      <AutocompleteItem
        :class="Themes.AUTOCOMPLETE_MENU_ITEM"
        :on-select="() => handleSelectList('toggle')"
      >
        Toggle list
      </AutocompleteItem>
    </AutocompleteList>
  </AutocompletePopover>
</template>
