import { BaseElementConstructor, ConnectableElement, EventDeclarations, PropDeclarations, SetupOptions } from "@aria-ui/core";
import { useListboxEmpty } from "@aria-ui/listbox/elements";
import { ListboxEvents, ListboxItemEvents, ListboxProps } from "@aria-ui/listbox";
import { Editor } from "@prosekit/core";
import { OverlayPositionerEvents, OverlayPositionerProps } from "@aria-ui/overlay/elements";

//#region src/components/autocomplete/autocomplete-empty/types.d.ts
/** @internal */
interface AutocompleteEmptyProps {}
/** @internal */
declare const autocompleteEmptyProps: PropDeclarations<AutocompleteEmptyProps>;
/** @internal */
interface AutocompleteEmptyEvents {}
/** @internal */
declare const autocompleteEmptyEvents: EventDeclarations<AutocompleteEmptyEvents>;
//#endregion
//#region src/components/autocomplete/autocomplete-empty/element.gen.d.ts
declare const AutocompleteEmptyElementBase: BaseElementConstructor<AutocompleteEmptyProps>;
declare class AutocompleteEmptyElement extends AutocompleteEmptyElementBase {}
//#endregion
//#region src/components/autocomplete/autocomplete-empty/setup.d.ts
/**
 * @internal
 */
declare const useAutocompleteEmpty: typeof useListboxEmpty;
//#endregion
//#region src/components/autocomplete/autocomplete-item/types.d.ts
interface AutocompleteItemProps {
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
declare const autocompleteItemProps: PropDeclarations<AutocompleteItemProps>;
interface AutocompleteItemEvents extends ListboxItemEvents {}
/** @internal */
declare const autocompleteItemEvents: EventDeclarations<AutocompleteItemEvents>;
//#endregion
//#region src/components/autocomplete/autocomplete-item/element.gen.d.ts
declare const AutocompleteItemElementBase: BaseElementConstructor<AutocompleteItemProps>;
declare class AutocompleteItemElement extends AutocompleteItemElementBase {}
//#endregion
//#region src/components/autocomplete/autocomplete-item/setup.d.ts
/**
 * @internal
 */
declare function useAutocompleteItem(element: ConnectableElement, {
  state,
  emit
}: SetupOptions<AutocompleteItemProps, AutocompleteItemEvents>): void;
//#endregion
//#region src/components/autocomplete/autocomplete-list/types.d.ts
interface AutocompleteListProps extends Pick<ListboxProps, 'filter'> {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null;
}
declare const autocompleteListProps: PropDeclarations<AutocompleteListProps>;
interface AutocompleteListEvents extends ListboxEvents {}
declare const autocompleteListEvents: EventDeclarations<AutocompleteListEvents>;
//#endregion
//#region src/components/autocomplete/autocomplete-list/element.gen.d.ts
declare const AutocompleteListElementBase: BaseElementConstructor<AutocompleteListProps>;
declare class AutocompleteListElement extends AutocompleteListElementBase {}
//#endregion
//#region src/components/autocomplete/autocomplete-list/setup.d.ts
/**
 * @internal
 */
declare function useAutocompleteList(element: ConnectableElement, {
  state,
  emit
}: SetupOptions<AutocompleteListProps, AutocompleteListEvents>): void;
//#endregion
//#region src/components/autocomplete/autocomplete-popover/types.d.ts
interface AutocompletePopoverProps extends OverlayPositionerProps {
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
   * The placement of the popover, relative to the text cursor.
   *
   * @default "bottom-start"
   */
  placement: OverlayPositionerProps['placement'];
  /**
   * The distance between the popover and the hovered block.
   *
   * @default 4
   */
  offset: OverlayPositionerProps['offset'];
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
declare const autocompletePopoverProps: PropDeclarations<AutocompletePopoverProps>;
interface AutocompletePopoverEvents extends OverlayPositionerEvents {
  /**
   * Fired when the open state changes.
   */
  openChange: CustomEvent<boolean>;
  /**
   * Fired when the query changes.
   */
  queryChange: CustomEvent<string>;
}
/** @internal */
declare const autocompletePopoverEvents: EventDeclarations<AutocompletePopoverEvents>;
//#endregion
//#region src/components/autocomplete/autocomplete-popover/element.gen.d.ts
declare const AutocompletePopoverElementBase: BaseElementConstructor<AutocompletePopoverProps>;
declare class AutocompletePopoverElement extends AutocompletePopoverElementBase {}
//#endregion
//#region src/components/autocomplete/autocomplete-popover/setup.d.ts
/**
 * @internal
 */
declare function useAutocompletePopover(host: ConnectableElement, {
  state,
  emit
}: SetupOptions<AutocompletePopoverProps, AutocompletePopoverEvents>): void;
//#endregion
export { AutocompleteEmptyElement, type AutocompleteEmptyEvents, type AutocompleteEmptyProps, AutocompleteItemElement, type AutocompleteItemEvents, type AutocompleteItemProps, AutocompleteListElement, type AutocompleteListEvents, type AutocompleteListProps, AutocompletePopoverElement, type AutocompletePopoverEvents, type AutocompletePopoverProps, autocompleteEmptyEvents, autocompleteEmptyProps, autocompleteItemEvents, autocompleteItemProps, autocompleteListEvents, autocompleteListProps, autocompletePopoverEvents, autocompletePopoverProps, useAutocompleteEmpty, useAutocompleteItem, useAutocompleteList, useAutocompletePopover };
//# sourceMappingURL=prosekit-web-autocomplete.d.ts.map