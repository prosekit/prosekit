import { t as AnchorReference } from "./resolve-anchor.js";
import { HostElement, HostElementConstructor, PropsDeclaration, State } from "@aria-ui/core";
import { ItemFilter, ListboxEmptyProps, ListboxItemEvents, ListboxItemProps, ListboxRootEvents, SelectEvent, ValueChangeEvent, ValuesChangeEvent } from "@aria-ui/elements/listbox";
import { OpenChangeEvent, OverlayPopupProps, OverlayPositionerProps } from "@aria-ui/elements/overlay";
import { Editor } from "@prosekit/core";
interface AutocompleteEmptyProps extends ListboxEmptyProps {}
/** @internal */
declare const AutocompleteEmptyPropsDeclaration: PropsDeclaration<AutocompleteEmptyProps>;
/**
 * @internal
 */
declare function setupAutocompleteEmpty(host: HostElement, props: State<AutocompleteEmptyProps>): void;
declare const AutocompleteEmptyElementBase: HostElementConstructor<AutocompleteEmptyProps>;
/**
 * `<prosekit-autocomplete-empty>` custom element.
 *
 * Properties: {@link AutocompleteEmptyProps}
 */
declare class AutocompleteEmptyElement extends AutocompleteEmptyElementBase {}
/** @internal */
declare function registerAutocompleteEmptyElement(): void;
interface AutocompleteItemProps extends ListboxItemProps {
  /**
   * The value of the item, which will be matched against the query.
   *
   * If not provided, the value is the item's text content.
   *
   * @default ""
   */
  value: string;
}
/** @internal */
declare const AutocompleteItemPropsDeclaration: PropsDeclaration<AutocompleteItemProps>;
interface AutocompleteItemEvents extends ListboxItemEvents {}
/**
 * @internal
 */
declare function setupAutocompleteItem(host: HostElement, props: State<AutocompleteItemProps>): void;
declare const AutocompleteItemElementBase: HostElementConstructor<AutocompleteItemProps>;
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
declare class AutocompleteItemElement extends AutocompleteItemElementBase {}
/** @internal */
declare function registerAutocompleteItemElement(): void;
interface AutocompletePopupProps extends OverlayPopupProps {}
interface AutocompletePopupEvents extends ListboxRootEvents {}
/** @internal */
declare const AutocompletePopupPropsDeclaration: PropsDeclaration<AutocompletePopupProps>;
/** @internal */
declare function setupAutocompletePopup(host: HostElement, _props: State<AutocompletePopupProps>): void;
declare const AutocompletePopupElementBase: HostElementConstructor<AutocompletePopupProps>;
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
declare class AutocompletePopupElement extends AutocompletePopupElementBase {}
/** @internal */
declare function registerAutocompletePopupElement(): void;
interface AutocompletePositionerProps extends OverlayPositionerProps {
  /**
   * The placement of the popover, relative to the text cursor.
   *
   * @default "bottom-start"
   */
  placement: OverlayPositionerProps['placement'];
  /**
   * The distance between the popover and the text selection.
   *
   * @default { mainAxis: 8, crossAxis: -4 }
   */
  offset: OverlayPositionerProps['offset'];
  /**
   * Whether to hide the floating element when the reference element or the
   * floating element is fully clipped.
   *
   * @default true
   */
  hide: OverlayPositionerProps['hide'];
  /**
   * @default true
   */
  inline: OverlayPositionerProps['inline'];
  /**
   * @default true
   */
  hoist: OverlayPositionerProps['hoist'];
  /**
   * @default true
   */
  fitViewport: OverlayPositionerProps['fitViewport'];
  /**
   * @default "The body element"
   */
  boundary: OverlayPositionerProps['boundary'];
  /**
   * @default 8
   */
  overflowPadding: OverlayPositionerProps['overflowPadding'];
}
/** @internal */
declare const AutocompletePositionerPropsDeclaration: PropsDeclaration<AutocompletePositionerProps>;
/** @internal */
declare function setupAutocompletePositioner(host: HostElement, props: State<AutocompletePositionerProps>): void;
declare const AutocompletePositionerElementBase: HostElementConstructor<AutocompletePositionerProps>;
/**
 * `<prosekit-autocomplete-positioner>` custom element.
 *
 * Properties: {@link AutocompletePositionerProps}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-state` | `"open"` when the autocomplete is visible, `"closed"` otherwise |
 * | `data-side` | The side of the anchor element the positioner is on |
 * | `data-align` | The alignment of the positioner relative to the anchor element |
 *
 * CSS variables:
 *
 * | Variable | Description |
 * | --- | --- |
 * | `--transform-origin` | The coordinates that this element is anchored to. Useful for scale animations. |
 */
