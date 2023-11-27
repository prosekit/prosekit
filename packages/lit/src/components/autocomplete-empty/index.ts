import { ContextConsumer } from '@lit/context'
import { type PropertyValues } from 'lit'

import { defineCustomElement } from '../../utils/define-custom-element'
import { autocompleteListContext } from '../autocomplete-list/context'
import { LightElement } from '../block-element'

export const propNames = [] as const

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AutocompleteEmptyProps {}

export class AutocompleteEmpty
  extends LightElement
  implements AutocompleteEmptyProps
{
  private listContext = new ContextConsumer(this, {
    context: autocompleteListContext,
    subscribe: true,
  })

  connectedCallback() {
    super.connectedCallback()
    this.role = 'option'
  }

  protected willUpdate(_changedProperties: PropertyValues<this>): void {
    const scores = this.listContext.value?.scores
    let hasMatch = false

    if (scores) {
      for (const score of scores.values()) {
        if (score > 0) {
          hasMatch = true
          break
        }
      }
    }

    this.setHidden(hasMatch)
  }
}

defineCustomElement('prosekit-autocomplete-empty', AutocompleteEmpty)
