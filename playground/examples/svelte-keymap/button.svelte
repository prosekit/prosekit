<script lang="ts">
import { Themes } from '@prosekit/themes'
import {
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from 'prosekit/svelte/tooltip'

export let pressed: boolean = false
export let disabled: boolean = false
export let tooltip: string = ''
export let onClick: VoidFunction | undefined = undefined
</script>

<button
  data-state={pressed ? 'on' : 'off'}
  disabled={disabled ? true : undefined}
  on:click={onClick}
  on:mousedown|preventDefault
  class={Themes.TOGGLE_BUTTON}
>
  <slot />
</button>

<TooltipRoot>
  <TooltipTrigger class={Themes.TOOLTIP_TRIGGER}>
    <button
      data-state={pressed ? 'on' : 'off'}
      {disabled}
      on:click={() => onClick?.()}
      on:mousedown={(event) => event.preventDefault()}
      class={Themes.TOGGLE_BUTTON}
    >
      <slot />
      {#if tooltip}
        <span class="sr-only">{tooltip}</span>
      {/if}
    </button>
  </TooltipTrigger>
  <TooltipContent class={Themes.TOOLTIP_CONTENT}>
    {tooltip}
  </TooltipContent>
</TooltipRoot>
