import type {
  Reflection,
  SignatureReflection,
} from 'typedoc'
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

    let anchorModel: Reflection | undefined = model.parent

    // Normally, `model` is passed to `this.partials.signatureTitle()`, but
    // `model.setSignature` and `model.getSignature` are passed in. Therefore we
    // need to get the parent of `model.getSignature` or `model.setSignature`
    // for the anchor.
    // https://github.com/typedoc2md/typedoc-plugin-markdown/blob/typedoc-plugin-markdown@4.7.0/packages/typedoc-plugin-markdown/src/theme/context/partials/member.accessor.ts#L17
    // https://github.com/typedoc2md/typedoc-plugin-markdown/blob/typedoc-plugin-markdown@4.7.0/packages/typedoc-plugin-markdown/src/theme/context/partials/member.accessor.ts#L46
    if ([ReflectionKind.GetSignature, ReflectionKind.SetSignature].includes(anchorModel.kind)) {
      anchorModel = anchorModel.parent
    }
    const anchor = anchorModel && this.router.hasUrl(anchorModel) && this.router.getAnchor(anchorModel)

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
