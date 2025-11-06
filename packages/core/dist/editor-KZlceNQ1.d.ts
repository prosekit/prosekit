import { Command, EditorState, Plugin, Selection } from "@prosekit/pm/state";
import { Attrs, DOMParser, DOMSerializer, Mark, NodeType, ParseOptions, ProseMirrorNode, Schema } from "@prosekit/pm/model";
import { EditorView } from "@prosekit/pm/view";
import { Simplify, UnionToIntersection } from "type-fest";

//#region src/types/attrs.d.ts
/**
 * An object holding the attributes of a node.

 * @public
 */
type AnyAttrs = Attrs;
/**
 * @public
 */
type AttrSpec<AttrType = any> = {
  /**
   * The default value for this attribute, to use when no explicit value is
   * provided. Attributes that have no default must be provided whenever a node
   * or mark of a type that has them is created.
   */
  default?: AttrType;
  /**
   * A function or type name used to validate values of this attribute. This
   * will be used when deserializing the attribute from JSON, and when running
   * [`Node.check`](https://prosemirror.net/docs/ref/#model.Node.check). When a
   * function, it should raise an exception if the value isn't of the expected
   * type or shape. When a string, it should be a `|`-separated string of
   * primitive types (`"number"`, `"string"`, `"boolean"`, `"null"`, and
   * `"undefined"`), and the library will raise an error when the value is not
   * one of those types.
   */
  validate?: string | ((value: unknown) => void);
};
//#endregion
//#region src/editor/action.d.ts
/**
 * Available children parameters for {@link NodeAction} and {@link MarkAction}.
 *
 * @public
 */
type NodeChild = ProseMirrorNode | string | NodeChild[];
/**
 * A function for creating a node with optional attributes and any number of
 * children.
 *
 * It also has a `isActive` method for checking if the node is active in the
 * current editor selection.
 *
 * @public
 */
interface NodeAction<Attrs$1 extends AnyAttrs = AnyAttrs> {
  /**
   * Creates a node with attributes and any number of children.
   */
  (attrs: Attrs$1 | null, ...children: NodeChild[]): ProseMirrorNode;
  /**
   * Creates a node with any number of children.
   */
  (...children: NodeChild[]): ProseMirrorNode;
  /**
   * Checks if the node is active in the current editor selection. If the
   * optional `attrs` parameter is provided, it will check if the node is active
   * with the given attributes.
   */
  isActive: (attrs?: Attrs$1) => boolean;
}
/**
 * A function for applying a mark with optional attributes and any number of
 * children.
 *
 * It also has a `isActive` method for checking if the mark is active in the
 * current editor selection.
 *
 * @public
 */
interface MarkAction<Attrs$1 extends AnyAttrs = AnyAttrs> {
  /**
   * Applies a mark with attributes and any number of children.
   */
  (attrs: Attrs$1 | null, ...children: NodeChild[]): ProseMirrorNode[];
  /**
   * Applies a mark with any number of children.
   */
  (...children: NodeChild[]): ProseMirrorNode[];
  /**
   * Checks if the mark is active in the current editor selection. If the
   * optional `attrs` parameter is provided, it will check if the mark is active
   * with the given attributes.
   */
  isActive: (attrs?: Attrs$1) => boolean;
}
/**
 * @deprecated Use type {@link NodeAction} instead.
 */
type NodeBuilder = NodeAction;
/**
 * @deprecated Use type {@link MarkAction} instead.
 */
type MarkBuilder = MarkAction;
//#endregion
//#region src/types/extension-command.d.ts
/**
 * A function to apply a command to the editor. It will return `true` if the command was applied, and `false` otherwise.
 *
 * It also has a `canExec` method to check if the command can be applied.
 *
 * @public
 */
interface CommandAction<Args extends any[] = any[]> {
  /**
   * Execute the current command. Return `true` if the command was successfully
   * executed, otherwise `false`.
   */
  (...args: Args): boolean;
  /**
   * Check if the current command can be executed. Return `true` if the command
   * can be executed, otherwise `false`.
   */
  canExec(...args: Args): boolean;
  /**
   * An alias for `canExec`.
   *
   * @deprecated Use `canExec` instead.
   */
  canApply(...args: Args): boolean;
}
type CommandCreator<Args extends any[] = any[]> = (...arg: Args) => Command;
/**
 * @internal
 */
interface CommandTyping {
  [name: string]: any[];
}
type ToCommandCreators<T extends CommandTyping> = { [K in keyof T]: CommandCreator<T[K]> };
type ToCommandAction<T extends CommandTyping> = { [K in keyof T]: CommandAction<T[K]> };
//#endregion
//#region src/types/extension-mark.d.ts
/**
 * @internal
 */
