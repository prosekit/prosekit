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

import { InlinePopoverStoreContext } from './store.ts'

/**
 * @public
 */
export interface InlinePopoverPositionerProps extends
  Omit<
    OverlayPositionerProps,
    | 'placement'
    | 'offset'
    | 'hide'
    | 'hoist'
    | 'overlap'
    | 'inline'
    | 'overflowPadding'
  >
{
  /**
   * The initial placement of the floating element
   *
   * @default "top"
   */
  placement: OverlayPositionerProps['placement']

  /**
   * The distance between the reference and floating element.
   *
   * @default 12
   */
  offset: OverlayPositionerProps['offset']

  /**
   * Whether to hide the floating element when the reference element or the
   * floating element is fully clipped.
   *
   * @default true
   */
  hide: OverlayPositionerProps['hide']

  /**
   * Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
   * to place the floating element on top of other page content.
   *
   * @default false
   */
  hoist: boolean

  /**
   * Whether the floating element can overlap the reference element to keep it
   * in view.
   *
   * @default true
   */
  overlap: OverlayPositionerProps['overlap']

  /**
   * Whether to improve positioning for inline reference elements that span over
   * multiple lines.
   *
   * @default true
   */
  inline: OverlayPositionerProps['inline']

  /**
   * Describes the virtual padding around the boundary to check for overflow.
   *
   * @default 8
   */
  overflowPadding: OverlayPositionerProps['overflowPadding']
}

/** @internal */
export const InlinePopoverPositionerPropsDeclaration: PropsDeclaration<InlinePopoverPositionerProps> = /* @__PURE__ */ defineProps<
  InlinePopoverPositionerProps
>({
  ...OverlayPositionerPropsDeclaration,
  placement: { default: 'top', attribute: 'placement', type: 'string' },
  offset: { default: 12, attribute: false, type: 'json' },
  hide: { default: true, attribute: 'hide', type: 'boolean' },
  hoist: { default: false, attribute: 'hoist', type: 'boolean' },
  overlap: { default: true, attribute: 'overlap', type: 'boolean' },
  inline: { default: true, attribute: 'inline', type: 'boolean' },
  overflowPadding: { default: 8, attribute: 'overflow-padding', type: 'number' },
})

/** @internal */
export function setupInlinePopoverPositioner(
  host: HostElement,
  props: State<InlinePopoverPositionerProps>,
): void {
  setupOverlayPositioner(host, props, InlinePopoverStoreContext.consume(host))
}

const InlinePopoverPositionerElementBase: HostElementConstructor<InlinePopoverPositionerProps> = defineCustomElement(
  setupInlinePopoverPositioner,
  InlinePopoverPositionerPropsDeclaration,
)

/**
 * @public
 */
export class InlinePopoverPositionerElement extends InlinePopoverPositionerElementBase {}

/** @internal */
export function registerInlinePopoverPositionerElement(): void {
  registerCustomElement('prosekit-inline-popover-positioner', InlinePopoverPositionerElement)
}
