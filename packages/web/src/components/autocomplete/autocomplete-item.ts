import {
  defineCustomElement,
  defineProps,
  registerCustomElement,
  useEventListener,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type State,
} from '@aria-ui/core'
import { SelectEvent, setupListboxItem, type ListboxItemEvents, type ListboxItemProps } from '@aria-ui/elements/listbox'

import { preventDefault } from '../../utils/prevent-default.ts'

export { SelectEvent }

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

export interface AutocompleteItemEvents extends ListboxItemEvents {}

/**
 * @internal
 */
export function setupAutocompleteItem(
  host: HostElement,
  props: State<AutocompleteItemProps>,
): void {
  setupListboxItem(host, props)

  // Prevent the editor from losing focus
  useEventListener(host, 'pointerdown', preventDefault)
  useEventListener(host, 'mousedown', preventDefault)
}

const AutocompleteItemElementBase: HostElementConstructor<AutocompleteItemProps> = defineCustomElement(
  setupAutocompleteItem,
  AutocompleteItemPropsDeclaration,
)

/**
 * `<prosekit-autocomplete-item>` custom element.
 *
 * Properties: {@link AutocompleteItemProps}
 *
 * Events: {@link AutocompleteItemEvents}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-highlighted` | Present when the item is the currently highlighted option |
 */
export class AutocompleteItemElement extends AutocompleteItemElementBase {}

/** @internal */
export function registerAutocompleteItemElement(): void {
  registerCustomElement('prosekit-autocomplete-item', AutocompleteItemElement)
}