interface MarkTyping {
  [name: string]: Record<string, any>;
}
/**
 * @internal
 */
type ToMarkAction<T extends MarkTyping> = { [K in keyof T]: MarkAction<T[K]> };
//#endregion
//#region src/types/extension-node.d.ts
/**
 * @internal
 */
interface NodeTyping {
  [name: string]: Record<string, any>;
}
/**
 * @internal
 */
type ToNodeAction<T extends NodeTyping> = { [K in keyof T]: NodeAction<T[K]> };
//#endregion
//#region src/types/pick-sub-type.d.ts
/**
 * @internal
 */
type PickSubType<Type, ParentType> = Type extends ParentType ? [ParentType] extends [Type] ? never : Type : never;
//#endregion
//#region src/types/pick-string-literal.d.ts
/**
 * @internal
 */
type PickStringLiteral<T> = PickSubType<T, string>;
//#endregion
//#region src/types/priority.d.ts
/**
 * ProseKit extension priority.
 *
 * @public
 */
declare enum Priority {
  lowest = 0,
  low = 1,
  default = 2,
  high = 3,
  highest = 4,
}
//#endregion
//#region src/types/simplify-deeper.d.ts
/**
 * @internal
 */
type SimplifyDeeper<T> = { [KeyType in keyof T]: Simplify<T[KeyType]> };
//#endregion
//#region src/types/simplify-union.d.ts
/**
 * @internal
 */
type SimplifyUnion<T> = Simplify<UnionToIntersection<T extends undefined ? never : T>>;
//#endregion
//#region src/types/extension.d.ts
/**
 * @internal
 */
interface ExtensionTyping<N$1 extends NodeTyping = never, M$1 extends MarkTyping = never, C$1 extends CommandTyping = never> {
  Nodes?: N$1;
  Marks?: M$1;
  Commands?: C$1;
}
/**
 * @public
 */
interface Extension<T extends ExtensionTyping<any, any, any> = ExtensionTyping<any, any, any>> {
  extension: Extension | Extension[];
  priority?: Priority;
  /**
   * @public
   *
   * The schema that this extension represents.
   */
  schema: Schema | null;
  /** @internal */
  _type?: T;
}
/**
 * @internal
 */
type ExtractTyping<E extends Extension> = E extends Extension<ExtensionTyping<infer N, infer M, infer C>> ? ExtensionTyping<PickSubType<N, NodeTyping>, PickSubType<M, MarkTyping>, PickSubType<C, CommandTyping>> : never;
/**
 * An extension that does not define any nodes, marks, or commands.
 *
 * @internal
 */
type PlainExtension = Extension<{
  Nodes: never;
  Marks: never;
  Commands: never;
}>;
/**
 * @public
 */
type ExtractNodes<E extends Extension> = SimplifyDeeper<SimplifyUnion<ExtractTyping<E>['Nodes']>>;
/**
 * @public
 */
type ExtractNodeNames<E extends Extension> = PickStringLiteral<keyof ExtractNodes<E>>;
/**
 * @public
 */
type ExtractMarks<E extends Extension> = SimplifyDeeper<SimplifyUnion<ExtractTyping<E>['Marks']>>;
/**
 * @public
 */
type ExtractMarkNames<E extends Extension> = PickStringLiteral<keyof ExtractMarks<E>>;
/**
 * @internal
 */
type ExtractCommands<E extends Extension> = SimplifyUnion<ExtractTyping<E>['Commands']>;
/**
 * @public
 */
type ExtractCommandCreators<E extends Extension> = ToCommandCreators<ExtractCommands<E>>;
/**
 * Extracts the {@link CommandAction}s from an extension type.
 *
 * @public
 */
type ExtractCommandActions<E extends Extension> = ToCommandAction<ExtractCommands<E>>;
/**
 * Extracts the {@link NodeAction}s from an extension type.
 *
 * @public
 */
type ExtractNodeActions<E extends Extension> = ToNodeAction<ExtractNodes<E>>;
/**
 * Extracts the {@link MarkAction}s from an extension type.
 *
 * @public
 */
type ExtractMarkActions<E extends Extension> = ToMarkAction<ExtractMarks<E>>;
/**
 * @deprecated Use `ExtractCommandActions` instead.
 */
type ExtractCommandAppliers<E extends Extension> = ExtractCommandActions<E>;
/**
 * @internal
 */
