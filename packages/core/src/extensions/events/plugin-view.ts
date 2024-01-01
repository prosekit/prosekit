import { EditorState, PluginKey, ProseMirrorPlugin } from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

import { Facet } from '../../facets/facet'
import { pluginFacet, type PluginPayload } from '../plugin'

/**
 * A function that is called when the editor view is mounted.
 *
 * @param view - The editor view.
 *
 * @public
 */
export type MountHandler = (view: EditorView) => void

/**
 * A function that is called when the editor state is updated.
 *
 * @param view - The editor view.
 * @param prevState - The previous editor state.
 *
 * @public
 */
export type UpdateHandler = (view: EditorView, prevState: EditorState) => void

/**
 * A function that is called when the editor view is unmounted.
 *
 * @public
 */
export type UnmountHandler = () => void

/**
 * Registers a event handler that is called when the editor view is mounted.
 *
 * @public
 */
export function defineMountHandler(handler: MountHandler) {
  return pluginViewFacet.extension([['mount', handler]])
}

/**
 * Registers a event handler that is called when the editor state is updated.
 *
 * @public
 */
export function defineUpdateHandler(handler: UpdateHandler) {
  return pluginViewFacet.extension([['update', handler]])
}

/**
 * Registers a event handler that is called when the editor view is unmounted.
 *
 * @public
 */
export function defineUnmountHandler(handler: UnmountHandler) {
  return pluginViewFacet.extension([['unmount', handler]])
}

type PluginViewHandlerArgs =
  | ['mount', MountHandler]
  | ['update', UpdateHandler]
  | ['unmount', UnmountHandler]

const pluginViewFacet = Facet.define<PluginViewHandlerArgs, PluginPayload>({
  converter: () => {
    let mountHandlers: MountHandler[] = []
    let updateHandlers: UpdateHandler[] = []
    let unmountHandlers: UnmountHandler[] = []

    const plugin = new ProseMirrorPlugin({
      key: pluginKey,
      view: (view) => {
        // Run all handlers after the view is mounted
        mountHandlers.forEach((fn) => fn(view))

        return {
          update: (view, prevState) => {
            updateHandlers.forEach((fn) => fn(view, prevState))
          },
          destroy: () => {
            unmountHandlers.forEach((fn) => fn())
          },
        }
      },
    })

    const pluginFunc = () => [plugin]

    const register = (input: PluginViewHandlerArgs[]) => {
      mountHandlers = []
      updateHandlers = []
      unmountHandlers = []

      for (const args of input) {
        switch (args[0]) {
          case 'mount':
            mountHandlers.push(args[1])
            break
          case 'update':
            updateHandlers.push(args[1])
            break
          case 'unmount':
            unmountHandlers.push(args[1])
            break
        }
      }
    }

    return {
      create: (input: PluginViewHandlerArgs[]) => {
        register(input)
        return pluginFunc
      },
      update: (input: PluginViewHandlerArgs[]) => {
        register(input)
        return null
      },
    }
  },
  next: pluginFacet,
  singleton: true,
})

const pluginKey = new PluginKey('prosekit-plugin-view-handler')
