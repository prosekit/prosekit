import type { Slice } from '@prosekit/pm/model'
import type { EditorView } from '@prosekit/pm/view'

interface CanDropAtOptions {
  view: EditorView
  pos: number
  slice?: Slice
}

export type CanDropAtCallback = (options: CanDropAtOptions) => boolean
