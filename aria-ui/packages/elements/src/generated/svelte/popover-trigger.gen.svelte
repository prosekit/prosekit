<script lang="js">
  import { registerPopoverTriggerElement } from '../../popover/index.ts'
  registerPopoverTriggerElement()

  let { onOpenChange = undefined, children = undefined, ..._restProps } = $props()
</script>

<aria-ui-popover-trigger {..._restProps} onopenChange={onOpenChange}>{@render children?.()}</aria-ui-popover-trigger>
