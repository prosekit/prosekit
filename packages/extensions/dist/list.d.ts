import { Command } from "@prosekit/pm/state";
import { Extension, Keymap, PlainExtension, Union } from "@prosekit/core";
import { DedentListOptions, DedentListOptions as DedentListOptions$1, IndentListOptions, IndentListOptions as IndentListOptions$1, ListAttributes, ListDOMSerializer, SplitListOptions, ToggleCollapsedOptions, ToggleCollapsedOptions as ToggleCollapsedOptions$1, UnwrapListOptions, UnwrapListOptions as UnwrapListOptions$1, WrapInListGetAttrs, createDedentListCommand as dedentList, createIndentListCommand as indentList, createMoveListCommand as moveList, createSplitListCommand as splitList, createToggleCollapsedCommand as toggleCollapsed, createToggleListCommand as toggleList, createUnwrapListCommand as unwrapList, createWrapInListCommand as wrapInList } from "prosemirror-flat-list";
declare function insertList(attrs?: ListAttributes): Command;
/**
 * @internal
 */
type ListCommandsExtension = Extension<{
  Commands: {
    dedentList: [options?: DedentListOptions$1];
    indentList: [options?: IndentListOptions$1];
    moveList: [direction: 'up' | 'down'];
    splitList: [options?: SplitListOptions];
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
export declare function defineListCommands(): ListCommandsExtension;
/**
 * Configures drop indicator to avoid unexpected drop point.
 *
 * We don't want to drag a list node and drop it as the first
 * child of another list node.
 *
 * @internal
 */
export declare function defineListDropIndicator(): PlainExtension;
/**
 * @internal
 */
export declare function defineListInputRules(): Extension;
/**
 * The attributes of a list node.
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
 * Options for the list keymap.
 */
interface ListOptions {
  /**
   * Whether the indent, dedent and split key bindings run in strict mode. In
   * strict mode a list node is never more than one level deeper than the block
   * before it, so no list node ends up with a hidden marker. Tab on the first
   * item of a list then does nothing.
   *
   * @default false
   */
  strict?: boolean;
}
/**
 * Returns the key bindings for list.
 *
 * @internal
 */
export declare function createListKeymap(options?: ListOptions): Keymap;
/**
 * Returns a extension that adds key bindings for list.
 *
 * @internal
 */
export declare function defineListKeymap(options?: ListOptions): PlainExtension;
/**
 * @internal
 */
export declare function defineListPlugins(): PlainExtension;
/**
 * @internal
 */
export declare function defineListSerializer(): PlainExtension;
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
export declare function defineListSpec(): ListSpecExtension;
/**
 * @internal
 */
type ListExtension = Union<[ListSpecExtension, ListCommandsExtension]>;
export declare function defineList(): ListExtension;
export { type DedentListOptions, type IndentListOptions, type ListAttrs, type ListCommandsExtension, ListDOMSerializer, type ListExtension, type ListOptions, type ListSpecExtension, type ToggleCollapsedOptions, type UnwrapListOptions, type WrapInListGetAttrs, dedentList, indentList, insertList, moveList, splitList, toggleCollapsed, toggleList, unwrapList, wrapInList };
//# sourceMappingURL=list.d.ts.map