<script lang="ts">
import '@prosekit/web/autocomplete'

import { defaultAutocompleteItemProps } from '@prosekit/web/autocomplete'
import { ClientUpdate } from '../client-update'
import { useWebComponent } from '../../utils/use-web-component'

let attributes: Record<string, unknown> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useWebComponent(defaultAutocompleteItemProps)

$: {
  attributes = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-autocomplete-item {...attributes} bind:this={element}>
    <slot />
  </prosekit-autocomplete-item>
</ClientUpdate>
