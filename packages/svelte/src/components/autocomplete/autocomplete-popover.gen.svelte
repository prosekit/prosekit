<script lang="ts">
import '@prosekit/web/autocomplete'

import { defaultAutocompletePopoverProps } from '@prosekit/web/autocomplete'
import { ClientUpdate } from '../client-update'
import { useWebComponent } from '../../utils/use-web-component'

let attributes: Record<string, unknown> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useWebComponent(defaultAutocompletePopoverProps)

$: {
  attributes = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-autocomplete-popover {...attributes} bind:this={element}>
    <slot />
  </prosekit-autocomplete-popover>
</ClientUpdate>
