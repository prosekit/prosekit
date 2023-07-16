/**
 * @module @prosekit/lit/components/command-item
 */

import { consume, provide } from '@lit-labs/context'
import { Editor, Keymap } from '@prosekit/core'
import { CSSResultGroup, html, LitElement, PropertyValues } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'

import { commandScore } from '../internal/command-score'
import { blockComponentStyles } from '../styles/block-component.styles'

import {
  commandPopoverContext,
  type CommandPopoverContext,
} from './command-context'
import { CommandItem } from './command-item'
import { CommandListContext, commandListContext } from './command-list-context'
import { CommandListController } from './command-list-controller'
import { QueryBuilder } from './command-types'
import { isCommandItem } from './command-utils'

export { type QueryBuilder }

@customElement('prosekit-command-list')
export class CommandList extends LitElement {
  /** @hidden */
  static styles: CSSResultGroup = blockComponentStyles

  private controller = new CommandListController(this, {
    ArrowUp: () => {
      this.updateSelectedByChange(-1)
      return true
    },
    ArrowDown: () => {
      this.updateSelectedByChange(+1)
      return true
    },
    Escape: () => {
      this.popoverContext?.handleDismiss?.()
      return true
    },
    Enter: () => {
      this.popoverContext?.handleSubmit?.()
      this.selectedItem?.onSelect?.()
      return true
    },
  })

  @property({ attribute: false })
  editor: Editor | null = null

  @consume({ context: commandPopoverContext, subscribe: true })
  @state()
  popoverContext: CommandPopoverContext | null = null

  @provide({ context: commandListContext })
  @state()
  context2: CommandListContext = {
    scores: new Map(),
    selectedValue: '',
    registerValue: (value) => this.registerValue(value),
  }

  /** @hidden */
  @property({ attribute: false })
  onSelect?: VoidFunction

  /** @hidden */
  private cleanup: VoidFunction[] = []

  protected firstUpdated(): void {
    this.selectFirstItem()
  }

  private get items(): CommandItem[] {
    return (
      this.defaultSlot
        ?.assignedElements({ flatten: true })
        ?.filter(isCommandItem) ?? []
    )
  }

  private get availableItems(): CommandItem[] {
    return this.items?.filter((item) => !item.hidden) ?? []
  }

  private get firstItem(): CommandItem | null {
    return this.availableItems[0] ?? null
  }

  private get selectedItem(): CommandItem | null {
    return (
      this.availableItems.find(
        (item) => item.content === this.context2.selectedValue,
      ) ?? null
    )
  }

  public selectFirstItem() {
    const selected = this.firstItem?.content ?? ''
    this.updateValue(selected)
  }

  private updateValue(selectedValue: string) {
    if (this.context2.selectedValue === selectedValue) return
    this.context2 = { ...this.context2, selectedValue }
  }

  private registerValue(value: string) {
    if (!this.context2.scores.has(value)) {
      this.context2.scores.set(value, 0)
      this.requestUpdate()
    }

    return () => {
      this.context2.scores.delete(value)
    }
  }

  /** @hidden */
  @query('slot') defaultSlot?: HTMLSlotElement

  /** @hidden */
  willUpdate(changedProperties: PropertyValues<CommandList>): void {
    if (changedProperties.has('editor') && this.editor) {
      this.controller.setEditor(this.editor)
    }
  }

  updated() {
    const query = this.popoverContext?.query ?? ''

    for (const item of this.items) {
      const content = item.content
      const score = commandScore(content, query)
      this.context2.scores.set(content, score)
    }
  }

  private updateSelectedByChange(change: 1 | -1): void {
    const items = this.availableItems
    if (items.length === 0) {
      return
    }

    const selectedItem = this.selectedItem
    const selectedIndex = selectedItem ? items.indexOf(selectedItem) : -1

    let nextIndex = selectedIndex + change
    if (nextIndex < 0) {
      nextIndex = 0
    } else if (nextIndex >= items.length) {
      nextIndex = items.length - 1
    }
    if (selectedIndex !== nextIndex) {
      this.updateValue(items[nextIndex].content)
    }
  }

  private handleMouseOver(event: MouseEvent) {
    const target = event.target as HTMLElement | null
    if (isCommandItem(target)) {
      this.updateValue(target.content)
    }
  }

  /** @hidden */
  render() {
    return html`
      <div
        role="listbox"
        aria-label="Suggestions"
        @mouseover=${this.handleMouseOver.bind(this)}
      >
        <slot></slot>
      </div>
    `
  }
}
