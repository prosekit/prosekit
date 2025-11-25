<script lang="ts">
import {
  BlockHandleAdd,
  BlockHandleDraggable,
  BlockHandlePopover,
} from 'prosekit/svelte/block-handle'
</script>

<BlockHandlePopover class="CSS_BLOCK_HANDLE_POPOVER">
  <BlockHandleAdd class="CSS_BLOCK_HANDLE_ADD">
    <div class="CSS_ICON_PLUS"></div>
  </BlockHandleAdd>
  <BlockHandleDraggable class="CSS_BLOCK_HANDLE_DRAG">
    <div class="CSS_ICON_DRAG_HANDLE"></div>
  </BlockHandleDraggable>
</BlockHandlePopover>
