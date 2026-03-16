<script lang="js">
  import { registerTooltipPopupElement } from '../../tooltip/index.ts'
  registerTooltipPopupElement()

  let { children = undefined, ..._restProps } = $props()
</script>

<aria-ui-tooltip-popup {..._restProps}>{@render children?.()}</aria-ui-tooltip-popup>
