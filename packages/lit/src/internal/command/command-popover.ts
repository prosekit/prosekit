import '../popover/popover'

import { provide } from '@lit-labs/context'
import { Editor } from '@prosekit/core'
import { PredictionRule } from '@prosekit/extensions/suggestion'
import { CSSResultGroup, LitElement, PropertyValues, html } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'

import { blockComponentStyles } from '../../styles/block-component.styles'
import { PopoverOptions } from '../popover/options'

import {
  commandPopoverContext,
  type CommandPopoverContext,
} from './command-context'
import { CommandList } from './command-list'
import { CommandPopoverController } from './command-popover-controller'
import { defaultPopoverOptions } from './command-popover-default-options'
import { QueryBuilder } from './command-types'
import { isCommandList } from './command-utils'

export { type PopoverOptions, type QueryBuilder }

export interface CommandPopoverProps {
  editor: Editor
  regex: RegExp
  regexAfter?: RegExp
  queryBuilder: QueryBuilder
  popoverOptions?: PopoverOptions
}

@customElement('prosekit-command-popover')
export class CommandPopover
  extends LitElement
  implements Partial<CommandPopoverProps>
{
  /** @hidden */
  static styles: CSSResultGroup = blockComponentStyles

  private controller = new CommandPopoverController(
    this,
    this.updateContext.bind(this),
  )

  @property({ attribute: false })
  editor?: Editor

  @property({ attribute: false })
  regex?: RegExp

  @property({ attribute: false })
  regexAfter?: RegExp

  @property({ attribute: false })
  queryBuilder?: QueryBuilder

  @property({ attribute: false })
  popoverOptions: PopoverOptions = defaultPopoverOptions

  @provide({ context: commandPopoverContext })
  @state()
  context: CommandPopoverContext = {
    active: false,
    query: '',
    handleDismiss: () => this.controller.handleDismiss?.(),
    handleSubmit: () => this.controller.handleSubmit?.(),
  }

  /** @hidden */
  @property({ attribute: false })
  onSelect?: VoidFunction

  private get list(): CommandList | null {
    return (
      this.defaultSlot
        ?.assignedElements({ flatten: true })
        ?.find(isCommandList) ?? null
    )
  }

  private updateContext(query: string, active: boolean) {
    if (this.context.query === query && this.context.active === active) {
      return
    }

    this.context = { ...this.context, query, active }
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
