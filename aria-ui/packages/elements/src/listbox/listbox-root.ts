import type { HostElement, TypedEventTarget } from '@aria-ui-v2/core'
import { defineCustomElement, defineProps, onMount, registerCustomElement, useEffect, useEventListener, type Store } from '@aria-ui-v2/core'
import { useAriaActivedescendant, useAriaDisabled, useAriaMultiselectable, useAriaOrientation } from '@aria-ui-v2/utils'

import { ListboxStore, ListboxStoreContext, type ItemFilter } from './listbox-store.ts'

export type { ItemFilter }

/**
 * A simple case-insensitive substring match filter.
 *
 * @public
 */
export const defaultItemFilter: ItemFilter = ({ value, query }) => {
  if (!query) {
    return true
  }

  return value
    .toLowerCase()
    .replaceAll(/\s/g, '')
    .includes(query.toLowerCase().replaceAll(/\s/g, ''))
}

/**
 * @public
 */
export interface ListboxRootProps {
  /**
   * The currently selected value. Only available when {@link multiple} is
   * false, or the empty string if no options are selected.
   *
   * @default ''
   */
  value: string

  /**
   * The currently selected values. Only available when {@link multiple} is
   * true.
   *
   * @default []
   */
  values: string[]

  /**
   * Whether multiple selection is enabled.
   *
   * @default false
   */
  multiple: boolean

  /**
   * Whether the component should ignore user interaction.
   *
   * @default false
   */
  disabled: boolean

  /**
   * The orientation of the listbox, affects which arrow keys are used for
   * navigation.
   *
   * @default "vertical"
   */
  orientation: 'vertical' | 'horizontal'

  /**
   * Whether keyboard navigation wraps from last to first and vice versa.
   *
   * @default false
   */
  loop: boolean

  /**
   * Whether the listbox should automatically set the focus to the first item
   * when the listbox is mounted or when the query changes.
   *
   * @default false
   */
  autoFocus: boolean

  /**
   * The query string to filter the listbox items.
   *
   * @default ""
   */
  query: string

  /**
   * The filter function to determine if an item should be shown in the
   * listbox. By default, a simple case-insensitive substring match is used.
   * You can provide a custom filter function to match against a more complex
   * pattern. You can also pass `null` to disable filtering and allow all items
   * to be shown.
   *
   * @default defaultItemFilter
   */
  filter: ItemFilter | null

  /**
   * By default, the Listbox element will listen for keydown events. You can
   * pass a different element to listen for keydown events.
   *
   * @default undefined
   */
  eventTarget: HTMLElement | TypedEventTarget<'keydown'> | undefined
}

/**
 * @internal
 */
export const ListboxRootPropsDeclaration = defineProps<ListboxRootProps>({
  value: { default: '', attribute: 'value', type: 'string' },
  values: { default: [], attribute: 'values', type: 'json' },
  multiple: { default: false, attribute: 'multiple', type: 'boolean' },
  disabled: { default: false, attribute: 'disabled', type: 'boolean' },
  orientation: { default: 'vertical', attribute: 'orientation', type: 'string' },
  loop: { default: false, attribute: 'loop', type: 'boolean' },
  autoFocus: { default: false, attribute: 'auto-focus', type: 'boolean' },
  query: { default: '', attribute: 'query', type: 'string' },
  filter: { default: defaultItemFilter, attribute: false, type: 'json' },
  eventTarget: { default: undefined, attribute: false, type: 'json' },
})

/**
 * @public
 */
export class ValueChangeEvent extends Event {
  constructor(readonly value: string) {
    super('valueChange', { bubbles: true, cancelable: true })
  }
}

/**
 * @public
 */
export class ValuesChangeEvent extends Event {
  constructor(readonly values: string[]) {
    super('valuesChange', { bubbles: true, cancelable: true })
  }
}

/**
 * @public
 */
export interface ListboxRootEvents {
  /**
   * Emitted when the selected value changes. Only available when multiple is
   * false.
   */
  valueChange: ValueChangeEvent

  /**
   * Emitted when the selected values change. Only available when multiple is
   * true.
   */
  valuesChange: ValuesChangeEvent
}

/**
 * @internal
 */
