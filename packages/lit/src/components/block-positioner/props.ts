import type { OverlayPositionerProps } from '@aria-ui/overlay'
import { defaultOverlayPositionerProps } from '@aria-ui/overlay'
import type { Placement } from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'

export interface BlockPositionerProps
  extends Omit<OverlayPositionerProps, 'placement' | 'offset'> {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   */
  editor: Editor | null

  /**
   * The placement of the block positioner, relative to the hovered block.
   *
   * @default "left-start"
   */
  placement: Placement

  /**
   * The distance from the hovered block to the block positioner.
   *
   * @default 4
   */
  offset: number
}

export const defaultBlockPositionerProps = Object.freeze({
  ...defaultOverlayPositionerProps,
  editor: null,
  placement: 'left-start',
  offset: 4,
}) satisfies BlockPositionerProps
