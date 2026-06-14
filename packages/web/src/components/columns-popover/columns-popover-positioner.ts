import {
  defineCustomElement,
  defineProps,
  registerCustomElement,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type State,
} from '@aria-ui/core'
import { OverlayPositionerPropsDeclaration, setupOverlayPositioner, type OverlayPositionerProps } from '@aria-ui/elements/overlay'
import type { Placement } from '@floating-ui/dom'

import { columnsPopoverStoreContext } from './store.ts'

export interface ColumnsPopoverPositionerProps extends Omit<OverlayPositionerProps, 'placement' | 'hoist' | 'flip' | 'shift' | 'hide'> {
  /**
   * The placement of the popover, relative to the column node.
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
export const ColumnsPopoverPositionerPropsDeclaration: PropsDeclaration<ColumnsPopoverPositionerProps> = /* @__PURE__ */ defineProps<
  ColumnsPopoverPositionerProps
>({
  ...OverlayPositionerPropsDeclaration,
  placement: { default: 'top', attribute: 'placement', type: 'string' },
  hoist: { default: false, attribute: 'hoist', type: 'boolean' },
  flip: { default: false, attribute: false },
  shift: { default: false, attribute: 'shift', type: 'boolean' },
  hide: { default: true, attribute: 'hide', type: 'boolean' },
})

/** @internal */
export function setupColumnsPopoverPositioner(
  host: HostElement,
  props: State<ColumnsPopoverPositionerProps>,
): void {
  const getStore = columnsPopoverStoreContext.consume(host)
  setupOverlayPositioner(host, props as unknown as State<OverlayPositionerProps>, getStore)
}

const ColumnsPopoverPositionerElementBase: HostElementConstructor<ColumnsPopoverPositionerProps> = defineCustomElement(
  setupColumnsPopoverPositioner,
  ColumnsPopoverPositionerPropsDeclaration,
)

/**
 * `<prosekit-columns-popover-positioner>` custom element.
 *
 * Properties: {@link ColumnsPopoverPositionerProps}
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
export class ColumnsPopoverPositionerElement extends ColumnsPopoverPositionerElementBase {}

/** @internal */
export function registerColumnsPopoverPositionerElement(): void {
  registerCustomElement('prosekit-columns-popover-positioner', ColumnsPopoverPositionerElement)
}
