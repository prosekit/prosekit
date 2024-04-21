<script lang="ts">
import '@prosekit/web/resizable'
import { defaultResizableRootProps } from '@prosekit/web/resizable'

import { useEditorContext } from '../../contexts/editor-context'

const hasEditor = Object.hasOwn(defaultResizableRootProps, 'editor')
const editorContext = useEditorContext()
const editor = hasEditor ? editorContext : undefined
</script>

<prosekit-resizable-root editor={editor} {...$$props}>
  <slot />
</prosekit-resizable-root>
