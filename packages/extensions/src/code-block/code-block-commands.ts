import { defineCommands, insertNode, setBlockType, setNodeAttrs, toggleNode, type Extension } from '@prosekit/core'

import type { CodeBlockAttrs } from './code-block-types'

/**
 * @internal
 */
export type CodeBlockCommandsExtension = Extension<{
  Commands: {
    setCodeBlock: [attrs?: CodeBlockAttrs]
    insertCodeBlock: [attrs?: CodeBlockAttrs]
    toggleCodeBlock: [attrs?: CodeBlockAttrs]
    setCodeBlockAttrs: [attrs: CodeBlockAttrs]
  }
}>

/**
 * Adds commands for working with `codeBlock` nodes.
 *
 * @public
 */
export function defineCodeBlockCommands(): CodeBlockCommandsExtension {
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
