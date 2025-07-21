import {
  Plugin,
  PluginKey,
} from '@prosekit/pm/state'
import type {
  DOMEventMap,
  EditorView,
} from '@prosekit/pm/view'

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
    props,
  })
}

function registerEvents(view: EditorView, options: DropIndicatorPluginOptions): VoidFunction {
  let pointer: Point | null = null
  let dom = view.dom

  const handleDragStart = (event: DragEvent): void => {
    // TODO
  }
  const handleDragOver = (event: DragEvent): void => {
    // TODO
  }
  const handleDragEnd = (event: DragEvent): void => {
    // TODO
  }
  const handleDrop = (event: DragEvent): void => {
    // TODO
  }

  dom.addEventListener('dragstart', handleDragStart)
  dom.addEventListener('dragover', handleDragOver)
  dom.addEventListener('dragend', handleDragEnd)
  dom.addEventListener('drop', handleDrop)

  return () => {
    dom.removeEventListener('dragstart', handleDragStart)
    dom.removeEventListener('dragover', handleDragOver)
    dom.removeEventListener('dragend', handleDragEnd)
    dom.removeEventListener('drop', handleDrop)
  }
}
