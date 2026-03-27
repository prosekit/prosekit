import type { EventDeclarations, PropDeclarations } from '@aria-ui/core'
import type { Editor } from '@prosekit/core'

export interface BlockHandleAddProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null
}

/** @internal */
export const blockHandleAddProps: PropDeclarations<BlockHandleAddProps> = {
  editor: { default: null },
}

/** @internal */
export interface BlockHandleAddEvents {}

/** @internal */
export const blockHandleAddEvents: EventDeclarations<BlockHandleAddEvents> = {}
