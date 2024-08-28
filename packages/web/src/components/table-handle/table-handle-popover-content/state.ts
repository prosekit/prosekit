import {
  createSignal,
  mapSignals,
  useEffect,
  type ConnectableElement,
  type ReadonlySignal,
  type SignalState,
} from '@aria-ui/core'
import {
  defaultMenuContentProps,
  useMenuContent,
  type MenuContentProps,
} from '@aria-ui/menu'

import { openContext } from '../context'

import type { TableHandlePopoverContentProps } from './props'

export function useTableHandlePopoverContent(
  host: ConnectableElement,
  state: SignalState<TableHandlePopoverContentProps>,
) {
  const open = openContext.consume(host)
  const onKeydownHandlerAdd = useKeyboardHandler(host, open)

  const menuContentProps: SignalState<MenuContentProps> = {
    ...mapSignals({
      ...defaultMenuContentProps,
      onKeydownHandlerAdd,
    }),
    placement: state.placement,
    offset: state.offset,
  }

  useMenuContent(host, menuContentProps)
}

function useKeyboardHandler(
  element: ConnectableElement,
  open: ReadonlySignal<boolean>,
): MenuContentProps['onKeydownHandlerAdd'] {
  const keydownHandler = createSignal<((event: KeyboardEvent) => void) | null>(
    null,
  )

  let disposeKeydownHandler: VoidFunction | undefined

  useEffect(element, () => {
    const keydownHandlerValue = keydownHandler.get()

    if (!keydownHandlerValue) {
      return
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.isComposing || event.defaultPrevented || !open.get()) {
        return false
      }
      keydownHandlerValue(event)
    }

    document.addEventListener('keydown', handleKeydown)

    disposeKeydownHandler = () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  })

  return (keydownHandlerValue) => {
    keydownHandler.set(keydownHandlerValue)
    return () => {
      disposeKeydownHandler?.()
      disposeKeydownHandler = undefined
    }
  }
}
