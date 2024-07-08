<script lang="ts">
import '@prosekit/web/autocomplete'
import { defaultAutocompleteListProps } from '@prosekit/web/autocomplete'
import { useWebComponent } from '../../utils/use-web-component'

let attributes: Record<string, unknown> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useWebComponent(defaultAutocompleteListProps)

$: {
  attributes = handleChange(element, $$props)
}
</script>

<prosekit-autocomplete-list {...attributes} bind:this={element}>
  <slot />
</prosekit-autocomplete-list>
