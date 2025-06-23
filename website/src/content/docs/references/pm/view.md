---
title: prosekit/pm/view
sidebar:
  label: pm/view
---

Re-exports from [prosemirror-view](https://github.com/ProseMirror/prosemirror-view).

## Classes

### Decoration {#decoration}

Decoration objects can be provided to the view through the
[`decorations` prop](https://prosemirror.net/docs/ref/#view.EditorProps.decorations). They come in
several variants—see the static members of this class for details.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructordecoration" href="#constructordecoration">Decoration</a>(): [`Decoration`](#decoration)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="from" href="#from">from</a>: `number`</code>

</dt>

<dd>

The start position of the decoration.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="to" href="#to">to</a>: `number`</code>

</dt>

<dd>

The end position. Will be the same as `from` for [widget
decorations](https://prosemirror.net/docs/ref/#view.Decoration^widget).

</dd>

</dl>

#### Accessors

##### spec {#spec}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="specspec" href="#specspec">spec</a>(): `any`</code>

The spec provided when creating this decoration. Can be useful
if you've stored extra information in that object.

###### Returns

`any`

#### Methods

##### inline() {#inline}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="inline-1" href="#inline-1">inline</a>(`from`: `number`, `to`: `number`, `attrs`: [`DecorationAttrs`](#decorationattrs), `spec?`: `object`): [`Decoration`](#decoration)</code>

</dt>

<dd>

Creates an inline decoration, which adds the given attributes to
each inline node between `from` and `to`.

</dd>

</dl>

##### node() {#node}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="node-1" href="#node-1">node</a>(`from`: `number`, `to`: `number`, `attrs`: [`DecorationAttrs`](#decorationattrs), `spec?`: `any`): [`Decoration`](#decoration)</code>

</dt>

<dd>

Creates a node decoration. `from` and `to` should point precisely
before and after a node in the document. That node, and only that
node, will receive the given attributes.

</dd>

</dl>

##### widget() {#widget}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="widget-1" href="#widget-1">widget</a>(`pos`: `number`, `toDOM`: [`WidgetConstructor`](https://prosemirror.net/docs/ref/#view.WidgetConstructor), `spec?`: `object`): [`Decoration`](#decoration)</code>

</dt>

<dd>

Creates a widget decoration, which is a DOM node that's shown in
the document at the given position. It is recommended that you
delay rendering the widget by passing a function that will be
called when the widget is actually drawn in a view, but you can
also directly pass a DOM node. `getPos` can be used to find the
widget's current document position.

</dd>

</dl>

***

### DecorationSet {#decorationset}

A collection of [decorations](https://prosemirror.net/docs/ref/#view.Decoration), organized in such
a way that the drawing algorithm can efficiently use and compare
them. This is a persistent data structure—it is not modified,
updates create a new value.

#### Implements

- [`DecorationSource`](#decorationsource)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructordecorationset" href="#constructordecorationset">DecorationSet</a>(): [`DecorationSet`](#decorationset)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="empty" href="#empty">empty</a>: [`DecorationSet`](#decorationset)</code>

</dt>

<dd>

The empty set of decorations.

</dd>

</dl>

#### Methods

##### add() {#add}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="add-1" href="#add-1">add</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `decorations`: [`Decoration`](#decoration)[]): [`DecorationSet`](#decorationset)</code>

</dt>

<dd>

Add the given array of decorations to the ones in the set,
producing a new set. Consumes the `decorations` array. Needs
access to the current document to create the appropriate tree
structure.

</dd>

</dl>

##### find() {#find}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="find-1" href="#find-1">find</a>(`start?`: `number`, `end?`: `number`, `predicate?`: (`spec`: `any`) => `boolean`): [`Decoration`](#decoration)[]</code>

</dt>

<dd>

Find all decorations in this set which touch the given range
(including decorations that start or end directly at the
boundaries) and match the given predicate on their spec. When
`start` and `end` are omitted, all decorations in the set are
considered. When `predicate` isn't given, all decorations are
assumed to match.

</dd>

</dl>

##### forChild() {#forchild}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="forchild-1" href="#forchild-1">forChild</a>(`offset`: `number`, `node`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`DecorationSet`](#decorationset) \| [`DecorationGroup`](https://prosemirror.net/docs/ref/#view.DecorationGroup)</code>

</dt>

<dd>

Extract a DecorationSource containing decorations for the given child node at the given offset.

###### Implementation of

[`DecorationSource`](#decorationsource).[`forChild`](#forchild-2)

</dd>

</dl>

##### forEachSet() {#foreachset}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="foreachset-1" href="#foreachset-1">forEachSet</a>(`f`: (`set`: [`DecorationSet`](#decorationset)) => `void`): `void`</code>

</dt>

<dd>

Call the given function for each decoration set in the group.

###### Implementation of

[`DecorationSource`](#decorationsource).[`forEachSet`](#foreachset-2)

</dd>

</dl>

##### map() {#map}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="map-1" href="#map-1">map</a>(`mapping`: [`Mapping`](transform.md#mapping), `doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `options?`: `object`): [`DecorationSet`](#decorationset)</code>

</dt>

<dd>

Map the set of decorations in response to a change in the
document.

###### Implementation of

[`DecorationSource`](#decorationsource).[`map`](#map-2)

</dd>

</dl>

##### remove() {#remove}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="remove-1" href="#remove-1">remove</a>(`decorations`: [`Decoration`](#decoration)[]): [`DecorationSet`](#decorationset)</code>

</dt>

<dd>

Create a new set that contains the decorations in this set, minus
the ones in the given array.

</dd>

</dl>

##### create() {#create}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="create-1" href="#create-1">create</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `decorations`: [`Decoration`](#decoration)[]): [`DecorationSet`](#decorationset)</code>

</dt>

<dd>

Create a set of decorations, using the structure of the given
document. This will consume (modify) the `decorations` array, so
you must make a copy if you want need to preserve that.

</dd>

</dl>

***

### EditorView {#editorview}

An editor view manages the DOM structure that represents an
editable document. Its state and behavior are determined by its
[props](https://prosemirror.net/docs/ref/#view.DirectEditorProps).

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructoreditorview" href="#constructoreditorview">EditorView</a>(`place`: `null` \| [`Node`](https://developer.mozilla.org/docs/Web/API/Node) \| (`editor`: [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)) => `void` \| \{ `mount`: [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement); \}, `props`: [`DirectEditorProps`](#directeditorprops)): [`EditorView`](#editorview)</code>

</dt>

<dd>

Create a view. `place` may be a DOM node that the editor should
be appended to, a function that will place it into the document,
or an object whose `mount` property holds the node to use as the
document container. If it is `null`, the editor will not be
added to the document.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="dispatch" href="#dispatch">dispatch</a>: (`tr`: [`Transaction`](state.md#transaction)) => `void`</code>

</dt>

<dd>

Dispatch a transaction. Will call
[`dispatchTransaction`](https://prosemirror.net/docs/ref/#view.DirectEditorProps.dispatchTransaction)
when given, and otherwise defaults to applying the transaction to
the current state and calling
[`updateState`](https://prosemirror.net/docs/ref/#view.EditorView.updateState) with the result.
This method is bound to the view instance, so that it can be
easily passed around.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="dom" href="#dom">dom</a>: [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)</code>

</dt>

<dd>

An editable DOM node containing the document. (You probably
should not directly interfere with its content.)

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="dragging" href="#dragging">dragging</a>: `null` \| \{ `move`: `boolean`; `slice`: [`Slice`](model.md#slice-2); \}</code>

</dt>

<dd>

When editor content is being dragged, this object contains
information about the dragged slice and whether it is being
copied or moved. At any other time, it is null.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="editable" href="#editable">editable</a>: `boolean`</code>

</dt>

<dd>

Indicates whether the editor is currently [editable](https://prosemirror.net/docs/ref/#view.EditorProps.editable).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="state" href="#state">state</a>: [`EditorState`](state.md#editorstate)</code>

</dt>

<dd>

The view's current [state](https://prosemirror.net/docs/ref/#state.EditorState).

</dd>

</dl>

#### Accessors

##### composing {#composing}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="composingcomposing" href="#composingcomposing">composing</a>(): `boolean`</code>

Holds `true` when a
[composition](https://w3c.github.io/uievents/#events-compositionevents)
is active.

###### Returns

`boolean`

##### isDestroyed {#isdestroyed}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="isdestroyedisdestroyed" href="#isdestroyedisdestroyed">isDestroyed</a>(): `boolean`</code>

This is true when the view has been
[destroyed](https://prosemirror.net/docs/ref/#view.EditorView.destroy) (and thus should not be
used anymore).

###### Returns

`boolean`

##### props {#props}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="propsprops" href="#propsprops">props</a>(): [`DirectEditorProps`](#directeditorprops)</code>

The view's current [props](https://prosemirror.net/docs/ref/#view.EditorProps).

###### Returns

[`DirectEditorProps`](#directeditorprops)

##### root {#root}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="rootroot" href="#rootroot">root</a>(): [`Document`](https://developer.mozilla.org/docs/Web/API/Document) \| [`ShadowRoot`](https://developer.mozilla.org/docs/Web/API/ShadowRoot)</code>

Get the document root in which the editor exists. This will
usually be the top-level `document`, but might be a [shadow
DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)
root if the editor is inside one.

###### Returns

[`Document`](https://developer.mozilla.org/docs/Web/API/Document) \| [`ShadowRoot`](https://developer.mozilla.org/docs/Web/API/ShadowRoot)

#### Methods

##### coordsAtPos() {#coordsatpos}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="coordsatpos-1" href="#coordsatpos-1">coordsAtPos</a>(`pos`: `number`, `side?`: `number`): `object`</code>

</dt>

<dd>

Returns the viewport rectangle at a given document position.
`left` and `right` will be the same number, as this returns a
flat cursor-ish rectangle. If the position is between two things
that aren't directly adjacent, `side` determines which element
is used. When < 0, the element before the position is used,
otherwise the element after.

</dd>

</dl>

##### destroy() {#destroy}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="destroy-1" href="#destroy-1">destroy</a>(): `void`</code>

</dt>

<dd>

Removes the editor from the DOM and destroys all [node
views](https://prosemirror.net/docs/ref/#view.NodeView).

</dd>

</dl>

##### dispatchEvent() {#dispatchevent}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="dispatchevent-1" href="#dispatchevent-1">dispatchEvent</a>(`event`: [`Event`](https://developer.mozilla.org/docs/Web/API/Event)): `void`</code>

</dt>

<dd>

Used for testing.

</dd>

</dl>

##### domAtPos() {#domatpos}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="domatpos-1" href="#domatpos-1">domAtPos</a>(`pos`: `number`, `side?`: `number`): `object`</code>

</dt>

<dd>

Find the DOM position that corresponds to the given document
position. When `side` is negative, find the position as close as
possible to the content before the position. When positive,
prefer positions close to the content after the position. When
zero, prefer as shallow a position as possible.

Note that you should **not** mutate the editor's internal DOM,
only inspect it (and even that is usually not necessary).

</dd>

</dl>

##### endOfTextblock() {#endoftextblock}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="endoftextblock-1" href="#endoftextblock-1">endOfTextblock</a>(`dir`: `"up"` \| `"down"` \| `"left"` \| `"right"` \| `"forward"` \| `"backward"`, `state?`: [`EditorState`](state.md#editorstate)): `boolean`</code>

</dt>

<dd>

Find out whether the selection is at the end of a textblock when
moving in a given direction. When, for example, given `"left"`,
it will return true if moving left from the current cursor
position would leave that position's parent textblock. Will apply
to the view's current state by default, but it is possible to
pass a different state.

</dd>

</dl>

##### focus() {#focus}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="focus-1" href="#focus-1">focus</a>(): `void`</code>

</dt>

<dd>

Focus the editor.

</dd>

</dl>

##### hasFocus() {#hasfocus}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="hasfocus-1" href="#hasfocus-1">hasFocus</a>(): `boolean`</code>

</dt>

<dd>

Query whether the view has focus.

</dd>

</dl>

##### nodeDOM() {#nodedom}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="nodedom-1" href="#nodedom-1">nodeDOM</a>(`pos`: `number`): `null` \| [`Node`](https://developer.mozilla.org/docs/Web/API/Node)</code>

</dt>

<dd>

Find the DOM node that represents the document node after the
given position. May return `null` when the position doesn't point
in front of a node or if the node is inside an opaque node view.

This is intended to be able to call things like
`getBoundingClientRect` on that DOM node. Do **not** mutate the
editor DOM directly, or add styling this way, since that will be
immediately overriden by the editor as it redraws the node.

</dd>

</dl>

##### pasteHTML() {#pastehtml}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="pastehtml-1" href="#pastehtml-1">pasteHTML</a>(`html`: `string`, `event?`: [`ClipboardEvent`](https://developer.mozilla.org/docs/Web/API/ClipboardEvent)): `boolean`</code>

</dt>

<dd>

Run the editor's paste logic with the given HTML string. The
`event`, if given, will be passed to the
[`handlePaste`](https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste) hook.

</dd>

</dl>

##### pasteText() {#pastetext}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="pastetext-1" href="#pastetext-1">pasteText</a>(`text`: `string`, `event?`: [`ClipboardEvent`](https://developer.mozilla.org/docs/Web/API/ClipboardEvent)): `boolean`</code>

</dt>

<dd>

Run the editor's paste logic with the given plain-text input.

</dd>

</dl>

##### posAtCoords() {#posatcoords}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="posatcoords-1" href="#posatcoords-1">posAtCoords</a>(`coords`: `object`): `null` \| \{ `inside`: `number`; `pos`: `number`; \}</code>

</dt>

<dd>

Given a pair of viewport coordinates, return the document
position that corresponds to them. May return null if the given
coordinates aren't inside of the editor. When an object is
returned, its `pos` property is the position nearest to the
coordinates, and its `inside` property holds the position of the
inner node that the position falls inside of, or -1 if it is at
the top level, not in any node.

</dd>

</dl>

##### posAtDOM() {#posatdom}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="posatdom-1" href="#posatdom-1">posAtDOM</a>(`node`: [`Node`](https://developer.mozilla.org/docs/Web/API/Node), `offset`: `number`, `bias?`: `number`): `number`</code>

</dt>

<dd>

Find the document position that corresponds to a given DOM
position. (Whenever possible, it is preferable to inspect the
document structure directly, rather than poking around in the
DOM, but sometimes—for example when interpreting an event
target—you don't have a choice.)

The `bias` parameter can be used to influence which side of a DOM
node to use when the position is inside a leaf node.

</dd>

</dl>

##### serializeForClipboard() {#serializeforclipboard}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="serializeforclipboard-1" href="#serializeforclipboard-1">serializeForClipboard</a>(`slice`: [`Slice`](model.md#slice-2)): `object`</code>

</dt>

<dd>

Serialize the given slice as it would be if it was copied from
this editor. Returns a DOM element that contains a
representation of the slice as its children, a textual
representation, and the transformed slice (which can be
different from the given input due to hooks like
[`transformCopied`](https://prosemirror.net/docs/ref/#view.EditorProps.transformCopied)).

</dd>

</dl>

##### setProps() {#setprops}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="setprops-1" href="#setprops-1">setProps</a>(`props`: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`DirectEditorProps`](#directeditorprops)\>): `void`</code>

</dt>

<dd>

Update the view by updating existing props object with the object
given as argument. Equivalent to `view.update(Object.assign({},
view.props, props))`.

</dd>

</dl>

##### someProp() {#someprop}

###### Call Signature

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="someprop-1" href="#someprop-1">someProp</a>\<PropName, Result\>(`propName`: `PropName`, `f`: (`value`: [`NonNullable`](https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype)\<[`EditorProps`](#editorprops)\<`any`\>\[`PropName`\]\>) => `Result`): `undefined` \| `Result`</code>

</dt>

<dd>

Goes over the values of a prop, first those provided directly,
then those from plugins given to the view, then from plugins in
the state (in order), and calls `f` every time a non-undefined
value is found. When `f` returns a truthy value, that is
immediately returned. When `f` isn't provided, it is treated as
the identity function (the prop value is returned directly).

</dd>

</dl>

###### Call Signature

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="someprop-2" href="#someprop-2">someProp</a>\<PropName\>(`propName`: `PropName`): `undefined` \| [`NonNullable`](https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype)\<[`EditorProps`](#editorprops)\<`any`\>\[`PropName`\]\></code>

</dt>

<dd>

Goes over the values of a prop, first those provided directly,
then those from plugins given to the view, then from plugins in
the state (in order), and calls `f` every time a non-undefined
value is found. When `f` returns a truthy value, that is
immediately returned. When `f` isn't provided, it is treated as
the identity function (the prop value is returned directly).

</dd>

</dl>

##### update() {#update}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="update-1" href="#update-1">update</a>(`props`: [`DirectEditorProps`](#directeditorprops)): `void`</code>

</dt>

<dd>

Update the view's props. Will immediately cause an update to
the DOM.

</dd>

</dl>

##### updateRoot() {#updateroot}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="updateroot-1" href="#updateroot-1">updateRoot</a>(): `void`</code>

</dt>

<dd>

When an existing editor view is moved to a new document or
shadow tree, call this to make it recompute its root.

</dd>

</dl>

##### updateState() {#updatestate}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="updatestate-1" href="#updatestate-1">updateState</a>(`state`: [`EditorState`](state.md#editorstate)): `void`</code>

</dt>

<dd>

Update the editor's `state` prop, without touching any of the
other props.

</dd>

</dl>

## Interfaces

### DecorationSource {#decorationsource}

An object that can [provide](https://prosemirror.net/docs/ref/#view.EditorProps.decorations)
decorations. Implemented by [`DecorationSet`](https://prosemirror.net/docs/ref/#view.DecorationSet),
and passed to [node views](https://prosemirror.net/docs/ref/#view.EditorProps.nodeViews).

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="map-2" href="#map-2">map</a>: (`mapping`: [`Mapping`](transform.md#mapping), `node`: [`ProseMirrorNode`](model.md#prosemirrornode)) => [`DecorationSource`](#decorationsource)</code>

</dt>

<dd>

Map the set of decorations in response to a change in the
document.

</dd>

</dl>

#### Methods

##### forChild() {#forchild-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="forchild-3" href="#forchild-3">forChild</a>(`offset`: `number`, `child`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`DecorationSource`](#decorationsource)</code>

</dt>

<dd>

Extract a DecorationSource containing decorations for the given child node at the given offset.

</dd>

</dl>

##### forEachSet() {#foreachset-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="foreachset-3" href="#foreachset-3">forEachSet</a>(`f`: (`set`: [`DecorationSet`](#decorationset)) => `void`): `void`</code>

</dt>

<dd>

Call the given function for each decoration set in the group.

</dd>

</dl>

***

### DirectEditorProps {#directeditorprops}

The props object given directly to the editor view supports some
fields that can't be used in plugins:

#### Extends

- [`EditorProps`](#editorprops)

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="attributes" href="#attributes">attributes</a><i>?</i>: \{[`name`: `string`]: `string`; \} \| (`state`: [`EditorState`](state.md#editorstate)) => `object`</code>

</dt>

<dd>

Control the DOM attributes of the editable element. May be either
an object or a function going from an editor state to an object.
By default, the element will get a class `"ProseMirror"`, and
will have its `contentEditable` attribute determined by the
[`editable` prop](https://prosemirror.net/docs/ref/#view.EditorProps.editable). Additional classes
provided here will be added to the class. For other attributes,
the value provided first (as in
[`someProp`](https://prosemirror.net/docs/ref/#view.EditorView.someProp)) will be used.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="clipboardparser" href="#clipboardparser">clipboardParser</a><i>?</i>: [`DOMParser`](model.md#domparser)</code>

</dt>

<dd>

The [parser](https://prosemirror.net/docs/ref/#model.DOMParser) to use when reading content from
the clipboard. When not given, the value of the
[`domParser`](https://prosemirror.net/docs/ref/#view.EditorProps.domParser) prop is used.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="clipboardserializer" href="#clipboardserializer">clipboardSerializer</a><i>?</i>: [`DOMSerializer`](model.md#domserializer)</code>

</dt>

<dd>

The DOM serializer to use when putting content onto the
clipboard. If not given, the result of
[`DOMSerializer.fromSchema`](https://prosemirror.net/docs/ref/#model.DOMSerializer^fromSchema)
will be used. This object will only have its
[`serializeFragment`](https://prosemirror.net/docs/ref/#model.DOMSerializer.serializeFragment)
method called, and you may provide an alternative object type
implementing a compatible method.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="clipboardtextparser" href="#clipboardtextparser">clipboardTextParser</a><i>?</i>: (`this`: `any`, `text`: `string`, `$context`: [`ResolvedPos`](model.md#resolvedpos), `plain`: `boolean`, `view`: [`EditorView`](#editorview)) => [`Slice`](model.md#slice-2)</code>

</dt>

<dd>

A function to parse text from the clipboard into a document
slice. Called after
[`transformPastedText`](https://prosemirror.net/docs/ref/#view.EditorProps.transformPastedText).
The default behavior is to split the text into lines, wrap them
in `<p>` tags, and call
[`clipboardParser`](https://prosemirror.net/docs/ref/#view.EditorProps.clipboardParser) on it.
The `plain` flag will be true when the text is pasted as plain text.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="clipboardtextserializer" href="#clipboardtextserializer">clipboardTextSerializer</a><i>?</i>: (`this`: `any`, `content`: [`Slice`](model.md#slice-2), `view`: [`EditorView`](#editorview)) => `string`</code>

</dt>

<dd>

A function that will be called to get the text for the current
selection when copying text to the clipboard. By default, the
editor will use [`textBetween`](https://prosemirror.net/docs/ref/#model.Node.textBetween) on the
selected range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="createselectionbetween" href="#createselectionbetween">createSelectionBetween</a><i>?</i>: (`this`: `any`, `view`: [`EditorView`](#editorview), `anchor`: [`ResolvedPos`](model.md#resolvedpos), `head`: [`ResolvedPos`](model.md#resolvedpos)) => `null` \| [`Selection`](state.md#selection-1)</code>

</dt>

<dd>

Can be used to override the way a selection is created when
reading a DOM selection between the given anchor and head.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="decorations" href="#decorations">decorations</a><i>?</i>: (`this`: `any`, `state`: [`EditorState`](state.md#editorstate)) => `undefined` \| `null` \| [`DecorationSource`](#decorationsource)</code>

</dt>

<dd>

A set of [document decorations](https://prosemirror.net/docs/ref/#view.Decoration) to show in the
view.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="dispatchtransaction" href="#dispatchtransaction">dispatchTransaction</a><i>?</i>: (`tr`: [`Transaction`](state.md#transaction)) => `void`</code>

</dt>

<dd>

The callback over which to send transactions (state updates)
produced by the view. If you specify this, you probably want to
make sure this ends up calling the view's
[`updateState`](https://prosemirror.net/docs/ref/#view.EditorView.updateState) method with a new
state that has the transaction
[applied](https://prosemirror.net/docs/ref/#state.EditorState.apply). The callback will be bound to have
the view instance as its `this` binding.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="domparser" href="#domparser">domParser</a><i>?</i>: [`DOMParser`](model.md#domparser)</code>

</dt>

<dd>

The [parser](https://prosemirror.net/docs/ref/#model.DOMParser) to use when reading editor changes
from the DOM. Defaults to calling
[`DOMParser.fromSchema`](https://prosemirror.net/docs/ref/#model.DOMParser^fromSchema) on the
editor's schema.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="dragcopies" href="#dragcopies">dragCopies</a><i>?</i>: (`event`: [`DragEvent`](https://developer.mozilla.org/docs/Web/API/DragEvent)) => `boolean`</code>

</dt>

<dd>

Determines whether an in-editor drag event should copy or move
the selection. When not given, the event's `altKey` property is
used on macOS, `ctrlKey` on other platforms.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="editable-1" href="#editable-1">editable</a><i>?</i>: (`this`: `any`, `state`: [`EditorState`](state.md#editorstate)) => `boolean`</code>

</dt>

<dd>

When this returns false, the content of the view is not directly
editable.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="handleclick" href="#handleclick">handleClick</a><i>?</i>: (`this`: `any`, `view`: [`EditorView`](#editorview), `pos`: `number`, `event`: [`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)) => `boolean` \| `void`</code>

</dt>

<dd>

Called when the editor is clicked, after `handleClickOn` handlers
have been called.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="handleclickon" href="#handleclickon">handleClickOn</a><i>?</i>: (`this`: `any`, `view`: [`EditorView`](#editorview), `pos`: `number`, `node`: [`ProseMirrorNode`](model.md#prosemirrornode), `nodePos`: `number`, `event`: [`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent), `direct`: `boolean`) => `boolean` \| `void`</code>

</dt>

<dd>

Called for each node around a click, from the inside out. The
`direct` flag will be true for the inner node.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="handledomevents" href="#handledomevents">handleDOMEvents</a><i>?</i>: `object`</code>

</dt>

<dd>

Can be an object mapping DOM event type names to functions that
handle them. Such functions will be called before any handling
ProseMirror does of events fired on the editable DOM element.
Contrary to the other event handling props, when returning true
from such a function, you are responsible for calling
`preventDefault` yourself (or not, if you want to allow the
default behavior).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="handledoubleclick" href="#handledoubleclick">handleDoubleClick</a><i>?</i>: (`this`: `any`, `view`: [`EditorView`](#editorview), `pos`: `number`, `event`: [`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)) => `boolean` \| `void`</code>

</dt>

<dd>

Called when the editor is double-clicked, after `handleDoubleClickOn`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="handledoubleclickon" href="#handledoubleclickon">handleDoubleClickOn</a><i>?</i>: (`this`: `any`, `view`: [`EditorView`](#editorview), `pos`: `number`, `node`: [`ProseMirrorNode`](model.md#prosemirrornode), `nodePos`: `number`, `event`: [`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent), `direct`: `boolean`) => `boolean` \| `void`</code>

</dt>

<dd>

Called for each node around a double click.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="handledrop" href="#handledrop">handleDrop</a><i>?</i>: (`this`: `any`, `view`: [`EditorView`](#editorview), `event`: [`DragEvent`](https://developer.mozilla.org/docs/Web/API/DragEvent), `slice`: [`Slice`](model.md#slice-2), `moved`: `boolean`) => `boolean` \| `void`</code>

</dt>

<dd>

Called when something is dropped on the editor. `moved` will be
true if this drop moves from the current selection (which should
thus be deleted).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="handlekeydown" href="#handlekeydown">handleKeyDown</a><i>?</i>: (`this`: `any`, `view`: [`EditorView`](#editorview), `event`: [`KeyboardEvent`](https://developer.mozilla.org/docs/Web/API/KeyboardEvent)) => `boolean` \| `void`</code>

</dt>

<dd>

Called when the editor receives a `keydown` event.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="handlekeypress" href="#handlekeypress">handleKeyPress</a><i>?</i>: (`this`: `any`, `view`: [`EditorView`](#editorview), `event`: [`KeyboardEvent`](https://developer.mozilla.org/docs/Web/API/KeyboardEvent)) => `boolean` \| `void`</code>

</dt>

<dd>

Handler for `keypress` events.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="handlepaste" href="#handlepaste">handlePaste</a><i>?</i>: (`this`: `any`, `view`: [`EditorView`](#editorview), `event`: [`ClipboardEvent`](https://developer.mozilla.org/docs/Web/API/ClipboardEvent), `slice`: [`Slice`](model.md#slice-2)) => `boolean` \| `void`</code>

</dt>

<dd>

Can be used to override the behavior of pasting. `slice` is the
pasted content parsed by the editor, but you can directly access
the event to get at the raw content.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="handlescrolltoselection" href="#handlescrolltoselection">handleScrollToSelection</a><i>?</i>: (`this`: `any`, `view`: [`EditorView`](#editorview)) => `boolean`</code>

</dt>

<dd>

Called when the view, after updating its state, tries to scroll
the selection into view. A handler function may return false to
indicate that it did not handle the scrolling and further
handlers or the default behavior should be tried.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="handletextinput" href="#handletextinput">handleTextInput</a><i>?</i>: (`this`: `any`, `view`: [`EditorView`](#editorview), `from`: `number`, `to`: `number`, `text`: `string`, `deflt`: () => [`Transaction`](state.md#transaction)) => `boolean` \| `void`</code>

</dt>

<dd>

Whenever the user directly input text, this handler is called
before the input is applied. If it returns `true`, the default
behavior of actually inserting the text is suppressed.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="handletripleclick" href="#handletripleclick">handleTripleClick</a><i>?</i>: (`this`: `any`, `view`: [`EditorView`](#editorview), `pos`: `number`, `event`: [`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)) => `boolean` \| `void`</code>

</dt>

<dd>

Called when the editor is triple-clicked, after `handleTripleClickOn`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="handletripleclickon" href="#handletripleclickon">handleTripleClickOn</a><i>?</i>: (`this`: `any`, `view`: [`EditorView`](#editorview), `pos`: `number`, `node`: [`ProseMirrorNode`](model.md#prosemirrornode), `nodePos`: `number`, `event`: [`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent), `direct`: `boolean`) => `boolean` \| `void`</code>

</dt>

<dd>

Called for each node around a triple click.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="markviews" href="#markviews">markViews</a><i>?</i>: `object`</code>

</dt>

<dd>

Pass custom mark rendering functions. Note that these cannot
provide the kind of dynamic behavior that [node
views](https://prosemirror.net/docs/ref/#view.NodeView) can—they just provide custom rendering
logic. The third argument indicates whether the mark's content
is inline.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="nodeviews" href="#nodeviews">nodeViews</a><i>?</i>: `object`</code>

</dt>

<dd>

Allows you to pass custom rendering and behavior logic for
nodes. Should map node names to constructor functions that
produce a [`NodeView`](https://prosemirror.net/docs/ref/#view.NodeView) object implementing the
node's display behavior. The third argument `getPos` is a
function that can be called to get the node's current position,
which can be useful when creating transactions to update it.
Note that if the node is not in the document, the position
returned by this function will be `undefined`.

`decorations` is an array of node or inline decorations that are
active around the node. They are automatically drawn in the
normal way, and you will usually just want to ignore this, but
they can also be used as a way to provide context information to
the node view without adding it to the document itself.

`innerDecorations` holds the decorations for the node's content.
You can safely ignore this if your view has no content or a
`contentDOM` property, since the editor will draw the decorations
on the content. But if you, for example, want to create a nested
editor with the content, it may make sense to provide it with the
inner decorations.

(For backwards compatibility reasons, [mark
views](https://prosemirror.net/docs/ref/#view.EditorProps.markViews) can also be included in this
object.)

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="plugins" href="#plugins">plugins</a><i>?</i>: readonly [`ProseMirrorPlugin`](state.md#prosemirrorplugin)\<`any`\>[]</code>

</dt>

<dd>

A set of plugins to use in the view, applying their [plugin
view](https://prosemirror.net/docs/ref/#state.PluginSpec.view) and
[props](https://prosemirror.net/docs/ref/#state.PluginSpec.props). Passing plugins with a state
component (a [state field](https://prosemirror.net/docs/ref/#state.PluginSpec.state) field or a
[transaction](https://prosemirror.net/docs/ref/#state.PluginSpec.filterTransaction) filter or
appender) will result in an error, since such plugins must be
present in the state to work.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="scrollmargin" href="#scrollmargin">scrollMargin</a><i>?</i>: `number` \| \{ `bottom`: `number`; `left`: `number`; `right`: `number`; `top`: `number`; \}</code>

</dt>

<dd>

Determines the extra space (in pixels) that is left above or
below the cursor when it is scrolled into view. Defaults to 5.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="scrollthreshold" href="#scrollthreshold">scrollThreshold</a><i>?</i>: `number` \| \{ `bottom`: `number`; `left`: `number`; `right`: `number`; `top`: `number`; \}</code>

</dt>

<dd>

Determines the distance (in pixels) between the cursor and the
end of the visible viewport at which point, when scrolling the
cursor into view, scrolling takes place. Defaults to 0.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="state-1" href="#state-1">state</a>: [`EditorState`](state.md#editorstate)</code>

</dt>

<dd>

The current state of the editor.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="transformcopied" href="#transformcopied">transformCopied</a><i>?</i>: (`this`: `any`, `slice`: [`Slice`](model.md#slice-2), `view`: [`EditorView`](#editorview)) => [`Slice`](model.md#slice-2)</code>

</dt>

<dd>

Can be used to transform copied or cut content before it is
serialized to the clipboard.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="transformpasted" href="#transformpasted">transformPasted</a><i>?</i>: (`this`: `any`, `slice`: [`Slice`](model.md#slice-2), `view`: [`EditorView`](#editorview)) => [`Slice`](model.md#slice-2)</code>

</dt>

<dd>

Can be used to transform pasted or dragged-and-dropped content
before it is applied to the document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="transformpastedhtml" href="#transformpastedhtml">transformPastedHTML</a><i>?</i>: (`this`: `any`, `html`: `string`, `view`: [`EditorView`](#editorview)) => `string`</code>

</dt>

<dd>

Can be used to transform pasted HTML text, _before_ it is parsed,
for example to clean it up.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="transformpastedtext" href="#transformpastedtext">transformPastedText</a><i>?</i>: (`this`: `any`, `text`: `string`, `plain`: `boolean`, `view`: [`EditorView`](#editorview)) => `string`</code>

</dt>

<dd>

Transform pasted plain text. The `plain` flag will be true when
the text is pasted as plain text.

</dd>

</dl>

***

### DOMEventMap {#domeventmap}

Helper type that maps event names to event object types, but
includes events that TypeScript's HTMLElementEventMap doesn't know
about.

#### Extends

- `HTMLElementEventMap`

#### Indexable

\[`event`: `string`\]: `any`

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="aria-uicontext-provider" href="#aria-uicontext-provider">aria-ui/context-provider</a>: `ContextProviderEvent`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="aria-uicontext-request" href="#aria-uicontext-request">aria-ui/context-request</a>: `ContextRequestEvent`\<`unknown`\></code>

</dt>

</dl>

***

### EditorProps\<P\> {#editorprops}

Props are configuration values that can be passed to an editor view
or included in a plugin. This interface lists the supported props.

The various event-handling functions may all return `true` to
indicate that they handled the given event. The view will then take
care to call `preventDefault` on the event, except with
`handleDOMEvents`, where the handler itself is responsible for that.

How a prop is resolved depends on the prop. Handler functions are
called one at a time, starting with the base props and then
searching through the plugins (in order of appearance) until one of
them returns true. For some props, the first plugin that yields a
value gets precedence.

The optional type parameter refers to the type of `this` in prop
functions, and is used to pass in the plugin type when defining a
[plugin](https://prosemirror.net/docs/ref/#state.Plugin).

#### Extended by

- [`DirectEditorProps`](#directeditorprops)

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

`P`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="attributes-1" href="#attributes-1">attributes</a><i>?</i>: \{[`name`: `string`]: `string`; \} \| (`state`: [`EditorState`](state.md#editorstate)) => `object`</code>

</dt>

<dd>

Control the DOM attributes of the editable element. May be either
an object or a function going from an editor state to an object.
By default, the element will get a class `"ProseMirror"`, and
will have its `contentEditable` attribute determined by the
[`editable` prop](https://prosemirror.net/docs/ref/#view.EditorProps.editable). Additional classes
provided here will be added to the class. For other attributes,
the value provided first (as in
[`someProp`](https://prosemirror.net/docs/ref/#view.EditorView.someProp)) will be used.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="clipboardparser-1" href="#clipboardparser-1">clipboardParser</a><i>?</i>: [`DOMParser`](model.md#domparser)</code>

</dt>

<dd>

The [parser](https://prosemirror.net/docs/ref/#model.DOMParser) to use when reading content from
the clipboard. When not given, the value of the
[`domParser`](https://prosemirror.net/docs/ref/#view.EditorProps.domParser) prop is used.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="clipboardserializer-1" href="#clipboardserializer-1">clipboardSerializer</a><i>?</i>: [`DOMSerializer`](model.md#domserializer)</code>

</dt>

<dd>

The DOM serializer to use when putting content onto the
clipboard. If not given, the result of
[`DOMSerializer.fromSchema`](https://prosemirror.net/docs/ref/#model.DOMSerializer^fromSchema)
will be used. This object will only have its
[`serializeFragment`](https://prosemirror.net/docs/ref/#model.DOMSerializer.serializeFragment)
method called, and you may provide an alternative object type
implementing a compatible method.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="clipboardtextparser-1" href="#clipboardtextparser-1">clipboardTextParser</a><i>?</i>: (`this`: `P`, `text`: `string`, `$context`: [`ResolvedPos`](model.md#resolvedpos), `plain`: `boolean`, `view`: [`EditorView`](#editorview)) => [`Slice`](model.md#slice-2)</code>

</dt>

<dd>

A function to parse text from the clipboard into a document
slice. Called after
[`transformPastedText`](https://prosemirror.net/docs/ref/#view.EditorProps.transformPastedText).
The default behavior is to split the text into lines, wrap them
in `<p>` tags, and call
[`clipboardParser`](https://prosemirror.net/docs/ref/#view.EditorProps.clipboardParser) on it.
The `plain` flag will be true when the text is pasted as plain text.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="clipboardtextserializer-1" href="#clipboardtextserializer-1">clipboardTextSerializer</a><i>?</i>: (`this`: `P`, `content`: [`Slice`](model.md#slice-2), `view`: [`EditorView`](#editorview)) => `string`</code>

</dt>

<dd>

A function that will be called to get the text for the current
selection when copying text to the clipboard. By default, the
editor will use [`textBetween`](https://prosemirror.net/docs/ref/#model.Node.textBetween) on the
selected range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="createselectionbetween-1" href="#createselectionbetween-1">createSelectionBetween</a><i>?</i>: (`this`: `P`, `view`: [`EditorView`](#editorview), `anchor`: [`ResolvedPos`](model.md#resolvedpos), `head`: [`ResolvedPos`](model.md#resolvedpos)) => `null` \| [`Selection`](state.md#selection-1)</code>

</dt>

<dd>

Can be used to override the way a selection is created when
reading a DOM selection between the given anchor and head.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="decorations-1" href="#decorations-1">decorations</a><i>?</i>: (`this`: `P`, `state`: [`EditorState`](state.md#editorstate)) => `undefined` \| `null` \| [`DecorationSource`](#decorationsource)</code>

</dt>

<dd>

A set of [document decorations](https://prosemirror.net/docs/ref/#view.Decoration) to show in the
view.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="domparser-1" href="#domparser-1">domParser</a><i>?</i>: [`DOMParser`](model.md#domparser)</code>

</dt>

<dd>

The [parser](https://prosemirror.net/docs/ref/#model.DOMParser) to use when reading editor changes
from the DOM. Defaults to calling
[`DOMParser.fromSchema`](https://prosemirror.net/docs/ref/#model.DOMParser^fromSchema) on the
editor's schema.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="dragcopies-1" href="#dragcopies-1">dragCopies</a><i>?</i>: (`event`: [`DragEvent`](https://developer.mozilla.org/docs/Web/API/DragEvent)) => `boolean`</code>

</dt>

<dd>

Determines whether an in-editor drag event should copy or move
the selection. When not given, the event's `altKey` property is
used on macOS, `ctrlKey` on other platforms.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="editable-2" href="#editable-2">editable</a><i>?</i>: (`this`: `P`, `state`: [`EditorState`](state.md#editorstate)) => `boolean`</code>

</dt>

<dd>

When this returns false, the content of the view is not directly
editable.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="handleclick-1" href="#handleclick-1">handleClick</a><i>?</i>: (`this`: `P`, `view`: [`EditorView`](#editorview), `pos`: `number`, `event`: [`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)) => `boolean` \| `void`</code>

</dt>

<dd>

Called when the editor is clicked, after `handleClickOn` handlers
have been called.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="handleclickon-1" href="#handleclickon-1">handleClickOn</a><i>?</i>: (`this`: `P`, `view`: [`EditorView`](#editorview), `pos`: `number`, `node`: [`ProseMirrorNode`](model.md#prosemirrornode), `nodePos`: `number`, `event`: [`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent), `direct`: `boolean`) => `boolean` \| `void`</code>

</dt>

<dd>

Called for each node around a click, from the inside out. The
`direct` flag will be true for the inner node.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="handledomevents-1" href="#handledomevents-1">handleDOMEvents</a><i>?</i>: `object`</code>

</dt>

<dd>

Can be an object mapping DOM event type names to functions that
handle them. Such functions will be called before any handling
ProseMirror does of events fired on the editable DOM element.
Contrary to the other event handling props, when returning true
from such a function, you are responsible for calling
`preventDefault` yourself (or not, if you want to allow the
default behavior).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="handledoubleclick-1" href="#handledoubleclick-1">handleDoubleClick</a><i>?</i>: (`this`: `P`, `view`: [`EditorView`](#editorview), `pos`: `number`, `event`: [`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)) => `boolean` \| `void`</code>

</dt>

<dd>

Called when the editor is double-clicked, after `handleDoubleClickOn`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="handledoubleclickon-1" href="#handledoubleclickon-1">handleDoubleClickOn</a><i>?</i>: (`this`: `P`, `view`: [`EditorView`](#editorview), `pos`: `number`, `node`: [`ProseMirrorNode`](model.md#prosemirrornode), `nodePos`: `number`, `event`: [`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent), `direct`: `boolean`) => `boolean` \| `void`</code>

</dt>

<dd>

Called for each node around a double click.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="handledrop-1" href="#handledrop-1">handleDrop</a><i>?</i>: (`this`: `P`, `view`: [`EditorView`](#editorview), `event`: [`DragEvent`](https://developer.mozilla.org/docs/Web/API/DragEvent), `slice`: [`Slice`](model.md#slice-2), `moved`: `boolean`) => `boolean` \| `void`</code>

</dt>

<dd>

Called when something is dropped on the editor. `moved` will be
true if this drop moves from the current selection (which should
thus be deleted).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="handlekeydown-1" href="#handlekeydown-1">handleKeyDown</a><i>?</i>: (`this`: `P`, `view`: [`EditorView`](#editorview), `event`: [`KeyboardEvent`](https://developer.mozilla.org/docs/Web/API/KeyboardEvent)) => `boolean` \| `void`</code>

</dt>

<dd>

Called when the editor receives a `keydown` event.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="handlekeypress-1" href="#handlekeypress-1">handleKeyPress</a><i>?</i>: (`this`: `P`, `view`: [`EditorView`](#editorview), `event`: [`KeyboardEvent`](https://developer.mozilla.org/docs/Web/API/KeyboardEvent)) => `boolean` \| `void`</code>

</dt>

<dd>

Handler for `keypress` events.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="handlepaste-1" href="#handlepaste-1">handlePaste</a><i>?</i>: (`this`: `P`, `view`: [`EditorView`](#editorview), `event`: [`ClipboardEvent`](https://developer.mozilla.org/docs/Web/API/ClipboardEvent), `slice`: [`Slice`](model.md#slice-2)) => `boolean` \| `void`</code>

</dt>

<dd>

Can be used to override the behavior of pasting. `slice` is the
pasted content parsed by the editor, but you can directly access
the event to get at the raw content.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="handlescrolltoselection-1" href="#handlescrolltoselection-1">handleScrollToSelection</a><i>?</i>: (`this`: `P`, `view`: [`EditorView`](#editorview)) => `boolean`</code>

</dt>

<dd>

Called when the view, after updating its state, tries to scroll
the selection into view. A handler function may return false to
indicate that it did not handle the scrolling and further
handlers or the default behavior should be tried.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="handletextinput-1" href="#handletextinput-1">handleTextInput</a><i>?</i>: (`this`: `P`, `view`: [`EditorView`](#editorview), `from`: `number`, `to`: `number`, `text`: `string`, `deflt`: () => [`Transaction`](state.md#transaction)) => `boolean` \| `void`</code>

</dt>

<dd>

Whenever the user directly input text, this handler is called
before the input is applied. If it returns `true`, the default
behavior of actually inserting the text is suppressed.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="handletripleclick-1" href="#handletripleclick-1">handleTripleClick</a><i>?</i>: (`this`: `P`, `view`: [`EditorView`](#editorview), `pos`: `number`, `event`: [`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)) => `boolean` \| `void`</code>

</dt>

<dd>

Called when the editor is triple-clicked, after `handleTripleClickOn`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="handletripleclickon-1" href="#handletripleclickon-1">handleTripleClickOn</a><i>?</i>: (`this`: `P`, `view`: [`EditorView`](#editorview), `pos`: `number`, `node`: [`ProseMirrorNode`](model.md#prosemirrornode), `nodePos`: `number`, `event`: [`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent), `direct`: `boolean`) => `boolean` \| `void`</code>

</dt>

<dd>

Called for each node around a triple click.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="markviews-1" href="#markviews-1">markViews</a><i>?</i>: `object`</code>

</dt>

<dd>

Pass custom mark rendering functions. Note that these cannot
provide the kind of dynamic behavior that [node
views](https://prosemirror.net/docs/ref/#view.NodeView) can—they just provide custom rendering
logic. The third argument indicates whether the mark's content
is inline.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="nodeviews-1" href="#nodeviews-1">nodeViews</a><i>?</i>: `object`</code>

</dt>

<dd>

Allows you to pass custom rendering and behavior logic for
nodes. Should map node names to constructor functions that
produce a [`NodeView`](https://prosemirror.net/docs/ref/#view.NodeView) object implementing the
node's display behavior. The third argument `getPos` is a
function that can be called to get the node's current position,
which can be useful when creating transactions to update it.
Note that if the node is not in the document, the position
returned by this function will be `undefined`.

`decorations` is an array of node or inline decorations that are
active around the node. They are automatically drawn in the
normal way, and you will usually just want to ignore this, but
they can also be used as a way to provide context information to
the node view without adding it to the document itself.

`innerDecorations` holds the decorations for the node's content.
You can safely ignore this if your view has no content or a
`contentDOM` property, since the editor will draw the decorations
on the content. But if you, for example, want to create a nested
editor with the content, it may make sense to provide it with the
inner decorations.

(For backwards compatibility reasons, [mark
views](https://prosemirror.net/docs/ref/#view.EditorProps.markViews) can also be included in this
object.)

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="scrollmargin-1" href="#scrollmargin-1">scrollMargin</a><i>?</i>: `number` \| \{ `bottom`: `number`; `left`: `number`; `right`: `number`; `top`: `number`; \}</code>

</dt>

<dd>

Determines the extra space (in pixels) that is left above or
below the cursor when it is scrolled into view. Defaults to 5.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="scrollthreshold-1" href="#scrollthreshold-1">scrollThreshold</a><i>?</i>: `number` \| \{ `bottom`: `number`; `left`: `number`; `right`: `number`; `top`: `number`; \}</code>

</dt>

<dd>

Determines the distance (in pixels) between the cursor and the
end of the visible viewport at which point, when scrolling the
cursor into view, scrolling takes place. Defaults to 0.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="transformcopied-1" href="#transformcopied-1">transformCopied</a><i>?</i>: (`this`: `P`, `slice`: [`Slice`](model.md#slice-2), `view`: [`EditorView`](#editorview)) => [`Slice`](model.md#slice-2)</code>

</dt>

<dd>

Can be used to transform copied or cut content before it is
serialized to the clipboard.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="transformpasted-1" href="#transformpasted-1">transformPasted</a><i>?</i>: (`this`: `P`, `slice`: [`Slice`](model.md#slice-2), `view`: [`EditorView`](#editorview)) => [`Slice`](model.md#slice-2)</code>

</dt>

<dd>

Can be used to transform pasted or dragged-and-dropped content
before it is applied to the document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="transformpastedhtml-1" href="#transformpastedhtml-1">transformPastedHTML</a><i>?</i>: (`this`: `P`, `html`: `string`, `view`: [`EditorView`](#editorview)) => `string`</code>

</dt>

<dd>

Can be used to transform pasted HTML text, _before_ it is parsed,
for example to clean it up.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="transformpastedtext-1" href="#transformpastedtext-1">transformPastedText</a><i>?</i>: (`this`: `P`, `text`: `string`, `plain`: `boolean`, `view`: [`EditorView`](#editorview)) => `string`</code>

</dt>

<dd>

Transform pasted plain text. The `plain` flag will be true when
the text is pasted as plain text.

</dd>

</dl>

***

### MarkView {#markview}

By default, document marks are rendered using the result of the
[`toDOM`](https://prosemirror.net/docs/ref/#model.MarkSpec.toDOM) method of their spec, and managed entirely
by the editor. For some use cases, you want more control over the behavior
of a mark's in-editor representation, and need to
[define](https://prosemirror.net/docs/ref/#view.EditorProps.markViews) a custom mark view.

Objects returned as mark views must conform to this interface.

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="contentdom" href="#contentdom">contentDOM</a><i>?</i>: `null` \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)</code>

</dt>

<dd>

The DOM node that should hold the mark's content. When this is not
present, the `dom` property is used as the content DOM.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="destroy-2" href="#destroy-2">destroy</a><i>?</i>: () => `void`</code>

</dt>

<dd>

Called when the mark view is removed from the editor or the whole
editor is destroyed.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="dom-1" href="#dom-1">dom</a>: [`Node`](https://developer.mozilla.org/docs/Web/API/Node)</code>

</dt>

<dd>

The outer DOM node that represents the document node.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="ignoremutation" href="#ignoremutation">ignoreMutation</a><i>?</i>: (`mutation`: [`ViewMutationRecord`](#viewmutationrecord)) => `boolean`</code>

</dt>

<dd>

Called when a [mutation](https://prosemirror.net/docs/ref/#view.ViewMutationRecord) happens within the
view. Return false if the editor should re-read the selection or re-parse
the range around the mutation, true if it can safely be ignored.

</dd>

</dl>

***

### NodeView {#nodeview}

By default, document nodes are rendered using the result of the
[`toDOM`](https://prosemirror.net/docs/ref/#model.NodeSpec.toDOM) method of their spec, and managed
entirely by the editor. For some use cases, such as embedded
node-specific editing interfaces, you want more control over
the behavior of a node's in-editor representation, and need to
[define](https://prosemirror.net/docs/ref/#view.EditorProps.nodeViews) a custom node view.

Objects returned as node views must conform to this interface.

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="contentdom-1" href="#contentdom-1">contentDOM</a><i>?</i>: `null` \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)</code>

</dt>

<dd>

The DOM node that should hold the node's content. Only meaningful
if the node view also defines a `dom` property and if its node
type is not a leaf node type. When this is present, ProseMirror
will take care of rendering the node's children into it. When it
is not present, the node view itself is responsible for rendering
(or deciding not to render) its child nodes.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="deselectnode" href="#deselectnode">deselectNode</a><i>?</i>: () => `void`</code>

</dt>

<dd>

When defining a `selectNode` method, you should also provide a
`deselectNode` method to remove the effect again.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="destroy-3" href="#destroy-3">destroy</a><i>?</i>: () => `void`</code>

</dt>

<dd>

Called when the node view is removed from the editor or the whole
editor is destroyed.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="dom-2" href="#dom-2">dom</a>: [`Node`](https://developer.mozilla.org/docs/Web/API/Node)</code>

</dt>

<dd>

The outer DOM node that represents the document node.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="ignoremutation-1" href="#ignoremutation-1">ignoreMutation</a><i>?</i>: (`mutation`: [`ViewMutationRecord`](#viewmutationrecord)) => `boolean`</code>

</dt>

<dd>

Called when a [mutation](https://prosemirror.net/docs/ref/#view.ViewMutationRecord) happens within the
view. Return false if the editor should re-read the selection or re-parse
the range around the mutation, true if it can safely be ignored.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="multitype" href="#multitype">multiType</a><i>?</i>: `boolean`</code>

</dt>

<dd>

By default, `update` will only be called when a node of the same
node type appears in this view's position. When you set this to
true, it will be called for any node, making it possible to have
a node view that representsmultiple types of nodes. You will
need to check the type of the nodes you get in `update` and
return `false` for types you cannot handle.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="selectnode" href="#selectnode">selectNode</a><i>?</i>: () => `void`</code>

</dt>

<dd>

Can be used to override the way the node's selected status (as a
node selection) is displayed.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="setselection" href="#setselection">setSelection</a><i>?</i>: (`anchor`: `number`, `head`: `number`, `root`: [`Document`](https://developer.mozilla.org/docs/Web/API/Document) \| [`ShadowRoot`](https://developer.mozilla.org/docs/Web/API/ShadowRoot)) => `void`</code>

</dt>

<dd>

This will be called to handle setting the selection inside the
node. The `anchor` and `head` positions are relative to the start
of the node. By default, a DOM selection will be created between
the DOM positions corresponding to those positions, but if you
override it you can do something else.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="stopevent" href="#stopevent">stopEvent</a><i>?</i>: (`event`: [`Event`](https://developer.mozilla.org/docs/Web/API/Event)) => `boolean`</code>

</dt>

<dd>

Can be used to prevent the editor view from trying to handle some
or all DOM events that bubble up from the node view. Events for
which this returns true are not handled by the editor.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="update-2" href="#update-2">update</a><i>?</i>: (`node`: [`ProseMirrorNode`](model.md#prosemirrornode), `decorations`: readonly [`Decoration`](#decoration)[], `innerDecorations`: [`DecorationSource`](#decorationsource)) => `boolean`</code>

</dt>

<dd>

When given, this will be called when the view is updating
itself. It will be given a node, an array of active decorations
around the node (which are automatically drawn, and the node
view may ignore if it isn't interested in them), and a
[decoration source](https://prosemirror.net/docs/ref/#view.DecorationSource) that represents any
decorations that apply to the content of the node (which again
may be ignored). It should return true if it was able to update
to that node, and false otherwise. If the node view has a
`contentDOM` property (or no `dom` property), updating its child
nodes will be handled by ProseMirror.

</dd>

</dl>

## Type Aliases

### DecorationAttrs {#decorationattrs}

<code data-typedoc-declaration><i></i> type <a id="decorationattrs" href="#decorationattrs">DecorationAttrs</a> = \{[`attribute`: `string`]: `undefined` \| `string`; `class?`: `string`; `nodeName?`: `string`; `style?`: `string`; \}</code>

A set of attributes to add to a decorated node. Most properties
simply directly correspond to DOM attributes of the same name,
which will be set to the property's value. These are exceptions:

#### Indexable

\[`attribute`: `string`\]: `undefined` \| `string`

Any other properties are treated as regular DOM attributes.

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="class" href="#class">class</a><i>?</i>: `string`</code>

</dt>

<dd>

A CSS class name or a space-separated set of class names to be
_added_ to the classes that the node already had.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="nodename" href="#nodename">nodeName</a><i>?</i>: `string`</code>

</dt>

<dd>

When non-null, the target node is wrapped in a DOM element of
this type (and the other attributes are applied to this element).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="style" href="#style">style</a><i>?</i>: `string`</code>

</dt>

<dd>

A string of CSS to be _added_ to the node's existing `style` property.

</dd>

</dl>

***

### MarkViewConstructor() {#markviewconstructor}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="markviewconstructor" href="#markviewconstructor">MarkViewConstructor</a> = (`mark`: [`Mark`](model.md#mark), `view`: [`EditorView`](#editorview), `inline`: `boolean`) => [`MarkView`](#markview)</code>

</dt>

<dd>

The function types [used](https://prosemirror.net/docs/ref/#view.EditorProps.markViews) to create
mark views.

</dd>

</dl>

***

### NodeViewConstructor() {#nodeviewconstructor}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="nodeviewconstructor" href="#nodeviewconstructor">NodeViewConstructor</a> = (`node`: [`ProseMirrorNode`](model.md#prosemirrornode), `view`: [`EditorView`](#editorview), `getPos`: () => `number` \| `undefined`, `decorations`: readonly [`Decoration`](#decoration)[], `innerDecorations`: [`DecorationSource`](#decorationsource)) => [`NodeView`](#nodeview)</code>

</dt>

<dd>

The type of function [provided](https://prosemirror.net/docs/ref/#view.EditorProps.nodeViews) to
create [node views](https://prosemirror.net/docs/ref/#view.NodeView).

</dd>

</dl>

***

### ViewMutationRecord {#viewmutationrecord}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="viewmutationrecord" href="#viewmutationrecord">ViewMutationRecord</a> = [`MutationRecord`](https://developer.mozilla.org/docs/Web/API/MutationRecord) \| \{ `target`: [`DOMNode`](https://prosemirror.net/docs/ref/#view.DOMNode); `type`: `"selection"`; \}</code>

</dt>

<dd>

A ViewMutationRecord represents a DOM
[mutation](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
or a selection change happens within the view. When the change is
a selection change, the record will have a `type` property of
`"selection"` (which doesn't occur for native mutation records).

</dd>

</dl>
