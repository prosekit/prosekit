<script lang="ts">
import '@prosekit/web/tooltip'
import { defaultTooltipRootProps } from '@prosekit/web/tooltip'
import { ClientOnly } from '../client-update'
import { useWebComponent } from '../../utils/use-web-component'

let attributes: Record<string, unknown> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useWebComponent(defaultTooltipRootProps)

$: {
  attributes = handleChange(element, $$props)
}
</script>

<ClientOnly>
  <prosekit-tooltip-root {...attributes} bind:this={element}>
    <slot />
  </prosekit-tooltip-root>
</ClientOnly>
