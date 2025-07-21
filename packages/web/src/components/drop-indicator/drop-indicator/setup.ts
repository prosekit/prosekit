import {
  useEventListener,
  type ConnectableElement,
  type SignalState,
} from '@aria-ui/core'
import { insertDefaultBlock } from '@prosekit/core'

import type { BlockHandleDropIndicatorProps } from './types'

/**
 * @internal
 */
export function useBlockHandleDropIndicator(
  host: ConnectableElement,
  { state }: { state: SignalState<BlockHandleDropIndicatorProps> },
): void {


  requestAnimationFrame()

  useEventListener()
}


interface Point
