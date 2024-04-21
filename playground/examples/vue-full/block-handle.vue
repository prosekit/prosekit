<script setup lang="ts">
import { BlockDragHandle, BlockPopover } from 'prosekit/vue/block-handle'
</script>

<template>
  <BlockPopover class="BLOCK_HANDLE">
    <BlockDragHandle>
      <div class="ICON_DRAG_HANDLE"></div>
    </BlockDragHandle>
  </BlockPopover>
</template>
