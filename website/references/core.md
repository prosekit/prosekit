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

```ts
const blur: () => void
```

</dd>

<dt>

`canExec`

</dt>

<dd>

```ts
const canExec: (command: Command) => boolean
```

</dd>

<dt>

`exec`

</dt>

<dd>

```ts
const exec: (command: Command) => boolean
```

</dd>

<dt>

`focus`

</dt>

<dd>

```ts
const focus: () => void
```

</dd>

<dt>

`mount`

</dt>

<dd>

```ts
const mount: (place: undefined | null | HTMLElement) => void
```

</dd>

<dt>

`setContent`

</dt>

<dd>

```ts
const setContent: (content: string | Node | NodeJSON | HTMLElement, selection?: Selection | "start" | SelectionJSON | "end") => void
```

</dd>

<dt>

`unmount`

</dt>

<dd>

```ts
const unmount: () => void
```

</dd>

<dt>

`updateState`

</dt>

<dd>

```ts
const updateState: (state: EditorState) => void
```

</dd>

<dt>

`use`

</dt>

<dd>

```ts
const use: (extension: Extension<ExtensionTyping<any, any, any>>) => VoidFunction
```

</dd>

</dl>

## AddMarkOptions {#add-mark-options}

<dl>

<dt>

`attrs`

</dt>

<dd>

The attributes of the mark to add.

**Type**: `null | Attrs`

</dd>

<dt>

`from`

</dt>

<dd>

The start position of the document. By default it will be the start position of current selection.

**Type**: `number`

</dd>

<dt>

`to`

</dt>

<dd>

The end position of the document. By default it will be the end position of current selection.

**Type**: `number`

</dd>

<dt>

`type`

</dt>

<dd>

The type of the mark to add.

**Type**: `string | MarkType`

</dd>

</dl>

## BaseNodeViewOptions {#base-node-view-options}

Some basic props for custom node views.

<dl>

<dt>

`as`

</dt>

<dd>

The wrapping DOM element for the node view. Defaults to `div` for block nodes and `span` for inline nodes.

**Type**: `string | HTMLElement | ((node: Node) => HTMLElement)`

</dd>

<dt>

`contentAs`

</dt>

<dd>

The wrapping DOM element for the node view's content. Defaults to `div` for block nodes and `span` for inline nodes.

**Type**: `string | HTMLElement | ((node: Node) => HTMLElement)`

</dd>

<dt>

`deselectNode`

</dt>

<dd>

**Type**: `() => void`

</dd>

<dt>

`destroy`

</dt>

<dd>

**Type**: `() => void`

</dd>

<dt>

`ignoreMutation`

</dt>

<dd>

**Type**: `(mutation: ViewMutationRecord) => boolean`

</dd>

<dt>

`onUpdate`

</dt>

<dd>

**Type**: `() => void`

</dd>

<dt>

`selectNode`

</dt>

<dd>

**Type**: `() => void`

</dd>

<dt>

`setSelection`

</dt>

<dd>

**Type**: `(anchor: number, head: number, root: Document | ShadowRoot) => void`

</dd>

<dt>

`stopEvent`

</dt>

<dd>

**Type**: `(event: Event) => boolean`

</dd>

<dt>

`update`

</dt>

<dd>

**Type**: `(node: Node, decorations: readonly Decoration[], innerDecorations: DecorationSource) => boolean`

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

```ts
const canApply: (...args: Args) => boolean
```

</dd>

<dt>

`canExec`

</dt>

<dd>

```ts
const canExec: (...args: Args) => boolean
```

</dd>

</dl>

## DefaultStateOptions {#default-state-options}

<dl>

<dt>

`defaultContent`

</dt>

<dd>

The starting document to use when creating the editor. It can be a
ProseMirror node JSON object, a HTML string, or a HTML element instance.

**Type**: `string | NodeJSON | HTMLElement`

</dd>

<dt>

`defaultDoc`

</dt>

<dd>

