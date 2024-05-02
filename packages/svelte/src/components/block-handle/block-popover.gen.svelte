<script lang="ts">
import '@prosekit/web/block-handle'
import { defaultBlockPopoverProps } from '@prosekit/web/block-handle'

import { useEditorContext } from '../../contexts/editor-context'

const hasEditor = Object.hasOwn(defaultBlockPopoverProps, 'editor')
const editorContext = useEditorContext()
const editor = hasEditor ? editorContext : undefined
</script>

<prosekit-block-popover {editor} {...$$props}>
  <slot />
</prosekit-block-popover>
