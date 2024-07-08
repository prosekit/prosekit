<script lang="ts">
import '@prosekit/web/popover'
import { defaultPopoverContentProps } from '@prosekit/web/popover'
import { useWebComponent } from '../../utils/use-web-component'

let attributes: Record<string, unknown> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useWebComponent(defaultPopoverContentProps)

$: {
  attributes = handleChange(element, $$props)
}
</script>

<prosekit-popover-content {...attributes} bind:this={element}>
  <slot />
</prosekit-popover-content>
