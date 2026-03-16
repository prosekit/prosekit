<script lang="js">
  import { registerPopoverPositionerElement } from '../../popover/popover-positioner'
  registerPopoverPositionerElement()

  let { children = undefined, ..._restProps } = $props()
</script>

<aria-ui-popover-positioner {..._restProps}>{@render children?.()}</aria-ui-popover-positioner>
