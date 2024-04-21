<script lang="ts">
import '@prosekit/web/autocomplete'
import { defaultAutocompletePopoverProps } from '@prosekit/web/autocomplete'

import { useEditorContext } from '../../contexts/editor-context'

const hasEditor = Object.hasOwn(defaultAutocompletePopoverProps, 'editor')
const editorContext = useEditorContext()
const editor = hasEditor ? editorContext : undefined
</script>

<prosekit-autocomplete-popover editor={editor} {...$$props}>
  <slot />
</prosekit-autocomplete-popover>
