import { consume } from '@lit-labs/context'
import { CSSResultGroup, LitElement, PropertyValues, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

import { blockComponentStyles } from '../../styles/block-component.styles'

import { CommandListContext, commandListContext } from './command-list-context'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CommandEmptyProps {}

@customElement('prosekit-command-empty')
export class CommandEmpty extends LitElement implements CommandEmptyProps {
  /** @hidden */
  static styles: CSSResultGroup = blockComponentStyles

  @consume({ context: commandListContext, subscribe: true })
  @state()
  listContext?: CommandListContext

  protected willUpdate(_changedProperties: PropertyValues<CommandEmpty>): void {
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
