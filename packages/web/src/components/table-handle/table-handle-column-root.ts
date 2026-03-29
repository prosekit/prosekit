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
} from '@aria-ui/core'
import { createMenuStore, MenuStoreContext } from '@aria-ui/elements/menu'
import { createOverlayStore, OverlayPositionerPropsDeclaration, type OverlayPositionerProps } from '@aria-ui/elements/overlay'
import { useAttribute, usePresence } from '@aria-ui/utils'
import type { Placement } from '@floating-ui/dom'
import { isHTMLElement, once } from '@ocavue/utils'
import type { Editor } from '@prosekit/core'

import { getSafeEditorView } from '../../utils/get-safe-editor-view.ts'

import { tableHandleStoreContext } from './store.ts'

export interface TableHandleColumnRootProps extends Omit<OverlayPositionerProps, 'placement' | 'hoist' | 'flip' | 'shift' | 'hide'> {
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
   * @default "top"
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
export const TableHandleColumnRootPropsDeclaration: PropsDeclaration<TableHandleColumnRootProps> = defineProps<TableHandleColumnRootProps>({
  ...OverlayPositionerPropsDeclaration,
  editor: { default: null, attribute: false, type: 'json' },
  placement: { default: 'top', attribute: 'placement', type: 'string' },
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
export function setupTableHandleColumnRoot(
  host: HostElement,
  props: Store<TableHandleColumnRootProps>,
): void {
  const getEditor = props.editor.get
  const getStore = tableHandleStoreContext.consume(host)

  const getColFirstCellPos = computed(() => getStore()?.getHoveringCell()?.colFirstCellPos)

  const getReferenceCell = computed((): HTMLElement | undefined => {
    const pos = getColFirstCellPos()
    const view = getSafeEditorView(getEditor())
    if (!pos || !view) return
    const element = view.nodeDOM(pos)
    if (element && isHTMLElement(element)) return element
  })

  const contentOpen = createSignal(false)

  // Close the menu when the hovering element is changed
  useEffect(host, () => {
    getColFirstCellPos()
    contentOpen.set(false)
  })

  // Presence
  const getPresence = computed(() => !!getReferenceCell())
  useAttribute(host, 'data-state', () => (getPresence() ? 'open' : 'closed'))
  usePresence(host, getPresence)

  // Menu store
  const overlayStore = createOverlayStore(
    contentOpen.get,
    contentOpen.set,
    () => true,
    () => false,
    (event) => host.dispatchEvent(event),
  )
  const menuStore = createMenuStore(overlayStore)
  MenuStoreContext.provide(host, menuStore)



  useEffect(host, () => {
    overlayStore.setAnchorElement(getReferenceCell())
  })

  onMount(host, () => {
    // TODO: understand why we need zIndex here and if there's a better way to handle it
    host.style.zIndex = '100'
  })
}

const TableHandleColumnRootElementBase: HostElementConstructor<TableHandleColumnRootProps> = defineCustomElement(
  setupTableHandleColumnRoot,
  TableHandleColumnRootPropsDeclaration,
)

/**
 * @public
 */
export class TableHandleColumnRootElement extends TableHandleColumnRootElementBase {}

/**
 * @internal
 */
export const registerTableHandleColumnRootElement: VoidFunction = once(() => {
  registerCustomElement('prosekit-table-handle-column-root', TableHandleColumnRootElement)
})
