<script lang="ts">
import '@prosekit/web/popover'

import { defaultPopoverContentProps } from '@prosekit/web/popover'
import { ClientUpdate } from '../client-update'
import { useWebComponent } from '../../utils/use-web-component'

let attributes: Record<string, unknown> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useWebComponent(defaultPopoverContentProps)

$: {
  attributes = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-popover-content {...attributes} bind:this={element}>
    <slot />
  </prosekit-popover-content>
</ClientUpdate>
