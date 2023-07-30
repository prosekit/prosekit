import { baseKeymap, chainCommands } from '@prosekit/pm/commands'
import { keydownHandler } from '@prosekit/pm/keymap'
import { Plugin, PluginKey, type Command } from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'

import { Facet } from '../editor/facet'
import { type Extension } from '../types/extension'

import { pluginFacet } from './plugin'

/** @public */
export interface Keymap {
  [key: string]: Command
}

/** @public */
export function addKeymap(keymap: Keymap): Extension {
  return keymapFacet.extension([keymap])
}

/** @public */
export function addBaseKeymap() {
  return addKeymap(baseKeymap)
}

const keymapFacet = Facet.define({
  slot: () => {
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
  single: true,
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
