import type { EventDeclarations, PropDeclarations } from '@aria-ui/core'
import {
  overlayPositionerEvents,
  overlayPositionerProps,
  type OverlayPositionerEvents,
  type OverlayPositionerProps,
} from '@aria-ui/overlay/elements'
import type { Placement } from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'

export interface BlockHandlePopoverProps extends Omit<OverlayPositionerProps, 'placement' | 'hoist' | 'flip' | 'shift' | 'hide'> {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null

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
export const blockHandlePopoverProps: PropDeclarations<BlockHandlePopoverProps> = {
  ...overlayPositionerProps,
  editor: { default: null },
  placement: { default: 'left' },

  // Enabling `hoist` will cause the popover to have a small delay when
  // scrolling the page.
  hoist: { default: false },

  flip: { default: false },
  shift: { default: false },
  hide: { default: true },
}

export interface BlockHandlePopoverEvents extends OverlayPositionerEvents {
  /**
   * Fired when the hovered block changes.
   */
  stateChange: CustomEvent<{ node: ProseMirrorNode; pos: number } | null>
}

/** @internal */
export const blockHandlePopoverEvents: EventDeclarations<BlockHandlePopoverEvents> = {
  ...overlayPositionerEvents,
  stateChange: {},
}
