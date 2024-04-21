<script lang="ts">
import '@prosekit/web/popover'
import { defaultPopoverContentProps } from '@prosekit/web/popover'

import { useEditorContext } from '../../contexts/editor-context'

const hasEditor = Object.hasOwn(defaultPopoverContentProps, 'editor')
const editorContext = useEditorContext()
const editor = hasEditor ? editorContext : undefined
</script>

<prosekit-popover-content editor={editor} {...$$props}>
  <slot />
</prosekit-popover-content>
