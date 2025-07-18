import type { CanDropAtCallback } from './types'

export const DEBUG_defaultCanDropAt: CanDropAtCallback = (options): boolean => {
  const { slice, view, pos } = options

  console.debug('DEBUG SLICE', { pos })

  if (slice && slice.openStart === 0 && slice.openEnd === 0 && slice.content.childCount === 1) {
    const node = slice.content.firstChild

    console.log('DEBUG  node.type.name', node?.type.name)

    if (node && node.type.name === 'list') {
      const $pos = view.state.doc.resolve(pos)

      if ($pos.parent.type.name === 'list') {
        const indexAfter = $pos.indexAfter()
        console.log('DEBUG $pos.parentOffset', $pos.parentOffset)
        console.log('DEBUG $pos.indexAfter', indexAfter)

        if (indexAfter === 0) {
          return false
        }

        if ($pos.parentOffset === 0) {
          return true
        }
      }
    }
  }

  return true
}
