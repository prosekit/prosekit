import { A as ExtractMarks, B as NodeTyping, C as StepJSON, D as ExtractCommandCreators, E as ExtractCommandActions, F as Union, G as CommandCreator, H as MarkTyping, I as SimplifyUnion, J as NodeAction, K as CommandTyping, L as SimplifyDeeper, M as ExtractNodes, N as ExtractTyping, O as ExtractCommands, P as PlainExtension, R as Priority, S as StateJSON, T as ExtensionTyping, U as ToMarkAction, V as ToNodeAction, W as CommandAction, X as AnyAttrs, Y as NodeChild, Z as AttrSpec, _ as nodeFromHTML, a as DOMDocumentOptions, b as NodeJSON, c as JSONParserOptions, d as htmlFromJSON, f as htmlFromNode, g as nodeFromElement, h as jsonFromState, i as createEditor, j as ExtractNodeActions, k as ExtractMarkActions, l as elementFromJSON, m as jsonFromNode, o as DOMParserOptions, p as jsonFromHTML, q as MarkAction, r as EditorOptions, s as DOMSerializerOptions, t as Editor, u as elementFromNode, v as nodeFromJSON, w as Extension, x as SelectionJSON, y as stateFromJSON, z as PickSubType } from "./editor-4lgGc3CY.js";
import { AllSelection, Command, EditorState, EditorStateConfig, NodeSelection, Plugin, Selection, TextSelection, Transaction } from "@prosekit/pm/state";
import { Attrs, ContentMatch, DOMSerializer, Fragment, Mark, MarkSpec, MarkType, Node, NodeSpec, NodeType, ProseMirrorNode, ResolvedPos, Schema, Slice } from "@prosekit/pm/model";
import { ObjectEntries } from "@ocavue/utils";
import { DOMEventMap, EditorView, MarkViewConstructor, NodeViewConstructor } from "@prosekit/pm/view";

//#region src/commands/add-mark.d.ts
/**
 * @public
 */
interface AddMarkOptions {
  /**
   * The type of the mark to add.
   */
  type: string | MarkType;
  /**
   * The attributes of the mark to add.
   */
  attrs?: Attrs | null;
  /**
   * The start position of the document. By default it will be the start position of current selection.
   */
  from?: number;
  /**
   * The end position of the document. By default it will be the end position of current selection.
   */
  to?: number;
}
/**
 * Returns a command that adds the given mark with the given attributes.
 *
 * @public
 */
declare function addMark(options: AddMarkOptions): Command;
//#endregion
//#region src/commands/expand-mark.d.ts
/**
 * @public
 */
interface ExpandMarkOptions {
  /**
   * The type of the mark to expand.
   */
  type: string | MarkType;
}
/**
 * Expands the selection to include the entire mark at the current position.
 *
 * @public
 */
declare function expandMark(options: ExpandMarkOptions): Command;
//#endregion
//#region src/commands/insert-default-block.d.ts
/**
 * @public
 */
interface InsertDefaultBlockOptions {
  /**
   * The position to insert the node at. By default it will insert after the
   * current selection.
   */
  pos?: number;
}
/**
 * Returns a command that inserts a default block after current selection or at
 * the given position.
 *
 * @public
 */
declare function insertDefaultBlock(options?: InsertDefaultBlockOptions): Command;
//#endregion
//#region src/commands/insert-node.d.ts
/**
 * @public
 */
interface InsertNodeOptions {
  /**
   * The node to insert. Either this or `type` must be provided.
   */
  node?: ProseMirrorNode;
  /**
   * The type of the node to insert. Either this or `node` must be provided.
   */
  type?: string | NodeType;
  /**
   * When `type` is provided, the attributes of the node to insert.
   */
  attrs?: Attrs;
  /**
   * The position to insert the node at. By default it will be the anchor
   * position of current selection.
   */
  pos?: number;
}
/**
 * Returns a command that inserts the given node at the current selection or at
 * the given position.
 *
 * @public
 */
declare function insertNode(options: InsertNodeOptions): Command;
//#endregion
//#region src/commands/remove-mark.d.ts
/**
 * @public
 */
interface RemoveMarkOptions {
  /**
   * The type of the mark to remove.
   */
  type: string | MarkType;
  /**
   * If attrs is given, remove precisely the mark with the given attrs. Otherwise, remove all marks of the given type.
   */
  attrs?: Attrs | null;
  /**
   * The start position of the document. By default it will be the start position of current selection.
   */
  from?: number;
  /**
   * The end position of the document. By default it will be the end position of current selection.
   */
  to?: number;
}
/**
 * Returns a command that removes the given mark.
 *
 * @public
 */
declare function removeMark(options: RemoveMarkOptions): Command;
//#endregion
//#region src/commands/remove-node.d.ts
/**
 * @public
 */
interface RemoveNodeOptions {
  /**
   * The type of the node to remove.
   */
  type: string | NodeType;
  /**
   * The document position to start searching node. By default it will be the
   * anchor position of current selection.
   */
  pos?: number;
}
/**
 * Returns a command to remove the nearest ancestor node of a specific type from the current position.
 *
 * @public
 */
declare function removeNode(options: RemoveNodeOptions): Command;
//#endregion
//#region src/commands/select-all.d.ts
/**
 * Returns a command that selects the whole document.
 *
 * @public
 */
