<script lang="ts">
import type { BasicExtension } from 'prosekit/basic'
import type { Union } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/svelte'
import { createHTMLRenderer, createMarkdownRenderer, createSvelteRenderer, type SvelteASTNode } from 'prosekit/static-renderer'

import ProseMirrorRenderer from './ProseMirrorRenderer.svelte'

interface Props {
  type: 'html' | 'markdown' | 'svelte'
  extension: Union<readonly [BasicExtension]>
}

let { type, extension }: Props = $props()

const docJSON = useEditorDerivedValue((editor) => {
  return editor.getDocJSON()
})

function getTitle(type: string) {
  if (type === 'html') return 'renderToHTMLString Output'
  if (type === 'markdown') return 'renderToMarkdown Output'
  return 'renderToSvelteAST Output'
}
</script>

<div class="border border-solid border-gray-300 rounded flex flex-col" style="min-height: 150px; max-height: 300px">
  <div class="bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 border-b border-solid border-gray-300 shrink-0">
    {getTitle(type)}
  </div>
  {#if type === 'svelte'}
    <div class="p-3 overflow-auto flex-1">
      {#if $docJSON}
        {@const render = createSvelteRenderer({ extension })}
        {@const ast = render($docJSON)}
        <ProseMirrorRenderer node={ast} />
      {/if}
    </div>
  {:else}
    <pre class="p-3 text-xs overflow-auto whitespace-pre-wrap flex-1 m-0">
      {#if $docJSON}
        {#if type === 'html'}
          {@const render = createHTMLRenderer({ extension })}
          {render($docJSON)}
        {:else if type === 'markdown'}
          {@const render = createMarkdownRenderer({ extension })}
          {render($docJSON)}
        {/if}
      {/if}
    </pre>
  {/if}
</div>
