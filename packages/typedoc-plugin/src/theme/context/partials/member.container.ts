import type { DeclarationReflection } from 'typedoc'
import { ReflectionKind } from 'typedoc'
import type { MarkdownThemeContext } from 'typedoc-plugin-markdown'

import { heading } from '../../../libs/markdown/index.js'

export function memberContainer(
  this: MarkdownThemeContext,
  model: DeclarationReflection,
  options: { headingLevel: number; nested?: boolean; groupTitle?: string },
): string {
  const md: string[] = []

  if (
    !this.router.hasOwnDocument(model)
    && this.router.hasUrl(model)
    && this.router.getAnchor(model)
    && this.options.getValue('useHTMLAnchors')
  ) {
    md.push(`<a id="${this.router.getAnchor(model)}"></a>`)
  }

  if (
    !this.router.hasOwnDocument(model)
    && ![ReflectionKind.Constructor].includes(model.kind)
  ) {
    md.push(heading(options.headingLevel, this.partials.memberTitle(model)))
  }

  md.push(
    this.partials.member(model, {
      headingLevel: options.headingLevel,
      nested: options.nested,
    }),
  )

  return md.join('\n\n')
}
