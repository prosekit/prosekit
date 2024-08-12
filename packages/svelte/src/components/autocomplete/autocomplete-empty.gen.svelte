<script lang="ts">
import '@prosekit/web/autocomplete'
import { defaultAutocompleteEmptyProps } from '@prosekit/web/autocomplete'
import { ClientUpdate } from '../client-update'
import { useWebComponent } from '../../utils/use-web-component'

let attributes: Record<string, unknown> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useWebComponent(defaultAutocompleteEmptyProps)

$: {
  attributes = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-autocomplete-empty {...attributes} bind:this={element}>
    <slot />
  </prosekit-autocomplete-empty>
</ClientUpdate>
