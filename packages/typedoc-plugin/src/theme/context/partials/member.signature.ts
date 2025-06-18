import type { SignatureReflection } from 'typedoc'
import type { MarkdownThemeContext } from 'typedoc-plugin-markdown'

import { signatureBody } from './member.signatureBody'

export function signature(
  this: MarkdownThemeContext,
  model: SignatureReflection,
  options: {
    headingLevel: number
    nested?: boolean
    accessor?: string
    multipleSignatures?: boolean
    hideTitle?: boolean
  },
): string {
  let title = !options.hideTitle && this.partials.signatureTitle(model, { accessor: options.accessor })
  let body = signatureBody.call(this, model, options)

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
