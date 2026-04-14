<script lang="ts">
import type { Editor } from '@prosekit/core'
import { setEditorContext } from '../../contexts/editor-context.js'
import { ViewRenderer } from '../view-renderer/index.js'

export let editor: Editor

setEditorContext(editor)
</script>

<ViewRenderer {editor}>
  <slot />
</ViewRenderer>
