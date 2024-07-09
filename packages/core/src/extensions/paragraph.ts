import { withPriority } from '../editor/with-priority'
import { Priority } from '../types/priority'

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
