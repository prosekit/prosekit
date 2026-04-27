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

import { blockHandleOverlayStoreContext } from './context.ts'

/**
 * @public
 */
export interface BlockHandlePositionerProps extends Omit<OverlayPositionerProps, 'placement' | 'hoist' | 'flip' | 'shift' | 'hide'> {
  /**
   * The placement of the popover, relative to the hovered block.
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
export const BlockHandlePositionerPropsDeclaration: PropsDeclaration<BlockHandlePositionerProps> = /* @__PURE__ */ defineProps<
  BlockHandlePositionerProps
>({
  ...OverlayPositionerPropsDeclaration,
  placement: { default: 'left', attribute: 'placement', type: 'string' },
  // Enabling `hoist` will cause the popover to have a small delay when
  // scrolling the page.
  hoist: { default: false, attribute: 'hoist', type: 'boolean' },
  flip: { default: false, attribute: false },
  shift: { default: false, attribute: 'shift', type: 'boolean' },
  hide: { default: true, attribute: 'hide', type: 'boolean' },
})

/** @internal */
export function setupBlockHandlePositioner(
  host: HostElement,
  props: State<BlockHandlePositionerProps>,
): void {
  const getOverlayStore = blockHandleOverlayStoreContext.consume(host)
  setupOverlayPositioner(host, props as unknown as State<OverlayPositionerProps>, getOverlayStore)
}

const BlockHandlePositionerElementBase: HostElementConstructor<BlockHandlePositionerProps> = defineCustomElement(
  setupBlockHandlePositioner,
  BlockHandlePositionerPropsDeclaration,
)

/**
 * `<prosekit-block-handle-positioner>` custom element.
 *
 * Properties: {@link BlockHandlePositionerProps}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-state` | `"open"` when the block handle is visible, `"closed"` otherwise |
 * | `data-side` | The side of the anchor element the positioner is on |
 * | `data-align` | The alignment of the positioner relative to the anchor element |
 *
 * CSS variables:
 *
 * | Variable | Description |
 * | --- | --- |
 * | `--transform-origin` | The coordinates that this element is anchored to. Useful for scale animations. |
 */
export class BlockHandlePositionerElement extends BlockHandlePositionerElementBase {}

/** @internal */
export function registerBlockHandlePositionerElement(): void {
  registerCustomElement('prosekit-block-handle-positioner', BlockHandlePositionerElement)
}
