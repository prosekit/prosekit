---
title: prosekit/pm/state
sidebar:
  label: pm/state
---

Re-exports from [prosemirror-state](https://github.com/ProseMirror/prosemirror-state).

## Classes

### EditorState {#editorstate}

The state of a ProseMirror editor is represented by an object of
this type. A state is a persistent data structure—it isn't
updated, but rather a new state value is computed from an old one
using the [`apply`](https://prosemirror.net/docs/ref/#state.EditorState.apply) method.

A state holds a number of built-in fields, and plugins can
[define](https://prosemirror.net/docs/ref/#state.PluginSpec.state) additional fields.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor" href="#constructor">EditorState</a>(): [`EditorState`](#editorstate)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="doc-1" href="#doc-1">doc</a>: [`ProseMirrorNode`](model.md#prosemirrornode)</code>

</dt>

<dd>

The current document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="selection-1" href="#selection-1">selection</a>: [`Selection`](#selection-3)</code>

</dt>

<dd>

The selection.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="storedmarks-1" href="#storedmarks-1">storedMarks</a>: `null` \| readonly [`Mark`](model.md#mark)[]</code>

</dt>

<dd>

A set of marks to apply to the next input. Will be null when
no explicit marks have been set.

</dd>

</dl>

#### Accessors

<dl>

<dt>

<code data-typedoc-code>get <a id="schema-1" href="#schema-1">schema</a>(): [`Schema`](model.md#schema-3)</code>

</dt>

<dd>

The schema of the state's document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="plugins-1" href="#plugins-1">plugins</a>(): readonly [`ProseMirrorPlugin`](#prosemirrorplugin)\<`any`\>[]</code>

</dt>

<dd>

The plugins that are active in this state.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="tr" href="#tr">tr</a>(): [`Transaction`](#transaction)</code>

</dt>

<dd>

Start a [transaction](https://prosemirror.net/docs/ref/#state.Transaction) from this state.

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="create" href="#create">create</a>(`config`: [`EditorStateConfig`](#editorstateconfig)): [`EditorState`](#editorstate)</code>

</dt>

<dd>

Create a new state.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="fromjson" href="#fromjson">fromJSON</a>(`config`: `object`, `json`: `any`, `pluginFields?`: `object`): [`EditorState`](#editorstate)</code>

</dt>

<dd>

Deserialize a JSON representation of a state. `config` should
have at least a `schema` field, and should contain array of
plugins to initialize the state with. `pluginFields` can be used
to deserialize the state of plugins, by associating plugin
instances with the property names they use in the JSON object.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="apply" href="#apply">apply</a>(`tr`: [`Transaction`](#transaction)): [`EditorState`](#editorstate)</code>

</dt>

<dd>

Apply the given transaction to produce a new state.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="applytransaction" href="#applytransaction">applyTransaction</a>(`rootTr`: [`Transaction`](#transaction)): `object`</code>

</dt>

<dd>

Verbose variant of [`apply`](https://prosemirror.net/docs/ref/#state.EditorState.apply) that
returns the precise transactions that were applied (which might
be influenced by the [transaction
hooks](https://prosemirror.net/docs/ref/#state.PluginSpec.filterTransaction) of
plugins) along with the new state.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="reconfigure" href="#reconfigure">reconfigure</a>(`config`: `object`): [`EditorState`](#editorstate)</code>

</dt>

<dd>

Create a new state based on this one, but with an adjusted set
of active plugins. State fields that exist in both sets of
plugins are kept unchanged. Those that no longer exist are
dropped, and those that are new are initialized using their
[`init`](https://prosemirror.net/docs/ref/#state.StateField.init) method, passing in the new
configuration object..

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="tojson" href="#tojson">toJSON</a>(`pluginFields?`: `object`): `any`</code>

</dt>

<dd>

Serialize this state to JSON. If you want to serialize the state
of plugins, pass an object mapping property names to use in the
resulting JSON object to plugin objects. The argument may also be
a string or number, in which case it is ignored, to support the
way `JSON.stringify` calls `toString` methods.

</dd>

</dl>

***

### ProseMirrorPlugin {#prosemirrorplugin}

Plugins bundle functionality that can be added to an editor.
They are part of the [editor state](https://prosemirror.net/docs/ref/#state.EditorState) and
may influence that state and the view that contains it.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-1" href="#constructor-1">ProseMirrorPlugin</a>\<PluginState\>(`spec`: [`PluginSpec`](#pluginspec)\<`PluginState`\>): [`ProseMirrorPlugin`](#prosemirrorplugin)\<`PluginState`\></code>

</dt>

<dd>

Create a plugin.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="spec" href="#spec">spec</a>: [`PluginSpec`](#pluginspec)\<`PluginState`\></code>

</dt>

<dd>

The plugin's [spec object](https://prosemirror.net/docs/ref/#state.PluginSpec).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="props-1" href="#props-1">props</a>: [`EditorProps`](view.md#editorprops)\<[`ProseMirrorPlugin`](#prosemirrorplugin)\<`PluginState`\>\></code>

</dt>

<dd>

The [props](https://prosemirror.net/docs/ref/#view.EditorProps) exported by this plugin.

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="getstate" href="#getstate">getState</a>(`state`: [`EditorState`](#editorstate)): `undefined` \| `PluginState`</code>

</dt>

<dd>

Extract the plugin's state field from an editor state.

</dd>

</dl>

***

### PluginKey {#pluginkey}

A key is used to [tag](https://prosemirror.net/docs/ref/#state.PluginSpec.key) plugins in a way
that makes it possible to find them, given an editor state.
Assigning a key does mean only one plugin of that type can be
active in a state.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-2" href="#constructor-2">PluginKey</a>\<PluginState\>(`name?`: `string`): [`PluginKey`](#pluginkey)\<`PluginState`\></code>

</dt>

<dd>

Create a plugin key.

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="get" href="#get">get</a>(`state`: [`EditorState`](#editorstate)): `undefined` \| [`ProseMirrorPlugin`](#prosemirrorplugin)\<`PluginState`\></code>

</dt>

<dd>

Get the active plugin with this key, if any, from an editor
state.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="getstate-2" href="#getstate-2">getState</a>(`state`: [`EditorState`](#editorstate)): `undefined` \| `PluginState`</code>

</dt>

<dd>

Get the plugin's state from an editor state.

</dd>

</dl>

***

### Transaction {#transaction}

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

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-3" href="#constructor-3">Transaction</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`Transaction`](#transaction)</code>

</dt>

<dd>

Create a transform that starts with the given document.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="time" href="#time">time</a>: `number`</code>

</dt>

<dd>

The timestamp associated with this transaction, in the same
format as `Date.now()`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="storedmarks-2" href="#storedmarks-2">storedMarks</a>: `null` \| readonly [`Mark`](model.md#mark)[]</code>

</dt>

<dd>

The stored marks set by this transaction, if any.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="doc-2" href="#doc-2">doc</a>: [`ProseMirrorNode`](model.md#prosemirrornode)</code>

</dt>

<dd>

The current document (the result of applying the steps in the
transform).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="steps" href="#steps">steps</a>: [`Step`](transform.md#step)[]</code>

</dt>

<dd>

The steps in this transform.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="docs" href="#docs">docs</a>: [`ProseMirrorNode`](model.md#prosemirrornode)[]</code>

</dt>

<dd>

The documents before each of the steps.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="mapping" href="#mapping">mapping</a>: [`Mapping`](transform.md#mapping)</code>

</dt>

<dd>

A mapping with the maps for each of the steps in this transform.

</dd>

</dl>

#### Accessors

<dl>

<dt>

<code data-typedoc-code>get <a id="selection-2" href="#selection-2">selection</a>(): [`Selection`](#selection-3)</code>

</dt>

<dd>

The transaction's current selection. This defaults to the editor
selection [mapped](https://prosemirror.net/docs/ref/#state.Selection.map) through the steps in the
transaction, but can be overwritten with
[`setSelection`](https://prosemirror.net/docs/ref/#state.Transaction.setSelection).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="selectionset" href="#selectionset">selectionSet</a>(): `boolean`</code>

</dt>

<dd>

Whether the selection was explicitly updated by this transaction.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="storedmarksset" href="#storedmarksset">storedMarksSet</a>(): `boolean`</code>

</dt>

<dd>

Whether the stored marks were explicitly set for this transaction.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="isgeneric" href="#isgeneric">isGeneric</a>(): `boolean`</code>

</dt>

<dd>

Returns true if this transaction doesn't contain any metadata,
and can thus safely be extended.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="scrolledintoview" href="#scrolledintoview">scrolledIntoView</a>(): `boolean`</code>

</dt>

<dd>

True when this transaction has had `scrollIntoView` called on it.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="before" href="#before">before</a>(): [`ProseMirrorNode`](model.md#prosemirrornode)</code>

</dt>

<dd>

The starting document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="docchanged" href="#docchanged">docChanged</a>(): `boolean`</code>

</dt>

<dd>

True when the document has been changed (when there are any
steps).

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="setselection" href="#setselection">setSelection</a>(`selection`: [`Selection`](#selection-3)): `this`</code>

</dt>

<dd>

Update the transaction's current selection. Will determine the
selection that the editor gets when the transaction is applied.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="setstoredmarks" href="#setstoredmarks">setStoredMarks</a>(`marks`: `null` \| readonly [`Mark`](model.md#mark)[]): `this`</code>

</dt>

<dd>

Set the current stored marks.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="ensuremarks" href="#ensuremarks">ensureMarks</a>(`marks`: readonly [`Mark`](model.md#mark)[]): `this`</code>

</dt>

<dd>

Make sure the current stored marks or, if that is null, the marks
at the selection, match the given set of marks. Does nothing if
this is already the case.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="addstoredmark" href="#addstoredmark">addStoredMark</a>(`mark`: [`Mark`](model.md#mark)): `this`</code>

</dt>

<dd>

Add a mark to the set of stored marks.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="removestoredmark" href="#removestoredmark">removeStoredMark</a>(`mark`: [`MarkType`](model.md#marktype-1) \| [`Mark`](model.md#mark)): `this`</code>

</dt>

<dd>

Remove a mark or mark type from the set of stored marks.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="settime" href="#settime">setTime</a>(`time`: `number`): `this`</code>

</dt>

<dd>

Update the timestamp for the transaction.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="replaceselection" href="#replaceselection">replaceSelection</a>(`slice`: [`Slice`](model.md#slice)): `this`</code>

</dt>

<dd>

Replace the current selection with the given slice.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="replaceselectionwith" href="#replaceselectionwith">replaceSelectionWith</a>(`node`: [`ProseMirrorNode`](model.md#prosemirrornode), `inheritMarks?`: `boolean`): `this`</code>

</dt>

<dd>

Replace the selection with the given node. When `inheritMarks` is
true and the content is inline, it inherits the marks from the
place where it is inserted.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="deleteselection" href="#deleteselection">deleteSelection</a>(): `this`</code>

</dt>

<dd>

Delete the selection.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="inserttext" href="#inserttext">insertText</a>(`text`: `string`, `from?`: `number`, `to?`: `number`): `this`</code>

</dt>

<dd>

Replace the given range, or the selection if no range is given,
with a text node containing the given string.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="setmeta" href="#setmeta">setMeta</a>(`key`: `string` \| [`ProseMirrorPlugin`](#prosemirrorplugin)\<`any`\> \| [`PluginKey`](#pluginkey)\<`any`\>, `value`: `any`): `this`</code>

</dt>

<dd>

Store a metadata property in this transaction, keyed either by
name or by plugin.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="getmeta" href="#getmeta">getMeta</a>(`key`: `string` \| [`ProseMirrorPlugin`](#prosemirrorplugin)\<`any`\> \| [`PluginKey`](#pluginkey)\<`any`\>): `any`</code>

</dt>

<dd>

Retrieve a metadata property for a given name or plugin.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="scrollintoview" href="#scrollintoview">scrollIntoView</a>(): `this`</code>

</dt>

<dd>

Indicate that the editor should scroll the selection into view
when updated to the state produced by this transaction.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="step" href="#step">step</a>(`step`: [`Step`](transform.md#step)): `this`</code>

</dt>

<dd>

Apply a new step in this transform, saving the result. Throws an
error when the step fails.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="maybestep" href="#maybestep">maybeStep</a>(`step`: [`Step`](transform.md#step)): [`StepResult`](transform.md#stepresult)</code>

</dt>

<dd>

Try to apply a step in this transformation, ignoring it if it
fails. Returns the step result.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="replace" href="#replace">replace</a>(`from`: `number`, `to?`: `number`, `slice?`: [`Slice`](model.md#slice)): `this`</code>

</dt>

<dd>

Replace the part of the document between `from` and `to` with the
given `slice`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="replacewith" href="#replacewith">replaceWith</a>(`from`: `number`, `to`: `number`, `content`: [`ProseMirrorNode`](model.md#prosemirrornode) \| [`ProseMirrorFragment`](model.md#prosemirrorfragment) \| readonly [`ProseMirrorNode`](model.md#prosemirrornode)[]): `this`</code>

</dt>

<dd>

Replace the given range with the given content, which may be a
fragment, node, or array of nodes.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="delete" href="#delete">delete</a>(`from`: `number`, `to`: `number`): `this`</code>

</dt>

<dd>

Delete the content between the given positions.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="insert" href="#insert">insert</a>(`pos`: `number`, `content`: [`ProseMirrorNode`](model.md#prosemirrornode) \| [`ProseMirrorFragment`](model.md#prosemirrorfragment) \| readonly [`ProseMirrorNode`](model.md#prosemirrornode)[]): `this`</code>

</dt>

<dd>

Insert the given content at the given position.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="replacerange" href="#replacerange">replaceRange</a>(`from`: `number`, `to`: `number`, `slice`: [`Slice`](model.md#slice)): `this`</code>

</dt>

<dd>

Replace a range of the document with a given slice, using
`from`, `to`, and the slice's
[`openStart`](https://prosemirror.net/docs/ref/#model.Slice.openStart) property as hints, rather
than fixed start and end points. This method may grow the
replaced area or close open nodes in the slice in order to get a
fit that is more in line with WYSIWYG expectations, by dropping
fully covered parent nodes of the replaced region when they are
marked [non-defining as
context](https://prosemirror.net/docs/ref/#model.NodeSpec.definingAsContext), or including an
open parent node from the slice that _is_ marked as [defining
its content](https://prosemirror.net/docs/ref/#model.NodeSpec.definingForContent).

This is the method, for example, to handle paste. The similar
[`replace`](https://prosemirror.net/docs/ref/#transform.Transform.replace) method is a more
primitive tool which will _not_ move the start and end of its given
range, and is useful in situations where you need more precise
control over what happens.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="replacerangewith" href="#replacerangewith">replaceRangeWith</a>(`from`: `number`, `to`: `number`, `node`: [`ProseMirrorNode`](model.md#prosemirrornode)): `this`</code>

</dt>

<dd>

Replace the given range with a node, but use `from` and `to` as
hints, rather than precise positions. When from and to are the same
and are at the start or end of a parent node in which the given
node doesn't fit, this method may _move_ them out towards a parent
that does allow the given node to be placed. When the given range
completely covers a parent node, this method may completely replace
that parent node.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="deleterange" href="#deleterange">deleteRange</a>(`from`: `number`, `to`: `number`): `this`</code>

</dt>

<dd>

Delete the given range, expanding it to cover fully covered
parent nodes until a valid replace is found.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="lift" href="#lift">lift</a>(`range`: [`NodeRange`](model.md#noderange), `target`: `number`): `this`</code>

</dt>

<dd>

Split the content in the given range off from its parent, if there
is sibling content before or after it, and move it up the tree to
the depth specified by `target`. You'll probably want to use
[`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
sure the lift is valid.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="join" href="#join">join</a>(`pos`: `number`, `depth?`: `number`): `this`</code>

</dt>

<dd>

Join the blocks around the given position. If depth is 2, their
last and first siblings are also joined, and so on.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="wrap" href="#wrap">wrap</a>(`range`: [`NodeRange`](model.md#noderange), `wrappers`: readonly `object`[]): `this`</code>

</dt>

<dd>

Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
The wrappers are assumed to be valid in this position, and should
probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="setblocktype" href="#setblocktype">setBlockType</a>(`from`: `number`, `to`: `undefined` \| `number`, `type`: [`NodeType`](model.md#nodetype), `attrs?`: `null` \| [`Attrs`](model.md#attrs-4) \| (`oldNode`: [`ProseMirrorNode`](model.md#prosemirrornode)) => [`Attrs`](model.md#attrs-4)): `this`</code>

</dt>

<dd>

Set the type of all textblocks (partly) between `from` and `to` to
the given node type with the given attributes.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="setnodemarkup" href="#setnodemarkup">setNodeMarkup</a>(`pos`: `number`, `type?`: `null` \| [`NodeType`](model.md#nodetype), `attrs?`: `null` \| [`Attrs`](model.md#attrs-4), `marks?`: readonly [`Mark`](model.md#mark)[]): `this`</code>

</dt>

<dd>

Change the type, attributes, and/or marks of the node at `pos`.
When `type` isn't given, the existing node type is preserved,

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="setnodeattribute" href="#setnodeattribute">setNodeAttribute</a>(`pos`: `number`, `attr`: `string`, `value`: `any`): `this`</code>

</dt>

<dd>

Set a single attribute on a given node to a new value.
The `pos` addresses the document content. Use `setDocAttribute`
to set attributes on the document itself.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="setdocattribute" href="#setdocattribute">setDocAttribute</a>(`attr`: `string`, `value`: `any`): `this`</code>

</dt>

<dd>

Set a single attribute on the document to a new value.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="addnodemark" href="#addnodemark">addNodeMark</a>(`pos`: `number`, `mark`: [`Mark`](model.md#mark)): `this`</code>

</dt>

<dd>

Add a mark to the node at position `pos`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="removenodemark" href="#removenodemark">removeNodeMark</a>(`pos`: `number`, `mark`: [`MarkType`](model.md#marktype-1) \| [`Mark`](model.md#mark)): `this`</code>

</dt>

<dd>

Remove a mark (or all marks of the given type) from the node at
position `pos`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="split" href="#split">split</a>(`pos`: `number`, `depth?`: `number`, `typesAfter?`: (`null` \| \{ `type`: [`NodeType`](model.md#nodetype); `attrs?`: `null` \| [`Attrs`](model.md#attrs-4); \})[]): `this`</code>

</dt>

<dd>

Split the node at the given position, and optionally, if `depth` is
greater than one, any number of nodes above that. By default, the
parts split off will inherit the node type of the original node.
This can be changed by passing an array of types and attributes to
use after the split (with the outermost nodes coming first).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="addmark" href="#addmark">addMark</a>(`from`: `number`, `to`: `number`, `mark`: [`Mark`](model.md#mark)): `this`</code>

</dt>

<dd>

Add the given mark to the inline content between `from` and `to`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="removemark" href="#removemark">removeMark</a>(`from`: `number`, `to`: `number`, `mark?`: `null` \| [`MarkType`](model.md#marktype-1) \| [`Mark`](model.md#mark)): `this`</code>

</dt>

<dd>

Remove marks from inline nodes between `from` and `to`. When
`mark` is a single mark, remove precisely that mark. When it is
a mark type, remove all marks of that type. When it is null,
remove all marks of any type.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="clearincompatible" href="#clearincompatible">clearIncompatible</a>(`pos`: `number`, `parentType`: [`NodeType`](model.md#nodetype), `match?`: [`ContentMatch`](model.md#contentmatch-1)): `this`</code>

</dt>

<dd>

Removes all marks and nodes from the content of the node at
`pos` that don't match the given new parent node type. Accepts
an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
third argument.

</dd>

</dl>

***

### abstract Selection {#selection-3}

Superclass for editor selections. Every selection type should
extend this. Should not be instantiated directly.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-4" href="#constructor-4">Selection</a>(`$anchor`: [`ResolvedPos`](model.md#resolvedpos), `$head`: [`ResolvedPos`](model.md#resolvedpos), `ranges?`: readonly [`SelectionRange`](#selectionrange)[]): [`Selection`](#selection-3)</code>

</dt>

<dd>

Initialize a selection with the head and anchor and ranges. If no
ranges are given, constructs a single range across `$anchor` and
`$head`.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="anchor" href="#anchor">$anchor</a>: [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

The resolved anchor of the selection (the side that stays in
place when the selection is modified).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="head" href="#head">$head</a>: [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

The resolved head of the selection (the side that moves when
the selection is modified).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="ranges" href="#ranges">ranges</a>: readonly [`SelectionRange`](#selectionrange)[]</code>

</dt>

<dd>

The ranges covered by the selection.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="visible" href="#visible">visible</a>: `boolean`</code>

</dt>

<dd>

Controls whether, when a selection of this type is active in the
browser, the selected range should be visible to the user.
Defaults to `true`.

</dd>

</dl>

#### Accessors

<dl>

<dt>

<code data-typedoc-code>get <a id="anchor-1" href="#anchor-1">anchor</a>(): `number`</code>

</dt>

<dd>

The selection's anchor, as an unresolved position.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="head-1" href="#head-1">head</a>(): `number`</code>

</dt>

<dd>

The selection's head.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="from" href="#from">from</a>(): `number`</code>

</dt>

<dd>

The lower bound of the selection's main range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="to" href="#to">to</a>(): `number`</code>

</dt>

<dd>

The upper bound of the selection's main range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="from-1" href="#from-1">$from</a>(): [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

The resolved lower  bound of the selection's main range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="to-1" href="#to-1">$to</a>(): [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

The resolved upper bound of the selection's main range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="empty" href="#empty">empty</a>(): `boolean`</code>

</dt>

<dd>

Indicates whether the selection contains any content.

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><i>abstract</i> <a id="eq" href="#eq">eq</a>(`selection`: [`Selection`](#selection-3)): `boolean`</code>

</dt>

<dd>

Test whether the selection is the same as another selection.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>abstract</i> <a id="map" href="#map">map</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `mapping`: [`Mappable`](transform.md#mappable)): [`Selection`](#selection-3)</code>

</dt>

<dd>

Map this selection through a [mappable](https://prosemirror.net/docs/ref/#transform.Mappable)
thing. `doc` should be the new document to which we are mapping.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="content" href="#content">content</a>(): [`Slice`](model.md#slice)</code>

</dt>

<dd>

Get the content of this selection as a slice.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="replace-2" href="#replace-2">replace</a>(`tr`: [`Transaction`](#transaction), `content?`: [`Slice`](model.md#slice)): `void`</code>

</dt>

<dd>

Replace the selection with a slice or, if no slice is given,
delete the selection. Will append to the given transaction.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="replacewith-2" href="#replacewith-2">replaceWith</a>(`tr`: [`Transaction`](#transaction), `node`: [`ProseMirrorNode`](model.md#prosemirrornode)): `void`</code>

</dt>

<dd>

Replace the selection with the given node, appending the changes
to the given transaction.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>abstract</i> <a id="tojson-3" href="#tojson-3">toJSON</a>(): `any`</code>

</dt>

<dd>

Convert the selection to a JSON representation. When implementing
this for a custom selection class, make sure to give the object a
`type` property whose value matches the ID under which you
[registered](https://prosemirror.net/docs/ref/#state.Selection^jsonID) your class.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="findfrom" href="#findfrom">findFrom</a>(`$pos`: [`ResolvedPos`](model.md#resolvedpos), `dir`: `number`, `textOnly?`: `boolean`): `null` \| [`Selection`](#selection-3)</code>

</dt>

<dd>

Find a valid cursor or leaf node selection starting at the given
position and searching back if `dir` is negative, and forward if
positive. When `textOnly` is true, only consider cursor
selections. Will return null when no valid selection position is
found.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="near" href="#near">near</a>(`$pos`: [`ResolvedPos`](model.md#resolvedpos), `bias?`: `number`): [`Selection`](#selection-3)</code>

</dt>

<dd>

Find a valid cursor or leaf node selection near the given
position. Searches forward first by default, but if `bias` is
negative, it will search backwards first.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="atstart" href="#atstart">atStart</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`Selection`](#selection-3)</code>

</dt>

<dd>

Find the cursor or leaf node selection closest to the start of
the given document. Will return an
[`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
exists.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="atend" href="#atend">atEnd</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`Selection`](#selection-3)</code>

</dt>

<dd>

Find the cursor or leaf node selection closest to the end of the
given document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="fromjson-3" href="#fromjson-3">fromJSON</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `json`: `any`): [`Selection`](#selection-3)</code>

</dt>

<dd>

Deserialize the JSON representation of a selection. Must be
implemented for custom classes (as a static class method).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="jsonid" href="#jsonid">jsonID</a>(`id`: `string`, `selectionClass`: `object`): `object`</code>

</dt>

<dd>

To be able to deserialize selections from JSON, custom selection
classes must register themselves with an ID string, so that they
can be disambiguated. Try to pick something that's unlikely to
clash with classes from other modules.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="getbookmark" href="#getbookmark">getBookmark</a>(): [`SelectionBookmark`](#selectionbookmark)</code>

</dt>

<dd>

Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
which is a value that can be mapped without having access to a
current document, and later resolved to a real selection for a
given document again. (This is used mostly by the history to
track and restore old selections.) The default implementation of
this method just converts the selection to a text selection and
returns the bookmark for that.

</dd>

</dl>

***

### SelectionRange {#selectionrange}

Represents a selected range in a document.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-5" href="#constructor-5">SelectionRange</a>(`$from`: [`ResolvedPos`](model.md#resolvedpos), `$to`: [`ResolvedPos`](model.md#resolvedpos)): [`SelectionRange`](#selectionrange)</code>

</dt>

<dd>

Create a range.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="from-2" href="#from-2">$from</a>: [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

The lower bound of the range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="to-2" href="#to-2">$to</a>: [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

The upper bound of the range.

</dd>

</dl>

***

### TextSelection {#textselection}

A text selection represents a classical editor selection, with a
head (the moving side) and anchor (immobile side), both of which
point into textblock nodes. It can be empty (a regular cursor
position).

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-6" href="#constructor-6">TextSelection</a>(`$anchor`: [`ResolvedPos`](model.md#resolvedpos), `$head?`: [`ResolvedPos`](model.md#resolvedpos)): [`TextSelection`](#textselection)</code>

</dt>

<dd>

Construct a text selection between the given points.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="anchor-2" href="#anchor-2">$anchor</a>: [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

The resolved anchor of the selection (the side that stays in
place when the selection is modified).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="head-2" href="#head-2">$head</a>: [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

The resolved head of the selection (the side that moves when
the selection is modified).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="ranges-1" href="#ranges-1">ranges</a>: readonly [`SelectionRange`](#selectionrange)[]</code>

</dt>

<dd>

The ranges covered by the selection.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="visible-1" href="#visible-1">visible</a>: `boolean`</code>

</dt>

<dd>

Controls whether, when a selection of this type is active in the
browser, the selected range should be visible to the user.
Defaults to `true`.

</dd>

</dl>

#### Accessors

<dl>

<dt>

<code data-typedoc-code>get <a id="anchor-3" href="#anchor-3">anchor</a>(): `number`</code>

</dt>

<dd>

The selection's anchor, as an unresolved position.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="head-3" href="#head-3">head</a>(): `number`</code>

</dt>

<dd>

The selection's head.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="from-3" href="#from-3">from</a>(): `number`</code>

</dt>

<dd>

The lower bound of the selection's main range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="to-3" href="#to-3">to</a>(): `number`</code>

</dt>

<dd>

The upper bound of the selection's main range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="from-4" href="#from-4">$from</a>(): [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

The resolved lower  bound of the selection's main range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="to-4" href="#to-4">$to</a>(): [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

The resolved upper bound of the selection's main range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="empty-1" href="#empty-1">empty</a>(): `boolean`</code>

</dt>

<dd>

Indicates whether the selection contains any content.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="cursor" href="#cursor">$cursor</a>(): `null` \| [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

Returns a resolved position if this is a cursor selection (an
empty text selection), and null otherwise.

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="content-2" href="#content-2">content</a>(): [`Slice`](model.md#slice)</code>

</dt>

<dd>

Get the content of this selection as a slice.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="replacewith-4" href="#replacewith-4">replaceWith</a>(`tr`: [`Transaction`](#transaction), `node`: [`ProseMirrorNode`](model.md#prosemirrornode)): `void`</code>

</dt>

<dd>

Replace the selection with the given node, appending the changes
to the given transaction.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="findfrom-2" href="#findfrom-2">findFrom</a>(`$pos`: [`ResolvedPos`](model.md#resolvedpos), `dir`: `number`, `textOnly?`: `boolean`): `null` \| [`Selection`](#selection-3)</code>

</dt>

<dd>

Find a valid cursor or leaf node selection starting at the given
position and searching back if `dir` is negative, and forward if
positive. When `textOnly` is true, only consider cursor
selections. Will return null when no valid selection position is
found.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="near-2" href="#near-2">near</a>(`$pos`: [`ResolvedPos`](model.md#resolvedpos), `bias?`: `number`): [`Selection`](#selection-3)</code>

</dt>

<dd>

Find a valid cursor or leaf node selection near the given
position. Searches forward first by default, but if `bias` is
negative, it will search backwards first.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="atstart-2" href="#atstart-2">atStart</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`Selection`](#selection-3)</code>

</dt>

<dd>

Find the cursor or leaf node selection closest to the start of
the given document. Will return an
[`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
exists.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="atend-2" href="#atend-2">atEnd</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`Selection`](#selection-3)</code>

</dt>

<dd>

Find the cursor or leaf node selection closest to the end of the
given document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="fromjson-5" href="#fromjson-5">fromJSON</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `json`: `any`): [`Selection`](#selection-3)</code>

</dt>

<dd>

Deserialize the JSON representation of a selection. Must be
implemented for custom classes (as a static class method).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="jsonid-2" href="#jsonid-2">jsonID</a>(`id`: `string`, `selectionClass`: `object`): `object`</code>

</dt>

<dd>

To be able to deserialize selections from JSON, custom selection
classes must register themselves with an ID string, so that they
can be disambiguated. Try to pick something that's unlikely to
clash with classes from other modules.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="map-3" href="#map-3">map</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `mapping`: [`Mappable`](transform.md#mappable)): [`Selection`](#selection-3)</code>

</dt>

<dd>

Map this selection through a [mappable](https://prosemirror.net/docs/ref/#transform.Mappable)
thing. `doc` should be the new document to which we are mapping.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="replace-4" href="#replace-4">replace</a>(`tr`: [`Transaction`](#transaction), `content?`: [`Slice`](model.md#slice)): `void`</code>

</dt>

<dd>

Replace the selection with a slice or, if no slice is given,
delete the selection. Will append to the given transaction.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="eq-2" href="#eq-2">eq</a>(`other`: [`Selection`](#selection-3)): `boolean`</code>

</dt>

<dd>

Test whether the selection is the same as another selection.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="getbookmark-2" href="#getbookmark-2">getBookmark</a>(): [`TextBookmark`](https://prosemirror.net/docs/ref/#state.TextBookmark)</code>

</dt>

<dd>

Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
which is a value that can be mapped without having access to a
current document, and later resolved to a real selection for a
given document again. (This is used mostly by the history to
track and restore old selections.) The default implementation of
this method just converts the selection to a text selection and
returns the bookmark for that.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="tojson-5" href="#tojson-5">toJSON</a>(): `any`</code>

</dt>

<dd>

Convert the selection to a JSON representation. When implementing
this for a custom selection class, make sure to give the object a
`type` property whose value matches the ID under which you
[registered](https://prosemirror.net/docs/ref/#state.Selection^jsonID) your class.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="create-2" href="#create-2">create</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `anchor`: `number`, `head?`: `number`): [`TextSelection`](#textselection)</code>

</dt>

<dd>

Create a text selection from non-resolved positions.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="between" href="#between">between</a>(`$anchor`: [`ResolvedPos`](model.md#resolvedpos), `$head`: [`ResolvedPos`](model.md#resolvedpos), `bias?`: `number`): [`Selection`](#selection-3)</code>

</dt>

<dd>

Return a text selection that spans the given positions or, if
they aren't text positions, find a text selection near them.
`bias` determines whether the method searches forward (default)
or backwards (negative number) first. Will fall back to calling
[`Selection.near`](https://prosemirror.net/docs/ref/#state.Selection^near) when the document
doesn't contain a valid text position.

</dd>

</dl>

***

### NodeSelection {#nodeselection}

A node selection is a selection that points at a single node. All
nodes marked [selectable](https://prosemirror.net/docs/ref/#model.NodeSpec.selectable) can be the
target of a node selection. In such a selection, `from` and `to`
point directly before and after the selected node, `anchor` equals
`from`, and `head` equals `to`..

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-7" href="#constructor-7">NodeSelection</a>(`$pos`: [`ResolvedPos`](model.md#resolvedpos)): [`NodeSelection`](#nodeselection)</code>

</dt>

<dd>

Create a node selection. Does not verify the validity of its
argument.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="anchor-4" href="#anchor-4">$anchor</a>: [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

The resolved anchor of the selection (the side that stays in
place when the selection is modified).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="head-4" href="#head-4">$head</a>: [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

The resolved head of the selection (the side that moves when
the selection is modified).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="ranges-2" href="#ranges-2">ranges</a>: readonly [`SelectionRange`](#selectionrange)[]</code>

</dt>

<dd>

The ranges covered by the selection.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="visible-2" href="#visible-2">visible</a>: `boolean`</code>

</dt>

<dd>

Controls whether, when a selection of this type is active in the
browser, the selected range should be visible to the user.
Defaults to `true`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="node" href="#node">node</a>: [`ProseMirrorNode`](model.md#prosemirrornode)</code>

</dt>

<dd>

The selected node.

</dd>

</dl>

#### Accessors

<dl>

<dt>

<code data-typedoc-code>get <a id="anchor-5" href="#anchor-5">anchor</a>(): `number`</code>

</dt>

<dd>

The selection's anchor, as an unresolved position.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="head-5" href="#head-5">head</a>(): `number`</code>

</dt>

<dd>

The selection's head.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="from-5" href="#from-5">from</a>(): `number`</code>

</dt>

<dd>

The lower bound of the selection's main range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="to-5" href="#to-5">to</a>(): `number`</code>

</dt>

<dd>

The upper bound of the selection's main range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="from-6" href="#from-6">$from</a>(): [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

The resolved lower  bound of the selection's main range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="to-6" href="#to-6">$to</a>(): [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

The resolved upper bound of the selection's main range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="empty-2" href="#empty-2">empty</a>(): `boolean`</code>

</dt>

<dd>

Indicates whether the selection contains any content.

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="replace-6" href="#replace-6">replace</a>(`tr`: [`Transaction`](#transaction), `content?`: [`Slice`](model.md#slice)): `void`</code>

</dt>

<dd>

Replace the selection with a slice or, if no slice is given,
delete the selection. Will append to the given transaction.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="replacewith-6" href="#replacewith-6">replaceWith</a>(`tr`: [`Transaction`](#transaction), `node`: [`ProseMirrorNode`](model.md#prosemirrornode)): `void`</code>

</dt>

<dd>

Replace the selection with the given node, appending the changes
to the given transaction.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="findfrom-4" href="#findfrom-4">findFrom</a>(`$pos`: [`ResolvedPos`](model.md#resolvedpos), `dir`: `number`, `textOnly?`: `boolean`): `null` \| [`Selection`](#selection-3)</code>

</dt>

<dd>

Find a valid cursor or leaf node selection starting at the given
position and searching back if `dir` is negative, and forward if
positive. When `textOnly` is true, only consider cursor
selections. Will return null when no valid selection position is
found.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="near-4" href="#near-4">near</a>(`$pos`: [`ResolvedPos`](model.md#resolvedpos), `bias?`: `number`): [`Selection`](#selection-3)</code>

</dt>

<dd>

Find a valid cursor or leaf node selection near the given
position. Searches forward first by default, but if `bias` is
negative, it will search backwards first.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="atstart-4" href="#atstart-4">atStart</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`Selection`](#selection-3)</code>

</dt>

<dd>

Find the cursor or leaf node selection closest to the start of
the given document. Will return an
[`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
exists.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="atend-4" href="#atend-4">atEnd</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`Selection`](#selection-3)</code>

</dt>

<dd>

Find the cursor or leaf node selection closest to the end of the
given document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="fromjson-7" href="#fromjson-7">fromJSON</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `json`: `any`): [`Selection`](#selection-3)</code>

</dt>

<dd>

Deserialize the JSON representation of a selection. Must be
implemented for custom classes (as a static class method).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="jsonid-4" href="#jsonid-4">jsonID</a>(`id`: `string`, `selectionClass`: `object`): `object`</code>

</dt>

<dd>

To be able to deserialize selections from JSON, custom selection
classes must register themselves with an ID string, so that they
can be disambiguated. Try to pick something that's unlikely to
clash with classes from other modules.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="map-5" href="#map-5">map</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `mapping`: [`Mappable`](transform.md#mappable)): [`Selection`](#selection-3)</code>

</dt>

<dd>

Map this selection through a [mappable](https://prosemirror.net/docs/ref/#transform.Mappable)
thing. `doc` should be the new document to which we are mapping.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="content-4" href="#content-4">content</a>(): [`Slice`](model.md#slice)</code>

</dt>

<dd>

Get the content of this selection as a slice.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="eq-4" href="#eq-4">eq</a>(`other`: [`Selection`](#selection-3)): `boolean`</code>

</dt>

<dd>

Test whether the selection is the same as another selection.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="tojson-7" href="#tojson-7">toJSON</a>(): `any`</code>

</dt>

<dd>

Convert the selection to a JSON representation. When implementing
this for a custom selection class, make sure to give the object a
`type` property whose value matches the ID under which you
[registered](https://prosemirror.net/docs/ref/#state.Selection^jsonID) your class.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="getbookmark-4" href="#getbookmark-4">getBookmark</a>(): [`NodeBookmark`](https://prosemirror.net/docs/ref/#state.NodeBookmark)</code>

</dt>

<dd>

Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
which is a value that can be mapped without having access to a
current document, and later resolved to a real selection for a
given document again. (This is used mostly by the history to
track and restore old selections.) The default implementation of
this method just converts the selection to a text selection and
returns the bookmark for that.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="create-4" href="#create-4">create</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `from`: `number`): [`NodeSelection`](#nodeselection)</code>

</dt>

<dd>

Create a node selection from non-resolved positions.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="isselectable" href="#isselectable">isSelectable</a>(`node`: [`ProseMirrorNode`](model.md#prosemirrornode)): `boolean`</code>

</dt>

<dd>

Determines whether the given node may be selected as a node
selection.

</dd>

</dl>

***

### AllSelection {#allselection}

A selection type that represents selecting the whole document
(which can not necessarily be expressed with a text selection, when
there are for example leaf block nodes at the start or end of the
document).

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-8" href="#constructor-8">AllSelection</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`AllSelection`](#allselection)</code>

</dt>

<dd>

Create an all-selection over the given document.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="anchor-6" href="#anchor-6">$anchor</a>: [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

The resolved anchor of the selection (the side that stays in
place when the selection is modified).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="head-6" href="#head-6">$head</a>: [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

The resolved head of the selection (the side that moves when
the selection is modified).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="ranges-3" href="#ranges-3">ranges</a>: readonly [`SelectionRange`](#selectionrange)[]</code>

</dt>

<dd>

The ranges covered by the selection.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="visible-3" href="#visible-3">visible</a>: `boolean`</code>

</dt>

<dd>

Controls whether, when a selection of this type is active in the
browser, the selected range should be visible to the user.
Defaults to `true`.

</dd>

</dl>

#### Accessors

<dl>

<dt>

<code data-typedoc-code>get <a id="anchor-7" href="#anchor-7">anchor</a>(): `number`</code>

</dt>

<dd>

The selection's anchor, as an unresolved position.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="head-7" href="#head-7">head</a>(): `number`</code>

</dt>

<dd>

The selection's head.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="from-7" href="#from-7">from</a>(): `number`</code>

</dt>

<dd>

The lower bound of the selection's main range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="to-7" href="#to-7">to</a>(): `number`</code>

</dt>

<dd>

The upper bound of the selection's main range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="from-8" href="#from-8">$from</a>(): [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

The resolved lower  bound of the selection's main range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="to-8" href="#to-8">$to</a>(): [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

The resolved upper bound of the selection's main range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="empty-3" href="#empty-3">empty</a>(): `boolean`</code>

</dt>

<dd>

Indicates whether the selection contains any content.

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="content-6" href="#content-6">content</a>(): [`Slice`](model.md#slice)</code>

</dt>

<dd>

Get the content of this selection as a slice.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="replacewith-8" href="#replacewith-8">replaceWith</a>(`tr`: [`Transaction`](#transaction), `node`: [`ProseMirrorNode`](model.md#prosemirrornode)): `void`</code>

</dt>

<dd>

Replace the selection with the given node, appending the changes
to the given transaction.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="findfrom-6" href="#findfrom-6">findFrom</a>(`$pos`: [`ResolvedPos`](model.md#resolvedpos), `dir`: `number`, `textOnly?`: `boolean`): `null` \| [`Selection`](#selection-3)</code>

</dt>

<dd>

Find a valid cursor or leaf node selection starting at the given
position and searching back if `dir` is negative, and forward if
positive. When `textOnly` is true, only consider cursor
selections. Will return null when no valid selection position is
found.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="near-6" href="#near-6">near</a>(`$pos`: [`ResolvedPos`](model.md#resolvedpos), `bias?`: `number`): [`Selection`](#selection-3)</code>

</dt>

<dd>

Find a valid cursor or leaf node selection near the given
position. Searches forward first by default, but if `bias` is
negative, it will search backwards first.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="atstart-6" href="#atstart-6">atStart</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`Selection`](#selection-3)</code>

</dt>

<dd>

Find the cursor or leaf node selection closest to the start of
the given document. Will return an
[`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
exists.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="atend-6" href="#atend-6">atEnd</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`Selection`](#selection-3)</code>

</dt>

<dd>

Find the cursor or leaf node selection closest to the end of the
given document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="fromjson-9" href="#fromjson-9">fromJSON</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `json`: `any`): [`Selection`](#selection-3)</code>

</dt>

<dd>

Deserialize the JSON representation of a selection. Must be
implemented for custom classes (as a static class method).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="jsonid-6" href="#jsonid-6">jsonID</a>(`id`: `string`, `selectionClass`: `object`): `object`</code>

</dt>

<dd>

To be able to deserialize selections from JSON, custom selection
classes must register themselves with an ID string, so that they
can be disambiguated. Try to pick something that's unlikely to
clash with classes from other modules.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="replace-8" href="#replace-8">replace</a>(`tr`: [`Transaction`](#transaction), `content?`: [`Slice`](model.md#slice)): `void`</code>

</dt>

<dd>

Replace the selection with a slice or, if no slice is given,
delete the selection. Will append to the given transaction.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="tojson-9" href="#tojson-9">toJSON</a>(): `any`</code>

</dt>

<dd>

Convert the selection to a JSON representation. When implementing
this for a custom selection class, make sure to give the object a
`type` property whose value matches the ID under which you
[registered](https://prosemirror.net/docs/ref/#state.Selection^jsonID) your class.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="map-7" href="#map-7">map</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`AllSelection`](#allselection)</code>

</dt>

<dd>

Map this selection through a [mappable](https://prosemirror.net/docs/ref/#transform.Mappable)
thing. `doc` should be the new document to which we are mapping.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="eq-6" href="#eq-6">eq</a>(`other`: [`Selection`](#selection-3)): `boolean`</code>

</dt>

<dd>

Test whether the selection is the same as another selection.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="getbookmark-6" href="#getbookmark-6">getBookmark</a>(): `object`</code>

</dt>

<dd>

Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
which is a value that can be mapped without having access to a
current document, and later resolved to a real selection for a
given document again. (This is used mostly by the history to
track and restore old selections.) The default implementation of
this method just converts the selection to a text selection and
returns the bookmark for that.

</dd>

</dl>

## Interfaces

### EditorStateConfig {#editorstateconfig}

The type of object passed to
[`EditorState.create`](https://prosemirror.net/docs/ref/#state.EditorState^create).

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="schema" href="#schema">schema</a><i>?</i>: [`Schema`](model.md#schema-3)\<`any`, `any`\></code>

</dt>

<dd>

The schema to use (only relevant if no `doc` is specified).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="doc" href="#doc">doc</a><i>?</i>: [`ProseMirrorNode`](model.md#prosemirrornode)</code>

</dt>

<dd>

The starting document. Either this or `schema` _must_ be
provided.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="selection" href="#selection">selection</a><i>?</i>: [`Selection`](#selection-3)</code>

</dt>

<dd>

A valid selection in the document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="storedmarks" href="#storedmarks">storedMarks</a><i>?</i>: `null` \| readonly [`Mark`](model.md#mark)[]</code>

</dt>

<dd>

The initial set of [stored marks](https://prosemirror.net/docs/ref/#state.EditorState.storedMarks).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="plugins" href="#plugins">plugins</a><i>?</i>: readonly [`ProseMirrorPlugin`](#prosemirrorplugin)\<`any`\>[]</code>

</dt>

<dd>

The plugins that should be active in this state.

</dd>

</dl>

***

### PluginSpec {#pluginspec}

This is the type passed to the [`Plugin`](https://prosemirror.net/docs/ref/#state.Plugin)
constructor. It provides a definition for a plugin.

#### Indexable

<dl>

<dt>

<code data-typedoc-code>\[key: `string`\]: `any`</code>

</dt>

<dd>

Additional properties are allowed on plugin specs, which can be
read via [`Plugin.spec`](https://prosemirror.net/docs/ref/#state.Plugin.spec).

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="props" href="#props">props</a><i>?</i>: [`EditorProps`](view.md#editorprops)\<[`ProseMirrorPlugin`](#prosemirrorplugin)\<`PluginState`\>\></code>

</dt>

<dd>

The [view props](https://prosemirror.net/docs/ref/#view.EditorProps) added by this plugin. Props
that are functions will be bound to have the plugin instance as
their `this` binding.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="state" href="#state">state</a><i>?</i>: [`StateField`](#statefield)\<`PluginState`\></code>

</dt>

<dd>

Allows a plugin to define a [state field](https://prosemirror.net/docs/ref/#state.StateField), an
extra slot in the state object in which it can keep its own data.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="key" href="#key">key</a><i>?</i>: [`PluginKey`](#pluginkey)\<`any`\></code>

</dt>

<dd>

Can be used to make this a keyed plugin. You can have only one
plugin with a given key in a given state, but it is possible to
access the plugin's configuration and state through the key,
without having access to the plugin instance object.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="view" href="#view">view</a><i>?</i>: (`view`: [`EditorView`](view.md#editorview)) => [`PluginView`](#pluginview)</code>

</dt>

<dd>

When the plugin needs to interact with the editor view, or
set something up in the DOM, use this field. The function
will be called when the plugin's state is associated with an
editor view.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="filtertransaction" href="#filtertransaction">filterTransaction</a><i>?</i>: (`tr`: [`Transaction`](#transaction), `state`: [`EditorState`](#editorstate)) => `boolean`</code>

</dt>

<dd>

When present, this will be called before a transaction is
applied by the state, allowing the plugin to cancel it (by
returning false).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="appendtransaction" href="#appendtransaction">appendTransaction</a><i>?</i>: (`transactions`: readonly [`Transaction`](#transaction)[], `oldState`: [`EditorState`](#editorstate), `newState`: [`EditorState`](#editorstate)) => `undefined` \| `null` \| [`Transaction`](#transaction)</code>

</dt>

<dd>

Allows the plugin to append another transaction to be applied
after the given array of transactions. When another plugin
appends a transaction after this was called, it is called again
with the new state and new transactions—but only the new
transactions, i.e. it won't be passed transactions that it
already saw.

</dd>

</dl>

***

### StateField {#statefield}

A plugin spec may provide a state field (under its
[`state`](https://prosemirror.net/docs/ref/#state.PluginSpec.state) property) of this type, which
describes the state it wants to keep. Functions provided here are
always called with the plugin instance as their `this` binding.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="init" href="#init">init</a>: (`config`: [`EditorStateConfig`](#editorstateconfig), `instance`: [`EditorState`](#editorstate)) => `T`</code>

</dt>

<dd>

Initialize the value of the field. `config` will be the object
passed to [`EditorState.create`](https://prosemirror.net/docs/ref/#state.EditorState^create). Note
that `instance` is a half-initialized state instance, and will
not have values for plugin fields initialized after this one.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="apply-2" href="#apply-2">apply</a>: (`tr`: [`Transaction`](#transaction), `value`: `T`, `oldState`: [`EditorState`](#editorstate), `newState`: [`EditorState`](#editorstate)) => `T`</code>

</dt>

<dd>

Apply the given transaction to this state field, producing a new
field value. Note that the `newState` argument is again a partially
constructed state does not yet contain the state from plugins
coming after this one.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="tojson-2" href="#tojson-2">toJSON</a><i>?</i>: (`value`: `T`) => `any`</code>

</dt>

<dd>

Convert this field to JSON. Optional, can be left off to disable
JSON serialization for the field.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="fromjson-2" href="#fromjson-2">fromJSON</a><i>?</i>: (`config`: [`EditorStateConfig`](#editorstateconfig), `value`: `any`, `state`: [`EditorState`](#editorstate)) => `T`</code>

</dt>

<dd>

Deserialize the JSON representation of this field. Note that the
`state` argument is again a half-initialized state.

</dd>

</dl>

***

### SelectionBookmark {#selectionbookmark}

A lightweight, document-independent representation of a selection.
You can define a custom bookmark type for a custom selection class
to make the history handle it well.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="map-2" href="#map-2">map</a>: (`mapping`: [`Mappable`](transform.md#mappable)) => [`SelectionBookmark`](#selectionbookmark)</code>

</dt>

<dd>

Map the bookmark through a set of changes.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="resolve" href="#resolve">resolve</a>: (`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)) => [`Selection`](#selection-3)</code>

</dt>

<dd>

Resolve the bookmark to a real selection again. This may need to
do some error checking and may fall back to a default (usually
[`TextSelection.between`](https://prosemirror.net/docs/ref/#state.TextSelection^between)) if
mapping made the bookmark invalid.

</dd>

</dl>

## Type Aliases

### PluginView {#pluginview}

<code data-typedoc-code>type <a id="pluginview" href="#pluginview">PluginView</a> = \{ `update?`: (`view`: [`EditorView`](view.md#editorview), `prevState`: [`EditorState`](#editorstate)) => `void`; `destroy?`: () => `void`; \}</code>

A stateful object that can be installed in an editor by a
[plugin](https://prosemirror.net/docs/ref/#state.PluginSpec.view).

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="update" href="#update">update</a><i>?</i>: (`view`: [`EditorView`](view.md#editorview), `prevState`: [`EditorState`](#editorstate)) => `void`</code>

</dt>

<dd>

Called whenever the view's state is updated.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="destroy" href="#destroy">destroy</a><i>?</i>: () => `void`</code>

</dt>

<dd>

Called when the view is destroyed or receives a state
with different plugins.

</dd>

</dl>

***

### Command() {#command}

<dl>

<dt>

<code data-typedoc-code>type <a id="command" href="#command">Command</a> = (`state`: [`EditorState`](#editorstate), `dispatch?`: (`tr`: [`Transaction`](#transaction)) => `void`, `view?`: [`EditorView`](view.md#editorview)) => `boolean`</code>

</dt>

<dd>

Commands are functions that take a state and a an optional
transaction dispatch function and...

 - determine whether they apply to this state
 - if not, return false
 - if `dispatch` was passed, perform their effect, possibly by
   passing a transaction to `dispatch`
 - return true

In some cases, the editor view is passed as a third argument.

</dd>

</dl>

## References

### Plugin {#plugin}

Renames and re-exports [ProseMirrorPlugin](#prosemirrorplugin)
