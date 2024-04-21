<script lang="ts">
import '@prosekit/web/inline-popover'
import { defaultInlinePopoverProps } from '@prosekit/web/inline-popover'

import { useEditorContext } from '../../contexts/editor-context'

const hasEditor = Object.hasOwn(defaultInlinePopoverProps, 'editor')
const editorContext = useEditorContext()
const editor = hasEditor ? editorContext : undefined
</script>

<prosekit-inline-popover editor={editor} {...$$props}>
  <slot />
</prosekit-inline-popover>
