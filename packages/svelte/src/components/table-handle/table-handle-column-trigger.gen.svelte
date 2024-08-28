<script lang="ts">
import '@prosekit/web/table-handle'

import { defaultTableHandleColumnTriggerProps } from '@prosekit/web/table-handle'
import { ClientUpdate } from '../client-update'
import { useWebComponent } from '../../utils/use-web-component'

let attributes: Record<string, unknown> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useWebComponent(defaultTableHandleColumnTriggerProps)

$: {
  attributes = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-table-handle-column-trigger {...attributes} bind:this={element}>
    <slot />
  </prosekit-table-handle-column-trigger>
</ClientUpdate>
