import {
  type ConnectableElement,
  createComputed,
  createSignal,
  mapSignals,
  type ReadonlySignal,
  type SignalState,
  useAttribute,
} from '@aria-ui/core'
import { useMenuRoot, defaultMenuRootProps } from '@aria-ui/menu'
import { useOverlayPositionerState } from '@aria-ui/overlay'
import { usePresence } from '@aria-ui/presence'
import type { VirtualElement } from '@floating-ui/dom'
import { type Editor } from '@prosekit/core'
import { type ProseMirrorNode } from '@prosekit/pm/model'

import { useEditorExtension } from '../../../hooks/use-editor-extension'
import {
  openContext,
  tableColumnPopoverContext,
  tableHandlePopoverContext,
  type TableColumnPopoverContext,
} from '../context'

import {
  type ElementHoverHandler,
  defineElementHoverHandler,
} from './column-pointer'
import type { TableColumnPopoverRootProps } from './props'

export function useTableColumnPopoverRoot(
  host: ConnectableElement,
  state: SignalState<TableColumnPopoverRootProps>,
) {
  const { editor, ...overlayState } = state

  const reference = createSignal<VirtualElement | null>(null)
  const contentOpen = createSignal(false)

  const context = createSignal<TableColumnPopoverContext>({
    cellAxis: null,
    table: null,
  })

  tableColumnPopoverContext.provide(host, context)
  tableHandlePopoverContext.provide(host, context)

  useOverlayPositionerState(host, overlayState, { reference })

  useHoverExtension(host, editor, (referenceValue, table, cellAxis) => {
    reference.set(referenceValue)
    contentOpen.set(false)
    context.set({ table, cellAxis })
  })

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
  let prevTable: ProseMirrorNode | null = null
  let prevCol: number | null = null

  const extension = defineElementHoverHandler((reference, table, cellAxis) => {
    if (prevTable === table?.node && prevCol === cellAxis?.col) {
      return
    }

    prevTable = table?.node ?? null
    prevCol = cellAxis?.col ?? null

    handler(reference, table, cellAxis)
  })

  useEditorExtension(host, editor, extension)
}
