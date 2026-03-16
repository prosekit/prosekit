<script lang="js">
  import { registerPopoverPositionerElement } from '../elements/popover-positioner.gen'
  registerPopoverPositionerElement()

  let { children = undefined, ..._restProps } = $props()
</script>

<aria-ui-popover-positioner {..._restProps}>{@render children?.()}</aria-ui-popover-positioner>
