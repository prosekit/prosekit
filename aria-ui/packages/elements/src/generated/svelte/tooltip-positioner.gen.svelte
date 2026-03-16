<script lang="js">
  import { registerTooltipPositionerElement } from '../../tooltip/index.ts'
  registerTooltipPositionerElement()

  let { children = undefined, ..._restProps } = $props()
</script>

<aria-ui-tooltip-positioner {..._restProps}>{@render children?.()}</aria-ui-tooltip-positioner>
