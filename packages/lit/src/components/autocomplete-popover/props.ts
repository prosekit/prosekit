import type { OverlayPositionerProps } from '@aria-ui/overlay'
import { defaultOverlayPositionerProps } from '@aria-ui/overlay'
import type { Placement } from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'

export interface AutocompletePopoverProps extends OverlayPositionerProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   */
  editor: Editor | null

  /**
   * The placement of the popover, relative to the text cursor.
   *
   * @default "bottom-start"
   */
  placement: Placement

  /**
   * The distance between the popover and the hovered block.
   *
   * @default 4
   */
  offset: number

  /**
   * @default true
   */
  inline: boolean
}

export const defaultAutocompletePopoverProps = Object.freeze({
  ...defaultOverlayPositionerProps,
  editor: null,
  placement: 'bottom-start',
  offset: 4,
  inline: true,
}) satisfies AutocompletePopoverProps
