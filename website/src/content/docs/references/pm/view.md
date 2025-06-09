---
title: prosekit/pm/view
sidebar:
  label: pm/view
---


Re-exports from [prosemirror-view](https://github.com/ProseMirror/prosemirror-view).

## Decoration {#decoration}

Decoration objects can be provided to the view through the
[`decorations` prop](https://prosemirror.net/docs/ref/#view.EditorProps.decorations). They come in
several variants—see the static members of this class for details.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new Decoration(): Decoration
```

</dd>

<dt>

`from: number`

</dt>

<dd>

The start position of the decoration.

</dd>

<dt>

`to: number`

</dt>

<dd>

The end position. Will be the same as `from` for [widget
decorations](https://prosemirror.net/docs/ref/#view.Decoration^widget).

</dd>

<dt>

`get spec(): any`

</dt>

<dd>

The spec provided when creating this decoration. Can be useful
if you've stored extra information in that object.

</dd>

<dt>

`inline`

</dt>

<dd>

Creates an inline decoration, which adds the given attributes to
each inline node between `from` and `to`.

```ts
const inline: (from: number, to: number, attrs: DecorationAttrs, spec?: { inclusiveEnd?: boolean; inclusiveStart?: boolean; [key]: any }) => Decoration
```

</dd>

<dt>

`node`

</dt>

<dd>

Creates a node decoration. `from` and `to` should point precisely
before and after a node in the document. That node, and only that
node, will receive the given attributes.

```ts
const node: (from: number, to: number, attrs: DecorationAttrs, spec?: any) => Decoration
```

</dd>

<dt>

`widget`

</dt>

<dd>

Creates a widget decoration, which is a DOM node that's shown in
the document at the given position. It is recommended that you
delay rendering the widget by passing a function that will be
called when the widget is actually drawn in a view, but you can
also directly pass a DOM node. `getPos` can be used to find the
widget's current document position.

```ts
const widget: (pos: number, toDOM: WidgetConstructor, spec?: { destroy?: (node: Node) => void; ignoreSelection?: boolean; key?: string; marks?: readonly Mark[]; relaxedSide?: boolean; side?: number; stopEvent?: (event: Event) => boolean; [key]: any }) => Decoration
```

</dd>

</dl>

## DecorationSet {#decoration-set}

A collection of [decorations](https://prosemirror.net/docs/ref/#view.Decoration), organized in such
a way that the drawing algorithm can efficiently use and compare
them. This is a persistent data structure—it is not modified,
updates create a new value.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new DecorationSet(): DecorationSet
```

</dd>

<dt>

`empty: DecorationSet`

</dt>

<dd>

The empty set of decorations.

</dd>

<dt>

`add`

</dt>

<dd>

Add the given array of decorations to the ones in the set,
producing a new set. Consumes the `decorations` array. Needs
access to the current document to create the appropriate tree
structure.

```ts
const add: (doc: ProseMirrorNode, decorations: Decoration[]) => DecorationSet
```

</dd>

<dt>

`find`

</dt>

<dd>

Find all decorations in this set which touch the given range
(including decorations that start or end directly at the
boundaries) and match the given predicate on their spec. When
`start` and `end` are omitted, all decorations in the set are
considered. When `predicate` isn't given, all decorations are
assumed to match.

```ts
const find: (start?: number, end?: number, predicate?: (spec: any) => boolean) => Decoration[]
```

</dd>

<dt>

`forChild`

</dt>

<dd>

Extract a DecorationSource containing decorations for the given child node at the given offset.

```ts
const forChild: (offset: number, node: ProseMirrorNode) => DecorationSet | DecorationGroup
```

</dd>

<dt>

`forEachSet`

</dt>

<dd>

Call the given function for each decoration set in the group.

```ts
const forEachSet: (f: (set: DecorationSet) => void) => void
```

</dd>

<dt>

`map`

</dt>

<dd>

Map the set of decorations in response to a change in the
document.

```ts
const map: (mapping: Mapping, doc: ProseMirrorNode, options?: { onRemove?: (decorationSpec: any) => void }) => DecorationSet
```

</dd>

<dt>

`remove`

</dt>

<dd>

Create a new set that contains the decorations in this set, minus
the ones in the given array.

```ts
const remove: (decorations: Decoration[]) => DecorationSet
```

</dd>

<dt>

`create`

</dt>

<dd>

Create a set of decorations, using the structure of the given
document. This will consume (modify) the `decorations` array, so
you must make a copy if you want need to preserve that.

```ts
const create: (doc: ProseMirrorNode, decorations: Decoration[]) => DecorationSet
```

</dd>

</dl>

## EditorView {#editor-view}

An editor view manages the DOM structure that represents an
editable document. Its state and behavior are determined by its
[props](https://prosemirror.net/docs/ref/#view.DirectEditorProps).

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new EditorView(place: null | Node | ((editor: HTMLElement) => void) | ({ mount: HTMLElement }), props: DirectEditorProps): EditorView
```

</dd>

<dt>

`dispatch: (tr: Transaction) => void`

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

<dt>

`dom: HTMLElement`

</dt>

<dd>

An editable DOM node containing the document. (You probably
should not directly interfere with its content.)

</dd>

<dt>

`dragging: null | ({ move: boolean; slice: Slice })`

</dt>

<dd>

When editor content is being dragged, this object contains
information about the dragged slice and whether it is being
copied or moved. At any other time, it is null.

</dd>

<dt>

`editable: boolean`

</dt>

<dd>

Indicates whether the editor is currently [editable](https://prosemirror.net/docs/ref/#view.EditorProps.editable).

</dd>

<dt>

`state: EditorState`

</dt>

<dd>

The view's current [state](https://prosemirror.net/docs/ref/#state.EditorState).

</dd>

<dt>

`get composing(): boolean`

</dt>

<dd>

Holds `true` when a
[composition](https://w3c.github.io/uievents/#events-compositionevents)
is active.

</dd>

<dt>

`get isDestroyed(): boolean`

</dt>

<dd>

This is true when the view has been
[destroyed](https://prosemirror.net/docs/ref/#view.EditorView.destroy) (and thus should not be
used anymore).

</dd>

<dt>

`get props(): DirectEditorProps`

</dt>

<dd>

The view's current [props](https://prosemirror.net/docs/ref/#view.EditorProps).

</dd>

<dt>

`get root(): Document | ShadowRoot`

</dt>

<dd>

Get the document root in which the editor exists. This will
usually be the top-level `document`, but might be a [shadow
DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)
root if the editor is inside one.

</dd>

<dt>

`coordsAtPos`

</dt>

<dd>

Returns the viewport rectangle at a given document position.
`left` and `right` will be the same number, as this returns a
flat cursor-ish rectangle. If the position is between two things
that aren't directly adjacent, `side` determines which element
is used. When < 0, the element before the position is used,
otherwise the element after.

```ts
const coordsAtPos: (pos: number, side?: number) => { bottom: number; left: number; right: number; top: number }
```

</dd>

<dt>

`destroy`

</dt>

<dd>

Removes the editor from the DOM and destroys all [node
views](https://prosemirror.net/docs/ref/#view.NodeView).

```ts
const destroy: () => void
```

</dd>

<dt>

`dispatchEvent`

</dt>

<dd>

Used for testing.

```ts
const dispatchEvent: (event: Event) => void
```

</dd>

<dt>

`domAtPos`

</dt>

<dd>

Find the DOM position that corresponds to the given document
position. When `side` is negative, find the position as close as
possible to the content before the position. When positive,
prefer positions close to the content after the position. When
zero, prefer as shallow a position as possible.

Note that you should **not** mutate the editor's internal DOM,
only inspect it (and even that is usually not necessary).

```ts
const domAtPos: (pos: number, side?: number) => { node: Node; offset: number }
```

</dd>

<dt>

`endOfTextblock`

</dt>

<dd>

Find out whether the selection is at the end of a textblock when
moving in a given direction. When, for example, given `"left"`,
it will return true if moving left from the current cursor
position would leave that position's parent textblock. Will apply
to the view's current state by default, but it is possible to
pass a different state.

```ts
const endOfTextblock: (dir: "up" | "down" | "left" | "right" | "forward" | "backward", state?: EditorState) => boolean
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

`hasFocus`

</dt>

<dd>

Query whether the view has focus.

```ts
const hasFocus: () => boolean
```

</dd>

<dt>

`nodeDOM`

</dt>

<dd>

Find the DOM node that represents the document node after the
given position. May return `null` when the position doesn't point
in front of a node or if the node is inside an opaque node view.

This is intended to be able to call things like
`getBoundingClientRect` on that DOM node. Do **not** mutate the
editor DOM directly, or add styling this way, since that will be
immediately overriden by the editor as it redraws the node.

```ts
const nodeDOM: (pos: number) => null | Node
```

</dd>

<dt>

`pasteHTML`

</dt>

<dd>

Run the editor's paste logic with the given HTML string. The
`event`, if given, will be passed to the
[`handlePaste`](https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste) hook.

```ts
const pasteHTML: (html: string, event?: ClipboardEvent) => boolean
```

</dd>

<dt>

`pasteText`

</dt>

<dd>

Run the editor's paste logic with the given plain-text input.

```ts
const pasteText: (text: string, event?: ClipboardEvent) => boolean
```

</dd>

<dt>

`posAtCoords`

</dt>

<dd>

Given a pair of viewport coordinates, return the document
position that corresponds to them. May return null if the given
coordinates aren't inside of the editor. When an object is
returned, its `pos` property is the position nearest to the
coordinates, and its `inside` property holds the position of the
inner node that the position falls inside of, or -1 if it is at
the top level, not in any node.

```ts
const posAtCoords: (coords: { left: number; top: number }) => null | ({ inside: number; pos: number })
```

</dd>

<dt>

`posAtDOM`

</dt>

<dd>

Find the document position that corresponds to a given DOM
position. (Whenever possible, it is preferable to inspect the
document structure directly, rather than poking around in the
DOM, but sometimes—for example when interpreting an event
target—you don't have a choice.)

The `bias` parameter can be used to influence which side of a DOM
node to use when the position is inside a leaf node.

```ts
const posAtDOM: (node: Node, offset: number, bias?: number) => number
```

</dd>

<dt>

`serializeForClipboard`

</dt>

<dd>

Serialize the given slice as it would be if it was copied from
this editor. Returns a DOM element that contains a
representation of the slice as its children, a textual
representation, and the transformed slice (which can be
different from the given input due to hooks like
[`transformCopied`](https://prosemirror.net/docs/ref/#view.EditorProps.transformCopied)).

```ts
const serializeForClipboard: (slice: Slice) => { dom: HTMLElement; slice: Slice; text: string }
```

</dd>

<dt>

`setProps`

</dt>

<dd>

Update the view by updating existing props object with the object
given as argument. Equivalent to `view.update(Object.assign({},
view.props, props))`.

```ts
const setProps: (props: Partial<DirectEditorProps>) => void
```

</dd>

<dt>

`someProp`

</dt>

<dd>

Goes over the values of a prop, first those provided directly,
then those from plugins given to the view, then from plugins in
the state (in order), and calls `f` every time a non-undefined
value is found. When `f` returns a truthy value, that is
immediately returned. When `f` isn't provided, it is treated as
the identity function (the prop value is returned directly).

```ts
const someProp: ((<PropName extends keyof EditorProps<any>, Result>(propName: PropName, f: (value: NonNullable<EditorProps<any>[PropName]>) => Result) => undefined | Result) | (<PropName extends keyof EditorProps<any>>(propName: PropName) => undefined | NonNullable<EditorProps<any>[PropName]>))
```

</dd>

<dt>

`update`

</dt>

<dd>

Update the view's props. Will immediately cause an update to
the DOM.

```ts
const update: (props: DirectEditorProps) => void
```

</dd>

<dt>

`updateRoot`

</dt>

<dd>

When an existing editor view is moved to a new document or
shadow tree, call this to make it recompute its root.

```ts
const updateRoot: () => void
```

</dd>

<dt>

`updateState`

</dt>

<dd>

Update the editor's `state` prop, without touching any of the
other props.

```ts
const updateState: (state: EditorState) => void
```

</dd>

</dl>

## DecorationSource {#decoration-source}

An object that can [provide](https://prosemirror.net/docs/ref/#view.EditorProps.decorations)
decorations. Implemented by [`DecorationSet`](https://prosemirror.net/docs/ref/#view.DecorationSet),
and passed to [node views](https://prosemirror.net/docs/ref/#view.EditorProps.nodeViews).

<dl>

<dt>

`map: (mapping: Mapping, node: ProseMirrorNode) => DecorationSource`

</dt>

<dd>

Map the set of decorations in response to a change in the
document.

</dd>

<dt>

`forChild`

</dt>

<dd>

Extract a DecorationSource containing decorations for the given child node at the given offset.

```ts
const forChild: (offset: number, child: ProseMirrorNode) => DecorationSource
```

</dd>

<dt>

`forEachSet`

</dt>

<dd>

Call the given function for each decoration set in the group.

```ts
const forEachSet: (f: (set: DecorationSet) => void) => void
```

</dd>

</dl>

## DirectEditorProps {#direct-editor-props}

The props object given directly to the editor view supports some
fields that can't be used in plugins:

<dl>

<dt>

`attributes?: ({ [name]: string }) | ((state: EditorState) => { [name]: string })`

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

<dt>

`clipboardParser?: DOMParser`

</dt>

<dd>

The [parser](https://prosemirror.net/docs/ref/#model.DOMParser) to use when reading content from
the clipboard. When not given, the value of the
[`domParser`](https://prosemirror.net/docs/ref/#view.EditorProps.domParser) prop is used.

</dd>

<dt>

`clipboardSerializer?: DOMSerializer`

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

<dt>

`clipboardTextParser?: (this: any, text: string, $context: ResolvedPos, plain: boolean, view: EditorView) => Slice`

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

<dt>

`clipboardTextSerializer?: (this: any, content: Slice, view: EditorView) => string`

</dt>

<dd>

A function that will be called to get the text for the current
selection when copying text to the clipboard. By default, the
editor will use [`textBetween`](https://prosemirror.net/docs/ref/#model.Node.textBetween) on the
selected range.

</dd>

<dt>

`createSelectionBetween?: (this: any, view: EditorView, anchor: ResolvedPos, head: ResolvedPos) => null | Selection`

</dt>

<dd>

Can be used to override the way a selection is created when
reading a DOM selection between the given anchor and head.

</dd>

<dt>

`decorations?: (this: any, state: EditorState) => undefined | null | DecorationSource`

</dt>

<dd>

A set of [document decorations](https://prosemirror.net/docs/ref/#view.Decoration) to show in the
view.

</dd>

<dt>

`dispatchTransaction?: (tr: Transaction) => void`

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

<dt>

`domParser?: DOMParser`

</dt>

<dd>

The [parser](https://prosemirror.net/docs/ref/#model.DOMParser) to use when reading editor changes
from the DOM. Defaults to calling
[`DOMParser.fromSchema`](https://prosemirror.net/docs/ref/#model.DOMParser^fromSchema) on the
editor's schema.

</dd>

<dt>

`dragCopies?: (event: DragEvent) => boolean`

</dt>

<dd>

Determines whether an in-editor drag event should copy or move
the selection. When not given, the event's `altKey` property is
used on macOS, `ctrlKey` on other platforms.

</dd>

<dt>

`editable?: (this: any, state: EditorState) => boolean`

</dt>

<dd>

When this returns false, the content of the view is not directly
editable.

</dd>

<dt>

`handleClick?: (this: any, view: EditorView, pos: number, event: MouseEvent) => boolean | void`

</dt>

<dd>

Called when the editor is clicked, after `handleClickOn` handlers
have been called.

</dd>

<dt>

`handleClickOn?: (this: any, view: EditorView, pos: number, node: ProseMirrorNode, nodePos: number, event: MouseEvent, direct: boolean) => boolean | void`

</dt>

<dd>

Called for each node around a click, from the inside out. The
`direct` flag will be true for the inner node.

</dd>

<dt>

`handleDOMEvents?: { aria-ui/context-provider?: (this: any, view: EditorView, event: ContextProviderEvent) => boolean | void; aria-ui/context-request?: (this: any, view: EditorView, event: ContextRequestEvent<unknown>) => boolean | void; [key]: undefined | ((this: any, view: EditorView, event: any) => boolean | void) }`

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

<dt>

`handleDoubleClick?: (this: any, view: EditorView, pos: number, event: MouseEvent) => boolean | void`

</dt>

<dd>

Called when the editor is double-clicked, after `handleDoubleClickOn`.

</dd>

<dt>

`handleDoubleClickOn?: (this: any, view: EditorView, pos: number, node: ProseMirrorNode, nodePos: number, event: MouseEvent, direct: boolean) => boolean | void`

</dt>

<dd>

Called for each node around a double click.

</dd>

<dt>

`handleDrop?: (this: any, view: EditorView, event: DragEvent, slice: Slice, moved: boolean) => boolean | void`

</dt>

<dd>

Called when something is dropped on the editor. `moved` will be
true if this drop moves from the current selection (which should
thus be deleted).

</dd>

<dt>

`handleKeyDown?: (this: any, view: EditorView, event: KeyboardEvent) => boolean | void`

</dt>

<dd>

Called when the editor receives a `keydown` event.

</dd>

<dt>

`handleKeyPress?: (this: any, view: EditorView, event: KeyboardEvent) => boolean | void`

</dt>

<dd>

Handler for `keypress` events.

</dd>

<dt>

`handlePaste?: (this: any, view: EditorView, event: ClipboardEvent, slice: Slice) => boolean | void`

</dt>

<dd>

Can be used to override the behavior of pasting. `slice` is the
pasted content parsed by the editor, but you can directly access
the event to get at the raw content.

</dd>

<dt>

`handleScrollToSelection?: (this: any, view: EditorView) => boolean`

</dt>

<dd>

Called when the view, after updating its state, tries to scroll
the selection into view. A handler function may return false to
indicate that it did not handle the scrolling and further
handlers or the default behavior should be tried.

</dd>

<dt>

`handleTextInput?: (this: any, view: EditorView, from: number, to: number, text: string, deflt: () => Transaction) => boolean | void`

</dt>

<dd>

Whenever the user directly input text, this handler is called
before the input is applied. If it returns `true`, the default
behavior of actually inserting the text is suppressed.

</dd>

<dt>

`handleTripleClick?: (this: any, view: EditorView, pos: number, event: MouseEvent) => boolean | void`

</dt>

<dd>

Called when the editor is triple-clicked, after `handleTripleClickOn`.

</dd>

<dt>

`handleTripleClickOn?: (this: any, view: EditorView, pos: number, node: ProseMirrorNode, nodePos: number, event: MouseEvent, direct: boolean) => boolean | void`

</dt>

<dd>

Called for each node around a triple click.

</dd>

<dt>

`markViews?: { [mark]: MarkViewConstructor }`

</dt>

<dd>

Pass custom mark rendering functions. Note that these cannot
provide the kind of dynamic behavior that [node
views](https://prosemirror.net/docs/ref/#view.NodeView) can—they just provide custom rendering
logic. The third argument indicates whether the mark's content
is inline.

</dd>

<dt>

`nodeViews?: { [node]: NodeViewConstructor }`

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

<dt>

`plugins?: readonly ProseMirrorPlugin<any>[]`

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

<dt>

`scrollMargin?: number | ({ bottom: number; left: number; right: number; top: number })`

</dt>

<dd>

Determines the extra space (in pixels) that is left above or
below the cursor when it is scrolled into view. Defaults to 5.

</dd>

<dt>

`scrollThreshold?: number | ({ bottom: number; left: number; right: number; top: number })`

</dt>

<dd>

Determines the distance (in pixels) between the cursor and the
end of the visible viewport at which point, when scrolling the
cursor into view, scrolling takes place. Defaults to 0.

</dd>

<dt>

`state: EditorState`

</dt>

<dd>

The current state of the editor.

</dd>

<dt>

`transformCopied?: (this: any, slice: Slice, view: EditorView) => Slice`

</dt>

<dd>

Can be used to transform copied or cut content before it is
serialized to the clipboard.

</dd>

<dt>

`transformPasted?: (this: any, slice: Slice, view: EditorView) => Slice`

</dt>

<dd>

Can be used to transform pasted or dragged-and-dropped content
before it is applied to the document.

</dd>

<dt>

`transformPastedHTML?: (this: any, html: string, view: EditorView) => string`

</dt>

<dd>

Can be used to transform pasted HTML text, *before* it is parsed,
for example to clean it up.

</dd>

<dt>

`transformPastedText?: (this: any, text: string, plain: boolean, view: EditorView) => string`

</dt>

<dd>

Transform pasted plain text. The `plain` flag will be true when
the text is pasted as plain text.

</dd>

</dl>

## DOMEventMap {#dom-event-map}

Helper type that maps event names to event object types, but
includes events that TypeScript's HTMLElementEventMap doesn't know
about.

<dl>

<dt>

`aria-ui/context-provider: ContextProviderEvent`

</dt>

<dd>

</dd>

<dt>

`aria-ui/context-request: ContextRequestEvent<unknown>`

</dt>

<dd>

</dd>

</dl>

## EditorProps {#editor-props}

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

<dl>

<dt>

`attributes?: ({ [name]: string }) | ((state: EditorState) => { [name]: string })`

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

<dt>

`clipboardParser?: DOMParser`

</dt>

<dd>

The [parser](https://prosemirror.net/docs/ref/#model.DOMParser) to use when reading content from
the clipboard. When not given, the value of the
[`domParser`](https://prosemirror.net/docs/ref/#view.EditorProps.domParser) prop is used.

</dd>

<dt>

`clipboardSerializer?: DOMSerializer`

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

<dt>

`clipboardTextParser?: (this: P, text: string, $context: ResolvedPos, plain: boolean, view: EditorView) => Slice`

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

<dt>

`clipboardTextSerializer?: (this: P, content: Slice, view: EditorView) => string`

</dt>

<dd>

A function that will be called to get the text for the current
selection when copying text to the clipboard. By default, the
editor will use [`textBetween`](https://prosemirror.net/docs/ref/#model.Node.textBetween) on the
selected range.

</dd>

<dt>

`createSelectionBetween?: (this: P, view: EditorView, anchor: ResolvedPos, head: ResolvedPos) => null | Selection`

</dt>

<dd>

Can be used to override the way a selection is created when
reading a DOM selection between the given anchor and head.

</dd>

<dt>

`decorations?: (this: P, state: EditorState) => undefined | null | DecorationSource`

</dt>

<dd>

A set of [document decorations](https://prosemirror.net/docs/ref/#view.Decoration) to show in the
view.

</dd>

<dt>

`domParser?: DOMParser`

</dt>

<dd>

The [parser](https://prosemirror.net/docs/ref/#model.DOMParser) to use when reading editor changes
from the DOM. Defaults to calling
[`DOMParser.fromSchema`](https://prosemirror.net/docs/ref/#model.DOMParser^fromSchema) on the
editor's schema.

</dd>

<dt>

`dragCopies?: (event: DragEvent) => boolean`

</dt>

<dd>

Determines whether an in-editor drag event should copy or move
the selection. When not given, the event's `altKey` property is
used on macOS, `ctrlKey` on other platforms.

</dd>

<dt>

`editable?: (this: P, state: EditorState) => boolean`

</dt>

<dd>

When this returns false, the content of the view is not directly
editable.

</dd>

<dt>

`handleClick?: (this: P, view: EditorView, pos: number, event: MouseEvent) => boolean | void`

</dt>

<dd>

Called when the editor is clicked, after `handleClickOn` handlers
have been called.

</dd>

<dt>

`handleClickOn?: (this: P, view: EditorView, pos: number, node: ProseMirrorNode, nodePos: number, event: MouseEvent, direct: boolean) => boolean | void`

</dt>

<dd>

Called for each node around a click, from the inside out. The
`direct` flag will be true for the inner node.

</dd>

<dt>

`handleDOMEvents?: { aria-ui/context-provider?: (this: P, view: EditorView, event: ContextProviderEvent) => boolean | void; aria-ui/context-request?: (this: P, view: EditorView, event: ContextRequestEvent<unknown>) => boolean | void; [key]: undefined | ((this: P, view: EditorView, event: any) => boolean | void) }`

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

<dt>

`handleDoubleClick?: (this: P, view: EditorView, pos: number, event: MouseEvent) => boolean | void`

</dt>

<dd>

Called when the editor is double-clicked, after `handleDoubleClickOn`.

</dd>

<dt>

`handleDoubleClickOn?: (this: P, view: EditorView, pos: number, node: ProseMirrorNode, nodePos: number, event: MouseEvent, direct: boolean) => boolean | void`

</dt>

<dd>

Called for each node around a double click.

</dd>

<dt>

`handleDrop?: (this: P, view: EditorView, event: DragEvent, slice: Slice, moved: boolean) => boolean | void`

</dt>

<dd>

Called when something is dropped on the editor. `moved` will be
true if this drop moves from the current selection (which should
thus be deleted).

</dd>

<dt>

`handleKeyDown?: (this: P, view: EditorView, event: KeyboardEvent) => boolean | void`

</dt>

<dd>

Called when the editor receives a `keydown` event.

</dd>

<dt>

`handleKeyPress?: (this: P, view: EditorView, event: KeyboardEvent) => boolean | void`

</dt>

<dd>

Handler for `keypress` events.

</dd>

<dt>

`handlePaste?: (this: P, view: EditorView, event: ClipboardEvent, slice: Slice) => boolean | void`

</dt>

<dd>

Can be used to override the behavior of pasting. `slice` is the
pasted content parsed by the editor, but you can directly access
the event to get at the raw content.

</dd>

<dt>

`handleScrollToSelection?: (this: P, view: EditorView) => boolean`

</dt>

<dd>

Called when the view, after updating its state, tries to scroll
the selection into view. A handler function may return false to
indicate that it did not handle the scrolling and further
handlers or the default behavior should be tried.

</dd>

<dt>

`handleTextInput?: (this: P, view: EditorView, from: number, to: number, text: string, deflt: () => Transaction) => boolean | void`

</dt>

<dd>

Whenever the user directly input text, this handler is called
before the input is applied. If it returns `true`, the default
behavior of actually inserting the text is suppressed.

</dd>

<dt>

`handleTripleClick?: (this: P, view: EditorView, pos: number, event: MouseEvent) => boolean | void`

</dt>

<dd>

Called when the editor is triple-clicked, after `handleTripleClickOn`.

</dd>

<dt>

`handleTripleClickOn?: (this: P, view: EditorView, pos: number, node: ProseMirrorNode, nodePos: number, event: MouseEvent, direct: boolean) => boolean | void`

</dt>

<dd>

Called for each node around a triple click.

</dd>

<dt>

`markViews?: { [mark]: MarkViewConstructor }`

</dt>

<dd>

Pass custom mark rendering functions. Note that these cannot
provide the kind of dynamic behavior that [node
views](https://prosemirror.net/docs/ref/#view.NodeView) can—they just provide custom rendering
logic. The third argument indicates whether the mark's content
is inline.

</dd>

<dt>

`nodeViews?: { [node]: NodeViewConstructor }`

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

<dt>

`scrollMargin?: number | ({ bottom: number; left: number; right: number; top: number })`

</dt>

<dd>

Determines the extra space (in pixels) that is left above or
below the cursor when it is scrolled into view. Defaults to 5.

</dd>

<dt>

`scrollThreshold?: number | ({ bottom: number; left: number; right: number; top: number })`

</dt>

<dd>

Determines the distance (in pixels) between the cursor and the
end of the visible viewport at which point, when scrolling the
cursor into view, scrolling takes place. Defaults to 0.

</dd>

<dt>

`transformCopied?: (this: P, slice: Slice, view: EditorView) => Slice`

</dt>

<dd>

Can be used to transform copied or cut content before it is
serialized to the clipboard.

</dd>

<dt>

`transformPasted?: (this: P, slice: Slice, view: EditorView) => Slice`

</dt>

<dd>

Can be used to transform pasted or dragged-and-dropped content
before it is applied to the document.

</dd>

<dt>

`transformPastedHTML?: (this: P, html: string, view: EditorView) => string`

</dt>

<dd>

Can be used to transform pasted HTML text, *before* it is parsed,
for example to clean it up.

</dd>

<dt>

`transformPastedText?: (this: P, text: string, plain: boolean, view: EditorView) => string`

</dt>

<dd>

Transform pasted plain text. The `plain` flag will be true when
the text is pasted as plain text.

</dd>

</dl>

## MarkView {#mark-view}

By default, document marks are rendered using the result of the
[`toDOM`](https://prosemirror.net/docs/ref/#model.MarkSpec.toDOM) method of their spec, and managed entirely
by the editor. For some use cases, you want more control over the behavior
of a mark's in-editor representation, and need to
[define](https://prosemirror.net/docs/ref/#view.EditorProps.markViews) a custom mark view.

Objects returned as mark views must conform to this interface.

<dl>

<dt>

`contentDOM?: null | HTMLElement`

</dt>

<dd>

The DOM node that should hold the mark's content. When this is not
present, the `dom` property is used as the content DOM.

</dd>

<dt>

`destroy?: () => void`

</dt>

<dd>

Called when the mark view is removed from the editor or the whole
editor is destroyed.

</dd>

<dt>

`dom: Node`

</dt>

<dd>

The outer DOM node that represents the document node.

</dd>

<dt>

`ignoreMutation?: (mutation: ViewMutationRecord) => boolean`

</dt>

<dd>

Called when a [mutation](https://prosemirror.net/docs/ref/#view.ViewMutationRecord) happens within the
view. Return false if the editor should re-read the selection or re-parse
the range around the mutation, true if it can safely be ignored.

</dd>

</dl>

## NodeView {#node-view}

By default, document nodes are rendered using the result of the
[`toDOM`](https://prosemirror.net/docs/ref/#model.NodeSpec.toDOM) method of their spec, and managed
entirely by the editor. For some use cases, such as embedded
node-specific editing interfaces, you want more control over
the behavior of a node's in-editor representation, and need to
[define](https://prosemirror.net/docs/ref/#view.EditorProps.nodeViews) a custom node view.

Objects returned as node views must conform to this interface.

<dl>

<dt>

`contentDOM?: null | HTMLElement`

</dt>

<dd>

The DOM node that should hold the node's content. Only meaningful
if the node view also defines a `dom` property and if its node
type is not a leaf node type. When this is present, ProseMirror
will take care of rendering the node's children into it. When it
is not present, the node view itself is responsible for rendering
(or deciding not to render) its child nodes.

</dd>

<dt>

`deselectNode?: () => void`

</dt>

<dd>

When defining a `selectNode` method, you should also provide a
`deselectNode` method to remove the effect again.

</dd>

<dt>

`destroy?: () => void`

</dt>

<dd>

Called when the node view is removed from the editor or the whole
editor is destroyed.

</dd>

<dt>

`dom: Node`

</dt>

<dd>

The outer DOM node that represents the document node.

</dd>

<dt>

`ignoreMutation?: (mutation: ViewMutationRecord) => boolean`

</dt>

<dd>

Called when a [mutation](https://prosemirror.net/docs/ref/#view.ViewMutationRecord) happens within the
view. Return false if the editor should re-read the selection or re-parse
the range around the mutation, true if it can safely be ignored.

</dd>

<dt>

`multiType?: boolean`

</dt>

<dd>

By default, `update` will only be called when a node of the same
node type appears in this view's position. When you set this to
true, it will be called for any node, making it possible to have
a node view that representsmultiple types of nodes. You will
need to check the type of the nodes you get in `update` and
return `false` for types you cannot handle.

</dd>

<dt>

`selectNode?: () => void`

</dt>

<dd>

Can be used to override the way the node's selected status (as a
node selection) is displayed.

</dd>

<dt>

`setSelection?: (anchor: number, head: number, root: Document | ShadowRoot) => void`

</dt>

<dd>

This will be called to handle setting the selection inside the
node. The `anchor` and `head` positions are relative to the start
of the node. By default, a DOM selection will be created between
the DOM positions corresponding to those positions, but if you
override it you can do something else.

</dd>

<dt>

`stopEvent?: (event: Event) => boolean`

</dt>

<dd>

Can be used to prevent the editor view from trying to handle some
or all DOM events that bubble up from the node view. Events for
which this returns true are not handled by the editor.

</dd>

<dt>

`update?: (node: ProseMirrorNode, decorations: readonly Decoration[], innerDecorations: DecorationSource) => boolean`

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

## DecorationAttrs {#decoration-attrs}

A set of attributes to add to a decorated node. Most properties
simply directly correspond to DOM attributes of the same name,
which will be set to the property's value. These are exceptions:

**Type**: `{ class?: string; nodeName?: string; style?: string; [attribute]: undefined | string }`

## MarkViewConstructor {#mark-view-constructor}

The function types [used](https://prosemirror.net/docs/ref/#view.EditorProps.markViews) to create
mark views.

**Type**: `(mark: Mark, view: EditorView, inline: boolean) => MarkView`

## NodeViewConstructor {#node-view-constructor}

The type of function [provided](https://prosemirror.net/docs/ref/#view.EditorProps.nodeViews) to
create [node views](https://prosemirror.net/docs/ref/#view.NodeView).

**Type**: `(node: ProseMirrorNode, view: EditorView, getPos: () => number | undefined, decorations: readonly Decoration[], innerDecorations: DecorationSource) => NodeView`

## ViewMutationRecord {#view-mutation-record}

A ViewMutationRecord represents a DOM
[mutation](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
or a selection change happens within the view. When the change is
a selection change, the record will have a `type` property of
`"selection"` (which doesn't occur for native mutation records).

**Type**: `MutationRecord | ({ target: DOMNode; type: "selection" })`
