import { ContextConsumer, ContextProvider } from '@lit/context'
import { Editor } from '@prosekit/core'
import { type PropertyDeclarations, type PropertyValues } from 'lit'

import { ListManager } from '../../manager/list-manager'
import { commandScore } from '../../utils/command-score'
import { defineCustomElement } from '../../utils/define-custom-element'
import { AutocompleteItem } from '../autocomplete-item/component'
import {
  isAutocompleteItem,
  queryClosestAutocompleteItem,
} from '../autocomplete-item/helpers'
import { commandPopoverContext } from '../autocomplete-popover/context'
import { LightElement } from '../block-element'

import { commandListContext } from './context'
import { AutocompleteListController } from './controller'

export const propNames = ['editor'] as const

export interface AutocompleteListProps {
  editor: Editor
}

export class AutocompleteList
  extends LightElement
  implements Partial<AutocompleteListProps>
{
  /** @hidden */
  private listManager = new ListManager<AutocompleteItem>({
    getItems: () => this.items,
    getSelectedValue: () => this.context.value.selectedValue,
    setSelectedValue: (value, reason) => this.updateValue(value, reason),
    getItemValue: (item) => item.content,
    queryClosestItem: queryClosestAutocompleteItem,
    getActive: () => this.active,
    onDismiss: () => this.popoverContext.value?.handleDismiss?.(),
    onSelect: (item) => {
      this.popoverContext.value?.handleSubmit?.()
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

  private popoverContext = new ContextConsumer(this, {
    context: commandPopoverContext,
    subscribe: true,
  })

  private get active(): boolean {
    return this.popoverContext.value?.active ?? false
  }

  static properties = {
    editor: { attribute: false },
  } satisfies PropertyDeclarations

  editor?: Editor

  private context = new ContextProvider(this, {
    context: commandListContext,
    initialValue: {
      scores: new Map(),
      selectedValue: '',
      selectedReason: 'keyboard',
    },
  })

  connectedCallback(): void {
    super.connectedCallback()

    this.listManager.selectFirstItem()

    this.addEventListener('mousemove', (event) => {
      this.listManager.handleMouseMove(event)
    })
    this.addEventListener('mouseover', (event) => {
      this.listManager.handleMouseOver(event)
    })
    this.addEventListener('mousedown', (event) => {
      this.listManager.handleMouseDown(event)
    })
    this.addEventListener('click', (event) => {
      this.listManager.handleClick(event)
    })
  }

  private get items(): AutocompleteItem[] {
    return Array.from(
      this.querySelectorAll('prosekit-autocomplete-item'),
    ).filter(isAutocompleteItem)
  }

  public selectFirstItem() {
    this.listManager.selectFirstItem()
  }

  private updateValue(
    selectedValue: string,
    selectedReason: 'mouse' | 'keyboard',
  ) {
    const context = this.context.value
    if (context.selectedValue === selectedValue) {
      return
    }
    this.context.setValue({ ...context, selectedValue, selectedReason })
  }

  /** @hidden */
  willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('editor') && this.editor) {
      this.controller.setEditor(this.editor)
    }

    const query = this.popoverContext.value?.query ?? ''

    const scores = new Map(
      this.items.map((item) => {
        const content = item.content
        const score = commandScore(content, query)
        return [content, score]
      }),
    )
    const context = this.context.value
    this.context.setValue({ ...context, scores })
  }
}

defineCustomElement('prosekit-autocomplete-list', AutocompleteList)
