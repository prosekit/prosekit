import {
  Plugin,
  PluginKey,
} from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

import { createAnchorFinder } from './v3_drag-state'
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
  let frame: number | null = null

  const findAnchor = createAnchorFinder(view, options.canDrop)

  const cancel = () => {
    if (frame) {
      // TODO: fallback to clearTimeout?
      cancelAnimationFrame(frame)
    }
    frame = null
    currentPoint = null
  }

  const handleDragOver = (event: DragEvent): void => {
    let point = { x: event.clientX, y: event.clientY }
    if (currentPoint && currentPoint.x === point.x && currentPoint.y === point.y) {
      return
    } else if (!currentPoint) {
      currentPoint = point
      start()
    } else {
      currentPoint = point
      update()
    }

    frame = requestAnimationFrame(update)
  }
  const handleDragEnd = (event: DragEvent): void => {
    console.log('DEBUG handleDragEnd', event.clientX, event.clientY)
    // updatePoint(null)
  }
  const handleDrop = (event: DragEvent): void => {
    console.log('DEBUG handleDrop', event.clientX, event.clientY)
    // updatePoint(null)
    cancel()
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
