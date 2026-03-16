<script lang="js">
  import { registerTooltipRootElement } from '../../tooltip/index.ts'
  registerTooltipRootElement()

  let { onOpenChange = undefined, children = undefined, ..._restProps } = $props()
</script>

<aria-ui-tooltip-root {..._restProps} onopenChange={onOpenChange}>{@render children?.()}</aria-ui-tooltip-root>
