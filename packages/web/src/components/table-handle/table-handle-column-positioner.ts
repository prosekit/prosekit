import {
  computed,
  defineCustomElement,
  defineProps,
  registerCustomElement,
  useEffect,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type State,
} from '@aria-ui/core'
import { setupOverlayPositioner } from '@aria-ui/elements/overlay'
import type { Placement } from '@floating-ui/dom'

import { useHTMLElementAt } from '../../utils/use-html-element-at.ts'

import { SharedTableHandlePositionerPropsDeclaration, type SharedTableHandlePositionerProps } from './shared.ts'
import { tableHandleStoreContext } from './store.ts'

export interface TableHandleColumnPositionerProps extends Omit<SharedTableHandlePositionerProps, 'placement'> {
  /**
   * The placement of the popover, relative to the hovered table cell.
   *
   * @default "top"
   */
  placement: Placement
}

/** @internal */
export const TableHandleColumnPositionerPropsDeclaration: PropsDeclaration<TableHandleColumnPositionerProps> = defineProps<
  TableHandleColumnPositionerProps
>({
  ...SharedTableHandlePositionerPropsDeclaration,
  placement: { default: 'top', attribute: 'placement', type: 'string' },
})

/** @internal */
export function setupTableHandleColumnPositioner(
  host: HostElement,
  props: State<TableHandleColumnPositionerProps>,
): void {
  const getStore = tableHandleStoreContext.consume(host)
  const getOverlayStore = () => getStore()?.columnOverlayStore
  setupOverlayPositioner(host, props, getOverlayStore)

  const getEditor = props.editor.get
  const getColumnFirstCellPos = computed(() => getStore()?.getReferenceCell()?.colFirstCellPos)
  const getReferenceCell = useHTMLElementAt(getEditor, getColumnFirstCellPos)
  useEffect(host, () => {
    getOverlayStore()?.setAnchorElement(getReferenceCell())
  })
}

const TableHandleColumnPositionerElementBase: HostElementConstructor<TableHandleColumnPositionerProps> = defineCustomElement(
  setupTableHandleColumnPositioner,
  TableHandleColumnPositionerPropsDeclaration,
)

/**
 * `<prosekit-table-handle-column-positioner>` custom element.
 *
 * Properties: {@link TableHandleColumnPositionerProps}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-state` | `"open"` when visible, `"closed"` otherwise |
 * | `data-side` | The side of the anchor element the positioner is on |
 * | `data-align` | The alignment of the positioner relative to the anchor element |
 *
 * CSS variables:
 *
 * | Variable | Description |
 * | --- | --- |
 * | `--transform-origin` | The coordinates that this element is anchored to. Useful for scale animations. |
 */
export class TableHandleColumnPositionerElement extends TableHandleColumnPositionerElementBase {}

/** @internal */
export function registerTableHandleColumnPositionerElement(): void {
  registerCustomElement('prosekit-table-handle-column-positioner', TableHandleColumnPositionerElement)
}