declare function selectAll(): Command;
//#endregion
//#region src/commands/select-block.d.ts
/**
 * Returns a command to expand the text selection to cover the current block
 * node. If the text selection spans multiple blocks, it will select all
 * blocks in the selection.
 *
 * @public
 */
declare function selectBlock(): Command;
//#endregion
//#region src/commands/set-block-type.d.ts
/**
 * @public
 */
interface SetBlockTypeOptions {
  type: NodeType | string;
  attrs?: Attrs | null;
  from?: number;
  to?: number;
}
/**
 * Returns a command that tries to set the selected textblocks to the given node
 * type with the given attributes.
 *
 * @public
 */
declare function setBlockType(options: SetBlockTypeOptions): Command;
//#endregion
//#region src/commands/set-node-attrs.d.ts
/**
 * @public
 */
interface SetNodeAttrsOptions {
  /**
   * The type of node to set the attributes of.
   *
   * If current node is not of this type, the command will do nothing.
   */
  type: string | NodeType | string[] | NodeType[];
  /**
   * The attributes to set.
   */
  attrs: Attrs;
  /**
   * The position of the node. Defaults to the position of the wrapping node
   * containing the current selection.
   */
  pos?: number;
}
/**
 * Returns a command that set the attributes of the current node.
 *
 * @public
 */
declare function setNodeAttrs(options: SetNodeAttrsOptions): Command;
//#endregion
//#region src/commands/toggle-mark.d.ts
/**
 * @public
 */
interface ToggleMarkOptions {
  /**
   * The mark type to toggle.
   */
  type: string | MarkType;
  /**
   * The optional attributes to set on the mark.
   */
  attrs?: Attrs | null;
  /**
   * Controls whether, when part of the selected range has the mark
   * already and part doesn't, the mark is removed (`true`) or added
   * (`false`).
   *
   * @default false
   */
  removeWhenPresent?: boolean;
  /**
   * Whether the command should act on the content of inline nodes marked as
   * [atoms](https://prosemirror.net/docs/ref/#model.NodeSpec.atom) that are
   * completely covered by a selection range.
   *
   * @default true
   */
  enterInlineAtoms?: boolean;
}
/**
 * Returns a command that toggles the given mark with the given attributes.
 *
 * @param options
 *
 * @public
 */
declare function toggleMark({
  type,
  attrs,
  removeWhenPresent,
  enterInlineAtoms
}: ToggleMarkOptions): Command;
//#endregion
//#region src/commands/toggle-node.d.ts
/**
 * @public
 */
interface ToggleNodeOptions {
  /**
   * The type of the node to toggle.
   */
  type: string | NodeType;
  /**
   * The attributes of the node to toggle.
   */
  attrs?: Attrs | null;
}
/**
 * Returns a command that set the selected textblocks to the given node type
 * with the given attributes.
 *
 * @param options
 *
 * @public
 */
declare function toggleNode({
  type,
  attrs
}: ToggleNodeOptions): Command;
//#endregion
//#region src/commands/toggle-wrap.d.ts
interface ToggleWrapOptions {
  /**
   * The type of the node to toggle.
   */
  type: string | NodeType;
  /**
   * The attributes of the node to toggle.
   */
  attrs?: Attrs | null;
}
/**
 * Toggle between wrapping an inactive node with the provided node type, and
 * lifting it up into its parent.
 *
 * @param options
 *
 * @public
 */
declare function toggleWrap(options: ToggleWrapOptions): Command;
//#endregion
//#region src/commands/unset-block-type.d.ts
/**
 * @public
 */
interface UnsetBlockTypeOptions {
  /**
   * The start position of the document. By default it will be the start position of current selection.
   */
  from?: number;
  /**
   * The end position of the document. By default it will be the end position of current selection.
   */
  to?: number;
}
/**
 * Returns a command that set the type of all textblocks between the given range
 * to the default type (usually `paragraph`).
 *
 * @public
 */
declare function unsetBlockType(options?: UnsetBlockTypeOptions): Command;
//#endregion
//#region src/commands/unset-mark.d.ts
/**
 * @public
 *
 * Options for {@link unsetMark}.
 */
interface UnsetMarkOptions {
  /**
   * The start position of the document. By default it will be the start position of current selection.
   */
  from?: number;
  /**
   * The end position of the document. By default it will be the end position of current selection.
   */
  to?: number;
}
/**
 * Returns a command that removes all marks.
 *
 * @public
 */
declare function unsetMark(options?: UnsetMarkOptions): Command;
//#endregion
//#region src/commands/wrap.d.ts
/**
 * @public
 */
interface WrapOptions {
  /**
   * The node type to wrap the selected textblock with.
   */
  type: NodeType | string;
  /**
   * Optional attributes to apply to the node.
   */
  attrs?: Attrs | null;
}
/**
 * Returns a command that wraps the selected textblock with the given node type.
 *
 * @param options
 *
 * @public
 */
declare function wrap(options: WrapOptions): Command;
//#endregion
//#region src/editor/union.d.ts
/**
 * Merges multiple extensions into one. You can pass multiple extensions as
 * arguments or a single array containing multiple extensions.
 *
 * @throws If no extensions are provided.
 *
 * @example
 *
 * ```ts
 * function defineFancyNodes() {
 *   return union(
 *     defineFancyParagraph(),
 *     defineFancyHeading(),
 *   )
 * }
 * ```
 *
 * @example
 *
 * ```ts
 * function defineFancyNodes() {
 *   return union([
 *     defineFancyParagraph(),
 *     defineFancyHeading(),
 *   ])
 * }
 * ```
 *
 * @public
 */
