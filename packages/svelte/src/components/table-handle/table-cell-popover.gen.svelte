<script lang="ts">
import '@prosekit/web/table-handle'
import { defaultTableCellPopoverProps } from '@prosekit/web/table-handle'
import { ClientUpdate } from '../client-update'
import { useWebComponent } from '../../utils/use-web-component'

let attributes: Record<string, unknown> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useWebComponent(defaultTableCellPopoverProps)

$: {
  attributes = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-table-cell-popover {...attributes} bind:this={element}>
    <slot />
  </prosekit-table-cell-popover>
</ClientUpdate>
