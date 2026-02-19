import type { Extension } from '@prosekit/core'
import type { SpecialLanguage } from 'shiki'

import { defineCodeBlockHighlight } from './code-block-highlight'
import type { ShikiBundledLanguage, ShikiBundledTheme } from './shiki-bundle'
import type { ShikiHighlighterOptions } from './shiki-highlighter-chunk'
import { createLazyParser } from './shiki-parser'

/**
 * The options to configure the Shiki highlighter.
 *
 * @public
 */
export interface CodeBlockShikiOptions extends Omit<ShikiHighlighterOptions, 'themes' | 'langs' | 'engine'> {
  /**
   * ProseMirror node types to highlight.
   *
   * @default ['codeBlock', 'mathBlock']
   */
  nodeTypes?: string[]

  /**
   * A list of Shiki themes to pre-load. The first theme in the list will be
   * used to render the code block.
   *
   * @default ['one-dark-pro']
   */
  themes?: ShikiBundledTheme[]

  /**
   * A list of Shiki languages to pre-load.
   *
   * @default ['text']
   */
  langs?: (ShikiBundledLanguage | SpecialLanguage)[]

  /**
   * The RegExp engine to use. By default, the JavaScript engine is used.
   */
  engine?: ShikiHighlighterOptions['engine']
}

/**
 * Adds syntax highlighting to code blocks using the [Shiki](https://github.com/shikijs/shiki) package.
 *
 * It will set two CSS variables on the code block elements:
 *
 * - `--prosemirror-highlight`: sets text color
 * - `--prosemirror-highlight-bg`: sets background color
 *
 * @param options - The options to configure the Shiki highlighter.
 *
 * @public
 */
export function defineCodeBlockShiki({
  nodeTypes,
  themes = ['one-dark-pro'],
  langs = ['text'],
  ...rest
}: CodeBlockShikiOptions = {}): Extension {
  const parser = createLazyParser({ themes, langs, ...rest })
  return defineCodeBlockHighlight({ parser, nodeTypes })
}
