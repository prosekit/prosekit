<script setup lang="ts">
import {
  BlockHandleAdd,
  BlockHandleDraggable,
  BlockHandlePopover,
} from 'prosekit/vue/block-handle'
</script>

<template>
  <BlockHandlePopover class="CSS_BLOCK_HANDLE_POPOVER">
    <BlockHandleAdd class="CSS_BLOCK_HANDLE_ADD">
      <div class="CSS_ICON_PLUS" />
    </BlockHandleAdd>
    <BlockHandleDraggable class="CSS_BLOCK_HANDLE_DRAG">
      <div class="CSS_ICON_DRAG_HANDLE" />
    </BlockHandleDraggable>
  </BlockHandlePopover>
</template>
