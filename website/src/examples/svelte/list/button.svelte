<script lang="ts">
import {
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from 'prosekit/svelte/tooltip'
import type { Snippet } from 'svelte'

interface Props {
  pressed?: boolean
  disabled?: boolean
  tooltip?: string
  onClick?: VoidFunction
  children?: Snippet
}

let {
  pressed = false,
  disabled = false,
  tooltip = '',
  onClick = undefined,
  children,
}: Props = $props()
</script>

<TooltipRoot>
  <TooltipTrigger class="CSS_TOOLTIP_TRIGGER">
    <button
      data-state={pressed ? 'on' : 'off'}
      {disabled}
      onclick={() => onClick?.()}
      onmousedown={(event) => event.preventDefault()}
      class="CSS_TOGGLE_BUTTON"
    >
      {@render children?.()}
      {#if tooltip}
        <span class="sr-only">{tooltip}</span>
      {/if}
    </button>
  </TooltipTrigger>
  {#if tooltip}
    <TooltipContent class="CSS_TOOLTIP_CONTENT">
      {tooltip}
    </TooltipContent>
  {/if}
</TooltipRoot>
