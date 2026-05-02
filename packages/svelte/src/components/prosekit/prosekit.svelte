<script lang="ts">
import type { Editor } from '@prosekit/core'
import type { Snippet } from 'svelte'
import { setEditorContext } from '../../contexts/editor-context.ts'
import { ViewRenderer } from '../view-renderer/index.ts'

let props: { editor: Editor; children?: Snippet } = $props()

setEditorContext(() => props.editor)
</script>

<ViewRenderer editor={props.editor}>
  {@render props.children?.()}
</ViewRenderer>
