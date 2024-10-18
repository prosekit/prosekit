<script lang="ts">
import type { CodeBlockAttrs } from 'prosekit/extensions/code-block'
import type { SvelteNodeViewProps } from 'prosekit/svelte'
import { Themes } from '@prosekit/themes'
import { shikiBundledLanguagesInfo } from 'prosekit/extensions/code-block'

export let node: SvelteNodeViewProps['node']
export let setAttrs: SvelteNodeViewProps['setAttrs']
export let contentRef: SvelteNodeViewProps['contentRef']

// Ignore "<Component> was created with unknown prop" warnings in Svelte v4
$$restProps

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

<div class={Themes.LANGUAGE_WRAPPER} contentEditable={false}>
  <select
    class={Themes.LANGUAGE_SELECT}
    on:change={handleLanguageChange}
    value={language || ''}
  >
    <option value="">Plain Text</option>

    {#each shikiBundledLanguagesInfo as info (info.id)}
      <option value={info.id}>{info.name}</option>
    {/each}
  </select>
</div>
<pre use:contentRef data-language={language}></pre>
