<script lang="ts">
import '@prosekit/web/block-handle'
import { defaultBlockPopoverProps } from '@prosekit/web/block-handle'
import { ClientUpdate } from '../client-update'
import { useWebComponent } from '../../utils/use-web-component'

let attributes: Record<string, unknown> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useWebComponent(defaultBlockPopoverProps)

$: {
  attributes = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-block-popover {...attributes} bind:this={element}>
    <slot />
  </prosekit-block-popover>
</ClientUpdate>
