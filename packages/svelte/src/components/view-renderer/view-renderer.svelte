<script lang="ts">
import { union, type Editor } from '@prosekit/core'
import { useSvelteRenderer } from '@prosemirror-adapter/svelte'
import { getAllContexts } from 'svelte'
import { readable } from 'svelte/store'
import { defineSvelteMarkViewFactory } from '../../extensions/svelte-mark-view.ts'
import { defineSvelteNodeViewFactory } from '../../extensions/svelte-node-view.ts'
import { useEditorExtension } from '../../hooks/use-editor-extension.ts'

export let editor: Editor

const { renderSvelteRenderer, removeSvelteRenderer } = useSvelteRenderer()
const context = getAllContexts()

const extension = union([
  defineSvelteMarkViewFactory(renderSvelteRenderer, removeSvelteRenderer, context),
  defineSvelteNodeViewFactory(renderSvelteRenderer, removeSvelteRenderer, context),
])

useEditorExtension(editor, readable(extension))
</script>

<slot />
