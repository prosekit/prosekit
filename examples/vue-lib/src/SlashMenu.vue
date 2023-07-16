<script setup lang="ts">
import { CommandEmpty } from 'prosekit/vue/components/command-empty'
import { CommandItem } from 'prosekit/vue/components/command-item'
import { CommandList } from 'prosekit/vue/components/command-list'
import {
  CommandPopover,
  QueryBuilder,
} from 'prosekit/vue/components/command-popover'
import { useNoteEditor } from './use-note-editor'

const editor = useNoteEditor()

const handleHeadingInsert = (level: number) => {
  const node = editor.schema.nodes.heading.create({ level })
  editor.commands.insertNode({ node })
}

const handleHeadingConvert = (level: number) => {
  const nodeType = editor.schema.nodes.heading
  const attrs = { level }
  editor.commands.setBlockType({ nodeType, attrs })
}

const queryBuilder: QueryBuilder = (match, matchAfter) => {
  const query: string = match[0] + (matchAfter ? matchAfter[0] : '')
  return query.startsWith('/') ? query.slice(1) : query
}
</script>

<template>
  <CommandPopover
    :editor="editor"
    :regex="/\/.*$/iu"
    :regexAfter="/^\S*/"
    :queryBuilder="queryBuilder"
  >
    <CommandList :editor="editor" class="my-slash-menu">
      <CommandEmpty class="my-slash-menu-item">No Command match</CommandEmpty>

      <CommandItem
        class="my-slash-menu-item"
        :onSelect="() => handleHeadingInsert(1)"
      >
        handleHeadingInsert(1)} > Insert Heading 1
      </CommandItem>
      <CommandItem
        class="my-slash-menu-item"
        :onSelect="() => handleHeadingInsert(2)"
      >
        handleHeadingInsert(2)} > Insert Heading 2
      </CommandItem>
      <CommandItem
        class="my-slash-menu-item"
        :onSelect="() => handleHeadingConvert(1)"
      >
        handleHeadingConvert(1)} > Turn into Heading 1
      </CommandItem>
      <CommandItem
        class="my-slash-menu-item"
        :onSelect="() => handleHeadingConvert(2)"
      >
        handleHeadingConvert(2)} > Turn into Heading 2
      </CommandItem>
    </CommandList>
  </CommandPopover>
</template>
