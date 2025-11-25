import type {
  EventDeclarations,
  PropDeclarations,
} from '@aria-ui/core'
import type { Editor } from '@prosekit/core'

export interface DropIndicatorProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null

  /**
   * The line width in pixels.
   *
   * @default 2
   */
  width: number
}

/** @internal */
export const dropIndicatorProps: PropDeclarations<DropIndicatorProps> = Object.freeze({
  editor: { default: null },
  width: { default: 2 },
})

export interface DropIndicatorEvents {
}

/** @internal */
export const dropIndicatorEvents: EventDeclarations<DropIndicatorEvents> = {}
