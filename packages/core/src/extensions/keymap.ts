import { mapValues } from '@ocavue/utils'
import { chainCommands } from '@prosekit/pm/commands'
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
import { toReversed } from '../utils/array'
import { isApple } from '../utils/env'

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
    type Handler = (view: EditorView, event: KeyboardEvent) => boolean

    let handler: Handler | undefined

    const handlerWrapper: Handler = (view, event) => {
      if (handler) return handler(view, event)
      return false
    }

    const plugin = new Plugin({
      key: keymapPluginKey,
      props: { handleKeyDown: handlerWrapper },
    })

    return (keymaps: Keymap[]) => {
      handler = keydownHandler(
        mergeKeymaps(
          // The keymap at the end have a higher priority.
          [...keymaps].reverse(),
        ),
      )
      return plugin
    }
  },
  parent: pluginFacet,
  singleton: true,
})

function mergeKeymaps(keymaps: Keymap[]): Keymap {
  const bindings: Record<string, Command[]> = {}

  for (const keymap of keymaps) {
    for (const [key, command] of Object.entries(keymap)) {
      const commands = bindings[key] ||= []
      commands.push(command)
    }
  }

  return mapValues(bindings, mergeCommands)
}

function mergeCommands(commands: Command[]): Command {
  return chainCommands(...commands)
}

const keymapPluginKey = new PluginKey('prosekit-keymap')
