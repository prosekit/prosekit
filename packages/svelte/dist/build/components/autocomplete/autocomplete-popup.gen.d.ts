import type { AutocompletePopupElement, AutocompletePopupEvents } from '@prosekit/web/autocomplete';
import type { Component, Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
/** Props for the {@link AutocompletePopup} Svelte component. */
export interface AutocompletePopupProps {
    /**
     * Emitted when the selected value changes. Only available when multiple is
     * false.
     */
    onValueChange?: (event: AutocompletePopupEvents['valueChange']) => void;
    /**
     * Emitted when the selected values change. Only available when multiple is
     * true.
     */
    onValuesChange?: (event: AutocompletePopupEvents['valuesChange']) => void;
    children?: Snippet;
}
/** A Svelte component that renders an `prosekit-autocomplete-popup` custom element. */
export declare const AutocompletePopup: Component<AutocompletePopupProps & HTMLAttributes<AutocompletePopupElement>>;
//# sourceMappingURL=autocomplete-popup.gen.d.ts.map