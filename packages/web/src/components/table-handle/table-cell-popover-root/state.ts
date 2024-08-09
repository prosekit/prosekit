import {
  createComputed,
  createSignal,
  mapSignals,
  useAttribute,
  type ConnectableElement,
  type ReadonlySignal,
  type SignalState,
} from '@aria-ui/core'
import { defaultMenuRootProps, useMenuRoot } from '@aria-ui/menu'
import { useOverlayPositionerState } from '@aria-ui/overlay'
import { usePresence } from '@aria-ui/presence'
import type { VirtualElement } from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'
import type { ResolvedPos } from '@prosekit/pm/model'

import { useEditorExtension } from '../../../hooks/use-editor-extension'
import {
  openContext,
  tableCellPopoverContext,
  type TableCellPopoverContext,
} from '../context'

import {
  type ElementHoverHandler,
  defineElementHoverHandler,
} from './cell-pointer'
import type { TableCellPopoverRootProps } from './props'

export function useTableCellPopoverRoot(
  host: ConnectableElement,
  state: SignalState<TableCellPopoverRootProps>,
) {
  const { editor, ...overlayState } = state
  const reference = createSignal<VirtualElement | null>(null)

  const defaultContentOpen = createSignal<false>(false)

  const contentOpen = createSignal(false)

  const context = createSignal<TableCellPopoverContext>({
    cellAxis: null,
    cellSelection: null,
  })

  tableCellPopoverContext.provide(host, context)

  useOverlayPositionerState(host, overlayState, { reference })

  useHoverExtension(
    host,
    editor,
    (referenceValue, _element, cellAxis, cellSelection) => {
      reference.set(referenceValue)
      contentOpen.set(false)
      context.set({ cellAxis, cellSelection })
    },
  )

  const presence = createComputed(() => !!reference.get())
  useAttribute(host, 'data-state', () => (presence.get() ? 'open' : 'closed'))
  usePresence(host, presence)

  openContext.provide(host, presence)

  useMenuRoot(host, {
    ...mapSignals(defaultMenuRootProps),
    defaultOpen: defaultContentOpen,
    open: contentOpen,
  })
}

function useHoverExtension(
  host: ConnectableElement,
  editor: ReadonlySignal<Editor | null>,
  handler: ElementHoverHandler,
) {
  let prevElement: HTMLElement | null = null
  let $prevCell: ResolvedPos | null = null

  const extension = defineElementHoverHandler(
    (reference, element, cellAxis, selection) => {
      if (prevElement === element && $prevCell?.pos === cellAxis?.$cell.pos) {
        return
      }

      prevElement = element
      $prevCell = cellAxis?.$cell ?? null

      handler(reference, element, cellAxis, selection)
    },
  )

  useEditorExtension(host, editor, extension)
}
