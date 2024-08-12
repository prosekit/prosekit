<script lang="ts">
import '@prosekit/web/resizable'

import { defaultResizableRootProps } from '@prosekit/web/resizable'
import { ClientUpdate } from '../client-update'
import { useWebComponent } from '../../utils/use-web-component'

let attributes: Record<string, unknown> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useWebComponent(defaultResizableRootProps)

$: {
  attributes = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-resizable-root {...attributes} bind:this={element}>
    <slot />
  </prosekit-resizable-root>
</ClientUpdate>
