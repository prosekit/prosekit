import {
  baseKeymap,
  chainCommands,
  createParagraphNear,
  liftEmptyBlock,
  newlineInCode,
} from '@prosekit/pm/commands'
import { keydownHandler } from '@prosekit/pm/keymap'
import { Plugin, PluginKey, type Command } from '@prosekit/pm/state'
import type { EditorView } from '@prosekit/pm/view'
import { splitSplittableBlock } from 'prosemirror-splittable'

import { withPriority } from '../editor/with-priority'
import { defineFacet } from '../facets/facet'
import { defineFacetPayload } from '../facets/facet-extension'
import { type Extension } from '../types/extension'
import { Priority } from '../types/priority'
import { toReversed } from '../utils/array'

import { pluginFacet, type PluginPayload } from './plugin'

const customBaseKeymap = {
  ...baseKeymap,
  Enter: chainCommands(
    newlineInCode,
    createParagraphNear,
    liftEmptyBlock,
    splitSplittableBlock,
  ),
}

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
  return defineFacetPayload(keymapFacet, [keymap])
}

/**
 * Defines some basic key bindings.
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
  return withPriority(defineKeymap(customBaseKeymap), priority)
}

/**
 * @internal
 */
export type KeymapPayload = Keymap

/**
 * @internal
 */
export const keymapFacet = defineFacet<KeymapPayload, PluginPayload>({
  reduce: () => {
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

    return (keymaps: Keymap[]) => {
      handler = keydownHandler(
        mergeKeymaps(
          // The keymap at the end have a higher priority.
          toReversed(keymaps),
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
