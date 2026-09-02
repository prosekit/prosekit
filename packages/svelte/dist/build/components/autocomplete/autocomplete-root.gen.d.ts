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
    /**
     * Builds the query string from the regex match found before the cursor. The
     * query is exposed via the `queryChange` event and used by the built-in item
     * filter. The default builder lowercases the match and strips punctuation.
     * Provide a custom builder to control the query, for example to preserve the
     * casing and punctuation the user typed.
     *
     * @default defaultQueryBuilder
     */
    queryBuilder?: AutocompleteRootElementProps['queryBuilder'];
    /**
     * The reference to position the popup against. This can be a DOM element, a
     * Floating UI virtual element, or a function that returns either of them.
     * By default, the popup will be positioned against the text content that
     * triggers the autocomplete.
     *
     * @default null
     */
    anchor?: AutocompleteRootElementProps['anchor'];
    /**
     * Whether the autocomplete match should follow the text cursor when it
     * moves without editing, growing and shrinking the query as the cursor
     * moves over existing text (for example with arrow keys).
     *
     * @default false
     */
    followCursor?: AutocompleteRootElementProps['followCursor'];
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