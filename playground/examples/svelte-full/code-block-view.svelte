<script lang="ts">
import type { CodeBlockAttrs } from 'prosekit/extensions/code-block'
import type { SvelteNodeViewProps } from 'prosekit/svelte'
import LanguageSelector from './language-selector.svelte'

export let node: SvelteNodeViewProps['node']
export let setAttrs: SvelteNodeViewProps['setAttrs']
export let contentRef: SvelteNodeViewProps['contentRef']

$: language = $node.attrs.language

const setLanguage = (language: string) => {
  const attrs: CodeBlockAttrs = { language }
  setAttrs(attrs)
}
</script>

<LanguageSelector {language} {setLanguage} />
<pre use:contentRef data-language={language}></pre>
