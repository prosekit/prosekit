<script lang="ts">
import '@prosekit/web/tooltip'
import { defaultTooltipTriggerProps } from '@prosekit/web/tooltip'

import { useEditorContext } from '../../contexts/editor-context'

const hasEditor = Object.hasOwn(defaultTooltipTriggerProps, 'editor')
const editorContext = useEditorContext()
const editor = hasEditor ? editorContext : undefined
</script>

<prosekit-tooltip-trigger {editor} {...$$props}>
  <slot />
</prosekit-tooltip-trigger>