type Union<E extends readonly Extension[]> = Extension<{
  Nodes: ExtractNodes<E[number]>;
  Marks: ExtractMarks<E[number]>;
  Commands: ExtractCommands<E[number]>;
}>;
/**
 * @deprecated Use `Union` instead.
 * @internal
 */
type UnionExtension<E extends Extension | readonly Extension[]> = E extends readonly Extension[] ? Extension<{
  Nodes: ExtractNodes<E[number]>;
  Marks: ExtractMarks<E[number]>;
  Commands: ExtractCommands<E[number]>;
}> : E;
//#endregion
//#region src/types/model.d.ts
/**
 * A JSON representation of the prosemirror node.
 *
 * @public
 */
interface NodeJSON {
  type: string;
  marks?: Array<{
    type: string;
    attrs?: Record<string, any>;
  }>;
  text?: string;
  content?: NodeJSON[];
  attrs?: Record<string, any>;
}
/**
 * A JSON representation of the prosemirror selection.
 *
 * @public
 */
interface SelectionJSON {
  anchor: number;
  head: number;
  type: string;
}
/**
 * A JSON representation of the prosemirror state.
 *
 * @public
 */
interface StateJSON {
  /**
   * The main `ProseMirror` doc.
   */
  doc: NodeJSON;
  /**
   * The current selection.
   */
  selection: SelectionJSON;
}
/**
 * A JSON representation of the prosemirror step.
 *
 * @public
 */
interface StepJSON {
  /**
   * The type of the step.
   */
  stepType: string;
  [x: string]: unknown;
}
//#endregion
//#region src/types/dom-node.d.ts
type DOMNode = InstanceType<typeof window.Node>;
//#endregion
//#region src/utils/parse.d.ts
/** @public */
interface DOMParserOptions extends ParseOptions {
  DOMParser?: typeof DOMParser;
}
/** @public */
interface DOMSerializerOptions {
  DOMSerializer?: {
    fromSchema: typeof DOMSerializer.fromSchema;
  };
}
/** @public */
interface DOMDocumentOptions {
  /**
   * The Document object to use for DOM operations. If not provided, defaults to
   * the current browser's document object. Useful for server-side rendering or
   * testing environments.
   */
  document?: Document;
}
/** @public */
interface JSONParserOptions {
  /**
   * The editor schema to use.
   */
  schema: Schema;
}
/**
 * Return a JSON object representing this state.
 *
 * @public
 *
 * @example
 *
 * ```ts
 * const state = editor.state
 * const json = jsonFromState(state)
 * ```
 */
declare function jsonFromState(state: EditorState): StateJSON;
/**
 * Parse a JSON object to a ProseMirror state.
 *
 * @public
 *
 * @example
 *
 * ```ts
 * const json = { state: { type: 'doc', content: [{ type: 'paragraph' }], selection: { type: 'text', from: 1, to: 1 } } }
 * const state = stateFromJSON(json, { schema: editor.schema })
 * ```
 */
declare function stateFromJSON(json: StateJSON, options: JSONParserOptions): EditorState;
/**
 * Return a JSON object representing this node.
 *
 * @public
 *
 * @example
 *
 * ```ts
 * const node = editor.state.doc
 * const json = jsonFromNode(node)
 * ```
 */
declare function jsonFromNode(node: ProseMirrorNode): NodeJSON;
/**
 * Parse a JSON object to a ProseMirror node.
 *
 * @public
 *
 * @example
 *
 * ```ts
 * const json = { type: 'doc', content: [{ type: 'paragraph' }] }
 * const node = nodeFromJSON(json, { schema: editor.schema })
 * ```
 */
declare function nodeFromJSON(json: NodeJSON, options: JSONParserOptions): ProseMirrorNode;
/**
 * Parse a HTML element to a ProseMirror node.
 *
 * @public
 *
 * @example
 *
 * ```ts
 * const element = document.getElementById('content')
 * const node = nodeFromElement(element, { schema: editor.schema })
 * ```
 */
declare function nodeFromElement(element: DOMNode, options: DOMParserOptions & JSONParserOptions): ProseMirrorNode;
/**
 * Serialize a ProseMirror node to a HTML element.
 *
 * @public
 *
 * @example
 *
 * ```ts
 * const node = editor.state.doc
 * const element = elementFromNode(node)
 * ```
 */
declare function elementFromNode(node: ProseMirrorNode, options?: DOMSerializerOptions & DOMDocumentOptions): HTMLElement;
/**
 * Parse a HTML string to a ProseMirror node.
 *
 * @public
 *
 * @example
 *
 * ```ts
 * const html = '<p>Hello, world!</p>'
 * const node = nodeFromHTML(html, { schema: editor.schema })
 * ```
 */
