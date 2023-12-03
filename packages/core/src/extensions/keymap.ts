import { baseKeymap, chainCommands } from '@prosekit/pm/commands'
import { keydownHandler } from '@prosekit/pm/keymap'
import { Plugin, PluginKey, type Command } from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

import { withPriority } from '../editor/with-priority'
import { Facet } from '../facets/facet'
import { type Extension } from '../types/extension'
import { Priority } from '../types/priority'

import { pluginFacet } from './plugin'

/**
 * @public
 */
export interface Keymap {
  [key: string]: Command
}

/**
 * @public
 */
export function defineKeymap(keymap: Keymap): Extension {
  return keymapFacet.extension([keymap])
}

/**
 * Defines some basic keymaps.
 *
 * @public
 */
export function defineBaseKeymap(options?: {
  /**
   * The priority of the keymap.
   *
   * @default Priority.low
   */
  priority?: Priority
}) {
  const priority = options?.priority ?? Priority.low
  return withPriority(defineKeymap(baseKeymap), priority)
}

const keymapFacet = Facet.define({
  converter: () => {
    type Handler = (view: EditorView, event: KeyboardEvent) => boolean

    let handler: Handler | null = null

    const handlerWrapper: Handler = (view, event) => {
      if (handler) return handler(view, event)
      return false
    }

    const plugin = new Plugin({
      key: keymapPluginKey,
      props: { handleKeyDown: handlerWrapper },
    })

    const pluginFunc = () => [plugin]

    return {
      create: (keymaps: Keymap[]) => {
        handler = keydownHandler(mergeKeymaps(keymaps))
        return pluginFunc
      },
      update: (keymaps: Keymap[]) => {
        handler = keydownHandler(mergeKeymaps(keymaps))
        return null
      },
    }
  },
  next: pluginFacet,
  singleton: true,
})

function mergeKeymaps(keymaps: Keymap[]): Keymap {
  const bindings: Record<string, Command[]> = {}

  for (const keymap of keymaps) {
    for (const [key, command] of Object.entries(keymap)) {
      const commands = bindings[key] || (bindings[key] = [])
      commands.push(command)
    }
  }

  return Object.fromEntries(
    Object.entries(bindings).map(([key, commands]) => [
      key,
      chainCommands(...commands),
    ]),
  )
}

const keymapPluginKey = new PluginKey('prosekit-keymap')
