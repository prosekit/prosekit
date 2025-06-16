import type { Reflection } from 'typedoc'
import { MarkdownTheme, type MarkdownPageEvent } from 'typedoc-plugin-markdown'

import { MyMarkdownThemeContext } from './markdown-theme-context'

export class MyMarkdownTheme extends MarkdownTheme {
  constructor(...args: ConstructorParameters<typeof MarkdownTheme>) {
    super(...args)
  }

  getRenderContext(page: MarkdownPageEvent<Reflection>) {
    return new MyMarkdownThemeContext(this, page, this.application.options)
  }
}
