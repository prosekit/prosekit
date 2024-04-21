import type { ConnectableElement } from '@aria-ui/core'
import { usePopoverTrigger as _usePopoverTrigger } from '@aria-ui/popover'

// TODO: remove _usePopoverTrigger

export function usePopoverTrigger(host: ConnectableElement) {
  _usePopoverTrigger(host)
  return {}
}
