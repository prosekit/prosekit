/**
 * @module @prosekit/lit/components/command-item
 */

import { provide } from '@lit-labs/context'
import { Editor } from '@prosekit/core'
import { PredictionRule } from '@prosekit/extensions/suggestion'
import { CSSResultGroup, LitElement, PropertyValues, html } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'

import '../elements/popover'
import { PopoverOptions } from '../elements/popover'
import { defaultPopoverOptions } from '../elements/popover-suggestion/options'
import { blockComponentStyles } from '../styles/block-component.styles'

import {
  commandPopoverContext,
  type CommandPopoverContext,
} from './command-context'
import { CommandList } from './command-list'
import { CommandPopoverController } from './command-popover-controller'
import { QueryBuilder } from './command-types'
import { isCommandList } from './command-utils'

export { type QueryBuilder }

@customElement('prosekit-command-popover')
export class CommandPopover extends LitElement {
  /** @hidden */
  static styles: CSSResultGroup = blockComponentStyles

  private controller = new CommandPopoverController(this, (query) =>
    this.updateContextQuery(query),
  )

  @property({ attribute: false })
  editor: Editor | null = null

  @property({ attribute: false })
  regex: RegExp | null = null

  @property({ attribute: false })
  regexAfter: RegExp | null = null

  @property({ attribute: false })
  queryBuilder: QueryBuilder | null = null

  @property({ attribute: false })
  popoverOptions: PopoverOptions = defaultPopoverOptions

  @provide({ context: commandPopoverContext })
  @state()
  context: CommandPopoverContext = {
    query: '',
    handleDismiss: () => this.controller.handleDismiss?.(),
    handleSubmit: () => this.controller.handleSubmit?.(),
  }

  /** @hidden */
  @property({ attribute: false })
  onSelect?: VoidFunction

  /** @hidden */
  private cleanup: VoidFunction[] = []

  private get list(): CommandList | null {
    return (
      this.defaultSlot
        ?.assignedElements({ flatten: true })
        ?.find(isCommandList) ?? null
    )
  }

  private updateContextQuery(query: string) {
    if (this.context.query === query) {
      return
    }
    this.context = { ...this.context, query }
    requestAnimationFrame(() => {
      this.list?.selectFirstItem()
    })
  }

  /** @hidden */
  @query('slot') defaultSlot?: HTMLSlotElement

  /** @hidden */
  protected get active(): boolean {
    return !!this.controller?.reference
  }

  /** @hidden */
  willUpdate(changedProperties: PropertyValues<CommandPopover>): void {
    if (changedProperties.has('editor') && this.editor) {
      this.controller.setEditor(this.editor)
    }
    if (changedProperties.has('regex') || changedProperties.has('regexAfter')) {
      const regex = this.regex
      const regexAfter = this.regexAfter

      if (regex) {
        const rule: PredictionRule = {
          match: regex,
          matchAfter: regexAfter ?? undefined,
        }
        this.controller.setRules([rule])
      }
    }
    if (changedProperties.has('queryBuilder') && this.queryBuilder) {
      this.controller.setQueryBuilder(this.queryBuilder)
    }
  }

  /** @hidden */
  render() {
    return html`
      <prosekit-popover
        .active=${this.active}
        .reference=${this.controller.reference ?? undefined}
        .options=${this.popoverOptions}
      >
        <slot></slot>
      </prosekit-popover>
    `
  }
}
