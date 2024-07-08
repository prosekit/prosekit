<script lang="ts">
import '@prosekit/web/tooltip'
import { defaultTooltipContentProps } from '@prosekit/web/tooltip'
import { useWebComponent } from '../../utils/use-web-component'

let attributes: Record<string, unknown> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useWebComponent(defaultTooltipContentProps)

$: {
  attributes = handleChange(element, $$props)
}
</script>

<prosekit-tooltip-content {...attributes} bind:this={element}>
  <slot />
</prosekit-tooltip-content>
