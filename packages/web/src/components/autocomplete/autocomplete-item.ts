import {
  defineCustomElement,
  defineProps,
  registerCustomElement,
  useEffect,
  useEventListener,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type Store,
} from '@aria-ui/core'
import { setupListboxItem, type ListboxItemProps } from '@aria-ui/elements/listbox'
import { once } from '@ocavue/utils'

import { autocompleteStoreContext } from './context.ts'

export interface AutocompleteItemProps extends ListboxItemProps {
  /**
   * The value of the item, which will be matched against the query.
   *
   * If not provided, the value is the item's text content.
   *
   * @default ""
   */
  value: string
}

/** @internal */
export const AutocompleteItemPropsDeclaration: PropsDeclaration<AutocompleteItemProps> = /* @__PURE__ */ defineProps<AutocompleteItemProps>(
  {
    value: { default: '', attribute: 'value', type: 'string' },
    disabled: { default: false, attribute: 'disabled', type: 'boolean' },
  },
)

/**
 * @internal
 */
export function setupAutocompleteItem(
  host: HostElement,
  props: Store<AutocompleteItemProps>,
): void {
  setupListboxItem(host, props)

  const getAutocompleteStore = autocompleteStoreContext.consume(host)

  useEffect(host, () => {
    // Check the text content again when the open state changes
    const store = getAutocompleteStore()
    if (!props.value.get() && store?.open.get()) {
      props.value.set(host.textContent ?? '')
    }
  })

  useEventListener(host, 'pointerdown', (event) => {
    // Prevent the editor from losing focus
    event.preventDefault()
  })
}

const AutocompleteItemElementBase: HostElementConstructor<AutocompleteItemProps> = defineCustomElement(
  setupAutocompleteItem,
  AutocompleteItemPropsDeclaration,
)

/**
 * @public
 */
export class AutocompleteItemElement extends AutocompleteItemElementBase {}

/** @internal */
export const registerAutocompleteItemElement: VoidFunction = /* @__PURE__ */ once(() => {
  registerCustomElement('prosekit-autocomplete-item', AutocompleteItemElement)
})
