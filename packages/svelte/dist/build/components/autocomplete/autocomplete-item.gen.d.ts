import type { AutocompleteItemElement, AutocompleteItemEvents, AutocompleteItemProps as AutocompleteItemElementProps } from '@prosekit/web/autocomplete';
import type { Component, Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
/** Props for the {@link AutocompleteItem} Svelte component. */
export interface AutocompleteItemProps {
    /**
     * The value of the item, which will be matched against the query.
     *
     * If not provided, the value is the item's text content.
     *
     * @default ""
     */
    value?: AutocompleteItemElementProps['value'];
    /**
     * Whether this option is disabled.
     *
     * @default false
     */
    disabled?: AutocompleteItemElementProps['disabled'];
    /** Emitted when the the item is selected. */
    onSelect?: (event: AutocompleteItemEvents['select']) => void;
    children?: Snippet;
}
/** A Svelte component that renders an `prosekit-autocomplete-item` custom element. */
export declare const AutocompleteItem: Component<AutocompleteItemProps & HTMLAttributes<AutocompleteItemElement>>;
//# sourceMappingURL=autocomplete-item.gen.d.ts.map