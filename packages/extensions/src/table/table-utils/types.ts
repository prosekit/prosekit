import type {
  ProseMirrorNode,
  ResolvedPos,
} from '@prosekit/pm/model'

export type CellPos = {
  pos: number
  start: number
  depth: number
  node: ProseMirrorNode
}

export type CellSelectionRange = {
  $anchor: ResolvedPos
  $head: ResolvedPos
  // an array of column/row indexes
  indexes: number[]
}
