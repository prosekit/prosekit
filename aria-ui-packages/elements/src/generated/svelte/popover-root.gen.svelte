<script lang="js">
  import { registerPopoverRootElement } from '../elements/popover-root.gen'
  registerPopoverRootElement()

  let { onOpenChange = undefined, children = undefined, ..._restProps } = $props()
</script>

<aria-ui-popover-root {..._restProps} onopenChange={onOpenChange}>{@render children?.()}</aria-ui-popover-root>
