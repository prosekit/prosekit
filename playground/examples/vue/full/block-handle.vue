<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import { BlockDragHandle, BlockPopover } from 'prosekit/vue/block-handle'
</script>

<template>
  <BlockPopover :class="Themes.BLOCK_HANDLE">
    <BlockDragHandle>
      <div :class="Themes.ICON_DRAG_HANDLE" />
    </BlockDragHandle>
  </BlockPopover>
</template>
