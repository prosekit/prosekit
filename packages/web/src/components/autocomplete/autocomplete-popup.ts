import {
  createSignal,
  defineCustomElement,
  defineProps,
  registerCustomElement,
  type HostElement,
  type HostElementConstructor,
  type PropsDeclaration,
  type Signal,
  type State,
} from '@aria-ui/core'
import {
  defaultItemFilter,
  setupListboxRoot,
  type ItemFilter,
  type ListboxRootEvents,
  type ListboxRootProps,
} from '@aria-ui/elements/listbox'
import { OverlayPopupPropsDeclaration, setupOverlayPopup, type OverlayPopupProps } from '@aria-ui/elements/overlay'

import { createLazySignal } from '../../utils/lazy-signal.ts'
import { useNoFocus } from '../../utils/use-no-focus.ts'

import { autocompleteStoreContext } from './context.ts'

/**
 * @public
 */
export interface AutocompletePopupProps extends OverlayPopupProps {}

/**
 * @public
 */
export interface AutocompletePopupEvents extends ListboxRootEvents {}

/** @internal */
export const AutocompletePopupPropsDeclaration: PropsDeclaration<AutocompletePopupProps> = /* @__PURE__ */ defineProps<
  AutocompletePopupProps
>(OverlayPopupPropsDeclaration)

/** @internal */
export function setupAutocompletePopup(
  host: HostElement,
  _props: State<AutocompletePopupProps>,
): void {
  const getStore = autocompleteStoreContext.consume(host)
  const getOverlayStore = () => getStore()?.overlayStore

  setupOverlayPopup(host, getOverlayStore)

  const query = createLazySignal<string>(() => getStore()?.query, ' ')
  const eventTarget = createLazySignal<EventTarget | null>(() => getStore()?.eventTarget, null)
  const filter = createLazySignal<ItemFilter | null>(() => getStore()?.filter, defaultItemFilter)
  const getDisabled = () => (!(getOverlayStore()?.getIsOpen?.()))
  const disabled: Signal<boolean> = { get: getDisabled, set: () => {} }
  const listboxProps = createPopupListboxProps(filter, query, eventTarget, disabled)

  setupListboxRoot(host, listboxProps)
  useNoFocus(host)
}

function createPopupListboxProps(
  filter: Signal<ItemFilter | null>,
  query: Signal<string>,
  eventTarget: Signal<EventTarget | null>,
  disabled: Signal<boolean>,
): State<ListboxRootProps> {
  return {
    value: createSignal(''),
    values: createSignal<string[]>([]),
    multiple: createSignal(false),
    disabled,
    orientation: createSignal<'vertical' | 'horizontal'>('vertical'),
    loop: createSignal(false),
    autoHighlight: createSignal(true),
    query,
    eventTarget,
    filter,
  }
}

const AutocompletePopupElementBase: HostElementConstructor<AutocompletePopupProps> = defineCustomElement(
  setupAutocompletePopup,
  AutocompletePopupPropsDeclaration,
)

/**
 * `<prosekit-autocomplete-popup>` custom element.
 *
 * Properties: {@link AutocompletePopupProps}
 *
 * Events: {@link AutocompletePopupEvents}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-state` | `"open"` when the autocomplete is visible, `"closed"` otherwise |
 */
export class AutocompletePopupElement extends AutocompletePopupElementBase {}

/** @internal */
export function registerAutocompletePopupElement(): void {
  registerCustomElement('prosekit-autocomplete-popup', AutocompletePopupElement)
}
