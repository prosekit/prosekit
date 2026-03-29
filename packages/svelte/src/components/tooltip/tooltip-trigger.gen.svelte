<script lang="js">
  import { registerTooltipTriggerElement } from '@prosekit/web/tooltip'
  registerTooltipTriggerElement()

  let { closeDelay: p0, disabled: p1, openDelay: p2, children = undefined, ...restProps } = $props()
  let element

  $effect(() => {
    if (!element) return

    Object.assign(element, { closeDelay: p0, disabled: p1, openDelay: p2 })
  })
</script>

<prosekit-tooltip-trigger {...restProps} bind:this={element}>{@render children?.()}</prosekit-tooltip-trigger>
