<script lang="ts">
import '@prosekit/web/block-handle'
import { defaultBlockDragHandleProps } from '@prosekit/web/block-handle'

import { useEditorContext } from '../../contexts/editor-context'

const hasEditor = Object.hasOwn(defaultBlockDragHandleProps, 'editor')
const editorContext = useEditorContext()
const editor = hasEditor ? editorContext : undefined
</script>

<prosekit-block-drag-handle editor={editor} {...$$props}>
  <slot />
</prosekit-block-drag-handle>
