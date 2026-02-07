<script lang="ts">
import '@prosekit/web/autocomplete'

import { autocompleteListProps, autocompleteListEvents } from '@prosekit/web/autocomplete'
import { ClientUpdate } from '../client-update/index.ts'
import { useComponent } from '../use-component.ts'
import { useEventHandlers } from '../use-event-handlers.ts'

let attributes: Record<string, unknown> = {}
let eventHandlers: Record<string, (...args: any[]) => any> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useComponent(Object.keys(autocompleteListProps), Object.keys(autocompleteListEvents))

$: {
  [attributes, eventHandlers] = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-autocomplete-list {...attributes} use:useEventHandlers={eventHandlers} bind:this={element}>
    <slot />
  </prosekit-autocomplete-list>
</ClientUpdate>
