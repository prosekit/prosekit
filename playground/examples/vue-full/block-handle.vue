<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import { BlockPositioner } from 'prosekit/vue/block-positioner'
import { BlockDragHandle } from 'prosekit/vue/block-drag-handle'

const editor = useEditor()
</script>

<template>
  <BlockPositioner :editor="editor" class="BLOCK_HANDLE">
    <BlockDragHandle :editor="editor">
      <div class="ICON_DRAG_HANDLE"></div>
    </BlockDragHandle>
  </BlockPositioner>
</template>
