<script lang="ts">
import '@prosekit/web/popover'
import { defaultPopoverRootProps } from '@prosekit/web/popover'
import { useWebComponent } from '../../utils/use-web-component'

let attributes: Record<string, unknown> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useWebComponent(defaultPopoverRootProps)

$: {
  attributes = handleChange(element, $$props)
}
</script>

<prosekit-popover-root {...attributes} bind:this={element}>
  <slot />
</prosekit-popover-root>
