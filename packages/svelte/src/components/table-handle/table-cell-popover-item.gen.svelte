<script lang="ts">
import '@prosekit/web/table-handle'
import { defaultTableCellPopoverItemProps } from '@prosekit/web/table-handle'
import { ClientUpdate } from '../client-update'
import { useWebComponent } from '../../utils/use-web-component'

let attributes: Record<string, unknown> = {}
let element: HTMLElement | undefined = undefined
const handleChange = useWebComponent(defaultTableCellPopoverItemProps)

$: {
  attributes = handleChange(element, $$props)
}
</script>

<ClientUpdate>
  <prosekit-table-cell-popover-item {...attributes} bind:this={element}>
    <slot />
  </prosekit-table-cell-popover-item>
</ClientUpdate>
