<script setup lang="ts">
import { CommandEmpty } from 'prosekit/vue/components/command-empty'
import { CommandItem } from 'prosekit/vue/components/command-item'
import { CommandList } from 'prosekit/vue/components/command-list'
import { CommandPopover } from 'prosekit/vue/components/command-popover'
import { useExampleEditor } from './use-example-editor'

const editor = useExampleEditor()

const handleHeadingInsert = (level: number) => {
  const node = editor.schema.nodes.heading.create({ level })
  editor.commands.insertNode({ node })
}

const handleHeadingConvert = (level: number) => {
  const nodeType = editor.schema.nodes.heading
  const attrs = { level }
  editor.commands.setBlockType({ nodeType, attrs })
}
</script>

<template>
  <CommandPopover :editor="editor" :regex="/\/.*$/iu" :regexAfter="/^\S*/">
    <CommandList :editor="editor" class="example-slash-menu">
      <CommandEmpty class="example-slash-menu-item">
        No Command match
      </CommandEmpty>

      <CommandItem
        class="example-slash-menu-item"
        :onSelect="() => handleHeadingInsert(1)"
      >
        Insert Heading 1
      </CommandItem>
      <CommandItem
        class="example-slash-menu-item"
        :onSelect="() => handleHeadingInsert(2)"
      >
        Insert Heading 2
      </CommandItem>
      <CommandItem
        class="example-slash-menu-item"
        :onSelect="() => handleHeadingConvert(1)"
      >
        Turn into Heading 1
      </CommandItem>
      <CommandItem
        class="example-slash-menu-item"
        :onSelect="() => handleHeadingConvert(2)"
      >
        Turn into Heading 2
      </CommandItem>
    </CommandList>
  </CommandPopover>
</template>
./use-example-editor
