import { PluginKey, ProseMirrorPlugin, type EditorState } from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

import { defineFacetPayload } from '../../facets/facet-extension.ts'
import { defineFacet } from '../../facets/facet.ts'
import type { PlainExtension } from '../../types/extension.ts'
import { pluginFacet, type PluginPayload } from '../plugin.ts'

/**
 * A function that is called when the editor view is mounted.
 *
 * @param view - The editor view.
 */
export type MountHandler = (view: EditorView) => void

/**
 * A function that is called when the editor state is updated.
 *
 * @param view - The editor view.
 * @param prevState - The previous editor state.
 */
export type UpdateHandler = (view: EditorView, prevState: EditorState) => void

/**
 * A function that is called when the editor view is unmounted.
 */
export type UnmountHandler = () => void

/**
 * Registers a event handler that is called when the editor view is mounted.
 */
export function defineMountHandler(handler: MountHandler): PlainExtension {
  return definePluginViewFacetPayload(['mount', handler])
}

/**
 * Registers a event handler that is called when the editor state is updated.
 */
export function defineUpdateHandler(handler: UpdateHandler): PlainExtension {
  return definePluginViewFacetPayload(['update', handler])
}

/**
 * Registers a event handler that is called when the editor view is unmounted.
 */
export function defineUnmountHandler(handler: UnmountHandler): PlainExtension {
  return definePluginViewFacetPayload(['unmount', handler])
}

function definePluginViewFacetPayload(
  input: PluginViewHandlerArgs,
): PlainExtension {
  return defineFacetPayload(pluginViewFacet, [input]) as PlainExtension
}

type PluginViewHandlerArgs =
  | ['mount', MountHandler]
  | ['update', UpdateHandler]
  | ['unmount', UnmountHandler]

const pluginViewFacet = defineFacet<PluginViewHandlerArgs, PluginPayload>({
  reduce: () => {
    let mountHandlers: MountHandler[] = []
    let updateHandlers: UpdateHandler[] = []
    let unmountHandlers: UnmountHandler[] = []

    const plugin = new ProseMirrorPlugin({
      key: pluginKey,
      view: (view) => {
        // Run all handlers after the view is mounted
        for (const fn of mountHandlers) fn(view)

        return {
          update: (view, prevState) => {
            for (const fn of updateHandlers) fn(view, prevState)
          },
          destroy: () => {
            for (const fn of unmountHandlers) fn()
          },
        }
      },
    })

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

    return function reducer(input: PluginViewHandlerArgs[]) {
      register(input)
      return plugin
    }
  },
  parent: pluginFacet,
  singleton: true,
})

const pluginKey = new PluginKey('prosekit-plugin-view-handler')
