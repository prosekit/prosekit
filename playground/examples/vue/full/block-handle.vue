<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import {
  BlockHandleAdd,
  BlockHandleDraggable,
  BlockHandlePopover,
} from 'prosekit/vue/block-handle'
</script>

<template>
  <BlockHandlePopover :class="Themes.BLOCK_HANDLE_POPOVER">
    <BlockHandleAdd :class="Themes.BLOCK_HANDLE_ADD">
      <div :class="Themes.ICON_PLUS" />
    </BlockHandleAdd>
    <BlockHandleDraggable :class="Themes.BLOCK_HANDLE_DRAG">
      <div :class="Themes.ICON_DRAG_HANDLE" />
    </BlockHandleDraggable>
  </BlockHandlePopover>
</template>