declare function union<const E extends readonly Extension[]>(...exts: E): Union<E>;
declare function union<const E extends readonly Extension[]>(exts: E): Union<E>;
//#endregion
//#region src/editor/with-priority.d.ts
/**
 * Return an new extension with the given priority.
 *
 * @example
 * ```ts
 * import { Priority, withPriority } from 'prosekit/core'
 *
 * const extension = withPriority(defineMyExtension(), Priority.high)
 * ```
 *
 * @public
 */
declare function withPriority<T extends Extension>(extension: T, priority: Priority): T;
//#endregion
//#region src/error.d.ts
/**
 * Base class for all ProseKit errors.
 *
 * @internal
 */
declare class ProseKitError extends Error {}
/**
 * @internal
 */
declare class EditorNotFoundError extends ProseKitError {
  constructor();
}
//#endregion
//#region src/types/any-function.d.ts
/**
 * @internal
 */
type AnyFunction = (...args: any[]) => any;
//#endregion
//#region src/extensions/clipboard-serializer.d.ts
type SerializeFragmentFunction = typeof DOMSerializer.prototype.serializeFragment;
type SerializeNodeFunction = typeof DOMSerializer.prototype.serializeNode;
type NodesFromSchemaFunction = typeof DOMSerializer.nodesFromSchema;
type MarksFromSchemaFunction = typeof DOMSerializer.marksFromSchema;
type FunctionWrapper<T extends AnyFunction> = (fn: T) => T;
/**
 * @internal
 */
interface ClipboardSerializerOptions {
  serializeFragmentWrapper?: FunctionWrapper<SerializeFragmentFunction>;
  serializeNodeWrapper?: FunctionWrapper<SerializeNodeFunction>;
  nodesFromSchemaWrapper?: FunctionWrapper<NodesFromSchemaFunction>;
  marksFromSchemaWrapper?: FunctionWrapper<MarksFromSchemaFunction>;
}
/**
 * @internal
 */
declare function defineClipboardSerializer(options: ClipboardSerializerOptions): PlainExtension;
//#endregion
//#region src/commands/insert-text.d.ts
/**
 * @public
 */
type InsertTextOptions = {
  text: string;
  from?: number;
  to?: number;
};
//#endregion
//#region src/extensions/command.d.ts
declare function defineCommands<T extends Record<string, CommandCreator> = Record<string, CommandCreator>>(commands: T): Extension<{
  Commands: { [K in keyof T]: Parameters<T[K]> };
}>;
/**
 * @internal
 */
type BaseCommandsExtension = Extension<{
  Commands: {
    insertText: [options: InsertTextOptions];
    insertNode: [options: InsertNodeOptions];
    removeNode: [options: RemoveNodeOptions];
    wrap: [options: WrapOptions];
    toggleWrap: [options: ToggleWrapOptions];
    setBlockType: [options: SetBlockTypeOptions];
    setNodeAttrs: [options: SetNodeAttrsOptions];
    insertDefaultBlock: [options?: InsertDefaultBlockOptions];
    selectAll: [];
    selectBlock: [];
    addMark: [options: AddMarkOptions];
    removeMark: [options: RemoveMarkOptions];
    unsetBlockType: [options?: UnsetBlockTypeOptions];
    unsetMark: [options?: UnsetMarkOptions];
  };
}>;
/**
 * Add some base commands
 *
 * @public
 */
declare function defineBaseCommands(): BaseCommandsExtension;
//#endregion
//#region src/extensions/default-state.d.ts
/**
 * @public
 */
interface DefaultStateOptions {
  /**
   * The starting document to use when creating the editor. It can be a
   * ProseMirror node JSON object, an HTML string, or a DOM element instance.
   */
  defaultContent?: NodeJSON | string | Element;
  /**
   * A JSON object representing the starting selection to use when creating the
   * editor. It's only used when `defaultContent` is also provided.
   */
  defaultSelection?: SelectionJSON;
}
/**
 * Define a default state for the editor.
 *
 * @param options
 *
 * @public
 */
declare function defineDefaultState({
  defaultSelection,
  defaultContent
}: DefaultStateOptions): PlainExtension;
//#endregion
//#region src/extensions/events/doc-change.d.ts
/**
 * A function that is called when the editor document is changed.
 *
 * @param view - The editor view.
 * @param prevState - The previous editor state.
 *
 * @public
 */
type DocChangeHandler = (view: EditorView, prevState: EditorState) => void;
/**
 * Registers a event handler that is called when the editor document is changed.
 *
 * @public
 */
declare function defineDocChangeHandler(handler: DocChangeHandler): PlainExtension;
//#endregion
//#region src/extensions/events/dom-event.d.ts
/**
 * A function to handle the events fired on the editable DOM element. Returns
 * `true` to indicate that it handled the given event. When returning `true`,
 * you are responsible for calling `event.preventDefault()` yourself (or not, if
 * you want to allow the default behavior).
 *
 * @public
 */
type DOMEventHandler<Event extends keyof DOMEventMap = string> = (view: EditorView, event: DOMEventMap[Event]) => boolean | void;
/**
 * Register a new event handler for the given event type.
 *
 * @public
 */
declare function defineDOMEventHandler<Event extends keyof DOMEventMap = string>(event: Event, handler: DOMEventHandler<Event>): PlainExtension;
//#endregion
//#region src/facets/facet-types.d.ts
/**
 * @internal
 */
