import type { Attrs } from '@prosekit/pm/model'
import type { Command } from '@prosekit/pm/state'

import { setBlockType } from '../commands/set-block-type'
import { union } from '../editor/union'
import { withPriority } from '../editor/with-priority'
import type {
  Extension,
  PlainExtension,
  Union,
} from '../types/extension'
import { Priority } from '../types/priority'

import { defineCommands } from './command'
import { defineKeymap } from './keymap'
import { defineNodeSpec } from './node-spec'

/**
 * @internal
 */
export type ParagraphSpecExtension = Extension<{
  Nodes: {
    paragraph: Attrs
  }
}>

/**
 * @internal
 *
 * Defines a paragraph node spec.
 */
export function defineParagraphSpec(): ParagraphSpecExtension {
  return defineNodeSpec({
    name: 'paragraph',
    content: 'inline*',
    group: 'block',
    parseDOM: [{ tag: 'p' }],
    toDOM() {
      return ['p', 0]
    },
  })
}

/**
 * @internal
 */
export type ParagraphCommandsExtension = Extension<{
  Commands: {
    setParagraph: []
  }
}>

function setParagraph(): Command {
  return setBlockType({ type: 'paragraph' })
}

/**
 * @internal
 */
export function defineParagraphCommands(): ParagraphCommandsExtension {
  return defineCommands({ setParagraph })
}

/**
 * @internal
 */
export function defineParagraphKeymap(): PlainExtension {
  return defineKeymap({
    'mod-alt-0': setParagraph(),
  })
}

/**
 * @internal
 */
export type ParagraphExtension = Union<
  [ParagraphSpecExtension, ParagraphCommandsExtension]
>

/**
 * @public
 *
 * Defines a paragraph node.
 *
 * The `paragraph` node spec is defined as the highest priority, because it
 * should be the default block node for most cases.
 */
export function defineParagraph(): ParagraphExtension {
  return union(
    defineParagraphCommands(),
    defineParagraphKeymap(),
    withPriority(defineParagraphSpec(), Priority.highest),
  )
}
