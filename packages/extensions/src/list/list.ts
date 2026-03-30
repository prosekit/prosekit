import { union, type Union } from '@prosekit/core'

import { defineListCommands, type ListCommandsExtension } from './list-commands.ts'
import { defineListDropIndicator } from './list-drop-indicator.ts'
import { defineListInputRules } from './list-input-rules.ts'
import { defineListKeymap } from './list-keymap.ts'
import { defineListPlugins } from './list-plugins.ts'
import { defineListSerializer } from './list-serializer.ts'
import { defineListSpec, type ListSpecExtension } from './list-spec.ts'

/**
 * @internal
 */
export type ListExtension = Union<[ListSpecExtension, ListCommandsExtension]>

/**
 * @public
 */
export function defineList(): ListExtension {
  return union(
    defineListSpec(),
    defineListPlugins(),
    defineListKeymap(),
    defineListInputRules(),
    defineListCommands(),
    defineListSerializer(),
    defineListDropIndicator(),
  )
}
