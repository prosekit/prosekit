import {
  defineCustomElement,
  defineProps,
  onMount,
  registerCustomElement,
  useEffect,
  useEventListener,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type Store,
  type TypedEventTarget,
} from '@aria-ui-v2/core'
import { closeMenuTree, MenuStoreContext, type MenuStore } from '@aria-ui-v2/elements/menu'
import { useElementId } from '@aria-ui-v2/utils'
import { once } from '@ocavue/utils'

import { tableHandleStoreContext } from './store.ts'
import { TableHandlePopoverItemSelectEvent } from './table-handle-popover-item.ts'

export interface TableHandlePopoverPopupProps {
  /**
   * By default, the popup element will listen for keydown events.
   * You can pass a different element to listen for keydown events.
   *
   * @default null
   */
  eventTarget: HTMLElement | TypedEventTarget<'keydown'> | null
}

/** @internal */
export const TableHandlePopoverPopupPropsDeclaration: PropsDeclaration<TableHandlePopoverPopupProps> = defineProps<TableHandlePopoverPopupProps>({
  eventTarget: { default: null, attribute: false, type: 'json' },
})

/**
 * @internal
 */
export function setupTableHandlePopoverPopup(
  host: HostElement,
  props: Store<TableHandlePopoverPopupProps>,
): void {
  const getTableHandleStore = tableHandleStoreContext.consume(host)
  const getOpen = () => !!getTableHandleStore()?.getHoveringCell()
  const keyDownTarget = useKeyDownTarget(host, getOpen)
  props.eventTarget.set(keyDownTarget)

  const getStore = MenuStoreContext.consume(host)
  const id = useElementId(host)

  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    store.setPopupId(id)
  })

  onMount(host, () => {
    host.role = 'menu'
    host.tabIndex = 0
  })

  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    host.dataset.state = store.getOpen() ? 'open' : 'closed'
  })

  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    const activeValue = store.activeValue.get()
    if (activeValue == null) {
      host.removeAttribute('aria-activedescendant')
      return
    }
    const element = store.collection.get().getElement(activeValue)
    if (element?.id) {
      host.setAttribute('aria-activedescendant', element.id)
    } else {
      host.removeAttribute('aria-activedescendant')
    }
  })

  useEffect(host, () => {
    const store = getStore()
    if (!store) return
    const open = store.getOpen()

    if (open) {
      resetTypeahead()
      requestAnimationFrame(() => {
        host.focus()
        const collection = store.collection.get()
        store.activeValue.set(collection.first())
      })
    } else {
      store.activeValue.set(null)
    }
  })

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.isComposing || event.defaultPrevented) return

    const store = getStore()
    if (!store) return
    if (!store.getOpen()) return

    const collection = store.collection.get()
    if (collection.size() === 0) return

    const currentValue = store.activeValue.get()
    let nextValue: string | null = null

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        event.stopPropagation()
        nextValue = collection.next(currentValue)
        break

      case 'ArrowUp':
        event.preventDefault()
        event.stopPropagation()
        nextValue = collection.prev(currentValue)
        break

      case 'Home':
        event.preventDefault()
        event.stopPropagation()
        nextValue = collection.first()
        break

      case 'End':
        event.preventDefault()
        event.stopPropagation()
        nextValue = collection.last()
        break

      case 'Enter':
      case ' ':
        event.preventDefault()
        event.stopPropagation()
        if (currentValue != null) {
          activateItem(store, currentValue)
        }
        return

      case 'Escape':
        event.preventDefault()
        event.stopPropagation()
        store.emitOpenChange(false)
        return

      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          event.stopPropagation()
          handleTypeahead(event.key, store)
        }
        return
    }

    if (nextValue != null) {
      store.activeValue.set(nextValue)
    }
  }

  useEffect(host, () => {
    const target: HTMLElement | TypedEventTarget<'keydown'> = props.eventTarget.get() || host

    target.addEventListener('keydown', handleKeydown as EventListener)
    return () => {
      target.removeEventListener('keydown', handleKeydown as EventListener)
    }
  })

  useEventListener(host, 'focusout', (event: FocusEvent) => {
    const store = getStore()
    if (!store) return
    if (!store.getOpen()) return

    const relatedTarget = event.relatedTarget as Node | null
    const menuRoot = host.closest('prosekit-table-handle-row-root, prosekit-table-handle-column-root')
    if (menuRoot && relatedTarget && menuRoot.contains(relatedTarget)) return

    closeMenuTree(store)
  })
}

let typeaheadBuffer = ''
let typeaheadTimer: ReturnType<typeof setTimeout> | null = null
const TYPEAHEAD_TIMEOUT = 500

function resetTypeahead() {
  typeaheadBuffer = ''
  if (typeaheadTimer) {
    clearTimeout(typeaheadTimer)
    typeaheadTimer = null
  }
}

function handleTypeahead(char: string, store: MenuStore) {
  if (typeaheadTimer) clearTimeout(typeaheadTimer)

  typeaheadBuffer += char.toLowerCase()
  typeaheadTimer = setTimeout(() => {
    typeaheadBuffer = ''
  }, TYPEAHEAD_TIMEOUT)

  const collection = store.collection.get()
  const values = collection.getValues()

  for (const value of values) {
    if (value.toLowerCase().startsWith(typeaheadBuffer)) {
      store.activeValue.set(value)
      break
    }
  }
}

function activateItem(store: MenuStore, value: string) {
  const element = store.collection.get().getElement(value)
  if (!element) return

  const selectEvent = new TableHandlePopoverItemSelectEvent()
  element.dispatchEvent(selectEvent)

  if (!selectEvent.defaultPrevented) {
    closeMenuTree(store)
  }
}

function useKeyDownTarget(
  element: HostElement,
  getOpen: () => boolean,
): TypedEventTarget<'keydown'> {
  const keydownHandlers: Array<(event: KeyboardEvent) => void> = []

  useEffect(element, () => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.isComposing || event.defaultPrevented || !getOpen()) {
        return
      }
      keydownHandlers.forEach((handler) => handler(event))
    }

    document.addEventListener('keydown', handleKeydown)

    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  })

  return {
    addEventListener: (type: string, listener: (event: KeyboardEvent) => void) => {
      if (type === 'keydown') {
        keydownHandlers.push(listener)
      }
    },
    removeEventListener: (type: string, listener: (event: KeyboardEvent) => void) => {
      if (type === 'keydown') {
        const index = keydownHandlers.indexOf(listener)
        if (index !== -1) {
          keydownHandlers.splice(index, 1)
        }
      }
    },
  }
}

const TableHandlePopoverPopupElementBase: HostElementConstructor<TableHandlePopoverPopupProps> = defineCustomElement(
  setupTableHandlePopoverPopup,
  TableHandlePopoverPopupPropsDeclaration,
)

/**
 * @public
 */
export class TableHandlePopoverPopupElement extends TableHandlePopoverPopupElementBase {}

/**
 * @internal
 */
export const registerTableHandlePopoverPopupElement: VoidFunction = once(() => {
  registerCustomElement('prosekit-table-handle-popover-popup', TableHandlePopoverPopupElement)
})
