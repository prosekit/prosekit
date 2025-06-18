import type { SignatureReflection } from 'typedoc'
import { ReflectionKind } from 'typedoc'
import type { MarkdownThemeContext } from 'typedoc-plugin-markdown'

export function signatureTitle(
  this: MarkdownThemeContext,
  model: SignatureReflection,
  options?: {
    accessor?: string
    includeType?: boolean
  },
): string {
  const md: string[] = []

  const keyword = this.helpers.getKeyword(model.parent.kind)

  if (this.helpers.isGroupKind(model.parent) && keyword) {
    md.push(`<i>${keyword}</i>`, ' ')
  }

  if (options?.accessor) {
    md.push((options?.accessor) + ' ')
  }

  if (model.parent) {
    md.push(
      ...this.helpers.getReflectionFlags(model.parent.flags)
        .split(' ')
        .flatMap((flag) => [`<i>${flag}</i>`, ' ']),
    )
  }

  if (!['__call', '__type'].includes(model.name)) {
    if (model.kind === ReflectionKind.ConstructorSignature) {
      md.push('new')
      md.push(' ')
    }

    const anchor = this.router.hasUrl(model) && this.router.getAnchor(model)
    if (anchor) {
      md.push(`<a id="${anchor}" href="#${anchor}">${model.name}</a>`)
    } else {
      md.push(model.name)
    }
  }

  if (model.typeParameters) {
    md.push(
      String.raw`\<`,
      model.typeParameters
        .map((typeParameter) => typeParameter.name)
        .join(', '),
      String.raw`\>`,
    )
  }

  md.push(this.partials.signatureParameters(model.parameters || []))

  if (model.type) {
    md.push(`: ${this.partials.someType(model.type)}`)
  }

  md.unshift('<code data-typedoc-declaration>')
  md.push('</code>')

  return md.join('')
}
