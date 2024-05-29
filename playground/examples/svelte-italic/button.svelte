<script lang="ts">
import { Themes } from '@prosekit/themes'
export let pressed: boolean = false
export let disabled: boolean = false
export let onClick: VoidFunction
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
