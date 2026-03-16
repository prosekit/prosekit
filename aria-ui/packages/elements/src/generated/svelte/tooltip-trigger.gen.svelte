<script lang="js">
  import { registerTooltipTriggerElement } from '../../tooltip/index.ts'
  registerTooltipTriggerElement()

  let { children = undefined, ..._restProps } = $props()
</script>

<aria-ui-tooltip-trigger {..._restProps}>{@render children?.()}</aria-ui-tooltip-trigger>
