import type { DeclarationReflection } from 'typedoc'
import type { MarkdownThemeContext } from 'typedoc-plugin-markdown'

import { declarationBody } from './member.declarationBody'

export function declaration(
  this: MarkdownThemeContext,
  model: DeclarationReflection,
  options: {
    headingLevel: number
    nested?: boolean
  } = {
    headingLevel: 2,
    nested: false,
  },
): string {
  let title = this.partials.declarationTitle(model)
  let body = declarationBody.call(this, model, options)
  if (!title && !body) {
    return ''
  }

  let md: string[] = []
  md.push('<dl>')
  if (title) {
    md.push('<dt>', title, '</dt>')
  }
  if (body) {
    md.push('<dd>', body, '</dd>')
  }
  md.push('</dl>')
  return md.join('\n\n')
}
