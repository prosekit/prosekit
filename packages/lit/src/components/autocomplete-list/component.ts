import { consume, provide } from '@lit-labs/context'
import { Editor } from '@prosekit/core'
import { type CSSResultGroup, html, LitElement, type PropertyValues } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'

import { blockComponentStyles } from '../../styles/block-component.styles'
import { commandScore } from '../../utils/command-score'
import { AutocompleteItem } from '../autocomplete-item/component'
import { isAutocompleteItem } from '../autocomplete-item/helpers'
import {
  commandPopoverContext,
  type AutocompletePopoverContext,
} from '../autocomplete-popover/context'

import { type AutocompleteListContext, commandListContext } from './context'
import { AutocompleteListController } from './controller'

export interface AutocompleteListProps {
  editor: Editor
}

@customElement('prosekit-autocomplete-list')
export class AutocompleteList
  extends LitElement
  implements Partial<AutocompleteListProps>
{
  /** @hidden */
  static styles: CSSResultGroup = blockComponentStyles

  /** @hidden */
  private controller = new AutocompleteListController(this, {
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

  private lastMouseMoveTime = 0

  @property({ attribute: false })
  editor?: Editor

  @consume({ context: commandPopoverContext, subscribe: true })
  @state()
  popoverContext: AutocompletePopoverContext | null = null

  @provide({ context: commandListContext })
  @state()
  context: AutocompleteListContext = {
    scores: new Map(),
    selectedValue: '',
    registerValue: (value) => this.registerValue(value),
  }

  protected firstUpdated(): void {
    this.selectFirstItem()
  }

  private get items(): AutocompleteItem[] {
    return (
      this.defaultSlot
        ?.assignedElements({ flatten: true })
        ?.filter(isAutocompleteItem) ?? []
    )
  }

  private get availableItems(): AutocompleteItem[] {
    return this.items?.filter((item) => !item.hidden) ?? []
  }

  private get firstItem(): AutocompleteItem | null {
    return this.availableItems[0] ?? null
  }

  private get selectedItem(): AutocompleteItem | null {
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

  private handleMouseMove() {
    this.lastMouseMoveTime = Date.now()
  }

  private handleMouseOver(event: MouseEvent) {
    // Only trigger the mouseover event if the mouse is moving. This prevents
    // the unexpected behavior when the menu itself is scrolling and the mouse
    // is not moving.
    if (this.lastMouseMoveTime + 500 < Date.now()) {
      return
    }

    const target = event.target as HTMLElement | null
    if (isAutocompleteItem(target)) {
      this.updateValue(target.content)
    }
  }

  private handleClick(event: MouseEvent) {
    event.preventDefault()
    const target = event.target as HTMLElement | null
    const item = target?.closest('prosekit-autocomplete-item')
    if (item && isAutocompleteItem(item)) {
      this.handleSelect(item)
    }
  }

  private handleMouseDown(event: MouseEvent) {
    event.preventDefault()
  }

  private handleSelect(item?: AutocompleteItem | null) {
    this.popoverContext?.handleSubmit?.()
    item?.onSelect?.()
  }

  /** @hidden */
  render() {
    return html`
      <div
        role="listbox"
        aria-label="Suggestions"
        @mousemove=${this.handleMouseMove.bind(this)}
        @mouseover=${this.handleMouseOver.bind(this)}
        @click=${this.handleClick.bind(this)}
        @mousedown=${this.handleMouseDown.bind(this)}
      >
        <slot></slot>
      </div>
    `
  }
}
