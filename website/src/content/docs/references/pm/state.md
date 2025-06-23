---
title: prosekit/pm/state
sidebar:
  label: pm/state
---

Re-exports from [prosemirror-state](https://github.com/ProseMirror/prosemirror-state).

## Classes

### AllSelection {#allselection}

A selection type that represents selecting the whole document
(which can not necessarily be expressed with a text selection, when
there are for example leaf block nodes at the start or end of the
document).

#### Extends

- [`Selection`](#selection-1)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructorallselection" href="#constructorallselection">AllSelection</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`AllSelection`](#allselection)</code>

</dt>

<dd>

Create an all-selection over the given document.

###### Overrides

[`Selection`](#selection-1).[`constructor`](#constructor-5)

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="anchor" href="#anchor">$anchor</a>: [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

The resolved anchor of the selection (the side that stays in
place when the selection is modified).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="head" href="#head">$head</a>: [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

The resolved head of the selection (the side that moves when
the selection is modified).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="ranges" href="#ranges">ranges</a>: readonly [`SelectionRange`](#selectionrange)[]</code>

</dt>

<dd>

The ranges covered by the selection.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="visible" href="#visible">visible</a>: `boolean`</code>

</dt>

<dd>

Controls whether, when a selection of this type is active in the
browser, the selected range should be visible to the user.
Defaults to `true`.

</dd>

</dl>

#### Accessors

##### $from {#from}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="fromfrom" href="#fromfrom">$from</a>(): [`ResolvedPos`](model.md#resolvedpos)</code>

The resolved lower  bound of the selection's main range.

###### Returns

[`ResolvedPos`](model.md#resolvedpos)

###### Inherited from

[`Selection`](#selection-1).[`$from`](#from-4)

##### $to {#to}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="toto" href="#toto">$to</a>(): [`ResolvedPos`](model.md#resolvedpos)</code>

The resolved upper bound of the selection's main range.

###### Returns

[`ResolvedPos`](model.md#resolvedpos)

###### Inherited from

[`Selection`](#selection-1).[`$to`](#to-4)

##### anchor {#anchor-1}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="anchoranchor" href="#anchoranchor">anchor</a>(): `number`</code>

The selection's anchor, as an unresolved position.

###### Returns

`number`

###### Inherited from

[`Selection`](#selection-1).[`anchor`](#anchor-5)

##### empty {#empty}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="emptyempty" href="#emptyempty">empty</a>(): `boolean`</code>

Indicates whether the selection contains any content.

###### Returns

`boolean`

###### Inherited from

[`Selection`](#selection-1).[`empty`](#empty-2)

##### from {#from-1}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="fromfrom-1" href="#fromfrom-1">from</a>(): `number`</code>

The lower bound of the selection's main range.

###### Returns

`number`

###### Inherited from

[`Selection`](#selection-1).[`from`](#from-5)

##### head {#head-1}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="headhead" href="#headhead">head</a>(): `number`</code>

The selection's head.

###### Returns

`number`

###### Inherited from

[`Selection`](#selection-1).[`head`](#head-5)

##### to {#to-1}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="toto-1" href="#toto-1">to</a>(): `number`</code>

The upper bound of the selection's main range.

###### Returns

`number`

###### Inherited from

[`Selection`](#selection-1).[`to`](#to-5)

#### Methods

##### content() {#content}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="content-1" href="#content-1">content</a>(): [`Slice`](model.md#slice-2)</code>

</dt>

<dd>

Get the content of this selection as a slice.

###### Inherited from

[`Selection`](#selection-1).[`content`](#content-4)

</dd>

</dl>

##### eq() {#eq}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="eq-1" href="#eq-1">eq</a>(`other`: [`Selection`](#selection-1)): `boolean`</code>

</dt>

<dd>

Test whether the selection is the same as another selection.

###### Overrides

[`Selection`](#selection-1).[`eq`](#eq-4)

</dd>

</dl>

##### getBookmark() {#getbookmark}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="getbookmark-1" href="#getbookmark-1">getBookmark</a>(): `object`</code>

</dt>

<dd>

Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
which is a value that can be mapped without having access to a
current document, and later resolved to a real selection for a
given document again. (This is used mostly by the history to
track and restore old selections.) The default implementation of
this method just converts the selection to a text selection and
returns the bookmark for that.

###### Overrides

[`Selection`](#selection-1).[`getBookmark`](#getbookmark-4)

</dd>

</dl>

##### map() {#map}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="map-1" href="#map-1">map</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`AllSelection`](#allselection)</code>

</dt>

<dd>

Map this selection through a [mappable](https://prosemirror.net/docs/ref/#transform.Mappable)
thing. `doc` should be the new document to which we are mapping.

###### Overrides

[`Selection`](#selection-1).[`map`](#map-4)

</dd>

</dl>

##### replace() {#replace}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="replace-1" href="#replace-1">replace</a>(`tr`: [`Transaction`](#transaction), `content?`: [`Slice`](model.md#slice-2)): `void`</code>

</dt>

<dd>

Replace the selection with a slice or, if no slice is given,
delete the selection. Will append to the given transaction.

###### Overrides

[`Selection`](#selection-1).[`replace`](#replace-4)

</dd>

</dl>

##### replaceWith() {#replacewith}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="replacewith-1" href="#replacewith-1">replaceWith</a>(`tr`: [`Transaction`](#transaction), `node`: [`ProseMirrorNode`](model.md#prosemirrornode)): `void`</code>

</dt>

<dd>

Replace the selection with the given node, appending the changes
to the given transaction.

###### Inherited from

[`Selection`](#selection-1).[`replaceWith`](#replacewith-4)

</dd>

</dl>

##### toJSON() {#tojson}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="tojson-1" href="#tojson-1">toJSON</a>(): `any`</code>

</dt>

<dd>

Convert the selection to a JSON representation. When implementing
this for a custom selection class, make sure to give the object a
`type` property whose value matches the ID under which you
[registered](https://prosemirror.net/docs/ref/#state.Selection^jsonID) your class.

###### Overrides

[`Selection`](#selection-1).[`toJSON`](#tojson-6)

</dd>

</dl>

##### atEnd() {#atend}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="atend-1" href="#atend-1">atEnd</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`Selection`](#selection-1)</code>

</dt>

<dd>

Find the cursor or leaf node selection closest to the end of the
given document.

###### Inherited from

[`Selection`](#selection-1).[`atEnd`](#atend-4)

</dd>

</dl>

##### atStart() {#atstart}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="atstart-1" href="#atstart-1">atStart</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`Selection`](#selection-1)</code>

</dt>

<dd>

Find the cursor or leaf node selection closest to the start of
the given document. Will return an
[`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
exists.

###### Inherited from

[`Selection`](#selection-1).[`atStart`](#atstart-4)

</dd>

</dl>

##### findFrom() {#findfrom}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="findfrom-1" href="#findfrom-1">findFrom</a>(`$pos`: [`ResolvedPos`](model.md#resolvedpos), `dir`: `number`, `textOnly?`: `boolean`): `null` \| [`Selection`](#selection-1)</code>

</dt>

<dd>

Find a valid cursor or leaf node selection starting at the given
position and searching back if `dir` is negative, and forward if
positive. When `textOnly` is true, only consider cursor
selections. Will return null when no valid selection position is
found.

###### Inherited from

[`Selection`](#selection-1).[`findFrom`](#findfrom-4)

</dd>

</dl>

##### fromJSON() {#fromjson}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="fromjson-1" href="#fromjson-1">fromJSON</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `json`: `any`): [`Selection`](#selection-1)</code>

</dt>

<dd>

Deserialize the JSON representation of a selection. Must be
implemented for custom classes (as a static class method).

###### Inherited from

[`Selection`](#selection-1).[`fromJSON`](#fromjson-6)

</dd>

</dl>

##### jsonID() {#jsonid}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="jsonid-1" href="#jsonid-1">jsonID</a>(`id`: `string`, `selectionClass`: `object`): `object`</code>

</dt>

<dd>

To be able to deserialize selections from JSON, custom selection
classes must register themselves with an ID string, so that they
can be disambiguated. Try to pick something that's unlikely to
clash with classes from other modules.

###### Inherited from

[`Selection`](#selection-1).[`jsonID`](#jsonid-4)

</dd>

</dl>

##### near() {#near}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="near-1" href="#near-1">near</a>(`$pos`: [`ResolvedPos`](model.md#resolvedpos), `bias?`: `number`): [`Selection`](#selection-1)</code>

</dt>

<dd>

Find a valid cursor or leaf node selection near the given
position. Searches forward first by default, but if `bias` is
negative, it will search backwards first.

###### Inherited from

[`Selection`](#selection-1).[`near`](#near-4)

</dd>

</dl>

***

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

<code data-typedoc-declaration><i></i> new <a id="constructoreditorstate" href="#constructoreditorstate">EditorState</a>(): [`EditorState`](#editorstate)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="doc" href="#doc">doc</a>: [`ProseMirrorNode`](model.md#prosemirrornode)</code>

</dt>

<dd>

The current document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="selection" href="#selection">selection</a>: [`Selection`](#selection-1)</code>

</dt>

<dd>

The selection.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="storedmarks" href="#storedmarks">storedMarks</a>: `null` \| readonly [`Mark`](model.md#mark)[]</code>

</dt>

<dd>

A set of marks to apply to the next input. Will be null when
no explicit marks have been set.

</dd>

</dl>

#### Accessors

##### plugins {#plugins}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="pluginsplugins" href="#pluginsplugins">plugins</a>(): readonly [`ProseMirrorPlugin`](#prosemirrorplugin)\<`any`\>[]</code>

The plugins that are active in this state.

###### Returns

readonly [`ProseMirrorPlugin`](#prosemirrorplugin)\<`any`\>[]

##### schema {#schema}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="schemaschema" href="#schemaschema">schema</a>(): [`Schema`](model.md#schema-3)</code>

The schema of the state's document.

###### Returns

[`Schema`](model.md#schema-3)

##### tr {#tr}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="trtr" href="#trtr">tr</a>(): [`Transaction`](#transaction)</code>

Start a [transaction](https://prosemirror.net/docs/ref/#state.Transaction) from this state.

###### Returns

[`Transaction`](#transaction)

#### Methods

##### apply() {#apply}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="apply-1" href="#apply-1">apply</a>(`tr`: [`Transaction`](#transaction)): [`EditorState`](#editorstate)</code>

</dt>

<dd>

Apply the given transaction to produce a new state.

</dd>

</dl>

##### applyTransaction() {#applytransaction}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="applytransaction-1" href="#applytransaction-1">applyTransaction</a>(`rootTr`: [`Transaction`](#transaction)): `object`</code>

</dt>

<dd>

Verbose variant of [`apply`](https://prosemirror.net/docs/ref/#state.EditorState.apply) that
returns the precise transactions that were applied (which might
be influenced by the [transaction
hooks](https://prosemirror.net/docs/ref/#state.PluginSpec.filterTransaction) of
plugins) along with the new state.

</dd>

</dl>

##### reconfigure() {#reconfigure}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="reconfigure-1" href="#reconfigure-1">reconfigure</a>(`config`: `object`): [`EditorState`](#editorstate)</code>

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

##### toJSON() {#tojson-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="tojson-3" href="#tojson-3">toJSON</a>(`pluginFields?`: `object`): `any`</code>

</dt>

<dd>

Serialize this state to JSON. If you want to serialize the state
of plugins, pass an object mapping property names to use in the
resulting JSON object to plugin objects. The argument may also be
a string or number, in which case it is ignored, to support the
way `JSON.stringify` calls `toString` methods.

</dd>

</dl>

##### create() {#create}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="create-1" href="#create-1">create</a>(`config`: [`EditorStateConfig`](#editorstateconfig)): [`EditorState`](#editorstate)</code>

</dt>

<dd>

Create a new state.

</dd>

</dl>

##### fromJSON() {#fromjson-2}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="fromjson-3" href="#fromjson-3">fromJSON</a>(`config`: `object`, `json`: `any`, `pluginFields?`: `object`): [`EditorState`](#editorstate)</code>

</dt>

<dd>

Deserialize a JSON representation of a state. `config` should
have at least a `schema` field, and should contain array of
plugins to initialize the state with. `pluginFields` can be used
to deserialize the state of plugins, by associating plugin
instances with the property names they use in the JSON object.

</dd>

</dl>

***

### NodeSelection {#nodeselection}

A node selection is a selection that points at a single node. All
nodes marked [selectable](https://prosemirror.net/docs/ref/#model.NodeSpec.selectable) can be the
target of a node selection. In such a selection, `from` and `to`
point directly before and after the selected node, `anchor` equals
`from`, and `head` equals `to`..

#### Extends

- [`Selection`](#selection-1)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructornodeselection" href="#constructornodeselection">NodeSelection</a>(`$pos`: [`ResolvedPos`](model.md#resolvedpos)): [`NodeSelection`](#nodeselection)</code>

</dt>

<dd>

Create a node selection. Does not verify the validity of its
argument.

###### Overrides

[`Selection`](#selection-1).[`constructor`](#constructor-5)

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="anchor-2" href="#anchor-2">$anchor</a>: [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

The resolved anchor of the selection (the side that stays in
place when the selection is modified).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="head-2" href="#head-2">$head</a>: [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

The resolved head of the selection (the side that moves when
the selection is modified).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="node" href="#node">node</a>: [`ProseMirrorNode`](model.md#prosemirrornode)</code>

</dt>

<dd>

The selected node.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="ranges-1" href="#ranges-1">ranges</a>: readonly [`SelectionRange`](#selectionrange)[]</code>

</dt>

<dd>

The ranges covered by the selection.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="visible-1" href="#visible-1">visible</a>: `boolean`</code>

</dt>

<dd>

Controls whether, when a selection of this type is active in the
browser, the selected range should be visible to the user.
Defaults to `true`.

</dd>

</dl>

#### Accessors

##### $from {#from-2}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="fromfrom-2" href="#fromfrom-2">$from</a>(): [`ResolvedPos`](model.md#resolvedpos)</code>

The resolved lower  bound of the selection's main range.

###### Returns

[`ResolvedPos`](model.md#resolvedpos)

###### Inherited from

[`Selection`](#selection-1).[`$from`](#from-4)

##### $to {#to-2}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="toto-2" href="#toto-2">$to</a>(): [`ResolvedPos`](model.md#resolvedpos)</code>

The resolved upper bound of the selection's main range.

###### Returns

[`ResolvedPos`](model.md#resolvedpos)

###### Inherited from

[`Selection`](#selection-1).[`$to`](#to-4)

##### anchor {#anchor-3}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="anchoranchor-1" href="#anchoranchor-1">anchor</a>(): `number`</code>

The selection's anchor, as an unresolved position.

###### Returns

`number`

###### Inherited from

[`Selection`](#selection-1).[`anchor`](#anchor-5)

##### empty {#empty-1}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="emptyempty-1" href="#emptyempty-1">empty</a>(): `boolean`</code>

Indicates whether the selection contains any content.

###### Returns

`boolean`

###### Inherited from

[`Selection`](#selection-1).[`empty`](#empty-2)

##### from {#from-3}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="fromfrom-3" href="#fromfrom-3">from</a>(): `number`</code>

The lower bound of the selection's main range.

###### Returns

`number`

###### Inherited from

[`Selection`](#selection-1).[`from`](#from-5)

##### head {#head-3}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="headhead-1" href="#headhead-1">head</a>(): `number`</code>

The selection's head.

###### Returns

`number`

###### Inherited from

[`Selection`](#selection-1).[`head`](#head-5)

##### to {#to-3}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="toto-3" href="#toto-3">to</a>(): `number`</code>

The upper bound of the selection's main range.

###### Returns

`number`

###### Inherited from

[`Selection`](#selection-1).[`to`](#to-5)

#### Methods

##### content() {#content-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="content-3" href="#content-3">content</a>(): [`Slice`](model.md#slice-2)</code>

</dt>

<dd>

Get the content of this selection as a slice.

###### Overrides

[`Selection`](#selection-1).[`content`](#content-4)

</dd>

</dl>

##### eq() {#eq-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="eq-3" href="#eq-3">eq</a>(`other`: [`Selection`](#selection-1)): `boolean`</code>

</dt>

<dd>

Test whether the selection is the same as another selection.

###### Overrides

[`Selection`](#selection-1).[`eq`](#eq-4)

</dd>

</dl>

##### getBookmark() {#getbookmark-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="getbookmark-3" href="#getbookmark-3">getBookmark</a>(): [`NodeBookmark`](https://prosemirror.net/docs/ref/#state.NodeBookmark)</code>

</dt>

<dd>

Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
which is a value that can be mapped without having access to a
current document, and later resolved to a real selection for a
given document again. (This is used mostly by the history to
track and restore old selections.) The default implementation of
this method just converts the selection to a text selection and
returns the bookmark for that.

###### Overrides

[`Selection`](#selection-1).[`getBookmark`](#getbookmark-4)

</dd>

</dl>

##### map() {#map-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="map-3" href="#map-3">map</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `mapping`: [`Mappable`](transform.md#mappable)): [`Selection`](#selection-1)</code>

</dt>

<dd>

Map this selection through a [mappable](https://prosemirror.net/docs/ref/#transform.Mappable)
thing. `doc` should be the new document to which we are mapping.

###### Overrides

[`Selection`](#selection-1).[`map`](#map-4)

</dd>

</dl>

##### replace() {#replace-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="replace-3" href="#replace-3">replace</a>(`tr`: [`Transaction`](#transaction), `content?`: [`Slice`](model.md#slice-2)): `void`</code>

</dt>

<dd>

Replace the selection with a slice or, if no slice is given,
delete the selection. Will append to the given transaction.

###### Inherited from

[`Selection`](#selection-1).[`replace`](#replace-4)

</dd>

</dl>

##### replaceWith() {#replacewith-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="replacewith-3" href="#replacewith-3">replaceWith</a>(`tr`: [`Transaction`](#transaction), `node`: [`ProseMirrorNode`](model.md#prosemirrornode)): `void`</code>

</dt>

<dd>

Replace the selection with the given node, appending the changes
to the given transaction.

###### Inherited from

[`Selection`](#selection-1).[`replaceWith`](#replacewith-4)

</dd>

</dl>

##### toJSON() {#tojson-4}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="tojson-5" href="#tojson-5">toJSON</a>(): `any`</code>

</dt>

<dd>

Convert the selection to a JSON representation. When implementing
this for a custom selection class, make sure to give the object a
`type` property whose value matches the ID under which you
[registered](https://prosemirror.net/docs/ref/#state.Selection^jsonID) your class.

###### Overrides

[`Selection`](#selection-1).[`toJSON`](#tojson-6)

</dd>

</dl>

##### atEnd() {#atend-2}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="atend-3" href="#atend-3">atEnd</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`Selection`](#selection-1)</code>

</dt>

<dd>

Find the cursor or leaf node selection closest to the end of the
given document.

###### Inherited from

[`Selection`](#selection-1).[`atEnd`](#atend-4)

</dd>

</dl>

##### atStart() {#atstart-2}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="atstart-3" href="#atstart-3">atStart</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`Selection`](#selection-1)</code>

</dt>

<dd>

Find the cursor or leaf node selection closest to the start of
the given document. Will return an
[`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
exists.

###### Inherited from

[`Selection`](#selection-1).[`atStart`](#atstart-4)

</dd>

</dl>

##### create() {#create-2}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="create-3" href="#create-3">create</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `from`: `number`): [`NodeSelection`](#nodeselection)</code>

</dt>

<dd>

Create a node selection from non-resolved positions.

</dd>

</dl>

##### findFrom() {#findfrom-2}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="findfrom-3" href="#findfrom-3">findFrom</a>(`$pos`: [`ResolvedPos`](model.md#resolvedpos), `dir`: `number`, `textOnly?`: `boolean`): `null` \| [`Selection`](#selection-1)</code>

</dt>

<dd>

Find a valid cursor or leaf node selection starting at the given
position and searching back if `dir` is negative, and forward if
positive. When `textOnly` is true, only consider cursor
selections. Will return null when no valid selection position is
found.

###### Inherited from

[`Selection`](#selection-1).[`findFrom`](#findfrom-4)

</dd>

</dl>

##### fromJSON() {#fromjson-4}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="fromjson-5" href="#fromjson-5">fromJSON</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `json`: `any`): [`Selection`](#selection-1)</code>

</dt>

<dd>

Deserialize the JSON representation of a selection. Must be
implemented for custom classes (as a static class method).

###### Inherited from

[`Selection`](#selection-1).[`fromJSON`](#fromjson-6)

</dd>

</dl>

##### isSelectable() {#isselectable}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="isselectable-1" href="#isselectable-1">isSelectable</a>(`node`: [`ProseMirrorNode`](model.md#prosemirrornode)): `boolean`</code>

</dt>

<dd>

Determines whether the given node may be selected as a node
selection.

</dd>

</dl>

##### jsonID() {#jsonid-2}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="jsonid-3" href="#jsonid-3">jsonID</a>(`id`: `string`, `selectionClass`: `object`): `object`</code>

</dt>

<dd>

To be able to deserialize selections from JSON, custom selection
classes must register themselves with an ID string, so that they
can be disambiguated. Try to pick something that's unlikely to
clash with classes from other modules.

###### Inherited from

[`Selection`](#selection-1).[`jsonID`](#jsonid-4)

</dd>

</dl>

##### near() {#near-2}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="near-3" href="#near-3">near</a>(`$pos`: [`ResolvedPos`](model.md#resolvedpos), `bias?`: `number`): [`Selection`](#selection-1)</code>

</dt>

<dd>

Find a valid cursor or leaf node selection near the given
position. Searches forward first by default, but if `bias` is
negative, it will search backwards first.

###### Inherited from

[`Selection`](#selection-1).[`near`](#near-4)

</dd>

</dl>

***

### PluginKey\<PluginState\> {#pluginkey}

A key is used to [tag](https://prosemirror.net/docs/ref/#state.PluginSpec.key) plugins in a way
that makes it possible to find them, given an editor state.
Assigning a key does mean only one plugin of that type can be
active in a state.

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

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructorpluginkey" href="#constructorpluginkey">PluginKey</a>\<PluginState\>(`name?`: `string`): [`PluginKey`](#pluginkey)\<`PluginState`\></code>

</dt>

<dd>

Create a plugin key.

</dd>

</dl>

#### Methods

##### get() {#get}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="get-1" href="#get-1">get</a>(`state`: [`EditorState`](#editorstate)): `undefined` \| [`ProseMirrorPlugin`](#prosemirrorplugin)\<`PluginState`\></code>

</dt>

<dd>

Get the active plugin with this key, if any, from an editor
state.

</dd>

</dl>

##### getState() {#getstate}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="getstate-1" href="#getstate-1">getState</a>(`state`: [`EditorState`](#editorstate)): `undefined` \| `PluginState`</code>

</dt>

<dd>

Get the plugin's state from an editor state.

</dd>

</dl>

***

### ProseMirrorPlugin\<PluginState\> {#prosemirrorplugin}

Plugins bundle functionality that can be added to an editor.
They are part of the [editor state](https://prosemirror.net/docs/ref/#state.EditorState) and
may influence that state and the view that contains it.

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

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructorprosemirrorplugin" href="#constructorprosemirrorplugin">ProseMirrorPlugin</a>\<PluginState\>(`spec`: [`PluginSpec`](#pluginspec)\<`PluginState`\>): [`ProseMirrorPlugin`](#prosemirrorplugin)\<`PluginState`\></code>

</dt>

<dd>

Create a plugin.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="props" href="#props">props</a>: [`EditorProps`](view.md#editorprops)\<[`ProseMirrorPlugin`](#prosemirrorplugin)\<`PluginState`\>\></code>

</dt>

<dd>

The [props](https://prosemirror.net/docs/ref/#view.EditorProps) exported by this plugin.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="spec" href="#spec">spec</a>: [`PluginSpec`](#pluginspec)\<`PluginState`\></code>

</dt>

<dd>

The plugin's [spec object](https://prosemirror.net/docs/ref/#state.PluginSpec).

</dd>

</dl>

#### Methods

##### getState() {#getstate-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="getstate-3" href="#getstate-3">getState</a>(`state`: [`EditorState`](#editorstate)): `undefined` \| `PluginState`</code>

</dt>

<dd>

Extract the plugin's state field from an editor state.

</dd>

</dl>

***

### abstract Selection {#selection-1}

Superclass for editor selections. Every selection type should
extend this. Should not be instantiated directly.

#### Extended by

- [`AllSelection`](#allselection)
- [`NodeSelection`](#nodeselection)
- [`TextSelection`](#textselection)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructorselection" href="#constructorselection">Selection</a>(`$anchor`: [`ResolvedPos`](model.md#resolvedpos), `$head`: [`ResolvedPos`](model.md#resolvedpos), `ranges?`: readonly [`SelectionRange`](#selectionrange)[]): [`Selection`](#selection-1)</code>

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

<code data-typedoc-declaration><i>readonly</i> <a id="anchor-4" href="#anchor-4">$anchor</a>: [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

The resolved anchor of the selection (the side that stays in
place when the selection is modified).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="head-4" href="#head-4">$head</a>: [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

The resolved head of the selection (the side that moves when
the selection is modified).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="ranges-2" href="#ranges-2">ranges</a>: readonly [`SelectionRange`](#selectionrange)[]</code>

</dt>

<dd>

The ranges covered by the selection.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="visible-2" href="#visible-2">visible</a>: `boolean`</code>

</dt>

<dd>

Controls whether, when a selection of this type is active in the
browser, the selected range should be visible to the user.
Defaults to `true`.

</dd>

</dl>

#### Accessors

##### $from {#from-4}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="fromfrom-4" href="#fromfrom-4">$from</a>(): [`ResolvedPos`](model.md#resolvedpos)</code>

The resolved lower  bound of the selection's main range.

###### Returns

[`ResolvedPos`](model.md#resolvedpos)

##### $to {#to-4}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="toto-4" href="#toto-4">$to</a>(): [`ResolvedPos`](model.md#resolvedpos)</code>

The resolved upper bound of the selection's main range.

###### Returns

[`ResolvedPos`](model.md#resolvedpos)

##### anchor {#anchor-5}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="anchoranchor-2" href="#anchoranchor-2">anchor</a>(): `number`</code>

The selection's anchor, as an unresolved position.

###### Returns

`number`

##### empty {#empty-2}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="emptyempty-2" href="#emptyempty-2">empty</a>(): `boolean`</code>

Indicates whether the selection contains any content.

###### Returns

`boolean`

##### from {#from-5}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="fromfrom-5" href="#fromfrom-5">from</a>(): `number`</code>

The lower bound of the selection's main range.

###### Returns

`number`

##### head {#head-5}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="headhead-2" href="#headhead-2">head</a>(): `number`</code>

The selection's head.

###### Returns

`number`

##### to {#to-5}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="toto-5" href="#toto-5">to</a>(): `number`</code>

The upper bound of the selection's main range.

###### Returns

`number`

#### Methods

##### content() {#content-4}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="content-5" href="#content-5">content</a>(): [`Slice`](model.md#slice-2)</code>

</dt>

<dd>

Get the content of this selection as a slice.

</dd>

</dl>

##### eq() {#eq-4}

<dl>

<dt>

<code data-typedoc-declaration><i>abstract</i> <a id="eq-5" href="#eq-5">eq</a>(`selection`: [`Selection`](#selection-1)): `boolean`</code>

</dt>

<dd>

Test whether the selection is the same as another selection.

</dd>

</dl>

##### getBookmark() {#getbookmark-4}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="getbookmark-5" href="#getbookmark-5">getBookmark</a>(): [`SelectionBookmark`](#selectionbookmark)</code>

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

##### map() {#map-4}

<dl>

<dt>

<code data-typedoc-declaration><i>abstract</i> <a id="map-5" href="#map-5">map</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `mapping`: [`Mappable`](transform.md#mappable)): [`Selection`](#selection-1)</code>

</dt>

<dd>

Map this selection through a [mappable](https://prosemirror.net/docs/ref/#transform.Mappable)
thing. `doc` should be the new document to which we are mapping.

</dd>

</dl>

##### replace() {#replace-4}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="replace-5" href="#replace-5">replace</a>(`tr`: [`Transaction`](#transaction), `content?`: [`Slice`](model.md#slice-2)): `void`</code>

</dt>

<dd>

Replace the selection with a slice or, if no slice is given,
delete the selection. Will append to the given transaction.

</dd>

</dl>

##### replaceWith() {#replacewith-4}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="replacewith-5" href="#replacewith-5">replaceWith</a>(`tr`: [`Transaction`](#transaction), `node`: [`ProseMirrorNode`](model.md#prosemirrornode)): `void`</code>

</dt>

<dd>

Replace the selection with the given node, appending the changes
to the given transaction.

</dd>

</dl>

##### toJSON() {#tojson-6}

<dl>

<dt>

<code data-typedoc-declaration><i>abstract</i> <a id="tojson-7" href="#tojson-7">toJSON</a>(): `any`</code>

</dt>

<dd>

Convert the selection to a JSON representation. When implementing
this for a custom selection class, make sure to give the object a
`type` property whose value matches the ID under which you
[registered](https://prosemirror.net/docs/ref/#state.Selection^jsonID) your class.

</dd>

</dl>

##### atEnd() {#atend-4}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="atend-5" href="#atend-5">atEnd</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`Selection`](#selection-1)</code>

</dt>

<dd>

Find the cursor or leaf node selection closest to the end of the
given document.

</dd>

</dl>

##### atStart() {#atstart-4}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="atstart-5" href="#atstart-5">atStart</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`Selection`](#selection-1)</code>

</dt>

<dd>

Find the cursor or leaf node selection closest to the start of
the given document. Will return an
[`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
exists.

</dd>

</dl>

##### findFrom() {#findfrom-4}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="findfrom-5" href="#findfrom-5">findFrom</a>(`$pos`: [`ResolvedPos`](model.md#resolvedpos), `dir`: `number`, `textOnly?`: `boolean`): `null` \| [`Selection`](#selection-1)</code>

</dt>

<dd>

Find a valid cursor or leaf node selection starting at the given
position and searching back if `dir` is negative, and forward if
positive. When `textOnly` is true, only consider cursor
selections. Will return null when no valid selection position is
found.

</dd>

</dl>

##### fromJSON() {#fromjson-6}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="fromjson-7" href="#fromjson-7">fromJSON</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `json`: `any`): [`Selection`](#selection-1)</code>

</dt>

<dd>

Deserialize the JSON representation of a selection. Must be
implemented for custom classes (as a static class method).

</dd>

</dl>

##### jsonID() {#jsonid-4}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="jsonid-5" href="#jsonid-5">jsonID</a>(`id`: `string`, `selectionClass`: `object`): `object`</code>

</dt>

<dd>

To be able to deserialize selections from JSON, custom selection
classes must register themselves with an ID string, so that they
can be disambiguated. Try to pick something that's unlikely to
clash with classes from other modules.

</dd>

</dl>

##### near() {#near-4}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="near-5" href="#near-5">near</a>(`$pos`: [`ResolvedPos`](model.md#resolvedpos), `bias?`: `number`): [`Selection`](#selection-1)</code>

</dt>

<dd>

Find a valid cursor or leaf node selection near the given
position. Searches forward first by default, but if `bias` is
negative, it will search backwards first.

</dd>

</dl>

***

### SelectionRange {#selectionrange}

Represents a selected range in a document.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructorselectionrange" href="#constructorselectionrange">SelectionRange</a>(`$from`: [`ResolvedPos`](model.md#resolvedpos), `$to`: [`ResolvedPos`](model.md#resolvedpos)): [`SelectionRange`](#selectionrange)</code>

</dt>

<dd>

Create a range.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="from-6" href="#from-6">$from</a>: [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

The lower bound of the range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="to-6" href="#to-6">$to</a>: [`ResolvedPos`](model.md#resolvedpos)</code>

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

#### Extends

- [`Selection`](#selection-1)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructortextselection" href="#constructortextselection">TextSelection</a>(`$anchor`: [`ResolvedPos`](model.md#resolvedpos), `$head?`: [`ResolvedPos`](model.md#resolvedpos)): [`TextSelection`](#textselection)</code>

</dt>

<dd>

Construct a text selection between the given points.

###### Overrides

[`Selection`](#selection-1).[`constructor`](#constructor-5)

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="anchor-6" href="#anchor-6">$anchor</a>: [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

The resolved anchor of the selection (the side that stays in
place when the selection is modified).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="head-6" href="#head-6">$head</a>: [`ResolvedPos`](model.md#resolvedpos)</code>

</dt>

<dd>

The resolved head of the selection (the side that moves when
the selection is modified).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="ranges-3" href="#ranges-3">ranges</a>: readonly [`SelectionRange`](#selectionrange)[]</code>

</dt>

<dd>

The ranges covered by the selection.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="visible-3" href="#visible-3">visible</a>: `boolean`</code>

</dt>

<dd>

Controls whether, when a selection of this type is active in the
browser, the selected range should be visible to the user.
Defaults to `true`.

</dd>

</dl>

#### Accessors

##### $cursor {#cursor}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="cursorcursor" href="#cursorcursor">$cursor</a>(): `null` \| [`ResolvedPos`](model.md#resolvedpos)</code>

Returns a resolved position if this is a cursor selection (an
empty text selection), and null otherwise.

###### Returns

`null` \| [`ResolvedPos`](model.md#resolvedpos)

##### $from {#from-7}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="fromfrom-6" href="#fromfrom-6">$from</a>(): [`ResolvedPos`](model.md#resolvedpos)</code>

The resolved lower  bound of the selection's main range.

###### Returns

[`ResolvedPos`](model.md#resolvedpos)

###### Inherited from

[`Selection`](#selection-1).[`$from`](#from-4)

##### $to {#to-7}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="toto-6" href="#toto-6">$to</a>(): [`ResolvedPos`](model.md#resolvedpos)</code>

The resolved upper bound of the selection's main range.

###### Returns

[`ResolvedPos`](model.md#resolvedpos)

###### Inherited from

[`Selection`](#selection-1).[`$to`](#to-4)

##### anchor {#anchor-7}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="anchoranchor-3" href="#anchoranchor-3">anchor</a>(): `number`</code>

The selection's anchor, as an unresolved position.

###### Returns

`number`

###### Inherited from

[`Selection`](#selection-1).[`anchor`](#anchor-5)

##### empty {#empty-3}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="emptyempty-3" href="#emptyempty-3">empty</a>(): `boolean`</code>

Indicates whether the selection contains any content.

###### Returns

`boolean`

###### Inherited from

[`Selection`](#selection-1).[`empty`](#empty-2)

##### from {#from-8}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="fromfrom-7" href="#fromfrom-7">from</a>(): `number`</code>

The lower bound of the selection's main range.

###### Returns

`number`

###### Inherited from

[`Selection`](#selection-1).[`from`](#from-5)

##### head {#head-7}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="headhead-3" href="#headhead-3">head</a>(): `number`</code>

The selection's head.

###### Returns

`number`

###### Inherited from

[`Selection`](#selection-1).[`head`](#head-5)

##### to {#to-8}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="toto-7" href="#toto-7">to</a>(): `number`</code>

The upper bound of the selection's main range.

###### Returns

`number`

###### Inherited from

[`Selection`](#selection-1).[`to`](#to-5)

#### Methods

##### content() {#content-6}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="content-7" href="#content-7">content</a>(): [`Slice`](model.md#slice-2)</code>

</dt>

<dd>

Get the content of this selection as a slice.

###### Inherited from

[`Selection`](#selection-1).[`content`](#content-4)

</dd>

</dl>

##### eq() {#eq-6}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="eq-7" href="#eq-7">eq</a>(`other`: [`Selection`](#selection-1)): `boolean`</code>

</dt>

<dd>

Test whether the selection is the same as another selection.

###### Overrides

[`Selection`](#selection-1).[`eq`](#eq-4)

</dd>

</dl>

##### getBookmark() {#getbookmark-6}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="getbookmark-7" href="#getbookmark-7">getBookmark</a>(): [`TextBookmark`](https://prosemirror.net/docs/ref/#state.TextBookmark)</code>

</dt>

<dd>

Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
which is a value that can be mapped without having access to a
current document, and later resolved to a real selection for a
given document again. (This is used mostly by the history to
track and restore old selections.) The default implementation of
this method just converts the selection to a text selection and
returns the bookmark for that.

###### Overrides

[`Selection`](#selection-1).[`getBookmark`](#getbookmark-4)

</dd>

</dl>

##### map() {#map-6}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="map-7" href="#map-7">map</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `mapping`: [`Mappable`](transform.md#mappable)): [`Selection`](#selection-1)</code>

</dt>

<dd>

Map this selection through a [mappable](https://prosemirror.net/docs/ref/#transform.Mappable)
thing. `doc` should be the new document to which we are mapping.

###### Overrides

[`Selection`](#selection-1).[`map`](#map-4)

</dd>

</dl>

##### replace() {#replace-6}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="replace-7" href="#replace-7">replace</a>(`tr`: [`Transaction`](#transaction), `content?`: [`Slice`](model.md#slice-2)): `void`</code>

</dt>

<dd>

Replace the selection with a slice or, if no slice is given,
delete the selection. Will append to the given transaction.

###### Overrides

[`Selection`](#selection-1).[`replace`](#replace-4)

</dd>

</dl>

##### replaceWith() {#replacewith-6}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="replacewith-7" href="#replacewith-7">replaceWith</a>(`tr`: [`Transaction`](#transaction), `node`: [`ProseMirrorNode`](model.md#prosemirrornode)): `void`</code>

</dt>

<dd>

Replace the selection with the given node, appending the changes
to the given transaction.

###### Inherited from

[`Selection`](#selection-1).[`replaceWith`](#replacewith-4)

</dd>

</dl>

##### toJSON() {#tojson-8}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="tojson-9" href="#tojson-9">toJSON</a>(): `any`</code>

</dt>

<dd>

Convert the selection to a JSON representation. When implementing
this for a custom selection class, make sure to give the object a
`type` property whose value matches the ID under which you
[registered](https://prosemirror.net/docs/ref/#state.Selection^jsonID) your class.

###### Overrides

[`Selection`](#selection-1).[`toJSON`](#tojson-6)

</dd>

</dl>

##### atEnd() {#atend-6}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="atend-7" href="#atend-7">atEnd</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`Selection`](#selection-1)</code>

</dt>

<dd>

Find the cursor or leaf node selection closest to the end of the
given document.

###### Inherited from

[`Selection`](#selection-1).[`atEnd`](#atend-4)

</dd>

</dl>

##### atStart() {#atstart-6}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="atstart-7" href="#atstart-7">atStart</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`Selection`](#selection-1)</code>

</dt>

<dd>

Find the cursor or leaf node selection closest to the start of
the given document. Will return an
[`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
exists.

###### Inherited from

[`Selection`](#selection-1).[`atStart`](#atstart-4)

</dd>

</dl>

##### between() {#between}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="between-1" href="#between-1">between</a>(`$anchor`: [`ResolvedPos`](model.md#resolvedpos), `$head`: [`ResolvedPos`](model.md#resolvedpos), `bias?`: `number`): [`Selection`](#selection-1)</code>

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

##### create() {#create-4}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="create-5" href="#create-5">create</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `anchor`: `number`, `head?`: `number`): [`TextSelection`](#textselection)</code>

</dt>

<dd>

Create a text selection from non-resolved positions.

</dd>

</dl>

##### findFrom() {#findfrom-6}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="findfrom-7" href="#findfrom-7">findFrom</a>(`$pos`: [`ResolvedPos`](model.md#resolvedpos), `dir`: `number`, `textOnly?`: `boolean`): `null` \| [`Selection`](#selection-1)</code>

</dt>

<dd>

Find a valid cursor or leaf node selection starting at the given
position and searching back if `dir` is negative, and forward if
positive. When `textOnly` is true, only consider cursor
selections. Will return null when no valid selection position is
found.

###### Inherited from

[`Selection`](#selection-1).[`findFrom`](#findfrom-4)

</dd>

</dl>

##### fromJSON() {#fromjson-8}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="fromjson-9" href="#fromjson-9">fromJSON</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `json`: `any`): [`Selection`](#selection-1)</code>

</dt>

<dd>

Deserialize the JSON representation of a selection. Must be
implemented for custom classes (as a static class method).

###### Inherited from

[`Selection`](#selection-1).[`fromJSON`](#fromjson-6)

</dd>

</dl>

##### jsonID() {#jsonid-6}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="jsonid-7" href="#jsonid-7">jsonID</a>(`id`: `string`, `selectionClass`: `object`): `object`</code>

</dt>

<dd>

To be able to deserialize selections from JSON, custom selection
classes must register themselves with an ID string, so that they
can be disambiguated. Try to pick something that's unlikely to
clash with classes from other modules.

###### Inherited from

[`Selection`](#selection-1).[`jsonID`](#jsonid-4)

</dd>

</dl>

##### near() {#near-6}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="near-7" href="#near-7">near</a>(`$pos`: [`ResolvedPos`](model.md#resolvedpos), `bias?`: `number`): [`Selection`](#selection-1)</code>

</dt>

<dd>

Find a valid cursor or leaf node selection near the given
position. Searches forward first by default, but if `bias` is
negative, it will search backwards first.

###### Inherited from

[`Selection`](#selection-1).[`near`](#near-4)

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

#### Extends

- [`Transform`](transform.md#transform)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructortransaction" href="#constructortransaction">Transaction</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`Transaction`](#transaction)</code>

</dt>

<dd>

Create a transform that starts with the given document.

###### Inherited from

[`Transform`](transform.md#transform).[`constructor`](transform.md#transform#constructor-13)

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="doc-1" href="#doc-1">doc</a>: [`ProseMirrorNode`](model.md#prosemirrornode)</code>

</dt>

<dd>

The current document (the result of applying the steps in the
transform).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="docs" href="#docs">docs</a>: [`ProseMirrorNode`](model.md#prosemirrornode)[]</code>

</dt>

<dd>

The documents before each of the steps.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="mapping" href="#mapping">mapping</a>: [`Mapping`](transform.md#mapping)</code>

</dt>

<dd>

A mapping with the maps for each of the steps in this transform.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="steps" href="#steps">steps</a>: [`Step`](transform.md#step)[]</code>

</dt>

<dd>

The steps in this transform.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="storedmarks-1" href="#storedmarks-1">storedMarks</a>: `null` \| readonly [`Mark`](model.md#mark)[]</code>

</dt>

<dd>

The stored marks set by this transaction, if any.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="time" href="#time">time</a>: `number`</code>

</dt>

<dd>

The timestamp associated with this transaction, in the same
format as `Date.now()`.

</dd>

</dl>

#### Accessors

##### before {#before}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="beforebefore" href="#beforebefore">before</a>(): [`ProseMirrorNode`](model.md#prosemirrornode)</code>

The starting document.

###### Returns

[`ProseMirrorNode`](model.md#prosemirrornode)

###### Inherited from

[`Transform`](transform.md#transform).[`before`](transform.md#transform#before)

##### docChanged {#docchanged}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="docchangeddocchanged" href="#docchangeddocchanged">docChanged</a>(): `boolean`</code>

True when the document has been changed (when there are any
steps).

###### Returns

`boolean`

###### Inherited from

[`Transform`](transform.md#transform).[`docChanged`](transform.md#transform#docchanged)

##### isGeneric {#isgeneric}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="isgenericisgeneric" href="#isgenericisgeneric">isGeneric</a>(): `boolean`</code>

Returns true if this transaction doesn't contain any metadata,
and can thus safely be extended.

###### Returns

`boolean`

##### scrolledIntoView {#scrolledintoview}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="scrolledintoviewscrolledintoview" href="#scrolledintoviewscrolledintoview">scrolledIntoView</a>(): `boolean`</code>

True when this transaction has had `scrollIntoView` called on it.

###### Returns

`boolean`

##### selection {#selection-2}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="selectionselection" href="#selectionselection">selection</a>(): [`Selection`](#selection-1)</code>

The transaction's current selection. This defaults to the editor
selection [mapped](https://prosemirror.net/docs/ref/#state.Selection.map) through the steps in the
transaction, but can be overwritten with
[`setSelection`](https://prosemirror.net/docs/ref/#state.Transaction.setSelection).

###### Returns

[`Selection`](#selection-1)

##### selectionSet {#selectionset}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="selectionsetselectionset" href="#selectionsetselectionset">selectionSet</a>(): `boolean`</code>

Whether the selection was explicitly updated by this transaction.

###### Returns

`boolean`

##### storedMarksSet {#storedmarksset}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="storedmarkssetstoredmarksset" href="#storedmarkssetstoredmarksset">storedMarksSet</a>(): `boolean`</code>

Whether the stored marks were explicitly set for this transaction.

###### Returns

`boolean`

#### Methods

##### addMark() {#addmark}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="addmark-1" href="#addmark-1">addMark</a>(`from`: `number`, `to`: `number`, `mark`: [`Mark`](model.md#mark)): `this`</code>

</dt>

<dd>

Add the given mark to the inline content between `from` and `to`.

###### Inherited from

[`Transform`](transform.md#transform).[`addMark`](transform.md#transform#addmark)

</dd>

</dl>

##### addNodeMark() {#addnodemark}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="addnodemark-1" href="#addnodemark-1">addNodeMark</a>(`pos`: `number`, `mark`: [`Mark`](model.md#mark)): `this`</code>

</dt>

<dd>

Add a mark to the node at position `pos`.

###### Inherited from

[`Transform`](transform.md#transform).[`addNodeMark`](transform.md#transform#addnodemark)

</dd>

</dl>

##### addStoredMark() {#addstoredmark}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="addstoredmark-1" href="#addstoredmark-1">addStoredMark</a>(`mark`: [`Mark`](model.md#mark)): `this`</code>

</dt>

<dd>

Add a mark to the set of stored marks.

</dd>

</dl>

##### clearIncompatible() {#clearincompatible}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="clearincompatible-1" href="#clearincompatible-1">clearIncompatible</a>(`pos`: `number`, `parentType`: [`NodeType`](model.md#nodetype), `match?`: [`ContentMatch`](model.md#contentmatch)): `this`</code>

</dt>

<dd>

Removes all marks and nodes from the content of the node at
`pos` that don't match the given new parent node type. Accepts
an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
third argument.

###### Inherited from

[`Transform`](transform.md#transform).[`clearIncompatible`](transform.md#transform#clearincompatible)

</dd>

</dl>

##### delete() {#delete}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="delete-1" href="#delete-1">delete</a>(`from`: `number`, `to`: `number`): `this`</code>

</dt>

<dd>

Delete the content between the given positions.

###### Inherited from

[`Transform`](transform.md#transform).[`delete`](transform.md#transform#delete)

</dd>

</dl>

##### deleteRange() {#deleterange}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="deleterange-1" href="#deleterange-1">deleteRange</a>(`from`: `number`, `to`: `number`): `this`</code>

</dt>

<dd>

Delete the given range, expanding it to cover fully covered
parent nodes until a valid replace is found.

###### Inherited from

[`Transform`](transform.md#transform).[`deleteRange`](transform.md#transform#deleterange)

</dd>

</dl>

##### deleteSelection() {#deleteselection}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="deleteselection-1" href="#deleteselection-1">deleteSelection</a>(): `this`</code>

</dt>

<dd>

Delete the selection.

</dd>

</dl>

##### ensureMarks() {#ensuremarks}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="ensuremarks-1" href="#ensuremarks-1">ensureMarks</a>(`marks`: readonly [`Mark`](model.md#mark)[]): `this`</code>

</dt>

<dd>

Make sure the current stored marks or, if that is null, the marks
at the selection, match the given set of marks. Does nothing if
this is already the case.

</dd>

</dl>

##### getMeta() {#getmeta}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="getmeta-1" href="#getmeta-1">getMeta</a>(`key`: `string` \| [`ProseMirrorPlugin`](#prosemirrorplugin)\<`any`\> \| [`PluginKey`](#pluginkey)\<`any`\>): `any`</code>

</dt>

<dd>

Retrieve a metadata property for a given name or plugin.

</dd>

</dl>

##### insert() {#insert}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="insert-1" href="#insert-1">insert</a>(`pos`: `number`, `content`: [`ProseMirrorNode`](model.md#prosemirrornode) \| [`ProseMirrorFragment`](model.md#prosemirrorfragment) \| readonly [`ProseMirrorNode`](model.md#prosemirrornode)[]): `this`</code>

</dt>

<dd>

Insert the given content at the given position.

###### Inherited from

[`Transform`](transform.md#transform).[`insert`](transform.md#transform#insert-1)

</dd>

</dl>

##### insertText() {#inserttext}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="inserttext-1" href="#inserttext-1">insertText</a>(`text`: `string`, `from?`: `number`, `to?`: `number`): `this`</code>

</dt>

<dd>

Replace the given range, or the selection if no range is given,
with a text node containing the given string.

</dd>

</dl>

##### join() {#join}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="join-1" href="#join-1">join</a>(`pos`: `number`, `depth?`: `number`): `this`</code>

</dt>

<dd>

Join the blocks around the given position. If depth is 2, their
last and first siblings are also joined, and so on.

###### Inherited from

[`Transform`](transform.md#transform).[`join`](transform.md#transform#join)

</dd>

</dl>

##### lift() {#lift}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="lift-1" href="#lift-1">lift</a>(`range`: [`NodeRange`](model.md#noderange), `target`: `number`): `this`</code>

</dt>

<dd>

Split the content in the given range off from its parent, if there
is sibling content before or after it, and move it up the tree to
the depth specified by `target`. You'll probably want to use
[`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
sure the lift is valid.

###### Inherited from

[`Transform`](transform.md#transform).[`lift`](transform.md#transform#lift)

</dd>

</dl>

##### maybeStep() {#maybestep}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="maybestep-1" href="#maybestep-1">maybeStep</a>(`step`: [`Step`](transform.md#step)): [`StepResult`](transform.md#stepresult)</code>

</dt>

<dd>

Try to apply a step in this transformation, ignoring it if it
fails. Returns the step result.

###### Inherited from

[`Transform`](transform.md#transform).[`maybeStep`](transform.md#transform#maybestep)

</dd>

</dl>

##### removeMark() {#removemark}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="removemark-1" href="#removemark-1">removeMark</a>(`from`: `number`, `to`: `number`, `mark?`: `null` \| [`MarkType`](model.md#marktype-1) \| [`Mark`](model.md#mark)): `this`</code>

</dt>

<dd>

Remove marks from inline nodes between `from` and `to`. When
`mark` is a single mark, remove precisely that mark. When it is
a mark type, remove all marks of that type. When it is null,
remove all marks of any type.

###### Inherited from

[`Transform`](transform.md#transform).[`removeMark`](transform.md#transform#removemark)

</dd>

</dl>

##### removeNodeMark() {#removenodemark}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="removenodemark-1" href="#removenodemark-1">removeNodeMark</a>(`pos`: `number`, `mark`: [`MarkType`](model.md#marktype-1) \| [`Mark`](model.md#mark)): `this`</code>

</dt>

<dd>

Remove a mark (or all marks of the given type) from the node at
position `pos`.

###### Inherited from

[`Transform`](transform.md#transform).[`removeNodeMark`](transform.md#transform#removenodemark)

</dd>

</dl>

##### removeStoredMark() {#removestoredmark}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="removestoredmark-1" href="#removestoredmark-1">removeStoredMark</a>(`mark`: [`MarkType`](model.md#marktype-1) \| [`Mark`](model.md#mark)): `this`</code>

</dt>

<dd>

Remove a mark or mark type from the set of stored marks.

</dd>

</dl>

##### replace() {#replace-8}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="replace-9" href="#replace-9">replace</a>(`from`: `number`, `to?`: `number`, `slice?`: [`Slice`](model.md#slice-2)): `this`</code>

</dt>

<dd>

Replace the part of the document between `from` and `to` with the
given `slice`.

###### Inherited from

[`Transform`](transform.md#transform).[`replace`](transform.md#transform#replace)

</dd>

</dl>

##### replaceRange() {#replacerange}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="replacerange-1" href="#replacerange-1">replaceRange</a>(`from`: `number`, `to`: `number`, `slice`: [`Slice`](model.md#slice-2)): `this`</code>

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

###### Inherited from

[`Transform`](transform.md#transform).[`replaceRange`](transform.md#transform#replacerange)

</dd>

</dl>

##### replaceRangeWith() {#replacerangewith}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="replacerangewith-1" href="#replacerangewith-1">replaceRangeWith</a>(`from`: `number`, `to`: `number`, `node`: [`ProseMirrorNode`](model.md#prosemirrornode)): `this`</code>

</dt>

<dd>

Replace the given range with a node, but use `from` and `to` as
hints, rather than precise positions. When from and to are the same
and are at the start or end of a parent node in which the given
node doesn't fit, this method may _move_ them out towards a parent
that does allow the given node to be placed. When the given range
completely covers a parent node, this method may completely replace
that parent node.

###### Inherited from

[`Transform`](transform.md#transform).[`replaceRangeWith`](transform.md#transform#replacerangewith)

</dd>

</dl>

##### replaceSelection() {#replaceselection}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="replaceselection-1" href="#replaceselection-1">replaceSelection</a>(`slice`: [`Slice`](model.md#slice-2)): `this`</code>

</dt>

<dd>

Replace the current selection with the given slice.

</dd>

</dl>

##### replaceSelectionWith() {#replaceselectionwith}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="replaceselectionwith-1" href="#replaceselectionwith-1">replaceSelectionWith</a>(`node`: [`ProseMirrorNode`](model.md#prosemirrornode), `inheritMarks?`: `boolean`): `this`</code>

</dt>

<dd>

Replace the selection with the given node. When `inheritMarks` is
true and the content is inline, it inherits the marks from the
place where it is inserted.

</dd>

</dl>

##### replaceWith() {#replacewith-8}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="replacewith-9" href="#replacewith-9">replaceWith</a>(`from`: `number`, `to`: `number`, `content`: [`ProseMirrorNode`](model.md#prosemirrornode) \| [`ProseMirrorFragment`](model.md#prosemirrorfragment) \| readonly [`ProseMirrorNode`](model.md#prosemirrornode)[]): `this`</code>

</dt>

<dd>

Replace the given range with the given content, which may be a
fragment, node, or array of nodes.

###### Inherited from

[`Transform`](transform.md#transform).[`replaceWith`](transform.md#transform#replacewith)

</dd>

</dl>

##### scrollIntoView() {#scrollintoview}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="scrollintoview-1" href="#scrollintoview-1">scrollIntoView</a>(): `this`</code>

</dt>

<dd>

Indicate that the editor should scroll the selection into view
when updated to the state produced by this transaction.

</dd>

</dl>

##### setBlockType() {#setblocktype}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="setblocktype-1" href="#setblocktype-1">setBlockType</a>(`from`: `number`, `to`: `undefined` \| `number`, `type`: [`NodeType`](model.md#nodetype), `attrs?`: `null` \| [`Attrs`](model.md#attrs-7) \| (`oldNode`: [`ProseMirrorNode`](model.md#prosemirrornode)) => [`Attrs`](model.md#attrs-7)): `this`</code>

</dt>

<dd>

Set the type of all textblocks (partly) between `from` and `to` to
the given node type with the given attributes.

###### Inherited from

[`Transform`](transform.md#transform).[`setBlockType`](transform.md#transform#setblocktype)

</dd>

</dl>

##### setDocAttribute() {#setdocattribute}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="setdocattribute-1" href="#setdocattribute-1">setDocAttribute</a>(`attr`: `string`, `value`: `any`): `this`</code>

</dt>

<dd>

Set a single attribute on the document to a new value.

###### Inherited from

[`Transform`](transform.md#transform).[`setDocAttribute`](transform.md#transform#setdocattribute)

</dd>

</dl>

##### setMeta() {#setmeta}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="setmeta-1" href="#setmeta-1">setMeta</a>(`key`: `string` \| [`ProseMirrorPlugin`](#prosemirrorplugin)\<`any`\> \| [`PluginKey`](#pluginkey)\<`any`\>, `value`: `any`): `this`</code>

</dt>

<dd>

Store a metadata property in this transaction, keyed either by
name or by plugin.

</dd>

</dl>

##### setNodeAttribute() {#setnodeattribute}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="setnodeattribute-1" href="#setnodeattribute-1">setNodeAttribute</a>(`pos`: `number`, `attr`: `string`, `value`: `any`): `this`</code>

</dt>

<dd>

Set a single attribute on a given node to a new value.
The `pos` addresses the document content. Use `setDocAttribute`
to set attributes on the document itself.

###### Inherited from

[`Transform`](transform.md#transform).[`setNodeAttribute`](transform.md#transform#setnodeattribute)

</dd>

</dl>

##### setNodeMarkup() {#setnodemarkup}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="setnodemarkup-1" href="#setnodemarkup-1">setNodeMarkup</a>(`pos`: `number`, `type?`: `null` \| [`NodeType`](model.md#nodetype), `attrs?`: `null` \| [`Attrs`](model.md#attrs-7), `marks?`: readonly [`Mark`](model.md#mark)[]): `this`</code>

</dt>

<dd>

Change the type, attributes, and/or marks of the node at `pos`.
When `type` isn't given, the existing node type is preserved,

###### Inherited from

[`Transform`](transform.md#transform).[`setNodeMarkup`](transform.md#transform#setnodemarkup)

</dd>

</dl>

##### setSelection() {#setselection}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="setselection-1" href="#setselection-1">setSelection</a>(`selection`: [`Selection`](#selection-1)): `this`</code>

</dt>

<dd>

Update the transaction's current selection. Will determine the
selection that the editor gets when the transaction is applied.

</dd>

</dl>

##### setStoredMarks() {#setstoredmarks}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="setstoredmarks-1" href="#setstoredmarks-1">setStoredMarks</a>(`marks`: `null` \| readonly [`Mark`](model.md#mark)[]): `this`</code>

</dt>

<dd>

Set the current stored marks.

</dd>

</dl>

##### setTime() {#settime}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="settime-1" href="#settime-1">setTime</a>(`time`: `number`): `this`</code>

</dt>

<dd>

Update the timestamp for the transaction.

</dd>

</dl>

##### split() {#split}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="split-1" href="#split-1">split</a>(`pos`: `number`, `depth?`: `number`, `typesAfter?`: (`null` \| \{ `attrs?`: `null` \| [`Attrs`](model.md#attrs-7); `type`: [`NodeType`](model.md#nodetype); \})[]): `this`</code>

</dt>

<dd>

Split the node at the given position, and optionally, if `depth` is
greater than one, any number of nodes above that. By default, the
parts split off will inherit the node type of the original node.
This can be changed by passing an array of types and attributes to
use after the split (with the outermost nodes coming first).

###### Inherited from

[`Transform`](transform.md#transform).[`split`](transform.md#transform#split)

</dd>

</dl>

##### step() {#step}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="step-1" href="#step-1">step</a>(`step`: [`Step`](transform.md#step)): `this`</code>

</dt>

<dd>

Apply a new step in this transform, saving the result. Throws an
error when the step fails.

###### Inherited from

[`Transform`](transform.md#transform).[`step`](transform.md#transform#step-1)

</dd>

</dl>

##### wrap() {#wrap}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="wrap-1" href="#wrap-1">wrap</a>(`range`: [`NodeRange`](model.md#noderange), `wrappers`: readonly `object`[]): `this`</code>

</dt>

<dd>

Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
The wrappers are assumed to be valid in this position, and should
probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).

###### Inherited from

[`Transform`](transform.md#transform).[`wrap`](transform.md#transform#wrap)

</dd>

</dl>

## Interfaces

### EditorStateConfig {#editorstateconfig}

The type of object passed to
[`EditorState.create`](https://prosemirror.net/docs/ref/#state.EditorState^create).

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="doc-2" href="#doc-2">doc</a><i>?</i>: [`ProseMirrorNode`](model.md#prosemirrornode)</code>

</dt>

<dd>

The starting document. Either this or `schema` _must_ be
provided.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="plugins-1" href="#plugins-1">plugins</a><i>?</i>: readonly [`ProseMirrorPlugin`](#prosemirrorplugin)\<`any`\>[]</code>

</dt>

<dd>

The plugins that should be active in this state.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="schema-1" href="#schema-1">schema</a><i>?</i>: [`Schema`](model.md#schema-3)\<`any`, `any`\></code>

</dt>

<dd>

The schema to use (only relevant if no `doc` is specified).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="selection-3" href="#selection-3">selection</a><i>?</i>: [`Selection`](#selection-1)</code>

</dt>

<dd>

A valid selection in the document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="storedmarks-2" href="#storedmarks-2">storedMarks</a><i>?</i>: `null` \| readonly [`Mark`](model.md#mark)[]</code>

</dt>

<dd>

The initial set of [stored marks](https://prosemirror.net/docs/ref/#state.EditorState.storedMarks).

</dd>

</dl>

***

### PluginSpec\<PluginState\> {#pluginspec}

This is the type passed to the [`Plugin`](https://prosemirror.net/docs/ref/#state.Plugin)
constructor. It provides a definition for a plugin.

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

#### Indexable

\[`key`: `string`\]: `any`

Additional properties are allowed on plugin specs, which can be
read via [`Plugin.spec`](https://prosemirror.net/docs/ref/#state.Plugin.spec).

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="appendtransaction" href="#appendtransaction">appendTransaction</a><i>?</i>: (`transactions`: readonly [`Transaction`](#transaction)[], `oldState`: [`EditorState`](#editorstate), `newState`: [`EditorState`](#editorstate)) => `undefined` \| `null` \| [`Transaction`](#transaction)</code>

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

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="filtertransaction" href="#filtertransaction">filterTransaction</a><i>?</i>: (`tr`: [`Transaction`](#transaction), `state`: [`EditorState`](#editorstate)) => `boolean`</code>

</dt>

<dd>

When present, this will be called before a transaction is
applied by the state, allowing the plugin to cancel it (by
returning false).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="key" href="#key">key</a><i>?</i>: [`PluginKey`](#pluginkey)\<`any`\></code>

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

<code data-typedoc-declaration><i></i> <a id="props-1" href="#props-1">props</a><i>?</i>: [`EditorProps`](view.md#editorprops)\<[`ProseMirrorPlugin`](#prosemirrorplugin)\<`PluginState`\>\></code>

</dt>

<dd>

The [view props](https://prosemirror.net/docs/ref/#view.EditorProps) added by this plugin. Props
that are functions will be bound to have the plugin instance as
their `this` binding.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="state" href="#state">state</a><i>?</i>: [`StateField`](#statefield)\<`PluginState`\></code>

</dt>

<dd>

Allows a plugin to define a [state field](https://prosemirror.net/docs/ref/#state.StateField), an
extra slot in the state object in which it can keep its own data.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="view" href="#view">view</a><i>?</i>: (`view`: [`EditorView`](view.md#editorview)) => [`PluginView`](#pluginview)</code>

</dt>

<dd>

When the plugin needs to interact with the editor view, or
set something up in the DOM, use this field. The function
will be called when the plugin's state is associated with an
editor view.

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

<code data-typedoc-declaration><i></i> <a id="map-8" href="#map-8">map</a>: (`mapping`: [`Mappable`](transform.md#mappable)) => [`SelectionBookmark`](#selectionbookmark)</code>

</dt>

<dd>

Map the bookmark through a set of changes.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="resolve" href="#resolve">resolve</a>: (`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)) => [`Selection`](#selection-1)</code>

</dt>

<dd>

Resolve the bookmark to a real selection again. This may need to
do some error checking and may fall back to a default (usually
[`TextSelection.between`](https://prosemirror.net/docs/ref/#state.TextSelection^between)) if
mapping made the bookmark invalid.

</dd>

</dl>

***

### StateField\<T\> {#statefield}

A plugin spec may provide a state field (under its
[`state`](https://prosemirror.net/docs/ref/#state.PluginSpec.state) property) of this type, which
describes the state it wants to keep. Functions provided here are
always called with the plugin instance as their `this` binding.

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

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="apply-2" href="#apply-2">apply</a>: (`tr`: [`Transaction`](#transaction), `value`: `T`, `oldState`: [`EditorState`](#editorstate), `newState`: [`EditorState`](#editorstate)) => `T`</code>

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

<code data-typedoc-declaration><i></i> <a id="fromjson-10" href="#fromjson-10">fromJSON</a><i>?</i>: (`config`: [`EditorStateConfig`](#editorstateconfig), `value`: `any`, `state`: [`EditorState`](#editorstate)) => `T`</code>

</dt>

<dd>

Deserialize the JSON representation of this field. Note that the
`state` argument is again a half-initialized state.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="init" href="#init">init</a>: (`config`: [`EditorStateConfig`](#editorstateconfig), `instance`: [`EditorState`](#editorstate)) => `T`</code>

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

<code data-typedoc-declaration><i></i> <a id="tojson-10" href="#tojson-10">toJSON</a><i>?</i>: (`value`: `T`) => `any`</code>

</dt>

<dd>

Convert this field to JSON. Optional, can be left off to disable
JSON serialization for the field.

</dd>

</dl>

## Type Aliases

### Command() {#command}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="command" href="#command">Command</a> = (`state`: [`EditorState`](#editorstate), `dispatch?`: (`tr`: [`Transaction`](#transaction)) => `void`, `view?`: [`EditorView`](view.md#editorview)) => `boolean`</code>

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

***

### PluginView {#pluginview}

<code data-typedoc-declaration><i></i> type <a id="pluginview" href="#pluginview">PluginView</a> = \{ `destroy?`: () => `void`; `update?`: (`view`: [`EditorView`](view.md#editorview), `prevState`: [`EditorState`](#editorstate)) => `void`; \}</code>

A stateful object that can be installed in an editor by a
[plugin](https://prosemirror.net/docs/ref/#state.PluginSpec.view).

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="destroy" href="#destroy">destroy</a><i>?</i>: () => `void`</code>

</dt>

<dd>

Called when the view is destroyed or receives a state
with different plugins.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="update" href="#update">update</a><i>?</i>: (`view`: [`EditorView`](view.md#editorview), `prevState`: [`EditorState`](#editorstate)) => `void`</code>

</dt>

<dd>

Called whenever the view's state is updated.

</dd>

</dl>

## References

### Plugin {#plugin}

Renames and re-exports [ProseMirrorPlugin](#prosemirrorplugin)
