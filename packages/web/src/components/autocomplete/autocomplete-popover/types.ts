import type {
  EventDeclarations,
  PropDeclarations,
} from '@aria-ui/core'
import {
  overlayPositionerEvents,
  overlayPositionerProps,
  type OverlayPositionerEvents,
  type OverlayPositionerProps,
} from '@aria-ui/overlay/elements'
import type { Editor } from '@prosekit/core'

export interface AutocompletePopoverProps extends OverlayPositionerProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null

  /**
   * The regular expression to match the query text to autocomplete.
   *
   * @default null
   */
  regex: RegExp | null

  /**
   * Whether to hide the popover when the editor loses focus.
   *
   * @default true
   */
  hideOnBlur: boolean

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

const body = typeof document !== 'undefined' && document.querySelector('body')
const defaultBoundary = body || 'clippingAncestors'

/** @internal */
export const autocompletePopoverProps: PropDeclarations<AutocompletePopoverProps> = {
  ...overlayPositionerProps,
  editor: { default: null },
  regex: { default: null },
  hideOnBlur: { default: true },
  placement: { default: 'bottom-start' },
  offset: { default: 4 },
  inline: { default: true },
  hoist: { default: true },
  fitViewport: { default: true },
  boundary: { default: defaultBoundary },
  overflowPadding: { default: 8 },
}

export interface AutocompletePopoverEvents extends OverlayPositionerEvents {
  /**
   * Fired when the open state changes.
   */
  openChange: CustomEvent<boolean>

  /**
   * Fired when the query changes.
   */
  queryChange: CustomEvent<string>
}

/** @internal */
export const autocompletePopoverEvents: EventDeclarations<AutocompletePopoverEvents> = {
  ...overlayPositionerEvents,
  openChange: {},
  queryChange: {},
}
