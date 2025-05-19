import type { EditorView } from '@prosekit/pm/view'

export function getPosAtCoords(view: EditorView, coords: { left: number; top: number }): {
  pos: number
  inside: number
} | undefined {
  const pos = view.posAtCoords(coords)

  console.log(`pos: ${JSON.stringify(pos)}`)

  if (!pos) return

  if (pos.inside > 0) {
    return pos
  }

  return { pos: findNearestBlock(view, pos.pos), inside: -1 }
}

function findNearestBlock(view: EditorView, pos: number): number {
  //

  return pos
}
