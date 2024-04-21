<script lang="ts">
import '@prosekit/web/resizable'
import { defaultResizableHandleProps } from '@prosekit/web/resizable'

import { useEditorContext } from '../../contexts/editor-context'

const hasEditor = Object.hasOwn(defaultResizableHandleProps, 'editor')
const editorContext = useEditorContext()
const editor = hasEditor ? editorContext : undefined
</script>

<prosekit-resizable-handle {editor} {...$$props}>
  <slot />
</prosekit-resizable-handle>