export function setupListboxRoot(
  host: HostElement,
  props: Store<ListboxRootProps>,
) {
  onMount(host, () => {
    host.role = 'listbox'
    host.tabIndex = 0
  })

  const emitSelectionChange = (values: string[]) => {
    if (props.disabled.get()) return

    if (props.multiple.get()) {
      const event = new ValuesChangeEvent(values)
      host.dispatchEvent(event)
      if (event.defaultPrevented) return
      props.values.set(values)
    } else {
      const singleValue = values[0] ?? ''
      const event = new ValueChangeEvent(singleValue)
      host.dispatchEvent(event)
      if (event.defaultPrevented) return
      props.value.set(singleValue)
    }
  }

  const store = new ListboxStore(emitSelectionChange)
  ListboxStoreContext.provide(host, store)

  useEffect(host, () => {
    if (props.multiple.get()) {
      store.selectedValues.set(props.values.get())
    } else {
      const v = props.value.get()
      store.selectedValues.set(v ? [v] : [])
    }
  })

  useEffect(host, () => {
    store.multiple.set(props.multiple.get())
  })

  useEffect(host, () => {
    store.query.set(props.query.get())
  })

  useEffect(host, () => {
    store.filter.set(props.filter.get())
  })

  useAriaMultiselectable(host, () => props.multiple.get())
  useAriaOrientation(host, () => props.orientation.get())
  useAriaDisabled(host, () => props.disabled.get())
  useAriaActivedescendant(host, () => {
    const activeVal = store.activeValue.get()
    if (activeVal == null) return undefined
    const element = store.collection.get().getElement(activeVal)
    return element?.id
  })

  const handleKeydown = (event: KeyboardEvent) => {
    if (props.disabled.get()) return

    const orientation = props.orientation.get()
    const collection = store.collection.get()
    if (collection.size() === 0) return

    const nextKey = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight'
    const prevKey = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft'

    const currentValue = store.activeValue.get()
    let nextValue: string | null = null

    switch (event.key) {
      case nextKey:
        event.preventDefault()
        nextValue = collection.next(currentValue)
        break
      case prevKey:
        event.preventDefault()
        nextValue = collection.prev(currentValue)
        break
      case 'Home':
        event.preventDefault()
        nextValue = collection.first()
        break
      case 'End':
        event.preventDefault()
        nextValue = collection.last()
        break
      case ' ':
      case 'Enter':
        event.preventDefault()
        if (currentValue != null) {
          toggleSelection(store, currentValue)
        }
        return
    }

    if (nextValue != null) {
      store.activeValue.set(nextValue)
      if (!store.multiple.get()) {
        store.emitSelectionChange([nextValue])
      }
    }
  }

  useEffect(host, () => {
    const target: HTMLElement | TypedEventTarget<'keydown'> = props.eventTarget.get() || host

    target.addEventListener('keydown', handleKeydown as EventListener)
    return () => {
      target.removeEventListener('keydown', handleKeydown as EventListener)
    }
  })

  useEventListener(host, 'focus', () => {
    if (store.activeValue.get() != null) return
    const collection = store.collection.get()
    if (collection.size() === 0) return
    const selectedValues = store.selectedValues.get()
    const firstSelected = selectedValues.find((v) => collection.getElement(v) != null)
    store.activeValue.set(firstSelected ?? collection.first())
  })

  onMount(host, () => {
    if (props.autoFocus.get()) {
      const collection = store.collection.get()
      store.activeValue.set(collection.first())
    }
  })

  useEffect(host, () => {
    props.query.get()
    if (!props.autoFocus.get()) return
    const collection = store.collection.get()
    store.activeValue.set(collection.first())
  })
}

function toggleSelection(store: ListboxStore, value: string) {
  const current = store.selectedValues.get()
  if (store.multiple.get()) {
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    store.emitSelectionChange(next)
  } else {
    store.emitSelectionChange(current.includes(value) ? [] : [value])
  }
}

/**
 * @public
 */
export class ListboxRootElement extends defineCustomElement(
  setupListboxRoot,
  ListboxRootPropsDeclaration,
) {}

let isRegistered = false

/**
 * @internal
 */
export function registerListboxRootElement(): void {
  if (isRegistered) return
  isRegistered = true
  registerCustomElement('aria-ui-listbox-root', ListboxRootElement)
}