type FacetReducer<Input, Output> = (input: Input[]) => Output;
//#endregion
//#region src/facets/facet.d.ts
/**
 * @internal
 */
declare class Facet<Input, Output> {
  private _reducer?;
  private _reduce?;
  /**
   * @internal
   */
  readonly index: number;
  /**
   * @internal
   */
  readonly parent: Facet<Output, any> | null;
  /**
   * @internal
   */
  readonly singleton: boolean;
  /**
   * A index path to retrieve the current facet in a tree from the root.
   *
   * @internal
   */
  readonly path: number[];
  /**
   * @internal
   */
  constructor(parent: Facet<Output, any> | null, singleton: boolean, _reducer?: FacetReducer<Input, Output> | undefined, _reduce?: (() => FacetReducer<Input, Output>) | undefined);
  get reducer(): FacetReducer<Input, Output>;
}
/**
 * @internal
 */
declare function defineFacet<Input, Output>(options: {
  /**
   * The parent facet in the tree.
   */
  parent: Facet<Output, any>;
  /**
   * Set this to true if you only want to keep one facet payload. For example,
   * this facet corresponds to a ProseMirror plugin with a key.
   */
  singleton?: boolean;
  /**
   * A reducer is a function that accepts an array of input and produce a single
   * output.
   */
  reducer?: FacetReducer<Input, Output>;
  /**
   * A callback function that returns a reducer. This is useful if you want to
   * store something in the closure.
   */
  reduce?: () => FacetReducer<Input, Output>;
}): Facet<Input, Output>;
//#endregion
//#region src/facets/state.d.ts
type StatePayload = (ctx: {
  schema: Schema;
}) => EditorStateConfig;
//#endregion
//#region src/extensions/plugin.d.ts
/**
 * Adds a ProseMirror plugin to the editor.
 *
 * @param plugin - The ProseMirror plugin to add, or an array of plugins, or a
 * function that returns one or multiple plugins.
 *
 * @public
 */
declare function definePlugin(plugin: Plugin | Plugin[] | ((context: {
  schema: Schema;
}) => Plugin | Plugin[])): PlainExtension;
/**
 * @internal
 */
type PluginPayload = Plugin | Plugin[] | ((context: {
  schema: Schema;
}) => Plugin | Plugin[]);
/**
 * @internal
 */
declare const pluginFacet: Facet<PluginPayload, StatePayload>;
//#endregion
//#region src/extensions/events/editor-event.d.ts
type KeyDownHandler = (view: EditorView, event: KeyboardEvent) => boolean | void;
type KeyPressHandler = (view: EditorView, event: KeyboardEvent) => boolean | void;
type TextInputHandler = (view: EditorView, from: number, to: number, text: string) => boolean | void;
type ClickOnHandler = (view: EditorView, pos: number, node: Node, nodePos: number, event: MouseEvent, direct: boolean) => boolean | void;
type ClickHandler = (view: EditorView, pos: number, event: MouseEvent) => boolean | void;
type DoubleClickOnHandler = (view: EditorView, pos: number, node: Node, nodePos: number, event: MouseEvent, direct: boolean) => boolean | void;
type DoubleClickHandler = (view: EditorView, pos: number, event: MouseEvent) => boolean | void;
type TripleClickOnHandler = (view: EditorView, pos: number, node: Node, nodePos: number, event: MouseEvent, direct: boolean) => boolean | void;
type TripleClickHandler = (view: EditorView, pos: number, event: MouseEvent) => boolean | void;
type PasteHandler = (view: EditorView, event: ClipboardEvent, slice: Slice) => boolean | void;
type DropHandler = (view: EditorView, event: DragEvent, slice: Slice, moved: boolean) => boolean | void;
type ScrollToSelectionHandler = (view: EditorView) => boolean;
/**
 * @public
 *
 * See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleKeyDown}
 */
declare function defineKeyDownHandler(handler: KeyDownHandler): PlainExtension;
/**
 * @public
 *
 * See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleKeyPress}
 */
declare function defineKeyPressHandler(handler: KeyPressHandler): PlainExtension;
/**
 * @public
 *
 * See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleTextInput}
 */
declare function defineTextInputHandler(handler: TextInputHandler): PlainExtension;
/**
 * @public
 *
 * See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleClickOn}
 */
declare function defineClickOnHandler(handler: ClickOnHandler): PlainExtension;
/**
 * @public
 *
 * See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleClick}
 */
declare function defineClickHandler(handler: ClickHandler): PlainExtension;
/**
 * @public
 *
 * See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleDoubleClickOn}
 */
declare function defineDoubleClickOnHandler(handler: DoubleClickOnHandler): PlainExtension;
/**
 * @public
 *
 * See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleDoubleClick}
 */
declare function defineDoubleClickHandler(handler: DoubleClickHandler): PlainExtension;
/**
 * @public
 *
 * See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleTripleClickOn}
 */
declare function defineTripleClickOnHandler(handler: TripleClickOnHandler): PlainExtension;
/**
 * @public
 *
 * See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleTripleClick}
 */
declare function defineTripleClickHandler(handler: TripleClickHandler): PlainExtension;
/**
 * @public
 *
 * See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste}
 */
declare function definePasteHandler(handler: PasteHandler): PlainExtension;
/**
 * @public
 *
 * See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleDrop}
 */
declare function defineDropHandler(handler: DropHandler): PlainExtension;
/**
 * @public
 *
 * See {@link https://prosemirror.net/docs/ref/#view.EditorProps.handleScrollToSelection}
 */
