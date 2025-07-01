import type { DeclarationReflection } from 'typedoc'
import { ReflectionKind } from 'typedoc'
import type { MarkdownThemeContext } from 'typedoc-plugin-markdown'

export function memberContainerPatch(
  this: MarkdownThemeContext,
  model: DeclarationReflection,
  options: { headingLevel: number; nested?: boolean; groupTitle?: string },
): string | null {
  const md: string[] = []

  // Additional logic: don't add heading for some kinds of members
  if ([ReflectionKind.Property, ReflectionKind.Accessor, ReflectionKind.Method].includes(model.kind)) {
    md.push(
      this.partials.member(model, {
        headingLevel: options.headingLevel,
        nested: options.nested,
      }),
    )

    return md.join('\n\n')
  }

  return null
}
