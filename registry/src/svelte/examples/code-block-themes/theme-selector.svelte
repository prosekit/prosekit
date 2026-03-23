<script lang="ts">
import { defineCodeBlockShiki, shikiBundledThemesInfo, type ShikiBundledTheme } from 'prosekit/extensions/code-block'
import { useExtension } from 'prosekit/svelte'
import { toStore } from 'svelte/store'

let theme: ShikiBundledTheme = $state('github-dark')
let extension = $derived(defineCodeBlockShiki({ themes: [theme] }))

useExtension(toStore(() => extension))

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  theme = target.value as ShikiBundledTheme
}
</script>

<label for="code-block-theme-selector">Theme</label>
<select
  id="code-block-theme-selector"
  value={theme}
  onchange={handleChange}
  class="CSS_TOGGLE_BUTTON"
>
  {#each shikiBundledThemesInfo as info (info.id)}
    <option value={info.id}>
      {info.id}
    </option>
  {/each}
</select>