declare function defineScrollToSelectionHandler(handler: ScrollToSelectionHandler): PlainExtension;
interface EditorEventMap {
  keyDown: KeyDownHandler;
  keyPress: KeyPressHandler;
  textInput: TextInputHandler;
  clickOn: ClickOnHandler;
  click: ClickHandler;
  doubleClickOn: DoubleClickOnHandler;
  doubleClick: DoubleClickHandler;
  tripleClickOn: TripleClickOnHandler;
  tripleClick: TripleClickHandler;
  paste: PasteHandler;
  drop: DropHandler;
  scrollToSelection: ScrollToSelectionHandler;
}
/**
 * @internal
 */
type EditorEventPayload = ObjectEntries<EditorEventMap>;
/**
 * @internal
 */
declare const editorEventFacet: Facet<EditorEventPayload, PluginPayload>;
//#endregion
//#region src/extensions/events/focus.d.ts
/**
 * A function that is called when the editor gains or loses focus.
 *
 * @param hasFocus - Whether the editor has focus.
 *
 * @public
 */
type FocusChangeHandler = (hasFocus: boolean) => void;
/**
 * Registers a event handler that is called when the editor gains or loses focus.
 *
 * @public
 */
declare function defineFocusChangeHandler(handler: FocusChangeHandler): PlainExtension;
//#endregion
//#region src/extensions/events/plugin-view.d.ts
/**
 * A function that is called when the editor view is mounted.
 *
 * @param view - The editor view.
 *
 * @public
 */
type MountHandler = (view: EditorView) => void;
/**
 * A function that is called when the editor state is updated.
 *
 * @param view - The editor view.
 * @param prevState - The previous editor state.
 *
 * @public
 */
type UpdateHandler = (view: EditorView, prevState: EditorState) => void;
/**
 * A function that is called when the editor view is unmounted.
 *
 * @public
 */
type UnmountHandler = () => void;
/**
 * Registers a event handler that is called when the editor view is mounted.
 *
 * @public
 */
declare function defineMountHandler(handler: MountHandler): PlainExtension;
/**
 * Registers a event handler that is called when the editor state is updated.
 *
 * @public
 */
declare function defineUpdateHandler(handler: UpdateHandler): PlainExtension;
/**
 * Registers a event handler that is called when the editor view is unmounted.
 *
 * @public
 */
declare function defineUnmountHandler(handler: UnmountHandler): PlainExtension;
//#endregion
//#region src/extensions/history.d.ts
/**
 * Options for {@link defineHistory}.
 *
 * @public
 */
interface HistoryOptions {
  /**
   * The amount of history events that are collected before the oldest events
   * are discarded.
   *
   * @default 200
   */
  depth?: number;
  /**
   * The delay in milliseconds between changes after which a new group should be
   * started.
   *
   * @default 250
   */
  newGroupDelay?: number;
}
/**
 * @internal
 */
type HistoryExtension = Extension<{
  Commands: {
    undo: [];
    redo: [];
  };
}>;
/**
 * Add undo/redo history to the editor.
 *
 * @param options
 *
 * @public
 */
declare function defineHistory({
  depth,
  newGroupDelay
}?: HistoryOptions): HistoryExtension;
//#endregion
//#region src/extensions/keymap.d.ts
/**
 * A set of keybindings. Please read the
 * [documentation](https://prosemirror.net/docs/ref/#keymap) for more details.
 *
 * @public
 */
interface Keymap {
  [key: string]: Command;
}
/**
 * Adds a set of keybindings to the editor. Please read the
 * [documentation](https://prosemirror.net/docs/ref/#keymap) for more details.
 *
 * @public
 */
declare function defineKeymap(keymap: Keymap): PlainExtension;
/**
 * @internal
 */
type KeymapPayload = Keymap;
/**
 * @internal
 */
declare const keymapFacet: Facet<KeymapPayload, PluginPayload>;
//#endregion
//#region src/extensions/keymap-base.d.ts
/**
 * @internal
 */
type BaseKeymapExtension = PlainExtension;
/**
 * @public
 */
interface BaseKeymapOptions {
  /**
   * The priority of the keymap.
   *
   * @default Priority.low
   */
  priority?: Priority;
  /**
   * If `true`, the first `Mod-a` press selects the current block that the
   * cursor is in, and a second press selects the entire document.
   *
   * If `false`, `Mod-a` immediately selects the entire document.
   *
   * @default true
   */
  preferBlockSelection?: boolean;
}
/**
 * Defines some basic key bindings.
 *
 * @param options
 *
 * @public
 */
declare function defineBaseKeymap({
  priority,
  preferBlockSelection
}?: BaseKeymapOptions): BaseKeymapExtension;
//#endregion
//#region src/extensions/mark-spec.d.ts
/**
 * @public
 */
interface MarkSpecOptions<MarkName extends string = string, Attrs$1 extends AnyAttrs = AnyAttrs> extends MarkSpec {
  /**
   * The name of the mark type.
   */
  name: MarkName;
  /**
   * The attributes that marks of this type get.
   */
  attrs?: { [K in keyof Attrs$1]: AttrSpec<Attrs$1[K]> };
}
/**
 * @public
 */
