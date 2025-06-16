---
title: prosekit/pm/model
sidebar:
  label: pm/model
---

<!-- DEBUG memberWithGroups 1 -->

Re-exports from [prosemirror-model](https://github.com/ProseMirror/prosemirror-model).

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Classes

### ContentMatch {#contentmatch}

<!-- DEBUG memberWithGroups 1 -->

Instances of this class represent a match state of a node type's
[content expression](https://prosemirror.net/docs/ref/#model.NodeSpec.content), and can be used to
find out whether further content matches here, and whether a given
position is a valid end of the node.

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new ContentMatch(): ContentMatch;
```

###### Returns

[`ContentMatch`](#contentmatch)

#### Properties

##### validEnd {#validend}

```ts
readonly validEnd: boolean;
```

True when this match state represents a valid end of the node.

#### Accessors

##### defaultType {#defaulttype}

###### Get Signature

```ts
get defaultType(): null | NodeType;
```

Get the first matching node type at this match position that can
be generated.

###### Returns

`null` \| [`NodeType`](#nodetype)

##### edgeCount {#edgecount}

###### Get Signature

```ts
get edgeCount(): number;
```

The number of outgoing edges this node has in the finite
automaton that describes the content expression.

###### Returns

`number`

#### Methods

##### edge() {#edge}

```ts
edge(n: number): MatchEdge;
```

Get the _n_​th outgoing edge from this node in the finite
automaton that describes the content expression.

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

`n`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

[`MatchEdge`](https://prosemirror.net/docs/ref/#model.MatchEdge)

##### fillBefore() {#fillbefore}

```ts
fillBefore(
   after: ProseMirrorFragment, 
   toEnd?: boolean, 
   startIndex?: number): null | ProseMirrorFragment;
```

Try to match the given fragment, and if that fails, see if it can
be made to match by inserting nodes in front of it. When
successful, return a fragment of inserted nodes (which may be
empty if nothing had to be inserted). When `toEnd` is true, only
return a fragment if the resulting match goes to the end of the
content expression.

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

`after`

</td>
<td>

[`ProseMirrorFragment`](#prosemirrorfragment)

</td>
</tr>
<tr>
<td>

`toEnd?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`startIndex?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`ProseMirrorFragment`](#prosemirrorfragment)

##### findWrapping() {#findwrapping}

```ts
findWrapping(target: NodeType): null | readonly NodeType[];
```

Find a set of wrapping node types that would allow a node of the
given type to appear at this position. The result may be empty
(when it fits directly) and will be null when no such wrapping
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

`target`

</td>
<td>

[`NodeType`](#nodetype)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| readonly [`NodeType`](#nodetype)[]

##### matchFragment() {#matchfragment}

```ts
matchFragment(
   frag: ProseMirrorFragment, 
   start?: number, 
   end?: number): null | ContentMatch;
```

Try to match a fragment. Returns the resulting match when
successful.

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

`frag`

</td>
<td>

[`ProseMirrorFragment`](#prosemirrorfragment)

</td>
</tr>
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
</tbody>
</table>

###### Returns

`null` \| [`ContentMatch`](#contentmatch)

##### matchType() {#matchtype}

```ts
matchType(type: NodeType): null | ContentMatch;
```

Match a node type, returning a match after that node if
successful.

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

`type`

</td>
<td>

[`NodeType`](#nodetype)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`ContentMatch`](#contentmatch)

<!-- DEBUG memberWithGroups 10 -->

***

### DOMParser {#domparser}

<!-- DEBUG memberWithGroups 1 -->

A DOM parser represents a strategy for parsing DOM content into a
ProseMirror document conforming to a given schema. Its behavior is
defined by an array of [rules](https://prosemirror.net/docs/ref/#model.ParseRule).

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new DOMParser(schema: Schema, rules: readonly ParseRule[]): DOMParser;
```

Create a parser that targets the given schema, using the given
parsing rules.

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

`schema`

</td>
<td>

[`Schema`](#schema-3)

</td>
<td>

The schema into which the parser parses.

</td>
</tr>
<tr>
<td>

`rules`

</td>
<td>

readonly [`ParseRule`](#parserule)[]

</td>
<td>

The set of [parse rules](https://prosemirror.net/docs/ref/#model.ParseRule) that the parser
uses, in order of precedence.

</td>
</tr>
</tbody>
</table>

###### Returns

[`DOMParser`](#domparser)

#### Properties

##### rules {#rules}

```ts
readonly rules: readonly ParseRule[];
```

The set of [parse rules](https://prosemirror.net/docs/ref/#model.ParseRule) that the parser
uses, in order of precedence.

##### schema {#schema}

```ts
readonly schema: Schema;
```

The schema into which the parser parses.

#### Methods

##### parse() {#parse}

```ts
parse(dom: Node, options?: ParseOptions): ProseMirrorNode;
```

Parse a document from the content of a DOM node.

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

`dom`

</td>
<td>

[`Node`](https://developer.mozilla.org/docs/Web/API/Node)

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`ParseOptions`](#parseoptions)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ProseMirrorNode`](#prosemirrornode)

##### parseSlice() {#parseslice}

```ts
parseSlice(dom: Node, options?: ParseOptions): Slice;
```

Parses the content of the given DOM node, like
[`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse), and takes the same set of
options. But unlike that method, which produces a whole node,
this one returns a slice that is open at the sides, meaning that
the schema constraints aren't applied to the start of nodes to
the left of the input and the end of nodes at the end.

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

`dom`

</td>
<td>

[`Node`](https://developer.mozilla.org/docs/Web/API/Node)

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`ParseOptions`](#parseoptions)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Slice`](#slice-2)

##### fromSchema() {#fromschema}

```ts
static fromSchema(schema: Schema): DOMParser;
```

Construct a DOM parser using the parsing rules listed in a
schema's [node specs](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM), reordered by
[priority](https://prosemirror.net/docs/ref/#model.ParseRule.priority).

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

`schema`

</td>
<td>

[`Schema`](#schema-3)

</td>
</tr>
</tbody>
</table>

###### Returns

[`DOMParser`](#domparser)

<!-- DEBUG memberWithGroups 10 -->

***

### DOMSerializer {#domserializer}

<!-- DEBUG memberWithGroups 1 -->

A DOM serializer knows how to convert ProseMirror nodes and
marks of various types to DOM nodes.

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new DOMSerializer(nodes: object, marks: object): DOMSerializer;
```

Create a serializer. `nodes` should map node names to functions
that take a node and return a description of the corresponding
DOM. `marks` does the same for mark names, but also gets an
argument that tells it whether the mark's content is block or
inline content (for typical use, it'll always be inline). A mark
serializer may be `null` to indicate that marks of that type
should not be serialized.

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

`nodes`

</td>
<td>

\{ [`node`: `string`]: (`node`: [`ProseMirrorNode`](#prosemirrornode)) => [`DOMOutputSpec`](#domoutputspec); \}

</td>
<td>

The node serialization functions.

</td>
</tr>
<tr>
<td>

`marks`

</td>
<td>

\{ [`mark`: `string`]: (`mark`: [`Mark`](#mark), `inline`: `boolean`) => [`DOMOutputSpec`](#domoutputspec); \}

</td>
<td>

The mark serialization functions.

</td>
</tr>
</tbody>
</table>

###### Returns

[`DOMSerializer`](#domserializer)

#### Properties

##### marks {#marks}

```ts
readonly marks: object;
```

The mark serialization functions.

###### Index Signature

```ts
[mark: string]: (mark: Mark, inline: boolean) => DOMOutputSpec
```

##### nodes {#nodes}

```ts
readonly nodes: object;
```

The node serialization functions.

###### Index Signature

```ts
[node: string]: (node: ProseMirrorNode) => DOMOutputSpec
```

#### Methods

##### serializeFragment() {#serializefragment}

```ts
serializeFragment(
   fragment: ProseMirrorFragment, 
   options?: object, 
   target?: 
  | HTMLElement
  | DocumentFragment): 
  | HTMLElement
  | DocumentFragment;
```

Serialize the content of this fragment to a DOM fragment. When
not in the browser, the `document` option, containing a DOM
document, should be passed so that the serializer can create
nodes.

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

`fragment`

</td>
<td>

[`ProseMirrorFragment`](#prosemirrorfragment)

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `document?`: [`Document`](https://developer.mozilla.org/docs/Web/API/Document); \}

</td>
</tr>
<tr>
<td>

`options.document?`

</td>
<td>

[`Document`](https://developer.mozilla.org/docs/Web/API/Document)

</td>
</tr>
<tr>
<td>

`target?`

</td>
<td>

 \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement) \| [`DocumentFragment`](https://developer.mozilla.org/docs/Web/API/DocumentFragment)

</td>
</tr>
</tbody>
</table>

###### Returns

  \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)
  \| [`DocumentFragment`](https://developer.mozilla.org/docs/Web/API/DocumentFragment)

##### serializeNode() {#serializenode}

```ts
serializeNode(node: ProseMirrorNode, options?: object): Node;
```

Serialize this node to a DOM node. This can be useful when you
need to serialize a part of a document, as opposed to the whole
document. To serialize a whole document, use
[`serializeFragment`](https://prosemirror.net/docs/ref/#model.DOMSerializer.serializeFragment) on
its [content](https://prosemirror.net/docs/ref/#model.Node.content).

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

[`ProseMirrorNode`](#prosemirrornode)

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `document?`: [`Document`](https://developer.mozilla.org/docs/Web/API/Document); \}

</td>
</tr>
<tr>
<td>

`options.document?`

</td>
<td>

[`Document`](https://developer.mozilla.org/docs/Web/API/Document)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Node`](https://developer.mozilla.org/docs/Web/API/Node)

##### fromSchema() {#fromschema-2}

```ts
static fromSchema(schema: Schema): DOMSerializer;
```

Build a serializer using the [`toDOM`](https://prosemirror.net/docs/ref/#model.NodeSpec.toDOM)
properties in a schema's node and mark specs.

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

`schema`

</td>
<td>

[`Schema`](#schema-3)

</td>
</tr>
</tbody>
</table>

###### Returns

[`DOMSerializer`](#domserializer)

##### marksFromSchema() {#marksfromschema}

```ts
static marksFromSchema(schema: Schema): object;
```

Gather the serializers in a schema's mark specs into an object.

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

`schema`

</td>
<td>

[`Schema`](#schema-3)

</td>
</tr>
</tbody>
</table>

###### Returns

`object`

##### nodesFromSchema() {#nodesfromschema}

```ts
static nodesFromSchema(schema: Schema): object;
```

Gather the serializers in a schema's node specs into an object.
This can be useful as a base to build a custom serializer from.

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

`schema`

</td>
<td>

[`Schema`](#schema-3)

</td>
</tr>
</tbody>
</table>

###### Returns

`object`

##### renderSpec() {#renderspec}

```ts
static renderSpec(
   doc: Document, 
   structure: DOMOutputSpec, 
   xmlNS?: null | string): object;
```

Render an [output spec](https://prosemirror.net/docs/ref/#model.DOMOutputSpec) to a DOM node. If
the spec has a hole (zero) in it, `contentDOM` will point at the
node with the hole.

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

[`Document`](https://developer.mozilla.org/docs/Web/API/Document)

</td>
</tr>
<tr>
<td>

`structure`

</td>
<td>

[`DOMOutputSpec`](#domoutputspec)

</td>
</tr>
<tr>
<td>

`xmlNS?`

</td>
<td>

`null` \| `string`

</td>
</tr>
</tbody>
</table>

###### Returns

`object`

###### contentDOM?

```ts
optional contentDOM: HTMLElement;
```

###### dom

```ts
dom: Node;
```

<!-- DEBUG memberWithGroups 10 -->

***

### Mark {#mark}

<!-- DEBUG memberWithGroups 1 -->

A mark is a piece of information that can be attached to a node,
such as it being emphasized, in code font, or a link. It has a
type and optionally a set of attributes that provide further
information (such as the target of the link). Marks are created
through a `Schema`, which controls which types exist and which
attributes they have.

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new Mark(): Mark;
```

###### Returns

[`Mark`](#mark)

#### Properties

##### attrs {#attrs}

```ts
readonly attrs: Attrs;
```

The attributes associated with this mark.

##### type {#type}

```ts
readonly type: MarkType;
```

The type of this mark.

##### none {#none}

```ts
static none: readonly Mark[];
```

The empty set of marks.

#### Methods

##### addToSet() {#addtoset}

```ts
addToSet(set: readonly Mark[]): readonly Mark[];
```

Given a set of marks, create a new set which contains this one as
well, in the right position. If this mark is already in the set,
the set itself is returned. If any marks that are set to be
[exclusive](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) with this mark are present,
those are replaced by this one.

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

`set`

</td>
<td>

readonly [`Mark`](#mark)[]

</td>
</tr>
</tbody>
</table>

###### Returns

readonly [`Mark`](#mark)[]

##### eq() {#eq}

```ts
eq(other: Mark): boolean;
```

Test whether this mark has the same type and attributes as
another mark.

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

[`Mark`](#mark)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### isInSet() {#isinset}

```ts
isInSet(set: readonly Mark[]): boolean;
```

Test whether this mark is in the given set of marks.

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

`set`

</td>
<td>

readonly [`Mark`](#mark)[]

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### removeFromSet() {#removefromset}

```ts
removeFromSet(set: readonly Mark[]): readonly Mark[];
```

Remove this mark from the given set, returning a new set. If this
mark is not in the set, the set itself is returned.

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

`set`

</td>
<td>

readonly [`Mark`](#mark)[]

</td>
</tr>
</tbody>
</table>

###### Returns

readonly [`Mark`](#mark)[]

##### toJSON() {#tojson}

```ts
toJSON(): any;
```

Convert this mark to a JSON-serializeable representation.

###### Returns

`any`

##### fromJSON() {#fromjson}

```ts
static fromJSON(schema: Schema, json: any): Mark;
```

Deserialize a mark from JSON.

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

`schema`

</td>
<td>

[`Schema`](#schema-3)

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

[`Mark`](#mark)

##### sameSet() {#sameset}

```ts
static sameSet(a: readonly Mark[], b: readonly Mark[]): boolean;
```

Test whether two sets of marks are identical.

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

`a`

</td>
<td>

readonly [`Mark`](#mark)[]

</td>
</tr>
<tr>
<td>

`b`

</td>
<td>

readonly [`Mark`](#mark)[]

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### setFrom() {#setfrom}

```ts
static setFrom(marks?: null | Mark | readonly Mark[]): readonly Mark[];
```

Create a properly sorted mark set from null, a single mark, or an
unsorted array of marks.

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

`marks?`

</td>
<td>

`null` \| [`Mark`](#mark) \| readonly [`Mark`](#mark)[]

</td>
</tr>
</tbody>
</table>

###### Returns

readonly [`Mark`](#mark)[]

<!-- DEBUG memberWithGroups 10 -->

***

### MarkType {#marktype-1}

<!-- DEBUG memberWithGroups 1 -->

Like nodes, marks (which are associated with nodes to signify
things like emphasis or being part of a link) are
[tagged](https://prosemirror.net/docs/ref/#model.Mark.type) with type objects, which are
instantiated once per `Schema`.

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new MarkType(): MarkType;
```

###### Returns

[`MarkType`](#marktype-1)

#### Properties

##### name {#name}

```ts
readonly name: string;
```

The name of the mark type.

##### schema {#schema-1}

```ts
readonly schema: Schema;
```

The schema that this mark type instance is part of.

##### spec {#spec}

```ts
readonly spec: MarkSpec;
```

The spec on which the type is based.

#### Methods

##### create() {#create}

```ts
create(attrs?: null | Attrs): Mark;
```

Create a mark of this type. `attrs` may be `null` or an object
containing only some of the mark's attributes. The others, if
they have defaults, will be added.

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

`attrs?`

</td>
<td>

`null` \| [`Attrs`](#attrs-7)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Mark`](#mark)

##### excludes() {#excludes}

```ts
excludes(other: MarkType): boolean;
```

Queries whether a given mark type is
[excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.

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

[`MarkType`](#marktype-1)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### isInSet() {#isinset-2}

```ts
isInSet(set: readonly Mark[]): undefined | Mark;
```

Tests whether there is a mark of this type in the given set.

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

`set`

</td>
<td>

readonly [`Mark`](#mark)[]

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined` \| [`Mark`](#mark)

##### removeFromSet() {#removefromset-2}

```ts
removeFromSet(set: readonly Mark[]): readonly Mark[];
```

When there is a mark of this type in the given set, a new set
without it is returned. Otherwise, the input set is returned.

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

`set`

</td>
<td>

readonly [`Mark`](#mark)[]

</td>
</tr>
</tbody>
</table>

###### Returns

readonly [`Mark`](#mark)[]

<!-- DEBUG memberWithGroups 10 -->

***

### NodeRange {#noderange}

<!-- DEBUG memberWithGroups 1 -->

Represents a flat range of content, i.e. one that starts and
ends in the same node.

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new NodeRange(
   $from: ResolvedPos, 
   $to: ResolvedPos, 
   depth: number): NodeRange;
```

Construct a node range. `$from` and `$to` should point into the
same node until at least the given `depth`, since a node range
denotes an adjacent set of nodes in a single parent node.

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

[`ResolvedPos`](#resolvedpos)

</td>
<td>

A resolved position along the start of the content. May have a
`depth` greater than this object's `depth` property, since
these are the positions that were used to compute the range,
not re-resolved positions directly at its boundaries.

</td>
</tr>
<tr>
<td>

`$to`

</td>
<td>

[`ResolvedPos`](#resolvedpos)

</td>
<td>

A position along the end of the content. See
caveat for [`$from`](https://prosemirror.net/docs/ref/#model.NodeRange.$from).

</td>
</tr>
<tr>
<td>

`depth`

</td>
<td>

`number`

</td>
<td>

The depth of the node that this range points into.

</td>
</tr>
</tbody>
</table>

###### Returns

[`NodeRange`](#noderange)

#### Properties

##### $from {#from}

```ts
readonly $from: ResolvedPos;
```

A resolved position along the start of the content. May have a
`depth` greater than this object's `depth` property, since
these are the positions that were used to compute the range,
not re-resolved positions directly at its boundaries.

##### $to {#to}

```ts
readonly $to: ResolvedPos;
```

A position along the end of the content. See
caveat for [`$from`](https://prosemirror.net/docs/ref/#model.NodeRange.$from).

##### depth {#depth}

```ts
readonly depth: number;
```

The depth of the node that this range points into.

#### Accessors

##### end {#end}

###### Get Signature

```ts
get end(): number;
```

The position at the end of the range.

###### Returns

`number`

##### endIndex {#endindex}

###### Get Signature

```ts
get endIndex(): number;
```

The end index of the range in the parent node.

###### Returns

`number`

##### parent {#parent}

###### Get Signature

```ts
get parent(): ProseMirrorNode;
```

The parent node that the range points into.

###### Returns

[`ProseMirrorNode`](#prosemirrornode)

##### start {#start}

###### Get Signature

```ts
get start(): number;
```

The position at the start of the range.

###### Returns

`number`

##### startIndex {#startindex}

###### Get Signature

```ts
get startIndex(): number;
```

The start index of the range in the parent node.

###### Returns

`number`

<!-- DEBUG memberWithGroups 10 -->

***

### NodeType {#nodetype}

<!-- DEBUG memberWithGroups 1 -->

Node types are objects allocated once per `Schema` and used to
[tag](https://prosemirror.net/docs/ref/#model.Node.type) `Node` instances. They contain information
about the node type, such as its name and what kind of node it
represents.

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new NodeType(): NodeType;
```

###### Returns

[`NodeType`](#nodetype)

#### Properties

##### contentMatch {#contentmatch-1}

```ts
contentMatch: ContentMatch;
```

The starting match of the node type's content expression.

##### inlineContent {#inlinecontent}

```ts
inlineContent: boolean;
```

True if this node type has inline content.

##### isBlock {#isblock}

```ts
isBlock: boolean;
```

True if this is a block type

##### isText {#istext}

```ts
isText: boolean;
```

True if this is the text node type.

##### markSet {#markset}

```ts
markSet: null | readonly MarkType[];
```

The set of marks allowed in this node. `null` means all marks
are allowed.

##### name {#name-1}

```ts
readonly name: string;
```

The name the node type has in this schema.

##### schema {#schema-2}

```ts
readonly schema: Schema;
```

A link back to the `Schema` the node type belongs to.

##### spec {#spec-1}

```ts
readonly spec: NodeSpec;
```

The spec that this type is based on

#### Accessors

##### isAtom {#isatom}

###### Get Signature

```ts
get isAtom(): boolean;
```

True when this node is an atom, i.e. when it does not have
directly editable content.

###### Returns

`boolean`

##### isInline {#isinline}

###### Get Signature

```ts
get isInline(): boolean;
```

True if this is an inline type.

###### Returns

`boolean`

##### isLeaf {#isleaf}

###### Get Signature

```ts
get isLeaf(): boolean;
```

True for node types that allow no content.

###### Returns

`boolean`

##### isTextblock {#istextblock}

###### Get Signature

```ts
get isTextblock(): boolean;
```

True if this is a textblock type, a block that contains inline
content.

###### Returns

`boolean`

##### whitespace {#whitespace}

###### Get Signature

```ts
get whitespace(): "pre" | "normal";
```

The node type's [whitespace](https://prosemirror.net/docs/ref/#model.NodeSpec.whitespace) option.

###### Returns

`"pre"` \| `"normal"`

#### Methods

##### allowedMarks() {#allowedmarks}

```ts
allowedMarks(marks: readonly Mark[]): readonly Mark[];
```

Removes the marks that are not allowed in this node from the given set.

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

readonly [`Mark`](#mark)[]

</td>
</tr>
</tbody>
</table>

###### Returns

readonly [`Mark`](#mark)[]

##### allowsMarks() {#allowsmarks}

```ts
allowsMarks(marks: readonly Mark[]): boolean;
```

Test whether the given set of marks are allowed in this node.

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

readonly [`Mark`](#mark)[]

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### allowsMarkType() {#allowsmarktype}

```ts
allowsMarkType(markType: MarkType): boolean;
```

Check whether the given mark type is allowed in this node.

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

`markType`

</td>
<td>

[`MarkType`](#marktype-1)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### compatibleContent() {#compatiblecontent}

```ts
compatibleContent(other: NodeType): boolean;
```

Indicates whether this node allows some of the same content as
the given node type.

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

[`NodeType`](#nodetype)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### create() {#create-2}

```ts
create(
   attrs?: null | Attrs, 
   content?: 
  | null
  | ProseMirrorNode
  | ProseMirrorFragment
  | readonly ProseMirrorNode[], 
   marks?: readonly Mark[]): ProseMirrorNode;
```

Create a `Node` of this type. The given attributes are
checked and defaulted (you can pass `null` to use the type's
defaults entirely, if no required attributes exist). `content`
may be a `Fragment`, a node, an array of nodes, or
`null`. Similarly `marks` may be `null` to default to the empty
set of marks.

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

`attrs?`

</td>
<td>

`null` \| [`Attrs`](#attrs-7)

</td>
</tr>
<tr>
<td>

`content?`

</td>
<td>

 \| `null` \| [`ProseMirrorNode`](#prosemirrornode) \| [`ProseMirrorFragment`](#prosemirrorfragment) \| readonly [`ProseMirrorNode`](#prosemirrornode)[]

</td>
</tr>
<tr>
<td>

`marks?`

</td>
<td>

readonly [`Mark`](#mark)[]

</td>
</tr>
</tbody>
</table>

###### Returns

[`ProseMirrorNode`](#prosemirrornode)

##### createAndFill() {#createandfill}

```ts
createAndFill(
   attrs?: null | Attrs, 
   content?: 
  | null
  | ProseMirrorNode
  | ProseMirrorFragment
  | readonly ProseMirrorNode[], 
   marks?: readonly Mark[]): null | ProseMirrorNode;
```

Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but see if it is
necessary to add nodes to the start or end of the given fragment
to make it fit the node. If no fitting wrapping can be found,
return null. Note that, due to the fact that required nodes can
always be created, this will always succeed if you pass null or
`Fragment.empty` as content.

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

`attrs?`

</td>
<td>

`null` \| [`Attrs`](#attrs-7)

</td>
</tr>
<tr>
<td>

`content?`

</td>
<td>

 \| `null` \| [`ProseMirrorNode`](#prosemirrornode) \| [`ProseMirrorFragment`](#prosemirrorfragment) \| readonly [`ProseMirrorNode`](#prosemirrornode)[]

</td>
</tr>
<tr>
<td>

`marks?`

</td>
<td>

readonly [`Mark`](#mark)[]

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`ProseMirrorNode`](#prosemirrornode)

##### createChecked() {#createchecked}

```ts
createChecked(
   attrs?: null | Attrs, 
   content?: 
  | null
  | ProseMirrorNode
  | ProseMirrorFragment
  | readonly ProseMirrorNode[], 
   marks?: readonly Mark[]): ProseMirrorNode;
```

Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
against the node type's content restrictions, and throw an error
if it doesn't match.

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

`attrs?`

</td>
<td>

`null` \| [`Attrs`](#attrs-7)

</td>
</tr>
<tr>
<td>

`content?`

</td>
<td>

 \| `null` \| [`ProseMirrorNode`](#prosemirrornode) \| [`ProseMirrorFragment`](#prosemirrorfragment) \| readonly [`ProseMirrorNode`](#prosemirrornode)[]

</td>
</tr>
<tr>
<td>

`marks?`

</td>
<td>

readonly [`Mark`](#mark)[]

</td>
</tr>
</tbody>
</table>

###### Returns

[`ProseMirrorNode`](#prosemirrornode)

##### hasRequiredAttrs() {#hasrequiredattrs}

```ts
hasRequiredAttrs(): boolean;
```

Tells you whether this node type has any required attributes.

###### Returns

`boolean`

##### isInGroup() {#isingroup}

```ts
isInGroup(group: string): boolean;
```

Return true when this node type is part of the given
[group](https://prosemirror.net/docs/ref/#model.NodeSpec.group).

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

`group`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### validContent() {#validcontent}

```ts
validContent(content: ProseMirrorFragment): boolean;
```

Returns true if the given fragment is valid content for this node
type.

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

`content`

</td>
<td>

[`ProseMirrorFragment`](#prosemirrorfragment)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

<!-- DEBUG memberWithGroups 10 -->

***

### ProseMirrorFragment {#prosemirrorfragment}

<!-- DEBUG memberWithGroups 1 -->

A fragment represents a node's collection of child nodes.

Like nodes, fragments are persistent data structures, and you
should not mutate them or their content. Rather, you create new
instances whenever needed. The API tries to make this easy.

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new ProseMirrorFragment(): ProseMirrorFragment;
```

###### Returns

[`ProseMirrorFragment`](#prosemirrorfragment)

#### Properties

##### content {#content}

```ts
readonly content: readonly ProseMirrorNode[];
```

The child nodes in this fragment.

##### size {#size}

```ts
readonly size: number;
```

The size of the fragment, which is the total of the size of
its content nodes.

##### empty {#empty}

```ts
static empty: ProseMirrorFragment;
```

An empty fragment. Intended to be reused whenever a node doesn't
contain anything (rather than allocating a new empty fragment for
each leaf node).

#### Accessors

##### childCount {#childcount}

###### Get Signature

```ts
get childCount(): number;
```

The number of child nodes in this fragment.

###### Returns

`number`

##### firstChild {#firstchild}

###### Get Signature

```ts
get firstChild(): null | ProseMirrorNode;
```

The first child of the fragment, or `null` if it is empty.

###### Returns

`null` \| [`ProseMirrorNode`](#prosemirrornode)

##### lastChild {#lastchild}

###### Get Signature

```ts
get lastChild(): null | ProseMirrorNode;
```

The last child of the fragment, or `null` if it is empty.

###### Returns

`null` \| [`ProseMirrorNode`](#prosemirrornode)

#### Methods

##### addToEnd() {#addtoend}

```ts
addToEnd(node: ProseMirrorNode): ProseMirrorFragment;
```

Create a new fragment by appending the given node to this
fragment.

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

[`ProseMirrorNode`](#prosemirrornode)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ProseMirrorFragment`](#prosemirrorfragment)

##### addToStart() {#addtostart}

```ts
addToStart(node: ProseMirrorNode): ProseMirrorFragment;
```

Create a new fragment by prepending the given node to this
fragment.

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

[`ProseMirrorNode`](#prosemirrornode)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ProseMirrorFragment`](#prosemirrorfragment)

##### append() {#append}

```ts
append(other: ProseMirrorFragment): ProseMirrorFragment;
```

Create a new fragment containing the combined content of this
fragment and the other.

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

[`ProseMirrorFragment`](#prosemirrorfragment)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ProseMirrorFragment`](#prosemirrorfragment)

##### child() {#child}

```ts
child(index: number): ProseMirrorNode;
```

Get the child node at the given index. Raise an error when the
index is out of range.

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

`index`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

[`ProseMirrorNode`](#prosemirrornode)

##### cut() {#cut}

```ts
cut(from: number, to?: number): ProseMirrorFragment;
```

Cut out the sub-fragment between the two given positions.

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

`to?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

[`ProseMirrorFragment`](#prosemirrorfragment)

##### descendants() {#descendants}

```ts
descendants(f: (node: ProseMirrorNode, pos: number, parent: null | ProseMirrorNode, index: number) => boolean | void): void;
```

Call the given callback for every descendant node. `pos` will be
relative to the start of the fragment. The callback may return
`false` to prevent traversal of a given node's children.

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

(`node`: [`ProseMirrorNode`](#prosemirrornode), `pos`: `number`, `parent`: `null` \| [`ProseMirrorNode`](#prosemirrornode), `index`: `number`) => `boolean` \| `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### eq() {#eq-2}

```ts
eq(other: ProseMirrorFragment): boolean;
```

Compare this fragment to another one.

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

[`ProseMirrorFragment`](#prosemirrorfragment)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### findDiffEnd() {#finddiffend}

```ts
findDiffEnd(
   other: ProseMirrorFragment, 
   pos?: number, 
   otherPos?: number): 
  | null
  | {
  a: number;
  b: number;
};
```

Find the first position, searching from the end, at which this
fragment and the given fragment differ, or `null` if they are
the same. Since this position will not be the same in both
nodes, an object with two separate positions is returned.

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

[`ProseMirrorFragment`](#prosemirrorfragment)

</td>
</tr>
<tr>
<td>

`pos?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`otherPos?`

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
  `a`: `number`;
  `b`: `number`;
\}

##### findDiffStart() {#finddiffstart}

```ts
findDiffStart(other: ProseMirrorFragment, pos?: number): null | number;
```

Find the first position at which this fragment and another
fragment differ, or `null` if they are the same.

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

[`ProseMirrorFragment`](#prosemirrorfragment)

</td>
</tr>
<tr>
<td>

`pos?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| `number`

##### forEach() {#foreach}

```ts
forEach(f: (node: ProseMirrorNode, offset: number, index: number) => void): void;
```

Call `f` for every child node, passing the node, its offset
into this parent node, and its index.

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

(`node`: [`ProseMirrorNode`](#prosemirrornode), `offset`: `number`, `index`: `number`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### maybeChild() {#maybechild}

```ts
maybeChild(index: number): null | ProseMirrorNode;
```

Get the child node at the given index, if it exists.

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

`index`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`ProseMirrorNode`](#prosemirrornode)

##### nodesBetween() {#nodesbetween}

```ts
nodesBetween(
   from: number, 
   to: number, 
   f: (node: ProseMirrorNode, start: number, parent: null | ProseMirrorNode, index: number) => boolean | void, 
   nodeStart?: number, 
   parent?: ProseMirrorNode): void;
```

Invoke a callback for all descendant nodes between the given two
positions (relative to start of this fragment). Doesn't descend
into a node when the callback returns `false`.

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

`f`

</td>
<td>

(`node`: [`ProseMirrorNode`](#prosemirrornode), `start`: `number`, `parent`: `null` \| [`ProseMirrorNode`](#prosemirrornode), `index`: `number`) => `boolean` \| `void`

</td>
</tr>
<tr>
<td>

`nodeStart?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`parent?`

</td>
<td>

[`ProseMirrorNode`](#prosemirrornode)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### replaceChild() {#replacechild}

```ts
replaceChild(index: number, node: ProseMirrorNode): ProseMirrorFragment;
```

Create a new fragment in which the node at the given index is
replaced by the given node.

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

`index`

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

[`ProseMirrorNode`](#prosemirrornode)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ProseMirrorFragment`](#prosemirrorfragment)

##### textBetween() {#textbetween}

```ts
textBetween(
   from: number, 
   to: number, 
   blockSeparator?: null | string, 
   leafText?: 
  | null
  | string
  | (leafNode: ProseMirrorNode) => string): string;
```

Extract the text between `from` and `to`. See the same method on
[`Node`](https://prosemirror.net/docs/ref/#model.Node.textBetween).

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

`blockSeparator?`

</td>
<td>

`null` \| `string`

</td>
</tr>
<tr>
<td>

`leafText?`

</td>
<td>

 \| `null` \| `string` \| (`leafNode`: [`ProseMirrorNode`](#prosemirrornode)) => `string`

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

##### toJSON() {#tojson-2}

```ts
toJSON(): any;
```

Create a JSON-serializeable representation of this fragment.

###### Returns

`any`

##### toString() {#tostring}

```ts
toString(): string;
```

Return a debugging string that describes this fragment.

###### Returns

`string`

##### from() {#from-1}

```ts
static from(nodes?: 
  | null
  | ProseMirrorNode
  | ProseMirrorFragment
  | readonly ProseMirrorNode[]): ProseMirrorFragment;
```

Create a fragment from something that can be interpreted as a
set of nodes. For `null`, it returns the empty fragment. For a
fragment, the fragment itself. For a node or array of nodes, a
fragment containing those nodes.

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

`nodes?`

</td>
<td>

 \| `null` \| [`ProseMirrorNode`](#prosemirrornode) \| [`ProseMirrorFragment`](#prosemirrorfragment) \| readonly [`ProseMirrorNode`](#prosemirrornode)[]

</td>
</tr>
</tbody>
</table>

###### Returns

[`ProseMirrorFragment`](#prosemirrorfragment)

##### fromArray() {#fromarray}

```ts
static fromArray(array: readonly ProseMirrorNode[]): ProseMirrorFragment;
```

Build a fragment from an array of nodes. Ensures that adjacent
text nodes with the same marks are joined together.

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

`array`

</td>
<td>

readonly [`ProseMirrorNode`](#prosemirrornode)[]

</td>
</tr>
</tbody>
</table>

###### Returns

[`ProseMirrorFragment`](#prosemirrorfragment)

##### fromJSON() {#fromjson-2}

```ts
static fromJSON(schema: Schema, value: any): ProseMirrorFragment;
```

Deserialize a fragment from its JSON representation.

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

`schema`

</td>
<td>

[`Schema`](#schema-3)

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

[`ProseMirrorFragment`](#prosemirrorfragment)

<!-- DEBUG memberWithGroups 10 -->

***

### ProseMirrorNode {#prosemirrornode}

<!-- DEBUG memberWithGroups 1 -->

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

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new ProseMirrorNode(): ProseMirrorNode;
```

###### Returns

[`ProseMirrorNode`](#prosemirrornode)

#### Properties

##### attrs {#attrs-1}

```ts
readonly attrs: Attrs;
```

An object mapping attribute names to values. The kind of
attributes allowed and required are
[determined](https://prosemirror.net/docs/ref/#model.NodeSpec.attrs) by the node type.

##### content {#content-1}

```ts
readonly content: ProseMirrorFragment;
```

A container holding the node's children.

##### marks {#marks-1}

```ts
readonly marks: readonly Mark[];
```

The marks (things like whether it is emphasized or part of a
link) applied to this node.

##### text {#text}

```ts
readonly text: undefined | string;
```

For text nodes, this contains the node's text content.

##### type {#type-1}

```ts
readonly type: NodeType;
```

The type of node that this is.

#### Accessors

##### childCount {#childcount-1}

###### Get Signature

```ts
get childCount(): number;
```

The number of children that the node has.

###### Returns

`number`

##### children {#children}

###### Get Signature

```ts
get children(): readonly ProseMirrorNode[];
```

The array of this node's child nodes.

###### Returns

readonly [`ProseMirrorNode`](#prosemirrornode)[]

##### firstChild {#firstchild-1}

###### Get Signature

```ts
get firstChild(): null | ProseMirrorNode;
```

Returns this node's first child, or `null` if there are no
children.

###### Returns

`null` \| [`ProseMirrorNode`](#prosemirrornode)

##### inlineContent {#inlinecontent-1}

###### Get Signature

```ts
get inlineContent(): boolean;
```

True when this node allows inline content.

###### Returns

`boolean`

##### isAtom {#isatom-1}

###### Get Signature

```ts
get isAtom(): boolean;
```

True when this is an atom, i.e. when it does not have directly
editable content. This is usually the same as `isLeaf`, but can
be configured with the [`atom` property](https://prosemirror.net/docs/ref/#model.NodeSpec.atom)
on a node's spec (typically used when the node is displayed as
an uneditable [node view](https://prosemirror.net/docs/ref/#view.NodeView)).

###### Returns

`boolean`

##### isBlock {#isblock-1}

###### Get Signature

```ts
get isBlock(): boolean;
```

True when this is a block (non-inline node)

###### Returns

`boolean`

##### isInline {#isinline-1}

###### Get Signature

```ts
get isInline(): boolean;
```

True when this is an inline node (a text node or a node that can
appear among text).

###### Returns

`boolean`

##### isLeaf {#isleaf-1}

###### Get Signature

```ts
get isLeaf(): boolean;
```

True when this is a leaf node.

###### Returns

`boolean`

##### isText {#istext-1}

###### Get Signature

```ts
get isText(): boolean;
```

True when this is a text node.

###### Returns

`boolean`

##### isTextblock {#istextblock-1}

###### Get Signature

```ts
get isTextblock(): boolean;
```

True when this is a textblock node, a block node with inline
content.

###### Returns

`boolean`

##### lastChild {#lastchild-1}

###### Get Signature

```ts
get lastChild(): null | ProseMirrorNode;
```

Returns this node's last child, or `null` if there are no
children.

###### Returns

`null` \| [`ProseMirrorNode`](#prosemirrornode)

##### nodeSize {#nodesize}

###### Get Signature

```ts
get nodeSize(): number;
```

The size of this node, as defined by the integer-based [indexing
scheme](https://prosemirror.net/docs/guide/#doc.indexing). For text nodes, this is the
amount of characters. For other leaf nodes, it is one. For
non-leaf nodes, it is the size of the content plus two (the
start and end token).

###### Returns

`number`

##### textContent {#textcontent}

###### Get Signature

```ts
get textContent(): string;
```

Concatenates all the text nodes found in this fragment and its
children.

###### Returns

`string`

#### Methods

##### canAppend() {#canappend}

```ts
canAppend(other: ProseMirrorNode): boolean;
```

Test whether the given node's content could be appended to this
node. If that node is empty, this will only return true if there
is at least one node type that can appear in both nodes (to avoid
merging completely incompatible nodes).

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

[`ProseMirrorNode`](#prosemirrornode)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### canReplace() {#canreplace}

```ts
canReplace(
   from: number, 
   to: number, 
   replacement?: ProseMirrorFragment, 
   start?: number, 
   end?: number): boolean;
```

Test whether replacing the range between `from` and `to` (by
child index) with the given replacement fragment (which defaults
to the empty fragment) would leave the node's content valid. You
can optionally pass `start` and `end` indices into the
replacement fragment.

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

`replacement?`

</td>
<td>

[`ProseMirrorFragment`](#prosemirrorfragment)

</td>
</tr>
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
</tbody>
</table>

###### Returns

`boolean`

##### canReplaceWith() {#canreplacewith}

```ts
canReplaceWith(
   from: number, 
   to: number, 
   type: NodeType, 
   marks?: readonly Mark[]): boolean;
```

Test whether replacing the range `from` to `to` (by index) with
a node of the given type would leave the node's content valid.

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

`type`

</td>
<td>

[`NodeType`](#nodetype)

</td>
</tr>
<tr>
<td>

`marks?`

</td>
<td>

readonly [`Mark`](#mark)[]

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### check() {#check}

```ts
check(): void;
```

Check whether this node and its descendants conform to the
schema, and raise an exception when they do not.

###### Returns

`void`

##### child() {#child-2}

```ts
child(index: number): ProseMirrorNode;
```

Get the child node at the given index. Raises an error when the
index is out of range.

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

`index`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

[`ProseMirrorNode`](#prosemirrornode)

##### childAfter() {#childafter}

```ts
childAfter(pos: number): object;
```

Find the (direct) child node after the given offset, if any,
and return it along with its index and offset relative to this
node.

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

`object`

###### index

```ts
index: number;
```

###### node

```ts
node: null | ProseMirrorNode;
```

###### offset

```ts
offset: number;
```

##### childBefore() {#childbefore}

```ts
childBefore(pos: number): object;
```

Find the (direct) child node before the given offset, if any,
and return it along with its index and offset relative to this
node.

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

`object`

###### index

```ts
index: number;
```

###### node

```ts
node: null | ProseMirrorNode;
```

###### offset

```ts
offset: number;
```

##### contentMatchAt() {#contentmatchat}

```ts
contentMatchAt(index: number): ContentMatch;
```

Get the content match in this node at the given index.

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

`index`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

[`ContentMatch`](#contentmatch)

##### copy() {#copy}

```ts
copy(content?: null | ProseMirrorFragment): ProseMirrorNode;
```

Create a new node with the same markup as this node, containing
the given content (or empty, if no content is given).

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

`content?`

</td>
<td>

`null` \| [`ProseMirrorFragment`](#prosemirrorfragment)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ProseMirrorNode`](#prosemirrornode)

##### cut() {#cut-2}

```ts
cut(from: number, to?: number): ProseMirrorNode;
```

Create a copy of this node with only the content between the
given positions. If `to` is not given, it defaults to the end of
the node.

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

`to?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

[`ProseMirrorNode`](#prosemirrornode)

##### descendants() {#descendants-2}

```ts
descendants(f: (node: ProseMirrorNode, pos: number, parent: null | ProseMirrorNode, index: number) => boolean | void): void;
```

Call the given callback for every descendant node. Doesn't
descend into a node when the callback returns `false`.

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

(`node`: [`ProseMirrorNode`](#prosemirrornode), `pos`: `number`, `parent`: `null` \| [`ProseMirrorNode`](#prosemirrornode), `index`: `number`) => `boolean` \| `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### eq() {#eq-4}

```ts
eq(other: ProseMirrorNode): boolean;
```

Test whether two nodes represent the same piece of document.

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

[`ProseMirrorNode`](#prosemirrornode)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### forEach() {#foreach-2}

```ts
forEach(f: (node: ProseMirrorNode, offset: number, index: number) => void): void;
```

Call `f` for every child node, passing the node, its offset
into this parent node, and its index.

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

(`node`: [`ProseMirrorNode`](#prosemirrornode), `offset`: `number`, `index`: `number`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### hasMarkup() {#hasmarkup}

```ts
hasMarkup(
   type: NodeType, 
   attrs?: null | Attrs, 
   marks?: readonly Mark[]): boolean;
```

Check whether this node's markup correspond to the given type,
attributes, and marks.

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

`type`

</td>
<td>

[`NodeType`](#nodetype)

</td>
</tr>
<tr>
<td>

`attrs?`

</td>
<td>

`null` \| [`Attrs`](#attrs-7)

</td>
</tr>
<tr>
<td>

`marks?`

</td>
<td>

readonly [`Mark`](#mark)[]

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### mark() {#mark-1}

```ts
mark(marks: readonly Mark[]): ProseMirrorNode;
```

Create a copy of this node, with the given set of marks instead
of the node's own marks.

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

readonly [`Mark`](#mark)[]

</td>
</tr>
</tbody>
</table>

###### Returns

[`ProseMirrorNode`](#prosemirrornode)

##### maybeChild() {#maybechild-2}

```ts
maybeChild(index: number): null | ProseMirrorNode;
```

Get the child node at the given index, if it exists.

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

`index`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`ProseMirrorNode`](#prosemirrornode)

##### nodeAt() {#nodeat}

```ts
nodeAt(pos: number): null | ProseMirrorNode;
```

Find the node directly after the given position.

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

`null` \| [`ProseMirrorNode`](#prosemirrornode)

##### nodesBetween() {#nodesbetween-2}

```ts
nodesBetween(
   from: number, 
   to: number, 
   f: (node: ProseMirrorNode, pos: number, parent: null | ProseMirrorNode, index: number) => boolean | void, 
   startPos?: number): void;
```

Invoke a callback for all descendant nodes recursively between
the given two positions that are relative to start of this
node's content. The callback is invoked with the node, its
position relative to the original node (method receiver),
its parent node, and its child index. When the callback returns
false for a given node, that node's children will not be
recursed over. The last parameter can be used to specify a
starting position to count from.

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

`f`

</td>
<td>

(`node`: [`ProseMirrorNode`](#prosemirrornode), `pos`: `number`, `parent`: `null` \| [`ProseMirrorNode`](#prosemirrornode), `index`: `number`) => `boolean` \| `void`

</td>
</tr>
<tr>
<td>

`startPos?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### rangeHasMark() {#rangehasmark}

```ts
rangeHasMark(
   from: number, 
   to: number, 
   type: MarkType | Mark): boolean;
```

Test whether a given mark or mark type occurs in this document
between the two given positions.

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

`type`

</td>
<td>

[`MarkType`](#marktype-1) \| [`Mark`](#mark)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### replace() {#replace}

```ts
replace(
   from: number, 
   to: number, 
   slice: Slice): ProseMirrorNode;
```

Replace the part of the document between the given positions with
the given slice. The slice must 'fit', meaning its open sides
must be able to connect to the surrounding content, and its
content nodes must be valid children for the node they are placed
into. If any of this is violated, an error of type
[`ReplaceError`](https://prosemirror.net/docs/ref/#model.ReplaceError) is thrown.

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

`slice`

</td>
<td>

[`Slice`](#slice-2)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ProseMirrorNode`](#prosemirrornode)

##### resolve() {#resolve}

```ts
resolve(pos: number): ResolvedPos;
```

Resolve the given position in the document, returning an
[object](https://prosemirror.net/docs/ref/#model.ResolvedPos) with information about its context.

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

[`ResolvedPos`](#resolvedpos)

##### sameMarkup() {#samemarkup}

```ts
sameMarkup(other: ProseMirrorNode): boolean;
```

Compare the markup (type, attributes, and marks) of this node to
those of another. Returns `true` if both have the same markup.

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

[`ProseMirrorNode`](#prosemirrornode)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### slice() {#slice}

```ts
slice(
   from: number, 
   to?: number, 
   includeParents?: boolean): Slice;
```

Cut out the part of the document between the given positions, and
return it as a `Slice` object.

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

`to?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`includeParents?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Slice`](#slice-2)

##### textBetween() {#textbetween-2}

```ts
textBetween(
   from: number, 
   to: number, 
   blockSeparator?: null | string, 
   leafText?: 
  | null
  | string
  | (leafNode: ProseMirrorNode) => string): string;
```

Get all text between positions `from` and `to`. When
`blockSeparator` is given, it will be inserted to separate text
from different block nodes. If `leafText` is given, it'll be
inserted for every non-text leaf node encountered, otherwise
[`leafText`](https://prosemirror.net/docs/ref/#model.NodeSpec^leafText) will be used.

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

`blockSeparator?`

</td>
<td>

`null` \| `string`

</td>
</tr>
<tr>
<td>

`leafText?`

</td>
<td>

 \| `null` \| `string` \| (`leafNode`: [`ProseMirrorNode`](#prosemirrornode)) => `string`

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

##### toJSON() {#tojson-4}

```ts
toJSON(): any;
```

Return a JSON-serializeable representation of this node.

###### Returns

`any`

##### toString() {#tostring-2}

```ts
toString(): string;
```

Return a string representation of this node for debugging
purposes.

###### Returns

`string`

##### fromJSON() {#fromjson-4}

```ts
static fromJSON(schema: Schema, json: any): ProseMirrorNode;
```

Deserialize a node from its JSON representation.

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

`schema`

</td>
<td>

[`Schema`](#schema-3)

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

[`ProseMirrorNode`](#prosemirrornode)

<!-- DEBUG memberWithGroups 10 -->

***

### ReplaceError {#replaceerror}

<!-- DEBUG memberWithGroups 1 -->

Error type raised by [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) when
given an invalid replacement.

#### Extends

- [`Error`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new ReplaceError(message?: string): ReplaceError;
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

`message?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

[`ReplaceError`](#replaceerror)

###### Inherited from

```ts
Error.constructor
```

##### Constructor

```ts
new ReplaceError(message?: string, options?: ErrorOptions): ReplaceError;
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

`message?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

`ErrorOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

[`ReplaceError`](#replaceerror)

###### Inherited from

```ts
Error.constructor
```

<!-- DEBUG memberWithGroups 10 -->

***

### ResolvedPos {#resolvedpos}

<!-- DEBUG memberWithGroups 1 -->

You can [_resolve_](https://prosemirror.net/docs/ref/#model.Node.resolve) a position to get more
information about it. Objects of this class represent such a
resolved position, providing various pieces of context
information, and some helper methods.

Throughout this interface, methods that take an optional `depth`
parameter will interpret undefined as `this.depth` and negative
numbers as `this.depth + value`.

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new ResolvedPos(): ResolvedPos;
```

###### Returns

[`ResolvedPos`](#resolvedpos)

#### Properties

##### depth {#depth-1}

```ts
depth: number;
```

The number of levels the parent node is from the root. If this
position points directly into the root node, it is 0. If it
points into a top-level paragraph, 1, and so on.

##### parentOffset {#parentoffset}

```ts
readonly parentOffset: number;
```

The offset this position has into its parent node.

##### pos {#pos}

```ts
readonly pos: number;
```

The position that was resolved.

#### Accessors

##### doc {#doc}

###### Get Signature

```ts
get doc(): ProseMirrorNode;
```

The root node in which the position was resolved.

###### Returns

[`ProseMirrorNode`](#prosemirrornode)

##### nodeAfter {#nodeafter}

###### Get Signature

```ts
get nodeAfter(): null | ProseMirrorNode;
```

Get the node directly after the position, if any. If the position
points into a text node, only the part of that node after the
position is returned.

###### Returns

`null` \| [`ProseMirrorNode`](#prosemirrornode)

##### nodeBefore {#nodebefore}

###### Get Signature

```ts
get nodeBefore(): null | ProseMirrorNode;
```

Get the node directly before the position, if any. If the
position points into a text node, only the part of that node
before the position is returned.

###### Returns

`null` \| [`ProseMirrorNode`](#prosemirrornode)

##### parent {#parent-1}

###### Get Signature

```ts
get parent(): ProseMirrorNode;
```

The parent node that the position points into. Note that even if
a position points into a text node, that node is not considered
the parent—text nodes are ‘flat’ in this model, and have no content.

###### Returns

[`ProseMirrorNode`](#prosemirrornode)

##### textOffset {#textoffset}

###### Get Signature

```ts
get textOffset(): number;
```

When this position points into a text node, this returns the
distance between the position and the start of the text node.
Will be zero for positions that point between nodes.

###### Returns

`number`

#### Methods

##### after() {#after}

```ts
after(depth?: null | number): number;
```

The (absolute) position directly after the wrapping node at the
given level, or the original position when `depth` is `this.depth + 1`.

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

`depth?`

</td>
<td>

`null` \| `number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

##### before() {#before}

```ts
before(depth?: null | number): number;
```

The (absolute) position directly before the wrapping node at the
given level, or, when `depth` is `this.depth + 1`, the original
position.

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

`depth?`

</td>
<td>

`null` \| `number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

##### blockRange() {#blockrange}

```ts
blockRange(other?: ResolvedPos, pred?: (node: ProseMirrorNode) => boolean): null | NodeRange;
```

Returns a range based on the place where this position and the
given position diverge around block content. If both point into
the same textblock, for example, a range around that textblock
will be returned. If they point into different blocks, the range
around those blocks in their shared ancestor is returned. You can
pass in an optional predicate that will be called with a parent
node to see if a range into that parent is acceptable.

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

`other?`

</td>
<td>

[`ResolvedPos`](#resolvedpos)

</td>
</tr>
<tr>
<td>

`pred?`

</td>
<td>

(`node`: [`ProseMirrorNode`](#prosemirrornode)) => `boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`NodeRange`](#noderange)

##### end() {#end-1}

```ts
end(depth?: null | number): number;
```

The (absolute) position at the end of the node at the given
level.

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

`depth?`

</td>
<td>

`null` \| `number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

##### index() {#index}

```ts
index(depth?: null | number): number;
```

The index into the ancestor at the given level. If this points
at the 3rd node in the 2nd paragraph on the top level, for
example, `p.index(0)` is 1 and `p.index(1)` is 2.

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

`depth?`

</td>
<td>

`null` \| `number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

##### indexAfter() {#indexafter}

```ts
indexAfter(depth?: null | number): number;
```

The index pointing after this position into the ancestor at the
given level.

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

`depth?`

</td>
<td>

`null` \| `number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

##### marks() {#marks-2}

```ts
marks(): readonly Mark[];
```

Get the marks at this position, factoring in the surrounding
marks' [`inclusive`](https://prosemirror.net/docs/ref/#model.MarkSpec.inclusive) property. If the
position is at the start of a non-empty node, the marks of the
node after it (if any) are returned.

###### Returns

readonly [`Mark`](#mark)[]

##### marksAcross() {#marksacross}

```ts
marksAcross($end: ResolvedPos): null | readonly Mark[];
```

Get the marks after the current position, if any, except those
that are non-inclusive and not present at position `$end`. This
is mostly useful for getting the set of marks to preserve after a
deletion. Will return `null` if this position is at the end of
its parent node or its parent node isn't a textblock (in which
case no marks should be preserved).

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

`$end`

</td>
<td>

[`ResolvedPos`](#resolvedpos)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| readonly [`Mark`](#mark)[]

##### max() {#max}

```ts
max(other: ResolvedPos): ResolvedPos;
```

Return the greater of this and the given position.

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

[`ResolvedPos`](#resolvedpos)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ResolvedPos`](#resolvedpos)

##### min() {#min}

```ts
min(other: ResolvedPos): ResolvedPos;
```

Return the smaller of this and the given position.

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

[`ResolvedPos`](#resolvedpos)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ResolvedPos`](#resolvedpos)

##### node() {#node}

```ts
node(depth?: null | number): ProseMirrorNode;
```

The ancestor node at the given level. `p.node(p.depth)` is the
same as `p.parent`.

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

`depth?`

</td>
<td>

`null` \| `number`

</td>
</tr>
</tbody>
</table>

###### Returns

[`ProseMirrorNode`](#prosemirrornode)

##### posAtIndex() {#posatindex}

```ts
posAtIndex(index: number, depth?: null | number): number;
```

Get the position at the given index in the parent node at the
given depth (which defaults to `this.depth`).

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

`index`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`depth?`

</td>
<td>

`null` \| `number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

##### sameParent() {#sameparent}

```ts
sameParent(other: ResolvedPos): boolean;
```

Query whether the given position shares the same parent node.

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

[`ResolvedPos`](#resolvedpos)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### sharedDepth() {#shareddepth}

```ts
sharedDepth(pos: number): number;
```

The depth up to which this position and the given (non-resolved)
position share the same parent nodes.

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

`number`

##### start() {#start-1}

```ts
start(depth?: null | number): number;
```

The (absolute) position at the start of the node at the given
level.

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

`depth?`

</td>
<td>

`null` \| `number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

<!-- DEBUG memberWithGroups 10 -->

***

### Schema\<Nodes, Marks\> {#schema-3}

<!-- DEBUG memberWithGroups 1 -->

A document schema. Holds [node](https://prosemirror.net/docs/ref/#model.NodeType) and [mark
type](https://prosemirror.net/docs/ref/#model.MarkType) objects for the nodes and marks that may
occur in conforming documents, and provides functionality for
creating and deserializing such documents.

When given, the type parameters provide the names of the nodes and
marks in this schema.

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

`Nodes` *extends* `string`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`Marks` *extends* `string`

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
new Schema<Nodes, Marks>(spec: SchemaSpec<Nodes, Marks>): Schema<Nodes, Marks>;
```

Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).

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

`spec`

</td>
<td>

[`SchemaSpec`](#schemaspec-1)\<`Nodes`, `Marks`\>

</td>
</tr>
</tbody>
</table>

###### Returns

[`Schema`](#schema-3)\<`Nodes`, `Marks`\>

#### Properties

##### cached {#cached}

```ts
cached: object;
```

An object for storing whatever values modules may want to
compute and cache per schema. (If you want to store something
in it, try to use property names unlikely to clash.)

###### Index Signature

```ts
[key: string]: any
```

##### linebreakReplacement {#linebreakreplacement}

```ts
linebreakReplacement: null | NodeType;
```

The [linebreak
replacement](https://prosemirror.net/docs/ref/#model.NodeSpec.linebreakReplacement) node defined
in this schema, if any.

##### marks {#marks-5}

```ts
marks: { readonly [name in string]: MarkType } & object;
```

A map from mark names to mark type objects.

##### nodes {#nodes-2}

```ts
nodes: { readonly [name in string]: NodeType } & object;
```

An object mapping the schema's node names to node type objects.

##### spec {#spec-2}

```ts
spec: object;
```

The [spec](https://prosemirror.net/docs/ref/#model.SchemaSpec) on which the schema is based,
with the added guarantee that its `nodes` and `marks`
properties are
[`OrderedMap`](https://github.com/marijnh/orderedmap) instances
(not raw objects).

###### marks

```ts
marks: OrderedMap<MarkSpec>;
```

###### nodes

```ts
nodes: OrderedMap<NodeSpec>;
```

###### topNode?

```ts
optional topNode: string;
```

##### topNodeType {#topnodetype}

```ts
topNodeType: NodeType;
```

The type of the [default top node](https://prosemirror.net/docs/ref/#model.SchemaSpec.topNode)
for this schema.

#### Methods

##### mark() {#mark-3}

```ts
mark(type: string | MarkType, attrs?: null | Attrs): Mark;
```

Create a mark with the given type and attributes.

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

`type`

</td>
<td>

`string` \| [`MarkType`](#marktype-1)

</td>
</tr>
<tr>
<td>

`attrs?`

</td>
<td>

`null` \| [`Attrs`](#attrs-7)

</td>
</tr>
</tbody>
</table>

###### Returns

[`Mark`](#mark)

##### markFromJSON() {#markfromjson-2}

```ts
markFromJSON(json: any): Mark;
```

Deserialize a mark from its JSON representation. This method is
bound.

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

`json`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Mark`](#mark)

##### node() {#node-2}

```ts
node(
   type: string | NodeType, 
   attrs?: null | Attrs, 
   content?: 
  | ProseMirrorNode
  | ProseMirrorFragment
  | readonly ProseMirrorNode[], 
   marks?: readonly Mark[]): ProseMirrorNode;
```

Create a node in this schema. The `type` may be a string or a
`NodeType` instance. Attributes will be extended with defaults,
`content` may be a `Fragment`, `null`, a `Node`, or an array of
nodes.

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

`type`

</td>
<td>

`string` \| [`NodeType`](#nodetype)

</td>
</tr>
<tr>
<td>

`attrs?`

</td>
<td>

`null` \| [`Attrs`](#attrs-7)

</td>
</tr>
<tr>
<td>

`content?`

</td>
<td>

 \| [`ProseMirrorNode`](#prosemirrornode) \| [`ProseMirrorFragment`](#prosemirrorfragment) \| readonly [`ProseMirrorNode`](#prosemirrornode)[]

</td>
</tr>
<tr>
<td>

`marks?`

</td>
<td>

readonly [`Mark`](#mark)[]

</td>
</tr>
</tbody>
</table>

###### Returns

[`ProseMirrorNode`](#prosemirrornode)

##### nodeFromJSON() {#nodefromjson}

```ts
nodeFromJSON(json: any): ProseMirrorNode;
```

Deserialize a node from its JSON representation. This method is
bound.

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

`json`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

[`ProseMirrorNode`](#prosemirrornode)

##### text() {#text-1}

```ts
text(text: string, marks?: null | readonly Mark[]): ProseMirrorNode;
```

Create a text node in the schema. Empty text nodes are not
allowed.

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

`marks?`

</td>
<td>

`null` \| readonly [`Mark`](#mark)[]

</td>
</tr>
</tbody>
</table>

###### Returns

[`ProseMirrorNode`](#prosemirrornode)

<!-- DEBUG memberWithGroups 10 -->

***

### Slice {#slice-2}

<!-- DEBUG memberWithGroups 1 -->

A slice represents a piece cut out of a larger document. It
stores not only a fragment, but also the depth up to which nodes on
both side are ‘open’ (cut through).

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new Slice(
   content: ProseMirrorFragment, 
   openStart: number, 
   openEnd: number): Slice;
```

Create a slice. When specifying a non-zero open depth, you must
make sure that there are nodes of at least that depth at the
appropriate side of the fragment—i.e. if the fragment is an
empty paragraph node, `openStart` and `openEnd` can't be greater
than 1.

It is not necessary for the content of open nodes to conform to
the schema's content constraints, though it should be a valid
start/end/middle for such a node, depending on which sides are
open.

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

`content`

</td>
<td>

[`ProseMirrorFragment`](#prosemirrorfragment)

</td>
<td>

The slice's content.

</td>
</tr>
<tr>
<td>

`openStart`

</td>
<td>

`number`

</td>
<td>

The open depth at the start of the fragment.

</td>
</tr>
<tr>
<td>

`openEnd`

</td>
<td>

`number`

</td>
<td>

The open depth at the end.

</td>
</tr>
</tbody>
</table>

###### Returns

[`Slice`](#slice-2)

#### Properties

##### content {#content-2}

```ts
readonly content: ProseMirrorFragment;
```

The slice's content.

##### openEnd {#openend}

```ts
readonly openEnd: number;
```

The open depth at the end.

##### openStart {#openstart}

```ts
readonly openStart: number;
```

The open depth at the start of the fragment.

##### empty {#empty-1}

```ts
static empty: Slice;
```

The empty slice.

#### Accessors

##### size {#size-1}

###### Get Signature

```ts
get size(): number;
```

The size this slice would add when inserted into a document.

###### Returns

`number`

#### Methods

##### eq() {#eq-6}

```ts
eq(other: Slice): boolean;
```

Tests whether this slice is equal to another slice.

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

[`Slice`](#slice-2)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### toJSON() {#tojson-6}

```ts
toJSON(): any;
```

Convert a slice to a JSON-serializable representation.

###### Returns

`any`

##### fromJSON() {#fromjson-6}

```ts
static fromJSON(schema: Schema, json: any): Slice;
```

Deserialize a slice from its JSON representation.

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

`schema`

</td>
<td>

[`Schema`](#schema-3)

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

[`Slice`](#slice-2)

##### maxOpen() {#maxopen}

```ts
static maxOpen(fragment: ProseMirrorFragment, openIsolating?: boolean): Slice;
```

Create a slice from a fragment by taking the maximum possible
open value on both side of the fragment.

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

`fragment`

</td>
<td>

[`ProseMirrorFragment`](#prosemirrorfragment)

</td>
</tr>
<tr>
<td>

`openIsolating?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

[`Slice`](#slice-2)

<!-- DEBUG memberWithGroups 10 -->

## Interfaces

### AttributeSpec {#attributespec}

<!-- DEBUG memberWithGroups 1 -->

Used to [define](https://prosemirror.net/docs/ref/#model.NodeSpec.attrs) attributes on nodes or
marks.

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### default? {#default}

```ts
optional default: any;
```

The default value for this attribute, to use when no explicit
value is provided. Attributes that have no default must be
provided whenever a node or mark of a type that has them is
created.

##### splittable? {#splittable}

```ts
optional splittable: boolean;
```

Indicates if the block can be split using the `splitBlockAs` command.

When `splittable` is set to `true`, splitting the block with the
`splitSplittableBlock` command will pass this attribute to the newly
created block. This new block may be of a different type than the original.

If multiple block types in the schema share the same `splittable` attribute,
ensure they are compatible in type and definition. This compatibility allows
the attribute value to be correctly inherited across different block types.

##### validate? {#validate}

```ts
optional validate: string | (value: any) => void;
```

A function or type name used to validate values of this
attribute. This will be used when deserializing the attribute
from JSON, and when running [`Node.check`](https://prosemirror.net/docs/ref/#model.Node.check).
When a function, it should raise an exception if the value isn't
of the expected type or shape. When a string, it should be a
`|`-separated string of primitive types (`"number"`, `"string"`,
`"boolean"`, `"null"`, and `"undefined"`), and the library will
raise an error when the value is not one of those types.

<!-- DEBUG memberWithGroups 10 -->

***

### GenericParseRule {#genericparserule}

<!-- DEBUG memberWithGroups 1 -->

Fields that may be present in both [tag](https://prosemirror.net/docs/ref/#model.TagParseRule) and
[style](https://prosemirror.net/docs/ref/#model.StyleParseRule) parse rules.

#### Extended by

- [`StyleParseRule`](#styleparserule)
- [`TagParseRule`](#tagparserule)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### attrs? {#attrs-2}

```ts
optional attrs: Attrs;
```

Attributes for the node or mark created by this rule. When
`getAttrs` is provided, it takes precedence.

##### closeParent? {#closeparent}

```ts
optional closeParent: boolean;
```

When true, finding an element that matches this rule will close
the current node.

##### consuming? {#consuming}

```ts
optional consuming: boolean;
```

By default, when a rule matches an element or style, no further
rules get a chance to match it. By setting this to `false`, you
indicate that even when this rule matches, other rules that come
after it should also run.

##### context? {#context}

```ts
optional context: string;
```

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

##### ignore? {#ignore}

```ts
optional ignore: boolean;
```

When true, ignore content that matches this rule.

##### mark? {#mark-5}

```ts
optional mark: string;
```

The name of the mark type to wrap the matched content in.

##### priority? {#priority}

```ts
optional priority: number;
```

Can be used to change the order in which the parse rules in a
schema are tried. Those with higher priority come first. Rules
without a priority are counted as having priority 50. This
property is only meaningful in a schema—when directly
constructing a parser, the order of the rule array is used.

##### skip? {#skip}

```ts
optional skip: boolean;
```

When true, ignore the node that matches this rule, but do parse
its content.

<!-- DEBUG memberWithGroups 10 -->

***

### MarkSpec {#markspec}

<!-- DEBUG memberWithGroups 1 -->

Used to define marks when creating a schema.

#### Extended by

- [`MarkSpecOptions`](../core.md#markspecoptions)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

#### Indexable

```ts
[key: string]: any
```

Mark specs can include additional properties that can be
inspected through [`MarkType.spec`](https://prosemirror.net/docs/ref/#model.MarkType.spec) when
working with the mark.

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### attrs? {#attrs-3}

```ts
optional attrs: object;
```

The attributes that marks of this type get.

###### Index Signature

```ts
[name: string]: AttributeSpec
```

##### code? {#code}

```ts
optional code: boolean;
```

Marks the content of this span as being code, which causes some
commands and extensions to treat it differently.

##### excludes? {#excludes-2}

```ts
optional excludes: string;
```

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

##### group? {#group}

```ts
optional group: string;
```

The group or space-separated groups to which this mark belongs.

##### inclusive? {#inclusive}

```ts
optional inclusive: boolean;
```

Whether this mark should be active when the cursor is positioned
at its end (or at its start when that is also the start of the
parent node). Defaults to true.

##### parseDOM? {#parsedom}

```ts
optional parseDOM: readonly ParseRule[];
```

Associates DOM parser information with this mark (see the
corresponding [node spec field](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM)). The
`mark` field in the rules is implied.

##### spanning? {#spanning}

```ts
optional spanning: boolean;
```

Determines whether marks of this type can span multiple adjacent
nodes when serialized to DOM/HTML. Defaults to true.

##### toDOM()? {#todom}

```ts
optional toDOM: (mark: Mark, inline: boolean) => DOMOutputSpec;
```

Defines the default way marks of this type should be serialized
to DOM/HTML. When the resulting spec contains a hole, that is
where the marked content is placed. Otherwise, it is appended to
the top node.

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

[`Mark`](#mark)

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

###### Returns

[`DOMOutputSpec`](#domoutputspec)

<!-- DEBUG memberWithGroups 10 -->

***

### NodeSpec {#nodespec}

<!-- DEBUG memberWithGroups 1 -->

A description of a node type, used when defining a schema.

#### Extended by

- [`NodeSpecOptions`](../core.md#nodespecoptions)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

#### Indexable

```ts
[key: string]: any
```

Node specs may include arbitrary properties that can be read by
other code via [`NodeType.spec`](https://prosemirror.net/docs/ref/#model.NodeType.spec).

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### atom? {#atom}

```ts
optional atom: boolean;
```

Can be set to true to indicate that, though this isn't a [leaf
node](https://prosemirror.net/docs/ref/#model.NodeType.isLeaf), it doesn't have directly editable
content and should be treated as a single unit in the view.

##### attrs? {#attrs-4}

```ts
optional attrs: object;
```

The attributes that nodes of this type get.

###### Index Signature

```ts
[name: string]: AttributeSpec
```

##### code? {#code-1}

```ts
optional code: boolean;
```

Can be used to indicate that this node contains code, which
causes some commands to behave differently.

##### content? {#content-3}

```ts
optional content: string;
```

The content expression for this node, as described in the [schema
guide](https://prosemirror.net/docs/guide/#schema.content_expressions). When not given,
the node does not allow any content.

##### defining? {#defining}

```ts
optional defining: boolean;
```

When enabled, enables both
[`definingAsContext`](https://prosemirror.net/docs/ref/#model.NodeSpec.definingAsContext) and
[`definingForContent`](https://prosemirror.net/docs/ref/#model.NodeSpec.definingForContent).

##### definingAsContext? {#definingascontext}

```ts
optional definingAsContext: boolean;
```

Determines whether this node is considered an important parent
node during replace operations (such as paste). Non-defining (the
default) nodes get dropped when their entire content is replaced,
whereas defining nodes persist and wrap the inserted content.

##### definingForContent? {#definingforcontent}

```ts
optional definingForContent: boolean;
```

In inserted content the defining parents of the content are
preserved when possible. Typically, non-default-paragraph
textblock types, and possibly list items, are marked as defining.

##### disableDropCursor? {#disabledropcursor}

```ts
optional disableDropCursor: 
  | boolean
  | (view: EditorView, pos: object, event: DragEvent) => boolean;
```

##### draggable? {#draggable}

```ts
optional draggable: boolean;
```

Determines whether nodes of this type can be dragged without
being selected. Defaults to false.

##### group? {#group-1}

```ts
optional group: string;
```

The group or space-separated groups to which this node belongs,
which can be referred to in the content expressions for the
schema.

##### inline? {#inline}

```ts
optional inline: boolean;
```

Should be set to true for inline nodes. (Implied for text nodes.)

##### isolating? {#isolating}

```ts
optional isolating: boolean;
```

When enabled (default is false), the sides of nodes of this type
count as boundaries that regular editing operations, like
backspacing or lifting, won't cross. An example of a node that
should probably have this enabled is a table cell.

##### leafText()? {#leaftext}

```ts
optional leafText: (node: ProseMirrorNode) => string;
```

Defines the default way a [leaf node](https://prosemirror.net/docs/ref/#model.NodeType.isLeaf) of
this type should be serialized to a string (as used by
[`Node.textBetween`](https://prosemirror.net/docs/ref/#model.Node^textBetween) and
[`Node.textContent`](https://prosemirror.net/docs/ref/#model.Node^textContent)).

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

[`ProseMirrorNode`](#prosemirrornode)

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

##### linebreakReplacement? {#linebreakreplacement-1}

```ts
optional linebreakReplacement: boolean;
```

A single inline node in a schema can be set to be a linebreak
equivalent. When converting between block types that support the
node and block types that don't but have
[`whitespace`](https://prosemirror.net/docs/ref/#model.NodeSpec.whitespace) set to `"pre"`,
[`setBlockType`](https://prosemirror.net/docs/ref/#transform.Transform.setBlockType) will convert
between newline characters to or from linebreak nodes as
appropriate.

##### marks? {#marks-6}

```ts
optional marks: string;
```

The marks that are allowed inside of this node. May be a
space-separated string referring to mark names or groups, `"_"`
to explicitly allow all marks, or `""` to disallow marks. When
not given, nodes with inline content default to allowing all
marks, other nodes default to not allowing marks.

##### parseDOM? {#parsedom-1}

```ts
optional parseDOM: readonly TagParseRule[];
```

Associates DOM parser information with this node, which can be
used by [`DOMParser.fromSchema`](https://prosemirror.net/docs/ref/#model.DOMParser^fromSchema) to
automatically derive a parser. The `node` field in the rules is
implied (the name of this node will be filled in automatically).
If you supply your own parser, you do not need to also specify
parsing rules in your schema.

##### selectable? {#selectable}

```ts
optional selectable: boolean;
```

Controls whether nodes of this type can be selected as a [node
selection](https://prosemirror.net/docs/ref/#state.NodeSelection). Defaults to true for non-text
nodes.

##### toDebugString()? {#todebugstring}

```ts
optional toDebugString: (node: ProseMirrorNode) => string;
```

Defines the default way a node of this type should be serialized
to a string representation for debugging (e.g. in error messages).

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

[`ProseMirrorNode`](#prosemirrornode)

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

##### toDOM()? {#todom-1}

```ts
optional toDOM: (node: ProseMirrorNode) => DOMOutputSpec;
```

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

[`ProseMirrorNode`](#prosemirrornode)

</td>
</tr>
</tbody>
</table>

###### Returns

[`DOMOutputSpec`](#domoutputspec)

##### whitespace? {#whitespace-1}

```ts
optional whitespace: "pre" | "normal";
```

Controls way whitespace in this a node is parsed. The default is
`"normal"`, which causes the [DOM parser](https://prosemirror.net/docs/ref/#model.DOMParser) to
collapse whitespace in normal mode, and normalize it (replacing
newlines and such with spaces) otherwise. `"pre"` causes the
parser to preserve spaces inside the node. When this option isn't
given, but [`code`](https://prosemirror.net/docs/ref/#model.NodeSpec.code) is true, `whitespace`
will default to `"pre"`. Note that this option doesn't influence
the way the node is rendered—that should be handled by `toDOM`
and/or styling.

<!-- DEBUG memberWithGroups 10 -->

***

### ParseOptions {#parseoptions}

<!-- DEBUG memberWithGroups 1 -->

These are the options recognized by the
[`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse) and
[`parseSlice`](https://prosemirror.net/docs/ref/#model.DOMParser.parseSlice) methods.

#### Extended by

- [`DOMParserOptions`](../core.md#domparseroptions)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### context? {#context-1}

```ts
optional context: ResolvedPos;
```

A set of additional nodes to count as
[context](https://prosemirror.net/docs/ref/#model.ParseRule.context) when parsing, above the
given [top node](https://prosemirror.net/docs/ref/#model.ParseOptions.topNode).

##### findPositions? {#findpositions}

```ts
optional findPositions: object[];
```

When given, the parser will, beside parsing the content,
record the document positions of the given DOM positions. It
will do so by writing to the objects, adding a `pos` property
that holds the document position. DOM positions that are not
in the parsed content will not be written to.

###### node

```ts
node: Node;
```

###### offset

```ts
offset: number;
```

###### pos?

```ts
optional pos: number;
```

##### from? {#from-3}

```ts
optional from: number;
```

The child node index to start parsing from.

##### preserveWhitespace? {#preservewhitespace}

```ts
optional preserveWhitespace: boolean | "full";
```

By default, whitespace is collapsed as per HTML's rules. Pass
`true` to preserve whitespace, but normalize newlines to
spaces, and `"full"` to preserve whitespace entirely.

##### to? {#to-1}

```ts
optional to: number;
```

The child node index to stop parsing at.

##### topMatch? {#topmatch}

```ts
optional topMatch: ContentMatch;
```

Provide the starting content match that content parsed into the
top node is matched against.

##### topNode? {#topnode}

```ts
optional topNode: ProseMirrorNode;
```

By default, the content is parsed into the schema's default
[top node type](https://prosemirror.net/docs/ref/#model.Schema.topNodeType). You can pass this
option to use the type and attributes from a different node
as the top container.

<!-- DEBUG memberWithGroups 10 -->

***

### SchemaSpec\<Nodes, Marks\> {#schemaspec-1}

<!-- DEBUG memberWithGroups 1 -->

An object describing a schema, as passed to the [`Schema`](https://prosemirror.net/docs/ref/#model.Schema)
constructor.

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

`Nodes` *extends* `string`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`Marks` *extends* `string`

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

##### marks? {#marks-8}

```ts
optional marks: 
  | { [name in string]: MarkSpec }
| OrderedMap<MarkSpec>;
```

The mark types that exist in this schema. The order in which they
are provided determines the order in which [mark
sets](https://prosemirror.net/docs/ref/#model.Mark.addToSet) are sorted and in which [parse
rules](https://prosemirror.net/docs/ref/#model.MarkSpec.parseDOM) are tried.

##### nodes {#nodes-4}

```ts
nodes: 
  | { [name in string]: NodeSpec }
| OrderedMap<NodeSpec>;
```

The node types in this schema. Maps names to
[`NodeSpec`](https://prosemirror.net/docs/ref/#model.NodeSpec) objects that describe the node type
associated with that name. Their order is significant—it
determines which [parse rules](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM) take
precedence by default, and which nodes come first in a given
[group](https://prosemirror.net/docs/ref/#model.NodeSpec.group).

##### topNode? {#topnode-1}

```ts
optional topNode: string;
```

The name of the default top-level node for the schema. Defaults
to `"doc"`.

<!-- DEBUG memberWithGroups 10 -->

***

### StyleParseRule {#styleparserule}

<!-- DEBUG memberWithGroups 1 -->

A parse rule targeting a style property.

#### Extends

- [`GenericParseRule`](#genericparserule)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### attrs? {#attrs-5}

```ts
optional attrs: Attrs;
```

Attributes for the node or mark created by this rule. When
`getAttrs` is provided, it takes precedence.

###### Inherited from

[`GenericParseRule`](#genericparserule).[`attrs`](#attrs-2)

##### clearMark()? {#clearmark}

```ts
optional clearMark: (mark: Mark) => boolean;
```

Style rules can remove marks from the set of active marks.

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

[`Mark`](#mark)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### closeParent? {#closeparent-1}

```ts
optional closeParent: boolean;
```

When true, finding an element that matches this rule will close
the current node.

###### Inherited from

[`GenericParseRule`](#genericparserule).[`closeParent`](#closeparent)

##### consuming? {#consuming-1}

```ts
optional consuming: boolean;
```

By default, when a rule matches an element or style, no further
rules get a chance to match it. By setting this to `false`, you
indicate that even when this rule matches, other rules that come
after it should also run.

###### Inherited from

[`GenericParseRule`](#genericparserule).[`consuming`](#consuming)

##### context? {#context-2}

```ts
optional context: string;
```

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

###### Inherited from

[`GenericParseRule`](#genericparserule).[`context`](#context)

##### getAttrs()? {#getattrs}

```ts
optional getAttrs: (node: string) => null | false | Attrs;
```

A function used to compute the attributes for the node or mark
created by this rule. Called with the style's value.

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

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| `false` \| [`Attrs`](#attrs-7)

##### ignore? {#ignore-1}

```ts
optional ignore: boolean;
```

When true, ignore content that matches this rule.

###### Inherited from

[`GenericParseRule`](#genericparserule).[`ignore`](#ignore)

##### mark? {#mark-6}

```ts
optional mark: string;
```

The name of the mark type to wrap the matched content in.

###### Inherited from

[`GenericParseRule`](#genericparserule).[`mark`](#mark-5)

##### priority? {#priority-1}

```ts
optional priority: number;
```

Can be used to change the order in which the parse rules in a
schema are tried. Those with higher priority come first. Rules
without a priority are counted as having priority 50. This
property is only meaningful in a schema—when directly
constructing a parser, the order of the rule array is used.

###### Inherited from

[`GenericParseRule`](#genericparserule).[`priority`](#priority)

##### skip? {#skip-1}

```ts
optional skip: boolean;
```

When true, ignore the node that matches this rule, but do parse
its content.

###### Inherited from

[`GenericParseRule`](#genericparserule).[`skip`](#skip)

##### style {#style}

```ts
style: string;
```

A CSS property name to match. This rule will match inline styles
that list that property. May also have the form
`"property=value"`, in which case the rule only matches if the
property's value exactly matches the given value. (For more
complicated filters, use [`getAttrs`](https://prosemirror.net/docs/ref/#model.ParseRule.getAttrs)
and return false to indicate that the match failed.) Rules
matching styles may only produce [marks](https://prosemirror.net/docs/ref/#model.ParseRule.mark),
not nodes.

##### tag? {#tag}

```ts
optional tag: undefined;
```

Given to make TS see ParseRule as a tagged union

###### Hide

<!-- DEBUG memberWithGroups 10 -->

***

### TagParseRule {#tagparserule}

<!-- DEBUG memberWithGroups 1 -->

Parse rule targeting a DOM element.

#### Extends

- [`GenericParseRule`](#genericparserule)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### attrs? {#attrs-6}

```ts
optional attrs: Attrs;
```

Attributes for the node or mark created by this rule. When
`getAttrs` is provided, it takes precedence.

###### Inherited from

[`GenericParseRule`](#genericparserule).[`attrs`](#attrs-2)

##### closeParent? {#closeparent-2}

```ts
optional closeParent: boolean;
```

When true, finding an element that matches this rule will close
the current node.

###### Inherited from

[`GenericParseRule`](#genericparserule).[`closeParent`](#closeparent)

##### consuming? {#consuming-2}

```ts
optional consuming: boolean;
```

By default, when a rule matches an element or style, no further
rules get a chance to match it. By setting this to `false`, you
indicate that even when this rule matches, other rules that come
after it should also run.

###### Inherited from

[`GenericParseRule`](#genericparserule).[`consuming`](#consuming)

##### contentElement? {#contentelement}

```ts
optional contentElement: 
  | string
  | HTMLElement
  | (node: Node) => HTMLElement;
```

For rules that produce non-leaf nodes, by default the content of
the DOM element is parsed as content of the node. If the child
nodes are in a descendent node, this may be a CSS selector
string that the parser must use to find the actual content
element, or a function that returns the actual content element
to the parser.

##### context? {#context-3}

```ts
optional context: string;
```

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

###### Inherited from

[`GenericParseRule`](#genericparserule).[`context`](#context)

##### getAttrs()? {#getattrs-1}

```ts
optional getAttrs: (node: HTMLElement) => null | false | Attrs;
```

A function used to compute the attributes for the node or mark
created by this rule. Can also be used to describe further
conditions the DOM element or style must match. When it returns
`false`, the rule won't match. When it returns null or undefined,
that is interpreted as an empty/default set of attributes.

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

[`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| `false` \| [`Attrs`](#attrs-7)

##### getContent()? {#getcontent}

```ts
optional getContent: (node: Node, schema: Schema) => ProseMirrorFragment;
```

Can be used to override the content of a matched node. When
present, instead of parsing the node's child nodes, the result of
this function is used.

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

`schema`

</td>
<td>

[`Schema`](#schema-3)

</td>
</tr>
</tbody>
</table>

###### Returns

[`ProseMirrorFragment`](#prosemirrorfragment)

##### ignore? {#ignore-2}

```ts
optional ignore: boolean;
```

When true, ignore content that matches this rule.

###### Inherited from

[`GenericParseRule`](#genericparserule).[`ignore`](#ignore)

##### mark? {#mark-7}

```ts
optional mark: string;
```

The name of the mark type to wrap the matched content in.

###### Inherited from

[`GenericParseRule`](#genericparserule).[`mark`](#mark-5)

##### namespace? {#namespace}

```ts
optional namespace: string;
```

The namespace to match. Nodes are only matched when the
namespace matches or this property is null.

##### node? {#node-4}

```ts
optional node: string;
```

The name of the node type to create when this rule matches. Each
rule should have either a `node`, `mark`, or `ignore` property
(except when it appears in a [node](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM) or
[mark spec](https://prosemirror.net/docs/ref/#model.MarkSpec.parseDOM), in which case the `node`
or `mark` property will be derived from its position).

##### preserveWhitespace? {#preservewhitespace-1}

```ts
optional preserveWhitespace: boolean | "full";
```

Controls whether whitespace should be preserved when parsing the
content inside the matched element. `false` means whitespace may
be collapsed, `true` means that whitespace should be preserved
but newlines normalized to spaces, and `"full"` means that
newlines should also be preserved.

##### priority? {#priority-2}

```ts
optional priority: number;
```

Can be used to change the order in which the parse rules in a
schema are tried. Those with higher priority come first. Rules
without a priority are counted as having priority 50. This
property is only meaningful in a schema—when directly
constructing a parser, the order of the rule array is used.

###### Inherited from

[`GenericParseRule`](#genericparserule).[`priority`](#priority)

##### skip? {#skip-2}

```ts
optional skip: boolean;
```

When true, ignore the node that matches this rule, but do parse
its content.

###### Inherited from

[`GenericParseRule`](#genericparserule).[`skip`](#skip)

##### tag {#tag-1}

```ts
tag: string;
```

A CSS selector describing the kind of DOM elements to match.

<!-- DEBUG memberWithGroups 10 -->

## Type Aliases

### Attrs {#attrs-7}

```ts
type Attrs = object;
```

An object holding the attributes of a node.

#### Index Signature

```ts
[attr: string]: any
```

***

### DOMOutputSpec {#domoutputspec}

```ts
type DOMOutputSpec = 
  | string
  | DOMNode
  | {
  contentDOM?: HTMLElement;
  dom: DOMNode;
}
  | readonly [string, ...any[]];
```

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

***

### ParseRule {#parserule}

```ts
type ParseRule = TagParseRule | StyleParseRule;
```

A value that describes how to parse a given DOM node or inline
style as a ProseMirror node or mark.

## References

### Fragment {#fragment}

Renames and re-exports [ProseMirrorFragment](#prosemirrorfragment)

***

### Node {#node-5}

Renames and re-exports [ProseMirrorNode](#prosemirrornode)

<!-- DEBUG memberWithGroups 10 -->
