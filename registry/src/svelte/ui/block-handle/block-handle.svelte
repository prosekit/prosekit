<script lang="ts">
import {
  BlockHandleAdd,
  BlockHandleDraggable,
  BlockHandlePopup,
  BlockHandlePositioner,
  BlockHandleRoot,
} from 'prosekit/svelte/block-handle'

interface Props {
  dir?: 'ltr' | 'rtl'
}

const props: Props = $props()
</script>

<BlockHandleRoot class="contents">
  <BlockHandlePositioner placement={props.dir === 'rtl' ? 'right' : 'left'} class="CSS_BLOCK_HANDLE_POSITIONER">
    <BlockHandlePopup class="CSS_BLOCK_HANDLE_POPUP">
      <BlockHandleAdd class="CSS_BLOCK_HANDLE_ADD">
        <div class="CSS_ICON_PLUS"></div>
      </BlockHandleAdd>
      <BlockHandleDraggable class="CSS_BLOCK_HANDLE_DRAG">
        <div class="CSS_ICON_DRAG_HANDLE"></div>
      </BlockHandleDraggable>
    </BlockHandlePopup>
  </BlockHandlePositioner>
</BlockHandleRoot>
