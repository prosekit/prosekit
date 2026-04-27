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

import { autocompleteStoreContext } from './context.ts'

const body = typeof document !== 'undefined' && document.querySelector('body')
const defaultBoundary = body || 'clippingAncestors'

/**
 * @public
 */
export interface AutocompletePositionerProps extends OverlayPositionerProps {
  /**
   * The placement of the popover, relative to the text cursor.
   *
   * @default "bottom-start"
   */
  placement: OverlayPositionerProps['placement']

  /**
   * The distance between the popover and the text selection.
   *
   * @default { mainAxis: 8, crossAxis: -4 }
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
   * @default true
   */
  inline: OverlayPositionerProps['inline']

  /**
   * @default true
   */
  hoist: OverlayPositionerProps['hoist']

  /**
   * @default true
   */
  fitViewport: OverlayPositionerProps['fitViewport']

  /**
   * @default "The body element"
   */
  boundary: OverlayPositionerProps['boundary']

  /**
   * @default 8
   */
  overflowPadding: OverlayPositionerProps['overflowPadding']
}

/** @internal */
export const AutocompletePositionerPropsDeclaration: PropsDeclaration<AutocompletePositionerProps> = /* @__PURE__ */ defineProps<
  AutocompletePositionerProps
>({
  ...OverlayPositionerPropsDeclaration,
  placement: { default: 'bottom-start', attribute: 'placement', type: 'string' },
  offset: { default: { mainAxis: 8, crossAxis: -4 }, attribute: false },
  hide: { default: true, attribute: 'hide', type: 'boolean' },
  inline: { default: true, attribute: 'inline', type: 'boolean' },
  hoist: { default: true, attribute: 'hoist', type: 'boolean' },
  fitViewport: { default: true, attribute: 'fit-viewport', type: 'boolean' },
  boundary: { default: defaultBoundary, attribute: false },
  overflowPadding: { default: 8, attribute: 'overflow-padding', type: 'number' },
})

/** @internal */
export function setupAutocompletePositioner(
  host: HostElement,
  props: State<AutocompletePositionerProps>,
): void {
  const getStore = autocompleteStoreContext.consume(host)
  const getOverlayStore = () => getStore()?.overlayStore
  setupOverlayPositioner(host, props as unknown as State<OverlayPositionerProps>, getOverlayStore)
}

const AutocompletePositionerElementBase: HostElementConstructor<AutocompletePositionerProps> = defineCustomElement(
  setupAutocompletePositioner,
  AutocompletePositionerPropsDeclaration,
)

/**
 * `<prosekit-autocomplete-positioner>` custom element.
 *
 * Properties: {@link AutocompletePositionerProps}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-state` | `"open"` when the autocomplete is visible, `"closed"` otherwise |
 * | `data-side` | The side of the anchor element the positioner is on |
 * | `data-align` | The alignment of the positioner relative to the anchor element |
 *
 * CSS variables:
 *
 * | Variable | Description |
 * | --- | --- |
 * | `--transform-origin` | The coordinates that this element is anchored to. Useful for scale animations. |
 */
export class AutocompletePositionerElement extends AutocompletePositionerElementBase {}

/** @internal */
export function registerAutocompletePositionerElement(): void {
  registerCustomElement('prosekit-autocomplete-positioner', AutocompletePositionerElement)
}
