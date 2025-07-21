import type {
  EventDeclarations,
  PropDeclarations,
} from '@aria-ui/core'
import type { Editor } from '@prosekit/core'

export interface BlockHandleDropIndicatorProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null
}

/** @internal */
export const blockHandleDropIndicatorProps: PropDeclarations<BlockHandleDropIndicatorProps> = {
  editor: { default: null },
}

/** @internal */
export interface BlockHandleDropIndicatorEvents {}

/** @internal */
export const blockHandleDropIndicatorEvents: EventDeclarations<BlockHandleDropIndicatorEvents> = {}