interface MarkAttrOptions<MarkName extends string = string, AttrName extends string = string, AttrType = any> extends AttrSpec<AttrType> {
  /**
   * The name of the mark type.
   */
  type: MarkName;
  /**
   * The name of the attribute.
   */
  attr: AttrName;
  /**
   * Returns the attribute key and value to be set on the HTML element.
   *
   * If the returned `key` is `"style"`, the value is a string of CSS properties and will
   * be prepended to the existing `style` attribute on the DOM node.
   *
   * @param value - The value of the attribute of current ProseMirror node.
   */
  toDOM?: (value: AttrType) => [key: string, value: string] | null | undefined;
  /**
   * Parses the attribute value from the DOM.
   */
  parseDOM?: (node: HTMLElement) => AttrType;
}
/**
 * Defines a mark type into the editor schema.
 *
 * @public
 *
 * @example
 *
 * ```ts
 * const extension = defineMarkSpec({
 *   name: 'bold',
 *   parseDOM: [
 *     { tag: 'strong' },
 *     { tag: 'b' },
 *   ],
 *   toDOM() {
 *     return ['strong', 0]
 *   },
 * })
 * ```
 */
declare function defineMarkSpec<Mark$1 extends string, Attrs$1 extends AnyAttrs = AnyAttrs>(options: MarkSpecOptions<Mark$1, Attrs$1>): Extension<{
  Marks: { [K in Mark$1]: Attrs$1 };
}>;
/**
 * @public
 */
declare function defineMarkAttr<MarkType$1 extends string = string, AttrName extends string = string, AttrType = any>(options: MarkAttrOptions<MarkType$1, AttrName, AttrType>): Extension<{
  Marks: { [K in MarkType$1]: AttrType };
}>;
//#endregion
//#region src/extensions/mark-view.d.ts
interface MarkViewOptions {
  name: string;
  constructor: MarkViewConstructor;
}
declare function defineMarkView(options: MarkViewOptions): Extension;
//#endregion
//#region src/extensions/mark-view-effect.d.ts
/**
 * @internal
 */
type MarkViewFactoryOptions<T> = {
  group: string;
  factory: (args: T) => MarkViewConstructor;
};
/**
 * @internal
 */
type MarkViewComponentOptions<T> = {
  group: string;
  name: string;
  args: T;
};
/**
 * @internal
 */
declare function defineMarkViewFactory<T>(options: MarkViewFactoryOptions<T>): Extension;
/**
 * @internal
 */
declare function defineMarkViewComponent<T>(options: MarkViewComponentOptions<T>): Extension;
//#endregion
//#region src/extensions/node-spec.d.ts
/**
 * @public
 */
interface NodeSpecOptions<NodeName extends string = string, Attrs$1 extends AnyAttrs = AnyAttrs> extends NodeSpec {
  /**
   * The name of the node type.
   */
  name: NodeName;
  /**
   * Whether this is the top-level node type. Only one node type can be the
   * top-level node type in a schema.
   */
  topNode?: boolean;
  /**
   * The attributes that nodes of this type get.
   */
  attrs?: { [key in keyof Attrs$1]: AttrSpec<Attrs$1[key]> };
}
/**
 * @public
 */
interface NodeAttrOptions<NodeName extends string = string, AttrName extends string = string, AttrType = any> extends AttrSpec<AttrType> {
  /**
   * The name of the node type.
   */
  type: NodeName;
  /**
   * The name of the attribute.
   */
  attr: AttrName;
  /**
   * Whether the attribute should be kept when the node is split. Set it to
   * `true` if you want to inherit the attribute from the previous node when
   * splitting the node by pressing `Enter`.
   *
   * @default undefined
   */
  splittable?: boolean;
  /**
   * Returns the attribute key and value to be set on the HTML element.
   *
   * If the returned `key` is `"style"`, the value is a string of CSS properties and will
   * be prepended to the existing `style` attribute on the DOM node.
   *
   * @param value - The value of the attribute of current ProseMirror node.
   */
  toDOM?: (value: AttrType) => [key: string, value: string] | null | undefined;
  /**
   * Parses the attribute value from the DOM.
   */
  parseDOM?: (node: HTMLElement) => AttrType;
}
/**
 * Defines a node type into the editor schema.
 *
 * @public
 *
 * @example
 *
 * ```ts
 * const extension = defineNodeSpec({
 *   name: 'fancyParagraph',
 *   content: 'inline*',
 *   group: 'block',
 *   parseDOM: [{ tag: 'p.fancy' }],
 *   toDOM() {
 *     return ['p', { 'class': 'fancy' }, 0]
 *   },
 * })
 * ```
 */
declare function defineNodeSpec<Node$1 extends string, Attrs$1 extends AnyAttrs = AnyAttrs>(options: NodeSpecOptions<Node$1, Attrs$1>): Extension<{
  Nodes: { [K in Node$1]: Attrs$1 };
}>;
/**
 * Defines an attribute for a node type.
 *
 * @public
 */
declare function defineNodeAttr<NodeType$1 extends string = string, AttrName extends string = string, AttrType = any>(options: NodeAttrOptions<NodeType$1, AttrName, AttrType>): Extension<{
  Nodes: { [K in NodeType$1]: { [K in AttrName]: AttrType } };
}>;
//#endregion
//#region src/extensions/node-view.d.ts
interface NodeViewOptions {
  name: string;
  constructor: NodeViewConstructor;
}
declare function defineNodeView(options: NodeViewOptions): Extension;
//#endregion
//#region src/extensions/node-view-effect.d.ts
/**
 * @internal
 */
