import type { DeclarationReflection } from 'typedoc'
import { ReflectionKind } from 'typedoc'
import type { MarkdownThemeContext } from 'typedoc-plugin-markdown'

// Based on https://github.com/typedoc2md/typedoc-plugin-markdown/blob/typedoc-plugin-markdown@4.7.0/packages/typedoc-plugin-markdown/src/theme/context/partials/member.accessor.ts
// with the following changes:
//
// - Added `<dl>` and `<dt>` and `<dd>` tags
// - Commented out some code that is not used

export function accessor(
  this: MarkdownThemeContext,
  model: DeclarationReflection,
  options: { headingLevel: number },
): string {
  const md: string[] = []

  const showSources = model?.parent?.kind !== ReflectionKind.TypeLiteral

  md.push('<dl>')

  if (model.getSignature) {
    /*
    md.push(heading(options.headingLevel, i18n.kind_get_signature()))
    */

    md.push('<dt>')

    md.push(
      this.partials.signatureTitle(model.getSignature, {
        accessor: 'get',
      }),
    )

    md.push('</dt>')

    md.push('<dd>')

    if (showSources && !this.options.getValue('disableSources')) {
      if (model.getSignature?.sources) {
        md.push(this.partials.sources(model.getSignature))
      }
    }

    if (model.getSignature.comment) {
      md.push(
        this.partials.comment(model.getSignature.comment, {
          headingLevel: options.headingLevel + 1,
        }),
      )
    }

    /*
    if (model.getSignature?.type) {
      md.push(
        this.partials.signatureReturns(model.getSignature, {
          headingLevel: options.headingLevel + 1,
        }),
      )
    }
    */

    md.push('</dd>')
  }
  if (model.setSignature) {
    /*
    md.push(heading(options.headingLevel, i18n.kind_set_signature()))
    */

    md.push('<dt>')

    md.push(
      this.partials.signatureTitle(model.setSignature, {
        accessor: 'set',
      }),
    )

    md.push('</dt>')

    md.push('<dd>')

    if (showSources && !this.options.getValue('disableSources')) {
      if (model.setSignature?.sources) {
        md.push(this.partials.sources(model.setSignature))
      }
    }

    if (model.setSignature.comment) {
      md.push(
        this.partials.comment(model.setSignature.comment, {
          headingLevel: options.headingLevel + 1,
        }),
      )
    }

    /*
    if (model.setSignature?.parameters?.length) {
      md.push(
        heading(
          options.headingLevel + 1,
          ReflectionKind.pluralString(ReflectionKind.Parameter),
        ),
      )
      if (this.helpers.useTableFormat('parameters')) {
        md.push(this.partials.parametersTable(model.setSignature.parameters))
      } else {
        md.push(
          this.partials.parametersList(model.setSignature.parameters, {
            headingLevel: options.headingLevel + 1,
          }),
        )
      }
    }
    */

    /*
    if (model.setSignature?.type) {
      md.push(
        this.partials.signatureReturns(model.setSignature, {
          headingLevel: options.headingLevel + 1,
        }),
      )
    }
    */

    md.push('</dd>')
  }

  md.push('</dl>')

  if (showSources && !this.options.getValue('disableSources')) {
    if (!model.getSignature && !model.setSignature) {
      md.push(this.partials.sources(model))
    }
  }

  if (model.comment) {
    md.push(
      this.partials.comment(model.comment, {
        headingLevel: options.headingLevel,
      }),
    )
  }

  md.push(
    this.partials.inheritance(model, { headingLevel: options.headingLevel }),
  )

  return md.join('\n\n')
}
