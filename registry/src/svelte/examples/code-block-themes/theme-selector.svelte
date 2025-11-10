<script lang="ts">
import {
  defineCodeBlockShiki,
  shikiBundledThemesInfo,
  type ShikiBundledTheme,
} from 'prosekit/extensions/code-block'
import { useExtension } from 'prosekit/svelte'
import {
  derived,
  writable,
} from 'svelte/store'

const theme = writable<ShikiBundledTheme>('github-dark')
const extension = derived(theme, ($theme) => {
  return defineCodeBlockShiki({ themes: [$theme] })
})

useExtension(extension)

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  theme.set(target.value as ShikiBundledTheme)
}
</script>

<label for="code-block-theme-selector">Theme</label>
<select
  id="code-block-theme-selector"
  value={$theme}
  onchange={handleChange}
  class="CSS_TOGGLE_BUTTON"
>
  {#each shikiBundledThemesInfo as info (info.id)}
    <option value={info.id}>
      {info.id}
    </option>
  {/each}
</select>
