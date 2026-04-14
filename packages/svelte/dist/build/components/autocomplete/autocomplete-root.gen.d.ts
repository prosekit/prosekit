import type { AutocompleteRootElement, AutocompleteRootEvents, AutocompleteRootProps as AutocompleteRootElementProps } from '@prosekit/web/autocomplete';
import type { Component, Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
/** Props for the {@link AutocompleteRoot} Svelte component. */
export interface AutocompleteRootProps {
    /**
     * The ProseKit editor instance.
     *
     * @default null
     * @hidden
     */
    editor?: AutocompleteRootElementProps['editor'];
    /**
     * The regular expression to match the query text to autocomplete.
     *
     * @default null
     */
    regex?: AutocompleteRootElementProps['regex'];
    /**
     * The filter function to determine if an item should be shown in the
     * listbox.
     *
     * @default defaultItemFilter
     */
    filter?: AutocompleteRootElementProps['filter'];
    /** Fired when the open state changes. */
    onOpenChange?: (event: AutocompleteRootEvents['openChange']) => void;
    /** Fired when the query changes. */
    onQueryChange?: (event: AutocompleteRootEvents['queryChange']) => void;
    /**
     * Emitted when the selected value changes. Only available when multiple is
     * false.
     */
    onValueChange?: (event: AutocompleteRootEvents['valueChange']) => void;
    /**
     * Emitted when the selected values change. Only available when multiple is
     * true.
     */
    onValuesChange?: (event: AutocompleteRootEvents['valuesChange']) => void;
    children?: Snippet;
}
/** A Svelte component that renders an `prosekit-autocomplete-root` custom element. */
export declare const AutocompleteRoot: Component<AutocompleteRootProps & HTMLAttributes<AutocompleteRootElement>>;
//# sourceMappingURL=autocomplete-root.gen.d.ts.map