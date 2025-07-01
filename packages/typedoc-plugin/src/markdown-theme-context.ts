import { MarkdownThemeContext } from 'typedoc-plugin-markdown'

import { getReflectionFlags } from './theme/context/helpers/get-reflection-flags'
import { accessor } from './theme/context/partials/member.accessor'
import { memberContainerPatch } from './theme/context/partials/member.container.patch'
import { declaration } from './theme/context/partials/member.declaration'
import { declarationTitle } from './theme/context/partials/member.declarationTitle'
import { inheritance } from './theme/context/partials/member.inheritance'
import { memberWithGroups } from './theme/context/partials/member.memberWithGroups'
import { signature } from './theme/context/partials/member.signature'
import { signatureTitle } from './theme/context/partials/member.signatureTitle'

export class MyMarkdownThemeContext extends MarkdownThemeContext {
  constructor(...args: ConstructorParameters<typeof MarkdownThemeContext>) {
    super(...args)

    const partials = { ...this.partials }

    this.helpers.getReflectionFlags = (...args) => {
      return getReflectionFlags.call(this, ...args)
    }

    this.partials.memberContainer = (...args) => {
      return memberContainerPatch.call(this, ...args) || partials.memberContainer.call(this, ...args)
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
    this.partials.signature = (...args) => {
      return signature.call(this, ...args)
    }
    this.partials.signatureTitle = (...args) => {
      return signatureTitle.call(this, ...args)
    }
    this.partials.memberWithGroups = (...args) => {
      return memberWithGroups.call(this, ...args)
    }
    this.partials.accessor = (...args) => {
      return accessor.call(this, ...args)
    }
  }
}
