import { consume } from '@lit-labs/context'
import { CSSResultGroup, LitElement, PropertyValues, html } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'

import { blockComponentStyles } from '../../styles/block-component.styles'

import { CommandListContext, commandListContext } from './command-list-context'

export interface CommandItemProps {
  value?: string
  onSelect: VoidFunction
}

/**
 * Command menu item. Becomes active on pointer enter or through keyboard
 * navigation. Preferably pass a `value`, otherwise the value will be inferred
 * from the rendered item's `textContent`.
 */
@customElement('prosekit-command-item')
export class CommandItem
  extends LitElement
  implements Partial<CommandItemProps>
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
  listContext?: CommandListContext

  public get content(): string {
    const text = this.value || this.textContent || ''
    return text.trim().toLowerCase()
  }

  protected willUpdate(changedProperties: PropertyValues<CommandItem>): void {
    const content = this.content
    this.selected = content === this.listContext?.selectedValue
    const score = this.listContext?.scores.get(content) || 0

    this.inert = score <= 0
    this.hidden = score <= 0

    if (changedProperties.has('listContext') && this.listContext) {
      this.listContext.registerValue(this.content)
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
