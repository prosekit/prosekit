import {
  computed,
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
import {
  createOverlayStore,
  OverlayPositionerPropsDeclaration,
  setupOverlayPositioner,
  type OverlayPositionerProps,
} from '@aria-ui/elements/overlay'
import { useAttribute, usePresence } from '@aria-ui/utils'
import type { Placement } from '@floating-ui/dom'
import { isHTMLElement, once } from '@ocavue/utils'
import type { Editor } from '@prosekit/core'

import { getSafeEditorView } from '../../utils/get-safe-editor-view.ts'

import { tableHandleStoreContext } from './store.ts'

export interface TableHandleRowPositionerProps extends Omit<OverlayPositionerProps, 'placement' | 'hoist' | 'flip' | 'shift' | 'hide'> {
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
export const TableHandleRowPositionerPropsDeclaration: PropsDeclaration<TableHandleRowPositionerProps> = defineProps<TableHandleRowPositionerProps>({
  ...OverlayPositionerPropsDeclaration,
  editor: { default: null, attribute: false, type: 'json' },
  placement: { default: 'left', attribute: 'placement', type: 'string' },
  hoist: { default: false, attribute: 'hoist', type: 'boolean' },
  flip: { default: false, attribute: false, type: 'json' },
  shift: { default: false, attribute: 'shift', type: 'boolean' },
  hide: { default: true, attribute: 'hide', type: 'boolean' },
})

/** @internal */
export function setupTableHandleRowPositioner(
  host: HostElement,
  props: Store<TableHandleRowPositionerProps>,
): void {
  const getEditor = props.editor.get
  const getStore = tableHandleStoreContext.consume(host)

  const getRowFirstCellPos = computed(() => getStore()?.getHoveringCell()?.rowFirstCellPos)

  const getReferenceCell = computed((): HTMLElement | undefined => {
    const pos = getRowFirstCellPos()
    const view = getSafeEditorView(getEditor())
    if (!pos || !view) return
    const element = view.nodeDOM(pos)
    if (element && isHTMLElement(element)) return element
  })

  const getPresence = computed(() => !!getReferenceCell())
  useAttribute(host, 'data-state', () => (getPresence() ? 'open' : 'closed'))
  usePresence(host, getPresence)

  const overlayStore = createOverlayStore(
    () => true,
    () => {},
    () => true,
    () => false,
    (event) => host.dispatchEvent(event),
  )

  useEffect(host, () => {
    overlayStore.setAnchorElement(getReferenceCell())
  })

  setupOverlayPositioner(host, props as unknown as Store<OverlayPositionerProps>, () => overlayStore)

  onMount(host, () => {
    host.style.zIndex = '100'
  })
}

const TableHandleRowPositionerElementBase: HostElementConstructor<TableHandleRowPositionerProps> = defineCustomElement(
  setupTableHandleRowPositioner,
  TableHandleRowPositionerPropsDeclaration,
)

/**
 * @public
 */
export class TableHandleRowPositionerElement extends TableHandleRowPositionerElementBase {}

/** @internal */
export const registerTableHandleRowPositionerElement: VoidFunction = once(() => {
  registerCustomElement('prosekit-table-handle-row-positioner', TableHandleRowPositionerElement)
})
