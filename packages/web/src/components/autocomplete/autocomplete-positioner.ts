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
   * The distance between the popover and the hovered block.
   *
   * @default 4
   */
  offset: OverlayPositionerProps['offset']

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
  offset: { default: 4, attribute: false, type: 'json' },
  inline: { default: true, attribute: 'inline', type: 'boolean' },
  hoist: { default: true, attribute: 'hoist', type: 'boolean' },
  fitViewport: { default: true, attribute: 'fit-viewport', type: 'boolean' },
  boundary: { default: defaultBoundary, attribute: false, type: 'json' },
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
 * @public
 */
export class AutocompletePositionerElement extends AutocompletePositionerElementBase {}

/** @internal */
export function registerAutocompletePositionerElement(): void {
  registerCustomElement('prosekit-autocomplete-positioner', AutocompletePositionerElement)
}
