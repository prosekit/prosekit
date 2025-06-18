import type { DeclarationReflection } from 'typedoc'
import { ReflectionKind } from 'typedoc'
import type { MarkdownThemeContext } from 'typedoc-plugin-markdown'

export function membersPatch(
  this: MarkdownThemeContext,
  models: DeclarationReflection[],
  options: { headingLevel: number; groupTitle?: string },
): string | null {
  const parent = models?.at(0)?.parent

  if (!parent) {
    return null
  }

  if (parent.kind === ReflectionKind.Interface) {
    const md: string[] = ['<dl>']
    const items = models.filter((item) => !this.router.hasOwnDocument(item))
    items.forEach((item) => {
      md.push(
        this.partials.memberContainer(item, {
          headingLevel: options.headingLevel,
          groupTitle: options.groupTitle,
        }),
      )
    })
    md.push('</dl>')
    return md.join('\n\n')
  }

  return null
}