type NodeViewFactoryOptions<T> = {
  group: string;
  factory: (args: T) => NodeViewConstructor;
};
/**
 * @internal
 */
type NodeViewComponentOptions<T> = {
  group: string;
  name: string;
  args: T;
};
/**
 * @internal
 */
declare function defineNodeViewFactory<T>(options: NodeViewFactoryOptions<T>): Extension;
/**
 * @internal
 */
declare function defineNodeViewComponent<T>(options: NodeViewComponentOptions<T>): Extension;
//#endregion
//#region src/facets/facet-extension.d.ts
/**
 * @internal
 */
declare function defineFacetPayload<Input>(facet: Facet<Input, any>, payloads: Input[]): Extension;
//#endregion
//#region src/utils/assert.d.ts
/**
 * @internal
 */
declare function assert(condition: unknown, message?: string): asserts condition;
//#endregion
//#region src/utils/can-use-regex-lookbehind.d.ts
/**
 * Checks if the browser supports [regex lookbehind assertion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookbehind_assertion).
 */
declare const canUseRegexLookbehind: () => boolean;
//#endregion
//#region src/utils/clsx.d.ts
/**
 * A utility for constructing `className` strings conditionally.
 *
 * It is a re-export of [clsx/lite](https://www.npmjs.com/package/clsx) with stricter types.
 *
 * @public
 */
declare const clsx: (...args: Array<string | boolean | null | undefined>) => string;
//#endregion
//#region src/utils/contains-inline-node.d.ts
/**
 * @internal
 */
declare function containsInlineNode(doc: ProseMirrorNode, from: number, to: number): boolean;
//#endregion
//#region src/utils/default-block-at.d.ts
/**
 * @internal
 */
declare function defaultBlockAt(match: ContentMatch): NodeType | null;
//#endregion
//#region src/utils/env.d.ts
/**
 * https://github.com/ProseMirror/prosemirror-keymap/blob/1.2.3/src/keymap.ts#L5
 *
 * @internal
 */
declare const isApple: boolean;
//#endregion
//#region src/utils/find-parent-node.d.ts
/**
 * @public
 */
interface FindParentNodeResult {
  /**
   * The closest parent node that satisfies the predicate.
   */
  node: ProseMirrorNode;
  /**
   * The position directly before the node.
   */
  pos: number;
  /**
   * The position at the start of the node.
   */
  start: number;
  /**
   * The depth of the node.
   */
  depth: number;
}
/**
 * Find the closest parent node that satisfies the predicate.
 *
 * @public
 */
declare function findParentNode(
/**
 * The predicate to test the parent node.
 */
predicate: (node: ProseMirrorNode) => boolean,
/**
 * The position to start searching from.
 */
$pos: ResolvedPos): FindParentNodeResult | undefined;
//#endregion
//#region src/utils/find-parent-node-of-type.d.ts
/**
 * Finds the closest parent node that matches the given node type.
 *
 * @public
 */
declare function findParentNodeOfType(
/**
 * The type of the node to find.
 */
type: NodeType | string,
/**
 * The position to start searching from.
 */
$pos: ResolvedPos): FindParentNodeResult | undefined;
//#endregion
//#region src/utils/get-mark-type.d.ts
/**
 * @internal
 */
declare function getMarkType(schema: Schema, type: string | MarkType): MarkType;
//#endregion
//#region src/utils/get-node-type.d.ts
/**
 * @internal
 */
declare function getNodeType(schema: Schema, type: string | NodeType): NodeType;
//#endregion
//#region src/utils/is-at-block-start.d.ts
/**
 * Whether the selection is an empty text selection at the start of a block.
 *
 * @internal
 */
declare function isAtBlockStart(state: EditorState, view?: EditorView): ResolvedPos | null;
//#endregion
//#region src/utils/is-in-code-block.d.ts
/**
 * Check if the selection is in a code block.
 *
 * @internal
 */
declare function isInCodeBlock(selection: Selection): boolean;
//#endregion
//#region src/utils/is-mark-absent.d.ts
/**
 * Returns true if the given mark is missing in some part of the range.
 * Returns false if the entire range has the given mark.
 * Returns true if the mark is not allowed in the range.
 *
 * @internal
 */
declare function isMarkAbsent(node: ProseMirrorNode, from: number, to: number, markType: MarkType, attrs?: Attrs | null): boolean;
//#endregion
//#region src/utils/is-mark-active.d.ts
/**
 * @internal
 */
declare function isMarkActive(state: EditorState, type: string | MarkType, attrs?: Attrs | null): boolean;
//#endregion
//#region src/utils/maybe-run.d.ts
/**
 * @internal
 */
declare function maybeRun<Value, Args extends unknown[]>(value: Value | ((...args: Args) => Value), ...args: Args): Value;
//#endregion
//#region src/utils/set-selection-around.d.ts
declare function setSelectionAround(tr: Transaction, pos: number): void;
//#endregion
//#region src/utils/type-assertion.d.ts
/**
 * Checks if the given object is a {@link ProseMirrorNode} instance.
 */
declare function isProseMirrorNode(value: unknown): value is ProseMirrorNode;
/**
 * Checks if the given object is a {@link Mark} instance.
 *
 * @public
 */
declare function isMark(value: unknown): value is Mark;
/**
 * Checks if the given object is a {@link Fragment} instance.
 *
 * @public
 */
declare function isFragment(value: unknown): value is Fragment;
/**
 * Checks if the given object is a {@link Slice} instance.
 *
 * @public
 */
