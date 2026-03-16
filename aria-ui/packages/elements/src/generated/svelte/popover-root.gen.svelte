<script lang="js">
  import { registerPopoverRootElement } from '../../popover/popover-root'
  registerPopoverRootElement()

  let { onOpenChange = undefined, children = undefined, ..._restProps } = $props()
</script>

<aria-ui-popover-root {..._restProps} onopenChange={onOpenChange}>{@render children?.()}</aria-ui-popover-root>
