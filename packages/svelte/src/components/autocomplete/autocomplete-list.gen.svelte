<script lang="ts">
import '@prosekit/web/autocomplete'
import { defaultAutocompleteListProps } from '@prosekit/web/autocomplete'

import { useEditorContext } from '../../contexts/editor-context'

const hasEditor = Object.hasOwn(defaultAutocompleteListProps, 'editor')
const editorContext = useEditorContext()
const editor = hasEditor ? editorContext : undefined
</script>

<prosekit-autocomplete-list {editor} {...$$props}>
  <slot />
</prosekit-autocomplete-list>
