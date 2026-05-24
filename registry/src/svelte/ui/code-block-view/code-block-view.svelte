<script lang="ts">
import { renderMermaidSVG, THEMES } from 'beautiful-mermaid'
import type { ProseMirrorNode } from 'prosekit/pm/model'
import type { CodeBlockAttrs } from 'prosekit/extensions/code-block'
import { hasCodeBlockPreviewHiddenDecoration, shikiBundledLanguagesInfo } from 'prosekit/extensions/code-block'
import { TextSelection } from 'prosekit/pm/state'
import type { Decoration } from 'prosekit/pm/view'
import type { SvelteNodeViewProps } from 'prosekit/svelte'
import { fromStore } from 'svelte/store'

interface Props extends SvelteNodeViewProps {}

const props: Props = $props()
const node: ProseMirrorNode = $derived(fromStore(props.node).current)
const decorations: readonly Decoration[] = $derived(fromStore(props.decorations).current)

const attrs = $derived(node.attrs as CodeBlockAttrs)
const language = $derived(attrs.language || '')
const forceShowSource = $derived(hasCodeBlockPreviewHiddenDecoration(decorations))
const showMermaidPreview = $derived(!forceShowSource && language === 'mermaid')

const mermaidPreview = $derived.by<{ svg: string | null; error: Error | null }>(() => {
  if (language !== 'mermaid') return { svg: null, error: null }
  try {
    return { svg: renderMermaidSVG(node.textContent, THEMES['tokyo-night']), error: null }
  } catch (err) {
    return { svg: null, error: err instanceof Error ? err : new Error(String(err)) }
  }
})

function setLanguage(lang: string) {
  const newAttrs: CodeBlockAttrs = { language: lang }
  props.setAttrs(newAttrs)
}

function bindContentRef(element: HTMLPreElement) {
  props.contentRef(element)
}

function focusSource(event: MouseEvent) {
  event.preventDefault()
  const pos = props.getPos()
  if (typeof pos !== 'number') return
  const { state, dispatch } = props.view
  const selection = TextSelection.near(state.doc.resolve(pos + 1), 1)
  // TODO: remove this `as never` cast.
  // svelte-check follows project-reference redirects into @prosekit/pm, whose
  // build tsconfig uses `module: NodeNext`. Combined with our SourceFiles being
  // parsed in bundler mode (so impliedNodeFormat is undefined), the resolver
  // falls back to CJS and loads `prosemirror-state/dist/index.d.cts` for some
  // import chains while loading `dist/index.d.ts` for others. The `Selection`
  // class has a `private curSelection` field, so the two declarations are
  // nominally distinct and the assignment fails. `tsc --build` and `vue-tsc`
  // are not affected.
  dispatch(state.tr.setSelection(selection as never))
  props.view.focus()
}
</script>

<div
  class="CSS_LANGUAGE_WRAPPER"
  contentEditable="false"
  data-preview={showMermaidPreview ? '' : undefined}
>
  <select
    aria-label="Code block language"
    class="CSS_LANGUAGE_SELECT"
    value={language}
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
<pre
  use:bindContentRef
  class="CSS_CODE_BLOCK_PREVIEW_SOURCE"
  data-preview={showMermaidPreview ? '' : undefined}
  data-language={language}
></pre>
{#if showMermaidPreview}
  <div
    class="CSS_CODE_BLOCK_PREVIEW_DISPLAY"
    contentEditable="false"
    tabindex={0}
    onmousedown={focusSource}
  >
    {#if mermaidPreview.error}
      <pre>{mermaidPreview.error.message}</pre>
    {/if}
    {#if mermaidPreview.svg}
      <div>{@html mermaidPreview.svg}</div>
    {/if}
  </div>
{/if}
