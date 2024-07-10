<script lang="ts">
import { Themes } from '@prosekit/themes'
import { BlockDragHandle, BlockPopover } from 'prosekit/svelte/block-handle'
</script>

<BlockPopover class={Themes.BLOCK_HANDLE}>
  <BlockDragHandle>
    <div class={Themes.ICON_DRAG_HANDLE}></div>
  </BlockDragHandle>
</BlockPopover>
