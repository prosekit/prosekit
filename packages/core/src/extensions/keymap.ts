import { baseKeymap, chainCommands } from '@prosekit/pm/commands'
import { keymap as createKeymapPlugin } from '@prosekit/pm/keymap'
import { type Command } from '@prosekit/pm/state'

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
  combine: (keymaps: Keymap[]) => {
    const keymap = mergeKeymaps(keymaps)
    const plugin = createKeymapPlugin(keymap)
    return () => [plugin]
  },
  next: pluginFacet,
})

function mergeKeymaps(keymaps: Keymap[]): Keymap {
  const bindings: Record<string, Command[]> = {}

  for (const keymap of keymaps) {
    for (const [key, command] of Object.entries(keymap)) {
      if (!bindings[key]) bindings[key] = []
      bindings[key].push(command)
    }
  }

  return Object.fromEntries(
    Object.entries(bindings).map(([key, commands]) => [
      key,
      chainCommands(...commands),
    ]),
  )
}
