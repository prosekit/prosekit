import { consume, provide } from '@lit-labs/context'
import { Editor } from '@prosekit/core'
import { LitElement, html, type CSSResultGroup, type PropertyValues } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'

import { ListManager } from '../../manager/list-manager'
import { blockComponentStyles } from '../../styles/block-component.styles'
import { commandScore } from '../../utils/command-score'
import { AutocompleteItem } from '../autocomplete-item/component'
import {
  isAutocompleteItem,
  queryClosestAutocompleteItem,
} from '../autocomplete-item/helpers'
import {
  commandPopoverContext,
  type AutocompletePopoverContext,
} from '../autocomplete-popover/context'

import { commandListContext, type AutocompleteListContext } from './context'
import { AutocompleteListController } from './controller'

export const propNames = ['editor'] as const

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
  private listManager = new ListManager<AutocompleteItem>({
    getItems: () => this.items,
    getSelectedValue: () => this.context.selectedValue,
    setSelectedValue: (value) => this.updateValue(value),
    getItemValue: (item) => item.content,
    queryClosestItem: queryClosestAutocompleteItem,
    getActive: () => this.active,
    onDismiss: () => this.popoverContext?.handleDismiss?.(),
    onSelect: (item) => {
      this.popoverContext?.handleSubmit?.()
      item?.onSelect?.()
    },
  })

  /** @hidden */
  private controller = new AutocompleteListController(this, {
    ArrowUp: () => this.listManager.handleArrowUp(),
    ArrowDown: () => this.listManager.handleArrowDown(),
    Escape: () => this.listManager.handleEscape(),
    Enter: () => this.listManager.handleEnter(),
  })

  private get active(): boolean {
    return this.popoverContext?.active ?? false
  }

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
    this.listManager.selectFirstItem()

    this.addEventListener('mousemove', (event) =>
      this.listManager.handleMouseMove(event),
    )
    this.addEventListener('mouseover', (event) =>
      this.listManager.handleMouseOver(event),
    )
    this.addEventListener('mousedown', (event) =>
      this.listManager.handleMouseDown(event),
    )
    this.addEventListener('click', (event) =>
      this.listManager.handleClick(event),
    )
  }

  private get items(): AutocompleteItem[] {
    return (
      this.defaultSlot
        ?.assignedElements({ flatten: true })
        ?.filter(isAutocompleteItem) ?? []
    )
  }

  public selectFirstItem() {
    this.listManager.selectFirstItem()
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

  /** @hidden */
  render() {
    return html`
      <slot></slot>
    `
  }
}