A JSON object representing the starting document to use when creating the
editor.

**Type**: `NodeJSON`

**Deprecated**

Use `defaultContent` instead.

</dd>

<dt>

`defaultHTML`

</dt>

<dd>

A HTML element or a HTML string representing the starting document to use
when creating the editor.

**Type**: `string | HTMLElement`

**Deprecated**

Use `defaultContent` instead.

</dd>

<dt>

`defaultSelection`

</dt>

<dd>

A JSON object representing the starting selection to use when creating the
editor. It's only used when `defaultContent` is also provided.

**Type**: `SelectionJSON`

</dd>

</dl>

## DOMDocumentOptions {#dom-document-options}

<dl>

<dt>

`document`

</dt>

<dd>

**Type**: `Document`

</dd>

</dl>

## DOMParserOptions {#dom-parser-options}

<dl>

<dt>

`DOMParser`

</dt>

<dd>

**Type**: `typeof DOMParser`

</dd>

</dl>

## DOMSerializerOptions {#dom-serializer-options}

<dl>

<dt>

`DOMSerializer`

</dt>

<dd>

**Type**: `typeof DOMSerializer`

</dd>

</dl>

## EditorOptions {#editor-options}

<dl>

<dt>

`defaultContent`

</dt>

<dd>

The starting document to use when creating the editor. It can be a
ProseMirror node JSON object, a HTML string, or a HTML element instance.

**Type**: `string | NodeJSON | HTMLElement`

</dd>

<dt>

`defaultDoc`

</dt>

<dd>

A JSON object representing the starting document to use when creating the
editor.

**Type**: `NodeJSON`

**Deprecated**

Use `defaultContent` instead.

</dd>

<dt>

`defaultHTML`

</dt>

<dd>

A HTML element or a HTML string representing the starting document to use
when creating the editor.

**Type**: `string | HTMLElement`

**Deprecated**

Use `defaultContent` instead.

</dd>

<dt>

`defaultSelection`

</dt>

<dd>

A JSON object representing the starting selection to use when creating the
editor. It's only used when `defaultContent` is also provided.

**Type**: `SelectionJSON`

</dd>

<dt>

`extension`

</dt>

<dd>

The extension to use when creating the editor.

**Type**: `E`

</dd>

</dl>

## ExpandMarkOptions {#expand-mark-options}

<dl>

<dt>

`type`

</dt>

<dd>

The type of the mark to expand.

**Type**: `string | MarkType`

</dd>

</dl>

## Extension {#extension-1}

<dl>

<dt>

`_type`

</dt>

<dd>

**Type**: `T`

</dd>

<dt>

`extension`

</dt>

<dd>

**Type**: `Extension<ExtensionTyping<any, any, any>> | Extension<ExtensionTyping<any, any, any>>[]`

</dd>

<dt>

`priority`

</dt>

<dd>

**Type**: `Priority`

</dd>

<dt>

`schema`

</dt>

<dd>

The schema that this extension represents.

**Type**: `null | Schema<any, any>`

</dd>

</dl>

## FindParentNodeResult {#find-parent-node-result}

<dl>

<dt>

`depth`

</dt>

<dd>

The depth of the node.

**Type**: `number`

</dd>

<dt>

`node`

</dt>

<dd>

The closest parent node that satisfies the predicate.

**Type**: `Node`

</dd>

<dt>

`pos`

</dt>

<dd>

The position directly before the node.

**Type**: `number`

</dd>

<dt>

`start`

</dt>

<dd>

The position at the start of the node.

**Type**: `number`

</dd>

</dl>

## HistoryOptions {#history-options}

