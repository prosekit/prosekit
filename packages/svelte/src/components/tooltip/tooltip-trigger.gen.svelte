<script lang="ts">
import '@prosekit/web/tooltip'

import { defaultTooltipTriggerProps } from '@prosekit/web/tooltip'
import { ClientUpdate } from '../client-update'
import { useWebComponent } from '../../utils/use-web-component'

let attributes: Record<string, unknown> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useWebComponent(defaultTooltipTriggerProps)

$: {
  attributes = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-tooltip-trigger {...attributes} bind:this={element}>
    <slot />
  </prosekit-tooltip-trigger>
</ClientUpdate>
