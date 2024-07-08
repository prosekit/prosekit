import { insertNode } from '../commands/insert-node'
import { setBlockType } from '../commands/set-block-type'
import { toggleNode } from '../commands/toggle-node'
import { withPriority } from '../editor/with-priority'
import { Priority } from '../types/priority'

import { defineCommands } from './command'
import { defineNodeSpec } from './node-spec'

/**
 * @public
 *
 * Defines a paragraph node spec.
 */
export function defineParagraphSpec() {
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

// TODO: Do we need all these commands?
export function defineParagraphCommands() {
  return defineCommands({
    setParagraph: () => setBlockType({ type: 'paragraph' }),
    insertParagraph: () => insertNode({ type: 'paragraph' }),
    toggleHeading: () => toggleNode({ type: 'paragraph' }),
  })
}

// TODO: If necessary, what's an appropriate keymap for a paragraph? Something like 'Mod-p' would conflict with the browser's print dialog, right?

// TODO: How do we handle input rules inside `core`? I saw all the input rules were inside extensions, but I'm not sure how to handle them here. This is actually the one feature I most cared about, just not sure if this is the right way to do it.
/**
 * Converts the text block to a paragraph when the block becomes empty due to
 * continuous Backspace presses.
 *
 * This rule matches an empty block (represented by '^$') and converts it to
 * a paragraph. It's triggered when a user completely empties a block by
 * pressing Backspace repeatedly.
 */
// export function defineParagraphInputRule() {
//   return defineTextBlockInputRule({
//     regex: /^$/,
//     type: 'paragraph',
//   })
// }

/**
 * @public
 *
 * Defines a paragraph node spec as the highest priority, because it should be the default block node for most cases.
 */
export function defineParagraph() {
  return withPriority(defineParagraphSpec(), Priority.highest)
}
