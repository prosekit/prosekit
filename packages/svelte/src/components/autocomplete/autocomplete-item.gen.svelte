<script lang="ts">
import '@prosekit/web/autocomplete'
import { defaultAutocompleteItemProps } from '@prosekit/web/autocomplete'

import { useEditorContext } from '../../contexts/editor-context'

const hasEditor = Object.hasOwn(defaultAutocompleteItemProps, 'editor')
const editorContext = useEditorContext()
const editor = hasEditor ? editorContext : undefined
</script>

<prosekit-autocomplete-item editor={editor} {...$$props}>
  <slot />
</prosekit-autocomplete-item>
