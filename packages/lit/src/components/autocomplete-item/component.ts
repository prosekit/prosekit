import { consume } from '@lit/context'
import { type PropertyValues } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import {
  commandListContext,
  type AutocompleteListContext,
} from '../autocomplete-list/context'
import { LightElement } from '../block-element'

export const propNames = ['value', 'onSelect'] as const

export interface AutocompleteItemProps {
  value?: string
  onSelect: VoidFunction
}

/**
 * Command menu item. Becomes active on pointer enter or through keyboard
 * navigation. Preferably pass a `value`, otherwise the value will be inferred
 * from the rendered item's `textContent`.
 */
@customElement('prosekit-autocomplete-item')
export class AutocompleteItem
  extends LightElement
  implements Partial<AutocompleteItemProps>
{
  @property({ type: String, reflect: true, attribute: 'data-value' })
  value = ''

  @property({ type: Boolean, reflect: true, attribute: 'data-selected' })
  selected = false

  /** @hidden */
  @property({ attribute: false })
  onSelect?: VoidFunction

  @consume({ context: commandListContext, subscribe: true })
  @state({})
  listContext?: AutocompleteListContext

  public get content(): string {
    const text = this.value || this.textContent || ''
    return text.trim().toLowerCase()
  }

  connectedCallback() {
    super.connectedCallback()
    this.role = 'option'
  }

  protected willUpdate(): void {
    const content = this.content
    this.selected = content === this.listContext?.selectedValue
    const score = this.listContext?.scores.get(content) || 0

    this.setHidden(score <= 0)
  }

  protected updated(changedProperties: PropertyValues<this>): void {
    if (
      this.selected &&
      changedProperties.has('selected') &&
      !changedProperties.get('selected')
    ) {
      this.scrollIntoView({ block: 'nearest' })
    }
  }
}
