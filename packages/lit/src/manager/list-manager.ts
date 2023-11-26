export class ListManager<Item extends { hidden: boolean } & HTMLElement> {
  private lastMouseMoveTime = 0

  private getItems: () => Item[]
  private getSelectedValue: () => string
  private setSelectedValue: (
    value: string,
    reason: 'mouse' | 'keyboard',
  ) => void
  private getItemValue: (item: Item) => string
  private queryClosestItem: (element: HTMLElement) => Item | null
  private getActive: () => boolean
  private onDismiss: () => void
  private onSelect: (item?: Item | null) => void

  constructor(options: {
    getItems: () => Item[]
    getSelectedValue: () => string
    setSelectedValue: (value: string, reason: 'mouse' | 'keyboard') => void
    getItemValue: (item: Item) => string
    queryClosestItem: (element: HTMLElement) => Item | null
    getActive: () => boolean
    onDismiss: () => void
    onSelect: (item?: Item | null) => void
  }) {
    this.getItems = options.getItems
    this.getSelectedValue = options.getSelectedValue
    this.setSelectedValue = options.setSelectedValue
    this.getItemValue = options.getItemValue
    this.queryClosestItem = options.queryClosestItem
    this.getActive = options.getActive
    this.onDismiss = options.onDismiss
    this.onSelect = options.onSelect
  }

  get items(): Item[] {
    return this.getItems()
  }

  get availableItems(): Item[] {
    return this.items?.filter((item) => !item.hidden) ?? []
  }

  get firstItem(): Item | null {
    return this.availableItems[0] ?? null
  }

  get selectedItem(): Item | null {
    return (
      this.availableItems.find(
        (item) => this.getItemValue(item) === this.getSelectedValue(),
      ) ?? null
    )
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
      this.setSelectedValue(this.getItemValue(items[nextIndex]), 'keyboard')
    }
  }

  private handleSelect(item: Item, reason: 'mouse' | 'keyboard') {
    this.setSelectedValue(this.getItemValue(item), reason)
  }

  public selectFirstItem() {
    const item = this.firstItem
    const value = item ? this.getItemValue(item) : ''
    this.setSelectedValue(value, 'keyboard')
  }

  handleMouseMove(_event: MouseEvent): void {
    this.lastMouseMoveTime = Date.now()
  }

  handleMouseOver(event: MouseEvent): void {
    // Only trigger the mouseover event if the mouse is moving. This prevents
    // the unexpected behavior when the menu itself is scrolling and the mouse
    // is not moving.
    if (this.lastMouseMoveTime + 500 < Date.now()) {
      return
    }

    const target = event.target as HTMLElement | null
    const item = target && this.queryClosestItem(target)
    if (item) {
      this.setSelectedValue(this.getItemValue(item), 'mouse')
    }
  }

  handleMouseDown(event: MouseEvent): void {
    event.preventDefault()
  }

  handleClick(event: MouseEvent): void {
    event.preventDefault()

    const target = event.target as HTMLElement | null
    const item = target && this.queryClosestItem(target)
    if (item) {
      this.handleSelect(item, 'mouse')
      this.onSelect(item)
    }
  }

  handleArrowUp(): boolean {
    if (!this.getActive()) return false

    this.updateSelectedByChange(-1)
    return true
  }

  handleArrowDown(): boolean {
    if (!this.getActive()) return false

    this.updateSelectedByChange(+1)
    return true
  }

  handleEscape(): boolean {
    if (!this.getActive()) return false

    this.onDismiss()
    return true
  }

  handleEnter(): boolean {
    if (!this.getActive()) return false

    this.onSelect(this.selectedItem)
    return true
  }
}
