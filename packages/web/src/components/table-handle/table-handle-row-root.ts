import {
  computed,
  createSignal,
  defineCustomElement,
  defineProps,
  onMount,
  registerCustomElement,
  useEffect,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type Store,
} from '@aria-ui-v2/core'
import { createMenuStore, MenuStoreContext } from '@aria-ui-v2/elements/menu'
import { createOverlayStore, OverlayPositionerPropsDeclaration, updatePlacement, type OverlayPositionerProps } from '@aria-ui-v2/elements/overlay'
import { useAttribute, usePresence } from '@aria-ui-v2/utils'
import type { Placement } from '@floating-ui/dom'
import { once } from '@ocavue/utils'
import type { Editor } from '@prosekit/core'

import { getSafeEditorView } from '../../utils/get-safe-editor-view.ts'

import { tableHandleStoreContext } from './store.ts'

export interface TableHandleRowRootProps extends Omit<OverlayPositionerProps, 'placement' | 'hoist' | 'flip' | 'shift' | 'hide'> {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null

  /**
   * The placement of the popover, relative to the hovered table cell.
   *
   * @default "left"
   */
  placement: Placement

  /**
   * Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
   * to place the floating element on top of other page content.
   *
   * @default false
   */
  hoist: boolean

  /**
   * @default false
   * @hidden
   */
  flip: boolean

  /**
   * @default false
   * @hidden
   */
  shift: boolean

  /**
   * @default true
   * @hidden
   */
  hide: boolean
}

/** @internal */
export const TableHandleRowRootPropsDeclaration: PropsDeclaration<TableHandleRowRootProps> = defineProps<TableHandleRowRootProps>({
  ...OverlayPositionerPropsDeclaration,
  editor: { default: null, attribute: false, type: 'json' },
  placement: { default: 'left', attribute: 'placement', type: 'string' },
  // Enabling `hoist` will cause the popover to have a small delay when
  // scrolling the page.
  hoist: { default: false, attribute: 'hoist', type: 'boolean' },
  flip: { default: false, attribute: false, type: 'json' },
  shift: { default: false, attribute: 'shift', type: 'boolean' },
  hide: { default: true, attribute: 'hide', type: 'boolean' },
})

/**
 * @internal
 */
export function setupTableHandleRowRoot(
  host: HostElement,
  props: Store<TableHandleRowRootProps>,
): void {
  const getEditor = props.editor.get
  const getStore = tableHandleStoreContext.consume(host)

  const getRowFirstCellPos = computed(() => getStore()?.getHoveringCell()?.rowFirstCellPos)

  const getReferenceCell = computed<HTMLElement | null>(() => {
    const pos = getRowFirstCellPos()
    const view = getSafeEditorView(getEditor())
    if (!pos || !view) return null
    return view.nodeDOM(pos) as HTMLElement | null
  })

  const contentOpen = createSignal(false)

  // Close the menu when the hovering element is changed
  useEffect(host, () => {
    getRowFirstCellPos()
    contentOpen.set(false)
  })

  // Overlay positioning
  useEffect(host, () => {
    const ref = getReferenceCell()
    if (!ref) return

    return updatePlacement(host, ref, {
      strategy: props.strategy.get(),
      placement: props.placement.get(),
      autoUpdate: props.autoUpdate.get(),
      hoist: props.hoist.get(),
      offset: props.offset.get(),
      flip: props.flip.get(),
      shift: props.shift.get(),
      overlap: props.overlap.get(),
      fitViewport: props.fitViewport.get(),
      sameWidth: props.sameWidth.get(),
      sameHeight: props.sameHeight.get(),
      inline: props.inline.get(),
      hide: props.hide.get(),
      boundary: props.boundary.get(),
      rootBoundary: props.rootBoundary.get(),
      overflowPadding: props.overflowPadding.get(),
      elementContext: props.elementContext.get(),
      altBoundary: props.altBoundary.get(),
    })
  })

  // Presence
  const getPresence = computed(() => !!getReferenceCell())
  useAttribute(host, 'data-state', () => (getPresence() ? 'open' : 'closed'))
  usePresence(host, getPresence)

  // Menu store
  const overlayStore = createOverlayStore(
    contentOpen.get,
    contentOpen.set,
    () => false,
    () => false,
    (event) => host.dispatchEvent(event),
  )
  const menuStore = createMenuStore(overlayStore)
  MenuStoreContext.provide(host, menuStore)

  onMount(host, () => {
    // TODO: understand why we need zIndex here and if there's a better way to handle it
    host.style.zIndex = '10'
  })
}

const TableHandleRowRootElementBase: HostElementConstructor<TableHandleRowRootProps> = defineCustomElement(
  setupTableHandleRowRoot,
  TableHandleRowRootPropsDeclaration,
)

/**
 * @public
 */
export class TableHandleRowRootElement extends TableHandleRowRootElementBase {}

/**
 * @internal
 */
export const registerTableHandleRowRootElement: VoidFunction = once(() => {
  registerCustomElement('prosekit-table-handle-row-root', TableHandleRowRootElement)
})