Options for [defineHistory](core.md#define-history).

<dl>

<dt>

`depth`

</dt>

<dd>

The amount of history events that are collected before the oldest events
are discarded.

**Type**: `number`

**Default**: `200`

</dd>

<dt>

`newGroupDelay`

</dt>

<dd>

The delay in milliseconds between changes after which a new group should be
started.

**Type**: `number`

**Default**: `250`

</dd>

</dl>

## InsertDefaultBlockOptions {#insert-default-block-options}

<dl>

<dt>

`pos`

</dt>

<dd>

The position to insert the node at. By default it will insert after the
current selection.

**Type**: `number`

</dd>

</dl>

## InsertNodeOptions {#insert-node-options}

<dl>

<dt>

`attrs`

</dt>

<dd>

When `type` is provided, the attributes of the node to insert.

**Type**: `Attrs`

</dd>

<dt>

`node`

</dt>

<dd>

The node to insert. Either this or `type` must be provided.

**Type**: `Node`

</dd>

<dt>

`pos`

</dt>

<dd>

The position to insert the node at. By default it will be the anchor
position of current selection.

**Type**: `number`

</dd>

<dt>

`type`

</dt>

<dd>

The type of the node to insert. Either this or `node` must be provided.

**Type**: `string | NodeType`

</dd>

</dl>

## JSONParserOptions {#json-parser-options}

<dl>

<dt>

`schema`

</dt>

<dd>

**Type**: `Schema<any, any>`

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

`isActive`

</dt>

<dd>

Checks if the mark is active in the current editor selection. If the
optional `attrs` parameter is provided, it will check if the mark is active
with the given attributes.

**Type**: `(attrs?: Attrs) => boolean`

</dd>

</dl>

## MarkAttrOptions {#mark-attr-options}

<dl>

<dt>

`attr`

</dt>

<dd>

The name of the attribute.

**Type**: `AttrName`

</dd>

<dt>

`default`

</dt>

<dd>

The default value for this attribute, to use when no explicit value is
provided. Attributes that have no default must be provided whenever a node
or mark of a type that has them is created.

**Type**: `AttrType`

</dd>

<dt>

`parseDOM`

</dt>

<dd>

Parses the attribute value from the DOM.

**Type**: `(node: HTMLElement) => AttrType`

</dd>

<dt>

`toDOM`

</dt>

<dd>

Returns the attribute key and value to be set on the HTML element.

If the returned `key` is `"style"`, the value is a string of CSS properties and will
be prepended to the existing `style` attribute on the DOM node.

**Type**: `(value: AttrType) => undefined | null | [key: string, value: string]`

</dd>

<dt>

`type`

</dt>

<dd>

The name of the mark type.

**Type**: `MarkName`

</dd>

<dt>

`validate`

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

**Type**: `string | ((value: unknown) => void)`

</dd>

</dl>

## MarkSpecOptions {#mark-spec-options}

<dl>

<dt>

`attrs`

</dt>

<dd>

The attributes that marks of this type get.

**Type**: `{[K in string | number | symbol]: AttrSpec<Attrs[K]>}`

</dd>

<dt>

`name`

</dt>

<dd>

The name of the mark type.

**Type**: `MarkName`

</dd>

</dl>

## NodeAction {#node-action}

A function for creating a node with optional attributes and any number of
children.

It also has a `isActive` method for checking if the node is active in the
current editor selection.

<dl>

<dt>

`isActive`

</dt>

<dd>

Checks if the node is active in the current editor selection. If the
optional `attrs` parameter is provided, it will check if the node is active
with the given attributes.

**Type**: `(attrs?: Attrs) => boolean`

</dd>

</dl>

## NodeAttrOptions {#node-attr-options}

<dl>

<dt>

`attr`

</dt>

<dd>

The name of the attribute.

**Type**: `AttrName`

</dd>

<dt>

`default`

</dt>

<dd>

The default value for this attribute, to use when no explicit value is
provided. Attributes that have no default must be provided whenever a node
or mark of a type that has them is created.

**Type**: `AttrType`

</dd>

<dt>

`parseDOM`

</dt>

<dd>

Parses the attribute value from the DOM.

**Type**: `(node: HTMLElement) => AttrType`

</dd>

<dt>

`splittable`

</dt>

<dd>

Whether the attribute should be kept when the node is split. Set it to
`true` if you want to inherit the attribute from the previous node when
splitting the node by pressing `Enter`.

**Type**: `boolean`

**Default**: `undefined`

</dd>

<dt>

`toDOM`

</dt>

<dd>

Returns the attribute key and value to be set on the HTML element.

If the returned `key` is `"style"`, the value is a string of CSS properties and will
be prepended to the existing `style` attribute on the DOM node.

**Type**: `(value: AttrType) => undefined | null | [key: string, value: string]`

</dd>

<dt>

`type`

</dt>

<dd>

The name of the node type.

**Type**: `NodeName`

</dd>

<dt>

`validate`

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

**Type**: `string | ((value: unknown) => void)`

</dd>

</dl>

## NodeJSON {#node-json}

A JSON representation of the prosemirror node.

<dl>

<dt>

`attrs`

</dt>

<dd>

**Type**: `Record<string, any>`

</dd>

<dt>

`content`

</dt>

<dd>

**Type**: `NodeJSON[]`

</dd>

<dt>

`marks`

</dt>

<dd>

**Type**: `{ attrs?: Record<string, any>; type: string }[]`

</dd>

<dt>

`text`

</dt>

<dd>

**Type**: `string`

</dd>

<dt>

`type`

</dt>

<dd>

**Type**: `string`

</dd>

</dl>

## NodeSpecOptions {#node-spec-options}

<dl>

<dt>

`attrs`

</dt>

<dd>

The attributes that nodes of this type get.

**Type**: `{[key in string | number | symbol]: AttrSpec<Attrs[key]>}`

</dd>

<dt>

`name`

</dt>

<dd>

The name of the node type.

**Type**: `NodeName`

</dd>

<dt>

`topNode`

</dt>

<dd>

Whether this is the top-level node type. Only one node type can be the
top-level node type in a schema.

**Type**: `boolean`

</dd>

</dl>

## NodeViewOptions {#node-view-options}

<dl>

<dt>

`constructor`

</dt>

<dd>

**Type**: `NodeViewConstructor`

</dd>

<dt>

`name`

</dt>

<dd>

**Type**: `string`

</dd>

</dl>

## RemoveMarkOptions {#remove-mark-options}

<dl>

<dt>

`attrs`

</dt>

<dd>

If attrs is given, remove precisely the mark with the given attrs. Otherwise, remove all marks of the given type.

**Type**: `null | Attrs`

</dd>

<dt>

`from`

</dt>

<dd>

The start position of the document. By default it will be the start position of current selection.

**Type**: `number`

</dd>

<dt>

`to`

</dt>

<dd>

The end position of the document. By default it will be the end position of current selection.

**Type**: `number`

</dd>

<dt>

`type`

</dt>

<dd>

The type of the mark to remove.

**Type**: `string | MarkType`

</dd>

</dl>

## RemoveNodeOptions {#remove-node-options}

<dl>

<dt>

`pos`

</dt>

<dd>

The document position to start searching node. By default it will be the
anchor position of current selection.

**Type**: `number`

</dd>

<dt>

`type`

</dt>

<dd>

The type of the node to remove.

**Type**: `string | NodeType`

</dd>

</dl>

## SelectionJSON {#selection-json}

A JSON representation of the prosemirror selection.

<dl>

<dt>

`anchor`

</dt>

<dd>

**Type**: `number`

</dd>

<dt>

`head`

</dt>

<dd>

**Type**: `number`

</dd>

<dt>

`type`

</dt>

<dd>

**Type**: `string`

</dd>

</dl>

## SetBlockTypeOptions {#set-block-type-options}

<dl>

<dt>

`attrs`

</dt>

<dd>

**Type**: `null | Attrs`

</dd>

<dt>

`from`

</dt>

<dd>

**Type**: `number`

</dd>

<dt>

`to`

</dt>

<dd>

**Type**: `number`

</dd>

<dt>

`type`

</dt>

<dd>

**Type**: `string | NodeType`

</dd>

</dl>

## SetNodeAttrsOptions {#set-node-attrs-options}

<dl>

<dt>

`attrs`

</dt>

<dd>

The attributes to set.

**Type**: `Attrs`

</dd>

<dt>

`pos`

</dt>

<dd>

The position of the node. Defaults to the position of the wrapping node
containing the current selection.

**Type**: `number`

</dd>

<dt>

`type`

</dt>

<dd>

The type of node to set the attributes of.

If current node is not of this type, the command will do nothing.

**Type**: `string | NodeType | string[] | NodeType[]`

</dd>

</dl>

## StateJSON {#state-json}

A JSON representation of the prosemirror state.

<dl>

<dt>

`doc`

</dt>

<dd>

The main `ProseMirror` doc.

**Type**: `NodeJSON`

</dd>

<dt>

`selection`

</dt>

<dd>

The current selection.

**Type**: `SelectionJSON`

</dd>

</dl>

## StepJSON {#step-json}

A JSON representation of the prosemirror step.

<dl>

<dt>

`stepType`

</dt>

<dd>

The type of the step.

**Type**: `string`

</dd>

</dl>

## ToggleMarkOptions {#toggle-mark-options}

<dl>

<dt>

`attrs`

</dt>

<dd>

The optional attributes to set on the mark.

**Type**: `null | Attrs`

</dd>

<dt>

`enterInlineAtoms`

</dt>

<dd>

Whether the command should act on the content of inline nodes marked as
[atoms](https://prosemirror.net/docs/ref/#model.NodeSpec.atom) that are
completely covered by a selection range.

**Type**: `boolean`

**Default**: `true`

</dd>

<dt>

`removeWhenPresent`

</dt>

<dd>

Controls whether, when part of the selected range has the mark
already and part doesn't, the mark is removed (`true`) or added
(`false`).

**Type**: `boolean`

**Default**: `false`

</dd>

<dt>

`type`

</dt>

<dd>

The mark type to toggle.

**Type**: `string | MarkType`

</dd>

</dl>

## ToggleNodeOptions {#toggle-node-options}

<dl>

<dt>

`attrs`

</dt>

<dd>

The attributes of the node to toggle.

**Type**: `null | Attrs`

</dd>

<dt>

`type`

</dt>

<dd>

The type of the node to toggle.

**Type**: `string | NodeType`

</dd>

</dl>

## ToggleWrapOptions {#toggle-wrap-options}

<dl>

<dt>

`attrs`

</dt>

<dd>

The attributes of the node to toggle.

**Type**: `null | Attrs`

</dd>

<dt>

`type`

</dt>

<dd>

The type of the node to toggle.

**Type**: `string | NodeType`

</dd>

</dl>

## UnsetBlockTypeOptions {#unset-block-type-options}

<dl>

<dt>

`from`

</dt>

<dd>

The start position of the document. By default it will be the start position of current selection.

**Type**: `number`

</dd>

<dt>

`to`

</dt>

<dd>

The end position of the document. By default it will be the end position of current selection.

**Type**: `number`

</dd>

</dl>

## UnsetMarkOptions {#unset-mark-options}

<dl>

<dt>

`from`

</dt>

<dd>

The start position of the document. By default it will be the start position of current selection.

**Type**: `number`

</dd>

<dt>

`to`

</dt>

<dd>

The end position of the document. By default it will be the end position of current selection.

**Type**: `number`

</dd>

</dl>

## WrapOptions {#wrap-options}

<dl>

<dt>

`attrs`

</dt>

<dd>

Optional attributes to apply to the node.

**Type**: `null | Attrs`

</dd>

<dt>

`nodeType`

</dt>

<dd>

**Type**: `NodeType`

**Deprecated**

Use `nodeSpec` instead.

</dd>

<dt>

`type`

</dt>

<dd>

The node type to wrap the selected textblock with.

**Type**: `string | NodeType`

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
