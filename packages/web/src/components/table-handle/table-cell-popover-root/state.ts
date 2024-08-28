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
import type { ProseMirrorNode, ResolvedPos } from '@prosekit/pm/model'

import { useEditorExtension } from '../../../hooks/use-editor-extension'
import {
  openContext,
  tableCellPopoverContext,
  tableHandlePopoverContext,
  type TableCellPopoverContext,
  type TableHandlePopoverContext,
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

  const contentOpen = createSignal(false)

  const context = createSignal<TableCellPopoverContext>({
    cellAxis: null,
    cellSelection: null,
  })

  const menuContext = createSignal<TableHandlePopoverContext>({
    cellAxis: null,
    table: null,
  })

  tableCellPopoverContext.provide(host, context)
  tableHandlePopoverContext.provide(host, menuContext)

  useOverlayPositionerState(host, overlayState, { reference })

  useHoverExtension(
    host,
    editor,
    (referenceValue, cellAxis, cellSelection, table) => {
      reference.set(referenceValue)
      contentOpen.set(false)
      context.set({ cellAxis, cellSelection })
      menuContext.set({ cellAxis, table })
    },
  )

  const presence = createComputed(() => !!reference.get())
  useAttribute(host, 'data-state', () => (presence.get() ? 'open' : 'closed'))
  usePresence(host, presence)

  openContext.provide(host, presence)

  useMenuRoot(host, {
    ...mapSignals(defaultMenuRootProps),
    open: contentOpen,
  })
}

function useHoverExtension(
  host: ConnectableElement,
  editor: ReadonlySignal<Editor | null>,
  handler: ElementHoverHandler,
) {
  let prevTableNode: ProseMirrorNode | null = null
  let $prevCell: ResolvedPos | null = null

  const extension = defineElementHoverHandler(
    (reference, cellAxis, selection, table) => {
      if (
        prevTableNode === table?.node &&
        $prevCell?.pos === cellAxis?.$cell.pos
      ) {
        return
      }

      prevTableNode = table?.node ?? null
      $prevCell = cellAxis?.$cell ?? null

      handler(reference, cellAxis, selection, table)
    },
  )

  useEditorExtension(host, editor, extension)
}
