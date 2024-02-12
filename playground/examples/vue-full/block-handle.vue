<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import { BlockPopover } from 'prosekit/vue/block-popover'
import { DragHandle } from 'prosekit/vue/drag-handle'

const editor = useEditor()
</script>

<template>
  <BlockPopover :editor="editor" class="BLOCK_HANDLE">
    <DragHandle :editor="editor">
      <div class="ICON_DRAG_HANDLE"></div>
    </DragHandle>
  </BlockPopover>
</template>
