---
title: prosekit/pm/state
sidebar:
  label: pm/state
---

<!-- DEBUG memberWithGroups 1 -->

Re-exports from [prosemirror-state](https://github.com/ProseMirror/prosemirror-state).

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Classes

### AllSelection {#allselection}

<!-- DEBUG memberWithGroups 1 -->

A selection type that represents selecting the whole document
(which can not necessarily be expressed with a text selection, when
there are for example leaf block nodes at the start or end of the
document).

#### Extends

- [`Selection`](#selection-1)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new AllSelection(doc: ProseMirrorNode): AllSelection;
```

Create an all-selection over the given document.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`doc`

</td>
<td>

[`ProseMirrorNode`](model.md#prosemirrornode)

</td>
</tr>
</tbody>
</table>

###### Returns

[`AllSelection`](#allselection)

###### Overrides

[`Selection`](#selection-1).[`constructor`](#constructor-5)

#### Methods

##### eq() {#eq}

```ts
eq(other: Selection): boolean;
```

Test whether the selection is the same as another selection.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`other`

</td>
<td>

[`Selection`](#selection-1)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Overrides

[`Selection`](#selection-1).[`eq`](#eq-4)

##### getBookmark() {#getbookmark}

```ts
getBookmark(): object;
```

Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
which is a value that can be mapped without having access to a
current document, and later resolved to a real selection for a
given document again. (This is used mostly by the history to
track and restore old selections.) The default implementation of
this method just converts the selection to a text selection and
returns the bookmark for that.

###### Returns

`object`

###### map()

```ts
map(): any;
```

###### Returns

`any`

###### resolve()

```ts
resolve(doc: ProseMirrorNode): AllSelection;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`doc`

</td>
<td>

[`ProseMirrorNode`](model.md#prosemirrornode)

</td>
</tr>
</tbody>
</table>

###### Returns

[`AllSelection`](#allselection)

###### Overrides

[`Selection`](#selection-1).[`getBookmark`](#getbookmark-4)

##### map() {#map}

```ts
map(doc: ProseMirrorNode): AllSelection;
```

Map this selection through a [mappable](https://prosemirror.net/docs/ref/#transform.Mappable)
thing. `doc` should be the new document to which we are mapping.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`doc`

</td>
<td>

[`ProseMirrorNode`](model.md#prosemirrornode)

</td>
</tr>
</tbody>
</table>

###### Returns

[`AllSelection`](#allselection)

###### Overrides

[`Selection`](#selection-1).[`map`](#map-4)

##### replace() {#replace}

```ts
replace(tr: Transaction, content?: Slice): void;
```

Replace the selection with a slice or, if no slice is given,
delete the selection. Will append to the given transaction.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`tr`

</td>
<td>

[`Transaction`](#transaction)

</td>
</tr>
<tr>
<td>

`content?`

</td>
<td>

[`Slice`](model.md#slice-2)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Overrides

[`Selection`](#selection-1).[`replace`](#replace-2)

##### toJSON() {#tojson}

```ts
toJSON(): any;
```

Convert the selection to a JSON representation. When implementing
this for a custom selection class, make sure to give the object a
`type` property whose value matches the ID under which you
[registered](https://prosemirror.net/docs/ref/#state.Selection^jsonID) your class.

###### Returns

`any`

###### Overrides

[`Selection`](#selection-1).[`toJSON`](#tojson-6)

<!-- DEBUG memberWithGroups 10 -->

***

### EditorState {#editorstate}

<!-- DEBUG memberWithGroups 1 -->

The state of a ProseMirror editor is represented by an object of
this type. A state is a persistent data structure—it isn't
updated, but rather a new state value is computed from an old one
using the [`apply`](https://prosemirror.net/docs/ref/#state.EditorState.apply) method.

A state holds a number of built-in fields, and plugins can
[define](https://prosemirror.net/docs/ref/#state.PluginSpec.state) additional fields.

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new EditorState(): EditorState;
```

###### Returns

[`EditorState`](#editorstate)

#### Properties

##### doc {#doc}

```ts
doc: ProseMirrorNode;
```

The current document.

##### selection {#selection}

```ts
selection: Selection;
```

The selection.

##### storedMarks {#storedmarks}

```ts
storedMarks: null | readonly Mark[];
```

A set of marks to apply to the next input. Will be null when
no explicit marks have been set.

#### Accessors

##### plugins {#plugins}

###### Get Signature

```ts
get plugins(): readonly ProseMirrorPlugin<any>[];
```

The plugins that are active in this state.

###### Returns

readonly [`ProseMirrorPlugin`](#prosemirrorplugin)\<`any`\>[]

##### schema {#schema}

###### Get Signature

```ts
get schema(): Schema;
```

The schema of the state's document.

###### Returns

[`Schema`](model.md#schema-3)

##### tr {#tr}

###### Get Signature

```ts
get tr(): Transaction;
```

Start a [transaction](https://prosemirror.net/docs/ref/#state.Transaction) from this state.

###### Returns

[`Transaction`](#transaction)

#### Methods

##### apply() {#apply}

```ts
apply(tr: Transaction): EditorState;
```

Apply the given transaction to produce a new state.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`tr`

</td>
<td>

[`Transaction`](#transaction)

</td>
</tr>
</tbody>
</table>

###### Returns

[`EditorState`](#editorstate)

##### applyTransaction() {#applytransaction}

```ts
applyTransaction(rootTr: Transaction): object;
```

Verbose variant of [`apply`](https://prosemirror.net/docs/ref/#state.EditorState.apply) that
returns the precise transactions that were applied (which might
be influenced by the [transaction
hooks](https://prosemirror.net/docs/ref/#state.PluginSpec.filterTransaction) of
plugins) along with the new state.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`rootTr`

</td>
<td>

[`Transaction`](#transaction)

</td>
</tr>
</tbody>
</table>

###### Returns

`object`

###### state

```ts
state: EditorState;
```

###### transactions

```ts
transactions: readonly Transaction[];
```

##### reconfigure() {#reconfigure}

```ts
reconfigure(config: object): EditorState;
```

Create a new state based on this one, but with an adjusted set
of active plugins. State fields that exist in both sets of
plugins are kept unchanged. Those that no longer exist are
dropped, and those that are new are initialized using their
[`init`](https://prosemirror.net/docs/ref/#state.StateField.init) method, passing in the new
configuration object..

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`config`

</td>
<td>

\{ `plugins?`: readonly [`ProseMirrorPlugin`](#prosemirrorplugin)\<`any`\>[]; \}

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`config.plugins?`

</td>
<td>

readonly [`ProseMirrorPlugin`](#prosemirrorplugin)\<`any`\>[]

</td>
<td>

New set of active plugins.

</td>
</tr>
</tbody>
</table>

###### Returns

[`EditorState`](#editorstate)

##### toJSON() {#tojson-2}

```ts
toJSON(pluginFields?: object): any;
```

Serialize this state to JSON. If you want to serialize the state
of plugins, pass an object mapping property names to use in the
resulting JSON object to plugin objects. The argument may also be
a string or number, in which case it is ignored, to support the
way `JSON.stringify` calls `toString` methods.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`pluginFields?`

</td>
<td>

\{ [`propName`: `string`]: [`ProseMirrorPlugin`](#prosemirrorplugin)\<`any`\>; \}

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### create() {#create}

```ts
static create(config: EditorStateConfig): EditorState;
```

Create a new state.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`config`

</td>
<td>

[`EditorStateConfig`](#editorstateconfig)

</td>
</tr>
</tbody>
</table>

###### Returns

[`EditorState`](#editorstate)

##### fromJSON() {#fromjson}

```ts
static fromJSON(
   config: object, 
   json: any, 
   pluginFields?: object): EditorState;
```

Deserialize a JSON representation of a state. `config` should
have at least a `schema` field, and should contain array of
plugins to initialize the state with. `pluginFields` can be used
to deserialize the state of plugins, by associating plugin
instances with the property names they use in the JSON object.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`config`

</td>
<td>

\{ `plugins?`: readonly [`ProseMirrorPlugin`](#prosemirrorplugin)\<`any`\>[]; `schema`: [`Schema`](model.md#schema-3); \}

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`config.plugins?`

</td>
<td>

readonly [`ProseMirrorPlugin`](#prosemirrorplugin)\<`any`\>[]

</td>
<td>

The set of active plugins.

</td>
</tr>
<tr>
<td>

`config.schema`

</td>
<td>

[`Schema`](model.md#schema-3)

</td>
<td>

The schema to use.

</td>
</tr>
<tr>
<td>

`json?`

</td>
<td>

`any`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`pluginFields?`

</td>
<td>

\{ [`propName`: `string`]: [`ProseMirrorPlugin`](#prosemirrorplugin)\<`any`\>; \}

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

###### Returns

[`EditorState`](#editorstate)

<!-- DEBUG memberWithGroups 10 -->

***

### NodeSelection {#nodeselection}

<!-- DEBUG memberWithGroups 1 -->

A node selection is a selection that points at a single node. All
nodes marked [selectable](https://prosemirror.net/docs/ref/#model.NodeSpec.selectable) can be the
target of a node selection. In such a selection, `from` and `to`
point directly before and after the selected node, `anchor` equals
`from`, and `head` equals `to`..

#### Extends

- [`Selection`](#selection-1)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new NodeSelection($pos: ResolvedPos): NodeSelection;
```

Create a node selection. Does not verify the validity of its
argument.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`$pos`

</td>
<td>

[`ResolvedPos`](model.md#resolvedpos)

</td>
</tr>
</tbody>
</table>

###### Returns

[`NodeSelection`](#nodeselection)

###### Overrides

[`Selection`](#selection-1).[`constructor`](#constructor-5)

#### Properties

##### node {#node}

```ts
node: ProseMirrorNode;
```

The selected node.

#### Methods

##### content() {#content}

```ts
content(): Slice;
```

Get the content of this selection as a slice.

###### Returns

[`Slice`](model.md#slice-2)

###### Overrides

[`Selection`](#selection-1).[`content`](#content-2)

##### eq() {#eq-2}

```ts
eq(other: Selection): boolean;
```

Test whether the selection is the same as another selection.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`other`

</td>
<td>

[`Selection`](#selection-1)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Overrides

[`Selection`](#selection-1).[`eq`](#eq-4)

##### getBookmark() {#getbookmark-2}

```ts
getBookmark(): NodeBookmark;
```

Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
which is a value that can be mapped without having access to a
current document, and later resolved to a real selection for a
given document again. (This is used mostly by the history to
track and restore old selections.) The default implementation of
this method just converts the selection to a text selection and
returns the bookmark for that.

###### Returns

[`NodeBookmark`](https://prosemirror.net/docs/ref/#state.NodeBookmark)

###### Overrides

[`Selection`](#selection-1).[`getBookmark`](#getbookmark-4)

##### map() {#map-2}

```ts
map(doc: ProseMirrorNode, mapping: Mappable): Selection;
```

Map this selection through a [mappable](https://prosemirror.net/docs/ref/#transform.Mappable)
thing. `doc` should be the new document to which we are mapping.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`doc`

</td>
<td>

[`ProseMirrorNode`](model.md#prosemirrornode)

</td>
</tr>
<tr>
<td>

`mapping`

</td>
<td>

[`Mappable`](transform.md#mappable)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Selection`](#selection-1)

###### Overrides

[`Selection`](#selection-1).[`map`](#map-4)

##### toJSON() {#tojson-4}

```ts
toJSON(): any;
```

Convert the selection to a JSON representation. When implementing
this for a custom selection class, make sure to give the object a
`type` property whose value matches the ID under which you
[registered](https://prosemirror.net/docs/ref/#state.Selection^jsonID) your class.

###### Returns

`any`

###### Overrides

[`Selection`](#selection-1).[`toJSON`](#tojson-6)

##### create() {#create-2}

```ts
static create(doc: ProseMirrorNode, from: number): NodeSelection;
```

Create a node selection from non-resolved positions.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`doc`

</td>
<td>

[`ProseMirrorNode`](model.md#prosemirrornode)

</td>
</tr>
<tr>
<td>

`from`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

[`NodeSelection`](#nodeselection)

##### isSelectable() {#isselectable}

```ts
static isSelectable(node: ProseMirrorNode): boolean;
```

Determines whether the given node may be selected as a node
selection.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`node`

</td>
<td>

[`ProseMirrorNode`](model.md#prosemirrornode)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

<!-- DEBUG memberWithGroups 10 -->

***

### PluginKey\<PluginState\> {#pluginkey}

<!-- DEBUG memberWithGroups 1 -->

A key is used to [tag](https://prosemirror.net/docs/ref/#state.PluginSpec.key) plugins in a way
that makes it possible to find them, given an editor state.
Assigning a key does mean only one plugin of that type can be
active in a state.

<!-- DEBUG memberWithGroups 4 -->

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`PluginState`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new PluginKey<PluginState>(name?: string): PluginKey<PluginState>;
```

Create a plugin key.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`name?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

[`PluginKey`](#pluginkey)\<`PluginState`\>

#### Methods

##### get() {#get}

```ts
get(state: EditorState): undefined | ProseMirrorPlugin<PluginState>;
```

Get the active plugin with this key, if any, from an editor
state.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`state`

</td>
<td>

[`EditorState`](#editorstate)

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined` \| [`ProseMirrorPlugin`](#prosemirrorplugin)\<`PluginState`\>

##### getState() {#getstate}

```ts
getState(state: EditorState): undefined | PluginState;
```

Get the plugin's state from an editor state.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`state`

</td>
<td>

[`EditorState`](#editorstate)

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined` \| `PluginState`

<!-- DEBUG memberWithGroups 10 -->

***

### ProseMirrorPlugin\<PluginState\> {#prosemirrorplugin}

<!-- DEBUG memberWithGroups 1 -->

Plugins bundle functionality that can be added to an editor.
They are part of the [editor state](https://prosemirror.net/docs/ref/#state.EditorState) and
may influence that state and the view that contains it.

<!-- DEBUG memberWithGroups 4 -->

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`PluginState`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new ProseMirrorPlugin<PluginState>(spec: PluginSpec<PluginState>): ProseMirrorPlugin<PluginState>;
```

Create a plugin.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`spec`

</td>
<td>

[`PluginSpec`](#pluginspec)\<`PluginState`\>

</td>
<td>

The plugin's [spec object](https://prosemirror.net/docs/ref/#state.PluginSpec).

</td>
</tr>
</tbody>
</table>

###### Returns

[`ProseMirrorPlugin`](#prosemirrorplugin)\<`PluginState`\>

#### Properties

##### props {#props}

```ts
readonly props: EditorProps<ProseMirrorPlugin<PluginState>>;
```

The [props](https://prosemirror.net/docs/ref/#view.EditorProps) exported by this plugin.

##### spec {#spec}

```ts
readonly spec: PluginSpec<PluginState>;
```

The plugin's [spec object](https://prosemirror.net/docs/ref/#state.PluginSpec).

#### Methods

##### getState() {#getstate-2}

```ts
getState(state: EditorState): undefined | PluginState;
```

Extract the plugin's state field from an editor state.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`state`

</td>
<td>

[`EditorState`](#editorstate)

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined` \| `PluginState`

<!-- DEBUG memberWithGroups 10 -->

***

### `abstract` Selection {#selection-1}

<!-- DEBUG memberWithGroups 1 -->

Superclass for editor selections. Every selection type should
extend this. Should not be instantiated directly.

#### Extended by

- [`AllSelection`](#allselection)
- [`NodeSelection`](#nodeselection)
- [`TextSelection`](#textselection)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new Selection(
   $anchor: ResolvedPos, 
   $head: ResolvedPos, 
   ranges?: readonly SelectionRange[]): Selection;
```

Initialize a selection with the head and anchor and ranges. If no
ranges are given, constructs a single range across `$anchor` and
`$head`.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`$anchor`

</td>
<td>

[`ResolvedPos`](model.md#resolvedpos)

</td>
<td>

The resolved anchor of the selection (the side that stays in
place when the selection is modified).

</td>
</tr>
<tr>
<td>

`$head`

</td>
<td>

[`ResolvedPos`](model.md#resolvedpos)

</td>
<td>

The resolved head of the selection (the side that moves when
the selection is modified).

</td>
</tr>
<tr>
<td>

`ranges?`

</td>
<td>

readonly [`SelectionRange`](#selectionrange)[]

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

###### Returns

[`Selection`](#selection-1)

#### Properties

##### $anchor {#anchor}

```ts
readonly $anchor: ResolvedPos;
```

The resolved anchor of the selection (the side that stays in
place when the selection is modified).

##### $head {#head}

```ts
readonly $head: ResolvedPos;
```

The resolved head of the selection (the side that moves when
the selection is modified).

##### ranges {#ranges}

```ts
ranges: readonly SelectionRange[];
```

The ranges covered by the selection.

##### visible {#visible}

```ts
visible: boolean;
```

Controls whether, when a selection of this type is active in the
browser, the selected range should be visible to the user.
Defaults to `true`.

#### Accessors

##### $from {#from}

###### Get Signature

```ts
get $from(): ResolvedPos;
```

The resolved lower  bound of the selection's main range.

###### Returns

[`ResolvedPos`](model.md#resolvedpos)

##### $to {#to}

###### Get Signature

```ts
get $to(): ResolvedPos;
```

The resolved upper bound of the selection's main range.

###### Returns

[`ResolvedPos`](model.md#resolvedpos)

##### anchor {#anchor-1}

###### Get Signature

```ts
get anchor(): number;
```

The selection's anchor, as an unresolved position.

###### Returns

`number`

##### empty {#empty}

###### Get Signature

```ts
get empty(): boolean;
```

Indicates whether the selection contains any content.

###### Returns

`boolean`

##### from {#from-1}

###### Get Signature

```ts
get from(): number;
```

The lower bound of the selection's main range.

###### Returns

`number`

##### head {#head-1}

###### Get Signature

```ts
get head(): number;
```

The selection's head.

###### Returns

`number`

##### to {#to-1}

###### Get Signature

```ts
get to(): number;
```

The upper bound of the selection's main range.

###### Returns

`number`

#### Methods

##### content() {#content-2}

```ts
content(): Slice;
```

Get the content of this selection as a slice.

###### Returns

[`Slice`](model.md#slice-2)

##### eq() {#eq-4}

```ts
abstract eq(selection: Selection): boolean;
```

Test whether the selection is the same as another selection.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`selection`

</td>
<td>

[`Selection`](#selection-1)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### getBookmark() {#getbookmark-4}

```ts
getBookmark(): SelectionBookmark;
```

Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
which is a value that can be mapped without having access to a
current document, and later resolved to a real selection for a
given document again. (This is used mostly by the history to
track and restore old selections.) The default implementation of
this method just converts the selection to a text selection and
returns the bookmark for that.

###### Returns

[`SelectionBookmark`](#selectionbookmark)

##### map() {#map-4}

```ts
abstract map(doc: ProseMirrorNode, mapping: Mappable): Selection;
```

Map this selection through a [mappable](https://prosemirror.net/docs/ref/#transform.Mappable)
thing. `doc` should be the new document to which we are mapping.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`doc`

</td>
<td>

[`ProseMirrorNode`](model.md#prosemirrornode)

</td>
</tr>
<tr>
<td>

`mapping`

</td>
<td>

[`Mappable`](transform.md#mappable)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Selection`](#selection-1)

##### replace() {#replace-2}

```ts
replace(tr: Transaction, content?: Slice): void;
```

Replace the selection with a slice or, if no slice is given,
delete the selection. Will append to the given transaction.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`tr`

</td>
<td>

[`Transaction`](#transaction)

</td>
</tr>
<tr>
<td>

`content?`

</td>
<td>

[`Slice`](model.md#slice-2)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### replaceWith() {#replacewith}

```ts
replaceWith(tr: Transaction, node: ProseMirrorNode): void;
```

Replace the selection with the given node, appending the changes
to the given transaction.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`tr`

</td>
<td>

[`Transaction`](#transaction)

</td>
</tr>
<tr>
<td>

`node`

</td>
<td>

[`ProseMirrorNode`](model.md#prosemirrornode)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### toJSON() {#tojson-6}

```ts
abstract toJSON(): any;
```

Convert the selection to a JSON representation. When implementing
this for a custom selection class, make sure to give the object a
`type` property whose value matches the ID under which you
[registered](https://prosemirror.net/docs/ref/#state.Selection^jsonID) your class.

###### Returns

`any`

##### atEnd() {#atend}

```ts
static atEnd(doc: ProseMirrorNode): Selection;
```

Find the cursor or leaf node selection closest to the end of the
given document.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`doc`

</td>
<td>

[`ProseMirrorNode`](model.md#prosemirrornode)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Selection`](#selection-1)

##### atStart() {#atstart}

```ts
static atStart(doc: ProseMirrorNode): Selection;
```

Find the cursor or leaf node selection closest to the start of
the given document. Will return an
[`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
exists.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`doc`

</td>
<td>

[`ProseMirrorNode`](model.md#prosemirrornode)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Selection`](#selection-1)

##### findFrom() {#findfrom}

```ts
static findFrom(
   $pos: ResolvedPos, 
   dir: number, 
   textOnly?: boolean): null | Selection;
```

Find a valid cursor or leaf node selection starting at the given
position and searching back if `dir` is negative, and forward if
positive. When `textOnly` is true, only consider cursor
selections. Will return null when no valid selection position is
found.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`$pos`

</td>
<td>

[`ResolvedPos`](model.md#resolvedpos)

</td>
</tr>
<tr>
<td>

`dir`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`textOnly?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`Selection`](#selection-1)

##### fromJSON() {#fromjson-2}

```ts
static fromJSON(doc: ProseMirrorNode, json: any): Selection;
```

Deserialize the JSON representation of a selection. Must be
implemented for custom classes (as a static class method).

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`doc`

</td>
<td>

[`ProseMirrorNode`](model.md#prosemirrornode)

</td>
</tr>
<tr>
<td>

`json`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Selection`](#selection-1)

##### jsonID() {#jsonid}

```ts
static jsonID(id: string, selectionClass: object): object;
```

To be able to deserialize selections from JSON, custom selection
classes must register themselves with an ID string, so that they
can be disambiguated. Try to pick something that's unlikely to
clash with classes from other modules.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`id`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`selectionClass`

</td>
<td>

\{ `fromJSON`: (`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `json`: `any`) => [`Selection`](#selection-1); \}

</td>
</tr>
<tr>
<td>

`selectionClass.fromJSON`

</td>
<td>

(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `json`: `any`) => [`Selection`](#selection-1)

</td>
</tr>
</tbody>
</table>

###### Returns

`object`

###### fromJSON()

```ts
fromJSON: (doc: ProseMirrorNode, json: any) => Selection;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`doc`

</td>
<td>

[`ProseMirrorNode`](model.md#prosemirrornode)

</td>
</tr>
<tr>
<td>

`json`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Selection`](#selection-1)

##### near() {#near}

```ts
static near($pos: ResolvedPos, bias?: number): Selection;
```

Find a valid cursor or leaf node selection near the given
position. Searches forward first by default, but if `bias` is
negative, it will search backwards first.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`$pos`

</td>
<td>

[`ResolvedPos`](model.md#resolvedpos)

</td>
</tr>
<tr>
<td>

`bias?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Selection`](#selection-1)

<!-- DEBUG memberWithGroups 10 -->

***

### SelectionRange {#selectionrange}

<!-- DEBUG memberWithGroups 1 -->

Represents a selected range in a document.

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new SelectionRange($from: ResolvedPos, $to: ResolvedPos): SelectionRange;
```

Create a range.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`$from`

</td>
<td>

[`ResolvedPos`](model.md#resolvedpos)

</td>
<td>

The lower bound of the range.

</td>
</tr>
<tr>
<td>

`$to`

</td>
<td>

[`ResolvedPos`](model.md#resolvedpos)

</td>
<td>

The upper bound of the range.

</td>
</tr>
</tbody>
</table>

###### Returns

[`SelectionRange`](#selectionrange)

#### Properties

##### $from {#from-2}

```ts
readonly $from: ResolvedPos;
```

The lower bound of the range.

##### $to {#to-2}

```ts
readonly $to: ResolvedPos;
```

The upper bound of the range.

<!-- DEBUG memberWithGroups 10 -->

***

### TextSelection {#textselection}

<!-- DEBUG memberWithGroups 1 -->

A text selection represents a classical editor selection, with a
head (the moving side) and anchor (immobile side), both of which
point into textblock nodes. It can be empty (a regular cursor
position).

#### Extends

- [`Selection`](#selection-1)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new TextSelection($anchor: ResolvedPos, $head?: ResolvedPos): TextSelection;
```

Construct a text selection between the given points.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`$anchor`

</td>
<td>

[`ResolvedPos`](model.md#resolvedpos)

</td>
</tr>
<tr>
<td>

`$head?`

</td>
<td>

[`ResolvedPos`](model.md#resolvedpos)

</td>
</tr>
</tbody>
</table>

###### Returns

[`TextSelection`](#textselection)

###### Overrides

[`Selection`](#selection-1).[`constructor`](#constructor-5)

#### Accessors

##### $cursor {#cursor}

###### Get Signature

```ts
get $cursor(): null | ResolvedPos;
```

Returns a resolved position if this is a cursor selection (an
empty text selection), and null otherwise.

###### Returns

`null` \| [`ResolvedPos`](model.md#resolvedpos)

#### Methods

##### eq() {#eq-6}

```ts
eq(other: Selection): boolean;
```

Test whether the selection is the same as another selection.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`other`

</td>
<td>

[`Selection`](#selection-1)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Overrides

[`Selection`](#selection-1).[`eq`](#eq-4)

##### getBookmark() {#getbookmark-6}

```ts
getBookmark(): TextBookmark;
```

Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
which is a value that can be mapped without having access to a
current document, and later resolved to a real selection for a
given document again. (This is used mostly by the history to
track and restore old selections.) The default implementation of
this method just converts the selection to a text selection and
returns the bookmark for that.

###### Returns

[`TextBookmark`](https://prosemirror.net/docs/ref/#state.TextBookmark)

###### Overrides

[`Selection`](#selection-1).[`getBookmark`](#getbookmark-4)

##### map() {#map-6}

```ts
map(doc: ProseMirrorNode, mapping: Mappable): Selection;
```

Map this selection through a [mappable](https://prosemirror.net/docs/ref/#transform.Mappable)
thing. `doc` should be the new document to which we are mapping.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`doc`

</td>
<td>

[`ProseMirrorNode`](model.md#prosemirrornode)

</td>
</tr>
<tr>
<td>

`mapping`

</td>
<td>

[`Mappable`](transform.md#mappable)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Selection`](#selection-1)

###### Overrides

[`Selection`](#selection-1).[`map`](#map-4)

##### replace() {#replace-4}

```ts
replace(tr: Transaction, content?: Slice): void;
```

Replace the selection with a slice or, if no slice is given,
delete the selection. Will append to the given transaction.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`tr`

</td>
<td>

[`Transaction`](#transaction)

</td>
</tr>
<tr>
<td>

`content?`

</td>
<td>

[`Slice`](model.md#slice-2)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Overrides

[`Selection`](#selection-1).[`replace`](#replace-2)

##### toJSON() {#tojson-8}

```ts
toJSON(): any;
```

Convert the selection to a JSON representation. When implementing
this for a custom selection class, make sure to give the object a
`type` property whose value matches the ID under which you
[registered](https://prosemirror.net/docs/ref/#state.Selection^jsonID) your class.

###### Returns

`any`

###### Overrides

[`Selection`](#selection-1).[`toJSON`](#tojson-6)

##### between() {#between}

```ts
static between(
   $anchor: ResolvedPos, 
   $head: ResolvedPos, 
   bias?: number): Selection;
```

Return a text selection that spans the given positions or, if
they aren't text positions, find a text selection near them.
`bias` determines whether the method searches forward (default)
or backwards (negative number) first. Will fall back to calling
[`Selection.near`](https://prosemirror.net/docs/ref/#state.Selection^near) when the document
doesn't contain a valid text position.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`$anchor`

</td>
<td>

[`ResolvedPos`](model.md#resolvedpos)

</td>
</tr>
<tr>
<td>

`$head`

</td>
<td>

[`ResolvedPos`](model.md#resolvedpos)

</td>
</tr>
<tr>
<td>

`bias?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Selection`](#selection-1)

##### create() {#create-4}

```ts
static create(
   doc: ProseMirrorNode, 
   anchor: number, 
   head?: number): TextSelection;
```

Create a text selection from non-resolved positions.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`doc`

</td>
<td>

[`ProseMirrorNode`](model.md#prosemirrornode)

</td>
</tr>
<tr>
<td>

`anchor`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`head?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

[`TextSelection`](#textselection)

<!-- DEBUG memberWithGroups 10 -->

***

### Transaction {#transaction}

<!-- DEBUG memberWithGroups 1 -->

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

#### Extends

- [`Transform`](transform.md#transform)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### storedMarks {#storedmarks-1}

```ts
storedMarks: null | readonly Mark[];
```

The stored marks set by this transaction, if any.

##### time {#time}

```ts
time: number;
```

The timestamp associated with this transaction, in the same
format as `Date.now()`.

#### Accessors

##### isGeneric {#isgeneric}

###### Get Signature

```ts
get isGeneric(): boolean;
```

Returns true if this transaction doesn't contain any metadata,
and can thus safely be extended.

###### Returns

`boolean`

##### scrolledIntoView {#scrolledintoview}

###### Get Signature

```ts
get scrolledIntoView(): boolean;
```

True when this transaction has had `scrollIntoView` called on it.

###### Returns

`boolean`

##### selection {#selection-2}

###### Get Signature

```ts
get selection(): Selection;
```

The transaction's current selection. This defaults to the editor
selection [mapped](https://prosemirror.net/docs/ref/#state.Selection.map) through the steps in the
transaction, but can be overwritten with
[`setSelection`](https://prosemirror.net/docs/ref/#state.Transaction.setSelection).

###### Returns

[`Selection`](#selection-1)

##### selectionSet {#selectionset}

###### Get Signature

```ts
get selectionSet(): boolean;
```

Whether the selection was explicitly updated by this transaction.

###### Returns

`boolean`

##### storedMarksSet {#storedmarksset}

###### Get Signature

```ts
get storedMarksSet(): boolean;
```

Whether the stored marks were explicitly set for this transaction.

###### Returns

`boolean`

#### Methods

##### addStoredMark() {#addstoredmark}

```ts
addStoredMark(mark: Mark): this;
```

Add a mark to the set of stored marks.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`mark`

</td>
<td>

[`Mark`](model.md#mark)

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### deleteSelection() {#deleteselection}

```ts
deleteSelection(): this;
```

Delete the selection.

###### Returns

`this`

##### ensureMarks() {#ensuremarks}

```ts
ensureMarks(marks: readonly Mark[]): this;
```

Make sure the current stored marks or, if that is null, the marks
at the selection, match the given set of marks. Does nothing if
this is already the case.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`marks`

</td>
<td>

readonly [`Mark`](model.md#mark)[]

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### getMeta() {#getmeta}

```ts
getMeta(key: 
  | string
  | ProseMirrorPlugin<any>
  | PluginKey<any>): any;
```

Retrieve a metadata property for a given name or plugin.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`key`

</td>
<td>

 \| `string` \| [`ProseMirrorPlugin`](#prosemirrorplugin)\<`any`\> \| [`PluginKey`](#pluginkey)\<`any`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`any`

##### insertText() {#inserttext}

```ts
insertText(
   text: string, 
   from?: number, 
   to?: number): this;
```

Replace the given range, or the selection if no range is given,
with a text node containing the given string.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`text`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`from?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`to?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### removeStoredMark() {#removestoredmark}

```ts
removeStoredMark(mark: MarkType | Mark): this;
```

Remove a mark or mark type from the set of stored marks.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`mark`

</td>
<td>

[`MarkType`](model.md#marktype-1) \| [`Mark`](model.md#mark)

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### replaceSelection() {#replaceselection}

```ts
replaceSelection(slice: Slice): this;
```

Replace the current selection with the given slice.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`slice`

</td>
<td>

[`Slice`](model.md#slice-2)

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### replaceSelectionWith() {#replaceselectionwith}

```ts
replaceSelectionWith(node: ProseMirrorNode, inheritMarks?: boolean): this;
```

Replace the selection with the given node. When `inheritMarks` is
true and the content is inline, it inherits the marks from the
place where it is inserted.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`node`

</td>
<td>

[`ProseMirrorNode`](model.md#prosemirrornode)

</td>
</tr>
<tr>
<td>

`inheritMarks?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### scrollIntoView() {#scrollintoview}

```ts
scrollIntoView(): this;
```

Indicate that the editor should scroll the selection into view
when updated to the state produced by this transaction.

###### Returns

`this`

##### setMeta() {#setmeta}

```ts
setMeta(key: 
  | string
  | ProseMirrorPlugin<any>
  | PluginKey<any>, value: any): this;
```

Store a metadata property in this transaction, keyed either by
name or by plugin.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`key`

</td>
<td>

 \| `string` \| [`ProseMirrorPlugin`](#prosemirrorplugin)\<`any`\> \| [`PluginKey`](#pluginkey)\<`any`\>

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### setSelection() {#setselection}

```ts
setSelection(selection: Selection): this;
```

Update the transaction's current selection. Will determine the
selection that the editor gets when the transaction is applied.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`selection`

</td>
<td>

[`Selection`](#selection-1)

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### setStoredMarks() {#setstoredmarks}

```ts
setStoredMarks(marks: null | readonly Mark[]): this;
```

Set the current stored marks.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`marks`

</td>
<td>

`null` \| readonly [`Mark`](model.md#mark)[]

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### setTime() {#settime}

```ts
setTime(time: number): this;
```

Update the timestamp for the transaction.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`time`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

<!-- DEBUG memberWithGroups 10 -->

## Interfaces

### EditorStateConfig {#editorstateconfig}

<!-- DEBUG memberWithGroups 1 -->

The type of object passed to
[`EditorState.create`](https://prosemirror.net/docs/ref/#state.EditorState^create).

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="doc-1"></a> `doc?`

</td>
<td>

[`ProseMirrorNode`](model.md#prosemirrornode)

</td>
<td>

The starting document. Either this or `schema` _must_ be
provided.

</td>
</tr>
<tr>
<td>

<a id="plugins-1"></a> `plugins?`

</td>
<td>

readonly [`ProseMirrorPlugin`](#prosemirrorplugin)\<`any`\>[]

</td>
<td>

The plugins that should be active in this state.

</td>
</tr>
<tr>
<td>

<a id="schema-1"></a> `schema?`

</td>
<td>

[`Schema`](model.md#schema-3)\<`any`, `any`\>

</td>
<td>

The schema to use (only relevant if no `doc` is specified).

</td>
</tr>
<tr>
<td>

<a id="selection-3"></a> `selection?`

</td>
<td>

[`Selection`](#selection-1)

</td>
<td>

A valid selection in the document.

</td>
</tr>
<tr>
<td>

<a id="storedmarks-2"></a> `storedMarks?`

</td>
<td>

`null` \| readonly [`Mark`](model.md#mark)[]

</td>
<td>

The initial set of [stored marks](https://prosemirror.net/docs/ref/#state.EditorState.storedMarks).

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### PluginSpec\<PluginState\> {#pluginspec}

<!-- DEBUG memberWithGroups 1 -->

This is the type passed to the [`Plugin`](https://prosemirror.net/docs/ref/#state.Plugin)
constructor. It provides a definition for a plugin.

<!-- DEBUG memberWithGroups 4 -->

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`PluginState`

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

#### Indexable

```ts
[key: string]: any
```

Additional properties are allowed on plugin specs, which can be
read via [`Plugin.spec`](https://prosemirror.net/docs/ref/#state.Plugin.spec).

<!-- DEBUG memberWithGroups 9 -->

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="appendtransaction"></a> `appendTransaction?`

</td>
<td>

(`transactions`: readonly [`Transaction`](#transaction)[], `oldState`: [`EditorState`](#editorstate), `newState`: [`EditorState`](#editorstate)) => `undefined` \| `null` \| [`Transaction`](#transaction)

</td>
<td>

Allows the plugin to append another transaction to be applied
after the given array of transactions. When another plugin
appends a transaction after this was called, it is called again
with the new state and new transactions—but only the new
transactions, i.e. it won't be passed transactions that it
already saw.

</td>
</tr>
<tr>
<td>

<a id="filtertransaction"></a> `filterTransaction?`

</td>
<td>

(`tr`: [`Transaction`](#transaction), `state`: [`EditorState`](#editorstate)) => `boolean`

</td>
<td>

When present, this will be called before a transaction is
applied by the state, allowing the plugin to cancel it (by
returning false).

</td>
</tr>
<tr>
<td>

<a id="key"></a> `key?`

</td>
<td>

[`PluginKey`](#pluginkey)\<`any`\>

</td>
<td>

Can be used to make this a keyed plugin. You can have only one
plugin with a given key in a given state, but it is possible to
access the plugin's configuration and state through the key,
without having access to the plugin instance object.

</td>
</tr>
<tr>
<td>

<a id="props-1"></a> `props?`

</td>
<td>

[`EditorProps`](view.md#editorprops)\<[`ProseMirrorPlugin`](#prosemirrorplugin)\<`PluginState`\>\>

</td>
<td>

The [view props](https://prosemirror.net/docs/ref/#view.EditorProps) added by this plugin. Props
that are functions will be bound to have the plugin instance as
their `this` binding.

</td>
</tr>
<tr>
<td>

<a id="state"></a> `state?`

</td>
<td>

[`StateField`](#statefield)\<`PluginState`\>

</td>
<td>

Allows a plugin to define a [state field](https://prosemirror.net/docs/ref/#state.StateField), an
extra slot in the state object in which it can keep its own data.

</td>
</tr>
<tr>
<td>

<a id="view"></a> `view?`

</td>
<td>

(`view`: [`EditorView`](view.md#editorview)) => [`PluginView`](#pluginview)

</td>
<td>

When the plugin needs to interact with the editor view, or
set something up in the DOM, use this field. The function
will be called when the plugin's state is associated with an
editor view.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### SelectionBookmark {#selectionbookmark}

<!-- DEBUG memberWithGroups 1 -->

A lightweight, document-independent representation of a selection.
You can define a custom bookmark type for a custom selection class
to make the history handle it well.

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="map-8"></a> `map`

</td>
<td>

(`mapping`: [`Mappable`](transform.md#mappable)) => [`SelectionBookmark`](#selectionbookmark)

</td>
<td>

Map the bookmark through a set of changes.

</td>
</tr>
<tr>
<td>

<a id="resolve"></a> `resolve`

</td>
<td>

(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)) => [`Selection`](#selection-1)

</td>
<td>

Resolve the bookmark to a real selection again. This may need to
do some error checking and may fall back to a default (usually
[`TextSelection.between`](https://prosemirror.net/docs/ref/#state.TextSelection^between)) if
mapping made the bookmark invalid.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### StateField\<T\> {#statefield}

<!-- DEBUG memberWithGroups 1 -->

A plugin spec may provide a state field (under its
[`state`](https://prosemirror.net/docs/ref/#state.PluginSpec.state) property) of this type, which
describes the state it wants to keep. Functions provided here are
always called with the plugin instance as their `this` binding.

<!-- DEBUG memberWithGroups 4 -->

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="apply-2"></a> `apply`

</td>
<td>

(`tr`: [`Transaction`](#transaction), `value`: `T`, `oldState`: [`EditorState`](#editorstate), `newState`: [`EditorState`](#editorstate)) => `T`

</td>
<td>

Apply the given transaction to this state field, producing a new
field value. Note that the `newState` argument is again a partially
constructed state does not yet contain the state from plugins
coming after this one.

</td>
</tr>
<tr>
<td>

<a id="fromjson-4"></a> `fromJSON?`

</td>
<td>

(`config`: [`EditorStateConfig`](#editorstateconfig), `value`: `any`, `state`: [`EditorState`](#editorstate)) => `T`

</td>
<td>

Deserialize the JSON representation of this field. Note that the
`state` argument is again a half-initialized state.

</td>
</tr>
<tr>
<td>

<a id="init"></a> `init`

</td>
<td>

(`config`: [`EditorStateConfig`](#editorstateconfig), `instance`: [`EditorState`](#editorstate)) => `T`

</td>
<td>

Initialize the value of the field. `config` will be the object
passed to [`EditorState.create`](https://prosemirror.net/docs/ref/#state.EditorState^create). Note
that `instance` is a half-initialized state instance, and will
not have values for plugin fields initialized after this one.

</td>
</tr>
<tr>
<td>

<a id="tojson-10"></a> `toJSON?`

</td>
<td>

(`value`: `T`) => `any`

</td>
<td>

Convert this field to JSON. Optional, can be left off to disable
JSON serialization for the field.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

## Type Aliases

### Command() {#command}

```ts
type Command = (state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView) => boolean;
```

Commands are functions that take a state and a an optional
transaction dispatch function and...

 - determine whether they apply to this state
 - if not, return false
 - if `dispatch` was passed, perform their effect, possibly by
   passing a transaction to `dispatch`
 - return true

In some cases, the editor view is passed as a third argument.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`state`

</td>
<td>

[`EditorState`](#editorstate)

</td>
</tr>
<tr>
<td>

`dispatch?`

</td>
<td>

(`tr`: [`Transaction`](#transaction)) => `void`

</td>
</tr>
<tr>
<td>

`view?`

</td>
<td>

[`EditorView`](view.md#editorview)

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

***

### PluginView {#pluginview}

<!-- DEBUG memberWithGroups 1 -->

```ts
type PluginView = object;
```

A stateful object that can be installed in an editor by a
[plugin](https://prosemirror.net/docs/ref/#state.PluginSpec.view).

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### destroy()? {#destroy}

```ts
optional destroy: () => void;
```

Called when the view is destroyed or receives a state
with different plugins.

###### Returns

`void`

##### update()? {#update}

```ts
optional update: (view: EditorView, prevState: EditorState) => void;
```

Called whenever the view's state is updated.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](view.md#editorview)

</td>
</tr>
<tr>
<td>

`prevState`

</td>
<td>

[`EditorState`](#editorstate)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

<!-- DEBUG memberWithGroups 10 -->

## References

### Plugin {#plugin}

Renames and re-exports [ProseMirrorPlugin](#prosemirrorplugin)

<!-- DEBUG memberWithGroups 10 -->
