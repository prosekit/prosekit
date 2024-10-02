import type { PropDeclarations, EventDeclarations } from '@aria-ui/core'
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

export const blockHandleAddProps: PropDeclarations<BlockHandleAddProps> = {
  editor: { default: null },
}

export interface BlockHandleAddEvents {}

export const blockHandleAddEvents: EventDeclarations<BlockHandleAddEvents> = {}
