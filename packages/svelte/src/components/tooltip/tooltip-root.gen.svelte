<script lang="ts">
import '@prosekit/web/tooltip'
import { defaultTooltipRootProps } from '@prosekit/web/tooltip'

import { useEditorContext } from '../../contexts/editor-context'

const hasEditor = Object.hasOwn(defaultTooltipRootProps, 'editor')
const editorContext = useEditorContext()
const editor = hasEditor ? editorContext : undefined
</script>

<prosekit-tooltip-root {editor} {...$$props}>
  <slot />
</prosekit-tooltip-root>
