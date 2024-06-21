import type { Extension } from '@prosekit/core'
import type { SpecialLanguage } from 'shiki'

import { defineCodeBlockHighlight } from './code-block-highlight'
import type { ShikiBundledLanguage, ShikiBundledTheme } from './shiki-bundle'
import { createLazyParser } from './shiki-parser'

/**
 * @public
 */
export interface CodeBlockShikiOptions {
  /**
   * A list of shiki themes to pre-load. The first theme in the list will be
   * used to render the code block.
   *
   * @default ['one-dark-pro']
   */
  themes?: ShikiBundledTheme[]

  /**
   * A list of shiki languages to pre-load.
   *
   * @default ['text']
   */
  langs?: (ShikiBundledLanguage | SpecialLanguage)[]

  /**
   * Alias of languages
   *
   * @example { 'my-lang': 'javascript' }
   */
  langAlias?: Record<string, ShikiBundledLanguage>
}

/**
 * Adds syntax highlighting to code blocks using the [shiki](https://github.com/shikijs/shiki) package.
 *
 * @public
 */
export function defineCodeBlockShiki({
  themes = ['one-dark-pro'],
  langs = ['text'],
  langAlias = {},
}: CodeBlockShikiOptions = {}): Extension {
  const parser = createLazyParser({ themes, langs, langAlias })
  return defineCodeBlockHighlight({ parser })
}
