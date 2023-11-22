<script lang="ts">
export let active: boolean
export let available: boolean
export let onChange: VoidFunction
</script>

<button
  data-state={active ? 'on' : 'off'}
  on:mousedown|preventDefault
  on:click={() => onChange()}
  disabled={!available}
  class="TOGGLE_BUTTON"
>
  <slot />
</button>
