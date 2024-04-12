<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import { BlockPopover } from 'prosekit/vue/block-popover'
import { BlockDragHandle } from 'prosekit/vue/block-drag-handle'

const editor = useEditor()
</script>

<template>
  <BlockPopover :editor="editor" class="BLOCK_HANDLE">
    <BlockDragHandle :editor="editor">
      <div class="ICON_DRAG_HANDLE"></div>
    </BlockDragHandle>
  </BlockPopover>
</template>
