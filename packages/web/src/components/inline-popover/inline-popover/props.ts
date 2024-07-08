import type { OverlayPositionerProps } from '@aria-ui/overlay'
import { defaultOverlayPositionerProps } from '@aria-ui/overlay'
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
   * Whether the popover is open by default when some inline content is
   * selected.
   *
   * When `defaultOpen` is true, the popover will open or close based on the
   * inline selection. When `defaultOpen` is false, the popover will never be
   * opened unless the `open` prop is true.
   *
   * @default true
   */
  defaultOpen: boolean

  /**
   * Whether the popover is open.
   *
   * Notice that the popover will be always hidden if the inline selection is
   * empty.
   *
   * @default false
   */
  open: boolean

  /**
   * Event handler called when the open state changed caused by user interaction
   * (i.e. select or unselect inline content).
   *
   * @default null
   */
  onOpenChange: ((open: boolean) => void) | null

  /**
   * Whether the inline popover should be dismissed when the editor receives an
   * Escape key press.
   *
   * @default true
   */
  dismissOnEscape: boolean

  /**
   * The placement of the popover, relative to the selected inline content.
   *
   * @default "top"
   */
  placement: OverlayPositionerProps['placement']

  /**
   * @default 12
   */
  offset: OverlayPositionerProps['offset']

  /**
   * @default true
   */
  flip: OverlayPositionerProps['flip']

  /**
   * @default true
   */
  hide: OverlayPositionerProps['hide']

  /**
   * @default true
   */
  overlap: OverlayPositionerProps['overlap']

  /**
   * @default true
   */
  inline: OverlayPositionerProps['inline']

  /**
   * @default true
   */
  hoist: OverlayPositionerProps['hoist']
}

export const defaultInlinePopoverProps = Object.freeze({
  ...defaultOverlayPositionerProps,
  editor: null,
  defaultOpen: true,
  open: false,
  onOpenChange: null,
  dismissOnEscape: true,

  placement: 'top',
  offset: 12,
  shift: true,
  flip: true,
  hide: true,
  overlap: true,
  inline: true,
  overflowPadding: 8,
  // Don't need boundary when hoist is true.
  hoist: true,
  boundary: [],
}) satisfies InlinePopoverProps
