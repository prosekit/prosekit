import type {
  DeclarationReflection,
  SignatureReflection,
} from 'typedoc'
import {
  i18n,
  ReflectionKind,
} from 'typedoc'
import type { MarkdownThemeContext } from 'typedoc-plugin-markdown'

import { heading } from '../../../libs/markdown/heading'

export function inheritance(
  this: MarkdownThemeContext,
  model: DeclarationReflection | SignatureReflection,
  options: { headingLevel: number },
): string {
  const md: string[] = [
    `<!-- DEBUG inheritance start kind=${model.kind} -->`,
  ]

  if (model.kind === ReflectionKind.Property) {
    return md.join('\n\n')
  }

  if (model.implementationOf) {
    if (options.headingLevel !== -1) {
      md.push(heading(options.headingLevel, i18n.theme_implementation_of()))
    }
    md.push(this.partials.typeAndParent(model.implementationOf))
  }

  if (model.inheritedFrom) {
    if (options.headingLevel !== -1) {
      md.push(heading(options.headingLevel, i18n.theme_inherited_from()))
    }
    md.push(this.partials.typeAndParent(model.inheritedFrom))
  }

  if (model.overwrites) {
    const overridesLabel = i18n.theme_overrides()
    if (options.headingLevel !== -1) {
      md.push(heading(options.headingLevel, overridesLabel))
    }
    md.push(this.partials.typeAndParent(model.overwrites))
  }

  return md.join('\n\n')
}