declare function isSlice(value: unknown): value is Slice;
/**
 * Checks if the given object is a {@link Selection} instance.
 *
 * @public
 */
declare function isSelection(value: unknown): value is Selection;
/**
 * Checks if the given object is a {@link TextSelection} instance.
 *
 * @public
 */
declare function isTextSelection(value: Selection): value is TextSelection;
/**
 * Checks if the given object is a {@link NodeSelection} instance.
 *
 * @public
 */
declare function isNodeSelection(value: Selection): value is NodeSelection;
/**
 * Checks if the given object is a {@link AllSelection} instance.
 *
 * @public
 */
declare function isAllSelection(value: Selection): value is AllSelection;
//#endregion
//#region src/utils/unicode.d.ts
/**
 * @internal
 */
declare const OBJECT_REPLACEMENT_CHARACTER = "\uFFFC";
//#endregion
//#region src/utils/with-skip-code-block.d.ts
/**
 * @internal
 */
declare function withSkipCodeBlock(command: Command): Command;
//#endregion
export { type AddMarkOptions, type AnyAttrs, type AnyFunction, type AttrSpec, type BaseCommandsExtension, type BaseKeymapExtension, type BaseKeymapOptions, type ClickHandler, type ClickOnHandler, type ClipboardSerializerOptions, type CommandAction, type CommandTyping, type DOMDocumentOptions, type DOMEventHandler, type DOMParserOptions, type DOMSerializerOptions, type DefaultStateOptions, type DocChangeHandler, type DoubleClickHandler, type DoubleClickOnHandler, type DropHandler, Editor, type EditorEventPayload, EditorNotFoundError, type EditorOptions, type ExpandMarkOptions, type Extension, type ExtensionTyping, type ExtractCommandActions, type ExtractCommandCreators, type ExtractCommands, type ExtractMarkActions, type ExtractMarks, type ExtractNodeActions, type ExtractNodes, type ExtractTyping, type Facet, type FindParentNodeResult, type FocusChangeHandler, type HistoryExtension, type HistoryOptions, type InsertDefaultBlockOptions, type InsertNodeOptions, type JSONParserOptions, type KeyDownHandler, type KeyPressHandler, type Keymap, type KeymapPayload, type MarkAction, type MarkAttrOptions, type MarkSpecOptions, type MarkTyping, type MarkViewComponentOptions, type MarkViewFactoryOptions, type MarkViewOptions, type MountHandler, type NodeAction, type NodeAttrOptions, type NodeChild, type NodeJSON, type NodeSpecOptions, type NodeTyping, type NodeViewComponentOptions, type NodeViewFactoryOptions, type NodeViewOptions, OBJECT_REPLACEMENT_CHARACTER, type PasteHandler, type PickSubType, type PlainExtension, type PluginPayload, Priority, ProseKitError, type RemoveMarkOptions, type RemoveNodeOptions, type ScrollToSelectionHandler, type SelectionJSON, type SetBlockTypeOptions, type SetNodeAttrsOptions, type SimplifyDeeper, type SimplifyUnion, type StateJSON, type StepJSON, type TextInputHandler, type ToMarkAction, type ToNodeAction, type ToggleMarkOptions, type ToggleNodeOptions, type ToggleWrapOptions, type TripleClickHandler, type TripleClickOnHandler, type Union, type UnmountHandler, type UnsetBlockTypeOptions, type UnsetMarkOptions, type UpdateHandler, type WrapOptions, addMark, assert, canUseRegexLookbehind, clsx, containsInlineNode, createEditor, defaultBlockAt, defineBaseCommands, defineBaseKeymap, defineClickHandler, defineClickOnHandler, defineClipboardSerializer, defineCommands, defineDOMEventHandler, defineDefaultState, defineDocChangeHandler, defineDoubleClickHandler, defineDoubleClickOnHandler, defineDropHandler, defineFacet, defineFacetPayload, defineFocusChangeHandler, defineHistory, defineKeyDownHandler, defineKeyPressHandler, defineKeymap, defineMarkAttr, defineMarkSpec, defineMarkView, defineMarkViewComponent, defineMarkViewFactory, defineMountHandler, defineNodeAttr, defineNodeSpec, defineNodeView, defineNodeViewComponent, defineNodeViewFactory, definePasteHandler, definePlugin, defineScrollToSelectionHandler, defineTextInputHandler, defineTripleClickHandler, defineTripleClickOnHandler, defineUnmountHandler, defineUpdateHandler, editorEventFacet, elementFromJSON, elementFromNode, expandMark, findParentNode, findParentNodeOfType, getMarkType, getNodeType, htmlFromJSON, htmlFromNode, insertDefaultBlock, insertNode, isAllSelection, isApple, isAtBlockStart, isFragment, isInCodeBlock, isMark, isMarkAbsent, isMarkActive, isNodeSelection, isProseMirrorNode, isSelection, isSlice, isTextSelection, jsonFromHTML, jsonFromNode, jsonFromState, keymapFacet, maybeRun, nodeFromElement, nodeFromHTML, nodeFromJSON, pluginFacet, removeMark, removeNode, selectAll, selectBlock, setBlockType, setNodeAttrs, setSelectionAround, stateFromJSON, toggleMark, toggleNode, toggleWrap, union, unsetBlockType, unsetMark, withPriority, withSkipCodeBlock, wrap };
//# sourceMappingURL=prosekit-core.d.ts.map