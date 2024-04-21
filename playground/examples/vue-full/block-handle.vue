<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import { BlockDragHandle, BlockPopover } from 'prosekit/vue/block-handle'

const editor = useEditor()
</script>

<template>
  <BlockPopover class="BLOCK_HANDLE">
    <BlockDragHandle>
      <div class="ICON_DRAG_HANDLE"></div>
    </BlockDragHandle>
  </BlockPopover>
</template>