declare class AutocompletePositionerElement extends AutocompletePositionerElementBase {}
/** @internal */
declare function registerAutocompletePositionerElement(): void;
/**
 * Builds the query string from the regex match found before the cursor. The
 * returned query is exposed via the `queryChange` event and used by the
 * built-in item filter.
 */
type QueryBuilder = (match: RegExpExecArray) => string;
declare function defaultQueryBuilder(match: RegExpExecArray): string;
interface AutocompleteRootProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null;
  /**
   * The regular expression to match the query text to autocomplete.
   *
   * @default null
   */
  regex: RegExp | null;
  /**
   * The filter function to determine if an item should be shown in the
   * listbox.
   *
   * @default defaultItemFilter
   */
  filter: ItemFilter | null;
  /**
   * Builds the query string from the regex match found before the cursor. The
   * query is exposed via the `queryChange` event and used by the built-in item
   * filter. The default builder lowercases the match and strips punctuation.
   * Provide a custom builder to control the query, for example to preserve the
   * casing and punctuation the user typed.
   *
   * @default defaultQueryBuilder
   */
  queryBuilder: QueryBuilder;
  /**
   * The reference to position the popup against. This can be a DOM element, a
   * Floating UI virtual element, or a function that returns either of them.
   * By default, the popup will be positioned against the text content that
   * triggers the autocomplete.
   *
   * @default null
   */
  anchor: AnchorReference;
  /**
   * Whether the autocomplete match should follow the text cursor when it
   * moves without editing, growing and shrinking the query as the cursor
   * moves over existing text (for example with arrow keys).
   *
   * @default false
   */
  followCursor: boolean;
}
/** @internal */
declare const AutocompleteRootPropsDeclaration: PropsDeclaration<AutocompleteRootProps>;
declare class QueryChangeEvent extends Event {
  /**
   * The current query string.
   */
  readonly detail: string;
  constructor(query: string);
}
interface AutocompleteRootEvents extends ListboxRootEvents {
  /**
   * Fired when the open state changes.
   */
  openChange: OpenChangeEvent;
  /**
   * Fired when the query changes.
   */
  queryChange: QueryChangeEvent;
}
/**
 * @internal
 */
declare function setupAutocompleteRoot(host: HostElement, props: State<AutocompleteRootProps>): void;
declare const AutocompleteRootElementBase: HostElementConstructor<AutocompleteRootProps>;
/**
 * `<prosekit-autocomplete-root>` custom element.
 *
 * Properties: {@link AutocompleteRootProps}
 *
 * Events: {@link AutocompleteRootEvents}
 */
declare class AutocompleteRootElement extends AutocompleteRootElementBase {}
/** @internal */
declare function registerAutocompleteRootElement(): void;
export { AutocompleteEmptyElement, type AutocompleteEmptyProps, AutocompleteEmptyPropsDeclaration, AutocompleteItemElement, type AutocompleteItemEvents, type AutocompleteItemProps, AutocompleteItemPropsDeclaration, AutocompletePopupElement, type AutocompletePopupEvents, type AutocompletePopupProps, AutocompletePopupPropsDeclaration, AutocompletePositionerElement, type AutocompletePositionerProps, AutocompletePositionerPropsDeclaration, AutocompleteRootElement, type AutocompleteRootEvents, type AutocompleteRootProps, AutocompleteRootPropsDeclaration, OpenChangeEvent, type QueryBuilder, QueryChangeEvent, SelectEvent, ValueChangeEvent, ValuesChangeEvent, defaultQueryBuilder, registerAutocompleteEmptyElement, registerAutocompleteItemElement, registerAutocompletePopupElement, registerAutocompletePositionerElement, registerAutocompleteRootElement, setupAutocompleteEmpty, setupAutocompleteItem, setupAutocompletePopup, setupAutocompletePositioner, setupAutocompleteRoot };
//# sourceMappingURL=autocomplete.d.ts.map