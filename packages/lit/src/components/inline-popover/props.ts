import type { OverlayPositionerProps } from '@aria-ui/overlay'
import { defaultOverlayPositionerProps } from '@aria-ui/overlay'
import type { Placement } from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'

export interface InlinePopoverProps
  extends Omit<OverlayPositionerProps, 'placement' | 'offset'> {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   */
  editor: Editor | null

  /**
   * Whether the popover is available to be shown.
   *
   * If `true`, the popover will be shown when the editor selection is not empty.
   * If `false`, the popover will always be hidden.
   *
   * @default `true`
   */
  available: boolean

  /**
   * The placement of the popover, relative to the selected inline content.
   *
   * @default "top"
   */
  placement: Placement

  /**
   * The distance between the popover and the selected inline content.
   *
   * @default 12
   */
  offset: number
}

export const defaultInlinePopoverProps = Object.freeze({
  ...defaultOverlayPositionerProps,
  editor: null,
  placement: 'top',
  offset: 12,
  available: true,
  flip: false,
  hide: true,
  shift: true,
  overlap: true,
  fitViewport: true,
  inline: true,
}) satisfies InlinePopoverProps
