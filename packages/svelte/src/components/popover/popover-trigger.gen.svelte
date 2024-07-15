<script lang="ts">
import '@prosekit/web/popover'
import { defaultPopoverTriggerProps } from '@prosekit/web/popover'
import { ClientUpdate } from '../client-update'
import { useWebComponent } from '../../utils/use-web-component'

let attributes: Record<string, unknown> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useWebComponent(defaultPopoverTriggerProps)

$: {
  attributes = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-popover-trigger {...attributes} bind:this={element}>
    <slot />
  </prosekit-popover-trigger>
</ClientUpdate>
