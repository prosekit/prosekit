<script lang="ts">
import '@prosekit/web/autocomplete'

import { autocompleteEmptyProps, autocompleteEmptyEvents } from '@prosekit/web/autocomplete'
import { ClientUpdate } from '../client-update'
import { useComponent } from '../use-component'
import { useEventHandlers } from '../use-event-handlers'

let attributes: Record<string, unknown> = {}
let eventHandlers: Record<string, (...args: any[]) => any> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useComponent(Object.keys(autocompleteEmptyProps), Object.keys(autocompleteEmptyEvents))

$: {
  [attributes, eventHandlers] = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-autocomplete-empty {...attributes} use:useEventHandlers={eventHandlers} bind:this={element}>
    <slot />
  </prosekit-autocomplete-empty>
</ClientUpdate>
