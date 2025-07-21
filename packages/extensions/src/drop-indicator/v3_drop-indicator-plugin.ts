import {
  Plugin,
  PluginKey,
} from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

import type {
  DropIndicatorOptions,
  Point,
} from './v3_types'

/**
 * @internal
 */
type DropIndicatorPluginOptions = Required<DropIndicatorOptions>

export function createDropIndicatorPlugin(options: DropIndicatorPluginOptions): Plugin {
  return new Plugin({
    key: new PluginKey('prosekit-drop-indicator'),
    view: (view) => {
      return { destroy: registerEvents(view, options) }
    },
  })
}

function registerEvents(view: EditorView, options: DropIndicatorPluginOptions): VoidFunction {
  let currentPoint: Point | null = null
  let dom = view.dom

  const updatePoint = (point: Point | null): boolean => {
    if (pointEqual(currentPoint, point)) return false
    currentPoint = point
    return true
  }

  const handleDragOver = (event: DragEvent): void => {
    if (updatePoint({ x: event.clientX, y: event.clientY })) {
      console.log('DEBUG handleDragOver', event.clientX, event.clientY)
    }
    // TODO
  }
  const handleDragEnd = (event: DragEvent): void => {
    console.log('DEBUG handleDragEnd', event.clientX, event.clientY)
    updatePoint(null)
  }
  const handleDrop = (event: DragEvent): void => {
    console.log('DEBUG handleDrop', event.clientX, event.clientY)
    updatePoint(null)
  }

  dom.addEventListener('dragover', handleDragOver)
  dom.addEventListener('dragend', handleDragEnd)
  dom.addEventListener('drop', handleDrop)

  return () => {
    dom.removeEventListener('dragover', handleDragOver)
    dom.removeEventListener('dragend', handleDragEnd)
    dom.removeEventListener('drop', handleDrop)
  }
}

// function pointEqual(a: Point | null, b: Point | null): boolean {
//   if (a && b && a.x === b.x && b.y === b.y) return true
//   return a === b
// }

// const requestFrame: (callback: VoidFunction) => void = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : setTimeout
// const cancelFrame = typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame : clearTimeout
