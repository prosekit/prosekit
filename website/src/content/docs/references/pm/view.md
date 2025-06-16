---
title: prosekit/pm/view
sidebar:
  label: pm/view
---

<!-- DEBUG memberWithGroups 1 -->

Re-exports from [prosemirror-view](https://github.com/ProseMirror/prosemirror-view).

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Classes

### Decoration {#decoration}

<!-- DEBUG memberWithGroups 1 -->

Decoration objects can be provided to the view through the
[`decorations` prop](https://prosemirror.net/docs/ref/#view.EditorProps.decorations). They come in
several variants—see the static members of this class for details.

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new Decoration(): Decoration;
```

###### Returns

[`Decoration`](#decoration)

#### Properties

##### from {#from}

```ts
readonly from: number;
```

The start position of the decoration.

##### to {#to}

```ts
readonly to: number;
```

The end position. Will be the same as `from` for [widget
decorations](https://prosemirror.net/docs/ref/#view.Decoration^widget).

#### Accessors

##### spec {#spec}

###### Get Signature

```ts
get spec(): any;
```

The spec provided when creating this decoration. Can be useful
if you've stored extra information in that object.

###### Returns

`any`

#### Methods

##### inline() {#inline}

```ts
static inline(
   from: number, 
   to: number, 
   attrs: DecorationAttrs, 
   spec?: object): Decoration;
```

Creates an inline decoration, which adds the given attributes to
each inline node between `from` and `to`.

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

`from`

</td>
<td>

`number`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`to`

</td>
<td>

`number`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`attrs`

</td>
<td>

[`DecorationAttrs`](#decorationattrs)

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`spec?`

</td>
<td>

\{ [`key`: `string`]: `any`; `inclusiveEnd?`: `boolean`; `inclusiveStart?`: `boolean`; \}

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`spec.inclusiveEnd?`

</td>
<td>

`boolean`

</td>
<td>

Determines how the right side of the decoration is mapped.
See
[`inclusiveStart`](https://prosemirror.net/docs/ref/#view.Decoration^inline^spec.inclusiveStart).

</td>
</tr>
<tr>
<td>

`spec.inclusiveStart?`

</td>
<td>

`boolean`

</td>
<td>

Determines how the left side of the decoration is
[mapped](https://prosemirror.net/docs/ref/#transform.Position_Mapping) when content is
inserted directly at that position. By default, the decoration
won't include the new content, but you can set this to `true`
to make it inclusive.

</td>
</tr>
</tbody>
</table>

###### Returns

[`Decoration`](#decoration)

##### node() {#node}

```ts
static node(
   from: number, 
   to: number, 
   attrs: DecorationAttrs, 
   spec?: any): Decoration;
```

Creates a node decoration. `from` and `to` should point precisely
before and after a node in the document. That node, and only that
node, will receive the given attributes.

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

`from`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`to`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`attrs`

</td>
<td>

[`DecorationAttrs`](#decorationattrs)

</td>
</tr>
<tr>
<td>

`spec?`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Decoration`](#decoration)

##### widget() {#widget}

```ts
static widget(
   pos: number, 
   toDOM: WidgetConstructor, 
   spec?: object): Decoration;
```

Creates a widget decoration, which is a DOM node that's shown in
the document at the given position. It is recommended that you
delay rendering the widget by passing a function that will be
called when the widget is actually drawn in a view, but you can
also directly pass a DOM node. `getPos` can be used to find the
widget's current document position.

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

`pos`

</td>
<td>

`number`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`toDOM`

</td>
<td>

[`WidgetConstructor`](https://prosemirror.net/docs/ref/#view.WidgetConstructor)

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`spec?`

</td>
<td>

\{ [`key`: `string`]: `any`; `destroy?`: (`node`: [`Node`](https://developer.mozilla.org/docs/Web/API/Node)) => `void`; `ignoreSelection?`: `boolean`; `key?`: `string`; `marks?`: readonly [`Mark`](model.md#mark)[]; `relaxedSide?`: `boolean`; `side?`: `number`; `stopEvent?`: (`event`: [`Event`](https://developer.mozilla.org/docs/Web/API/Event)) => `boolean`; \}

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`spec.destroy?`

</td>
<td>

(`node`: [`Node`](https://developer.mozilla.org/docs/Web/API/Node)) => `void`

</td>
<td>

Called when the widget decoration is removed or the editor is
destroyed.

</td>
</tr>
<tr>
<td>

`spec.ignoreSelection?`

</td>
<td>

`boolean`

</td>
<td>

When set (defaults to false), selection changes inside the
widget are ignored, and don't cause ProseMirror to try and
re-sync the selection with its selection state.

</td>
</tr>
<tr>
<td>

`spec.key?`

</td>
<td>

`string`

</td>
<td>

When comparing decorations of this type (in order to decide
whether it needs to be redrawn), ProseMirror will by default
compare the widget DOM node by identity. If you pass a key,
that key will be compared instead, which can be useful when
you generate decorations on the fly and don't want to store
and reuse DOM nodes. Make sure that any widgets with the same
key are interchangeable—if widgets differ in, for example,
the behavior of some event handler, they should get
different keys.

</td>
</tr>
<tr>
<td>

`spec.marks?`

</td>
<td>

readonly [`Mark`](model.md#mark)[]

</td>
<td>

The precise set of marks to draw around the widget.

</td>
</tr>
<tr>
<td>

`spec.relaxedSide?`

</td>
<td>

`boolean`

</td>
<td>

By default, the cursor, when at the position of the widget,
will be strictly kept on the side indicated by
[`side`](https://prosemirror.net/docs/ref/#view.Decoration^widget^spec.side). Set this to true
to allow the DOM selection to stay on the other side if the
client sets it there.

**Note**: Mapping of this decoration, which decides on which
side insertions at its position appear, will still happen
according to `side`, and keyboard cursor motion will not,
without further custom handling, visit both sides of the
widget.

</td>
</tr>
<tr>
<td>

`spec.side?`

</td>
<td>

`number`

</td>
<td>

Controls which side of the document position this widget is
associated with. When negative, it is drawn before a cursor
at its position, and content inserted at that position ends
up after the widget. When zero (the default) or positive, the
widget is drawn after the cursor and content inserted there
ends up before the widget.

When there are multiple widgets at a given position, their
`side` values determine the order in which they appear. Those
with lower values appear first. The ordering of widgets with
the same `side` value is unspecified.

When `marks` is null, `side` also determines the marks that
the widget is wrapped in—those of the node before when
negative, those of the node after when positive.

</td>
</tr>
<tr>
<td>

`spec.stopEvent?`

</td>
<td>

(`event`: [`Event`](https://developer.mozilla.org/docs/Web/API/Event)) => `boolean`

</td>
<td>

Can be used to control which DOM events, when they bubble out
of this widget, the editor view should ignore.

</td>
</tr>
</tbody>
</table>

###### Returns

[`Decoration`](#decoration)

<!-- DEBUG memberWithGroups 10 -->

***

### DecorationSet {#decorationset}

<!-- DEBUG memberWithGroups 1 -->

A collection of [decorations](https://prosemirror.net/docs/ref/#view.Decoration), organized in such
a way that the drawing algorithm can efficiently use and compare
them. This is a persistent data structure—it is not modified,
updates create a new value.

<!-- DEBUG memberWithGroups 4 -->

#### Implements

- [`DecorationSource`](#decorationsource)

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new DecorationSet(): DecorationSet;
```

###### Returns

[`DecorationSet`](#decorationset)

#### Properties

##### empty {#empty}

```ts
static empty: DecorationSet;
```

The empty set of decorations.

#### Methods

##### add() {#add}

```ts
add(doc: ProseMirrorNode, decorations: Decoration[]): DecorationSet;
```

Add the given array of decorations to the ones in the set,
producing a new set. Consumes the `decorations` array. Needs
access to the current document to create the appropriate tree
structure.

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

`decorations`

</td>
<td>

[`Decoration`](#decoration)[]

</td>
</tr>
</tbody>
</table>

###### Returns

[`DecorationSet`](#decorationset)

##### find() {#find}

```ts
find(
   start?: number, 
   end?: number, 
   predicate?: (spec: any) => boolean): Decoration[];
```

Find all decorations in this set which touch the given range
(including decorations that start or end directly at the
boundaries) and match the given predicate on their spec. When
`start` and `end` are omitted, all decorations in the set are
considered. When `predicate` isn't given, all decorations are
assumed to match.

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

`start?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`end?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`predicate?`

</td>
<td>

(`spec`: `any`) => `boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Decoration`](#decoration)[]

##### forChild() {#forchild}

```ts
forChild(offset: number, node: ProseMirrorNode): 
  | DecorationSet
  | DecorationGroup;
```

Extract a DecorationSource containing decorations for the given child node at the given offset.

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

`offset`

</td>
<td>

`number`

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

  \| [`DecorationSet`](#decorationset)
  \| [`DecorationGroup`](https://prosemirror.net/docs/ref/#view.DecorationGroup)

###### Implementation of

[`DecorationSource`](#decorationsource).[`forChild`](#forchild-2)

##### forEachSet() {#foreachset}

```ts
forEachSet(f: (set: DecorationSet) => void): void;
```

Call the given function for each decoration set in the group.

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

`f`

</td>
<td>

(`set`: [`DecorationSet`](#decorationset)) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Implementation of

[`DecorationSource`](#decorationsource).[`forEachSet`](#foreachset-2)

##### map() {#map}

```ts
map(
   mapping: Mapping, 
   doc: ProseMirrorNode, 
   options?: object): DecorationSet;
```

Map the set of decorations in response to a change in the
document.

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

`mapping`

</td>
<td>

[`Mapping`](transform.md#mapping)

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`doc`

</td>
<td>

[`ProseMirrorNode`](model.md#prosemirrornode)

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `onRemove?`: (`decorationSpec`: `any`) => `void`; \}

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`options.onRemove?`

</td>
<td>

(`decorationSpec`: `any`) => `void`

</td>
<td>

When given, this function will be called for each decoration
that gets dropped as a result of the mapping, passing the
spec of that decoration.

</td>
</tr>
</tbody>
</table>

###### Returns

[`DecorationSet`](#decorationset)

###### Implementation of

[`DecorationSource`](#decorationsource).[`map`](#map-2)

##### remove() {#remove}

```ts
remove(decorations: Decoration[]): DecorationSet;
```

Create a new set that contains the decorations in this set, minus
the ones in the given array.

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

`decorations`

</td>
<td>

[`Decoration`](#decoration)[]

</td>
</tr>
</tbody>
</table>

###### Returns

[`DecorationSet`](#decorationset)

##### create() {#create}

```ts
static create(doc: ProseMirrorNode, decorations: Decoration[]): DecorationSet;
```

Create a set of decorations, using the structure of the given
document. This will consume (modify) the `decorations` array, so
you must make a copy if you want need to preserve that.

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

`decorations`

</td>
<td>

[`Decoration`](#decoration)[]

</td>
</tr>
</tbody>
</table>

###### Returns

[`DecorationSet`](#decorationset)

<!-- DEBUG memberWithGroups 10 -->

***

### EditorView {#editorview}

<!-- DEBUG memberWithGroups 1 -->

An editor view manages the DOM structure that represents an
editable document. Its state and behavior are determined by its
[props](https://prosemirror.net/docs/ref/#view.DirectEditorProps).

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new EditorView(place: 
  | null
  | Node
  | (editor: HTMLElement) => void
  | {
  mount: HTMLElement;
}, props: DirectEditorProps): EditorView;
```

Create a view. `place` may be a DOM node that the editor should
be appended to, a function that will place it into the document,
or an object whose `mount` property holds the node to use as the
document container. If it is `null`, the editor will not be
added to the document.

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

`place`

</td>
<td>

 \| `null` \| [`Node`](https://developer.mozilla.org/docs/Web/API/Node) \| (`editor`: [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)) => `void` \| \{ `mount`: [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement); \}

</td>
</tr>
<tr>
<td>

`props`

</td>
<td>

[`DirectEditorProps`](#directeditorprops)

</td>
</tr>
</tbody>
</table>

###### Returns

[`EditorView`](#editorview)

#### Properties

##### dispatch() {#dispatch}

```ts
dispatch: (tr: Transaction) => void;
```

Dispatch a transaction. Will call
[`dispatchTransaction`](https://prosemirror.net/docs/ref/#view.DirectEditorProps.dispatchTransaction)
when given, and otherwise defaults to applying the transaction to
the current state and calling
[`updateState`](https://prosemirror.net/docs/ref/#view.EditorView.updateState) with the result.
This method is bound to the view instance, so that it can be
easily passed around.

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

[`Transaction`](state.md#transaction)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### dom {#dom}

```ts
readonly dom: HTMLElement;
```

An editable DOM node containing the document. (You probably
should not directly interfere with its content.)

##### dragging {#dragging}

```ts
dragging: 
  | null
  | {
  move: boolean;
  slice: Slice;
};
```

When editor content is being dragged, this object contains
information about the dragged slice and whether it is being
copied or moved. At any other time, it is null.

##### editable {#editable}

```ts
editable: boolean;
```

Indicates whether the editor is currently [editable](https://prosemirror.net/docs/ref/#view.EditorProps.editable).

##### state {#state}

```ts
state: EditorState;
```

The view's current [state](https://prosemirror.net/docs/ref/#state.EditorState).

#### Accessors

##### composing {#composing}

###### Get Signature

```ts
get composing(): boolean;
```

Holds `true` when a
[composition](https://w3c.github.io/uievents/#events-compositionevents)
is active.

###### Returns

`boolean`

##### isDestroyed {#isdestroyed}

###### Get Signature

```ts
get isDestroyed(): boolean;
```

This is true when the view has been
[destroyed](https://prosemirror.net/docs/ref/#view.EditorView.destroy) (and thus should not be
used anymore).

###### Returns

`boolean`

##### props {#props}

###### Get Signature

```ts
get props(): DirectEditorProps;
```

The view's current [props](https://prosemirror.net/docs/ref/#view.EditorProps).

###### Returns

[`DirectEditorProps`](#directeditorprops)

##### root {#root}

###### Get Signature

```ts
get root(): 
  | Document
  | ShadowRoot;
```

Get the document root in which the editor exists. This will
usually be the top-level `document`, but might be a [shadow
DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)
root if the editor is inside one.

###### Returns

  \| [`Document`](https://developer.mozilla.org/docs/Web/API/Document)
  \| [`ShadowRoot`](https://developer.mozilla.org/docs/Web/API/ShadowRoot)

#### Methods

##### coordsAtPos() {#coordsatpos}

```ts
coordsAtPos(pos: number, side?: number): object;
```

Returns the viewport rectangle at a given document position.
`left` and `right` will be the same number, as this returns a
flat cursor-ish rectangle. If the position is between two things
that aren't directly adjacent, `side` determines which element
is used. When < 0, the element before the position is used,
otherwise the element after.

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

`pos`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`side?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`object`

###### bottom

```ts
bottom: number;
```

###### left

```ts
left: number;
```

###### right

```ts
right: number;
```

###### top

```ts
top: number;
```

##### destroy() {#destroy}

```ts
destroy(): void;
```

Removes the editor from the DOM and destroys all [node
views](https://prosemirror.net/docs/ref/#view.NodeView).

###### Returns

`void`

##### dispatchEvent() {#dispatchevent}

```ts
dispatchEvent(event: Event): void;
```

Used for testing.

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

`event`

</td>
<td>

[`Event`](https://developer.mozilla.org/docs/Web/API/Event)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### domAtPos() {#domatpos}

```ts
domAtPos(pos: number, side?: number): object;
```

Find the DOM position that corresponds to the given document
position. When `side` is negative, find the position as close as
possible to the content before the position. When positive,
prefer positions close to the content after the position. When
zero, prefer as shallow a position as possible.

Note that you should **not** mutate the editor's internal DOM,
only inspect it (and even that is usually not necessary).

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

`pos`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`side?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`object`

###### node

```ts
node: Node;
```

###### offset

```ts
offset: number;
```

##### endOfTextblock() {#endoftextblock}

```ts
endOfTextblock(dir: "up" | "down" | "left" | "right" | "forward" | "backward", state?: EditorState): boolean;
```

Find out whether the selection is at the end of a textblock when
moving in a given direction. When, for example, given `"left"`,
it will return true if moving left from the current cursor
position would leave that position's parent textblock. Will apply
to the view's current state by default, but it is possible to
pass a different state.

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

`dir`

</td>
<td>

`"up"` \| `"down"` \| `"left"` \| `"right"` \| `"forward"` \| `"backward"`

</td>
</tr>
<tr>
<td>

`state?`

</td>
<td>

[`EditorState`](state.md#editorstate)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### focus() {#focus}

```ts
focus(): void;
```

Focus the editor.

###### Returns

`void`

##### hasFocus() {#hasfocus}

```ts
hasFocus(): boolean;
```

Query whether the view has focus.

###### Returns

`boolean`

##### nodeDOM() {#nodedom}

```ts
nodeDOM(pos: number): null | Node;
```

Find the DOM node that represents the document node after the
given position. May return `null` when the position doesn't point
in front of a node or if the node is inside an opaque node view.

This is intended to be able to call things like
`getBoundingClientRect` on that DOM node. Do **not** mutate the
editor DOM directly, or add styling this way, since that will be
immediately overriden by the editor as it redraws the node.

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

`pos`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`Node`](https://developer.mozilla.org/docs/Web/API/Node)

##### pasteHTML() {#pastehtml}

```ts
pasteHTML(html: string, event?: ClipboardEvent): boolean;
```

Run the editor's paste logic with the given HTML string. The
`event`, if given, will be passed to the
[`handlePaste`](https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste) hook.

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

`html`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`event?`

</td>
<td>

[`ClipboardEvent`](https://developer.mozilla.org/docs/Web/API/ClipboardEvent)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### pasteText() {#pastetext}

```ts
pasteText(text: string, event?: ClipboardEvent): boolean;
```

Run the editor's paste logic with the given plain-text input.

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

`event?`

</td>
<td>

[`ClipboardEvent`](https://developer.mozilla.org/docs/Web/API/ClipboardEvent)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### posAtCoords() {#posatcoords}

```ts
posAtCoords(coords: object): 
  | null
  | {
  inside: number;
  pos: number;
};
```

Given a pair of viewport coordinates, return the document
position that corresponds to them. May return null if the given
coordinates aren't inside of the editor. When an object is
returned, its `pos` property is the position nearest to the
coordinates, and its `inside` property holds the position of the
inner node that the position falls inside of, or -1 if it is at
the top level, not in any node.

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

`coords`

</td>
<td>

\{ `left`: `number`; `top`: `number`; \}

</td>
</tr>
<tr>
<td>

`coords.left`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`coords.top`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| `null`
  \| \{
  `inside`: `number`;
  `pos`: `number`;
\}

##### posAtDOM() {#posatdom}

```ts
posAtDOM(
   node: Node, 
   offset: number, 
   bias?: number): number;
```

Find the document position that corresponds to a given DOM
position. (Whenever possible, it is preferable to inspect the
document structure directly, rather than poking around in the
DOM, but sometimes—for example when interpreting an event
target—you don't have a choice.)

The `bias` parameter can be used to influence which side of a DOM
node to use when the position is inside a leaf node.

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

[`Node`](https://developer.mozilla.org/docs/Web/API/Node)

</td>
</tr>
<tr>
<td>

`offset`

</td>
<td>

`number`

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

`number`

##### serializeForClipboard() {#serializeforclipboard}

```ts
serializeForClipboard(slice: Slice): object;
```

Serialize the given slice as it would be if it was copied from
this editor. Returns a DOM element that contains a
representation of the slice as its children, a textual
representation, and the transformed slice (which can be
different from the given input due to hooks like
[`transformCopied`](https://prosemirror.net/docs/ref/#view.EditorProps.transformCopied)).

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

`object`

###### dom

```ts
dom: HTMLElement;
```

###### slice

```ts
slice: Slice;
```

###### text

```ts
text: string;
```

##### setProps() {#setprops}

```ts
setProps(props: Partial<DirectEditorProps>): void;
```

Update the view by updating existing props object with the object
given as argument. Equivalent to `view.update(Object.assign({},
view.props, props))`.

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

`props`

</td>
<td>

[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`DirectEditorProps`](#directeditorprops)\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### someProp() {#someprop}

###### Call Signature

```ts
someProp<PropName, Result>(propName: PropName, f: (value: NonNullable<EditorProps<any>[PropName]>) => Result): undefined | Result;
```

Goes over the values of a prop, first those provided directly,
then those from plugins given to the view, then from plugins in
the state (in order), and calls `f` every time a non-undefined
value is found. When `f` returns a truthy value, that is
immediately returned. When `f` isn't provided, it is treated as
the identity function (the prop value is returned directly).

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`PropName` *extends* keyof [`EditorProps`](#editorprops)\<`any`\>

</td>
</tr>
<tr>
<td>

`Result`

</td>
</tr>
</tbody>
</table>

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

`propName`

</td>
<td>

`PropName`

</td>
</tr>
<tr>
<td>

`f`

</td>
<td>

(`value`: [`NonNullable`](https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype)\<[`EditorProps`](#editorprops)\<`any`\>\[`PropName`\]\>) => `Result`

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined` \| `Result`

###### Call Signature

```ts
someProp<PropName>(propName: PropName): 
  | undefined
| NonNullable<EditorProps<any>[PropName]>;
```

Goes over the values of a prop, first those provided directly,
then those from plugins given to the view, then from plugins in
the state (in order), and calls `f` every time a non-undefined
value is found. When `f` returns a truthy value, that is
immediately returned. When `f` isn't provided, it is treated as
the identity function (the prop value is returned directly).

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`PropName` *extends* keyof [`EditorProps`](#editorprops)\<`any`\>

</td>
</tr>
</tbody>
</table>

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

`propName`

</td>
<td>

`PropName`

</td>
</tr>
</tbody>
</table>

###### Returns

  \| `undefined`
  \| [`NonNullable`](https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype)\<[`EditorProps`](#editorprops)\<`any`\>\[`PropName`\]\>

##### update() {#update}

```ts
update(props: DirectEditorProps): void;
```

Update the view's props. Will immediately cause an update to
the DOM.

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

`props`

</td>
<td>

[`DirectEditorProps`](#directeditorprops)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### updateRoot() {#updateroot}

```ts
updateRoot(): void;
```

When an existing editor view is moved to a new document or
shadow tree, call this to make it recompute its root.

###### Returns

`void`

##### updateState() {#updatestate}

```ts
updateState(state: EditorState): void;
```

Update the editor's `state` prop, without touching any of the
other props.

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

[`EditorState`](state.md#editorstate)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

<!-- DEBUG memberWithGroups 10 -->

## Interfaces

### DecorationSource {#decorationsource}

<!-- DEBUG memberWithGroups 1 -->

An object that can [provide](https://prosemirror.net/docs/ref/#view.EditorProps.decorations)
decorations. Implemented by [`DecorationSet`](https://prosemirror.net/docs/ref/#view.DecorationSet),
and passed to [node views](https://prosemirror.net/docs/ref/#view.EditorProps.nodeViews).

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### map() {#map-2}

```ts
map: (mapping: Mapping, node: ProseMirrorNode) => DecorationSource;
```

Map the set of decorations in response to a change in the
document.

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

`mapping`

</td>
<td>

[`Mapping`](transform.md#mapping)

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

[`DecorationSource`](#decorationsource)

#### Methods

##### forChild() {#forchild-2}

```ts
forChild(offset: number, child: ProseMirrorNode): DecorationSource;
```

Extract a DecorationSource containing decorations for the given child node at the given offset.

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

`offset`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`child`

</td>
<td>

[`ProseMirrorNode`](model.md#prosemirrornode)

</td>
</tr>
</tbody>
</table>

###### Returns

[`DecorationSource`](#decorationsource)

##### forEachSet() {#foreachset-2}

```ts
forEachSet(f: (set: DecorationSet) => void): void;
```

Call the given function for each decoration set in the group.

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

`f`

</td>
<td>

(`set`: [`DecorationSet`](#decorationset)) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

<!-- DEBUG memberWithGroups 10 -->

***

### DirectEditorProps {#directeditorprops}

<!-- DEBUG memberWithGroups 1 -->

The props object given directly to the editor view supports some
fields that can't be used in plugins:

#### Extends

- [`EditorProps`](#editorprops)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### attributes? {#attributes}

```ts
optional attributes: 
  | {
[name: string]: string;
}
  | (state: EditorState) => object;
```

Control the DOM attributes of the editable element. May be either
an object or a function going from an editor state to an object.
By default, the element will get a class `"ProseMirror"`, and
will have its `contentEditable` attribute determined by the
[`editable` prop](https://prosemirror.net/docs/ref/#view.EditorProps.editable). Additional classes
provided here will be added to the class. For other attributes,
the value provided first (as in
[`someProp`](https://prosemirror.net/docs/ref/#view.EditorView.someProp)) will be used.

###### Inherited from

[`EditorProps`](#editorprops).[`attributes`](#attributes-1)

##### clipboardParser? {#clipboardparser}

```ts
optional clipboardParser: DOMParser;
```

The [parser](https://prosemirror.net/docs/ref/#model.DOMParser) to use when reading content from
the clipboard. When not given, the value of the
[`domParser`](https://prosemirror.net/docs/ref/#view.EditorProps.domParser) prop is used.

###### Inherited from

[`EditorProps`](#editorprops).[`clipboardParser`](#clipboardparser-1)

##### clipboardSerializer? {#clipboardserializer}

```ts
optional clipboardSerializer: DOMSerializer;
```

The DOM serializer to use when putting content onto the
clipboard. If not given, the result of
[`DOMSerializer.fromSchema`](https://prosemirror.net/docs/ref/#model.DOMSerializer^fromSchema)
will be used. This object will only have its
[`serializeFragment`](https://prosemirror.net/docs/ref/#model.DOMSerializer.serializeFragment)
method called, and you may provide an alternative object type
implementing a compatible method.

###### Inherited from

[`EditorProps`](#editorprops).[`clipboardSerializer`](#clipboardserializer-1)

##### clipboardTextParser()? {#clipboardtextparser}

```ts
optional clipboardTextParser: (this: any, text: string, $context: ResolvedPos, plain: boolean, view: EditorView) => Slice;
```

A function to parse text from the clipboard into a document
slice. Called after
[`transformPastedText`](https://prosemirror.net/docs/ref/#view.EditorProps.transformPastedText).
The default behavior is to split the text into lines, wrap them
in `<p>` tags, and call
[`clipboardParser`](https://prosemirror.net/docs/ref/#view.EditorProps.clipboardParser) on it.
The `plain` flag will be true when the text is pasted as plain text.

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

`this`

</td>
<td>

`any`

</td>
</tr>
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

`$context`

</td>
<td>

[`ResolvedPos`](model.md#resolvedpos)

</td>
</tr>
<tr>
<td>

`plain`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Slice`](model.md#slice-2)

###### Inherited from

[`EditorProps`](#editorprops).[`clipboardTextParser`](#clipboardtextparser-1)

##### clipboardTextSerializer()? {#clipboardtextserializer}

```ts
optional clipboardTextSerializer: (this: any, content: Slice, view: EditorView) => string;
```

A function that will be called to get the text for the current
selection when copying text to the clipboard. By default, the
editor will use [`textBetween`](https://prosemirror.net/docs/ref/#model.Node.textBetween) on the
selected range.

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

`this`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`content`

</td>
<td>

[`Slice`](model.md#slice-2)

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

###### Inherited from

[`EditorProps`](#editorprops).[`clipboardTextSerializer`](#clipboardtextserializer-1)

##### createSelectionBetween()? {#createselectionbetween}

```ts
optional createSelectionBetween: (this: any, view: EditorView, anchor: ResolvedPos, head: ResolvedPos) => null | Selection;
```

Can be used to override the way a selection is created when
reading a DOM selection between the given anchor and head.

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

`this`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`anchor`

</td>
<td>

[`ResolvedPos`](model.md#resolvedpos)

</td>
</tr>
<tr>
<td>

`head`

</td>
<td>

[`ResolvedPos`](model.md#resolvedpos)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`Selection`](state.md#selection-1)

###### Inherited from

[`EditorProps`](#editorprops).[`createSelectionBetween`](#createselectionbetween-1)

##### decorations()? {#decorations}

```ts
optional decorations: (this: any, state: EditorState) => undefined | null | DecorationSource;
```

A set of [document decorations](https://prosemirror.net/docs/ref/#view.Decoration) to show in the
view.

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

`this`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`state`

</td>
<td>

[`EditorState`](state.md#editorstate)

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined` \| `null` \| [`DecorationSource`](#decorationsource)

###### Inherited from

[`EditorProps`](#editorprops).[`decorations`](#decorations-1)

##### dispatchTransaction()? {#dispatchtransaction}

```ts
optional dispatchTransaction: (tr: Transaction) => void;
```

The callback over which to send transactions (state updates)
produced by the view. If you specify this, you probably want to
make sure this ends up calling the view's
[`updateState`](https://prosemirror.net/docs/ref/#view.EditorView.updateState) method with a new
state that has the transaction
[applied](https://prosemirror.net/docs/ref/#state.EditorState.apply). The callback will be bound to have
the view instance as its `this` binding.

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

[`Transaction`](state.md#transaction)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### domParser? {#domparser}

```ts
optional domParser: DOMParser;
```

The [parser](https://prosemirror.net/docs/ref/#model.DOMParser) to use when reading editor changes
from the DOM. Defaults to calling
[`DOMParser.fromSchema`](https://prosemirror.net/docs/ref/#model.DOMParser^fromSchema) on the
editor's schema.

###### Inherited from

[`EditorProps`](#editorprops).[`domParser`](#domparser-1)

##### dragCopies()? {#dragcopies}

```ts
optional dragCopies: (event: DragEvent) => boolean;
```

Determines whether an in-editor drag event should copy or move
the selection. When not given, the event's `altKey` property is
used on macOS, `ctrlKey` on other platforms.

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

`event`

</td>
<td>

[`DragEvent`](https://developer.mozilla.org/docs/Web/API/DragEvent)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

[`EditorProps`](#editorprops).[`dragCopies`](#dragcopies-1)

##### editable()? {#editable-1}

```ts
optional editable: (this: any, state: EditorState) => boolean;
```

When this returns false, the content of the view is not directly
editable.

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

`this`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`state`

</td>
<td>

[`EditorState`](state.md#editorstate)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

[`EditorProps`](#editorprops).[`editable`](#editable-2)

##### handleClick()? {#handleclick}

```ts
optional handleClick: (this: any, view: EditorView, pos: number, event: MouseEvent) => boolean | void;
```

Called when the editor is clicked, after `handleClickOn` handlers
have been called.

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

`this`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`pos`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `void`

###### Inherited from

[`EditorProps`](#editorprops).[`handleClick`](#handleclick-1)

##### handleClickOn()? {#handleclickon}

```ts
optional handleClickOn: (this: any, view: EditorView, pos: number, node: ProseMirrorNode, nodePos: number, event: MouseEvent, direct: boolean) => boolean | void;
```

Called for each node around a click, from the inside out. The
`direct` flag will be true for the inner node.

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

`this`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`pos`

</td>
<td>

`number`

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
<tr>
<td>

`nodePos`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)

</td>
</tr>
<tr>
<td>

`direct`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `void`

###### Inherited from

[`EditorProps`](#editorprops).[`handleClickOn`](#handleclickon-1)

##### handleDOMEvents? {#handledomevents}

```ts
optional handleDOMEvents: object;
```

Can be an object mapping DOM event type names to functions that
handle them. Such functions will be called before any handling
ProseMirror does of events fired on the editable DOM element.
Contrary to the other event handling props, when returning true
from such a function, you are responsible for calling
`preventDefault` yourself (or not, if you want to allow the
default behavior).

###### Index Signature

```ts
[key: string]: 
  | undefined
  | (this: any, view: EditorView, event: any) => boolean | void
```

###### aria-ui/context-provider()?

```ts
optional aria-ui/context-provider: (this: any, view: EditorView, event: ContextProviderEvent) => boolean | void;
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

`this`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

`ContextProviderEvent`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `void`

###### aria-ui/context-request()?

```ts
optional aria-ui/context-request: (this: any, view: EditorView, event: ContextRequestEvent<unknown>) => boolean | void;
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

`this`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

`ContextRequestEvent`\<`unknown`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `void`

###### Inherited from

[`EditorProps`](#editorprops).[`handleDOMEvents`](#handledomevents-1)

##### handleDoubleClick()? {#handledoubleclick}

```ts
optional handleDoubleClick: (this: any, view: EditorView, pos: number, event: MouseEvent) => boolean | void;
```

Called when the editor is double-clicked, after `handleDoubleClickOn`.

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

`this`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`pos`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `void`

###### Inherited from

[`EditorProps`](#editorprops).[`handleDoubleClick`](#handledoubleclick-1)

##### handleDoubleClickOn()? {#handledoubleclickon}

```ts
optional handleDoubleClickOn: (this: any, view: EditorView, pos: number, node: ProseMirrorNode, nodePos: number, event: MouseEvent, direct: boolean) => boolean | void;
```

Called for each node around a double click.

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

`this`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`pos`

</td>
<td>

`number`

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
<tr>
<td>

`nodePos`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)

</td>
</tr>
<tr>
<td>

`direct`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `void`

###### Inherited from

[`EditorProps`](#editorprops).[`handleDoubleClickOn`](#handledoubleclickon-1)

##### handleDrop()? {#handledrop}

```ts
optional handleDrop: (this: any, view: EditorView, event: DragEvent, slice: Slice, moved: boolean) => boolean | void;
```

Called when something is dropped on the editor. `moved` will be
true if this drop moves from the current selection (which should
thus be deleted).

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

`this`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`DragEvent`](https://developer.mozilla.org/docs/Web/API/DragEvent)

</td>
</tr>
<tr>
<td>

`slice`

</td>
<td>

[`Slice`](model.md#slice-2)

</td>
</tr>
<tr>
<td>

`moved`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `void`

###### Inherited from

[`EditorProps`](#editorprops).[`handleDrop`](#handledrop-1)

##### handleKeyDown()? {#handlekeydown}

```ts
optional handleKeyDown: (this: any, view: EditorView, event: KeyboardEvent) => boolean | void;
```

Called when the editor receives a `keydown` event.

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

`this`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`KeyboardEvent`](https://developer.mozilla.org/docs/Web/API/KeyboardEvent)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `void`

###### Inherited from

[`EditorProps`](#editorprops).[`handleKeyDown`](#handlekeydown-1)

##### handleKeyPress()? {#handlekeypress}

```ts
optional handleKeyPress: (this: any, view: EditorView, event: KeyboardEvent) => boolean | void;
```

Handler for `keypress` events.

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

`this`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`KeyboardEvent`](https://developer.mozilla.org/docs/Web/API/KeyboardEvent)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `void`

###### Inherited from

[`EditorProps`](#editorprops).[`handleKeyPress`](#handlekeypress-1)

##### handlePaste()? {#handlepaste}

```ts
optional handlePaste: (this: any, view: EditorView, event: ClipboardEvent, slice: Slice) => boolean | void;
```

Can be used to override the behavior of pasting. `slice` is the
pasted content parsed by the editor, but you can directly access
the event to get at the raw content.

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

`this`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`ClipboardEvent`](https://developer.mozilla.org/docs/Web/API/ClipboardEvent)

</td>
</tr>
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

`boolean` \| `void`

###### Inherited from

[`EditorProps`](#editorprops).[`handlePaste`](#handlepaste-1)

##### handleScrollToSelection()? {#handlescrolltoselection}

```ts
optional handleScrollToSelection: (this: any, view: EditorView) => boolean;
```

Called when the view, after updating its state, tries to scroll
the selection into view. A handler function may return false to
indicate that it did not handle the scrolling and further
handlers or the default behavior should be tried.

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

`this`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Inherited from

[`EditorProps`](#editorprops).[`handleScrollToSelection`](#handlescrolltoselection-1)

##### handleTextInput()? {#handletextinput}

```ts
optional handleTextInput: (this: any, view: EditorView, from: number, to: number, text: string, deflt: () => Transaction) => boolean | void;
```

Whenever the user directly input text, this handler is called
before the input is applied. If it returns `true`, the default
behavior of actually inserting the text is suppressed.

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

`this`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

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
<tr>
<td>

`to`

</td>
<td>

`number`

</td>
</tr>
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

`deflt`

</td>
<td>

() => [`Transaction`](state.md#transaction)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `void`

###### Inherited from

[`EditorProps`](#editorprops).[`handleTextInput`](#handletextinput-1)

##### handleTripleClick()? {#handletripleclick}

```ts
optional handleTripleClick: (this: any, view: EditorView, pos: number, event: MouseEvent) => boolean | void;
```

Called when the editor is triple-clicked, after `handleTripleClickOn`.

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

`this`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`pos`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `void`

###### Inherited from

[`EditorProps`](#editorprops).[`handleTripleClick`](#handletripleclick-1)

##### handleTripleClickOn()? {#handletripleclickon}

```ts
optional handleTripleClickOn: (this: any, view: EditorView, pos: number, node: ProseMirrorNode, nodePos: number, event: MouseEvent, direct: boolean) => boolean | void;
```

Called for each node around a triple click.

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

`this`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`pos`

</td>
<td>

`number`

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
<tr>
<td>

`nodePos`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)

</td>
</tr>
<tr>
<td>

`direct`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `void`

###### Inherited from

[`EditorProps`](#editorprops).[`handleTripleClickOn`](#handletripleclickon-1)

##### markViews? {#markviews}

```ts
optional markViews: object;
```

Pass custom mark rendering functions. Note that these cannot
provide the kind of dynamic behavior that [node
views](https://prosemirror.net/docs/ref/#view.NodeView) can—they just provide custom rendering
logic. The third argument indicates whether the mark's content
is inline.

###### Index Signature

```ts
[mark: string]: MarkViewConstructor
```

###### Inherited from

[`EditorProps`](#editorprops).[`markViews`](#markviews-1)

##### nodeViews? {#nodeviews}

```ts
optional nodeViews: object;
```

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

###### Index Signature

```ts
[node: string]: NodeViewConstructor
```

###### Inherited from

[`EditorProps`](#editorprops).[`nodeViews`](#nodeviews-1)

##### plugins? {#plugins}

```ts
optional plugins: readonly ProseMirrorPlugin<any>[];
```

A set of plugins to use in the view, applying their [plugin
view](https://prosemirror.net/docs/ref/#state.PluginSpec.view) and
[props](https://prosemirror.net/docs/ref/#state.PluginSpec.props). Passing plugins with a state
component (a [state field](https://prosemirror.net/docs/ref/#state.PluginSpec.state) field or a
[transaction](https://prosemirror.net/docs/ref/#state.PluginSpec.filterTransaction) filter or
appender) will result in an error, since such plugins must be
present in the state to work.

##### scrollMargin? {#scrollmargin}

```ts
optional scrollMargin: 
  | number
  | {
  bottom: number;
  left: number;
  right: number;
  top: number;
};
```

Determines the extra space (in pixels) that is left above or
below the cursor when it is scrolled into view. Defaults to 5.

###### Inherited from

[`EditorProps`](#editorprops).[`scrollMargin`](#scrollmargin-1)

##### scrollThreshold? {#scrollthreshold}

```ts
optional scrollThreshold: 
  | number
  | {
  bottom: number;
  left: number;
  right: number;
  top: number;
};
```

Determines the distance (in pixels) between the cursor and the
end of the visible viewport at which point, when scrolling the
cursor into view, scrolling takes place. Defaults to 0.

###### Inherited from

[`EditorProps`](#editorprops).[`scrollThreshold`](#scrollthreshold-1)

##### state {#state-1}

```ts
state: EditorState;
```

The current state of the editor.

##### transformCopied()? {#transformcopied}

```ts
optional transformCopied: (this: any, slice: Slice, view: EditorView) => Slice;
```

Can be used to transform copied or cut content before it is
serialized to the clipboard.

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

`this`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`slice`

</td>
<td>

[`Slice`](model.md#slice-2)

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Slice`](model.md#slice-2)

###### Inherited from

[`EditorProps`](#editorprops).[`transformCopied`](#transformcopied-1)

##### transformPasted()? {#transformpasted}

```ts
optional transformPasted: (this: any, slice: Slice, view: EditorView) => Slice;
```

Can be used to transform pasted or dragged-and-dropped content
before it is applied to the document.

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

`this`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`slice`

</td>
<td>

[`Slice`](model.md#slice-2)

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Slice`](model.md#slice-2)

###### Inherited from

[`EditorProps`](#editorprops).[`transformPasted`](#transformpasted-1)

##### transformPastedHTML()? {#transformpastedhtml}

```ts
optional transformPastedHTML: (this: any, html: string, view: EditorView) => string;
```

Can be used to transform pasted HTML text, _before_ it is parsed,
for example to clean it up.

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

`this`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`html`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

###### Inherited from

[`EditorProps`](#editorprops).[`transformPastedHTML`](#transformpastedhtml-1)

##### transformPastedText()? {#transformpastedtext}

```ts
optional transformPastedText: (this: any, text: string, plain: boolean, view: EditorView) => string;
```

Transform pasted plain text. The `plain` flag will be true when
the text is pasted as plain text.

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

`this`

</td>
<td>

`any`

</td>
</tr>
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

`plain`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

###### Inherited from

[`EditorProps`](#editorprops).[`transformPastedText`](#transformpastedtext-1)

<!-- DEBUG memberWithGroups 10 -->

***

### DOMEventMap {#domeventmap}

<!-- DEBUG memberWithGroups 1 -->

Helper type that maps event names to event object types, but
includes events that TypeScript's HTMLElementEventMap doesn't know
about.

#### Extends

- `HTMLElementEventMap`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

#### Indexable

```ts
[event: string]: any
```

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### aria-ui/context-provider {#aria-uicontext-provider}

```ts
aria-ui/context-provider: ContextProviderEvent;
```

###### Inherited from

```ts
HTMLElementEventMap.aria-ui/context-provider
```

##### aria-ui/context-request {#aria-uicontext-request}

```ts
aria-ui/context-request: ContextRequestEvent<unknown>;
```

###### Inherited from

```ts
HTMLElementEventMap.aria-ui/context-request
```

<!-- DEBUG memberWithGroups 10 -->

***

### EditorProps\<P\> {#editorprops}

<!-- DEBUG memberWithGroups 1 -->

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

`P`

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

#### Properties

##### attributes? {#attributes-1}

```ts
optional attributes: 
  | {
[name: string]: string;
}
  | (state: EditorState) => object;
```

Control the DOM attributes of the editable element. May be either
an object or a function going from an editor state to an object.
By default, the element will get a class `"ProseMirror"`, and
will have its `contentEditable` attribute determined by the
[`editable` prop](https://prosemirror.net/docs/ref/#view.EditorProps.editable). Additional classes
provided here will be added to the class. For other attributes,
the value provided first (as in
[`someProp`](https://prosemirror.net/docs/ref/#view.EditorView.someProp)) will be used.

##### clipboardParser? {#clipboardparser-1}

```ts
optional clipboardParser: DOMParser;
```

The [parser](https://prosemirror.net/docs/ref/#model.DOMParser) to use when reading content from
the clipboard. When not given, the value of the
[`domParser`](https://prosemirror.net/docs/ref/#view.EditorProps.domParser) prop is used.

##### clipboardSerializer? {#clipboardserializer-1}

```ts
optional clipboardSerializer: DOMSerializer;
```

The DOM serializer to use when putting content onto the
clipboard. If not given, the result of
[`DOMSerializer.fromSchema`](https://prosemirror.net/docs/ref/#model.DOMSerializer^fromSchema)
will be used. This object will only have its
[`serializeFragment`](https://prosemirror.net/docs/ref/#model.DOMSerializer.serializeFragment)
method called, and you may provide an alternative object type
implementing a compatible method.

##### clipboardTextParser()? {#clipboardtextparser-1}

```ts
optional clipboardTextParser: (this: P, text: string, $context: ResolvedPos, plain: boolean, view: EditorView) => Slice;
```

A function to parse text from the clipboard into a document
slice. Called after
[`transformPastedText`](https://prosemirror.net/docs/ref/#view.EditorProps.transformPastedText).
The default behavior is to split the text into lines, wrap them
in `<p>` tags, and call
[`clipboardParser`](https://prosemirror.net/docs/ref/#view.EditorProps.clipboardParser) on it.
The `plain` flag will be true when the text is pasted as plain text.

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

`this`

</td>
<td>

`P`

</td>
</tr>
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

`$context`

</td>
<td>

[`ResolvedPos`](model.md#resolvedpos)

</td>
</tr>
<tr>
<td>

`plain`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Slice`](model.md#slice-2)

##### clipboardTextSerializer()? {#clipboardtextserializer-1}

```ts
optional clipboardTextSerializer: (this: P, content: Slice, view: EditorView) => string;
```

A function that will be called to get the text for the current
selection when copying text to the clipboard. By default, the
editor will use [`textBetween`](https://prosemirror.net/docs/ref/#model.Node.textBetween) on the
selected range.

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

`this`

</td>
<td>

`P`

</td>
</tr>
<tr>
<td>

`content`

</td>
<td>

[`Slice`](model.md#slice-2)

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

##### createSelectionBetween()? {#createselectionbetween-1}

```ts
optional createSelectionBetween: (this: P, view: EditorView, anchor: ResolvedPos, head: ResolvedPos) => null | Selection;
```

Can be used to override the way a selection is created when
reading a DOM selection between the given anchor and head.

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

`this`

</td>
<td>

`P`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`anchor`

</td>
<td>

[`ResolvedPos`](model.md#resolvedpos)

</td>
</tr>
<tr>
<td>

`head`

</td>
<td>

[`ResolvedPos`](model.md#resolvedpos)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`Selection`](state.md#selection-1)

##### decorations()? {#decorations-1}

```ts
optional decorations: (this: P, state: EditorState) => undefined | null | DecorationSource;
```

A set of [document decorations](https://prosemirror.net/docs/ref/#view.Decoration) to show in the
view.

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

`this`

</td>
<td>

`P`

</td>
</tr>
<tr>
<td>

`state`

</td>
<td>

[`EditorState`](state.md#editorstate)

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined` \| `null` \| [`DecorationSource`](#decorationsource)

##### domParser? {#domparser-1}

```ts
optional domParser: DOMParser;
```

The [parser](https://prosemirror.net/docs/ref/#model.DOMParser) to use when reading editor changes
from the DOM. Defaults to calling
[`DOMParser.fromSchema`](https://prosemirror.net/docs/ref/#model.DOMParser^fromSchema) on the
editor's schema.

##### dragCopies()? {#dragcopies-1}

```ts
optional dragCopies: (event: DragEvent) => boolean;
```

Determines whether an in-editor drag event should copy or move
the selection. When not given, the event's `altKey` property is
used on macOS, `ctrlKey` on other platforms.

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

`event`

</td>
<td>

[`DragEvent`](https://developer.mozilla.org/docs/Web/API/DragEvent)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### editable()? {#editable-2}

```ts
optional editable: (this: P, state: EditorState) => boolean;
```

When this returns false, the content of the view is not directly
editable.

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

`this`

</td>
<td>

`P`

</td>
</tr>
<tr>
<td>

`state`

</td>
<td>

[`EditorState`](state.md#editorstate)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### handleClick()? {#handleclick-1}

```ts
optional handleClick: (this: P, view: EditorView, pos: number, event: MouseEvent) => boolean | void;
```

Called when the editor is clicked, after `handleClickOn` handlers
have been called.

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

`this`

</td>
<td>

`P`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`pos`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `void`

##### handleClickOn()? {#handleclickon-1}

```ts
optional handleClickOn: (this: P, view: EditorView, pos: number, node: ProseMirrorNode, nodePos: number, event: MouseEvent, direct: boolean) => boolean | void;
```

Called for each node around a click, from the inside out. The
`direct` flag will be true for the inner node.

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

`this`

</td>
<td>

`P`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`pos`

</td>
<td>

`number`

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
<tr>
<td>

`nodePos`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)

</td>
</tr>
<tr>
<td>

`direct`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `void`

##### handleDOMEvents? {#handledomevents-1}

```ts
optional handleDOMEvents: object;
```

Can be an object mapping DOM event type names to functions that
handle them. Such functions will be called before any handling
ProseMirror does of events fired on the editable DOM element.
Contrary to the other event handling props, when returning true
from such a function, you are responsible for calling
`preventDefault` yourself (or not, if you want to allow the
default behavior).

###### Index Signature

```ts
[key: string]: 
  | undefined
  | (this: P, view: EditorView, event: any) => boolean | void
```

###### aria-ui/context-provider()?

```ts
optional aria-ui/context-provider: (this: P, view: EditorView, event: ContextProviderEvent) => boolean | void;
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

`this`

</td>
<td>

`P`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

`ContextProviderEvent`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `void`

###### aria-ui/context-request()?

```ts
optional aria-ui/context-request: (this: P, view: EditorView, event: ContextRequestEvent<unknown>) => boolean | void;
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

`this`

</td>
<td>

`P`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

`ContextRequestEvent`\<`unknown`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `void`

##### handleDoubleClick()? {#handledoubleclick-1}

```ts
optional handleDoubleClick: (this: P, view: EditorView, pos: number, event: MouseEvent) => boolean | void;
```

Called when the editor is double-clicked, after `handleDoubleClickOn`.

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

`this`

</td>
<td>

`P`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`pos`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `void`

##### handleDoubleClickOn()? {#handledoubleclickon-1}

```ts
optional handleDoubleClickOn: (this: P, view: EditorView, pos: number, node: ProseMirrorNode, nodePos: number, event: MouseEvent, direct: boolean) => boolean | void;
```

Called for each node around a double click.

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

`this`

</td>
<td>

`P`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`pos`

</td>
<td>

`number`

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
<tr>
<td>

`nodePos`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)

</td>
</tr>
<tr>
<td>

`direct`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `void`

##### handleDrop()? {#handledrop-1}

```ts
optional handleDrop: (this: P, view: EditorView, event: DragEvent, slice: Slice, moved: boolean) => boolean | void;
```

Called when something is dropped on the editor. `moved` will be
true if this drop moves from the current selection (which should
thus be deleted).

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

`this`

</td>
<td>

`P`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`DragEvent`](https://developer.mozilla.org/docs/Web/API/DragEvent)

</td>
</tr>
<tr>
<td>

`slice`

</td>
<td>

[`Slice`](model.md#slice-2)

</td>
</tr>
<tr>
<td>

`moved`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `void`

##### handleKeyDown()? {#handlekeydown-1}

```ts
optional handleKeyDown: (this: P, view: EditorView, event: KeyboardEvent) => boolean | void;
```

Called when the editor receives a `keydown` event.

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

`this`

</td>
<td>

`P`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`KeyboardEvent`](https://developer.mozilla.org/docs/Web/API/KeyboardEvent)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `void`

##### handleKeyPress()? {#handlekeypress-1}

```ts
optional handleKeyPress: (this: P, view: EditorView, event: KeyboardEvent) => boolean | void;
```

Handler for `keypress` events.

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

`this`

</td>
<td>

`P`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`KeyboardEvent`](https://developer.mozilla.org/docs/Web/API/KeyboardEvent)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `void`

##### handlePaste()? {#handlepaste-1}

```ts
optional handlePaste: (this: P, view: EditorView, event: ClipboardEvent, slice: Slice) => boolean | void;
```

Can be used to override the behavior of pasting. `slice` is the
pasted content parsed by the editor, but you can directly access
the event to get at the raw content.

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

`this`

</td>
<td>

`P`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`ClipboardEvent`](https://developer.mozilla.org/docs/Web/API/ClipboardEvent)

</td>
</tr>
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

`boolean` \| `void`

##### handleScrollToSelection()? {#handlescrolltoselection-1}

```ts
optional handleScrollToSelection: (this: P, view: EditorView) => boolean;
```

Called when the view, after updating its state, tries to scroll
the selection into view. A handler function may return false to
indicate that it did not handle the scrolling and further
handlers or the default behavior should be tried.

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

`this`

</td>
<td>

`P`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### handleTextInput()? {#handletextinput-1}

```ts
optional handleTextInput: (this: P, view: EditorView, from: number, to: number, text: string, deflt: () => Transaction) => boolean | void;
```

Whenever the user directly input text, this handler is called
before the input is applied. If it returns `true`, the default
behavior of actually inserting the text is suppressed.

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

`this`

</td>
<td>

`P`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

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
<tr>
<td>

`to`

</td>
<td>

`number`

</td>
</tr>
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

`deflt`

</td>
<td>

() => [`Transaction`](state.md#transaction)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `void`

##### handleTripleClick()? {#handletripleclick-1}

```ts
optional handleTripleClick: (this: P, view: EditorView, pos: number, event: MouseEvent) => boolean | void;
```

Called when the editor is triple-clicked, after `handleTripleClickOn`.

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

`this`

</td>
<td>

`P`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`pos`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `void`

##### handleTripleClickOn()? {#handletripleclickon-1}

```ts
optional handleTripleClickOn: (this: P, view: EditorView, pos: number, node: ProseMirrorNode, nodePos: number, event: MouseEvent, direct: boolean) => boolean | void;
```

Called for each node around a triple click.

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

`this`

</td>
<td>

`P`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`pos`

</td>
<td>

`number`

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
<tr>
<td>

`nodePos`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)

</td>
</tr>
<tr>
<td>

`direct`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean` \| `void`

##### markViews? {#markviews-1}

```ts
optional markViews: object;
```

Pass custom mark rendering functions. Note that these cannot
provide the kind of dynamic behavior that [node
views](https://prosemirror.net/docs/ref/#view.NodeView) can—they just provide custom rendering
logic. The third argument indicates whether the mark's content
is inline.

###### Index Signature

```ts
[mark: string]: MarkViewConstructor
```

##### nodeViews? {#nodeviews-1}

```ts
optional nodeViews: object;
```

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

###### Index Signature

```ts
[node: string]: NodeViewConstructor
```

##### scrollMargin? {#scrollmargin-1}

```ts
optional scrollMargin: 
  | number
  | {
  bottom: number;
  left: number;
  right: number;
  top: number;
};
```

Determines the extra space (in pixels) that is left above or
below the cursor when it is scrolled into view. Defaults to 5.

##### scrollThreshold? {#scrollthreshold-1}

```ts
optional scrollThreshold: 
  | number
  | {
  bottom: number;
  left: number;
  right: number;
  top: number;
};
```

Determines the distance (in pixels) between the cursor and the
end of the visible viewport at which point, when scrolling the
cursor into view, scrolling takes place. Defaults to 0.

##### transformCopied()? {#transformcopied-1}

```ts
optional transformCopied: (this: P, slice: Slice, view: EditorView) => Slice;
```

Can be used to transform copied or cut content before it is
serialized to the clipboard.

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

`this`

</td>
<td>

`P`

</td>
</tr>
<tr>
<td>

`slice`

</td>
<td>

[`Slice`](model.md#slice-2)

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Slice`](model.md#slice-2)

##### transformPasted()? {#transformpasted-1}

```ts
optional transformPasted: (this: P, slice: Slice, view: EditorView) => Slice;
```

Can be used to transform pasted or dragged-and-dropped content
before it is applied to the document.

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

`this`

</td>
<td>

`P`

</td>
</tr>
<tr>
<td>

`slice`

</td>
<td>

[`Slice`](model.md#slice-2)

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Slice`](model.md#slice-2)

##### transformPastedHTML()? {#transformpastedhtml-1}

```ts
optional transformPastedHTML: (this: P, html: string, view: EditorView) => string;
```

Can be used to transform pasted HTML text, _before_ it is parsed,
for example to clean it up.

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

`this`

</td>
<td>

`P`

</td>
</tr>
<tr>
<td>

`html`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

##### transformPastedText()? {#transformpastedtext-1}

```ts
optional transformPastedText: (this: P, text: string, plain: boolean, view: EditorView) => string;
```

Transform pasted plain text. The `plain` flag will be true when
the text is pasted as plain text.

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

`this`

</td>
<td>

`P`

</td>
</tr>
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

`plain`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

<!-- DEBUG memberWithGroups 10 -->

***

### MarkView {#markview}

<!-- DEBUG memberWithGroups 1 -->

By default, document marks are rendered using the result of the
[`toDOM`](https://prosemirror.net/docs/ref/#model.MarkSpec.toDOM) method of their spec, and managed entirely
by the editor. For some use cases, you want more control over the behavior
of a mark's in-editor representation, and need to
[define](https://prosemirror.net/docs/ref/#view.EditorProps.markViews) a custom mark view.

Objects returned as mark views must conform to this interface.

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### contentDOM? {#contentdom}

```ts
optional contentDOM: 
  | null
  | HTMLElement;
```

The DOM node that should hold the mark's content. When this is not
present, the `dom` property is used as the content DOM.

##### destroy()? {#destroy-2}

```ts
optional destroy: () => void;
```

Called when the mark view is removed from the editor or the whole
editor is destroyed.

###### Returns

`void`

##### dom {#dom-1}

```ts
dom: Node;
```

The outer DOM node that represents the document node.

##### ignoreMutation()? {#ignoremutation}

```ts
optional ignoreMutation: (mutation: ViewMutationRecord) => boolean;
```

Called when a [mutation](https://prosemirror.net/docs/ref/#view.ViewMutationRecord) happens within the
view. Return false if the editor should re-read the selection or re-parse
the range around the mutation, true if it can safely be ignored.

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

`mutation`

</td>
<td>

[`ViewMutationRecord`](#viewmutationrecord)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

<!-- DEBUG memberWithGroups 10 -->

***

### NodeView {#nodeview}

<!-- DEBUG memberWithGroups 1 -->

By default, document nodes are rendered using the result of the
[`toDOM`](https://prosemirror.net/docs/ref/#model.NodeSpec.toDOM) method of their spec, and managed
entirely by the editor. For some use cases, such as embedded
node-specific editing interfaces, you want more control over
the behavior of a node's in-editor representation, and need to
[define](https://prosemirror.net/docs/ref/#view.EditorProps.nodeViews) a custom node view.

Objects returned as node views must conform to this interface.

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### contentDOM? {#contentdom-1}

```ts
optional contentDOM: 
  | null
  | HTMLElement;
```

The DOM node that should hold the node's content. Only meaningful
if the node view also defines a `dom` property and if its node
type is not a leaf node type. When this is present, ProseMirror
will take care of rendering the node's children into it. When it
is not present, the node view itself is responsible for rendering
(or deciding not to render) its child nodes.

##### deselectNode()? {#deselectnode}

```ts
optional deselectNode: () => void;
```

When defining a `selectNode` method, you should also provide a
`deselectNode` method to remove the effect again.

###### Returns

`void`

##### destroy()? {#destroy-3}

```ts
optional destroy: () => void;
```

Called when the node view is removed from the editor or the whole
editor is destroyed.

###### Returns

`void`

##### dom {#dom-2}

```ts
dom: Node;
```

The outer DOM node that represents the document node.

##### ignoreMutation()? {#ignoremutation-1}

```ts
optional ignoreMutation: (mutation: ViewMutationRecord) => boolean;
```

Called when a [mutation](https://prosemirror.net/docs/ref/#view.ViewMutationRecord) happens within the
view. Return false if the editor should re-read the selection or re-parse
the range around the mutation, true if it can safely be ignored.

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

`mutation`

</td>
<td>

[`ViewMutationRecord`](#viewmutationrecord)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### multiType? {#multitype}

```ts
optional multiType: boolean;
```

By default, `update` will only be called when a node of the same
node type appears in this view's position. When you set this to
true, it will be called for any node, making it possible to have
a node view that representsmultiple types of nodes. You will
need to check the type of the nodes you get in `update` and
return `false` for types you cannot handle.

##### selectNode()? {#selectnode}

```ts
optional selectNode: () => void;
```

Can be used to override the way the node's selected status (as a
node selection) is displayed.

###### Returns

`void`

##### setSelection()? {#setselection}

```ts
optional setSelection: (anchor: number, head: number, root: 
  | Document
  | ShadowRoot) => void;
```

This will be called to handle setting the selection inside the
node. The `anchor` and `head` positions are relative to the start
of the node. By default, a DOM selection will be created between
the DOM positions corresponding to those positions, but if you
override it you can do something else.

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

`anchor`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`head`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`root`

</td>
<td>

 \| [`Document`](https://developer.mozilla.org/docs/Web/API/Document) \| [`ShadowRoot`](https://developer.mozilla.org/docs/Web/API/ShadowRoot)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### stopEvent()? {#stopevent}

```ts
optional stopEvent: (event: Event) => boolean;
```

Can be used to prevent the editor view from trying to handle some
or all DOM events that bubble up from the node view. Events for
which this returns true are not handled by the editor.

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

`event`

</td>
<td>

[`Event`](https://developer.mozilla.org/docs/Web/API/Event)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### update()? {#update-2}

```ts
optional update: (node: ProseMirrorNode, decorations: readonly Decoration[], innerDecorations: DecorationSource) => boolean;
```

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

`decorations`

</td>
<td>

readonly [`Decoration`](#decoration)[]

</td>
</tr>
<tr>
<td>

`innerDecorations`

</td>
<td>

[`DecorationSource`](#decorationsource)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

<!-- DEBUG memberWithGroups 10 -->

## Type Aliases

### DecorationAttrs {#decorationattrs}

<!-- DEBUG memberWithGroups 1 -->

```ts
type DecorationAttrs = object;
```

A set of attributes to add to a decorated node. Most properties
simply directly correspond to DOM attributes of the same name,
which will be set to the property's value. These are exceptions:

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

#### Indexable

```ts
[attribute: string]: undefined | string
```

Any other properties are treated as regular DOM attributes.

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### class? {#class}

```ts
optional class: string;
```

A CSS class name or a space-separated set of class names to be
_added_ to the classes that the node already had.

##### nodeName? {#nodename}

```ts
optional nodeName: string;
```

When non-null, the target node is wrapped in a DOM element of
this type (and the other attributes are applied to this element).

##### style? {#style}

```ts
optional style: string;
```

A string of CSS to be _added_ to the node's existing `style` property.

<!-- DEBUG memberWithGroups 10 -->

***

### MarkViewConstructor() {#markviewconstructor}

```ts
type MarkViewConstructor = (mark: Mark, view: EditorView, inline: boolean) => MarkView;
```

The function types [used](https://prosemirror.net/docs/ref/#view.EditorProps.markViews) to create
mark views.

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

`mark`

</td>
<td>

[`Mark`](model.md#mark)

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`inline`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

#### Returns

[`MarkView`](#markview)

***

### NodeViewConstructor() {#nodeviewconstructor}

```ts
type NodeViewConstructor = (node: ProseMirrorNode, view: EditorView, getPos: () => number | undefined, decorations: readonly Decoration[], innerDecorations: DecorationSource) => NodeView;
```

The type of function [provided](https://prosemirror.net/docs/ref/#view.EditorProps.nodeViews) to
create [node views](https://prosemirror.net/docs/ref/#view.NodeView).

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

`node`

</td>
<td>

[`ProseMirrorNode`](model.md#prosemirrornode)

</td>
</tr>
<tr>
<td>

`view`

</td>
<td>

[`EditorView`](#editorview)

</td>
</tr>
<tr>
<td>

`getPos`

</td>
<td>

() => `number` \| `undefined`

</td>
</tr>
<tr>
<td>

`decorations`

</td>
<td>

readonly [`Decoration`](#decoration)[]

</td>
</tr>
<tr>
<td>

`innerDecorations`

</td>
<td>

[`DecorationSource`](#decorationsource)

</td>
</tr>
</tbody>
</table>

#### Returns

[`NodeView`](#nodeview)

***

### ViewMutationRecord {#viewmutationrecord}

```ts
type ViewMutationRecord = 
  | MutationRecord
  | {
  target: DOMNode;
  type: "selection";
};
```

A ViewMutationRecord represents a DOM
[mutation](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
or a selection change happens within the view. When the change is
a selection change, the record will have a `type` property of
`"selection"` (which doesn't occur for native mutation records).

<!-- DEBUG memberWithGroups 10 -->
