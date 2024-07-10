<script lang="ts">
import LanguageSelector from './language-selector.svelte'

import type { CodeBlockAttrs } from 'prosekit/extensions/code-block'
import type { SvelteNodeViewProps } from 'prosekit/svelte'

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
</script>

<LanguageSelector {language} {setLanguage} />
<pre use:contentRef data-language={language}></pre>
