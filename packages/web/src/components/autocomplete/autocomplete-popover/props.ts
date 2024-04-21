import type { OverlayPositionerProps } from '@aria-ui/overlay'
import { defaultOverlayPositionerProps } from '@aria-ui/overlay'
import type { Editor } from '@prosekit/core'

export interface AutocompletePopoverProps extends OverlayPositionerProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   */
  editor: Editor | null

  /**
   * The regular expression to match the query text to autocomplete.
   *
   * @default null
   */
  regex: RegExp | null

  /**
   * A callback that is called when the query changes.
   */
  onQueryChange: ((query: string) => void) | null 

  /**
   * A callback that is called when the open state changes.
   */
  onOpenChange: ((open: boolean) => void) | null

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

export const defaultAutocompletePopoverProps = Object.freeze({
  ...defaultOverlayPositionerProps,
  editor: null,
  regex: null,
  onQueryChange: null,
  onOpenChange: null,
  placement: 'bottom-start',
  offset: 4,
  inline: true,
  hoist: true,
  fitViewport: true,
  boundary: defaultBoundary,
  overflowPadding: 8,
}) satisfies AutocompletePopoverProps
