import { ForwardRefExoticComponent, HTMLAttributes, RefAttributes } from "react";
import { AutocompleteEmptyElement, AutocompleteItemElement, AutocompleteItemEvents, AutocompleteItemProps as AutocompleteItemProps$1, AutocompletePopupElement, AutocompletePopupEvents, AutocompletePositionerElement, AutocompletePositionerProps as AutocompletePositionerProps$1, AutocompleteRootElement, AutocompleteRootEvents, AutocompleteRootProps as AutocompleteRootProps$1 } from "@prosekit/web/autocomplete";
/** Props for the {@link AutocompleteEmpty} React component. */
interface AutocompleteEmptyProps {}
/** A React component that renders an `prosekit-autocomplete-empty` custom element. */
declare const AutocompleteEmpty: ForwardRefExoticComponent<AutocompleteEmptyProps & HTMLAttributes<AutocompleteEmptyElement> & RefAttributes<AutocompleteEmptyElement>>;
/** Props for the {@link AutocompleteItem} React component. */
interface AutocompleteItemProps {
  /**
   * The value of the item, which will be matched against the query.
   *
   * If not provided, the value is the item's text content.
   *
   * @default ""
   */
  value?: AutocompleteItemProps$1['value'];
  /**
   * Whether this option is disabled.
   *
   * @default false
   */
  disabled?: AutocompleteItemProps$1['disabled'];
  /** Emitted when the the item is selected. */
  onSelect?: (event: AutocompleteItemEvents['select']) => void;
}
/** A React component that renders an `prosekit-autocomplete-item` custom element. */
declare const AutocompleteItem: ForwardRefExoticComponent<AutocompleteItemProps & Omit<HTMLAttributes<AutocompleteItemElement>, 'onSelect'> & RefAttributes<AutocompleteItemElement>>;
/** Props for the {@link AutocompletePopup} React component. */
interface AutocompletePopupProps {
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
}
/** A React component that renders an `prosekit-autocomplete-popup` custom element. */
declare const AutocompletePopup: ForwardRefExoticComponent<AutocompletePopupProps & HTMLAttributes<AutocompletePopupElement> & RefAttributes<AutocompletePopupElement>>;
/** Props for the {@link AutocompletePositioner} React component. */
interface AutocompletePositionerProps {
  /**
   * The placement of the popover, relative to the text cursor.
   *
   * @default "bottom-start"
   */
  placement?: AutocompletePositionerProps$1['placement'];
  /**
   * The distance between the popover and the text selection.
   *
   * @default { mainAxis: 8, crossAxis: -4 }
   */
  offset?: AutocompletePositionerProps$1['offset'];
  /**
   * Whether to hide the floating element when the reference element or the
   * floating element is fully clipped.
   *
   * @default true
   */
  hide?: AutocompletePositionerProps$1['hide'];
  /** @default true */
  inline?: AutocompletePositionerProps$1['inline'];
  /** @default true */
  hoist?: AutocompletePositionerProps$1['hoist'];
  /** @default true */
  fitViewport?: AutocompletePositionerProps$1['fitViewport'];
  /** @default "The body element" */
  boundary?: AutocompletePositionerProps$1['boundary'];
  /** @default 8 */
  overflowPadding?: AutocompletePositionerProps$1['overflowPadding'];
  /**
   * The strategy to use for positioning
   *
   * @default "absolute"
   */
  strategy?: AutocompletePositionerProps$1['strategy'];
  /**
   * Options to activate auto-update listeners
   *
   * @see https://floating-ui.com/docs/autoUpdate
   *
   * @default true
   */
  autoUpdate?: AutocompletePositionerProps$1['autoUpdate'];
  /**
   * Whether to flip the `placement` in order to keep it in view when the
   * preferred placement(s) will overflow the clipping boundary. You can also
   * provide an array of placements to try sequentially if the preferred
   * `placement` does not fit.
   *
   * @default true
   */
  flip?: AutocompletePositionerProps$1['flip'];
  /**
   * Whether the floating element should shift to keep it in view.
   *
   * @default true
   */
  shift?: AutocompletePositionerProps$1['shift'];
  /**
   * Whether the floating element can overlap the reference element to keep it
   * in view.
   *
   * @default false
   */
  overlap?: AutocompletePositionerProps$1['overlap'];
  /**
   * Whether to constrain the floating element's width so that it matches the
   * reference element.
   *
   * @default false
   */
  sameWidth?: AutocompletePositionerProps$1['sameWidth'];
  /**
   * Whether to constrain the floating element's height so that it matches the
   * reference element.
   *
   * @default false
   */
  sameHeight?: AutocompletePositionerProps$1['sameHeight'];
  /**
   * Describes the root boundary that the element will be checked for overflow relative to.
   * Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.
   *
   * @default 'viewport'
   */
  rootBoundary?: AutocompletePositionerProps$1['rootBoundary'];
  /**
   * The element that will be used to check for overflow. Please see
   * https://floating-ui.com/docs/detectoverflow#elementcontext for more
   * information.
   *
   * @default 'floating'
   */
  elementContext?: AutocompletePositionerProps$1['elementContext'];
  /**
   * Whether to check the alternate elementContext's boundary. Please see
   * https://floating-ui.com/docs/detectoverflow#altboundary for more
   * information.
   *
   * @default false
   */
  altBoundary?: AutocompletePositionerProps$1['altBoundary'];
}
/** A React component that renders an `prosekit-autocomplete-positioner` custom element. */
declare const AutocompletePositioner: ForwardRefExoticComponent<AutocompletePositionerProps & HTMLAttributes<AutocompletePositionerElement> & RefAttributes<AutocompletePositionerElement>>;
/** Props for the {@link AutocompleteRoot} React component. */
interface AutocompleteRootProps {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor?: AutocompleteRootProps$1['editor'];
  /**
   * The regular expression to match the query text to autocomplete.
   *
   * @default null
   */
  regex?: AutocompleteRootProps$1['regex'];
  /**
   * The filter function to determine if an item should be shown in the
   * listbox.
   *
   * @default defaultItemFilter
   */
  filter?: AutocompleteRootProps$1['filter'];
  /**
   * Builds the query string from the regex match found before the cursor. The
   * query is exposed via the `queryChange` event and used by the built-in item
   * filter. The default builder lowercases the match and strips punctuation.
   * Provide a custom builder to control the query, for example to preserve the
   * casing and punctuation the user typed.
   *
   * @default defaultQueryBuilder
   */
  queryBuilder?: AutocompleteRootProps$1['queryBuilder'];
  /**
   * The reference to position the popup against. This can be a DOM element, a
   * Floating UI virtual element, or a function that returns either of them.
   * By default, the popup will be positioned against the text content that
   * triggers the autocomplete.
   *
   * @default null
   */
  anchor?: AutocompleteRootProps$1['anchor'];
  /**
   * Whether the autocomplete match should follow the text cursor when it
   * moves without editing, growing and shrinking the query as the cursor
   * moves over existing text (for example with arrow keys).
   *
   * @default false
   */
  followCursor?: AutocompleteRootProps$1['followCursor'];
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
}
/** A React component that renders an `prosekit-autocomplete-root` custom element. */
declare const AutocompleteRoot: ForwardRefExoticComponent<AutocompleteRootProps & HTMLAttributes<AutocompleteRootElement> & RefAttributes<AutocompleteRootElement>>;
export { AutocompleteEmpty, type AutocompleteEmptyProps, AutocompleteItem, type AutocompleteItemProps, AutocompletePopup, type AutocompletePopupProps, AutocompletePositioner, type AutocompletePositionerProps, AutocompleteRoot, type AutocompleteRootProps };
//# sourceMappingURL=autocomplete.d.ts.map