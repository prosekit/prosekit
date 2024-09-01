import type { Extension } from '@prosekit/core'
import type { SpecialLanguage } from 'shiki'

import { defineCodeBlockHighlight } from './code-block-highlight'
import type { ShikiBundledLanguage, ShikiBundledTheme } from './shiki-bundle'
import type { ShikiHighlighterOptions } from './shiki-highlighter'
import { createLazyParser } from './shiki-parser'

/**
 * The options to configure the Shiki highlighter.
 *
 * @public
 */
export interface CodeBlockShikiOptions
  extends Omit<ShikiHighlighterOptions, 'themes' | 'langs'> {
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
}

/**
 * Adds syntax highlighting to code blocks using the [Shiki](https://github.com/shikijs/shiki) package.
 *
 * @param options - The options to configure the Shiki highlighter.
 *
 * @public
 */
export function defineCodeBlockShiki({
  themes = ['one-dark-pro'],
  langs = ['text'],
  ...rest
}: CodeBlockShikiOptions = {}): Extension {
  const parser = createLazyParser({ themes, langs, ...rest })
  return defineCodeBlockHighlight({ parser })
}
