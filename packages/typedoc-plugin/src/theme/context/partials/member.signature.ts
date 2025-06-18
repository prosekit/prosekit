import type { SignatureReflection } from 'typedoc'
import { ReflectionKind } from 'typedoc'
import type { MarkdownThemeContext } from 'typedoc-plugin-markdown'

import { heading } from '../../../libs/markdown/heading'

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
  const md: string[] = []

  md.push(`<!-- DEBUG signature START hideTitle: ${options.hideTitle}; multipleSignatures: ${options.multipleSignatures};-->`)

  md.push('<!-- DEBUG signature STEP 01 -->')

  if (!options.hideTitle) {
    md.push(
      this.partials.signatureTitle(model, {
        accessor: options.accessor,
      }),
    )
  }

  md.push('<!-- DEBUG signature STEP 01.1 -->')

  if (
    !options.nested
    && model.sources
    && !this.options.getValue('disableSources')
  ) {
    md.push('<!-- DEBUG signature STEP 01.2 -->')
    md.push(this.partials.sources(model))
    md.push('<!-- DEBUG signature STEP 01.3 -->')
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

  md.push('<!-- DEBUG signature STEP 02 -->')

  if (modelComments) {
    md.push(
      this.partials.comment(modelComments, {
        headingLevel: options.headingLevel,
        showTags: false,
        showSummary: true,
      }),
    )
  }

  md.push('<!-- DEBUG signature STEP 03 -->')

  if (!options.multipleSignatures && model.parent?.documents) {
    md.push(
      this.partials.documents(model?.parent, {
        headingLevel: options.headingLevel,
      }),
    )
  }

  md.push('<!-- DEBUG signature STEP 04 -->')

  if (
    model.typeParameters?.length
    && model.kind !== ReflectionKind.ConstructorSignature
  ) {
    md.push(
      heading(
        options.headingLevel,
        ReflectionKind.pluralString(ReflectionKind.TypeParameter),
      ),
    )
    if (this.helpers.useTableFormat('parameters')) {
      md.push(this.partials.typeParametersTable(model.typeParameters))
    } else {
      md.push(
        this.partials.typeParametersList(model.typeParameters, {
          headingLevel: options.headingLevel,
        }),
      )
    }
  }

  md.push('<!-- DEBUG signature STEP 05 -->')

  if (model.parameters?.length) {
    md.push(
      heading(
        options.headingLevel,
        ReflectionKind.pluralString(ReflectionKind.Parameter),
      ),
    )
    if (this.helpers.useTableFormat('parameters')) {
      md.push(this.partials.parametersTable(model.parameters))
    } else {
      md.push(
        this.partials.parametersList(model.parameters, {
          headingLevel: options.headingLevel,
        }),
      )
    }
  }

  md.push('<!-- DEBUG signature STEP 06 -->')

  if (model.type) {
    md.push(
      this.partials.signatureReturns(model, {
        headingLevel: options.headingLevel,
      }),
    )
  }

  md.push('<!-- DEBUG signature STEP 07 -->')

  if (modelComments) {
    md.push(
      this.partials.comment(modelComments, {
        headingLevel: options.headingLevel,
        showTags: true,
        showSummary: false,
      }),
    )
  }

  md.push('<!-- DEBUG signature STEP 08 -->')

  md.push(
    this.partials.inheritance(model, { headingLevel: options.headingLevel }),
  )

  md.push('<!-- DEBUG signature END -->')

  return md.join('\n\n')
}
