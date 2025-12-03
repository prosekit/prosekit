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
      const normalizedKey = normalizeKeyName(key)
      const commands = bindings[normalizedKey] ||= []
      commands.push(command)
    }
  }

  return mapValues(bindings, mergeCommands)
}

function mergeCommands(commands: Command[]): Command {
  return chainCommands(...commands)
}

// Copied from https://github.com/ProseMirror/prosemirror-keymap/blob/1.2.3/src/keymap.ts#L8
function normalizeKeyName(name: string) {
  let parts = name.split(/-(?!$)/), result = parts[parts.length - 1]
  if (result == 'Space') result = ' '
  let alt, ctrl, shift, meta
  for (let i = 0; i < parts.length - 1; i++) {
    let mod = parts[i]
    if (/^(cmd|meta|m)$/i.test(mod)) meta = true
    else if (/^a(lt)?$/i.test(mod)) alt = true
    else if (/^(c|ctrl|control)$/i.test(mod)) ctrl = true
    else if (/^s(hift)?$/i.test(mod)) shift = true
    else if (/^mod$/i.test(mod)) {
      if (isApple) meta = true
      else ctrl = true
    } else throw new Error('Unrecognized modifier name: ' + mod)
  }
  if (alt) result = 'Alt-' + result
  if (ctrl) result = 'Ctrl-' + result
  if (meta) result = 'Meta-' + result
  if (shift) result = 'Shift-' + result
  return result
}

const keymapPluginKey = new PluginKey('prosekit-keymap')
