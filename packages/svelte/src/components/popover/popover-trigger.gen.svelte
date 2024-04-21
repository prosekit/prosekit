<script lang="ts">
import '@prosekit/web/popover'
import { defaultPopoverTriggerProps } from '@prosekit/web/popover'

import { useEditorContext } from '../../contexts/editor-context'

const hasEditor = Object.hasOwn(defaultPopoverTriggerProps, 'editor')
const editorContext = useEditorContext()
const editor = hasEditor ? editorContext : undefined
</script>

<prosekit-popover-trigger editor={editor} {...$$props}>
  <slot />
</prosekit-popover-trigger>
