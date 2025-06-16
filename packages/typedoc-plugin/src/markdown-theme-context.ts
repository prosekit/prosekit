import { MarkdownThemeContext } from 'typedoc-plugin-markdown'

export class MyMarkdownThemeContext extends MarkdownThemeContext {
  constructor(...args: ConstructorParameters<typeof MarkdownThemeContext>) {
    super(...args)

    const originalPartials = { ...this.partials }

    this.partials.signatureTitle = (...args) => {
      const result = originalPartials.signatureTitle(...args)
      return (
        `<!-- DEBUG_signatureTitle_start -->`
        + '\n\n'
        + '<pre>'
        + '\n\n'
        + result
        + '\n\n'
        + '</pre>'
        + '\n\n'
        + `<!-- DEBUG_signatureTitle_end -->`
      )
    }
  }
}
