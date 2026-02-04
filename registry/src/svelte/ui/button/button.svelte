<script lang="ts">
import { TooltipContent, TooltipRoot, TooltipTrigger } from 'prosekit/svelte/tooltip'

interface Props {
  pressed?: boolean
  disabled?: boolean
  onClick?: () => void
  tooltip?: string
  children?: import('svelte').Snippet
}

const props: Props = $props()
const pressed = $derived(props.pressed ?? false)
const disabled = $derived(props.disabled ?? false)
</script>

<TooltipRoot>
  <TooltipTrigger class="CSS_TOOLTIP_TRIGGER">
    <button
      data-state={pressed ? 'on' : 'off'}
      {disabled}
      class="CSS_TOGGLE_BUTTON"
      onclick={props.onClick}
      onmousedown={(e) => e.preventDefault()}
    >
      {@render props.children?.()}
      {#if props.tooltip}
        <span class="sr-only">{props.tooltip}</span>
      {/if}
    </button>
  </TooltipTrigger>
  {#if props.tooltip}
    <TooltipContent class="CSS_TOOLTIP_CONTENT">
      {props.tooltip}
    </TooltipContent>
  {/if}
</TooltipRoot>
