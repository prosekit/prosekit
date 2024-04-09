<script setup lang="ts">
import { AutocompleteEmpty } from 'prosekit/vue/autocomplete-empty'
import { AutocompleteItem } from 'prosekit/vue/autocomplete-item'
import { AutocompleteList } from 'prosekit/vue/autocomplete-list'
import { AutocompletePopover } from 'prosekit/vue/autocomplete-popover'
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>()

const isBlockEmpty = () => {
  let selection = editor.value.view.state.selection
  return selection.empty && selection.$from.parent.content.size === 0
}

const handleSelectHeading = (level: number) => {
  if (isBlockEmpty()) {
    editor.value.commands.setHeading({ level })
  } else {
    editor.value.commands.insertHeading({ level })
  }
}

const handleSelectList = (kind: 'task' | 'bullet' | 'ordered' | 'toggle') => {
  if (isBlockEmpty()) {
    editor.value.commands.wrapInList({ kind })
  } else {
    editor.value.commands.insertList({ kind })
  }
}
</script>

<template>
  <AutocompletePopover
    :editor="editor"
    :regex="/\/.*$/iu"
    class="AUTOCOMPLETE_MENU"
  >
    <AutocompleteList :editor="editor">
      <AutocompleteEmpty class="AUTOCOMPLETE_MENU_ITEM">
        No Command match
      </AutocompleteEmpty>

      <AutocompleteItem
        class="AUTOCOMPLETE_MENU_ITEM"
        :onSelect="() => handleSelectHeading(1)"
      >
        Heading 1
      </AutocompleteItem>
      <AutocompleteItem
        class="AUTOCOMPLETE_MENU_ITEM"
        :onSelect="() => handleSelectHeading(2)"
      >
        Heading 2
      </AutocompleteItem>

      <AutocompleteItem
        class="AUTOCOMPLETE_MENU_ITEM"
        :onSelect="() => handleSelectList('task')"
      >
        Task list
      </AutocompleteItem>

      <AutocompleteItem
        class="AUTOCOMPLETE_MENU_ITEM"
        :onSelect="() => handleSelectList('bullet')"
      >
        Bullet list
      </AutocompleteItem>

      <AutocompleteItem
        class="AUTOCOMPLETE_MENU_ITEM"
        :onSelect="() => handleSelectList('ordered')"
      >
        Ordered list
      </AutocompleteItem>

      <AutocompleteItem
        class="AUTOCOMPLETE_MENU_ITEM"
        :onSelect="() => handleSelectList('toggle')"
      >
        Toggle list
      </AutocompleteItem>
    </AutocompleteList>
  </AutocompletePopover>
</template>
