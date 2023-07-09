/**
 * @module @prosekit/lit/elements/menu
 */

import { Editor, ProseKitError, addKeymap } from '@prosekit/core'
import { CSSResultGroup, LitElement, PropertyValueMap, html } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'

import { blockComponentStyles } from '../styles/block-component.styles'
import { isMenuItem } from '../utils/is-menu-item'
import { isVisibleElement } from '../utils/visibility'

import { MenuItem } from './menu-item'

@customElement('prosekit-menu')
export class Menu extends LitElement {
  /** @hidden */
  constructor() {
    super()
  }

  /** @hidden */
  static styles: CSSResultGroup = blockComponentStyles

  @property({ attribute: false })
  editor?: Editor

  /** @hidden */
  @state()
  focusedItem?: MenuItem

  /** @hidden */
  @query('slot') defaultSlot?: HTMLSlotElement

  /** @hidden */
  private cleanup: VoidFunction[] = []

  /** @hidden */
  protected firstUpdated(): void {
    if (!this.editor) {
      throw new ProseKitError('Property editor is required')
    }

    const extension = addKeymap({
      ArrowUp: () => this.handleArrowUp(),
      ArrowDown: () => this.handleArrowDown(),
      Escape: () => this.handleEscape(),
      Enter: () => this.handleEnter(),
    })

    this.cleanup.push(this.editor.use(extension))
  }

  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>,
  ): void {
    this.ensureFocusedItem()
  }

  /** @hidden */
  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.cleanup.forEach((fn) => fn())
  }

  ensureFocusedItem() {
    const items = this.queryVisibleMenuItems()
    if (this.focusedItem && items.includes(this.focusedItem)) {
      return
    }
    this.focusItem(items[0])
  }

  /** @hidden */
  private handleArrowUp(): boolean {
    const items = this.queryVisibleMenuItems()
    let prevIndex = this.focusedItem ? items.indexOf(this.focusedItem) : 0
    if (prevIndex === -1) {
      prevIndex = 0
    }
    const nextIndex = (prevIndex + items.length - 1) % items.length
    this.focusItem(items[nextIndex])
    return true
  }

  /** @hidden */
  private handleArrowDown(): boolean {
    const items = this.queryVisibleMenuItems()
    const prevIndex = this.focusedItem ? items.indexOf(this.focusedItem) : -1
    const nextIndex = (prevIndex + items.length + 1) % items.length
    this.focusItem(items[nextIndex])
    return true
  }

  /** @hidden */
  private handleEscape(): boolean {
    const event = new CustomEvent('menu-dismiss', {
      bubbles: true,
      composed: false,
    })
    this.dispatchEvent(event)
    this.blurItem()
    return true
  }

  /** @hidden */
  private handleMouseOver(event: MouseEvent): boolean {
    const target = event.target as Element | null
    if (isMenuItem(target) && isVisibleElement(target)) {
      this.focusItem(target)
    }
    return true
  }

  /** @hidden */
  private handleEnter(): boolean {
    if (this.focusedItem) {
      this.handleSelect(this.focusedItem)
      return true
    }
    return false
  }

  /** @hidden */
  private handleClick(event: MouseEvent): void {
    const target = event.target as Element | null
    if (isMenuItem(target) && isVisibleElement(target)) {
      this.handleSelect(target)
    }
  }

  /** @hidden */
  private handleSelect(menuItem: MenuItem) {
    menuItem.onSelect?.()
    const event = new CustomEvent('menu-select', {
      bubbles: true,
      composed: false,
    })
    this.dispatchEvent(event)
    this.blurItem()
  }

  /** @hidden */
  private focusItem(item?: MenuItem) {
    this.blurItem()

    if (!item) {
      return
    }

    item.focused = true
    this.focusedItem = item
  }

  /** @hidden */
  private blurItem() {
    if (this.focusedItem) {
      this.focusedItem.focused = false
      this.focusedItem = undefined
    }
  }

  /** @hidden */
  private queryAllMenuItems(): MenuItem[] {
    return (
      this.defaultSlot
        ?.assignedElements({ flatten: true })
        ?.filter(isMenuItem) ?? []
    )
  }

  /** @hidden */
  private queryVisibleMenuItems() {
    return this.queryAllMenuItems().filter(isVisibleElement)
  }

  /** @hidden */
  render() {
    return html`
      <div
        role="menu"
        @mouseover=${this.handleMouseOver.bind(this)}
        @click=${this.handleClick.bind(this)}
      >
        <slot></slot>
      </div>
    `
  }
}
