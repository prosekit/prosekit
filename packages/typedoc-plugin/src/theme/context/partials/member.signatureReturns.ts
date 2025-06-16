import type {
  DeclarationReflection,
  SignatureReflection,
} from 'typedoc'
import {
  i18n,
  UnionType,
} from 'typedoc'
import type { MarkdownThemeContext } from 'typedoc-plugin-markdown'

import { heading } from '../../../libs/markdown/heading'

export function signatureReturns(
  this: MarkdownThemeContext,
  model: SignatureReflection,
  options: { headingLevel: number },
): string {
  const md: string[] = []

  const typeDeclaration = (model.type as any)
    ?.declaration as DeclarationReflection

  md.push(heading(options.headingLevel, i18n.theme_returns()), '<!-- DEBUG signatureReturns 1 -->')

  if (!typeDeclaration?.signatures) {
    if (model.type && this.helpers.hasUsefulTypeDetails(model.type)) {
      if (model.type instanceof UnionType) {
        md.push('<!-- DEBUG signatureReturns 1.1 -->')
        md.push(
          this.partials.typeDeclarationUnionContainer(
            model as unknown as DeclarationReflection,
            options,
          ),
        )
      }
    } else {
      md.push('<!-- DEBUG signatureReturns 1.2 -->')
      md.push(this.helpers.getReturnType(model.type))
      md.push('<!-- DEBUG signatureReturns 1.3 -->')
    }
  }

  md.push('<!-- DEBUG signatureReturns 2 -->')

  const returnsTag = model.comment?.getTag('@returns')

  if (returnsTag) {
    md.push(this.helpers.getCommentParts(returnsTag.content))
  }

  md.push('<!-- DEBUG signatureReturns 3 -->')

  if (typeDeclaration?.signatures) {
    typeDeclaration.signatures.forEach((signature) => {
      md.push(
        this.partials.signature(signature, {
          headingLevel: options.headingLevel + 1,
          nested: true,
        }),
      )
    })
  }

  md.push('<!-- DEBUG signatureReturns 4 -->')

  if (typeDeclaration?.children) {
    md.push(
      this.partials.typeDeclaration(typeDeclaration, {
        headingLevel: options.headingLevel,
      }),
    )
  }

  md.push('<!-- DEBUG signatureReturns 5 -->')
  return md.join('\n\n')
}
