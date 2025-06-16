import { MarkdownThemeContext } from 'typedoc-plugin-markdown'

import { memberContainer } from './theme/context/partials/member.container'

export class MyMarkdownThemeContext extends MarkdownThemeContext {
  constructor(...args: ConstructorParameters<typeof MarkdownThemeContext>) {
    super(...args)

    const originalPartials = { ...this.partials }

    this.partials.memberContainer = (...args) => {
      return memberContainer.call(this, ...args)
    }

    this.partials.signatureTitle = (...args) => {
      const result = originalPartials.signatureTitle(...args)
      return (
        `<!-- DEBUG_signatureTitle_start -->`
        + '\n\n'
        + '\n\n'
        + result
        + '\n\n'
        + '\n\n'
        + `<!-- DEBUG_signatureTitle_end -->`
      )
    }
  }
}
