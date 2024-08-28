<script lang="ts">
import '@prosekit/web/table-handle'

import { defaultTableHandleRowRootProps } from '@prosekit/web/table-handle'
import { ClientUpdate } from '../client-update'
import { useWebComponent } from '../../utils/use-web-component'

let attributes: Record<string, unknown> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useWebComponent(defaultTableHandleRowRootProps)

$: {
  attributes = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-table-handle-row-root {...attributes} bind:this={element}>
    <slot />
  </prosekit-table-handle-row-root>
</ClientUpdate>