declare function nodeFromHTML(html: string, options: DOMParserOptions & JSONParserOptions & DOMDocumentOptions): ProseMirrorNode;
/**
 * Serialize a ProseMirror node to a HTML string
 *
 * @public
 *
 * @example
 *
 * ```ts
 * const node = document.getElementById('content')
 * const html = htmlFromNode(node)
 * ```
 */
declare function htmlFromNode(node: ProseMirrorNode, options?: DOMSerializerOptions & DOMDocumentOptions): string;
/**
 * Parse a ProseMirror document JSON object to a HTML element.
 *
 * @public
 *
 * @example
 *
 * ```ts
 * const json = { type: 'doc', content: [{ type: 'paragraph' }] }
 * const element = elementFromJSON(json, { schema: editor.schema })
 * ```
 */
declare function elementFromJSON(json: NodeJSON, options: JSONParserOptions & DOMSerializerOptions & DOMDocumentOptions): HTMLElement;
/**
 * Parse a HTML string to a ProseMirror document JSON object.
 *
 * @public
 *
 * @example
 *
 * ```ts
 * const html = '<p>Hello, world!</p>'
 * const json = jsonFromHTML(html, { schema: editor.schema })
 * ```
 */
declare function jsonFromHTML(html: string, options: DOMDocumentOptions & DOMParserOptions & JSONParserOptions): NodeJSON;
/**
 * Parse a ProseMirror document JSON object to a HTML string.
 *
 * @public
 *
 * @example
 *
 * ```ts
 * const json = { type: 'doc', content: [{ type: 'paragraph' }] }
 * const html = htmlFromJSON(json, { schema: editor.schema })
 * ```
 */
declare function htmlFromJSON(json: NodeJSON, options: JSONParserOptions & DOMSerializerOptions & DOMDocumentOptions): string;
//#endregion
//#region src/editor/editor.d.ts
/**
 * @public
 */
interface EditorOptions<E extends Extension> {
  /**
   * The extension to use when creating the editor.
   */
  extension: E;
  /**
   * The starting document to use when creating the editor. It can be a
   * ProseMirror node JSON object, a HTML string, or a HTML element instance.
   */
  defaultContent?: NodeJSON | string | HTMLElement;
  /**
   * A JSON object representing the starting document to use when creating the
   * editor.
   *
   * @deprecated Use `defaultContent` instead.
   */
  defaultDoc?: NodeJSON;
  /**
   * A HTML element or a HTML string representing the starting document to use
   * when creating the editor.
   *
   * @deprecated Use `defaultContent` instead.
   */
  defaultHTML?: string | HTMLElement;
  /**
   * A JSON object representing the starting selection to use when creating the
   * editor. It's only used when `defaultContent` is also provided.
   */
  defaultSelection?: SelectionJSON;
}
/**
 * @public
 */
interface getDocHTMLOptions extends DOMDocumentOptions {}
/**
 * @public
 */
declare function createEditor<E extends Extension>(options: EditorOptions<E>): Editor<E>;
/**
 * An internal class to make TypeScript generic type easier to use.
 *
 * @internal
 */
declare class EditorInstance {
  view: EditorView | null;
  schema: Schema;
  nodes: Record<string, NodeAction>;
  marks: Record<string, MarkAction>;
  commands: Record<string, CommandAction>;
  private tree;
  private directEditorProps;
  private afterMounted;
  constructor(extension: Extension);
  getState: () => EditorState;
  private getDoc;
  private getProp;
  updateState(state: EditorState): void;
  private dispatch;
  setContent(content: NodeJSON | string | HTMLElement | ProseMirrorNode, selection?: SelectionJSON | Selection | 'start' | 'end'): void;
  /**
   * Return a JSON object representing the editor's current document.
   */
  getDocJSON: () => NodeJSON;
  /**
   * Return a HTML string representing the editor's current document.
   */
  getDocHTML: (options?: getDocHTMLOptions) => string;
  private updateExtension;
  use(extension: Extension): VoidFunction;
  mount(place: HTMLElement): void;
  unmount(): void;
  get mounted(): boolean;
  get assertView(): EditorView;
  definePlugins(plugins: readonly Plugin[]): void;
  removePlugins(plugins: readonly Plugin[]): void;
  exec(command: Command): boolean;
  canExec(command: Command): boolean;
  defineCommand<Args extends any[] = any[]>(name: string, commandCreator: CommandCreator<Args>): void;
  removeCommand(name: string): void;
}
/**
 * @public
 */
