<script lang="ts">
import { Themes } from '@prosekit/themes'
import {
  BlockHandleAdd,
  BlockHandleDraggable,
  BlockHandlePopover,
} from 'prosekit/svelte/block-handle'
</script>

<BlockHandlePopover class={Themes.CSS_BLOCK_HANDLE_POPOVER}>
  <BlockHandleAdd class={Themes.CSS_BLOCK_HANDLE_ADD}>
    <div class={Themes.CSS_ICON_PLUS}></div>
  </BlockHandleAdd>
  <BlockHandleDraggable class={Themes.CSS_BLOCK_HANDLE_DRAG}>
    <div class={Themes.CSS_ICON_DRAG_HANDLE}></div>
  </BlockHandleDraggable>
</BlockHandlePopover>
