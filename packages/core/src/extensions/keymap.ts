import { keydownHandler } from '@prosekit/pm/keymap'
import {
  Plugin,
  PluginKey,
  type Command,
} from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

import {
  defineFacet,
  type Facet,
} from '../facets/facet'
import { defineFacetPayload } from '../facets/facet-extension'
import type { PlainExtension } from '../types/extension'

import {
  pluginFacet,
  type PluginPayload,
} from './plugin'

/**
 * A set of keybindings. Please read the
 * [documentation](https://prosemirror.net/docs/ref/#keymap) for more details.
 *
 * @public
 */
export interface Keymap {
  [key: string]: Command
}

/**
 * Adds a set of keybindings to the editor. Please read the
 * [documentation](https://prosemirror.net/docs/ref/#keymap) for more details.
 *
 * @public
 */
export function defineKeymap(keymap: Keymap): PlainExtension {
  return defineFacetPayload(keymapFacet, [keymap]) as PlainExtension
}

/**
 * @internal
 */
export type KeymapPayload = Keymap

/**
 * @internal
 */
export const keymapFacet: Facet<KeymapPayload, PluginPayload> = defineFacet<
  KeymapPayload,
  PluginPayload
>({
  reduce: () => {
    type KeydownHandler = (view: EditorView, event: KeyboardEvent) => boolean

    // An array of keymap handlers, ordered from the highest priority to the lowest.
    let subHandlers: KeydownHandler[] = []

    // A root handler that combines all the sub handlers.
    const rootHandler: KeydownHandler = (view, event) => {
      for (const handler of subHandlers) {
        if (handler(view, event)) return true
      }
      return false
    }

    const plugin = new Plugin({
      key: keymapPluginKey,
      props: { handleKeyDown: rootHandler },
    })

    return (keymaps: Keymap[]) => {
      // The keymap at the end has a higher priority, so we need to reverse the
      // order here.
      subHandlers = keymaps.map(keydownHandler).reverse()

      return plugin
    }
  },
  parent: pluginFacet,
  singleton: true,
})

const keymapPluginKey = new PluginKey('prosekit-keymap')
