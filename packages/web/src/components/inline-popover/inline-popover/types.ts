import type { EventDeclarations, PropDeclarations } from '@aria-ui/core'
import {
  type OverlayPositionerEvents,
  overlayPositionerEvents,
  type OverlayPositionerProps,
  overlayPositionerProps,
} from '@aria-ui/overlay'
import type { Editor } from '@prosekit/core'

export interface InlinePopoverProps
  extends Omit<
    OverlayPositionerProps,
    'placement' | 'offset' | 'hide' | 'overlap' | 'inline' | 'overflowPadding'
  > {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
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
   * @default 8
   */
  overflowPadding: OverlayPositionerProps['overflowPadding']
}

/** @internal */
export const inlinePopoverProps: PropDeclarations<InlinePopoverProps> =
  Object.freeze({
    ...overlayPositionerProps,
    editor: { default: null },
    defaultOpen: { default: true },
    open: { default: false },
    onOpenChange: { default: null },
    dismissOnEscape: { default: true },

    placement: { default: 'top' },
    offset: { default: 12 },
    hide: { default: true },
    overlap: { default: true },
    inline: { default: true },
    overflowPadding: { default: 8 },
  })

/** @internal */
export interface InlinePopoverEvents extends OverlayPositionerEvents {}

/** @internal */
export const inlinePopoverEvents: EventDeclarations<InlinePopoverEvents> =
  overlayPositionerEvents
