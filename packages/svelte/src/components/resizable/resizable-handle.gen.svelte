<script lang="ts">
import '@prosekit/web/resizable'
import { defaultResizableHandleProps } from '@prosekit/web/resizable'
import { useWebComponent } from '../../utils/use-web-component'

let attributes: Record<string, unknown> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useWebComponent(defaultResizableHandleProps)

$: {
  attributes = handleChange(element, $$props)
}
</script>

<prosekit-resizable-handle {...attributes} bind:this={element}>
  <slot />
</prosekit-resizable-handle>
