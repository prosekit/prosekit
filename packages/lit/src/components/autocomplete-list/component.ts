import { consume, provide } from '@lit/context'
import { Editor } from '@prosekit/core'
import { type PropertyValues } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import { ListManager } from '../../manager/list-manager'
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
import { LightElement } from '../block-element'

import { commandListContext, type AutocompleteListContext } from './context'
import { AutocompleteListController } from './controller'

export const propNames = ['editor'] as const

export interface AutocompleteListProps {
  editor: Editor
}

@customElement('prosekit-autocomplete-list')
export class AutocompleteList
  extends LightElement
  implements Partial<AutocompleteListProps>
{
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
  }

  connectedCallback(): void {
    super.connectedCallback()

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
    return Array.from(
      this.querySelectorAll('prosekit-autocomplete-item'),
    ).filter(isAutocompleteItem)
  }

  public selectFirstItem() {
    this.listManager.selectFirstItem()
  }

  private updateValue(selectedValue: string) {
    if (this.context.selectedValue === selectedValue) {
      return
    }
    this.context = { ...this.context, selectedValue }
  }

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
}
