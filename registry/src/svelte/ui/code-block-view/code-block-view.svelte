<script lang="ts">
import type { CodeBlockAttrs } from 'prosekit/extensions/code-block'
import { shikiBundledLanguagesInfo } from 'prosekit/extensions/code-block'
import type { SvelteNodeViewProps } from 'prosekit/svelte'

interface Props extends SvelteNodeViewProps {}

const props: Props = $props()
const node = props.node

const attrs = $derived($node.attrs as CodeBlockAttrs)

function setLanguage(lang: string) {
  const newAttrs: CodeBlockAttrs = { language: lang }
  props.setAttrs(newAttrs)
}

function bindContentRef(element: HTMLPreElement) {
  props.contentRef(element)
}
</script>

<div class="CSS_LANGUAGE_WRAPPER" contentEditable="false">
  <select
    aria-label="Code block language"
    class="CSS_LANGUAGE_SELECT"
    value={attrs.language || ''}
    onchange={(event) => setLanguage((event.target as HTMLSelectElement).value)}
  >
    <option value="">Plain Text</option>
    {#each shikiBundledLanguagesInfo as info (info.id)}
      <option value={info.id}>
        {info.name}
      </option>
    {/each}
  </select>
</div>
<pre use:bindContentRef data-language={attrs.language}></pre>
