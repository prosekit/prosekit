import {
  createSignal,
  defineCustomElement,
  defineProps,
  onMount,
  registerCustomElement,
  useEffect,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type Store,
  type TypedEventTarget,
} from '@aria-ui/core'
import {
  defaultItemFilter,
  setupListboxRoot,
  type ItemFilter,
  type ListboxRootEvents,
  type ListboxRootProps,
} from '@aria-ui/elements/listbox'
import { once } from '@ocavue/utils'
import { defineDOMEventHandler, withPriority, type Editor, type Priority } from '@prosekit/core'

import { useEditorExtension } from '../../hooks/use-editor-extension.ts'

import { autocompleteStoreContext } from './context.ts'

export interface AutocompleteListProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null

  /**
   * The filter function to determine if an item should be shown in the
   * listbox.
   *
   * @default defaultItemFilter
   */
  filter: ItemFilter | null
}

/** @internal */
export const AutocompleteListPropsDeclaration: PropsDeclaration<AutocompleteListProps> = /* @__PURE__ */ defineProps<AutocompleteListProps>(
  {
    editor: { default: null, attribute: false, type: 'json' },
    filter: { default: defaultItemFilter, attribute: false, type: 'json' },
  },
)

/**
 * @public
 */
export interface AutocompleteListEvents extends ListboxRootEvents {}

/**
 * @internal
 */
export function setupAutocompleteList(
  host: HostElement,
  props: Store<AutocompleteListProps>,
): void {
  const getAutocompleteStore = autocompleteStoreContext.consume(host)

  const getOpen = () => getAutocompleteStore()?.open.get() ?? false
  const keydownTarget = useKeyDownTarget(host, getOpen, props.editor.get)

  // Create a full ListboxRootProps store with defaults
  const listboxStore: Store<ListboxRootProps> = {
    value: createSignal(''),
    values: createSignal<string[]>([]),
    multiple: createSignal(false),
    disabled: createSignal(false),
    orientation: createSignal<'vertical' | 'horizontal'>('vertical'),
    loop: createSignal(false),
    autoFocus: createSignal(false),
    query: createSignal(''),
    filter: props.filter,
    eventTarget: createSignal<HTMLElement | TypedEventTarget<'keydown'> | undefined>(keydownTarget),
  }

  setupListboxRoot(host, listboxStore)

  // Handle value change → submit
  onMount(host, () => {
    host.addEventListener('valueChange', () => {
      const store = getAutocompleteStore()
      store?.onSubmit.get()?.()
    })
  })

  // Sync query from autocomplete store
  useEffect(host, () => {
    const store = getAutocompleteStore()
    if (!store) return
    listboxStore.query.set(store.query.get())
  })

  // Reset when closed
  useEffect(host, () => {
    const store = getAutocompleteStore()
    if (!store?.open.get()) {
      listboxStore.value.set('')
      store?.query.set('')
    }
  })

  // Reset the focused item when the popover is open
  useEffect(host, () => {
    const store = getAutocompleteStore()
    if (!store?.open.get()) {
      listboxStore.autoFocus.set(false)
    } else {
      let canceled = false

      requestAnimationFrame(() => {
        if (canceled) return
        listboxStore.autoFocus.set(true)
      })

      return () => {
        canceled = true
      }
    }
  })

  // The autocomplete list should not be focusable because the editor will get
  // the focus during typing.
  onMount(host, () => {
    host.tabIndex = -1
  })
}

function useKeyDownTarget(
  host: HostElement,
  getOpen: () => boolean,
  getEditor: () => Editor | null,
): TypedEventTarget<'keydown'> {
  const keydownHandlers: ((event: KeyboardEvent) => void)[] = []

  const extension = defineDOMEventHandler(
    'keydown',
    (view, event): boolean => {
      if (view.composing || event.defaultPrevented || !getOpen()) {
        return false
      }
      keydownHandlers.forEach((handler) => handler(event))
      return event.defaultPrevented
    },
  )

  const prioritizedExtension = withPriority(extension, 4 satisfies typeof Priority.highest)
  useEditorExtension(host, getEditor, prioritizedExtension)

  return {
    addEventListener: (type, listener) => {
      if (type === 'keydown') {
        keydownHandlers.push(listener)
      }
    },
    removeEventListener: (type, listener) => {
      if (type === 'keydown') {
        const index = keydownHandlers.indexOf(listener)
        if (index !== -1) {
          keydownHandlers.splice(index, 1)
        }
      }
    },
  }
}

const AutocompleteListElementBase: HostElementConstructor<AutocompleteListProps> = defineCustomElement(
  setupAutocompleteList,
  AutocompleteListPropsDeclaration,
)

/**
 * @public
 */
export class AutocompleteListElement extends AutocompleteListElementBase {}

/** @internal */
export const registerAutocompleteListElement: VoidFunction = /* @__PURE__ */ once(() => {
  registerCustomElement('prosekit-autocomplete-list', AutocompleteListElement)
})
