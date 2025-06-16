import { MarkdownThemeContext } from 'typedoc-plugin-markdown'

import { memberContainer } from './theme/context/partials/member.container'

export class MyMarkdownThemeContext extends MarkdownThemeContext {
  constructor(...args: ConstructorParameters<typeof MarkdownThemeContext>) {
    super(...args)

    this.partials.memberContainer = (...args) => {
      return memberContainer.call(this, ...args)
    }
  }
}
