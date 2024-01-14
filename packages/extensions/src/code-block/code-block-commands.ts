import {
  defineCommands,
  insertNode,
  setBlockType,
  setNodeAttrs,
  toggleNode,
} from '@prosekit/core'
import type { Command } from '@prosekit/pm/state'

import type { CodeBlockAttrs } from './code-block-types'

/**
 * @internal
 */
export function setCodeBlock(attrs?: CodeBlockAttrs): Command {
  return setBlockType({ type: 'codeBlock', attrs })
}

/**
 * @internal
 */
export function insertCodeBlock(attrs?: CodeBlockAttrs): Command {
  return insertNode({ type: 'codeBlock', attrs })
}

/**
 * @internal
 */
export function toggleCodeBlock(attrs?: CodeBlockAttrs): Command {
  return toggleNode({ type: 'codeBlock', attrs })
}

/**
 * @internal
 */
export function setCodeBlockAttrs(attrs: CodeBlockAttrs): Command {
  return setNodeAttrs({ type: 'codeBlock', attrs })
}

/**
 * @deprecated Use `setCodeBlockAttrs` instead.
 */
export function setCodeBlockLanguage(language: string): Command {
  return setCodeBlockAttrs({ language })
}

/**
 * Adds commands for working with `codeBlock` nodes.
 *
 * @public
 */
export function defineCodeBlockCommands() {
  return defineCommands({
    setCodeBlock: setCodeBlock,
    insertCodeBlock: insertCodeBlock,
    toggleCodeBlock: toggleCodeBlock,
    setCodeBlockAttrs: setCodeBlockAttrs,

    /**
     * @deprecated Use `setCodeBlockAttrs` instead.
     */
    setCodeBlockLanguage,
  })
}
