<script lang="ts">
import '@prosekit/web/tooltip'
import { defaultTooltipContentProps } from '@prosekit/web/tooltip'

import { useEditorContext } from '../../contexts/editor-context'

const hasEditor = Object.hasOwn(defaultTooltipContentProps, 'editor')
const editorContext = useEditorContext()
const editor = hasEditor ? editorContext : undefined
</script>

<prosekit-tooltip-content {editor} {...$$props}>
  <slot />
</prosekit-tooltip-content>
