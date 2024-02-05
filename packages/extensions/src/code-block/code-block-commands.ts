import {
  defineCommands,
  insertNode,
  setBlockType,
  setNodeAttrs,
  toggleNode,
} from '@prosekit/core'

import type { CodeBlockAttrs } from './code-block-types'

/**
 * Adds commands for working with `codeBlock` nodes.
 *
 * @public
 */
export function defineCodeBlockCommands() {
  return defineCommands({
    setCodeBlock: (attrs?: CodeBlockAttrs) => {
      return setBlockType({ type: 'codeBlock', attrs })
    },
    insertCodeBlock: (attrs?: CodeBlockAttrs) => {
      return insertNode({ type: 'codeBlock', attrs })
    },
    toggleCodeBlock: (attrs?: CodeBlockAttrs) => {
      return toggleNode({ type: 'codeBlock', attrs })
    },
    setCodeBlockAttrs: (attrs: CodeBlockAttrs) => {
      return setNodeAttrs({ type: 'codeBlock', attrs })
    },
  })
}
