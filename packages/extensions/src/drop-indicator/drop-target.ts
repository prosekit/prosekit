export interface DropTarget {
  distance: { x: number; y: number }
  start: { x: number; y: number }
  end: { x: number; y: number }
  pos: number
}

export function findCloserDropTarget(a?: DropTarget, b?: DropTarget): DropTarget | undefined {
  if (a && b) {
    if (a.distance.y < b.distance.y) {
      return a
    }
    if (a.distance.y === b.distance.y && a.distance.x < b.distance.x) {
      return a
    }
    return b
  }
  return a || b
}
