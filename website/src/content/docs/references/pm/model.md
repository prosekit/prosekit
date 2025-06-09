---
title: prosekit/pm/model
sidebar:
  label: pm/model
---


Re-exports from [prosemirror-model](https://github.com/ProseMirror/prosemirror-model).

## ContentMatch {#content-match}

Instances of this class represent a match state of a node type's
[content expression](https://prosemirror.net/docs/ref/#model.NodeSpec.content), and can be used to
find out whether further content matches here, and whether a given
position is a valid end of the node.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new ContentMatch(): ContentMatch
```

</dd>

<dt>

`validEnd: boolean`

</dt>

<dd>

True when this match state represents a valid end of the node.

</dd>

<dt>

`get defaultType(): null | NodeType`

</dt>

<dd>

Get the first matching node type at this match position that can
be generated.

</dd>

<dt>

`get edgeCount(): number`

</dt>

<dd>

The number of outgoing edges this node has in the finite
automaton that describes the content expression.

</dd>

<dt>

`edge`

</dt>

<dd>

Get the \_n\_​th outgoing edge from this node in the finite
automaton that describes the content expression.

```ts
const edge: (n: number) => MatchEdge
```

</dd>

<dt>

`fillBefore`

</dt>

<dd>

Try to match the given fragment, and if that fails, see if it can
be made to match by inserting nodes in front of it. When
successful, return a fragment of inserted nodes (which may be
empty if nothing had to be inserted). When `toEnd` is true, only
return a fragment if the resulting match goes to the end of the
content expression.

```ts
const fillBefore: (after: ProseMirrorFragment, toEnd?: boolean, startIndex?: number) => null | ProseMirrorFragment
```

</dd>

<dt>

`findWrapping`

</dt>

<dd>

Find a set of wrapping node types that would allow a node of the
given type to appear at this position. The result may be empty
(when it fits directly) and will be null when no such wrapping
exists.

```ts
const findWrapping: (target: NodeType) => null | readonly NodeType[]
```

</dd>

<dt>

`matchFragment`

</dt>

<dd>

Try to match a fragment. Returns the resulting match when
successful.

```ts
const matchFragment: (frag: ProseMirrorFragment, start?: number, end?: number) => null | ContentMatch
```

</dd>

<dt>

`matchType`

</dt>

<dd>

Match a node type, returning a match after that node if
successful.

```ts
const matchType: (type: NodeType) => null | ContentMatch
```

</dd>

</dl>

## DOMParser {#dom-parser-1}

A DOM parser represents a strategy for parsing DOM content into a
ProseMirror document conforming to a given schema. Its behavior is
defined by an array of [rules](https://prosemirror.net/docs/ref/#model.ParseRule).

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new DOMParser(schema: Schema, rules: readonly ParseRule[]): DOMParser
```

</dd>

<dt>

`rules: readonly ParseRule[]`

</dt>

<dd>

The set of [parse rules](https://prosemirror.net/docs/ref/#model.ParseRule) that the parser
uses, in order of precedence.

</dd>

<dt>

`schema: Schema`

</dt>

<dd>

The schema into which the parser parses.

</dd>

<dt>

`parse`

</dt>

<dd>

Parse a document from the content of a DOM node.

```ts
const parse: (dom: Node, options?: ParseOptions) => ProseMirrorNode
```

</dd>

<dt>

`parseSlice`

</dt>

<dd>

Parses the content of the given DOM node, like
[`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse), and takes the same set of
options. But unlike that method, which produces a whole node,
this one returns a slice that is open at the sides, meaning that
the schema constraints aren't applied to the start of nodes to
the left of the input and the end of nodes at the end.

```ts
const parseSlice: (dom: Node, options?: ParseOptions) => Slice
```

</dd>

<dt>

`fromSchema`

</dt>

<dd>

Construct a DOM parser using the parsing rules listed in a
schema's [node specs](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM), reordered by
[priority](https://prosemirror.net/docs/ref/#model.ParseRule.priority).

```ts
const fromSchema: (schema: Schema) => DOMParser
```

</dd>

</dl>

## DOMSerializer {#dom-serializer-1}

A DOM serializer knows how to convert ProseMirror nodes and
marks of various types to DOM nodes.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new DOMSerializer(nodes: { [node]: (node: ProseMirrorNode) => DOMOutputSpec }, marks: { [mark]: (mark: Mark, inline: boolean) => DOMOutputSpec }): DOMSerializer
```

</dd>

<dt>

`marks: { [mark]: (mark: Mark, inline: boolean) => DOMOutputSpec }`

</dt>

<dd>

The mark serialization functions.

</dd>

<dt>

`nodes: { [node]: (node: ProseMirrorNode) => DOMOutputSpec }`

</dt>

<dd>

The node serialization functions.

</dd>

<dt>

`serializeFragment`

</dt>

<dd>

Serialize the content of this fragment to a DOM fragment. When
not in the browser, the `document` option, containing a DOM
document, should be passed so that the serializer can create
nodes.

```ts
const serializeFragment: (fragment: ProseMirrorFragment, options?: { document?: Document }, target?: HTMLElement | DocumentFragment) => HTMLElement | DocumentFragment
```

</dd>

<dt>

`serializeNode`

</dt>

<dd>

Serialize this node to a DOM node. This can be useful when you
need to serialize a part of a document, as opposed to the whole
document. To serialize a whole document, use
[`serializeFragment`](https://prosemirror.net/docs/ref/#model.DOMSerializer.serializeFragment) on
its [content](https://prosemirror.net/docs/ref/#model.Node.content).

```ts
const serializeNode: (node: ProseMirrorNode, options?: { document?: Document }) => Node
```

</dd>

<dt>

`fromSchema`

</dt>

<dd>

Build a serializer using the [`toDOM`](https://prosemirror.net/docs/ref/#model.NodeSpec.toDOM)
properties in a schema's node and mark specs.

```ts
const fromSchema: (schema: Schema) => DOMSerializer
```

</dd>

<dt>

`marksFromSchema`

</dt>

<dd>

Gather the serializers in a schema's mark specs into an object.

```ts
const marksFromSchema: (schema: Schema) => { [mark]: (mark: Mark, inline: boolean) => DOMOutputSpec }
```

</dd>

<dt>

`nodesFromSchema`

</dt>

<dd>

Gather the serializers in a schema's node specs into an object.
This can be useful as a base to build a custom serializer from.

```ts
const nodesFromSchema: (schema: Schema) => { [node]: (node: ProseMirrorNode) => DOMOutputSpec }
```

</dd>

<dt>

`renderSpec`

</dt>

<dd>

Render an [output spec](https://prosemirror.net/docs/ref/#model.DOMOutputSpec) to a DOM node. If
the spec has a hole (zero) in it, `contentDOM` will point at the
node with the hole.

```ts
const renderSpec: (doc: Document, structure: DOMOutputSpec, xmlNS?: null | string) => { contentDOM?: HTMLElement; dom: Node }
```

</dd>

</dl>

## Mark {#mark}

A mark is a piece of information that can be attached to a node,
such as it being emphasized, in code font, or a link. It has a
type and optionally a set of attributes that provide further
information (such as the target of the link). Marks are created
through a `Schema`, which controls which types exist and which
attributes they have.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new Mark(): Mark
```

</dd>

<dt>

`attrs: Attrs`

</dt>

<dd>

The attributes associated with this mark.

</dd>

<dt>

`type: MarkType`

</dt>

<dd>

The type of this mark.

</dd>

<dt>

`none: readonly Mark[]`

</dt>

<dd>

The empty set of marks.

</dd>

<dt>

`addToSet`

</dt>

<dd>

Given a set of marks, create a new set which contains this one as
well, in the right position. If this mark is already in the set,
the set itself is returned. If any marks that are set to be
[exclusive](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) with this mark are present,
those are replaced by this one.

```ts
const addToSet: (set: readonly Mark[]) => readonly Mark[]
```

</dd>

<dt>

`eq`

</dt>

<dd>

Test whether this mark has the same type and attributes as
another mark.

```ts
const eq: (other: Mark) => boolean
```

</dd>

<dt>

`isInSet`

</dt>

<dd>

Test whether this mark is in the given set of marks.

```ts
const isInSet: (set: readonly Mark[]) => boolean
```

</dd>

<dt>

`removeFromSet`

</dt>

<dd>

Remove this mark from the given set, returning a new set. If this
mark is not in the set, the set itself is returned.

```ts
const removeFromSet: (set: readonly Mark[]) => readonly Mark[]
```

</dd>

<dt>

`toJSON`

</dt>

<dd>

Convert this mark to a JSON-serializeable representation.

```ts
const toJSON: () => any
```

</dd>

<dt>

`fromJSON`

</dt>

<dd>

Deserialize a mark from JSON.

```ts
const fromJSON: (schema: Schema, json: any) => Mark
```

</dd>

<dt>

`sameSet`

</dt>

<dd>

Test whether two sets of marks are identical.

```ts
const sameSet: (a: readonly Mark[], b: readonly Mark[]) => boolean
```

</dd>

<dt>

`setFrom`

</dt>

<dd>

Create a properly sorted mark set from null, a single mark, or an
unsorted array of marks.

```ts
const setFrom: (marks?: null | Mark | readonly Mark[]) => readonly Mark[]
```

</dd>

</dl>

## MarkType {#mark-type}

Like nodes, marks (which are associated with nodes to signify
things like emphasis or being part of a link) are
[tagged](https://prosemirror.net/docs/ref/#model.Mark.type) with type objects, which are
instantiated once per `Schema`.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new MarkType(): MarkType
```

</dd>

<dt>

`name: string`

</dt>

<dd>

The name of the mark type.

</dd>

<dt>

`schema: Schema`

</dt>

<dd>

The schema that this mark type instance is part of.

</dd>

<dt>

`spec: MarkSpec`

</dt>

<dd>

The spec on which the type is based.

</dd>

<dt>

`create`

</dt>

<dd>

Create a mark of this type. `attrs` may be `null` or an object
containing only some of the mark's attributes. The others, if
they have defaults, will be added.

```ts
const create: (attrs?: null | Attrs) => Mark
```

</dd>

<dt>

`excludes`

</dt>

<dd>

Queries whether a given mark type is
[excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.

```ts
const excludes: (other: MarkType) => boolean
```

</dd>

<dt>

`isInSet`

</dt>

<dd>

Tests whether there is a mark of this type in the given set.

```ts
const isInSet: (set: readonly Mark[]) => undefined | Mark
```

</dd>

<dt>

`removeFromSet`

</dt>

<dd>

When there is a mark of this type in the given set, a new set
without it is returned. Otherwise, the input set is returned.

```ts
const removeFromSet: (set: readonly Mark[]) => readonly Mark[]
```

</dd>

</dl>

## NodeRange {#node-range}

Represents a flat range of content, i.e. one that starts and
ends in the same node.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new NodeRange($from: ResolvedPos, $to: ResolvedPos, depth: number): NodeRange
```

</dd>

<dt>

`$from: ResolvedPos`

</dt>

<dd>

A resolved position along the start of the content. May have a
`depth` greater than this object's `depth` property, since
these are the positions that were used to compute the range,
not re-resolved positions directly at its boundaries.

</dd>

<dt>

`$to: ResolvedPos`

</dt>

<dd>

A position along the end of the content. See
caveat for [`$from`](https://prosemirror.net/docs/ref/#model.NodeRange.$from).

</dd>

<dt>

`depth: number`

</dt>

<dd>

The depth of the node that this range points into.

</dd>

<dt>

`get end(): number`

</dt>

<dd>

The position at the end of the range.

</dd>

<dt>

`get endIndex(): number`

</dt>

<dd>

The end index of the range in the parent node.

</dd>

<dt>

`get parent(): ProseMirrorNode`

</dt>

<dd>

The parent node that the range points into.

</dd>

<dt>

`get start(): number`

</dt>

<dd>

The position at the start of the range.

</dd>

<dt>

`get startIndex(): number`

</dt>

<dd>

The start index of the range in the parent node.

</dd>

</dl>

## NodeType {#node-type-1}

Node types are objects allocated once per `Schema` and used to
[tag](https://prosemirror.net/docs/ref/#model.Node.type) `Node` instances. They contain information
about the node type, such as its name and what kind of node it
represents.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new NodeType(): NodeType
```

</dd>

<dt>

`contentMatch: ContentMatch`

</dt>

<dd>

The starting match of the node type's content expression.

</dd>

<dt>

`inlineContent: boolean`

</dt>

<dd>

True if this node type has inline content.

</dd>

<dt>

`isBlock: boolean`

</dt>

<dd>

True if this is a block type

</dd>

<dt>

`isText: boolean`

</dt>

<dd>

True if this is the text node type.

</dd>

<dt>

`markSet: null | readonly MarkType[]`

</dt>

<dd>

The set of marks allowed in this node. `null` means all marks
are allowed.

</dd>

<dt>

`name: string`

</dt>

<dd>

The name the node type has in this schema.

</dd>

<dt>

`schema: Schema`

</dt>

<dd>

A link back to the `Schema` the node type belongs to.

</dd>

<dt>

`spec: NodeSpec`

</dt>

<dd>

The spec that this type is based on

</dd>

<dt>

`get isAtom(): boolean`

</dt>

<dd>

True when this node is an atom, i.e. when it does not have
directly editable content.

</dd>

<dt>

`get isInline(): boolean`

</dt>

<dd>

True if this is an inline type.

</dd>

<dt>

`get isLeaf(): boolean`

</dt>

<dd>

True for node types that allow no content.

</dd>

<dt>

`get isTextblock(): boolean`

</dt>

<dd>

True if this is a textblock type, a block that contains inline
content.

</dd>

<dt>

`get whitespace(): "pre" | "normal"`

</dt>

<dd>

The node type's [whitespace](https://prosemirror.net/docs/ref/#model.NodeSpec.whitespace) option.

</dd>

<dt>

`allowedMarks`

</dt>

<dd>

Removes the marks that are not allowed in this node from the given set.

```ts
const allowedMarks: (marks: readonly Mark[]) => readonly Mark[]
```

</dd>

<dt>

`allowsMarks`

</dt>

<dd>

Test whether the given set of marks are allowed in this node.

```ts
const allowsMarks: (marks: readonly Mark[]) => boolean
```

</dd>

<dt>

`allowsMarkType`

</dt>

<dd>

Check whether the given mark type is allowed in this node.

```ts
const allowsMarkType: (markType: MarkType) => boolean
```

</dd>

<dt>

`compatibleContent`

</dt>

<dd>

Indicates whether this node allows some of the same content as
the given node type.

```ts
const compatibleContent: (other: NodeType) => boolean
```

</dd>

<dt>

`create`

</dt>

<dd>

Create a `Node` of this type. The given attributes are
checked and defaulted (you can pass `null` to use the type's
defaults entirely, if no required attributes exist). `content`
may be a `Fragment`, a node, an array of nodes, or
`null`. Similarly `marks` may be `null` to default to the empty
set of marks.

```ts
const create: (attrs?: null | Attrs, content?: null | ProseMirrorNode | ProseMirrorFragment | readonly ProseMirrorNode[], marks?: readonly Mark[]) => ProseMirrorNode
```

</dd>

<dt>

`createAndFill`

</dt>

<dd>

Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but see if it is
necessary to add nodes to the start or end of the given fragment
to make it fit the node. If no fitting wrapping can be found,
return null. Note that, due to the fact that required nodes can
always be created, this will always succeed if you pass null or
`Fragment.empty` as content.

```ts
const createAndFill: (attrs?: null | Attrs, content?: null | ProseMirrorNode | ProseMirrorFragment | readonly ProseMirrorNode[], marks?: readonly Mark[]) => null | ProseMirrorNode
```

</dd>

<dt>

`createChecked`

</dt>

<dd>

Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
against the node type's content restrictions, and throw an error
if it doesn't match.

```ts
const createChecked: (attrs?: null | Attrs, content?: null | ProseMirrorNode | ProseMirrorFragment | readonly ProseMirrorNode[], marks?: readonly Mark[]) => ProseMirrorNode
```

</dd>

<dt>

`hasRequiredAttrs`

</dt>

<dd>

Tells you whether this node type has any required attributes.

```ts
const hasRequiredAttrs: () => boolean
```

</dd>

<dt>

`isInGroup`

</dt>

<dd>

Return true when this node type is part of the given
[group](https://prosemirror.net/docs/ref/#model.NodeSpec.group).

```ts
const isInGroup: (group: string) => boolean
```

</dd>

<dt>

`validContent`

</dt>

<dd>

Returns true if the given fragment is valid content for this node
type.

```ts
const validContent: (content: ProseMirrorFragment) => boolean
```

</dd>

</dl>

## ProseMirrorFragment {#prose-mirror-fragment}

A fragment represents a node's collection of child nodes.

Like nodes, fragments are persistent data structures, and you
should not mutate them or their content. Rather, you create new
instances whenever needed. The API tries to make this easy.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new ProseMirrorFragment(): ProseMirrorFragment
```

</dd>

<dt>

`content: readonly ProseMirrorNode[]`

</dt>

<dd>

The child nodes in this fragment.

</dd>

<dt>

`size: number`

</dt>

<dd>

The size of the fragment, which is the total of the size of
its content nodes.

</dd>

<dt>

`empty: ProseMirrorFragment`

</dt>

<dd>

An empty fragment. Intended to be reused whenever a node doesn't
contain anything (rather than allocating a new empty fragment for
each leaf node).

</dd>

<dt>

`get childCount(): number`

</dt>

<dd>

The number of child nodes in this fragment.

</dd>

<dt>

`get firstChild(): null | ProseMirrorNode`

</dt>

<dd>

The first child of the fragment, or `null` if it is empty.

</dd>

<dt>

`get lastChild(): null | ProseMirrorNode`

</dt>

<dd>

The last child of the fragment, or `null` if it is empty.

</dd>

<dt>

`addToEnd`

</dt>

<dd>

Create a new fragment by appending the given node to this
fragment.

```ts
const addToEnd: (node: ProseMirrorNode) => ProseMirrorFragment
```

</dd>

<dt>

`addToStart`

</dt>

<dd>

Create a new fragment by prepending the given node to this
fragment.

```ts
const addToStart: (node: ProseMirrorNode) => ProseMirrorFragment
```

</dd>

<dt>

`append`

</dt>

<dd>

Create a new fragment containing the combined content of this
fragment and the other.

```ts
const append: (other: ProseMirrorFragment) => ProseMirrorFragment
```

</dd>

<dt>

`child`

</dt>

<dd>

Get the child node at the given index. Raise an error when the
index is out of range.

```ts
const child: (index: number) => ProseMirrorNode
```

</dd>

<dt>

`cut`

</dt>

<dd>

Cut out the sub-fragment between the two given positions.

```ts
const cut: (from: number, to?: number) => ProseMirrorFragment
```

</dd>

<dt>

`descendants`

</dt>

<dd>

Call the given callback for every descendant node. `pos` will be
relative to the start of the fragment. The callback may return
`false` to prevent traversal of a given node's children.

```ts
const descendants: (f: (node: ProseMirrorNode, pos: number, parent: null | ProseMirrorNode, index: number) => boolean | void) => void
```

</dd>

<dt>

`eq`

</dt>

<dd>

Compare this fragment to another one.

```ts
const eq: (other: ProseMirrorFragment) => boolean
```

</dd>

<dt>

`findDiffEnd`

</dt>

<dd>

Find the first position, searching from the end, at which this
fragment and the given fragment differ, or `null` if they are
the same. Since this position will not be the same in both
nodes, an object with two separate positions is returned.

```ts
const findDiffEnd: (other: ProseMirrorFragment, pos?: number, otherPos?: number) => null | ({ a: number; b: number })
```

</dd>

<dt>

`findDiffStart`

</dt>

<dd>

Find the first position at which this fragment and another
fragment differ, or `null` if they are the same.

```ts
const findDiffStart: (other: ProseMirrorFragment, pos?: number) => null | number
```

</dd>

<dt>

`forEach`

</dt>

<dd>

Call `f` for every child node, passing the node, its offset
into this parent node, and its index.

```ts
const forEach: (f: (node: ProseMirrorNode, offset: number, index: number) => void) => void
```

</dd>

<dt>

`maybeChild`

</dt>

<dd>

Get the child node at the given index, if it exists.

```ts
const maybeChild: (index: number) => null | ProseMirrorNode
```

</dd>

<dt>

`nodesBetween`

</dt>

<dd>

Invoke a callback for all descendant nodes between the given two
positions (relative to start of this fragment). Doesn't descend
into a node when the callback returns `false`.

```ts
const nodesBetween: (from: number, to: number, f: (node: ProseMirrorNode, start: number, parent: null | ProseMirrorNode, index: number) => boolean | void, nodeStart?: number, parent?: ProseMirrorNode) => void
```

</dd>

<dt>

`replaceChild`

</dt>

<dd>

Create a new fragment in which the node at the given index is
replaced by the given node.

```ts
const replaceChild: (index: number, node: ProseMirrorNode) => ProseMirrorFragment
```

</dd>

<dt>

`textBetween`

</dt>

<dd>

Extract the text between `from` and `to`. See the same method on
[`Node`](https://prosemirror.net/docs/ref/#model.Node.textBetween).

```ts
const textBetween: (from: number, to: number, blockSeparator?: null | string, leafText?: null | string | ((leafNode: ProseMirrorNode) => string)) => string
```

</dd>

<dt>

`toJSON`

</dt>

<dd>

Create a JSON-serializeable representation of this fragment.

```ts
const toJSON: () => any
```

</dd>

<dt>

`toString`

</dt>

<dd>

Return a debugging string that describes this fragment.

```ts
const toString: () => string
```

</dd>

<dt>

`from`

</dt>

<dd>

Create a fragment from something that can be interpreted as a
set of nodes. For `null`, it returns the empty fragment. For a
fragment, the fragment itself. For a node or array of nodes, a
fragment containing those nodes.

```ts
const from: (nodes?: null | ProseMirrorNode | ProseMirrorFragment | readonly ProseMirrorNode[]) => ProseMirrorFragment
```

</dd>

<dt>

`fromArray`

</dt>

<dd>

Build a fragment from an array of nodes. Ensures that adjacent
text nodes with the same marks are joined together.

```ts
const fromArray: (array: readonly ProseMirrorNode[]) => ProseMirrorFragment
```

</dd>

<dt>

`fromJSON`

</dt>

<dd>

Deserialize a fragment from its JSON representation.

```ts
const fromJSON: (schema: Schema, value: any) => ProseMirrorFragment
```

</dd>

</dl>

## ProseMirrorNode {#prose-mirror-node}

This class represents a node in the tree that makes up a
ProseMirror document. So a document is an instance of `Node`, with
children that are also instances of `Node`.

Nodes are persistent data structures. Instead of changing them, you
create new ones with the content you want. Old ones keep pointing
at the old document shape. This is made cheaper by sharing
structure between the old and new data as much as possible, which a
tree shape like this (without back pointers) makes easy.

**Do not** directly mutate the properties of a `Node` object. See
[the guide](https://prosemirror.net/docs/guide/#doc) for more information.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new ProseMirrorNode(): ProseMirrorNode
```

</dd>

<dt>

`attrs: Attrs`

</dt>

<dd>

An object mapping attribute names to values. The kind of
attributes allowed and required are
[determined](https://prosemirror.net/docs/ref/#model.NodeSpec.attrs) by the node type.

</dd>

<dt>

`content: ProseMirrorFragment`

</dt>

<dd>

A container holding the node's children.

</dd>

<dt>

`marks: readonly Mark[]`

</dt>

<dd>

The marks (things like whether it is emphasized or part of a
link) applied to this node.

</dd>

<dt>

`text: undefined | string`

</dt>

<dd>

For text nodes, this contains the node's text content.

</dd>

<dt>

`type: NodeType`

</dt>

<dd>

The type of node that this is.

</dd>

<dt>

`get childCount(): number`

</dt>

<dd>

The number of children that the node has.

</dd>

<dt>

`get children(): readonly ProseMirrorNode[]`

</dt>

<dd>

The array of this node's child nodes.

</dd>

<dt>

`get firstChild(): null | ProseMirrorNode`

</dt>

<dd>

Returns this node's first child, or `null` if there are no
children.

</dd>

<dt>

`get inlineContent(): boolean`

</dt>

<dd>

True when this node allows inline content.

</dd>

<dt>

`get isAtom(): boolean`

</dt>

<dd>

True when this is an atom, i.e. when it does not have directly
editable content. This is usually the same as `isLeaf`, but can
be configured with the [`atom` property](https://prosemirror.net/docs/ref/#model.NodeSpec.atom)
on a node's spec (typically used when the node is displayed as
an uneditable [node view](https://prosemirror.net/docs/ref/#view.NodeView)).

</dd>

<dt>

`get isBlock(): boolean`

</dt>

<dd>

True when this is a block (non-inline node)

</dd>

<dt>

`get isInline(): boolean`

</dt>

<dd>

True when this is an inline node (a text node or a node that can
appear among text).

</dd>

<dt>

`get isLeaf(): boolean`

</dt>

<dd>

True when this is a leaf node.

</dd>

<dt>

`get isText(): boolean`

</dt>

<dd>

True when this is a text node.

</dd>

<dt>

`get isTextblock(): boolean`

</dt>

<dd>

True when this is a textblock node, a block node with inline
content.

</dd>

<dt>

`get lastChild(): null | ProseMirrorNode`

</dt>

<dd>

Returns this node's last child, or `null` if there are no
children.

</dd>

<dt>

`get nodeSize(): number`

</dt>

<dd>

The size of this node, as defined by the integer-based [indexing
scheme](https://prosemirror.net/docs/guide/#doc.indexing). For text nodes, this is the
amount of characters. For other leaf nodes, it is one. For
non-leaf nodes, it is the size of the content plus two (the
start and end token).

</dd>

<dt>

`get textContent(): string`

</dt>

<dd>

Concatenates all the text nodes found in this fragment and its
children.

</dd>

<dt>

`canAppend`

</dt>

<dd>

Test whether the given node's content could be appended to this
node. If that node is empty, this will only return true if there
is at least one node type that can appear in both nodes (to avoid
merging completely incompatible nodes).

```ts
const canAppend: (other: ProseMirrorNode) => boolean
```

</dd>

<dt>

`canReplace`

</dt>

<dd>

Test whether replacing the range between `from` and `to` (by
child index) with the given replacement fragment (which defaults
to the empty fragment) would leave the node's content valid. You
can optionally pass `start` and `end` indices into the
replacement fragment.

```ts
const canReplace: (from: number, to: number, replacement?: ProseMirrorFragment, start?: number, end?: number) => boolean
```

</dd>

<dt>

`canReplaceWith`

</dt>

<dd>

Test whether replacing the range `from` to `to` (by index) with
a node of the given type would leave the node's content valid.

```ts
const canReplaceWith: (from: number, to: number, type: NodeType, marks?: readonly Mark[]) => boolean
```

</dd>

<dt>

`check`

</dt>

<dd>

Check whether this node and its descendants conform to the
schema, and raise an exception when they do not.

```ts
const check: () => void
```

</dd>

<dt>

`child`

</dt>

<dd>

Get the child node at the given index. Raises an error when the
index is out of range.

```ts
const child: (index: number) => ProseMirrorNode
```

</dd>

<dt>

`childAfter`

</dt>

<dd>

Find the (direct) child node after the given offset, if any,
and return it along with its index and offset relative to this
node.

```ts
const childAfter: (pos: number) => { index: number; node: null | ProseMirrorNode; offset: number }
```

</dd>

<dt>

`childBefore`

</dt>

<dd>

Find the (direct) child node before the given offset, if any,
and return it along with its index and offset relative to this
node.

```ts
const childBefore: (pos: number) => { index: number; node: null | ProseMirrorNode; offset: number }
```

</dd>

<dt>

`contentMatchAt`

</dt>

<dd>

Get the content match in this node at the given index.

```ts
const contentMatchAt: (index: number) => ContentMatch
```

</dd>

<dt>

`copy`

</dt>

<dd>

Create a new node with the same markup as this node, containing
the given content (or empty, if no content is given).

```ts
const copy: (content?: null | ProseMirrorFragment) => ProseMirrorNode
```

</dd>

<dt>

`cut`

</dt>

<dd>

Create a copy of this node with only the content between the
given positions. If `to` is not given, it defaults to the end of
the node.

```ts
const cut: (from: number, to?: number) => ProseMirrorNode
```

</dd>

<dt>

`descendants`

</dt>

<dd>

Call the given callback for every descendant node. Doesn't
descend into a node when the callback returns `false`.

```ts
const descendants: (f: (node: ProseMirrorNode, pos: number, parent: null | ProseMirrorNode, index: number) => boolean | void) => void
```

</dd>

<dt>

`eq`

</dt>

<dd>

Test whether two nodes represent the same piece of document.

```ts
const eq: (other: ProseMirrorNode) => boolean
```

</dd>

<dt>

`forEach`

</dt>

<dd>

Call `f` for every child node, passing the node, its offset
into this parent node, and its index.

```ts
const forEach: (f: (node: ProseMirrorNode, offset: number, index: number) => void) => void
```

</dd>

<dt>

`hasMarkup`

</dt>

<dd>

Check whether this node's markup correspond to the given type,
attributes, and marks.

```ts
const hasMarkup: (type: NodeType, attrs?: null | Attrs, marks?: readonly Mark[]) => boolean
```

</dd>

<dt>

`mark`

</dt>

<dd>

Create a copy of this node, with the given set of marks instead
of the node's own marks.

```ts
const mark: (marks: readonly Mark[]) => ProseMirrorNode
```

</dd>

<dt>

`maybeChild`

</dt>

<dd>

Get the child node at the given index, if it exists.

```ts
const maybeChild: (index: number) => null | ProseMirrorNode
```

</dd>

<dt>

`nodeAt`

</dt>

<dd>

Find the node directly after the given position.

```ts
const nodeAt: (pos: number) => null | ProseMirrorNode
```

</dd>

<dt>

`nodesBetween`

</dt>

<dd>

Invoke a callback for all descendant nodes recursively between
the given two positions that are relative to start of this
node's content. The callback is invoked with the node, its
position relative to the original node (method receiver),
its parent node, and its child index. When the callback returns
false for a given node, that node's children will not be
recursed over. The last parameter can be used to specify a
starting position to count from.

```ts
const nodesBetween: (from: number, to: number, f: (node: ProseMirrorNode, pos: number, parent: null | ProseMirrorNode, index: number) => boolean | void, startPos?: number) => void
```

</dd>

<dt>

`rangeHasMark`

</dt>

<dd>

Test whether a given mark or mark type occurs in this document
between the two given positions.

```ts
const rangeHasMark: (from: number, to: number, type: MarkType | Mark) => boolean
```

</dd>

<dt>

`replace`

</dt>

<dd>

Replace the part of the document between the given positions with
the given slice. The slice must 'fit', meaning its open sides
must be able to connect to the surrounding content, and its
content nodes must be valid children for the node they are placed
into. If any of this is violated, an error of type
[`ReplaceError`](https://prosemirror.net/docs/ref/#model.ReplaceError) is thrown.

```ts
const replace: (from: number, to: number, slice: Slice) => ProseMirrorNode
```

</dd>

<dt>

`resolve`

</dt>

<dd>

Resolve the given position in the document, returning an
[object](https://prosemirror.net/docs/ref/#model.ResolvedPos) with information about its context.

```ts
const resolve: (pos: number) => ResolvedPos
```

</dd>

<dt>

`sameMarkup`

</dt>

<dd>

Compare the markup (type, attributes, and marks) of this node to
those of another. Returns `true` if both have the same markup.

```ts
const sameMarkup: (other: ProseMirrorNode) => boolean
```

</dd>

<dt>

`slice`

</dt>

<dd>

Cut out the part of the document between the given positions, and
return it as a `Slice` object.

```ts
const slice: (from: number, to?: number, includeParents?: boolean) => Slice
```

</dd>

<dt>

`textBetween`

</dt>

<dd>

Get all text between positions `from` and `to`. When
`blockSeparator` is given, it will be inserted to separate text
from different block nodes. If `leafText` is given, it'll be
inserted for every non-text leaf node encountered, otherwise
[`leafText`](https://prosemirror.net/docs/ref/#model.NodeSpec^leafText) will be used.

```ts
const textBetween: (from: number, to: number, blockSeparator?: null | string, leafText?: null | string | ((leafNode: ProseMirrorNode) => string)) => string
```

</dd>

<dt>

`toJSON`

</dt>

<dd>

Return a JSON-serializeable representation of this node.

```ts
const toJSON: () => any
```

</dd>

<dt>

`toString`

</dt>

<dd>

Return a string representation of this node for debugging
purposes.

```ts
const toString: () => string
```

</dd>

<dt>

`fromJSON`

</dt>

<dd>

Deserialize a node from its JSON representation.

```ts
const fromJSON: (schema: Schema, json: any) => ProseMirrorNode
```

</dd>

</dl>

## ReplaceError {#replace-error}

**Extends** `Error`

Error type raised by [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) when
given an invalid replacement.

<dl>

</dl>

## ResolvedPos {#resolved-pos}

You can [*resolve*](https://prosemirror.net/docs/ref/#model.Node.resolve) a position to get more
information about it. Objects of this class represent such a
resolved position, providing various pieces of context
information, and some helper methods.

Throughout this interface, methods that take an optional `depth`
parameter will interpret undefined as `this.depth` and negative
numbers as `this.depth + value`.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new ResolvedPos(): ResolvedPos
```

</dd>

<dt>

`depth: number`

</dt>

<dd>

The number of levels the parent node is from the root. If this
position points directly into the root node, it is 0. If it
points into a top-level paragraph, 1, and so on.

</dd>

<dt>

`parentOffset: number`

</dt>

<dd>

The offset this position has into its parent node.

</dd>

<dt>

`pos: number`

</dt>

<dd>

The position that was resolved.

</dd>

<dt>

`get doc(): ProseMirrorNode`

</dt>

<dd>

The root node in which the position was resolved.

</dd>

<dt>

`get nodeAfter(): null | ProseMirrorNode`

</dt>

<dd>

Get the node directly after the position, if any. If the position
points into a text node, only the part of that node after the
position is returned.

</dd>

<dt>

`get nodeBefore(): null | ProseMirrorNode`

</dt>

<dd>

Get the node directly before the position, if any. If the
position points into a text node, only the part of that node
before the position is returned.

</dd>

<dt>

`get parent(): ProseMirrorNode`

</dt>

<dd>

The parent node that the position points into. Note that even if
a position points into a text node, that node is not considered
the parent—text nodes are ‘flat’ in this model, and have no content.

</dd>

<dt>

`get textOffset(): number`

</dt>

<dd>

When this position points into a text node, this returns the
distance between the position and the start of the text node.
Will be zero for positions that point between nodes.

</dd>

<dt>

`after`

</dt>

<dd>

The (absolute) position directly after the wrapping node at the
given level, or the original position when `depth` is `this.depth + 1`.

```ts
const after: (depth?: null | number) => number
```

</dd>

<dt>

`before`

</dt>

<dd>

The (absolute) position directly before the wrapping node at the
given level, or, when `depth` is `this.depth + 1`, the original
position.

```ts
const before: (depth?: null | number) => number
```

</dd>

<dt>

`blockRange`

</dt>

<dd>

Returns a range based on the place where this position and the
given position diverge around block content. If both point into
the same textblock, for example, a range around that textblock
will be returned. If they point into different blocks, the range
around those blocks in their shared ancestor is returned. You can
pass in an optional predicate that will be called with a parent
node to see if a range into that parent is acceptable.

```ts
const blockRange: (other?: ResolvedPos, pred?: (node: ProseMirrorNode) => boolean) => null | NodeRange
```

</dd>

<dt>

`end`

</dt>

<dd>

The (absolute) position at the end of the node at the given
level.

```ts
const end: (depth?: null | number) => number
```

</dd>

<dt>

`index`

</dt>

<dd>

The index into the ancestor at the given level. If this points
at the 3rd node in the 2nd paragraph on the top level, for
example, `p.index(0)` is 1 and `p.index(1)` is 2.

```ts
const index: (depth?: null | number) => number
```

</dd>

<dt>

`indexAfter`

</dt>

<dd>

The index pointing after this position into the ancestor at the
given level.

```ts
const indexAfter: (depth?: null | number) => number
```

</dd>

<dt>

`marks`

</dt>

<dd>

Get the marks at this position, factoring in the surrounding
marks' [`inclusive`](https://prosemirror.net/docs/ref/#model.MarkSpec.inclusive) property. If the
position is at the start of a non-empty node, the marks of the
node after it (if any) are returned.

```ts
const marks: () => readonly Mark[]
```

</dd>

<dt>

`marksAcross`

</dt>

<dd>

Get the marks after the current position, if any, except those
that are non-inclusive and not present at position `$end`. This
is mostly useful for getting the set of marks to preserve after a
deletion. Will return `null` if this position is at the end of
its parent node or its parent node isn't a textblock (in which
case no marks should be preserved).

```ts
const marksAcross: ($end: ResolvedPos) => null | readonly Mark[]
```

</dd>

<dt>

`max`

</dt>

<dd>

Return the greater of this and the given position.

```ts
const max: (other: ResolvedPos) => ResolvedPos
```

</dd>

<dt>

`min`

</dt>

<dd>

Return the smaller of this and the given position.

```ts
const min: (other: ResolvedPos) => ResolvedPos
```

</dd>

<dt>

`node`

</dt>

<dd>

The ancestor node at the given level. `p.node(p.depth)` is the
same as `p.parent`.

```ts
const node: (depth?: null | number) => ProseMirrorNode
```

</dd>

<dt>

`posAtIndex`

</dt>

<dd>

Get the position at the given index in the parent node at the
given depth (which defaults to `this.depth`).

```ts
const posAtIndex: (index: number, depth?: null | number) => number
```

</dd>

<dt>

`sameParent`

</dt>

<dd>

Query whether the given position shares the same parent node.

```ts
const sameParent: (other: ResolvedPos) => boolean
```

</dd>

<dt>

`sharedDepth`

</dt>

<dd>

The depth up to which this position and the given (non-resolved)
position share the same parent nodes.

```ts
const sharedDepth: (pos: number) => number
```

</dd>

<dt>

`start`

</dt>

<dd>

The (absolute) position at the start of the node at the given
level.

```ts
const start: (depth?: null | number) => number
```

</dd>

</dl>

## Schema {#schema-7}

A document schema. Holds [node](https://prosemirror.net/docs/ref/#model.NodeType) and [mark
type](https://prosemirror.net/docs/ref/#model.MarkType) objects for the nodes and marks that may
occur in conforming documents, and provides functionality for
creating and deserializing such documents.

When given, the type parameters provide the names of the nodes and
marks in this schema.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new Schema<Nodes extends string, Marks extends string>(spec: SchemaSpec<Nodes, Marks>): Schema<Nodes, Marks>
```

</dd>

<dt>

`cached: { [key]: any }`

</dt>

<dd>

An object for storing whatever values modules may want to
compute and cache per schema. (If you want to store something
in it, try to use property names unlikely to clash.)

</dd>

<dt>

`linebreakReplacement: null | NodeType`

</dt>

<dd>

The [linebreak
replacement](https://prosemirror.net/docs/ref/#model.NodeSpec.linebreakReplacement) node defined
in this schema, if any.

</dd>

<dt>

`marks: {readonly[name in string]: MarkType} & { [key]: MarkType }`

</dt>

<dd>

A map from mark names to mark type objects.

</dd>

<dt>

`nodes: {readonly[name in string]: NodeType} & { [key]: NodeType }`

</dt>

<dd>

An object mapping the schema's node names to node type objects.

</dd>

<dt>

`spec: { marks: OrderedMap<MarkSpec>; nodes: OrderedMap<NodeSpec>; topNode?: string }`

</dt>

<dd>

The [spec](https://prosemirror.net/docs/ref/#model.SchemaSpec) on which the schema is based,
with the added guarantee that its `nodes` and `marks`
properties are
[`OrderedMap`](https://github.com/marijnh/orderedmap) instances
(not raw objects).

</dd>

<dt>

`topNodeType: NodeType`

</dt>

<dd>

The type of the [default top node](https://prosemirror.net/docs/ref/#model.SchemaSpec.topNode)
for this schema.

</dd>

<dt>

`mark`

</dt>

<dd>

Create a mark with the given type and attributes.

```ts
const mark: (type: string | MarkType, attrs?: null | Attrs) => Mark
```

</dd>

<dt>

`markFromJSON`

</dt>

<dd>

Deserialize a mark from its JSON representation. This method is
bound.

```ts
const markFromJSON: (json: any) => Mark
```

</dd>

<dt>

`node`

</dt>

<dd>

Create a node in this schema. The `type` may be a string or a
`NodeType` instance. Attributes will be extended with defaults,
`content` may be a `Fragment`, `null`, a `Node`, or an array of
nodes.

```ts
const node: (type: string | NodeType, attrs?: null | Attrs, content?: ProseMirrorNode | ProseMirrorFragment | readonly ProseMirrorNode[], marks?: readonly Mark[]) => ProseMirrorNode
```

</dd>

<dt>

`nodeFromJSON`

</dt>

<dd>

Deserialize a node from its JSON representation. This method is
bound.

```ts
const nodeFromJSON: (json: any) => ProseMirrorNode
```

</dd>

<dt>

`text`

</dt>

<dd>

Create a text node in the schema. Empty text nodes are not
allowed.

```ts
const text: (text: string, marks?: null | readonly Mark[]) => ProseMirrorNode
```

</dd>

</dl>

## Slice {#slice-1}

A slice represents a piece cut out of a larger document. It
stores not only a fragment, but also the depth up to which nodes on
both side are ‘open’ (cut through).

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new Slice(content: ProseMirrorFragment, openStart: number, openEnd: number): Slice
```

</dd>

<dt>

`content: ProseMirrorFragment`

</dt>

<dd>

The slice's content.

</dd>

<dt>

`openEnd: number`

</dt>

<dd>

The open depth at the end.

</dd>

<dt>

`openStart: number`

</dt>

<dd>

The open depth at the start of the fragment.

</dd>

<dt>

`empty: Slice`

</dt>

<dd>

The empty slice.

</dd>

<dt>

`get size(): number`

</dt>

<dd>

The size this slice would add when inserted into a document.

</dd>

<dt>

`eq`

</dt>

<dd>

Tests whether this slice is equal to another slice.

```ts
const eq: (other: Slice) => boolean
```

</dd>

<dt>

`toJSON`

</dt>

<dd>

Convert a slice to a JSON-serializable representation.

```ts
const toJSON: () => any
```

</dd>

<dt>

`fromJSON`

</dt>

<dd>

Deserialize a slice from its JSON representation.

```ts
const fromJSON: (schema: Schema, json: any) => Slice
```

</dd>

<dt>

`maxOpen`

</dt>

<dd>

Create a slice from a fragment by taking the maximum possible
open value on both side of the fragment.

```ts
const maxOpen: (fragment: ProseMirrorFragment, openIsolating?: boolean) => Slice
```

</dd>

</dl>

## AttributeSpec {#attribute-spec}

Used to [define](https://prosemirror.net/docs/ref/#model.NodeSpec.attrs) attributes on nodes or
marks.

<dl>

<dt>

`default?: any`

</dt>

<dd>

The default value for this attribute, to use when no explicit
value is provided. Attributes that have no default must be
provided whenever a node or mark of a type that has them is
created.

</dd>

<dt>

`splittable?: boolean`

</dt>

<dd>

Indicates if the block can be split using the `splitBlockAs` command.

When `splittable` is set to `true`, splitting the block with the
`splitSplittableBlock` command will pass this attribute to the newly
created block. This new block may be of a different type than the original.

If multiple block types in the schema share the same `splittable` attribute,
ensure they are compatible in type and definition. This compatibility allows
the attribute value to be correctly inherited across different block types.

</dd>

<dt>

`validate?: string | ((value: any) => void)`

</dt>

<dd>

A function or type name used to validate values of this
attribute. This will be used when deserializing the attribute
from JSON, and when running [`Node.check`](https://prosemirror.net/docs/ref/#model.Node.check).
When a function, it should raise an exception if the value isn't
of the expected type or shape. When a string, it should be a
`|`-separated string of primitive types (`"number"`, `"string"`,
`"boolean"`, `"null"`, and `"undefined"`), and the library will
raise an error when the value is not one of those types.

</dd>

</dl>

## GenericParseRule {#generic-parse-rule}

Fields that may be present in both [tag](https://prosemirror.net/docs/ref/#model.TagParseRule) and
[style](https://prosemirror.net/docs/ref/#model.StyleParseRule) parse rules.

<dl>

<dt>

`attrs?: Attrs`

</dt>

<dd>

Attributes for the node or mark created by this rule. When
`getAttrs` is provided, it takes precedence.

</dd>

<dt>

`closeParent?: boolean`

</dt>

<dd>

When true, finding an element that matches this rule will close
the current node.

</dd>

<dt>

`consuming?: boolean`

</dt>

<dd>

By default, when a rule matches an element or style, no further
rules get a chance to match it. By setting this to `false`, you
indicate that even when this rule matches, other rules that come
after it should also run.

</dd>

<dt>

`context?: string`

</dt>

<dd>

When given, restricts this rule to only match when the current
context—the parent nodes into which the content is being
parsed—matches this expression. Should contain one or more node
names or node group names followed by single or double slashes.
For example `"paragraph/"` means the rule only matches when the
parent node is a paragraph, `"blockquote/paragraph/"` restricts
it to be in a paragraph that is inside a blockquote, and
`"section//"` matches any position inside a section—a double
slash matches any sequence of ancestor nodes. To allow multiple
different contexts, they can be separated by a pipe (`|`)
character, as in `"blockquote/|list_item/"`.

</dd>

<dt>

`ignore?: boolean`

</dt>

<dd>

When true, ignore content that matches this rule.

</dd>

<dt>

`mark?: string`

</dt>

<dd>

The name of the mark type to wrap the matched content in.

</dd>

<dt>

`priority?: number`

</dt>

<dd>

Can be used to change the order in which the parse rules in a
schema are tried. Those with higher priority come first. Rules
without a priority are counted as having priority 50. This
property is only meaningful in a schema—when directly
constructing a parser, the order of the rule array is used.

</dd>

<dt>

`skip?: boolean`

</dt>

<dd>

When true, ignore the node that matches this rule, but do parse
its content.

</dd>

</dl>

## MarkSpec {#mark-spec}

Used to define marks when creating a schema.

<dl>

<dt>

`attrs?: { [name]: AttributeSpec }`

</dt>

<dd>

The attributes that marks of this type get.

</dd>

<dt>

`code?: boolean`

</dt>

<dd>

Marks the content of this span as being code, which causes some
commands and extensions to treat it differently.

</dd>

<dt>

`excludes?: string`

</dt>

<dd>

Determines which other marks this mark can coexist with. Should
be a space-separated strings naming other marks or groups of marks.
When a mark is [added](https://prosemirror.net/docs/ref/#model.Mark.addToSet) to a set, all marks
that it excludes are removed in the process. If the set contains
any mark that excludes the new mark but is not, itself, excluded
by the new mark, the mark can not be added an the set. You can
use the value `"_"` to indicate that the mark excludes all
marks in the schema.

Defaults to only being exclusive with marks of the same type. You
can set it to an empty string (or any string not containing the
mark's own name) to allow multiple marks of a given type to
coexist (as long as they have different attributes).

</dd>

<dt>

`group?: string`

</dt>

<dd>

The group or space-separated groups to which this mark belongs.

</dd>

<dt>

`inclusive?: boolean`

</dt>

<dd>

Whether this mark should be active when the cursor is positioned
at its end (or at its start when that is also the start of the
parent node). Defaults to true.

</dd>

<dt>

`parseDOM?: readonly ParseRule[]`

</dt>

<dd>

Associates DOM parser information with this mark (see the
corresponding [node spec field](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM)). The
`mark` field in the rules is implied.

</dd>

<dt>

`spanning?: boolean`

</dt>

<dd>

Determines whether marks of this type can span multiple adjacent
nodes when serialized to DOM/HTML. Defaults to true.

</dd>

<dt>

`toDOM?: (mark: Mark, inline: boolean) => DOMOutputSpec`

</dt>

<dd>

Defines the default way marks of this type should be serialized
to DOM/HTML. When the resulting spec contains a hole, that is
where the marked content is placed. Otherwise, it is appended to
the top node.

</dd>

</dl>

## NodeSpec {#node-spec}

A description of a node type, used when defining a schema.

<dl>

<dt>

`atom?: boolean`

</dt>

<dd>

Can be set to true to indicate that, though this isn't a [leaf
node](https://prosemirror.net/docs/ref/#model.NodeType.isLeaf), it doesn't have directly editable
content and should be treated as a single unit in the view.

</dd>

<dt>

`attrs?: { [name]: AttributeSpec }`

</dt>

<dd>

The attributes that nodes of this type get.

</dd>

<dt>

`code?: boolean`

</dt>

<dd>

Can be used to indicate that this node contains code, which
causes some commands to behave differently.

</dd>

<dt>

`content?: string`

</dt>

<dd>

The content expression for this node, as described in the [schema
guide](https://prosemirror.net/docs/guide/#schema.content_expressions). When not given,
the node does not allow any content.

</dd>

<dt>

`defining?: boolean`

</dt>

<dd>

When enabled, enables both
[`definingAsContext`](https://prosemirror.net/docs/ref/#model.NodeSpec.definingAsContext) and
[`definingForContent`](https://prosemirror.net/docs/ref/#model.NodeSpec.definingForContent).

</dd>

<dt>

`definingAsContext?: boolean`

</dt>

<dd>

Determines whether this node is considered an important parent
node during replace operations (such as paste). Non-defining (the
default) nodes get dropped when their entire content is replaced,
whereas defining nodes persist and wrap the inserted content.

</dd>

<dt>

`definingForContent?: boolean`

</dt>

<dd>

In inserted content the defining parents of the content are
preserved when possible. Typically, non-default-paragraph
textblock types, and possibly list items, are marked as defining.

</dd>

<dt>

`disableDropCursor?: boolean | ((view: EditorView, pos: { inside: number; pos: number }, event: DragEvent) => boolean)`

</dt>

<dd>

</dd>

<dt>

`draggable?: boolean`

</dt>

<dd>

Determines whether nodes of this type can be dragged without
being selected. Defaults to false.

</dd>

<dt>

`group?: string`

</dt>

<dd>

The group or space-separated groups to which this node belongs,
which can be referred to in the content expressions for the
schema.

</dd>

<dt>

`inline?: boolean`

</dt>

<dd>

Should be set to true for inline nodes. (Implied for text nodes.)

</dd>

<dt>

`isolating?: boolean`

</dt>

<dd>

When enabled (default is false), the sides of nodes of this type
count as boundaries that regular editing operations, like
backspacing or lifting, won't cross. An example of a node that
should probably have this enabled is a table cell.

</dd>

<dt>

`leafText?: (node: ProseMirrorNode) => string`

</dt>

<dd>

Defines the default way a [leaf node](https://prosemirror.net/docs/ref/#model.NodeType.isLeaf) of
this type should be serialized to a string (as used by
[`Node.textBetween`](https://prosemirror.net/docs/ref/#model.Node^textBetween) and
[`Node.textContent`](https://prosemirror.net/docs/ref/#model.Node^textContent)).

</dd>

<dt>

`linebreakReplacement?: boolean`

</dt>

<dd>

A single inline node in a schema can be set to be a linebreak
equivalent. When converting between block types that support the
node and block types that don't but have
[`whitespace`](https://prosemirror.net/docs/ref/#model.NodeSpec.whitespace) set to `"pre"`,
[`setBlockType`](https://prosemirror.net/docs/ref/#transform.Transform.setBlockType) will convert
between newline characters to or from linebreak nodes as
appropriate.

</dd>

<dt>

`marks?: string`

</dt>

<dd>

The marks that are allowed inside of this node. May be a
space-separated string referring to mark names or groups, `"_"`
to explicitly allow all marks, or `""` to disallow marks. When
not given, nodes with inline content default to allowing all
marks, other nodes default to not allowing marks.

</dd>

<dt>

`parseDOM?: readonly TagParseRule[]`

</dt>

<dd>

Associates DOM parser information with this node, which can be
used by [`DOMParser.fromSchema`](https://prosemirror.net/docs/ref/#model.DOMParser^fromSchema) to
automatically derive a parser. The `node` field in the rules is
implied (the name of this node will be filled in automatically).
If you supply your own parser, you do not need to also specify
parsing rules in your schema.

</dd>

<dt>

`selectable?: boolean`

</dt>

<dd>

Controls whether nodes of this type can be selected as a [node
selection](https://prosemirror.net/docs/ref/#state.NodeSelection). Defaults to true for non-text
nodes.

</dd>

<dt>

`toDebugString?: (node: ProseMirrorNode) => string`

</dt>

<dd>

Defines the default way a node of this type should be serialized
to a string representation for debugging (e.g. in error messages).

</dd>

<dt>

`toDOM?: (node: ProseMirrorNode) => DOMOutputSpec`

</dt>

<dd>

Defines the default way a node of this type should be serialized
to DOM/HTML (as used by
[`DOMSerializer.fromSchema`](https://prosemirror.net/docs/ref/#model.DOMSerializer^fromSchema)).
Should return a DOM node or an [array
structure](https://prosemirror.net/docs/ref/#model.DOMOutputSpec) that describes one, with an
optional number zero (“hole”) in it to indicate where the node's
content should be inserted.

For text nodes, the default is to create a text DOM node. Though
it is possible to create a serializer where text is rendered
differently, this is not supported inside the editor, so you
shouldn't override that in your text node spec.

</dd>

<dt>

`whitespace?: "pre" | "normal"`

</dt>

<dd>

Controls way whitespace in this a node is parsed. The default is
`"normal"`, which causes the [DOM parser](https://prosemirror.net/docs/ref/#model.DOMParser) to
collapse whitespace in normal mode, and normalize it (replacing
newlines and such with spaces) otherwise. `"pre"` causes the
parser to preserve spaces inside the node. When this option isn't
given, but [`code`](https://prosemirror.net/docs/ref/#model.NodeSpec.code) is true, `whitespace`
will default to `"pre"`. Note that this option doesn't influence
the way the node is rendered—that should be handled by `toDOM`
and/or styling.

</dd>

</dl>

## ParseOptions {#parse-options}

These are the options recognized by the
[`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse) and
[`parseSlice`](https://prosemirror.net/docs/ref/#model.DOMParser.parseSlice) methods.

<dl>

<dt>

`context?: ResolvedPos`

</dt>

<dd>

A set of additional nodes to count as
[context](https://prosemirror.net/docs/ref/#model.ParseRule.context) when parsing, above the
given [top node](https://prosemirror.net/docs/ref/#model.ParseOptions.topNode).

</dd>

<dt>

`findPositions?: { node: Node; offset: number; pos?: number }[]`

</dt>

<dd>

When given, the parser will, beside parsing the content,
record the document positions of the given DOM positions. It
will do so by writing to the objects, adding a `pos` property
that holds the document position. DOM positions that are not
in the parsed content will not be written to.

</dd>

<dt>

`from?: number`

</dt>

<dd>

The child node index to start parsing from.

</dd>

<dt>

`preserveWhitespace?: boolean | "full"`

</dt>

<dd>

By default, whitespace is collapsed as per HTML's rules. Pass
`true` to preserve whitespace, but normalize newlines to
spaces, and `"full"` to preserve whitespace entirely.

</dd>

<dt>

`to?: number`

</dt>

<dd>

The child node index to stop parsing at.

</dd>

<dt>

`topMatch?: ContentMatch`

</dt>

<dd>

Provide the starting content match that content parsed into the
top node is matched against.

</dd>

<dt>

`topNode?: ProseMirrorNode`

</dt>

<dd>

By default, the content is parsed into the schema's default
[top node type](https://prosemirror.net/docs/ref/#model.Schema.topNodeType). You can pass this
option to use the type and attributes from a different node
as the top container.

</dd>

</dl>

## SchemaSpec {#schema-spec}

An object describing a schema, as passed to the [`Schema`](https://prosemirror.net/docs/ref/#model.Schema)
constructor.

<dl>

<dt>

`marks?: {[name in string]: MarkSpec} | OrderedMap<MarkSpec>`

</dt>

<dd>

The mark types that exist in this schema. The order in which they
are provided determines the order in which [mark
sets](https://prosemirror.net/docs/ref/#model.Mark.addToSet) are sorted and in which [parse
rules](https://prosemirror.net/docs/ref/#model.MarkSpec.parseDOM) are tried.

</dd>

<dt>

`nodes: {[name in string]: NodeSpec} | OrderedMap<NodeSpec>`

</dt>

<dd>

The node types in this schema. Maps names to
[`NodeSpec`](https://prosemirror.net/docs/ref/#model.NodeSpec) objects that describe the node type
associated with that name. Their order is significant—it
determines which [parse rules](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM) take
precedence by default, and which nodes come first in a given
[group](https://prosemirror.net/docs/ref/#model.NodeSpec.group).

</dd>

<dt>

`topNode?: string`

</dt>

<dd>

The name of the default top-level node for the schema. Defaults
to `"doc"`.

</dd>

</dl>

## StyleParseRule {#style-parse-rule}

A parse rule targeting a style property.

<dl>

<dt>

`attrs?: Attrs`

</dt>

<dd>

Attributes for the node or mark created by this rule. When
`getAttrs` is provided, it takes precedence.

</dd>

<dt>

`clearMark?: (mark: Mark) => boolean`

</dt>

<dd>

Style rules can remove marks from the set of active marks.

</dd>

<dt>

`closeParent?: boolean`

</dt>

<dd>

When true, finding an element that matches this rule will close
the current node.

</dd>

<dt>

`consuming?: boolean`

</dt>

<dd>

By default, when a rule matches an element or style, no further
rules get a chance to match it. By setting this to `false`, you
indicate that even when this rule matches, other rules that come
after it should also run.

</dd>

<dt>

`context?: string`

</dt>

<dd>

When given, restricts this rule to only match when the current
context—the parent nodes into which the content is being
parsed—matches this expression. Should contain one or more node
names or node group names followed by single or double slashes.
For example `"paragraph/"` means the rule only matches when the
parent node is a paragraph, `"blockquote/paragraph/"` restricts
it to be in a paragraph that is inside a blockquote, and
`"section//"` matches any position inside a section—a double
slash matches any sequence of ancestor nodes. To allow multiple
different contexts, they can be separated by a pipe (`|`)
character, as in `"blockquote/|list_item/"`.

</dd>

<dt>

`getAttrs?: (node: string) => null | false | Attrs`

</dt>

<dd>

A function used to compute the attributes for the node or mark
created by this rule. Called with the style's value.

</dd>

<dt>

`ignore?: boolean`

</dt>

<dd>

When true, ignore content that matches this rule.

</dd>

<dt>

`mark?: string`

</dt>

<dd>

The name of the mark type to wrap the matched content in.

</dd>

<dt>

`priority?: number`

</dt>

<dd>

Can be used to change the order in which the parse rules in a
schema are tried. Those with higher priority come first. Rules
without a priority are counted as having priority 50. This
property is only meaningful in a schema—when directly
constructing a parser, the order of the rule array is used.

</dd>

<dt>

`skip?: boolean`

</dt>

<dd>

When true, ignore the node that matches this rule, but do parse
its content.

</dd>

<dt>

`style: string`

</dt>

<dd>

A CSS property name to match. This rule will match inline styles
that list that property. May also have the form
`"property=value"`, in which case the rule only matches if the
property's value exactly matches the given value. (For more
complicated filters, use [`getAttrs`](https://prosemirror.net/docs/ref/#model.ParseRule.getAttrs)
and return false to indicate that the match failed.) Rules
matching styles may only produce [marks](https://prosemirror.net/docs/ref/#model.ParseRule.mark),
not nodes.

</dd>

<dt>

`tag?: undefined`

</dt>

<dd>

Given to make TS see ParseRule as a tagged union

**Hide**

</dd>

</dl>

## TagParseRule {#tag-parse-rule}

Parse rule targeting a DOM element.

<dl>

<dt>

`attrs?: Attrs`

</dt>

<dd>

Attributes for the node or mark created by this rule. When
`getAttrs` is provided, it takes precedence.

</dd>

<dt>

`closeParent?: boolean`

</dt>

<dd>

When true, finding an element that matches this rule will close
the current node.

</dd>

<dt>

`consuming?: boolean`

</dt>

<dd>

By default, when a rule matches an element or style, no further
rules get a chance to match it. By setting this to `false`, you
indicate that even when this rule matches, other rules that come
after it should also run.

</dd>

<dt>

`contentElement?: string | HTMLElement | ((node: Node) => HTMLElement)`

</dt>

<dd>

For rules that produce non-leaf nodes, by default the content of
the DOM element is parsed as content of the node. If the child
nodes are in a descendent node, this may be a CSS selector
string that the parser must use to find the actual content
element, or a function that returns the actual content element
to the parser.

</dd>

<dt>

`context?: string`

</dt>

<dd>

When given, restricts this rule to only match when the current
context—the parent nodes into which the content is being
parsed—matches this expression. Should contain one or more node
names or node group names followed by single or double slashes.
For example `"paragraph/"` means the rule only matches when the
parent node is a paragraph, `"blockquote/paragraph/"` restricts
it to be in a paragraph that is inside a blockquote, and
`"section//"` matches any position inside a section—a double
slash matches any sequence of ancestor nodes. To allow multiple
different contexts, they can be separated by a pipe (`|`)
character, as in `"blockquote/|list_item/"`.

</dd>

<dt>

`getAttrs?: (node: HTMLElement) => null | false | Attrs`

</dt>

<dd>

A function used to compute the attributes for the node or mark
created by this rule. Can also be used to describe further
conditions the DOM element or style must match. When it returns
`false`, the rule won't match. When it returns null or undefined,
that is interpreted as an empty/default set of attributes.

</dd>

<dt>

`getContent?: (node: Node, schema: Schema) => ProseMirrorFragment`

</dt>

<dd>

Can be used to override the content of a matched node. When
present, instead of parsing the node's child nodes, the result of
this function is used.

</dd>

<dt>

`ignore?: boolean`

</dt>

<dd>

When true, ignore content that matches this rule.

</dd>

<dt>

`mark?: string`

</dt>

<dd>

The name of the mark type to wrap the matched content in.

</dd>

<dt>

`namespace?: string`

</dt>

<dd>

The namespace to match. Nodes are only matched when the
namespace matches or this property is null.

</dd>

<dt>

`node?: string`

</dt>

<dd>

The name of the node type to create when this rule matches. Each
rule should have either a `node`, `mark`, or `ignore` property
(except when it appears in a [node](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM) or
[mark spec](https://prosemirror.net/docs/ref/#model.MarkSpec.parseDOM), in which case the `node`
or `mark` property will be derived from its position).

</dd>

<dt>

`preserveWhitespace?: boolean | "full"`

</dt>

<dd>

Controls whether whitespace should be preserved when parsing the
content inside the matched element. `false` means whitespace may
be collapsed, `true` means that whitespace should be preserved
but newlines normalized to spaces, and `"full"` means that
newlines should also be preserved.

</dd>

<dt>

`priority?: number`

</dt>

<dd>

Can be used to change the order in which the parse rules in a
schema are tried. Those with higher priority come first. Rules
without a priority are counted as having priority 50. This
property is only meaningful in a schema—when directly
constructing a parser, the order of the rule array is used.

</dd>

<dt>

`skip?: boolean`

</dt>

<dd>

When true, ignore the node that matches this rule, but do parse
its content.

</dd>

<dt>

`tag: string`

</dt>

<dd>

A CSS selector describing the kind of DOM elements to match.

</dd>

</dl>

## Attrs {#attrs-22}

An object holding the attributes of a node.

**Type**: `{ [attr]: any }`

## DOMOutputSpec {#dom-output-spec}

A description of a DOM structure. Can be either a string, which is
interpreted as a text node, a DOM node, which is interpreted as
itself, a `{dom, contentDOM}` object, or an array.

An array describes a DOM element. The first value in the array
should be a string—the name of the DOM element, optionally prefixed
by a namespace URL and a space. If the second element is plain
object, it is interpreted as a set of attributes for the element.
Any elements after that (including the 2nd if it's not an attribute
object) are interpreted as children of the DOM elements, and must
either be valid `DOMOutputSpec` values, or the number zero.

The number zero (pronounced “hole”) is used to indicate the place
where a node's child nodes should be inserted. If it occurs in an
output spec, it should be the only child element in its parent
node.

**Type**: `string | DOMNode | ({ contentDOM?: HTMLElement; dom: DOMNode }) | readonly [string, ...any[]]`

## ParseRule {#parse-rule}

A value that describes how to parse a given DOM node or inline
style as a ProseMirror node or mark.

**Type**: `TagParseRule | StyleParseRule`

## Fragment {#fragment-2}

<!-- Declaration kind 4194304 is not implemented (name: Fragment) -->

## Node {#node-5}

<!-- Declaration kind 4194304 is not implemented (name: Node) -->
