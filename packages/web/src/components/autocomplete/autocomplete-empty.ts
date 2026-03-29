import {
  defineCustomElement,
  defineProps,
  registerCustomElement,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type Store,
} from '@aria-ui/core'
import { setupListboxEmpty, type ListboxEmptyProps } from '@aria-ui/elements/listbox'
import { once } from '@ocavue/utils'

/**
 * @internal
 */
export interface AutocompleteEmptyProps extends ListboxEmptyProps {}

/** @internal */
export const AutocompleteEmptyPropsDeclaration: PropsDeclaration<AutocompleteEmptyProps> = /* @__PURE__ */ defineProps<
  AutocompleteEmptyProps
>({})

/**
 * @internal
 */
export function setupAutocompleteEmpty(
  host: HostElement,
  props: Store<AutocompleteEmptyProps>,
): void {
  setupListboxEmpty(host, props)
}

const AutocompleteEmptyElementBase: HostElementConstructor<AutocompleteEmptyProps> = defineCustomElement(
  setupAutocompleteEmpty,
  AutocompleteEmptyPropsDeclaration,
)

/**
 * @public
 */
export class AutocompleteEmptyElement extends AutocompleteEmptyElementBase {}

/** @internal */
export const registerAutocompleteEmptyElement: VoidFunction = /* @__PURE__ */ once(() => {
  registerCustomElement('prosekit-autocomplete-empty', AutocompleteEmptyElement)
})
