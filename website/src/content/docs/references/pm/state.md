---
title: prosekit/pm/state
sidebar:
  label: pm/state
---


Re-exports from [prosemirror-state](https://github.com/ProseMirror/prosemirror-state).

## AllSelection {#all-selection}

**Extends** `Selection`

A selection type that represents selecting the whole document
(which can not necessarily be expressed with a text selection, when
there are for example leaf block nodes at the start or end of the
document).

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new AllSelection(doc: ProseMirrorNode): AllSelection
```

</dd>

<dt>

`eq`

</dt>

<dd>

Test whether the selection is the same as another selection.

```ts
const eq: (other: Selection) => boolean
```

</dd>

<dt>

`getBookmark`

</dt>

<dd>

Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
which is a value that can be mapped without having access to a
current document, and later resolved to a real selection for a
given document again. (This is used mostly by the history to
track and restore old selections.) The default implementation of
this method just converts the selection to a text selection and
returns the bookmark for that.

```ts
const getBookmark: () => { map: any; resolve: any }
```

</dd>

<dt>

`map`

</dt>

<dd>

Map this selection through a [mappable](https://prosemirror.net/docs/ref/#transform.Mappable)
thing. `doc` should be the new document to which we are mapping.

```ts
const map: (doc: ProseMirrorNode) => AllSelection
```

</dd>

<dt>

`replace`

</dt>

<dd>

Replace the selection with a slice or, if no slice is given,
delete the selection. Will append to the given transaction.

```ts
const replace: (tr: Transaction, content?: Slice) => void
```

</dd>

<dt>

`toJSON`

</dt>

<dd>

Convert the selection to a JSON representation. When implementing
this for a custom selection class, make sure to give the object a
`type` property whose value matches the ID under which you
[registered](https://prosemirror.net/docs/ref/#state.Selection^jsonID) your class.

```ts
const toJSON: () => any
```

</dd>

</dl>

## EditorState {#editor-state}

The state of a ProseMirror editor is represented by an object of
this type. A state is a persistent data structure—it isn't
updated, but rather a new state value is computed from an old one
using the [`apply`](https://prosemirror.net/docs/ref/#state.EditorState.apply) method.

A state holds a number of built-in fields, and plugins can
[define](https://prosemirror.net/docs/ref/#state.PluginSpec.state) additional fields.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new EditorState(): EditorState
```

</dd>

<dt>

`doc: ProseMirrorNode`

</dt>

<dd>

The current document.

</dd>

<dt>

`selection: Selection`

</dt>

<dd>

The selection.

</dd>

<dt>

`storedMarks: null | readonly Mark[]`

</dt>

<dd>

A set of marks to apply to the next input. Will be null when
no explicit marks have been set.

</dd>

<dt>

`get plugins(): readonly ProseMirrorPlugin<any>[]`

</dt>

<dd>

The plugins that are active in this state.

</dd>

<dt>

`get schema(): Schema`

</dt>

<dd>

The schema of the state's document.

</dd>

<dt>

`get tr(): Transaction`

</dt>

<dd>

Start a [transaction](https://prosemirror.net/docs/ref/#state.Transaction) from this state.

</dd>

<dt>

`apply`

</dt>

<dd>

Apply the given transaction to produce a new state.

```ts
const apply: (tr: Transaction) => EditorState
```

</dd>

<dt>

`applyTransaction`

</dt>

<dd>

Verbose variant of [`apply`](https://prosemirror.net/docs/ref/#state.EditorState.apply) that
returns the precise transactions that were applied (which might
be influenced by the [transaction
hooks](https://prosemirror.net/docs/ref/#state.PluginSpec.filterTransaction) of
plugins) along with the new state.

```ts
const applyTransaction: (rootTr: Transaction) => { state: EditorState; transactions: readonly Transaction[] }
```

</dd>

<dt>

`reconfigure`

</dt>

<dd>

Create a new state based on this one, but with an adjusted set
of active plugins. State fields that exist in both sets of
plugins are kept unchanged. Those that no longer exist are
dropped, and those that are new are initialized using their
[`init`](https://prosemirror.net/docs/ref/#state.StateField.init) method, passing in the new
configuration object..

```ts
const reconfigure: (config: { plugins?: readonly ProseMirrorPlugin<any>[] }) => EditorState
```

</dd>

<dt>

`toJSON`

</dt>

<dd>

Serialize this state to JSON. If you want to serialize the state
of plugins, pass an object mapping property names to use in the
resulting JSON object to plugin objects. The argument may also be
a string or number, in which case it is ignored, to support the
way `JSON.stringify` calls `toString` methods.

```ts
const toJSON: (pluginFields?: { [propName]: ProseMirrorPlugin<any> }) => any
```

</dd>

<dt>

`create`

</dt>

<dd>

Create a new state.

```ts
const create: (config: EditorStateConfig) => EditorState
```

</dd>

<dt>

`fromJSON`

</dt>

<dd>

Deserialize a JSON representation of a state. `config` should
have at least a `schema` field, and should contain array of
plugins to initialize the state with. `pluginFields` can be used
to deserialize the state of plugins, by associating plugin
instances with the property names they use in the JSON object.

```ts
const fromJSON: (config: { plugins?: readonly ProseMirrorPlugin<any>[]; schema: Schema }, json: any, pluginFields?: { [propName]: ProseMirrorPlugin<any> }) => EditorState
```

</dd>

</dl>

## NodeSelection {#node-selection}

**Extends** `Selection`

A node selection is a selection that points at a single node. All
nodes marked [selectable](https://prosemirror.net/docs/ref/#model.NodeSpec.selectable) can be the
target of a node selection. In such a selection, `from` and `to`
point directly before and after the selected node, `anchor` equals
`from`, and `head` equals `to`..

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new NodeSelection($pos: ResolvedPos): NodeSelection
```

</dd>

<dt>

`node: ProseMirrorNode`

</dt>

<dd>

The selected node.

</dd>

<dt>

`content`

</dt>

<dd>

Get the content of this selection as a slice.

```ts
const content: () => Slice
```

</dd>

<dt>

`eq`

</dt>

<dd>

Test whether the selection is the same as another selection.

```ts
const eq: (other: Selection) => boolean
```

</dd>

<dt>

`getBookmark`

</dt>

<dd>

Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
which is a value that can be mapped without having access to a
current document, and later resolved to a real selection for a
given document again. (This is used mostly by the history to
track and restore old selections.) The default implementation of
this method just converts the selection to a text selection and
returns the bookmark for that.

```ts
const getBookmark: () => NodeBookmark
```

</dd>

<dt>

`map`

</dt>

<dd>

Map this selection through a [mappable](https://prosemirror.net/docs/ref/#transform.Mappable)
thing. `doc` should be the new document to which we are mapping.

```ts
const map: (doc: ProseMirrorNode, mapping: Mappable) => Selection
```

</dd>

<dt>

`toJSON`

</dt>

<dd>

Convert the selection to a JSON representation. When implementing
this for a custom selection class, make sure to give the object a
`type` property whose value matches the ID under which you
[registered](https://prosemirror.net/docs/ref/#state.Selection^jsonID) your class.

```ts
const toJSON: () => any
```

</dd>

<dt>

`create`

</dt>

<dd>

Create a node selection from non-resolved positions.

```ts
const create: (doc: ProseMirrorNode, from: number) => NodeSelection
```

</dd>

<dt>

`isSelectable`

</dt>

<dd>

Determines whether the given node may be selected as a node
selection.

```ts
const isSelectable: (node: ProseMirrorNode) => boolean
```

</dd>

</dl>

## PluginKey {#plugin-key}

A key is used to [tag](https://prosemirror.net/docs/ref/#state.PluginSpec.key) plugins in a way
that makes it possible to find them, given an editor state.
Assigning a key does mean only one plugin of that type can be
active in a state.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new PluginKey<PluginState>(name?: string): PluginKey<PluginState>
```

</dd>

<dt>

`get`

</dt>

<dd>

Get the active plugin with this key, if any, from an editor
state.

```ts
const get: (state: EditorState) => undefined | ProseMirrorPlugin<PluginState>
```

</dd>

<dt>

`getState`

</dt>

<dd>

Get the plugin's state from an editor state.

```ts
const getState: (state: EditorState) => undefined | PluginState
```

</dd>

</dl>

## ProseMirrorPlugin {#prose-mirror-plugin}

Plugins bundle functionality that can be added to an editor.
They are part of the [editor state](https://prosemirror.net/docs/ref/#state.EditorState) and
may influence that state and the view that contains it.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new ProseMirrorPlugin<PluginState>(spec: PluginSpec<PluginState>): ProseMirrorPlugin<PluginState>
```

</dd>

<dt>

`props: EditorProps<ProseMirrorPlugin<PluginState>>`

</dt>

<dd>

The [props](https://prosemirror.net/docs/ref/#view.EditorProps) exported by this plugin.

</dd>

<dt>

`spec: PluginSpec<PluginState>`

</dt>

<dd>

The plugin's [spec object](https://prosemirror.net/docs/ref/#state.PluginSpec).

</dd>

<dt>

`getState`

</dt>

<dd>

Extract the plugin's state field from an editor state.

```ts
const getState: (state: EditorState) => undefined | PluginState
```

</dd>

</dl>

## Selection {#selection-2}

Superclass for editor selections. Every selection type should
extend this. Should not be instantiated directly.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new Selection($anchor: ResolvedPos, $head: ResolvedPos, ranges?: readonly SelectionRange[]): Selection
```

</dd>

<dt>

`$anchor: ResolvedPos`

</dt>

<dd>

The resolved anchor of the selection (the side that stays in
place when the selection is modified).

</dd>

<dt>

`$head: ResolvedPos`

</dt>

<dd>

The resolved head of the selection (the side that moves when
the selection is modified).

</dd>

<dt>

`ranges: readonly SelectionRange[]`

</dt>

<dd>

The ranges covered by the selection.

</dd>

<dt>

`visible: boolean`

</dt>

<dd>

Controls whether, when a selection of this type is active in the
browser, the selected range should be visible to the user.
Defaults to `true`.

</dd>

<dt>

`get $from(): ResolvedPos`

</dt>

<dd>

The resolved lower  bound of the selection's main range.

</dd>

<dt>

`get $to(): ResolvedPos`

</dt>

<dd>

The resolved upper bound of the selection's main range.

</dd>

<dt>

`get anchor(): number`

</dt>

<dd>

The selection's anchor, as an unresolved position.

</dd>

<dt>

`get empty(): boolean`

</dt>

<dd>

Indicates whether the selection contains any content.

</dd>

<dt>

`get from(): number`

</dt>

<dd>

The lower bound of the selection's main range.

</dd>

<dt>

`get head(): number`

</dt>

<dd>

The selection's head.

</dd>

<dt>

`get to(): number`

</dt>

<dd>

The upper bound of the selection's main range.

</dd>

<dt>

`content`

</dt>

<dd>

Get the content of this selection as a slice.

```ts
const content: () => Slice
```

</dd>

<dt>

`eq`

</dt>

<dd>

Test whether the selection is the same as another selection.

```ts
const eq: (selection: Selection) => boolean
```

</dd>

<dt>

`getBookmark`

</dt>

<dd>

Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
which is a value that can be mapped without having access to a
current document, and later resolved to a real selection for a
given document again. (This is used mostly by the history to
track and restore old selections.) The default implementation of
this method just converts the selection to a text selection and
returns the bookmark for that.

```ts
const getBookmark: () => SelectionBookmark
```

</dd>

<dt>

`map`

</dt>

<dd>

Map this selection through a [mappable](https://prosemirror.net/docs/ref/#transform.Mappable)
thing. `doc` should be the new document to which we are mapping.

```ts
const map: (doc: ProseMirrorNode, mapping: Mappable) => Selection
```

</dd>

<dt>

`replace`

</dt>

<dd>

Replace the selection with a slice or, if no slice is given,
delete the selection. Will append to the given transaction.

```ts
const replace: (tr: Transaction, content?: Slice) => void
```

</dd>

<dt>

`replaceWith`

</dt>

<dd>

Replace the selection with the given node, appending the changes
to the given transaction.

```ts
const replaceWith: (tr: Transaction, node: ProseMirrorNode) => void
```

</dd>

<dt>

`toJSON`

</dt>

<dd>

Convert the selection to a JSON representation. When implementing
this for a custom selection class, make sure to give the object a
`type` property whose value matches the ID under which you
[registered](https://prosemirror.net/docs/ref/#state.Selection^jsonID) your class.

```ts
const toJSON: () => any
```

</dd>

<dt>

`atEnd`

</dt>

<dd>

Find the cursor or leaf node selection closest to the end of the
given document.

```ts
const atEnd: (doc: ProseMirrorNode) => Selection
```

</dd>

<dt>

`atStart`

</dt>

<dd>

Find the cursor or leaf node selection closest to the start of
the given document. Will return an
[`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
exists.

```ts
const atStart: (doc: ProseMirrorNode) => Selection
```

</dd>

<dt>

`findFrom`

</dt>

<dd>

Find a valid cursor or leaf node selection starting at the given
position and searching back if `dir` is negative, and forward if
positive. When `textOnly` is true, only consider cursor
selections. Will return null when no valid selection position is
found.

```ts
const findFrom: ($pos: ResolvedPos, dir: number, textOnly?: boolean) => null | Selection
```

</dd>

<dt>

`fromJSON`

</dt>

<dd>

Deserialize the JSON representation of a selection. Must be
implemented for custom classes (as a static class method).

```ts
const fromJSON: (doc: ProseMirrorNode, json: any) => Selection
```

</dd>

<dt>

`jsonID`

</dt>

<dd>

To be able to deserialize selections from JSON, custom selection
classes must register themselves with an ID string, so that they
can be disambiguated. Try to pick something that's unlikely to
clash with classes from other modules.

```ts
const jsonID: (id: string, selectionClass: { fromJSON: (doc: ProseMirrorNode, json: any) => Selection }) => { fromJSON: (doc: ProseMirrorNode, json: any) => Selection }
```

</dd>

<dt>

`near`

</dt>

<dd>

Find a valid cursor or leaf node selection near the given
position. Searches forward first by default, but if `bias` is
negative, it will search backwards first.

```ts
const near: ($pos: ResolvedPos, bias?: number) => Selection
```

</dd>

</dl>

## SelectionRange {#selection-range}

Represents a selected range in a document.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new SelectionRange($from: ResolvedPos, $to: ResolvedPos): SelectionRange
```

</dd>

<dt>

`$from: ResolvedPos`

</dt>

<dd>

The lower bound of the range.

</dd>

<dt>

`$to: ResolvedPos`

</dt>

<dd>

The upper bound of the range.

</dd>

</dl>

## TextSelection {#text-selection}

**Extends** `Selection`

A text selection represents a classical editor selection, with a
head (the moving side) and anchor (immobile side), both of which
point into textblock nodes. It can be empty (a regular cursor
position).

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new TextSelection($anchor: ResolvedPos, $head?: ResolvedPos): TextSelection
```

</dd>

<dt>

`get $cursor(): null | ResolvedPos`

</dt>

<dd>

Returns a resolved position if this is a cursor selection (an
empty text selection), and null otherwise.

</dd>

<dt>

`eq`

</dt>

<dd>

Test whether the selection is the same as another selection.

```ts
const eq: (other: Selection) => boolean
```

</dd>

<dt>

`getBookmark`

</dt>

<dd>

Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
which is a value that can be mapped without having access to a
current document, and later resolved to a real selection for a
given document again. (This is used mostly by the history to
track and restore old selections.) The default implementation of
this method just converts the selection to a text selection and
returns the bookmark for that.

```ts
const getBookmark: () => TextBookmark
```

</dd>

<dt>

`map`

</dt>

<dd>

Map this selection through a [mappable](https://prosemirror.net/docs/ref/#transform.Mappable)
thing. `doc` should be the new document to which we are mapping.

```ts
const map: (doc: ProseMirrorNode, mapping: Mappable) => Selection
```

</dd>

<dt>

`replace`

</dt>

<dd>

Replace the selection with a slice or, if no slice is given,
delete the selection. Will append to the given transaction.

```ts
const replace: (tr: Transaction, content?: Slice) => void
```

</dd>

<dt>

`toJSON`

</dt>

<dd>

Convert the selection to a JSON representation. When implementing
this for a custom selection class, make sure to give the object a
`type` property whose value matches the ID under which you
[registered](https://prosemirror.net/docs/ref/#state.Selection^jsonID) your class.

```ts
const toJSON: () => any
```

</dd>

<dt>

`between`

</dt>

<dd>

Return a text selection that spans the given positions or, if
they aren't text positions, find a text selection near them.
`bias` determines whether the method searches forward (default)
or backwards (negative number) first. Will fall back to calling
[`Selection.near`](https://prosemirror.net/docs/ref/#state.Selection^near) when the document
doesn't contain a valid text position.

```ts
const between: ($anchor: ResolvedPos, $head: ResolvedPos, bias?: number) => Selection
```

</dd>

<dt>

`create`

</dt>

<dd>

Create a text selection from non-resolved positions.

```ts
const create: (doc: ProseMirrorNode, anchor: number, head?: number) => TextSelection
```

</dd>

</dl>

## Transaction {#transaction}

**Extends** `Transform`

An editor state transaction, which can be applied to a state to
create an updated state. Use
[`EditorState.tr`](https://prosemirror.net/docs/ref/#state.EditorState.tr) to create an instance.

Transactions track changes to the document (they are a subclass of
[`Transform`](https://prosemirror.net/docs/ref/#transform.Transform)), but also other state changes,
like selection updates and adjustments of the set of [stored
marks](https://prosemirror.net/docs/ref/#state.EditorState.storedMarks). In addition, you can store
metadata properties in a transaction, which are extra pieces of
information that client code or plugins can use to describe what a
transaction represents, so that they can update their [own
state](https://prosemirror.net/docs/ref/#state.StateField) accordingly.

The [editor view](https://prosemirror.net/docs/ref/#view.EditorView) uses a few metadata
properties: it will attach a property `"pointer"` with the value
`true` to selection transactions directly caused by mouse or touch
input, a `"composition"` property holding an ID identifying the
composition that caused it to transactions caused by composed DOM
input, and a `"uiEvent"` property of that may be `"paste"`,
`"cut"`, or `"drop"`.

<dl>

<dt>

`storedMarks: null | readonly Mark[]`

</dt>

<dd>

The stored marks set by this transaction, if any.

</dd>

<dt>

`time: number`

</dt>

<dd>

The timestamp associated with this transaction, in the same
format as `Date.now()`.

</dd>

<dt>

`get isGeneric(): boolean`

</dt>

<dd>

Returns true if this transaction doesn't contain any metadata,
and can thus safely be extended.

</dd>

<dt>

`get scrolledIntoView(): boolean`

</dt>

<dd>

True when this transaction has had `scrollIntoView` called on it.

</dd>

<dt>

`get selection(): Selection`

</dt>

<dd>

The transaction's current selection. This defaults to the editor
selection [mapped](https://prosemirror.net/docs/ref/#state.Selection.map) through the steps in the
transaction, but can be overwritten with
[`setSelection`](https://prosemirror.net/docs/ref/#state.Transaction.setSelection).

</dd>

<dt>

`get selectionSet(): boolean`

</dt>

<dd>

Whether the selection was explicitly updated by this transaction.

</dd>

<dt>

`get storedMarksSet(): boolean`

</dt>

<dd>

Whether the stored marks were explicitly set for this transaction.

</dd>

<dt>

`addStoredMark`

</dt>

<dd>

Add a mark to the set of stored marks.

```ts
const addStoredMark: (mark: Mark) => this
```

</dd>

<dt>

`deleteSelection`

</dt>

<dd>

Delete the selection.

```ts
const deleteSelection: () => this
```

</dd>

<dt>

`ensureMarks`

</dt>

<dd>

Make sure the current stored marks or, if that is null, the marks
at the selection, match the given set of marks. Does nothing if
this is already the case.

```ts
const ensureMarks: (marks: readonly Mark[]) => this
```

</dd>

<dt>

`getMeta`

</dt>

<dd>

Retrieve a metadata property for a given name or plugin.

```ts
const getMeta: (key: string | ProseMirrorPlugin<any> | PluginKey<any>) => any
```

</dd>

<dt>

`insertText`

</dt>

<dd>

Replace the given range, or the selection if no range is given,
with a text node containing the given string.

```ts
const insertText: (text: string, from?: number, to?: number) => this
```

</dd>

<dt>

`removeStoredMark`

</dt>

<dd>

Remove a mark or mark type from the set of stored marks.

```ts
const removeStoredMark: (mark: MarkType | Mark) => this
```

</dd>

<dt>

`replaceSelection`

</dt>

<dd>

Replace the current selection with the given slice.

```ts
const replaceSelection: (slice: Slice) => this
```

</dd>

<dt>

`replaceSelectionWith`

</dt>

<dd>

Replace the selection with the given node. When `inheritMarks` is
true and the content is inline, it inherits the marks from the
place where it is inserted.

```ts
const replaceSelectionWith: (node: ProseMirrorNode, inheritMarks?: boolean) => this
```

</dd>

<dt>

`scrollIntoView`

</dt>

<dd>

Indicate that the editor should scroll the selection into view
when updated to the state produced by this transaction.

```ts
const scrollIntoView: () => this
```

</dd>

<dt>

`setMeta`

</dt>

<dd>

Store a metadata property in this transaction, keyed either by
name or by plugin.

```ts
const setMeta: (key: string | ProseMirrorPlugin<any> | PluginKey<any>, value: any) => this
```

</dd>

<dt>

`setSelection`

</dt>

<dd>

Update the transaction's current selection. Will determine the
selection that the editor gets when the transaction is applied.

```ts
const setSelection: (selection: Selection) => this
```

</dd>

<dt>

`setStoredMarks`

</dt>

<dd>

Set the current stored marks.

```ts
const setStoredMarks: (marks: null | readonly Mark[]) => this
```

</dd>

<dt>

`setTime`

</dt>

<dd>

Update the timestamp for the transaction.

```ts
const setTime: (time: number) => this
```

</dd>

</dl>

## EditorStateConfig {#editor-state-config}

The type of object passed to
[`EditorState.create`](https://prosemirror.net/docs/ref/#state.EditorState^create).

<dl>

<dt>

`doc?: ProseMirrorNode`

</dt>

<dd>

The starting document. Either this or `schema` *must* be
provided.

</dd>

<dt>

`plugins?: readonly ProseMirrorPlugin<any>[]`

</dt>

<dd>

The plugins that should be active in this state.

</dd>

<dt>

`schema?: Schema<any, any>`

</dt>

<dd>

The schema to use (only relevant if no `doc` is specified).

</dd>

<dt>

`selection?: Selection`

</dt>

<dd>

A valid selection in the document.

</dd>

<dt>

`storedMarks?: null | readonly Mark[]`

</dt>

<dd>

The initial set of [stored marks](https://prosemirror.net/docs/ref/#state.EditorState.storedMarks).

</dd>

</dl>

## PluginSpec {#plugin-spec}

This is the type passed to the [`Plugin`](https://prosemirror.net/docs/ref/#state.Plugin)
constructor. It provides a definition for a plugin.

<dl>

<dt>

`appendTransaction?: (transactions: readonly Transaction[], oldState: EditorState, newState: EditorState) => undefined | null | Transaction`

</dt>

<dd>

Allows the plugin to append another transaction to be applied
after the given array of transactions. When another plugin
appends a transaction after this was called, it is called again
with the new state and new transactions—but only the new
transactions, i.e. it won't be passed transactions that it
already saw.

</dd>

<dt>

`filterTransaction?: (tr: Transaction, state: EditorState) => boolean`

</dt>

<dd>

When present, this will be called before a transaction is
applied by the state, allowing the plugin to cancel it (by
returning false).

</dd>

<dt>

`key?: PluginKey<any>`

</dt>

<dd>

Can be used to make this a keyed plugin. You can have only one
plugin with a given key in a given state, but it is possible to
access the plugin's configuration and state through the key,
without having access to the plugin instance object.

</dd>

<dt>

`props?: EditorProps<ProseMirrorPlugin<PluginState>>`

</dt>

<dd>

The [view props](https://prosemirror.net/docs/ref/#view.EditorProps) added by this plugin. Props
that are functions will be bound to have the plugin instance as
their `this` binding.

</dd>

<dt>

`state?: StateField<PluginState>`

</dt>

<dd>

Allows a plugin to define a [state field](https://prosemirror.net/docs/ref/#state.StateField), an
extra slot in the state object in which it can keep its own data.

</dd>

<dt>

`view?: (view: EditorView) => PluginView`

</dt>

<dd>

When the plugin needs to interact with the editor view, or
set something up in the DOM, use this field. The function
will be called when the plugin's state is associated with an
editor view.

</dd>

</dl>

## SelectionBookmark {#selection-bookmark}

A lightweight, document-independent representation of a selection.
You can define a custom bookmark type for a custom selection class
to make the history handle it well.

<dl>

<dt>

`map: (mapping: Mappable) => SelectionBookmark`

</dt>

<dd>

Map the bookmark through a set of changes.

</dd>

<dt>

`resolve: (doc: ProseMirrorNode) => Selection`

</dt>

<dd>

Resolve the bookmark to a real selection again. This may need to
do some error checking and may fall back to a default (usually
[`TextSelection.between`](https://prosemirror.net/docs/ref/#state.TextSelection^between)) if
mapping made the bookmark invalid.

</dd>

</dl>

## StateField {#state-field}

A plugin spec may provide a state field (under its
[`state`](https://prosemirror.net/docs/ref/#state.PluginSpec.state) property) of this type, which
describes the state it wants to keep. Functions provided here are
always called with the plugin instance as their `this` binding.

<dl>

<dt>

`apply: (tr: Transaction, value: T, oldState: EditorState, newState: EditorState) => T`

</dt>

<dd>

Apply the given transaction to this state field, producing a new
field value. Note that the `newState` argument is again a partially
constructed state does not yet contain the state from plugins
coming after this one.

</dd>

<dt>

`fromJSON?: (config: EditorStateConfig, value: any, state: EditorState) => T`

</dt>

<dd>

Deserialize the JSON representation of this field. Note that the
`state` argument is again a half-initialized state.

</dd>

<dt>

`init: (config: EditorStateConfig, instance: EditorState) => T`

</dt>

<dd>

Initialize the value of the field. `config` will be the object
passed to [`EditorState.create`](https://prosemirror.net/docs/ref/#state.EditorState^create). Note
that `instance` is a half-initialized state instance, and will
not have values for plugin fields initialized after this one.

</dd>

<dt>

`toJSON?: (value: T) => any`

</dt>

<dd>

Convert this field to JSON. Optional, can be left off to disable
JSON serialization for the field.

</dd>

</dl>

## Command {#command}

Commands are functions that take a state and a an optional
transaction dispatch function and...

* determine whether they apply to this state
* if not, return false
* if `dispatch` was passed, perform their effect, possibly by
  passing a transaction to `dispatch`
* return true

In some cases, the editor view is passed as a third argument.

**Type**: `(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView) => boolean`

## PluginView {#plugin-view}

A stateful object that can be installed in an editor by a
[plugin](https://prosemirror.net/docs/ref/#state.PluginSpec.view).

**Type**: `{ destroy?: () => void; update?: (view: EditorView, prevState: EditorState) => void }`

## Plugin {#plugin}

<!-- Declaration kind 4194304 is not implemented (name: Plugin) -->
