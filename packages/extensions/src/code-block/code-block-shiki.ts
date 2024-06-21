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
   * Theme registation
   *
   * @default ['one-dark-pro']
   */
  themes?: ShikiBundledTheme[]

  /**
   * Language registation
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
  console.log('defineCodeBlockShiki', themes)
  const parser = createLazyParser({ themes, langs, langAlias })
  return defineCodeBlockHighlight({ parser })
}
