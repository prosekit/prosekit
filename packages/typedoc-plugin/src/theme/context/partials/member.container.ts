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

  md.push(
    this.partials.member(model, {
      headingLevel: options.headingLevel,
      nested: options.nested,
    }),
  )

  return md.join('\n\n')
}
