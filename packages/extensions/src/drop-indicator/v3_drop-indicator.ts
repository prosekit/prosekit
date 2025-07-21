import {
  definePlugin,
  type PlainExtension,
} from '@prosekit/core'
import {
  Plugin,
  PluginKey,
} from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

import { dropIndicator } from './drop-indicator-view'

export interface DropIndicatorOptions {
  /**
   * The precise width of the drop indicator in pixels.
   *
   * @default 2
   */
  width?: number
}

type DropIndicatorPluginOptions = Required<DropIndicatorOptions>

/**
 * @internal
 */
export type DropIndicatorExtension = PlainExtension

/**
 * Show up a decoration at the drop position when something is dragged over the editor.
 *
 * @param options
 *
 * @public
 */
export function defineDropIndicator(
  {
    width = 2,
  }: DropIndicatorOptions = {},
): DropIndicatorExtension {
  return definePlugin(createDropIndicatorPlugin({
    width,
  }))
}

function createDropIndicatorPlugin(options: DropIndicatorPluginOptions): Plugin {
  return new Plugin({
    key: new PluginKey('prosekit-drop-indicator'),
    view: (view) => {
      return { destroy: registerEvents(view, options) }
    },
  })
}

function registerEvents(view: EditorView, options: DropIndicatorPluginOptions): VoidFunction {
  // TODO
}
