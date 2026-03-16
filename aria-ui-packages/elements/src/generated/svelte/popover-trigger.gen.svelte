<script lang="js">
  import { registerPopoverTriggerElement } from '../elements/popover-trigger.gen'
  registerPopoverTriggerElement()

  let { onOpenChange = undefined, children = undefined, ..._restProps } = $props()
</script>

<aria-ui-popover-trigger {..._restProps} onopenChange={onOpenChange}>{@render children?.()}</aria-ui-popover-trigger>
