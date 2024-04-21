<script lang="ts">
import '@prosekit/web/autocomplete'
import { defaultAutocompleteEmptyProps } from '@prosekit/web/autocomplete'

import { useEditorContext } from '../../contexts/editor-context'

const hasEditor = Object.hasOwn(defaultAutocompleteEmptyProps, 'editor')
const editorContext = useEditorContext()
const editor = hasEditor ? editorContext : undefined
</script>

<prosekit-autocomplete-empty editor={editor} {...$$props}>
  <slot />
</prosekit-autocomplete-empty>
