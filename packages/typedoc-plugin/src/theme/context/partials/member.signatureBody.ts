import type { SignatureReflection } from 'typedoc'
import type { MarkdownThemeContext } from 'typedoc-plugin-markdown'

// Based on https://github.com/typedoc2md/typedoc-plugin-markdown/blob/typedoc-plugin-markdown%404.6.4/packages/typedoc-plugin-markdown/src/theme/context/partials/member.signature.ts#L5
// with the following changes:
//
// - `this.partials.signatureTitle(model)` is not called
// - `this.partials.typeParametersList` is not called
// - `this.partials.parametersList` is not called
// - `this.partials.signatureReturns` is not called
export function signatureBody(
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
  const md: string[] = []

  // if (!options.hideTitle) {
  //   md.push(
  //     this.partials.signatureTitle(model, {
  //       accessor: options.accessor,
  //     }),
  //   )
  // }

  if (
    !options.nested
    && model.sources
    && !this.options.getValue('disableSources')
  ) {
    md.push(this.partials.sources(model))
  }

  let modelComments = options.multipleSignatures
    ? model.comment
    : model.comment || model.parent?.comment

  if (
    modelComments
    && model.parent?.comment?.summary
    && !options.multipleSignatures
  ) {
    modelComments = Object.assign(modelComments, {
      summary: model.parent.comment.summary,
    })
  }

  if (modelComments && model.parent?.comment?.blockTags) {
    modelComments.blockTags = [
      ...(model.parent?.comment?.blockTags || []),
      ...(model.comment?.blockTags || []),
    ]
  }

  if (modelComments) {
    md.push(
      this.partials.comment(modelComments, {
        headingLevel: options.headingLevel,
        showTags: false,
        showSummary: true,
      }),
    )
  }

  if (!options.multipleSignatures && model.parent?.documents) {
    md.push(
      this.partials.documents(model?.parent, {
        headingLevel: options.headingLevel,
      }),
    )
  }

  // if (
  //   model.typeParameters?.length
  //   && model.kind !== ReflectionKind.ConstructorSignature
  // ) {
  //   md.push(
  //     heading(
  //       options.headingLevel,
  //       ReflectionKind.pluralString(ReflectionKind.TypeParameter),
  //     ),
  //   )
  //   if (this.helpers.useTableFormat('parameters')) {
  //     md.push(this.partials.typeParametersTable(model.typeParameters))
  //   } else {
  //     md.push(
  //       this.partials.typeParametersList(model.typeParameters, {
  //         headingLevel: options.headingLevel,
  //       }),
  //     )
  //   }
  // }

  // if (model.parameters?.length) {
  //   md.push(
  //     heading(
  //       options.headingLevel,
  //       ReflectionKind.pluralString(ReflectionKind.Parameter),
  //     ),
  //   )
  //   if (this.helpers.useTableFormat('parameters')) {
  //     md.push(this.partials.parametersTable(model.parameters))
  //   } else {
  //     md.push(
  //       this.partials.parametersList(model.parameters, {
  //         headingLevel: options.headingLevel,
  //       }),
  //     )
  //   }
  // }

  // if (model.type) {
  //   md.push(
  //     this.partials.signatureReturns(model, {
  //       headingLevel: options.headingLevel,
  //     }),
  //   )
  // }

  if (modelComments) {
    md.push(
      this.partials.comment(modelComments, {
        headingLevel: options.headingLevel,
        showTags: true,
        showSummary: false,
      }),
    )
  }

  md.push(
    this.partials.inheritance(model, { headingLevel: options.headingLevel }),
  )

  return md.join('\n\n')
}
