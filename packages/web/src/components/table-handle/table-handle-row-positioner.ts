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

export interface TableHandleRowPositionerProps extends Omit<SharedTableHandlePositionerProps, 'placement'> {
  /**
   * The placement of the popover, relative to the hovered table cell.
   *
   * @default "left"
   */
  placement: Placement
}

/** @internal */
export const TableHandleRowPositionerPropsDeclaration: PropsDeclaration<TableHandleRowPositionerProps> = defineProps<
  TableHandleRowPositionerProps
>({
  ...SharedTableHandlePositionerPropsDeclaration,
  placement: { default: 'left', attribute: 'placement', type: 'string' },
})

/** @internal */
export function setupTableHandleRowPositioner(
  host: HostElement,
  props: State<TableHandleRowPositionerProps>,
): void {
  const getStore = tableHandleStoreContext.consume(host)
  const getOverlayStore = () => getStore()?.rowOverlayStore
  setupOverlayPositioner(host, props, getOverlayStore)

  const getEditor = props.editor.get
  const getRowFirstCellPos = computed(() => getStore()?.getReferenceCell()?.rowFirstCellPos)
  const getReferenceCell = useHTMLElementAt(getEditor, getRowFirstCellPos)
  useEffect(host, () => {
    getOverlayStore()?.setAnchorElement(getReferenceCell())
  })
}

const TableHandleRowPositionerElementBase: HostElementConstructor<TableHandleRowPositionerProps> = defineCustomElement(
  setupTableHandleRowPositioner,
  TableHandleRowPositionerPropsDeclaration,
)

/**
 * `<prosekit-table-handle-row-positioner>` custom element.
 *
 * Properties: {@link TableHandleRowPositionerProps}
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
export class TableHandleRowPositionerElement extends TableHandleRowPositionerElementBase {}

/** @internal */
export function registerTableHandleRowPositionerElement(): void {
  registerCustomElement('prosekit-table-handle-row-positioner', TableHandleRowPositionerElement)
}
