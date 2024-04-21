import type { ConnectableElement } from '@aria-ui/core'
import { useTooltipTrigger as _useTooltipTrigger } from '@aria-ui/tooltip'

export function useTooltipTrigger(host: ConnectableElement) {
  // TODO: improve this
  _useTooltipTrigger(host)
  return {}
}
