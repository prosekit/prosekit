import { consume } from '@lit-labs/context'
import { type CSSResultGroup, LitElement, type PropertyValues, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

import { blockComponentStyles } from '../../styles/block-component.styles'
import {
  type AutocompleteListContext,
  commandListContext,
} from '../autocomplete-list/context'

export const propNames = [] as const

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AutocompleteEmptyProps {}

@customElement('prosekit-autocomplete-empty')
export class AutocompleteEmpty
  extends LitElement
  implements AutocompleteEmptyProps
{
  /** @hidden */
  static styles: CSSResultGroup = blockComponentStyles

  @consume({ context: commandListContext, subscribe: true })
  @state()
  listContext?: AutocompleteListContext

  protected willUpdate(_changedProperties: PropertyValues<this>): void {
    const scores = this.listContext?.scores
    let hasMatch = false
    if (scores) {
      for (const score of scores.values()) {
        if (score > 0) {
          hasMatch = true
          break
        }
      }
    }

    this.hidden = hasMatch
    this.inert = hasMatch
  }

  /** @hidden */
  render() {
    if (this.hidden) {
      return null
    }
    return html`
      <div role="option">
        <slot></slot>
      </div>
    `
  }
}
