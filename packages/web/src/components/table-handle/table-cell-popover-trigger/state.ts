import type { ConnectableElement } from '@aria-ui/core'
import { useMenuTrigger } from '@aria-ui/menu'

export function useTableCellPopoverTrigger(host: ConnectableElement) {
  useMenuTrigger(host)
}
