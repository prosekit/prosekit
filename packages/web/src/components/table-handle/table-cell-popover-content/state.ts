import type { ConnectableElement, SignalState } from '@aria-ui/core'
import { useMenuContent } from '@aria-ui/menu'
import type { TableCellPopoverContentProps } from './props'

export function useTableCellPopoverContent(
  host: ConnectableElement,
  props: SignalState<TableCellPopoverContentProps>,
) {
  useMenuContent(host, props)
}
