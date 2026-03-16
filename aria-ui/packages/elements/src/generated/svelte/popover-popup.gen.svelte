<script lang="js">
  import { registerPopoverPopupElement } from '../../popover/index.ts'
  registerPopoverPopupElement()

  let { children = undefined, ..._restProps } = $props()
</script>

<aria-ui-popover-popup {..._restProps}>{@render children?.()}</aria-ui-popover-popup>
