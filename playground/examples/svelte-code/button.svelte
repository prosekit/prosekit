<script lang="ts">
import { Themes } from '@prosekit/themes'
import {
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from 'prosekit/svelte/tooltip'

export let pressed: boolean | undefined = undefined
export let disabled: boolean | undefined = undefined
export let tooltip: string | undefined = undefined
export let onClick: VoidFunction | undefined = undefined
</script>

<TooltipRoot>
  <TooltipTrigger class={Themes.TOOLTIP_TRIGGER}>
    <button
      data-state={pressed ? 'on' : 'off'}
      disabled={disabled ? true : undefined}
      on:click={onClick}
      on:mousedown|preventDefault
      class={Themes.TOGGLE_BUTTON}
    >
      <slot></slot>
      {#if tooltip}
        <span class="sr-only">{tooltip}</span>
      {/if}
    </button>
  </TooltipTrigger>
  <TooltipContent class={Themes.TOOLTIP_CONTENT}>
    {tooltip}
  </TooltipContent>
</TooltipRoot>
