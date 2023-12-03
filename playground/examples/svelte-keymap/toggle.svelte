<script lang="ts">
export let pressed: boolean
export let disabled: boolean = false
export let onClick: VoidFunction
</script>

<button
  data-state={pressed ? 'on' : 'off'}
  disabled={disabled ? true : undefined}
  on:click={onClick}
  on:mousedown|preventDefault
  class="TOGGLE_BUTTON"
>
  <slot />
</button>
