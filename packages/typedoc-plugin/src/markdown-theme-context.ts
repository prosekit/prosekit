import { MarkdownThemeContext } from 'typedoc-plugin-markdown'

import { memberContainer } from './theme/context/partials/member.container'
import { declaration } from './theme/context/partials/member.declaration'
import { declarationTitle } from './theme/context/partials/member.declarationTitle'
import { inheritance } from './theme/context/partials/member.inheritance'

export class MyMarkdownThemeContext extends MarkdownThemeContext {
  constructor(...args: ConstructorParameters<typeof MarkdownThemeContext>) {
    super(...args)

    this.partials.memberContainer = (...args) => {
      return memberContainer.call(this, ...args)
    }
    this.partials.inheritance = (...args) => {
      return inheritance.call(this, ...args)
    }
    this.partials.declaration = (...args) => {
      return declaration.call(this, ...args)
    }
    this.partials.declarationTitle = (...args) => {
      return declarationTitle.call(this, ...args)
    }
  }
}
