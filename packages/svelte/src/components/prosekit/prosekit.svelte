<script lang="ts">
import type { Editor } from '@prosekit/core'
import { setEditorContext } from '../../contexts/editor-context.ts'
import { ViewRenderer } from '../view-renderer/index.ts'

export let editor: Editor

setEditorContext(editor)
</script>

<ViewRenderer {editor}>
  <slot />
</ViewRenderer>
