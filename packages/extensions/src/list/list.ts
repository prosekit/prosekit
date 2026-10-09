import { union, type Union } from '@prosekit/core'

import { defineListCommands, type ListCommandsExtension } from './list-commands.ts'
import { defineListDropIndicator } from './list-drop-indicator.ts'
import { defineListInputRules } from './list-input-rules.ts'
import { defineListKeymap } from './list-keymap.ts'
import { defineListPlugins } from './list-plugins.ts'
import { defineListSerializer } from './list-serializer.ts'
import { defineListSpec, type ListSpecExtension } from './list-spec.ts'
import type { ListOptions } from './list-types.ts'

/**
 * @internal
 */
export type ListExtension = Union<[ListSpecExtension, ListCommandsExtension]>

export function defineList(options?: ListOptions): ListExtension {
  return union(
    defineListSpec(),
    defineListPlugins(),
    defineListKeymap(options),
    defineListInputRules(),
    defineListCommands(options),
    defineListSerializer(),
    defineListDropIndicator(),
  )
}
