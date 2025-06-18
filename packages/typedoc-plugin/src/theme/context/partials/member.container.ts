// TODO: Remove this file once https://github.com/typedoc2md/typedoc-plugin-markdown/pull/823/ is released

import type { DeclarationReflection } from 'typedoc'
import { ReflectionKind } from 'typedoc'
import type { MarkdownThemeContext } from 'typedoc-plugin-markdown'

import { heading } from '../../../libs/markdown/heading'

export function memberContainer(
  this: MarkdownThemeContext,
  model: DeclarationReflection,
  options: { headingLevel: number; nested?: boolean; groupTitle?: string },
): string {
  const md: string[] = []

  md.push('<!-- DEBUG memberContainer START -->')

  const anchor = this.router.getAnchor(model)
  const logger = this.theme.application.logger

  if (
    !this.router.hasOwnDocument(model)
    && this.router.hasUrl(model)
    && anchor
    && this.options.getValue('useHTMLAnchors')
  ) {
    md.push(`<a id="${anchor}"></a>`)
  }

  if (
    !this.router.hasOwnDocument(model)
    && ![ReflectionKind.Constructor].includes(model.kind)
    && (
      /* Additional logic: don't add heading for properties */
      // TODO: Move this logic to a member.container.patch.ts file once https://github.com/typedoc2md/typedoc-plugin-markdown/pull/823/
      // is released
      model.kind !== ReflectionKind.Property
    )
  ) {
    let title = this.partials.memberTitle(model)
    if (title.includes('\n')) {
      logger.warn(
        `[typedoc-plugin-md] Get unexpected newlines in title: ${title}`,
      )
    } else if (anchor) {
      // See also https://www.npmjs.com/package/remark-custom-heading-id
      title = `${title} {#${anchor}}`
    }

    md.push(heading(options.headingLevel, title))
  }

  md.push('<!-- DEBUG memberContainer STEP 3 -->')

  md.push(
    this.partials.member(model, {
      headingLevel: options.headingLevel,
      nested: options.nested,
    }),
  )

  md.push('<!-- DEBUG memberContainer STEP 4 -->')

  md.push('<!-- DEBUG memberContainer END -->')

  return md.join('\n\n')
}
