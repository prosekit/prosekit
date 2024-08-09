import type { ConnectableElement, SignalState } from '@aria-ui/core'
import { useMenuTrigger } from '@aria-ui/menu'
import { TableColumnPopoverTriggerProps } from './props'

export function useTableCellPopoverTrigger(
  host: ConnectableElement,
  state: SignalState<TableColumnPopoverTriggerProps>,
) {
  useMenuTrigger(host)
}
