import {
  createComputed,
  createSignal,
  useEffect,
  type ConnectableElement,
  type ReadonlySignal,
  type SetupOptions,
  type SignalState,
  type TypedEventTarget,
} from '@aria-ui/core'
import {
  menuContentProps,
  useMenuContent,
  type MenuContentProps,
} from '@aria-ui/menu/elements'

import { getStateWithDefaults } from '../../../utils/get-default-state'
import { tableHandleRootContext } from '../context'

import type {
  TableHandlePopoverContentEvents,
  TableHandlePopoverContentProps,
} from './types'

export function useTableHandlePopoverContent(
  host: ConnectableElement,
  {
    state,
    emit,
  }: SetupOptions<
    TableHandlePopoverContentProps,
    TableHandlePopoverContentEvents
  >,
): void {
  const rootContext = tableHandleRootContext.consume(host)
  const open = createComputed(() => !!rootContext.get())
  const keyDownTarget = useKeyDownTarget(host, open)

  const menuContentState: SignalState<MenuContentProps> = getStateWithDefaults(
    {
      placement: state.placement,
      offset: state.offset,
      eventTarget: createSignal(keyDownTarget),
    },
    menuContentProps,
  )

  useMenuContent(host, { state: menuContentState, emit })
}

function useKeyDownTarget(
  element: ConnectableElement,
  open: ReadonlySignal<boolean>,
): TypedEventTarget<'keydown'> {
  const keydownHandlers: Array<(event: KeyboardEvent) => void> = []

  useEffect(element, () => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.isComposing || event.defaultPrevented || !open.get()) {
        return false
      }
      keydownHandlers.forEach((handler) => handler(event))
    }

    document.addEventListener('keydown', handleKeydown)

    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  })

  return {
    addEventListener: (type, listener) => {
      if (type === 'keydown') {
        keydownHandlers.push(listener)
      }
    },
    removeEventListener: (type, listener) => {
      if (type === 'keydown') {
        const index = keydownHandlers.indexOf(listener)
        if (index !== -1) {
          keydownHandlers.splice(index, 1)
        }
      }
    },
  }
}