declare class Editor<E extends Extension = any> {
  private instance;
  /**
   * @internal
   */
  constructor(instance: EditorInstance);
  /**
   * Whether the editor is mounted.
   */
  get mounted(): boolean;
  /**
   * The editor view.
   */
  get view(): EditorView;
  /**
   * The editor schema.
   */
  get schema(): Schema<ExtractNodeNames<E>, ExtractMarkNames<E>>;
  /**
   * The editor's current state.
   */
  get state(): EditorState;
  /**
   * Whether the editor is focused.
   */
  get focused(): boolean;
  /**
   * Mount the editor to the given HTML element.
   * Pass `null` or `undefined` to unmount the editor.
   */
  mount: (place: HTMLElement | null | undefined) => void;
  /**
   * Unmount the editor. This is equivalent to `mount(null)`.
   */
  unmount: () => void;
  /**
   * Focus the editor.
   */
  focus: () => void;
  /**
   * Blur the editor.
   */
  blur: () => void;
  /**
   * Register an extension to the editor. Return a function to unregister the
   * extension.
   */
  use: (extension: Extension) => VoidFunction;
  /**
   * Update the editor's state.
   *
   * @remarks
   *
   * This is an advanced method. Use it only if you have a specific reason to
   * directly manipulate the editor's state.
   */
  updateState: (state: EditorState) => void;
  /**
   * Update the editor's document and selection.
   *
   * @param content - The new document to set. It can be one of the following:
   *   - A ProseMirror node instance
   *   - A ProseMirror node JSON object
   *   - An HTML string
   *   - An HTML element instance
   * @param selection - Optional. Specifies the new selection. It can be one of the following:
   *   - A ProseMirror selection instance
   *   - A ProseMirror selection JSON object
   *   - The string "start" (to set selection at the beginning, default value)
   *   - The string "end" (to set selection at the end)
   */
  setContent: (content: ProseMirrorNode | NodeJSON | string | HTMLElement, selection?: SelectionJSON | Selection | "start" | "end") => void;
  /**
   * Return a JSON object representing the editor's current document.
   */
  getDocJSON: () => NodeJSON;
  /**
   * Return a HTML string representing the editor's current document.
   */
  getDocHTML: (options?: getDocHTMLOptions) => string;
  /**
   * Execute the given command. Return `true` if the command was successfully
   * executed, otherwise `false`.
   */
  exec: (command: Command) => boolean;
  /**
   * Check if the given command can be executed. Return `true` if the command
   * can be executed, otherwise `false`.
   */
  canExec: (command: Command) => boolean;
  /**
   * All {@link CommandAction}s defined by the editor.
   */
  get commands(): ExtractCommandActions<E>;
  /**
   * All {@link NodeAction}s defined by the editor.
   */
  get nodes(): ExtractNodeActions<E>;
  /**
   * All {@link MarkAction}s defined by the editor.
   */
  get marks(): ExtractMarkActions<E>;
}
//#endregion
export { NodeChild as $, ExtractMarkActions as A, Priority as B, StepJSON as C, ExtractCommandAppliers as D, ExtractCommandActions as E, PlainExtension as F, ToMarkAction as G, NodeTyping as H, Union as I, CommandTyping as J, CommandAction as K, UnionExtension as L, ExtractNodeActions as M, ExtractNodes as N, ExtractCommandCreators as O, ExtractTyping as P, NodeBuilder as Q, SimplifyUnion as R, StateJSON as S, ExtensionTyping as T, ToNodeAction as U, PickSubType as V, MarkTyping as W, MarkBuilder as X, MarkAction as Y, NodeAction as Z, nodeFromHTML as _, DOMDocumentOptions as a, NodeJSON as b, JSONParserOptions as c, htmlFromJSON as d, AnyAttrs as et, htmlFromNode as f, nodeFromElement as g, jsonFromState as h, createEditor as i, ExtractMarks as j, ExtractCommands as k, elementFromJSON as l, jsonFromNode as m, EditorInstance as n, DOMParserOptions as o, jsonFromHTML as p, CommandCreator as q, EditorOptions as r, DOMSerializerOptions as s, Editor as t, AttrSpec as tt, elementFromNode as u, nodeFromJSON as v, Extension as w, SelectionJSON as x, stateFromJSON as y, SimplifyDeeper as z };
//# sourceMappingURL=editor-KZlceNQ1.d.ts.map