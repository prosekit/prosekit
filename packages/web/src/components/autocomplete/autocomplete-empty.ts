import {
  defineCustomElement,
  defineProps,
  registerCustomElement,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type State,
} from '@aria-ui/core'
import { setupListboxEmpty, type ListboxEmptyProps } from '@aria-ui/elements/listbox'

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
  props: State<AutocompleteEmptyProps>,
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
export function registerAutocompleteEmptyElement(): void {
  registerCustomElement('prosekit-autocomplete-empty', AutocompleteEmptyElement)
}
