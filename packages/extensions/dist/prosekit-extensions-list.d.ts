import { Extension, PlainExtension, Union } from "@prosekit/core";
import { DedentListOptions, DedentListOptions as DedentListOptions$1, IndentListOptions, IndentListOptions as IndentListOptions$1, ListAttributes, ListDOMSerializer, ToggleCollapsedOptions, ToggleCollapsedOptions as ToggleCollapsedOptions$1, UnwrapListOptions, UnwrapListOptions as UnwrapListOptions$1, WrapInListGetAttrs } from "prosemirror-flat-list";
/**
 * @internal
 */
type ListCommandsExtension = Extension<{
  Commands: {
    dedentList: [options?: DedentListOptions$1];
    indentList: [options?: IndentListOptions$1];
    moveList: [direction: 'up' | 'down'];
    splitList: [];
    toggleCollapsed: [options?: ToggleCollapsedOptions$1];
    unwrapList: [options?: UnwrapListOptions$1];
    toggleList: [attrs?: ListAttributes];
    wrapInList: [attrs?: ListAttributes];
    insertList: [attrs?: ListAttributes];
  };
}>;
/**
 * Defines list commands.
 *
 * @internal
 */
declare function defineListCommands(): ListCommandsExtension;
/**
 * @internal
 */
declare function defineListInputRules(): Extension;
/**
 * Returns a extension that adds key bindings for list.
 *
 * @internal
 */
declare function defineListKeymap(): PlainExtension;
/**
 * @internal
 */
declare function defineListPlugins(): PlainExtension;
/**
 * @internal
 */
declare function defineListSerializer(): PlainExtension;
/**
 * The attributes of a list node.
 *
 * @public
 */
interface ListAttrs {
  /**
   * The kind of list node.
   */
  kind?: 'bullet' | 'ordered' | 'task' | 'toggle';
  /**
   * The optional order of the list node.
   */
  order?: number | null;
  /**
   * Whether the list node is checked if its `kind` is `"task"`.
   */
  checked?: boolean;
  /**
   * Whether the list node is collapsed if its `kind` is `"toggle"`.
   */
  collapsed?: boolean;
}
/**
 * @internal
 */
type ListSpecExtension = Extension<{
  Nodes: {
    list: ListAttrs;
  };
}>;
/**
 * @internal
 */
declare function defineListSpec(): ListSpecExtension;
/**
 * @internal
 */
type ListExtension = Union<[ListSpecExtension, ListCommandsExtension]>;
/**
 * @public
 */
declare function defineList(): ListExtension;
export { type DedentListOptions, type IndentListOptions, type ListAttrs, type ListCommandsExtension, ListDOMSerializer, type ListExtension, type ListSpecExtension, type ToggleCollapsedOptions, type UnwrapListOptions, type WrapInListGetAttrs, defineList, defineListCommands, defineListInputRules, defineListKeymap, defineListPlugins, defineListSerializer, defineListSpec };
//# sourceMappingURL=prosekit-extensions-list.d.ts.map