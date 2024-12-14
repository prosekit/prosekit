# prosekit/core

## Priority {#priority}

ProseKit extension priority.

<dl>

<dt>

`default = 2`

</dt>

<dd>

</dd>

<dt>

`high = 3`

</dt>

<dd>

</dd>

<dt>

`highest = 4`

</dt>

<dd>

</dd>

<dt>

`low = 1`

</dt>

<dd>

</dd>

<dt>

`lowest = 0`

</dt>

<dd>

</dd>

</dl>

## Editor {#editor}

<dl>

<dt>

`get commands(): ToCommandAction<{[KeyType in string | number | symbol]: UnionToIntersection<ExtractTyping<E>["Commands"] extends undefined ? never : ExtractTyping<E>["Commands"]>[KeyType]}>`

</dt>

<dd>

All [CommandAction](core.md#command-action)s defined by the editor.

</dd>

<dt>

`get focused(): boolean`

</dt>

<dd>

Whether the editor is focused.

</dd>

<dt>

`get marks(): ToMarkAction<SimplifyDeeper<{[KeyType in string | number | symbol]: UnionToIntersection<ExtractTyping<E>["Marks"] extends undefined ? never : ExtractTyping<E>["Marks"]>[KeyType]}>>`

</dt>

<dd>

All [MarkAction](core.md#mark-action)s defined by the editor.

</dd>

<dt>

`get mounted(): boolean`

</dt>

<dd>

Whether the editor is mounted.

</dd>

<dt>

`get nodes(): ToNodeAction<SimplifyDeeper<{[KeyType in string | number | symbol]: UnionToIntersection<ExtractTyping<E>["Nodes"] extends undefined ? never : ExtractTyping<E>["Nodes"]>[KeyType]}>>`

</dt>

<dd>

All [NodeAction](core.md#node-action)s defined by the editor.

</dd>

<dt>

`get schema(): Schema<ExtractNodeNames<E>, ExtractMarkNames<E>>`

</dt>

<dd>

The editor schema.

</dd>

<dt>

`get state(): EditorState`

</dt>

<dd>

The editor's current state.

</dd>

<dt>

`get view(): EditorView`

</dt>

<dd>

The editor view.

</dd>

<dt>

`blur`

</dt>

<dd>

Blur the editor.

```ts
const blur: () => void
```

</dd>

<dt>

`canExec`

</dt>

<dd>

Check if the given command can be executed. Return `true` if the command
can be executed, otherwise `false`.

```ts
const canExec: (command: Command) => boolean
```

</dd>

<dt>

`exec`

</dt>

<dd>

Execute the given command. Return `true` if the command was successfully
executed, otherwise `false`.

```ts
const exec: (command: Command) => boolean
```

</dd>

<dt>

`focus`

</dt>

<dd>

Focus the editor.

```ts
const focus: () => void
```

</dd>

<dt>

`mount`

</dt>

<dd>

Mount the editor to the given HTML element.
Pass `null` or `undefined` to unmount the editor.

```ts
const mount: (place: undefined | null | HTMLElement) => void
```

</dd>

<dt>

`setContent`

</dt>

<dd>

Update the editor's document and selection.

```ts
const setContent: (content: string | Node | NodeJSON | HTMLElement, selection?: Selection | "start" | SelectionJSON | "end") => void
```

</dd>

<dt>

`unmount`

</dt>

<dd>

Unmount the editor. This is equivalent to `mount(null)`.

```ts
const unmount: () => void
```

</dd>

<dt>

`updateState`

</dt>

<dd>

Update the editor's state.

**Remarks**

This is an advanced method. Use it only if you have a specific reason to
directly manipulate the editor's state.

```ts
const updateState: (state: EditorState) => void
```

</dd>

<dt>

`use`

</dt>

<dd>

Register an extension to the editor. Return a function to unregister the
extension.

```ts
const use: (extension: Extension<ExtensionTyping<any, any, any>>) => VoidFunction
```

</dd>

</dl>

## AddMarkOptions {#add-mark-options}

<dl>

<dt>

`attrs?: null | Attrs`

</dt>

<dd>

The attributes of the mark to add.

</dd>

<dt>

`from?: number`

</dt>

<dd>

The start position of the document. By default it will be the start position of current selection.

</dd>

<dt>

`to?: number`

</dt>

<dd>

The end position of the document. By default it will be the end position of current selection.

</dd>

<dt>

`type: string | MarkType`

</dt>

<dd>

The type of the mark to add.

</dd>

</dl>

## BaseNodeViewOptions {#base-node-view-options}

Some basic props for custom node views.

<dl>

<dt>

`as?: string | HTMLElement | ((node: Node) => HTMLElement)`

</dt>

<dd>

The wrapping DOM element for the node view. Defaults to `div` for block nodes and `span` for inline nodes.

</dd>

<dt>

`contentAs?: string | HTMLElement | ((node: Node) => HTMLElement)`

</dt>

<dd>

The wrapping DOM element for the node view's content. Defaults to `div` for block nodes and `span` for inline nodes.

</dd>

<dt>

`deselectNode?: () => void`

</dt>

<dd>

</dd>

<dt>

`destroy?: () => void`

</dt>

<dd>

</dd>

<dt>

`ignoreMutation?: (mutation: ViewMutationRecord) => boolean`

</dt>

<dd>

</dd>

<dt>

`onUpdate?: () => void`

</dt>

<dd>

</dd>

<dt>

`selectNode?: () => void`

</dt>

<dd>

</dd>

<dt>

`setSelection?: (anchor: number, head: number, root: Document | ShadowRoot) => void`

</dt>

<dd>

</dd>

<dt>

`stopEvent?: (event: Event) => boolean`

</dt>

<dd>

</dd>

<dt>

`update?: (node: Node, decorations: readonly Decoration[], innerDecorations: DecorationSource) => boolean`

</dt>

<dd>

</dd>

</dl>

## CommandAction {#command-action}

A function to apply a command to the editor. It will return `true` if the command was applied, and `false` otherwise.

It also has a `canExec` method to check if the command can be applied.

<dl>

<dt>

`canApply`

</dt>

<dd>

An alias for `canExec`.

**Deprecated**

Use `canExec` instead.

```ts
const canApply: (...args: Args) => boolean
```

</dd>

<dt>

`canExec`

</dt>

<dd>

Check if the current command can be executed. Return `true` if the command
can be executed, otherwise `false`.

```ts
const canExec: (...args: Args) => boolean
```

</dd>

</dl>

## DefaultStateOptions {#default-state-options}

<dl>

<dt>

`defaultContent?: string | NodeJSON | HTMLElement`

</dt>

<dd>

The starting document to use when creating the editor. It can be a
ProseMirror node JSON object, a HTML string, or a HTML element instance.

</dd>

<dt>

`defaultDoc?: NodeJSON`

</dt>

<dd>

A JSON object representing the starting document to use when creating the
editor.

**Deprecated**

Use `defaultContent` instead.

</dd>

<dt>

`defaultHTML?: string | HTMLElement`

</dt>

<dd>

A HTML element or a HTML string representing the starting document to use
when creating the editor.

**Deprecated**

Use `defaultContent` instead.

</dd>

<dt>

`defaultSelection?: SelectionJSON`

</dt>

<dd>

A JSON object representing the starting selection to use when creating the
editor. It's only used when `defaultContent` is also provided.

</dd>

</dl>

## DOMDocumentOptions {#dom-document-options}

<dl>

<dt>

`document?: Document`

</dt>

<dd>

</dd>

</dl>

## DOMParserOptions {#dom-parser-options}

<dl>

<dt>

`DOMParser?: typeof DOMParser`

</dt>

<dd>

</dd>

</dl>

## DOMSerializerOptions {#dom-serializer-options}

<dl>

<dt>

`DOMSerializer?: typeof DOMSerializer`

</dt>

<dd>

</dd>

</dl>

## EditorOptions {#editor-options}

<dl>

<dt>

`defaultContent?: string | NodeJSON | HTMLElement`

</dt>

<dd>

The starting document to use when creating the editor. It can be a
ProseMirror node JSON object, a HTML string, or a HTML element instance.

</dd>

<dt>

`defaultDoc?: NodeJSON`

</dt>

<dd>

A JSON object representing the starting document to use when creating the
editor.

**Deprecated**

Use `defaultContent` instead.

</dd>

<dt>

`defaultHTML?: string | HTMLElement`

</dt>

<dd>

A HTML element or a HTML string representing the starting document to use
when creating the editor.

**Deprecated**

Use `defaultContent` instead.

</dd>

<dt>

`defaultSelection?: SelectionJSON`

</dt>

<dd>

A JSON object representing the starting selection to use when creating the
editor. It's only used when `defaultContent` is also provided.

</dd>

<dt>

`extension: E`

</dt>

<dd>

The extension to use when creating the editor.

</dd>

</dl>

## ExpandMarkOptions {#expand-mark-options}

<dl>

<dt>

`type: string | MarkType`

</dt>

<dd>

The type of the mark to expand.

</dd>

</dl>

## Extension {#extension-1}

<dl>

<dt>

`_type?: T`

</dt>

<dd>

</dd>

<dt>

`extension: Extension<ExtensionTyping<any, any, any>> | Extension<ExtensionTyping<any, any, any>>[]`

</dt>

<dd>

</dd>

<dt>

`priority?: Priority`

</dt>

<dd>

</dd>

<dt>

`schema: null | Schema<any, any>`

</dt>

<dd>

The schema that this extension represents.

</dd>

</dl>

## FindParentNodeResult {#find-parent-node-result}

<dl>

<dt>

`depth: number`

</dt>

<dd>

The depth of the node.

</dd>

<dt>

`node: Node`

</dt>

<dd>

The closest parent node that satisfies the predicate.

</dd>

<dt>

`pos: number`

</dt>

<dd>

The position directly before the node.

</dd>

<dt>

`start: number`

</dt>

<dd>

The position at the start of the node.

</dd>

</dl>

## HistoryOptions {#history-options}

Options for [defineHistory](core.md#define-history).

<dl>

<dt>

`depth?: number`

</dt>

<dd>

The amount of history events that are collected before the oldest events
are discarded.

**Default**: `200`

</dd>

<dt>

`newGroupDelay?: number`

</dt>

<dd>

The delay in milliseconds between changes after which a new group should be
started.

**Default**: `250`

</dd>

</dl>

## InsertDefaultBlockOptions {#insert-default-block-options}

<dl>

<dt>

`pos?: number`

</dt>

<dd>

The position to insert the node at. By default it will insert after the
current selection.

</dd>

</dl>

## InsertNodeOptions {#insert-node-options}

<dl>

<dt>

`attrs?: Attrs`

</dt>

<dd>

When `type` is provided, the attributes of the node to insert.

</dd>

<dt>

`node?: Node`

</dt>

<dd>

The node to insert. Either this or `type` must be provided.

</dd>

<dt>

`pos?: number`

</dt>

<dd>

The position to insert the node at. By default it will be the anchor
position of current selection.

</dd>

<dt>

`type?: string | NodeType`

</dt>

<dd>

The type of the node to insert. Either this or `node` must be provided.

</dd>

</dl>

## JSONParserOptions {#json-parser-options}

<dl>

<dt>

`schema: Schema<any, any>`

</dt>

<dd>

</dd>

</dl>

## Keymap {#keymap}

## MarkAction {#mark-action}

A function for creating a mark with optional attributes and any number of
children.

It also has a `isActive` method for checking if the mark is active in the
current editor selection.

<dl>

<dt>

`isActive: (attrs?: Attrs) => boolean`

</dt>

<dd>

Checks if the mark is active in the current editor selection. If the
optional `attrs` parameter is provided, it will check if the mark is active
with the given attributes.

</dd>

</dl>

## MarkAttrOptions {#mark-attr-options}

<dl>

<dt>

`attr: AttrName`

</dt>

<dd>

The name of the attribute.

</dd>

<dt>

`default?: AttrType`

</dt>

<dd>

The default value for this attribute, to use when no explicit value is
provided. Attributes that have no default must be provided whenever a node
or mark of a type that has them is created.

</dd>

<dt>

`parseDOM?: (node: HTMLElement) => AttrType`

</dt>

<dd>

Parses the attribute value from the DOM.

</dd>

<dt>

`toDOM?: (value: AttrType) => undefined | null | [key: string, value: string]`

</dt>

<dd>

Returns the attribute key and value to be set on the HTML element.

If the returned `key` is `"style"`, the value is a string of CSS properties and will
be prepended to the existing `style` attribute on the DOM node.

</dd>

<dt>

`type: MarkName`

</dt>

<dd>

The name of the mark type.

</dd>

<dt>

`validate?: string | ((value: unknown) => void)`

</dt>

<dd>

A function or type name used to validate values of this attribute. This
will be used when deserializing the attribute from JSON, and when running
[`Node.check`](https://prosemirror.net/docs/ref/#model.Node.check). When a
function, it should raise an exception if the value isn't of the expected
type or shape. When a string, it should be a `|`-separated string of
primitive types (`"number"`, `"string"`, `"boolean"`, `"null"`, and
`"undefined"`), and the library will raise an error when the value is not
one of those types.

</dd>

</dl>

## MarkSpecOptions {#mark-spec-options}

<dl>

<dt>

`attrs?: {[K in string | number | symbol]: AttrSpec<Attrs[K]>}`

</dt>

<dd>

The attributes that marks of this type get.

</dd>

<dt>

`name: MarkName`

</dt>

<dd>

The name of the mark type.

</dd>

</dl>

## NodeAction {#node-action}

A function for creating a node with optional attributes and any number of
children.

It also has a `isActive` method for checking if the node is active in the
current editor selection.

<dl>

<dt>

`isActive: (attrs?: Attrs) => boolean`

</dt>

<dd>

Checks if the node is active in the current editor selection. If the
optional `attrs` parameter is provided, it will check if the node is active
with the given attributes.

</dd>

</dl>

## NodeAttrOptions {#node-attr-options}

<dl>

<dt>

`attr: AttrName`

</dt>

<dd>

The name of the attribute.

</dd>

<dt>

`default?: AttrType`

</dt>

<dd>

The default value for this attribute, to use when no explicit value is
provided. Attributes that have no default must be provided whenever a node
or mark of a type that has them is created.

</dd>

<dt>

`parseDOM?: (node: HTMLElement) => AttrType`

</dt>

<dd>

Parses the attribute value from the DOM.

</dd>

<dt>

`splittable?: boolean`

</dt>

<dd>

Whether the attribute should be kept when the node is split. Set it to
`true` if you want to inherit the attribute from the previous node when
splitting the node by pressing `Enter`.

**Default**: `undefined`

</dd>

<dt>

`toDOM?: (value: AttrType) => undefined | null | [key: string, value: string]`

</dt>

<dd>

Returns the attribute key and value to be set on the HTML element.

If the returned `key` is `"style"`, the value is a string of CSS properties and will
be prepended to the existing `style` attribute on the DOM node.

</dd>

<dt>

`type: NodeName`

</dt>

<dd>

The name of the node type.

</dd>

<dt>

`validate?: string | ((value: unknown) => void)`

</dt>

<dd>

A function or type name used to validate values of this attribute. This
will be used when deserializing the attribute from JSON, and when running
[`Node.check`](https://prosemirror.net/docs/ref/#model.Node.check). When a
function, it should raise an exception if the value isn't of the expected
type or shape. When a string, it should be a `|`-separated string of
primitive types (`"number"`, `"string"`, `"boolean"`, `"null"`, and
`"undefined"`), and the library will raise an error when the value is not
one of those types.

</dd>

</dl>

## NodeJSON {#node-json}

A JSON representation of the prosemirror node.

<dl>

<dt>

`attrs?: Record<string, any>`

</dt>

<dd>

</dd>

<dt>

`content?: NodeJSON[]`

</dt>

<dd>

</dd>

<dt>

`marks?: { attrs?: Record<string, any>; type: string }[]`

</dt>

<dd>

</dd>

<dt>

`text?: string`

</dt>

<dd>

</dd>

<dt>

`type: string`

</dt>

<dd>

</dd>

</dl>

## NodeSpecOptions {#node-spec-options}

<dl>

<dt>

`attrs?: {[key in string | number | symbol]: AttrSpec<Attrs[key]>}`

</dt>

<dd>

The attributes that nodes of this type get.

</dd>

<dt>

`name: NodeName`

</dt>

<dd>

The name of the node type.

</dd>

<dt>

`topNode?: boolean`

</dt>

<dd>

Whether this is the top-level node type. Only one node type can be the
top-level node type in a schema.

</dd>

</dl>

## NodeViewOptions {#node-view-options}

<dl>

<dt>

`constructor: NodeViewConstructor`

</dt>

<dd>

</dd>

<dt>

`name: string`

</dt>

<dd>

</dd>

</dl>

## RemoveMarkOptions {#remove-mark-options}

<dl>

<dt>

`attrs?: null | Attrs`

</dt>

<dd>

If attrs is given, remove precisely the mark with the given attrs. Otherwise, remove all marks of the given type.

</dd>

<dt>

`from?: number`

</dt>

<dd>

The start position of the document. By default it will be the start position of current selection.

</dd>

<dt>

`to?: number`

</dt>

<dd>

The end position of the document. By default it will be the end position of current selection.

</dd>

<dt>

`type: string | MarkType`

</dt>

<dd>

The type of the mark to remove.

</dd>

</dl>

## RemoveNodeOptions {#remove-node-options}

<dl>

<dt>

`pos?: number`

</dt>

<dd>

The document position to start searching node. By default it will be the
anchor position of current selection.

</dd>

<dt>

`type: string | NodeType`

</dt>

<dd>

The type of the node to remove.

</dd>

</dl>

## SelectionJSON {#selection-json}

A JSON representation of the prosemirror selection.

<dl>

<dt>

`anchor: number`

</dt>

<dd>

</dd>

<dt>

`head: number`

</dt>

<dd>

</dd>

<dt>

`type: string`

</dt>

<dd>

</dd>

</dl>

## SetBlockTypeOptions {#set-block-type-options}

<dl>

<dt>

`attrs?: null | Attrs`

</dt>

<dd>

</dd>

<dt>

`from?: number`

</dt>

<dd>

</dd>

<dt>

`to?: number`

</dt>

<dd>

</dd>

<dt>

`type: string | NodeType`

</dt>

<dd>

</dd>

</dl>

## SetNodeAttrsOptions {#set-node-attrs-options}

<dl>

<dt>

`attrs: Attrs`

</dt>

<dd>

The attributes to set.

</dd>

<dt>

`pos?: number`

</dt>

<dd>

The position of the node. Defaults to the position of the wrapping node
containing the current selection.

</dd>

<dt>

`type: string | NodeType | string[] | NodeType[]`

</dt>

<dd>

The type of node to set the attributes of.

If current node is not of this type, the command will do nothing.

</dd>

</dl>

## StateJSON {#state-json}

A JSON representation of the prosemirror state.

<dl>

<dt>

`doc: NodeJSON`

</dt>

<dd>

The main `ProseMirror` doc.

</dd>

<dt>

`selection: SelectionJSON`

</dt>

<dd>

The current selection.

</dd>

</dl>

## StepJSON {#step-json}

A JSON representation of the prosemirror step.

<dl>

<dt>

`stepType: string`

</dt>

<dd>

The type of the step.

</dd>

</dl>

## ToggleMarkOptions {#toggle-mark-options}

<dl>

<dt>

`attrs?: null | Attrs`

</dt>

<dd>

The optional attributes to set on the mark.

</dd>

<dt>

`enterInlineAtoms?: boolean`

</dt>

<dd>

Whether the command should act on the content of inline nodes marked as
[atoms](https://prosemirror.net/docs/ref/#model.NodeSpec.atom) that are
completely covered by a selection range.

**Default**: `true`

</dd>

<dt>

`removeWhenPresent?: boolean`

</dt>

<dd>

Controls whether, when part of the selected range has the mark
already and part doesn't, the mark is removed (`true`) or added
(`false`).

**Default**: `false`

</dd>

<dt>

`type: string | MarkType`

</dt>

<dd>

The mark type to toggle.

</dd>

</dl>

## ToggleNodeOptions {#toggle-node-options}

<dl>

<dt>

`attrs?: null | Attrs`

</dt>

<dd>

The attributes of the node to toggle.

</dd>

<dt>

`type: string | NodeType`

</dt>

<dd>

The type of the node to toggle.

</dd>

</dl>

## ToggleWrapOptions {#toggle-wrap-options}

<dl>

<dt>

`attrs?: null | Attrs`

</dt>

<dd>

The attributes of the node to toggle.

</dd>

<dt>

`type: string | NodeType`

</dt>

<dd>

The type of the node to toggle.

</dd>

</dl>

## UnsetBlockTypeOptions {#unset-block-type-options}

<dl>

<dt>

`from?: number`

</dt>

<dd>

The start position of the document. By default it will be the start position of current selection.

</dd>

<dt>

`to?: number`

</dt>

<dd>

The end position of the document. By default it will be the end position of current selection.

</dd>

</dl>

## UnsetMarkOptions {#unset-mark-options}

<dl>

<dt>

`from?: number`

</dt>

<dd>

The start position of the document. By default it will be the start position of current selection.

</dd>

<dt>

`to?: number`

</dt>

<dd>

The end position of the document. By default it will be the end position of current selection.

</dd>

</dl>

## WrapOptions {#wrap-options}

<dl>

<dt>

`attrs?: null | Attrs`

</dt>

<dd>

Optional attributes to apply to the node.

</dd>

<dt>

`nodeType?: NodeType`

</dt>

<dd>

**Deprecated**

Use `nodeSpec` instead.

</dd>

<dt>

`type: string | NodeType`

</dt>

<dd>

The node type to wrap the selected textblock with.

</dd>

</dl>

## AnyAttrs {#any-attrs}

An object holding the attributes of a node.

**Type**: `Attrs`

## AttrSpec {#attr-spec}

**Type**: `{ default?: AttrType; validate?: string | ((value: unknown) => void) }`

## ClickHandler {#click-handler}

**Type**: `(view: EditorView, pos: number, event: MouseEvent) => boolean | void`

## ClickOnHandler {#click-on-handler}

**Type**: `(view: EditorView, pos: number, node: Node, nodePos: number, event: MouseEvent, direct: boolean) => boolean | void`

## DocChangeHandler {#doc-change-handler}

A function that is called when the editor document is changed.

**Type**: `(view: EditorView, prevState: EditorState) => void`

## DOMEventHandler {#dom-event-handler}

A function to handle the events fired on the editable DOM element. Returns
`true` to indicate that it handled the given event. you are responsible for
calling `preventDefault` yourself (or not, if you want to allow the default
behavior).

**Type**: `(view: EditorView, event: DOMEventMap[Event]) => boolean | void`

## DoubleClickHandler {#double-click-handler}

**Type**: `(view: EditorView, pos: number, event: MouseEvent) => boolean | void`

## DoubleClickOnHandler {#double-click-on-handler}

**Type**: `(view: EditorView, pos: number, node: Node, nodePos: number, event: MouseEvent, direct: boolean) => boolean | void`

## DropHandler {#drop-handler}

**Type**: `(view: EditorView, event: DragEvent, slice: Slice, moved: boolean) => boolean | void`

## ExtractCommandActions {#extract-command-actions}

Extracts the [CommandAction](core.md#command-action)s from an extension type.

**Type**: `ToCommandAction<ExtractCommands<E>>`

## ExtractCommandAppliers {#extract-command-appliers}

### Deprecated

Use `ExtractCommandActions` instead.

**Type**: `ExtractCommandActions<E>`

## ExtractCommandCreators {#extract-command-creators}

**Type**: `ToCommandCreators<ExtractCommands<E>>`

## ExtractMarkActions {#extract-mark-actions}

Extracts the [MarkAction](core.md#mark-action)s from an extension type.

**Type**: `ToMarkAction<ExtractMarks<E>>`

## ExtractMarks {#extract-marks}

**Type**: `SimplifyDeeper<SimplifyUnion<ExtractTyping<E>["Marks"]>>`

## ExtractNodeActions {#extract-node-actions}

Extracts the [NodeAction](core.md#node-action)s from an extension type.

**Type**: `ToNodeAction<ExtractNodes<E>>`

## ExtractNodes {#extract-nodes}

**Type**: `SimplifyDeeper<SimplifyUnion<ExtractTyping<E>["Nodes"]>>`

## FocusChangeHandler {#focus-change-handler}

A function that is called when the editor gains or loses focus.

**Type**: `(hasFocus: boolean) => void`

## KeyDownHandler {#key-down-handler}

**Type**: `(view: EditorView, event: KeyboardEvent) => boolean | void`

## KeyPressHandler {#key-press-handler}

**Type**: `(view: EditorView, event: KeyboardEvent) => boolean | void`

## MarkBuilder {#mark-builder}

### Deprecated

Use type [MarkAction](core.md#mark-action) instead.

**Type**: `MarkAction`

## MountHandler {#mount-handler}

A function that is called when the editor view is mounted.

**Type**: `(view: EditorView) => void`

## NodeBuilder {#node-builder}

### Deprecated

Use type [NodeAction](core.md#node-action) instead.

**Type**: `NodeAction`

## NodeChild {#node-child}

Available children parameters for [NodeAction](core.md#node-action) and [MarkAction](core.md#mark-action).

**Type**: `ProseMirrorNode | string | NodeChild[]`

## NodeContent {#node-content}

### Deprecated

**Type**: `ProseMirrorNode | ProseMirrorFragment | NodeContent[]`

## PasteHandler {#paste-handler}

**Type**: `(view: EditorView, event: ClipboardEvent, slice: Slice) => boolean | void`

## ScrollToSelectionHandler {#scroll-to-selection-handler}

**Type**: `(view: EditorView) => boolean`

## TextInputHandler {#text-input-handler}

**Type**: `(view: EditorView, from: number, to: number, text: string) => boolean | void`

## TripleClickHandler {#triple-click-handler}

**Type**: `(view: EditorView, pos: number, event: MouseEvent) => boolean | void`

## TripleClickOnHandler {#triple-click-on-handler}

**Type**: `(view: EditorView, pos: number, node: Node, nodePos: number, event: MouseEvent, direct: boolean) => boolean | void`

## UnmountHandler {#unmount-handler}

A function that is called when the editor view is unmounted.

**Type**: `() => void`

## UpdateHandler {#update-handler}

A function that is called when the editor state is updated.

**Type**: `(view: EditorView, prevState: EditorState) => void`

## addMark {#add-mark}

```ts
function addMark(options: AddMarkOptions): Command
```

Returns a command that adds the given mark with the given attributes.

## canUseRegexLookbehind {#can-use-regex-lookbehind}

```ts
function canUseRegexLookbehind(): boolean
```

## clsx {#clsx}

A utility for constructing `className` strings conditionally.

It is a re-export of [clsx/lite](https://www.npmjs.com/package/clsx) with stricter types.

```ts
function clsx(...args: (undefined | null | string | boolean)[]): string
```

## collectChildren {#collect-children}

```ts
function collectChildren(parent: Node | Fragment): ProseMirrorNode[]
```

Collects all children of a node or a fragment, and returns them as an array.

## collectNodes {#collect-nodes}

```ts
function collectNodes(content: NodeContent): ProseMirrorNode[]
```

Collects all nodes from a given content.

**Deprecated**

Use `collectChildren` instead.

## createEditor {#create-editor}

```ts
function createEditor<E extends Extension<ExtensionTyping<any, any, any>>>(options: EditorOptions<E>): Editor<E>
```

## defineBaseCommands {#define-base-commands}

```ts
function defineBaseCommands(): BaseCommandsExtension
```

Add some base commands

## defineBaseKeymap {#define-base-keymap}

```ts
function defineBaseKeymap(options?: { priority?: Priority }): BaseKeymapExtension
```

Defines some basic key bindings.

## defineClickHandler {#define-click-handler}

```ts
function defineClickHandler(handler: ClickHandler): PlainExtension
```

See <https://prosemirror.net/docs/ref/#view.EditorProps.handleClick>

## defineClickOnHandler {#define-click-on-handler}

```ts
function defineClickOnHandler(handler: ClickOnHandler): PlainExtension
```

See <https://prosemirror.net/docs/ref/#view.EditorProps.handleClickOn>

## defineCommands {#define-commands}

```ts
function defineCommands<T extends Record<string, CommandCreator>>(commands: T): Extension<{ Commands: {[K in keyof T]: Parameters<T[K]>} }>
```

## defineDefaultState {#define-default-state}

```ts
function defineDefaultState(options: DefaultStateOptions): PlainExtension
```

Define a default state for the editor.

## defineDoc {#define-doc}

```ts
function defineDoc(): DocExtension
```

## defineDocChangeHandler {#define-doc-change-handler}

```ts
function defineDocChangeHandler(handler: DocChangeHandler): PlainExtension
```

Registers a event handler that is called when the editor document is changed.

## defineDOMEventHandler {#define-dom-event-handler}

```ts
function defineDOMEventHandler<Event extends keyof DOMEventMap>(event: Event, handler: DOMEventHandler<Event>): PlainExtension
```

Register a new event handler for the given event type.

## defineDoubleClickHandler {#define-double-click-handler}

```ts
function defineDoubleClickHandler(handler: DoubleClickHandler): PlainExtension
```

See <https://prosemirror.net/docs/ref/#view.EditorProps.handleDoubleClick>

## defineDoubleClickOnHandler {#define-double-click-on-handler}

```ts
function defineDoubleClickOnHandler(handler: DoubleClickOnHandler): PlainExtension
```

See <https://prosemirror.net/docs/ref/#view.EditorProps.handleDoubleClickOn>

## defineDropHandler {#define-drop-handler}

```ts
function defineDropHandler(handler: DropHandler): PlainExtension
```

See <https://prosemirror.net/docs/ref/#view.EditorProps.handleDrop>

## defineFocusChangeHandler {#define-focus-change-handler}

```ts
function defineFocusChangeHandler(handler: FocusChangeHandler): PlainExtension
```

Registers a event handler that is called when the editor gains or loses focus.

## defineHistory {#define-history}

```ts
function defineHistory(options?: HistoryOptions): HistoryExtension
```

Add undo/redo history to the editor.

## defineKeyDownHandler {#define-key-down-handler}

```ts
function defineKeyDownHandler(handler: KeyDownHandler): PlainExtension
```

See <https://prosemirror.net/docs/ref/#view.EditorProps.handleKeyDown>

## defineKeymap {#define-keymap}

```ts
function defineKeymap(keymap: Keymap): PlainExtension
```

## defineKeyPressHandler {#define-key-press-handler}

```ts
function defineKeyPressHandler(handler: KeyPressHandler): PlainExtension
```

See <https://prosemirror.net/docs/ref/#view.EditorProps.handleKeyPress>

## defineMarkAttr {#define-mark-attr}

```ts
function defineMarkAttr<MarkType extends string, AttrName extends string, AttrType>(options: MarkAttrOptions<MarkType, AttrName, AttrType>): Extension<{ Marks: {[K in MarkType]: AttrType} }>
```

## defineMarkSpec {#define-mark-spec}

```ts
function defineMarkSpec<Mark extends string, Attrs extends Attrs>(options: MarkSpecOptions<Mark, Attrs>): Extension<{ Marks: {[K in Mark]: Attrs} }>
```

## defineMountHandler {#define-mount-handler}

```ts
function defineMountHandler(handler: MountHandler): PlainExtension
```

Registers a event handler that is called when the editor view is mounted.

## defineNodeAttr {#define-node-attr}

```ts
function defineNodeAttr<NodeType extends string, AttrName extends string, AttrType>(options: NodeAttrOptions<NodeType, AttrName, AttrType>): Extension<{ Nodes: {[K in NodeType]: {[K in AttrName]: AttrType}} }>
```

Defines an attribute for a node type.

## defineNodeSpec {#define-node-spec}

```ts
function defineNodeSpec<Node extends string, Attrs extends Attrs>(options: NodeSpecOptions<Node, Attrs>): Extension<{ Nodes: {[K in Node]: Attrs} }>
```

Defines a node type.

## defineNodeView {#define-node-view}

```ts
function defineNodeView(options: NodeViewOptions): Extension
```

## defineParagraph {#define-paragraph}

```ts
function defineParagraph(): ParagraphExtension
```

Defines a paragraph node spec as the highest priority, because it should be the default block node for most cases.

## definePasteHandler {#define-paste-handler}

```ts
function definePasteHandler(handler: PasteHandler): PlainExtension
```

See <https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste>

## definePlugin {#define-plugin}

```ts
function definePlugin(plugin: Plugin<any> | Plugin<any>[] | ((context: { schema: Schema<any, any> }) => Plugin<any> | Plugin<any>[])): PlainExtension
```

Adds a ProseMirror plugin to the editor.

## defineScrollToSelectionHandler {#define-scroll-to-selection-handler}

```ts
function defineScrollToSelectionHandler(handler: ScrollToSelectionHandler): PlainExtension
```

See <https://prosemirror.net/docs/ref/#view.EditorProps.handleScrollToSelection>

## defineText {#define-text}

```ts
function defineText(): TextExtension
```

## defineTextInputHandler {#define-text-input-handler}

```ts
function defineTextInputHandler(handler: TextInputHandler): PlainExtension
```

See <https://prosemirror.net/docs/ref/#view.EditorProps.handleTextInput>

## defineTripleClickHandler {#define-triple-click-handler}

```ts
function defineTripleClickHandler(handler: TripleClickHandler): PlainExtension
```

See <https://prosemirror.net/docs/ref/#view.EditorProps.handleTripleClick>

## defineTripleClickOnHandler {#define-triple-click-on-handler}

```ts
function defineTripleClickOnHandler(handler: TripleClickOnHandler): PlainExtension
```

See <https://prosemirror.net/docs/ref/#view.EditorProps.handleTripleClickOn>

## defineUnmountHandler {#define-unmount-handler}

```ts
function defineUnmountHandler(handler: UnmountHandler): PlainExtension
```

Registers a event handler that is called when the editor view is unmounted.

## defineUpdateHandler {#define-update-handler}

```ts
function defineUpdateHandler(handler: UpdateHandler): PlainExtension
```

Registers a event handler that is called when the editor state is updated.

## elementFromJSON {#element-from-json}

```ts
function elementFromJSON(json: NodeJSON, options: JSONParserOptions & DOMSerializerOptions & DOMDocumentOptions): HTMLElement
```

Parse a ProseMirror document JSON object to a HTML element.

## elementFromNode {#element-from-node}

```ts
function elementFromNode(node: Node, options?: DOMSerializerOptions & DOMDocumentOptions): HTMLElement
```

Serialize a ProseMirror node to a HTML element.

## expandMark {#expand-mark}

```ts
function expandMark(options: ExpandMarkOptions): Command
```

Expands the selection to include the entire mark at the current position.

## findParentNode {#find-parent-node}

```ts
function findParentNode(predicate: (node: Node) => boolean, $pos: ResolvedPos): FindParentNodeResult | undefined
```

Find the closest parent node that satisfies the predicate.

## findParentNodeOfType {#find-parent-node-of-type}

```ts
function findParentNodeOfType(type: string | NodeType, $pos: ResolvedPos): FindParentNodeResult | undefined
```

Finds the closest parent node that matches the given node type.

## htmlFromJSON {#html-from-json}

```ts
function htmlFromJSON(json: NodeJSON, options: JSONParserOptions & DOMSerializerOptions & DOMDocumentOptions): string
```

Parse a ProseMirror document JSON object to a HTML string.

## htmlFromNode {#html-from-node}

```ts
function htmlFromNode(node: Node, options?: DOMSerializerOptions & DOMDocumentOptions): string
```

Serialize a ProseMirror node to a HTML string

## insertDefaultBlock {#insert-default-block}

```ts
function insertDefaultBlock(options?: InsertDefaultBlockOptions): Command
```

Returns a command that inserts a default block after current selection or at
the given position.

## insertNode {#insert-node}

```ts
function insertNode(options: InsertNodeOptions): Command
```

Returns a command that inserts the given node at the current selection or at
the given position.

## isAllSelection {#is-all-selection}

```ts
function isAllSelection(sel: Selection): sel is AllSelection
```

Checks if the given object is a `AllSelection` instance.

## isFragment {#is-fragment}

```ts
function isFragment(fragment: unknown): fragment is Fragment
```

Checks if the given object is a `Fragment` instance.

## isMark {#is-mark}

```ts
function isMark(mark: unknown): mark is Mark
```

Checks if the given object is a `Mark` instance.

## isNodeSelection {#is-node-selection}

```ts
function isNodeSelection(sel: Selection): sel is NodeSelection
```

Checks if the given object is a `NodeSelection` instance.

## isProseMirrorNode {#is-prose-mirror-node}

```ts
function isProseMirrorNode(node: unknown): node is Node
```

Checks if the given object is a `ProseMirrorNode` instance.

## isSelection {#is-selection}

```ts
function isSelection(sel: unknown): sel is Selection
```

Checks if the given object is a `Selection` instance.

## isSlice {#is-slice}

```ts
function isSlice(slice: unknown): slice is Slice
```

Checks if the given object is a `Slice` instance.

## isTextSelection {#is-text-selection}

```ts
function isTextSelection(sel: Selection): sel is TextSelection
```

Checks if the given object is a `TextSelection` instance.

## jsonFromHTML {#json-from-html}

```ts
function jsonFromHTML(html: string, options: DOMDocumentOptions & DOMParserOptions & JSONParserOptions): NodeJSON
```

Parse a HTML string to a ProseMirror document JSON object.

## jsonFromNode {#json-from-node}

```ts
function jsonFromNode(node: Node): NodeJSON
```

Return a JSON object representing this node.

## jsonFromState {#json-from-state}

```ts
function jsonFromState(state: EditorState): StateJSON
```

Return a JSON object representing this state.

## nodeFromElement {#node-from-element}

```ts
function nodeFromElement(element: Node, options: DOMParserOptions & JSONParserOptions): ProseMirrorNode
```

Parse a HTML element to a ProseMirror node.

## nodeFromHTML {#node-from-html}

```ts
function nodeFromHTML(html: string, options: DOMParserOptions & JSONParserOptions & DOMDocumentOptions): ProseMirrorNode
```

Parse a HTML string to a ProseMirror node.

## nodeFromJSON {#node-from-json}

```ts
function nodeFromJSON(json: NodeJSON, options: JSONParserOptions): ProseMirrorNode
```

Parse a JSON object to a ProseMirror node.

## removeMark {#remove-mark}

```ts
function removeMark(options: RemoveMarkOptions): Command
```

Returns a command that removes the given mark.

## removeNode {#remove-node}

```ts
function removeNode(options: RemoveNodeOptions): Command
```

Returns a command to remove the nearest ancestor node of a specific type from the current position.

## setBlockType {#set-block-type}

```ts
function setBlockType(options: SetBlockTypeOptions): Command
```

Returns a command that tries to set the selected textblocks to the given node
type with the given attributes.

## setNodeAttrs {#set-node-attrs}

```ts
function setNodeAttrs(options: SetNodeAttrsOptions): Command
```

Returns a command that set the attributes of the current node.

## setSelectionAround {#set-selection-around}

```ts
function setSelectionAround(tr: Transaction, pos: number): void
```

## stateFromJSON {#state-from-json}

```ts
function stateFromJSON(json: StateJSON, options: JSONParserOptions): EditorState
```

Parse a JSON object to a ProseMirror state.

## toggleMark {#toggle-mark}

```ts
function toggleMark(options: ToggleMarkOptions): Command
```

Returns a command that toggles the given mark with the given attributes.

## toggleNode {#toggle-node}

```ts
function toggleNode(options: ToggleNodeOptions): Command
```

Returns a command that set the selected textblocks to the given node type
with the given attributes.

## toggleWrap {#toggle-wrap}

```ts
function toggleWrap(options: ToggleWrapOptions): Command
```

Toggle between wrapping an inactive node with the provided node type, and
lifting it up into it's parent.

## union {#union}

```ts
function union<const E extends readonly Extension<ExtensionTyping<any, any, any>>[]>(...exts: E): Union<E>
```

Merges multiple extensions into one. You can pass multiple extensions as
arguments or a single array containing multiple extensions.

**Throws**

If no extensions are provided.

**Example**

```ts
function defineFancyNodes() {
  return union(
    defineFancyParagraph(),
    defineFancyHeading(),
  )
}
```

**Example**

```ts
function defineFancyNodes() {
  return union([
    defineFancyParagraph(),
    defineFancyHeading(),
  ])
}
```

```ts
function union<const E extends readonly Extension<ExtensionTyping<any, any, any>>[]>(exts: E): Union<E>
```

Merges multiple extensions into one. You can pass multiple extensions as
arguments or a single array containing multiple extensions.

**Throws**

If no extensions are provided.

**Example**

```ts
function defineFancyNodes() {
  return union(
    defineFancyParagraph(),
    defineFancyHeading(),
  )
}
```

**Example**

```ts
function defineFancyNodes() {
  return union([
    defineFancyParagraph(),
    defineFancyHeading(),
  ])
}
```

## unsetBlockType {#unset-block-type}

```ts
function unsetBlockType(options?: UnsetBlockTypeOptions): Command
```

Returns a command that set the type of all textblocks between the given range
to the default type (usually `paragraph`).

## unsetMark {#unset-mark}

```ts
function unsetMark(options?: UnsetMarkOptions): Command
```

Returns a command that removes all marks.

## withPriority {#with-priority}

```ts
function withPriority<T extends Extension<ExtensionTyping<any, any, any>>>(extension: T, priority: Priority): T
```

Return an new extension with the given priority.

**Example**

```ts
import { Priority, withPriority } from 'prosekit/core'

const extension = withPriority(defineMyExtension(), Priority.high)
```

## wrap {#wrap}

```ts
function wrap(options: WrapOptions): Command
```

Returns a command that wraps the selected textblock with the given node type.
