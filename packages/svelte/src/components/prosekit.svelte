<script lang="ts">
import type { Editor } from '@prosekit/core'
import { setEditorContext } from '../contexts/editor-context'

export let editor: Editor

setEditorContext(editor)
</script>

<slot />
