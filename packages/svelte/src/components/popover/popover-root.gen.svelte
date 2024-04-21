<script lang="ts">
import '@prosekit/web/popover'
import { defaultPopoverRootProps } from '@prosekit/web/popover'

import { useEditorContext } from '../../contexts/editor-context'

const hasEditor = Object.hasOwn(defaultPopoverRootProps, 'editor')
const editorContext = useEditorContext()
const editor = hasEditor ? editorContext : undefined
</script>

<prosekit-popover-root editor={editor} {...$$props}>
  <slot />
</prosekit-popover-root>
