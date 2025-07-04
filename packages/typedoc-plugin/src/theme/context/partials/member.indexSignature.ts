import type { SignatureReflection } from 'typedoc'
import type { MarkdownThemeContext } from 'typedoc-plugin-markdown'

export function indexSignature(
  this: MarkdownThemeContext,
  model: SignatureReflection,
  options?: { headingLevel: number },
): string {
  const md: string[] = []

  const titleMd: string[] = []
  titleMd.push('<code data-typedoc-code>')

  const params = model.parameters
    ? model.parameters.map((parameter) => {
      return parameter.type
        ? `${parameter.name}: ${
          this.partials.someType(
            parameter.type,
          )
        }`
        : ''
    })
    : []
  if (model.type) {
    titleMd.push(
      `\\[${params.join('')}\\]: ${this.partials.someType(model.type)}`,
    )
  }

  titleMd.push('</code>')

  md.push(
    '<dl>',
    '<dt>',
    titleMd.join(''),
    '</dt>',
  )

  if (model.comment) {
    let body = this.partials.comment(model.comment, {
      headingLevel: options?.headingLevel,
    })
    md.push('<dd>', body, '</dd>')
  }

  md.push('</dl>')

  return md.join('\n\n')
}
