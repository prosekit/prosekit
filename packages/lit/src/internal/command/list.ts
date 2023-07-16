import { consume, provide } from '@lit-labs/context'
import { Editor } from '@prosekit/core'
import { type CSSResultGroup, html, LitElement, type PropertyValues } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'

import { blockComponentStyles } from '../../styles/block-component.styles'
import { commandScore } from '../command-score'

import { CommandItem } from './item'
import { type CommandListContext, commandListContext } from './list-context'
import { CommandListController } from './list-controller'
import {
  commandPopoverContext,
  type CommandPopoverContext,
} from './popover-context'
import { isCommandItem } from './utils'

export interface CommandListProps {
  editor: Editor
}

@customElement('prosekit-command-list')
export class CommandList
  extends LitElement
  implements Partial<CommandListProps>
{
  /** @hidden */
  static styles: CSSResultGroup = blockComponentStyles

  private controller = new CommandListController(this, {
    ArrowUp: () => {
      if (!this.active) return false

      this.updateSelectedByChange(-1)
      return true
    },
    ArrowDown: () => {
      if (!this.active) return false

      this.updateSelectedByChange(+1)
      return true
    },
    Escape: () => {
      if (!this.active) return false

      this.popoverContext?.handleDismiss?.()
      return true
    },
    Enter: () => {
      if (!this.active) return false

      this.handleSelect(this.selectedItem)
      return true
    },
  })

  private get active(): boolean {
    return this.popoverContext?.active ?? false
  }

  @property({ attribute: false })
  editor?: Editor

  @consume({ context: commandPopoverContext, subscribe: true })
  @state()
  popoverContext: CommandPopoverContext | null = null

  @provide({ context: commandListContext })
  @state()
  context: CommandListContext = {
    scores: new Map(),
    selectedValue: '',
    registerValue: (value) => this.registerValue(value),
  }

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
        (item) => item.content === this.context.selectedValue,
      ) ?? null
    )
  }

  public selectFirstItem() {
    const selected = this.firstItem?.content ?? ''
    this.updateValue(selected)
  }

  private updateValue(selectedValue: string) {
    if (this.context.selectedValue === selectedValue) return
    this.context = { ...this.context, selectedValue }
  }

  private registerValue(value: string) {
    if (!this.context.scores.has(value)) {
      this.context.scores.set(value, 0)
      this.requestUpdate()
    }

    return () => {
      this.context.scores.delete(value)
    }
  }

  /** @hidden */
  @query('slot') defaultSlot?: HTMLSlotElement

  /** @hidden */
  willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('editor') && this.editor) {
      this.controller.setEditor(this.editor)
    }

    const query = this.popoverContext?.query ?? ''

    const scores = new Map(
      this.items.map((item) => {
        const content = item.content
        const score = commandScore(content, query)
        return [content, score]
      }),
    )

    this.context = { ...this.context, scores }
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

  private handleClick(event: MouseEvent) {
    event.preventDefault()
    const target = event.target as HTMLElement | null
    const item = target?.closest('prosekit-command-item')
    if (item && isCommandItem(item)) {
      this.handleSelect(item)
    }
  }

  private handleMouseDown(event: MouseEvent) {
    event.preventDefault()
  }

  private handleSelect(item?: CommandItem | null) {
    this.popoverContext?.handleSubmit?.()
    item?.onSelect?.()
  }

  /** @hidden */
  render() {
    return html`
      <div
        role="listbox"
        aria-label="Suggestions"
        @mouseover=${this.handleMouseOver.bind(this)}
        @click=${this.handleClick.bind(this)}
        @mousedown=${this.handleMouseDown.bind(this)}
      >
        <slot></slot>
      </div>
    `
  }
}
