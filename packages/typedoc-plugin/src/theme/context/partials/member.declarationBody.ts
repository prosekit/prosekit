import type { DeclarationReflection } from 'typedoc'
import {
  ArrayType,
  i18n,
  IntersectionType,
  ReflectionKind,
  ReflectionType,
  UnionType,
} from 'typedoc'
import type { MarkdownThemeContext } from 'typedoc-plugin-markdown'

import { heading } from '../../../libs/markdown/heading'

// Based on https://github.com/typedoc2md/typedoc-plugin-markdown/blob/typedoc-plugin-markdown@4.6.4/packages/typedoc-plugin-markdown/src/theme/context/partials/member.declaration.ts#L13
// with the following changes:
//
// - `this.partials.declarationTitle(model)` is not called
// - `hasTypeDeclaration` is always `false`
export function declarationBody(
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
  const md: string[] = []

  const opts = {
    nested: false,
    ...options,
  }

  // md.push(this.partials.declarationTitle(model))

  if (
    !opts.nested
    && model.sources
    && !this.options.getValue('disableSources')
  ) {
    md.push(this.partials.sources(model))
  }

  if (model?.documents) {
    md.push(
      this.partials.documents(model, {
        headingLevel: options.headingLevel,
      }),
    )
  }

  let typeDeclaration = (model.type as ReflectionType)
    ?.declaration

  if (
    model.type instanceof ArrayType
    && model.type?.elementType instanceof ReflectionType
  ) {
    typeDeclaration = model.type?.elementType?.declaration
  }

  // const hasTypeDeclaration = Boolean(typeDeclaration)
  //   || (model.type instanceof UnionType
  //     && model.type?.types.some((type) => type instanceof ReflectionType))
  const hasTypeDeclaration = false

  if (model.comment) {
    md.push(
      this.partials.comment(model.comment, {
        headingLevel: opts.headingLevel,
        showSummary: true,
        showTags: false,
      }),
    )
  }

  if (model.type instanceof IntersectionType) {
    model.type?.types?.forEach((intersectionType) => {
      if (
        intersectionType instanceof ReflectionType
        && !intersectionType.declaration.signatures
      ) {
        if (intersectionType.declaration.children) {
          md.push(heading(opts.headingLevel, i18n.theme_type_declaration()))
          md.push(
            this.partials.typeDeclaration(intersectionType.declaration, {
              headingLevel: opts.headingLevel,
            }),
          )
        }
      }
    })
  }

  if (model.typeParameters) {
    md.push(
      heading(
        opts.headingLevel,
        ReflectionKind.pluralString(ReflectionKind.TypeParameter),
      ),
    )
    if (this.helpers.useTableFormat('parameters')) {
      md.push(this.partials.typeParametersTable(model.typeParameters))
    } else {
      md.push(
        this.partials.typeParametersList(model.typeParameters, {
          headingLevel: opts.headingLevel,
        }),
      )
    }
  }

  if (hasTypeDeclaration) {
    if (model.type instanceof UnionType) {
      if (this.helpers.hasUsefulTypeDetails(model.type)) {
        md.push(heading(opts.headingLevel, i18n.theme_type_declaration()))
        md.push(this.partials.typeDeclarationUnionContainer(model, options))
      }
    } else {
      const useHeading = typeDeclaration?.children?.length
        && (model.kind !== ReflectionKind.Property
          || this.helpers.useTableFormat('properties'))
      if (useHeading) {
        md.push(heading(opts.headingLevel, i18n.theme_type_declaration()))
      }
      md.push(
        this.partials.typeDeclarationContainer(model, typeDeclaration, options),
      )
    }
  }
  if (model.comment) {
    md.push(
      this.partials.comment(model.comment, {
        headingLevel: opts.headingLevel,
        showSummary: false,
        showTags: true,
        showReturns: true,
      }),
    )
  }

  md.push(
    this.partials.inheritance(model, { headingLevel: opts.headingLevel }),
  )

  return md.join('\n\n')
}
