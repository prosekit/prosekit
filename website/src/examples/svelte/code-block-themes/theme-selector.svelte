<script lang="ts">
import {
  defineCodeBlockShiki,
  shikiBundledThemesInfo,
  type ShikiBundledTheme,
} from 'prosekit/extensions/code-block'
import { useExtension } from 'prosekit/svelte'
import { writable } from 'svelte/store'

let theme: ShikiBundledTheme = 'github-dark'

// Ensure extension is always defined
$: extension = defineCodeBlockShiki({ themes: [theme as ShikiBundledTheme] })

// Create a writable store for the extension, initialized with the current extension
const extensionStore = writable(extension)

// Update the store whenever the extension changes
$: {
  extensionStore.set(extension)
}

// Use the store
useExtension(extensionStore)

function change_theme(event: Event) {
  const select = event.target as HTMLSelectElement
  theme = select.value as ShikiBundledTheme
}
</script>

<label for="code-block-theme-selector">Theme</label>
<select
  id="code-block-theme-selector"
  value={theme}
  on:change={change_theme}
  class="CSS_TOGGLE_BUTTON"
>
  {#each shikiBundledThemesInfo as info}
    <option value={info.id}>
      {info.id}
    </option>
  {/each}
</select>
