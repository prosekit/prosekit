<script lang="ts">
import { Themes } from '@prosekit/themes'
import { shikiBundledLanguagesInfo } from 'prosekit/extensions/code-block'

export let language: string | undefined = undefined
export let setLanguage: (language: string) => void

const handleChange = (event: Event) => {
  setLanguage((event.target as HTMLSelectElement).value)
}
</script>

<div class={Themes.LANGUAGE_WRAPPER} contentEditable={false}>
  <select
    class={Themes.LANGUAGE_SELECT}
    on:change={handleChange}
    value={language || ''}
  >
    <option value="">Plain Text</option>

    {#each shikiBundledLanguagesInfo as info (info.id)}
      <option value={info.id}>{info.name}</option>
    {/each}
  </select>
</div>
