import { consume } from '@lit-labs/context'
import { type CSSResultGroup, LitElement, type PropertyValues, html } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'

import { blockComponentStyles } from '../../styles/block-component.styles'
import {
  type AutocompleteListContext,
  commandListContext,
} from '../autocomplete-list/context'

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
  extends LitElement
  implements Partial<AutocompleteItemProps>
{
  /** @hidden */
  static styles: CSSResultGroup = blockComponentStyles

  @property({ type: String, reflect: true, attribute: 'data-value' })
  value = ''

  @property({ type: Boolean, reflect: true, attribute: 'data-selected' })
  selected = false

  /** @hidden */
  @property({ attribute: false })
  onSelect?: VoidFunction

  /** @hidden */
  @query('slot') defaultSlot?: HTMLSlotElement

  @consume({ context: commandListContext, subscribe: true })
  @state({})
  listContext?: AutocompleteListContext

  public get content(): string {
    const text = this.value || this.textContent || ''
    return text.trim().toLowerCase()
  }

  protected willUpdate(changedProperties: PropertyValues<this>): void {
    const content = this.content
    this.selected = content === this.listContext?.selectedValue
    const score = this.listContext?.scores.get(content) || 0

    this.inert = score <= 0
    this.hidden = score <= 0

    if (changedProperties.has('listContext') && this.listContext) {
      this.listContext.registerValue(this.content)
    }
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

  /** @hidden */
  render() {
    if (this.hidden) {
      return null
    }
    return html`
      <div role="option" aria-selected=${this.selected}>
        <slot></slot>
      </div>
    `
  }
}
