<script lang="ts">
import type { CodeBlockAttrs } from 'prosekit/extensions/code-block'
import { shikiBundledLanguagesInfo } from 'prosekit/extensions/code-block'
import type { SvelteNodeViewProps } from 'prosekit/svelte'

const { node, setAttrs, contentRef }: SvelteNodeViewProps = $props()

const attrs = $node.attrs as CodeBlockAttrs
const language = attrs.language

const setLanguage = (language: string) => {
  const attrs: CodeBlockAttrs = { language }
  setAttrs(attrs)
}

const handleLanguageChange = (event: Event) => {
  setLanguage((event.target as HTMLSelectElement).value)
}
</script>

<div class="CSS_LANGUAGE_WRAPPER" contentEditable={false}>
  <select
    class="CSS_LANGUAGE_SELECT"
    onchange={handleLanguageChange}
    value={language || ''}
  >
    <option value="">Plain Text</option>

    {#each shikiBundledLanguagesInfo as info (info.id)}
      <option value={info.id}>{info.name}</option>
    {/each}
  </select>
</div>
<pre use:contentRef data-language={language}></pre>
