<script lang="ts">
import '@prosekit/web/block-handle'

import { defaultBlockHandlePopoverProps } from '@prosekit/web/block-handle'
import { ClientUpdate } from '../client-update'
import { useWebComponent } from '../../utils/use-web-component'

let attributes: Record<string, unknown> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useWebComponent(defaultBlockHandlePopoverProps)

$: {
  attributes = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-block-handle-popover {...attributes} bind:this={element}>
    <slot />
  </prosekit-block-handle-popover>
</ClientUpdate>
