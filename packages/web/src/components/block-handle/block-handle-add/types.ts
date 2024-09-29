import type {
  PropDeclarations,
  EmptyObject,
  EventDeclarations,
} from '@aria-ui/core'
import type { Editor } from '@prosekit/core'

export interface BlockHandleAddProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   */
  editor: Editor | null
}

export const blockHandleAddProps: PropDeclarations<BlockHandleAddProps> = {
  editor: { default: null },
}

export interface BlockHandleAddEvents extends EmptyObject {}

export const blockHandleAddEvents: EventDeclarations<BlockHandleAddEvents> = {}
