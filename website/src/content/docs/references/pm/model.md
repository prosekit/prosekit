---
title: prosekit/pm/model
sidebar:
  label: pm/model
---

Re-exports from [prosemirror-model](https://github.com/ProseMirror/prosemirror-model).

## Classes

### ContentMatch {#contentmatch}

Instances of this class represent a match state of a node type's
[content expression](https://prosemirror.net/docs/ref/#model.NodeSpec.content), and can be used to
find out whether further content matches here, and whether a given
position is a valid end of the node.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructorcontentmatch" href="#constructorcontentmatch">ContentMatch</a>(): [`ContentMatch`](#contentmatch)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="validend" href="#validend">validEnd</a>: `boolean`</code>

</dt>

<dd>

True when this match state represents a valid end of the node.

</dd>

</dl>

#### Accessors

##### defaultType {#defaulttype}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="defaulttypedefaulttype" href="#defaulttypedefaulttype">defaultType</a>(): `null` \| [`NodeType`](#nodetype)</code>

Get the first matching node type at this match position that can
be generated.

###### Returns

`null` \| [`NodeType`](#nodetype)

##### edgeCount {#edgecount}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="edgecountedgecount" href="#edgecountedgecount">edgeCount</a>(): `number`</code>

The number of outgoing edges this node has in the finite
automaton that describes the content expression.

###### Returns

`number`

#### Methods

##### edge() {#edge}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="edge-1" href="#edge-1">edge</a>(`n`: `number`): [`MatchEdge`](https://prosemirror.net/docs/ref/#model.MatchEdge)</code>

</dt>

<dd>

Get the _n_​th outgoing edge from this node in the finite
automaton that describes the content expression.

</dd>

</dl>

##### fillBefore() {#fillbefore}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="fillbefore-1" href="#fillbefore-1">fillBefore</a>(`after`: [`ProseMirrorFragment`](#prosemirrorfragment), `toEnd?`: `boolean`, `startIndex?`: `number`): `null` \| [`ProseMirrorFragment`](#prosemirrorfragment)</code>

</dt>

<dd>

Try to match the given fragment, and if that fails, see if it can
be made to match by inserting nodes in front of it. When
successful, return a fragment of inserted nodes (which may be
empty if nothing had to be inserted). When `toEnd` is true, only
return a fragment if the resulting match goes to the end of the
content expression.

</dd>

</dl>

##### findWrapping() {#findwrapping}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="findwrapping-1" href="#findwrapping-1">findWrapping</a>(`target`: [`NodeType`](#nodetype)): `null` \| readonly [`NodeType`](#nodetype)[]</code>

</dt>

<dd>

Find a set of wrapping node types that would allow a node of the
given type to appear at this position. The result may be empty
(when it fits directly) and will be null when no such wrapping
exists.

</dd>

</dl>

##### matchFragment() {#matchfragment}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="matchfragment-1" href="#matchfragment-1">matchFragment</a>(`frag`: [`ProseMirrorFragment`](#prosemirrorfragment), `start?`: `number`, `end?`: `number`): `null` \| [`ContentMatch`](#contentmatch)</code>

</dt>

<dd>

Try to match a fragment. Returns the resulting match when
successful.

</dd>

</dl>

##### matchType() {#matchtype}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="matchtype-1" href="#matchtype-1">matchType</a>(`type`: [`NodeType`](#nodetype)): `null` \| [`ContentMatch`](#contentmatch)</code>

</dt>

<dd>

Match a node type, returning a match after that node if
successful.

</dd>

</dl>

***

### DOMParser {#domparser}

A DOM parser represents a strategy for parsing DOM content into a
ProseMirror document conforming to a given schema. Its behavior is
defined by an array of [rules](https://prosemirror.net/docs/ref/#model.ParseRule).

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructordomparser" href="#constructordomparser">DOMParser</a>(`schema`: [`Schema`](#schema-3), `rules`: readonly [`ParseRule`](#parserule)[]): [`DOMParser`](#domparser)</code>

</dt>

<dd>

Create a parser that targets the given schema, using the given
parsing rules.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="rules" href="#rules">rules</a>: readonly [`ParseRule`](#parserule)[]</code>

</dt>

<dd>

The set of [parse rules](https://prosemirror.net/docs/ref/#model.ParseRule) that the parser
uses, in order of precedence.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="schema" href="#schema">schema</a>: [`Schema`](#schema-3)</code>

</dt>

<dd>

The schema into which the parser parses.

</dd>

</dl>

#### Methods

##### parse() {#parse}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="parse-1" href="#parse-1">parse</a>(`dom`: [`Node`](https://developer.mozilla.org/docs/Web/API/Node), `options?`: [`ParseOptions`](#parseoptions)): [`ProseMirrorNode`](#prosemirrornode)</code>

</dt>

<dd>

Parse a document from the content of a DOM node.

</dd>

</dl>

##### parseSlice() {#parseslice}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="parseslice-1" href="#parseslice-1">parseSlice</a>(`dom`: [`Node`](https://developer.mozilla.org/docs/Web/API/Node), `options?`: [`ParseOptions`](#parseoptions)): [`Slice`](#slice-2)</code>

</dt>

<dd>

Parses the content of the given DOM node, like
[`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse), and takes the same set of
options. But unlike that method, which produces a whole node,
this one returns a slice that is open at the sides, meaning that
the schema constraints aren't applied to the start of nodes to
the left of the input and the end of nodes at the end.

</dd>

</dl>

##### fromSchema() {#fromschema}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="fromschema-1" href="#fromschema-1">fromSchema</a>(`schema`: [`Schema`](#schema-3)): [`DOMParser`](#domparser)</code>

</dt>

<dd>

Construct a DOM parser using the parsing rules listed in a
schema's [node specs](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM), reordered by
[priority](https://prosemirror.net/docs/ref/#model.ParseRule.priority).

</dd>

</dl>

***

### DOMSerializer {#domserializer}

A DOM serializer knows how to convert ProseMirror nodes and
marks of various types to DOM nodes.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructordomserializer" href="#constructordomserializer">DOMSerializer</a>(`nodes`: `object`, `marks`: `object`): [`DOMSerializer`](#domserializer)</code>

</dt>

<dd>

Create a serializer. `nodes` should map node names to functions
that take a node and return a description of the corresponding
DOM. `marks` does the same for mark names, but also gets an
argument that tells it whether the mark's content is block or
inline content (for typical use, it'll always be inline). A mark
serializer may be `null` to indicate that marks of that type
should not be serialized.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="marks" href="#marks">marks</a>: `object`</code>

</dt>

<dd>

The mark serialization functions.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="nodes" href="#nodes">nodes</a>: `object`</code>

</dt>

<dd>

The node serialization functions.

</dd>

</dl>

#### Methods

##### serializeFragment() {#serializefragment}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="serializefragment-1" href="#serializefragment-1">serializeFragment</a>(`fragment`: [`ProseMirrorFragment`](#prosemirrorfragment), `options?`: `object`, `target?`: [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement) \| [`DocumentFragment`](https://developer.mozilla.org/docs/Web/API/DocumentFragment)): [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement) \| [`DocumentFragment`](https://developer.mozilla.org/docs/Web/API/DocumentFragment)</code>

</dt>

<dd>

Serialize the content of this fragment to a DOM fragment. When
not in the browser, the `document` option, containing a DOM
document, should be passed so that the serializer can create
nodes.

</dd>

</dl>

##### serializeNode() {#serializenode}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="serializenode-1" href="#serializenode-1">serializeNode</a>(`node`: [`ProseMirrorNode`](#prosemirrornode), `options?`: `object`): [`Node`](https://developer.mozilla.org/docs/Web/API/Node)</code>

</dt>

<dd>

Serialize this node to a DOM node. This can be useful when you
need to serialize a part of a document, as opposed to the whole
document. To serialize a whole document, use
[`serializeFragment`](https://prosemirror.net/docs/ref/#model.DOMSerializer.serializeFragment) on
its [content](https://prosemirror.net/docs/ref/#model.Node.content).

</dd>

</dl>

##### fromSchema() {#fromschema-2}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="fromschema-3" href="#fromschema-3">fromSchema</a>(`schema`: [`Schema`](#schema-3)): [`DOMSerializer`](#domserializer)</code>

</dt>

<dd>

Build a serializer using the [`toDOM`](https://prosemirror.net/docs/ref/#model.NodeSpec.toDOM)
properties in a schema's node and mark specs.

</dd>

</dl>

##### marksFromSchema() {#marksfromschema}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="marksfromschema-1" href="#marksfromschema-1">marksFromSchema</a>(`schema`: [`Schema`](#schema-3)): `object`</code>

</dt>

<dd>

Gather the serializers in a schema's mark specs into an object.

</dd>

</dl>

##### nodesFromSchema() {#nodesfromschema}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="nodesfromschema-1" href="#nodesfromschema-1">nodesFromSchema</a>(`schema`: [`Schema`](#schema-3)): `object`</code>

</dt>

<dd>

Gather the serializers in a schema's node specs into an object.
This can be useful as a base to build a custom serializer from.

</dd>

</dl>

##### renderSpec() {#renderspec}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="renderspec-1" href="#renderspec-1">renderSpec</a>(`doc`: [`Document`](https://developer.mozilla.org/docs/Web/API/Document), `structure`: [`DOMOutputSpec`](#domoutputspec), `xmlNS?`: `null` \| `string`): `object`</code>

</dt>

<dd>

Render an [output spec](https://prosemirror.net/docs/ref/#model.DOMOutputSpec) to a DOM node. If
the spec has a hole (zero) in it, `contentDOM` will point at the
node with the hole.

</dd>

</dl>

***

### Mark {#mark}

A mark is a piece of information that can be attached to a node,
such as it being emphasized, in code font, or a link. It has a
type and optionally a set of attributes that provide further
information (such as the target of the link). Marks are created
through a `Schema`, which controls which types exist and which
attributes they have.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructormark" href="#constructormark">Mark</a>(): [`Mark`](#mark)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="attrs" href="#attrs">attrs</a>: [`Attrs`](#attrs-7)</code>

</dt>

<dd>

The attributes associated with this mark.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="type" href="#type">type</a>: [`MarkType`](#marktype-1)</code>

</dt>

<dd>

The type of this mark.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="none" href="#none">none</a>: readonly [`Mark`](#mark)[]</code>

</dt>

<dd>

The empty set of marks.

</dd>

</dl>

#### Methods

##### addToSet() {#addtoset}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="addtoset-1" href="#addtoset-1">addToSet</a>(`set`: readonly [`Mark`](#mark)[]): readonly [`Mark`](#mark)[]</code>

</dt>

<dd>

Given a set of marks, create a new set which contains this one as
well, in the right position. If this mark is already in the set,
the set itself is returned. If any marks that are set to be
[exclusive](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) with this mark are present,
those are replaced by this one.

</dd>

</dl>

##### eq() {#eq}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="eq-1" href="#eq-1">eq</a>(`other`: [`Mark`](#mark)): `boolean`</code>

</dt>

<dd>

Test whether this mark has the same type and attributes as
another mark.

</dd>

</dl>

##### isInSet() {#isinset}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="isinset-1" href="#isinset-1">isInSet</a>(`set`: readonly [`Mark`](#mark)[]): `boolean`</code>

</dt>

<dd>

Test whether this mark is in the given set of marks.

</dd>

</dl>

##### removeFromSet() {#removefromset}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="removefromset-1" href="#removefromset-1">removeFromSet</a>(`set`: readonly [`Mark`](#mark)[]): readonly [`Mark`](#mark)[]</code>

</dt>

<dd>

Remove this mark from the given set, returning a new set. If this
mark is not in the set, the set itself is returned.

</dd>

</dl>

##### toJSON() {#tojson}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="tojson-1" href="#tojson-1">toJSON</a>(): `any`</code>

</dt>

<dd>

Convert this mark to a JSON-serializeable representation.

</dd>

</dl>

##### fromJSON() {#fromjson}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="fromjson-1" href="#fromjson-1">fromJSON</a>(`schema`: [`Schema`](#schema-3), `json`: `any`): [`Mark`](#mark)</code>

</dt>

<dd>

Deserialize a mark from JSON.

</dd>

</dl>

##### sameSet() {#sameset}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="sameset-1" href="#sameset-1">sameSet</a>(`a`: readonly [`Mark`](#mark)[], `b`: readonly [`Mark`](#mark)[]): `boolean`</code>

</dt>

<dd>

Test whether two sets of marks are identical.

</dd>

</dl>

##### setFrom() {#setfrom}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="setfrom-1" href="#setfrom-1">setFrom</a>(`marks?`: `null` \| [`Mark`](#mark) \| readonly [`Mark`](#mark)[]): readonly [`Mark`](#mark)[]</code>

</dt>

<dd>

Create a properly sorted mark set from null, a single mark, or an
unsorted array of marks.

</dd>

</dl>

***

### MarkType {#marktype-1}

Like nodes, marks (which are associated with nodes to signify
things like emphasis or being part of a link) are
[tagged](https://prosemirror.net/docs/ref/#model.Mark.type) with type objects, which are
instantiated once per `Schema`.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructormarktype" href="#constructormarktype">MarkType</a>(): [`MarkType`](#marktype-1)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="name" href="#name">name</a>: `string`</code>

</dt>

<dd>

The name of the mark type.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="schema-1" href="#schema-1">schema</a>: [`Schema`](#schema-3)</code>

</dt>

<dd>

The schema that this mark type instance is part of.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="spec" href="#spec">spec</a>: [`MarkSpec`](#markspec)</code>

</dt>

<dd>

The spec on which the type is based.

</dd>

</dl>

#### Methods

##### create() {#create}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="create-1" href="#create-1">create</a>(`attrs?`: `null` \| [`Attrs`](#attrs-7)): [`Mark`](#mark)</code>

</dt>

<dd>

Create a mark of this type. `attrs` may be `null` or an object
containing only some of the mark's attributes. The others, if
they have defaults, will be added.

</dd>

</dl>

##### excludes() {#excludes}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="excludes-1" href="#excludes-1">excludes</a>(`other`: [`MarkType`](#marktype-1)): `boolean`</code>

</dt>

<dd>

Queries whether a given mark type is
[excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.

</dd>

</dl>

##### isInSet() {#isinset-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="isinset-3" href="#isinset-3">isInSet</a>(`set`: readonly [`Mark`](#mark)[]): `undefined` \| [`Mark`](#mark)</code>

</dt>

<dd>

Tests whether there is a mark of this type in the given set.

</dd>

</dl>

##### removeFromSet() {#removefromset-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="removefromset-3" href="#removefromset-3">removeFromSet</a>(`set`: readonly [`Mark`](#mark)[]): readonly [`Mark`](#mark)[]</code>

</dt>

<dd>

When there is a mark of this type in the given set, a new set
without it is returned. Otherwise, the input set is returned.

</dd>

</dl>

***

### NodeRange {#noderange}

Represents a flat range of content, i.e. one that starts and
ends in the same node.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructornoderange" href="#constructornoderange">NodeRange</a>(`$from`: [`ResolvedPos`](#resolvedpos), `$to`: [`ResolvedPos`](#resolvedpos), `depth`: `number`): [`NodeRange`](#noderange)</code>

</dt>

<dd>

Construct a node range. `$from` and `$to` should point into the
same node until at least the given `depth`, since a node range
denotes an adjacent set of nodes in a single parent node.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="from" href="#from">$from</a>: [`ResolvedPos`](#resolvedpos)</code>

</dt>

<dd>

A resolved position along the start of the content. May have a
`depth` greater than this object's `depth` property, since
these are the positions that were used to compute the range,
not re-resolved positions directly at its boundaries.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="to" href="#to">$to</a>: [`ResolvedPos`](#resolvedpos)</code>

</dt>

<dd>

A position along the end of the content. See
caveat for [`$from`](https://prosemirror.net/docs/ref/#model.NodeRange.$from).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="depth" href="#depth">depth</a>: `number`</code>

</dt>

<dd>

The depth of the node that this range points into.

</dd>

</dl>

#### Accessors

##### end {#end}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="endend" href="#endend">end</a>(): `number`</code>

The position at the end of the range.

###### Returns

`number`

##### endIndex {#endindex}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="endindexendindex" href="#endindexendindex">endIndex</a>(): `number`</code>

The end index of the range in the parent node.

###### Returns

`number`

##### parent {#parent}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="parentparent" href="#parentparent">parent</a>(): [`ProseMirrorNode`](#prosemirrornode)</code>

The parent node that the range points into.

###### Returns

[`ProseMirrorNode`](#prosemirrornode)

##### start {#start}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="startstart" href="#startstart">start</a>(): `number`</code>

The position at the start of the range.

###### Returns

`number`

##### startIndex {#startindex}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="startindexstartindex" href="#startindexstartindex">startIndex</a>(): `number`</code>

The start index of the range in the parent node.

###### Returns

`number`

***

### NodeType {#nodetype}

Node types are objects allocated once per `Schema` and used to
[tag](https://prosemirror.net/docs/ref/#model.Node.type) `Node` instances. They contain information
about the node type, such as its name and what kind of node it
represents.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructornodetype" href="#constructornodetype">NodeType</a>(): [`NodeType`](#nodetype)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="contentmatch-1" href="#contentmatch-1">contentMatch</a>: [`ContentMatch`](#contentmatch)</code>

</dt>

<dd>

The starting match of the node type's content expression.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="inlinecontent" href="#inlinecontent">inlineContent</a>: `boolean`</code>

</dt>

<dd>

True if this node type has inline content.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="isblock" href="#isblock">isBlock</a>: `boolean`</code>

</dt>

<dd>

True if this is a block type

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="istext" href="#istext">isText</a>: `boolean`</code>

</dt>

<dd>

True if this is the text node type.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="markset" href="#markset">markSet</a>: `null` \| readonly [`MarkType`](#marktype-1)[]</code>

</dt>

<dd>

The set of marks allowed in this node. `null` means all marks
are allowed.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="name-1" href="#name-1">name</a>: `string`</code>

</dt>

<dd>

The name the node type has in this schema.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="schema-2" href="#schema-2">schema</a>: [`Schema`](#schema-3)</code>

</dt>

<dd>

A link back to the `Schema` the node type belongs to.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="spec-1" href="#spec-1">spec</a>: [`NodeSpec`](#nodespec)</code>

</dt>

<dd>

The spec that this type is based on

</dd>

</dl>

#### Accessors

##### isAtom {#isatom}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="isatomisatom" href="#isatomisatom">isAtom</a>(): `boolean`</code>

True when this node is an atom, i.e. when it does not have
directly editable content.

###### Returns

`boolean`

##### isInline {#isinline}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="isinlineisinline" href="#isinlineisinline">isInline</a>(): `boolean`</code>

True if this is an inline type.

###### Returns

`boolean`

##### isLeaf {#isleaf}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="isleafisleaf" href="#isleafisleaf">isLeaf</a>(): `boolean`</code>

True for node types that allow no content.

###### Returns

`boolean`

##### isTextblock {#istextblock}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="istextblockistextblock" href="#istextblockistextblock">isTextblock</a>(): `boolean`</code>

True if this is a textblock type, a block that contains inline
content.

###### Returns

`boolean`

##### whitespace {#whitespace}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="whitespacewhitespace" href="#whitespacewhitespace">whitespace</a>(): `"pre"` \| `"normal"`</code>

The node type's [whitespace](https://prosemirror.net/docs/ref/#model.NodeSpec.whitespace) option.

###### Returns

`"pre"` \| `"normal"`

#### Methods

##### allowedMarks() {#allowedmarks}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="allowedmarks-1" href="#allowedmarks-1">allowedMarks</a>(`marks`: readonly [`Mark`](#mark)[]): readonly [`Mark`](#mark)[]</code>

</dt>

<dd>

Removes the marks that are not allowed in this node from the given set.

</dd>

</dl>

##### allowsMarks() {#allowsmarks}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="allowsmarks-1" href="#allowsmarks-1">allowsMarks</a>(`marks`: readonly [`Mark`](#mark)[]): `boolean`</code>

</dt>

<dd>

Test whether the given set of marks are allowed in this node.

</dd>

</dl>

##### allowsMarkType() {#allowsmarktype}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="allowsmarktype-1" href="#allowsmarktype-1">allowsMarkType</a>(`markType`: [`MarkType`](#marktype-1)): `boolean`</code>

</dt>

<dd>

Check whether the given mark type is allowed in this node.

</dd>

</dl>

##### compatibleContent() {#compatiblecontent}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="compatiblecontent-1" href="#compatiblecontent-1">compatibleContent</a>(`other`: [`NodeType`](#nodetype)): `boolean`</code>

</dt>

<dd>

Indicates whether this node allows some of the same content as
the given node type.

</dd>

</dl>

##### create() {#create-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="create-3" href="#create-3">create</a>(`attrs?`: `null` \| [`Attrs`](#attrs-7), `content?`: `null` \| [`ProseMirrorNode`](#prosemirrornode) \| [`ProseMirrorFragment`](#prosemirrorfragment) \| readonly [`ProseMirrorNode`](#prosemirrornode)[], `marks?`: readonly [`Mark`](#mark)[]): [`ProseMirrorNode`](#prosemirrornode)</code>

</dt>

<dd>

Create a `Node` of this type. The given attributes are
checked and defaulted (you can pass `null` to use the type's
defaults entirely, if no required attributes exist). `content`
may be a `Fragment`, a node, an array of nodes, or
`null`. Similarly `marks` may be `null` to default to the empty
set of marks.

</dd>

</dl>

##### createAndFill() {#createandfill}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="createandfill-1" href="#createandfill-1">createAndFill</a>(`attrs?`: `null` \| [`Attrs`](#attrs-7), `content?`: `null` \| [`ProseMirrorNode`](#prosemirrornode) \| [`ProseMirrorFragment`](#prosemirrorfragment) \| readonly [`ProseMirrorNode`](#prosemirrornode)[], `marks?`: readonly [`Mark`](#mark)[]): `null` \| [`ProseMirrorNode`](#prosemirrornode)</code>

</dt>

<dd>

Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but see if it is
necessary to add nodes to the start or end of the given fragment
to make it fit the node. If no fitting wrapping can be found,
return null. Note that, due to the fact that required nodes can
always be created, this will always succeed if you pass null or
`Fragment.empty` as content.

</dd>

</dl>

##### createChecked() {#createchecked}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="createchecked-1" href="#createchecked-1">createChecked</a>(`attrs?`: `null` \| [`Attrs`](#attrs-7), `content?`: `null` \| [`ProseMirrorNode`](#prosemirrornode) \| [`ProseMirrorFragment`](#prosemirrorfragment) \| readonly [`ProseMirrorNode`](#prosemirrornode)[], `marks?`: readonly [`Mark`](#mark)[]): [`ProseMirrorNode`](#prosemirrornode)</code>

</dt>

<dd>

Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
against the node type's content restrictions, and throw an error
if it doesn't match.

</dd>

</dl>

##### hasRequiredAttrs() {#hasrequiredattrs}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="hasrequiredattrs-1" href="#hasrequiredattrs-1">hasRequiredAttrs</a>(): `boolean`</code>

</dt>

<dd>

Tells you whether this node type has any required attributes.

</dd>

</dl>

##### isInGroup() {#isingroup}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="isingroup-1" href="#isingroup-1">isInGroup</a>(`group`: `string`): `boolean`</code>

</dt>

<dd>

Return true when this node type is part of the given
[group](https://prosemirror.net/docs/ref/#model.NodeSpec.group).

</dd>

</dl>

##### validContent() {#validcontent}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="validcontent-1" href="#validcontent-1">validContent</a>(`content`: [`ProseMirrorFragment`](#prosemirrorfragment)): `boolean`</code>

</dt>

<dd>

Returns true if the given fragment is valid content for this node
type.

</dd>

</dl>

***

### ProseMirrorFragment {#prosemirrorfragment}

A fragment represents a node's collection of child nodes.

Like nodes, fragments are persistent data structures, and you
should not mutate them or their content. Rather, you create new
instances whenever needed. The API tries to make this easy.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructorprosemirrorfragment" href="#constructorprosemirrorfragment">ProseMirrorFragment</a>(): [`ProseMirrorFragment`](#prosemirrorfragment)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="content" href="#content">content</a>: readonly [`ProseMirrorNode`](#prosemirrornode)[]</code>

</dt>

<dd>

The child nodes in this fragment.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="size" href="#size">size</a>: `number`</code>

</dt>

<dd>

The size of the fragment, which is the total of the size of
its content nodes.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="empty" href="#empty">empty</a>: [`ProseMirrorFragment`](#prosemirrorfragment)</code>

</dt>

<dd>

An empty fragment. Intended to be reused whenever a node doesn't
contain anything (rather than allocating a new empty fragment for
each leaf node).

</dd>

</dl>

#### Accessors

##### childCount {#childcount}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="childcountchildcount" href="#childcountchildcount">childCount</a>(): `number`</code>

The number of child nodes in this fragment.

###### Returns

`number`

##### firstChild {#firstchild}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="firstchildfirstchild" href="#firstchildfirstchild">firstChild</a>(): `null` \| [`ProseMirrorNode`](#prosemirrornode)</code>

The first child of the fragment, or `null` if it is empty.

###### Returns

`null` \| [`ProseMirrorNode`](#prosemirrornode)

##### lastChild {#lastchild}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="lastchildlastchild" href="#lastchildlastchild">lastChild</a>(): `null` \| [`ProseMirrorNode`](#prosemirrornode)</code>

The last child of the fragment, or `null` if it is empty.

###### Returns

`null` \| [`ProseMirrorNode`](#prosemirrornode)

#### Methods

##### addToEnd() {#addtoend}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="addtoend-1" href="#addtoend-1">addToEnd</a>(`node`: [`ProseMirrorNode`](#prosemirrornode)): [`ProseMirrorFragment`](#prosemirrorfragment)</code>

</dt>

<dd>

Create a new fragment by appending the given node to this
fragment.

</dd>

</dl>

##### addToStart() {#addtostart}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="addtostart-1" href="#addtostart-1">addToStart</a>(`node`: [`ProseMirrorNode`](#prosemirrornode)): [`ProseMirrorFragment`](#prosemirrorfragment)</code>

</dt>

<dd>

Create a new fragment by prepending the given node to this
fragment.

</dd>

</dl>

##### append() {#append}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="append-1" href="#append-1">append</a>(`other`: [`ProseMirrorFragment`](#prosemirrorfragment)): [`ProseMirrorFragment`](#prosemirrorfragment)</code>

</dt>

<dd>

Create a new fragment containing the combined content of this
fragment and the other.

</dd>

</dl>

##### child() {#child}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="child-1" href="#child-1">child</a>(`index`: `number`): [`ProseMirrorNode`](#prosemirrornode)</code>

</dt>

<dd>

Get the child node at the given index. Raise an error when the
index is out of range.

</dd>

</dl>

##### cut() {#cut}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="cut-1" href="#cut-1">cut</a>(`from`: `number`, `to?`: `number`): [`ProseMirrorFragment`](#prosemirrorfragment)</code>

</dt>

<dd>

Cut out the sub-fragment between the two given positions.

</dd>

</dl>

##### descendants() {#descendants}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="descendants-1" href="#descendants-1">descendants</a>(`f`: (`node`: [`ProseMirrorNode`](#prosemirrornode), `pos`: `number`, `parent`: `null` \| [`ProseMirrorNode`](#prosemirrornode), `index`: `number`) => `boolean` \| `void`): `void`</code>

</dt>

<dd>

Call the given callback for every descendant node. `pos` will be
relative to the start of the fragment. The callback may return
`false` to prevent traversal of a given node's children.

</dd>

</dl>

##### eq() {#eq-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="eq-3" href="#eq-3">eq</a>(`other`: [`ProseMirrorFragment`](#prosemirrorfragment)): `boolean`</code>

</dt>

<dd>

Compare this fragment to another one.

</dd>

</dl>

##### findDiffEnd() {#finddiffend}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="finddiffend-1" href="#finddiffend-1">findDiffEnd</a>(`other`: [`ProseMirrorFragment`](#prosemirrorfragment), `pos?`: `number`, `otherPos?`: `number`): `null` \| \{ `a`: `number`; `b`: `number`; \}</code>

</dt>

<dd>

Find the first position, searching from the end, at which this
fragment and the given fragment differ, or `null` if they are
the same. Since this position will not be the same in both
nodes, an object with two separate positions is returned.

</dd>

</dl>

##### findDiffStart() {#finddiffstart}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="finddiffstart-1" href="#finddiffstart-1">findDiffStart</a>(`other`: [`ProseMirrorFragment`](#prosemirrorfragment), `pos?`: `number`): `null` \| `number`</code>

</dt>

<dd>

Find the first position at which this fragment and another
fragment differ, or `null` if they are the same.

</dd>

</dl>

##### forEach() {#foreach}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="foreach-1" href="#foreach-1">forEach</a>(`f`: (`node`: [`ProseMirrorNode`](#prosemirrornode), `offset`: `number`, `index`: `number`) => `void`): `void`</code>

</dt>

<dd>

Call `f` for every child node, passing the node, its offset
into this parent node, and its index.

</dd>

</dl>

##### maybeChild() {#maybechild}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="maybechild-1" href="#maybechild-1">maybeChild</a>(`index`: `number`): `null` \| [`ProseMirrorNode`](#prosemirrornode)</code>

</dt>

<dd>

Get the child node at the given index, if it exists.

</dd>

</dl>

##### nodesBetween() {#nodesbetween}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="nodesbetween-1" href="#nodesbetween-1">nodesBetween</a>(`from`: `number`, `to`: `number`, `f`: (`node`: [`ProseMirrorNode`](#prosemirrornode), `start`: `number`, `parent`: `null` \| [`ProseMirrorNode`](#prosemirrornode), `index`: `number`) => `boolean` \| `void`, `nodeStart?`: `number`, `parent?`: [`ProseMirrorNode`](#prosemirrornode)): `void`</code>

</dt>

<dd>

Invoke a callback for all descendant nodes between the given two
positions (relative to start of this fragment). Doesn't descend
into a node when the callback returns `false`.

</dd>

</dl>

##### replaceChild() {#replacechild}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="replacechild-1" href="#replacechild-1">replaceChild</a>(`index`: `number`, `node`: [`ProseMirrorNode`](#prosemirrornode)): [`ProseMirrorFragment`](#prosemirrorfragment)</code>

</dt>

<dd>

Create a new fragment in which the node at the given index is
replaced by the given node.

</dd>

</dl>

##### textBetween() {#textbetween}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="textbetween-1" href="#textbetween-1">textBetween</a>(`from`: `number`, `to`: `number`, `blockSeparator?`: `null` \| `string`, `leafText?`: `null` \| `string` \| (`leafNode`: [`ProseMirrorNode`](#prosemirrornode)) => `string`): `string`</code>

</dt>

<dd>

Extract the text between `from` and `to`. See the same method on
[`Node`](https://prosemirror.net/docs/ref/#model.Node.textBetween).

</dd>

</dl>

##### toJSON() {#tojson-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="tojson-3" href="#tojson-3">toJSON</a>(): `any`</code>

</dt>

<dd>

Create a JSON-serializeable representation of this fragment.

</dd>

</dl>

##### toString() {#tostring}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="tostring-1" href="#tostring-1">toString</a>(): `string`</code>

</dt>

<dd>

Return a debugging string that describes this fragment.

</dd>

</dl>

##### from() {#from-1}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="from-2" href="#from-2">from</a>(`nodes?`: `null` \| [`ProseMirrorNode`](#prosemirrornode) \| [`ProseMirrorFragment`](#prosemirrorfragment) \| readonly [`ProseMirrorNode`](#prosemirrornode)[]): [`ProseMirrorFragment`](#prosemirrorfragment)</code>

</dt>

<dd>

Create a fragment from something that can be interpreted as a
set of nodes. For `null`, it returns the empty fragment. For a
fragment, the fragment itself. For a node or array of nodes, a
fragment containing those nodes.

</dd>

</dl>

##### fromArray() {#fromarray}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="fromarray-1" href="#fromarray-1">fromArray</a>(`array`: readonly [`ProseMirrorNode`](#prosemirrornode)[]): [`ProseMirrorFragment`](#prosemirrorfragment)</code>

</dt>

<dd>

Build a fragment from an array of nodes. Ensures that adjacent
text nodes with the same marks are joined together.

</dd>

</dl>

##### fromJSON() {#fromjson-2}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="fromjson-3" href="#fromjson-3">fromJSON</a>(`schema`: [`Schema`](#schema-3), `value`: `any`): [`ProseMirrorFragment`](#prosemirrorfragment)</code>

</dt>

<dd>

Deserialize a fragment from its JSON representation.

</dd>

</dl>

***

### ProseMirrorNode {#prosemirrornode}

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

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructorprosemirrornode" href="#constructorprosemirrornode">ProseMirrorNode</a>(): [`ProseMirrorNode`](#prosemirrornode)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="attrs-1" href="#attrs-1">attrs</a>: [`Attrs`](#attrs-7)</code>

</dt>

<dd>

An object mapping attribute names to values. The kind of
attributes allowed and required are
[determined](https://prosemirror.net/docs/ref/#model.NodeSpec.attrs) by the node type.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="content-1" href="#content-1">content</a>: [`ProseMirrorFragment`](#prosemirrorfragment)</code>

</dt>

<dd>

A container holding the node's children.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="marks-1" href="#marks-1">marks</a>: readonly [`Mark`](#mark)[]</code>

</dt>

<dd>

The marks (things like whether it is emphasized or part of a
link) applied to this node.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="text" href="#text">text</a>: `undefined` \| `string`</code>

</dt>

<dd>

For text nodes, this contains the node's text content.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="type-1" href="#type-1">type</a>: [`NodeType`](#nodetype)</code>

</dt>

<dd>

The type of node that this is.

</dd>

</dl>

#### Accessors

##### childCount {#childcount-1}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="childcountchildcount-1" href="#childcountchildcount-1">childCount</a>(): `number`</code>

The number of children that the node has.

###### Returns

`number`

##### children {#children}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="childrenchildren" href="#childrenchildren">children</a>(): readonly [`ProseMirrorNode`](#prosemirrornode)[]</code>

The array of this node's child nodes.

###### Returns

readonly [`ProseMirrorNode`](#prosemirrornode)[]

##### firstChild {#firstchild-1}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="firstchildfirstchild-1" href="#firstchildfirstchild-1">firstChild</a>(): `null` \| [`ProseMirrorNode`](#prosemirrornode)</code>

Returns this node's first child, or `null` if there are no
children.

###### Returns

`null` \| [`ProseMirrorNode`](#prosemirrornode)

##### inlineContent {#inlinecontent-1}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="inlinecontentinlinecontent" href="#inlinecontentinlinecontent">inlineContent</a>(): `boolean`</code>

True when this node allows inline content.

###### Returns

`boolean`

##### isAtom {#isatom-1}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="isatomisatom-1" href="#isatomisatom-1">isAtom</a>(): `boolean`</code>

True when this is an atom, i.e. when it does not have directly
editable content. This is usually the same as `isLeaf`, but can
be configured with the [`atom` property](https://prosemirror.net/docs/ref/#model.NodeSpec.atom)
on a node's spec (typically used when the node is displayed as
an uneditable [node view](https://prosemirror.net/docs/ref/#view.NodeView)).

###### Returns

`boolean`

##### isBlock {#isblock-1}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="isblockisblock" href="#isblockisblock">isBlock</a>(): `boolean`</code>

True when this is a block (non-inline node)

###### Returns

`boolean`

##### isInline {#isinline-1}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="isinlineisinline-1" href="#isinlineisinline-1">isInline</a>(): `boolean`</code>

True when this is an inline node (a text node or a node that can
appear among text).

###### Returns

`boolean`

##### isLeaf {#isleaf-1}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="isleafisleaf-1" href="#isleafisleaf-1">isLeaf</a>(): `boolean`</code>

True when this is a leaf node.

###### Returns

`boolean`

##### isText {#istext-1}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="istextistext" href="#istextistext">isText</a>(): `boolean`</code>

True when this is a text node.

###### Returns

`boolean`

##### isTextblock {#istextblock-1}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="istextblockistextblock-1" href="#istextblockistextblock-1">isTextblock</a>(): `boolean`</code>

True when this is a textblock node, a block node with inline
content.

###### Returns

`boolean`

##### lastChild {#lastchild-1}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="lastchildlastchild-1" href="#lastchildlastchild-1">lastChild</a>(): `null` \| [`ProseMirrorNode`](#prosemirrornode)</code>

Returns this node's last child, or `null` if there are no
children.

###### Returns

`null` \| [`ProseMirrorNode`](#prosemirrornode)

##### nodeSize {#nodesize}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="nodesizenodesize" href="#nodesizenodesize">nodeSize</a>(): `number`</code>

The size of this node, as defined by the integer-based [indexing
scheme](https://prosemirror.net/docs/guide/#doc.indexing). For text nodes, this is the
amount of characters. For other leaf nodes, it is one. For
non-leaf nodes, it is the size of the content plus two (the
start and end token).

###### Returns

`number`

##### textContent {#textcontent}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="textcontenttextcontent" href="#textcontenttextcontent">textContent</a>(): `string`</code>

Concatenates all the text nodes found in this fragment and its
children.

###### Returns

`string`

#### Methods

##### canAppend() {#canappend}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="canappend-1" href="#canappend-1">canAppend</a>(`other`: [`ProseMirrorNode`](#prosemirrornode)): `boolean`</code>

</dt>

<dd>

Test whether the given node's content could be appended to this
node. If that node is empty, this will only return true if there
is at least one node type that can appear in both nodes (to avoid
merging completely incompatible nodes).

</dd>

</dl>

##### canReplace() {#canreplace}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="canreplace-1" href="#canreplace-1">canReplace</a>(`from`: `number`, `to`: `number`, `replacement?`: [`ProseMirrorFragment`](#prosemirrorfragment), `start?`: `number`, `end?`: `number`): `boolean`</code>

</dt>

<dd>

Test whether replacing the range between `from` and `to` (by
child index) with the given replacement fragment (which defaults
to the empty fragment) would leave the node's content valid. You
can optionally pass `start` and `end` indices into the
replacement fragment.

</dd>

</dl>

##### canReplaceWith() {#canreplacewith}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="canreplacewith-1" href="#canreplacewith-1">canReplaceWith</a>(`from`: `number`, `to`: `number`, `type`: [`NodeType`](#nodetype), `marks?`: readonly [`Mark`](#mark)[]): `boolean`</code>

</dt>

<dd>

Test whether replacing the range `from` to `to` (by index) with
a node of the given type would leave the node's content valid.

</dd>

</dl>

##### check() {#check}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="check-1" href="#check-1">check</a>(): `void`</code>

</dt>

<dd>

Check whether this node and its descendants conform to the
schema, and raise an exception when they do not.

</dd>

</dl>

##### child() {#child-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="child-3" href="#child-3">child</a>(`index`: `number`): [`ProseMirrorNode`](#prosemirrornode)</code>

</dt>

<dd>

Get the child node at the given index. Raises an error when the
index is out of range.

</dd>

</dl>

##### childAfter() {#childafter}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="childafter-1" href="#childafter-1">childAfter</a>(`pos`: `number`): `object`</code>

</dt>

<dd>

Find the (direct) child node after the given offset, if any,
and return it along with its index and offset relative to this
node.

</dd>

</dl>

##### childBefore() {#childbefore}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="childbefore-1" href="#childbefore-1">childBefore</a>(`pos`: `number`): `object`</code>

</dt>

<dd>

Find the (direct) child node before the given offset, if any,
and return it along with its index and offset relative to this
node.

</dd>

</dl>

##### contentMatchAt() {#contentmatchat}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="contentmatchat-1" href="#contentmatchat-1">contentMatchAt</a>(`index`: `number`): [`ContentMatch`](#contentmatch)</code>

</dt>

<dd>

Get the content match in this node at the given index.

</dd>

</dl>

##### copy() {#copy}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="copy-1" href="#copy-1">copy</a>(`content?`: `null` \| [`ProseMirrorFragment`](#prosemirrorfragment)): [`ProseMirrorNode`](#prosemirrornode)</code>

</dt>

<dd>

Create a new node with the same markup as this node, containing
the given content (or empty, if no content is given).

</dd>

</dl>

##### cut() {#cut-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="cut-3" href="#cut-3">cut</a>(`from`: `number`, `to?`: `number`): [`ProseMirrorNode`](#prosemirrornode)</code>

</dt>

<dd>

Create a copy of this node with only the content between the
given positions. If `to` is not given, it defaults to the end of
the node.

</dd>

</dl>

##### descendants() {#descendants-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="descendants-3" href="#descendants-3">descendants</a>(`f`: (`node`: [`ProseMirrorNode`](#prosemirrornode), `pos`: `number`, `parent`: `null` \| [`ProseMirrorNode`](#prosemirrornode), `index`: `number`) => `boolean` \| `void`): `void`</code>

</dt>

<dd>

Call the given callback for every descendant node. Doesn't
descend into a node when the callback returns `false`.

</dd>

</dl>

##### eq() {#eq-4}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="eq-5" href="#eq-5">eq</a>(`other`: [`ProseMirrorNode`](#prosemirrornode)): `boolean`</code>

</dt>

<dd>

Test whether two nodes represent the same piece of document.

</dd>

</dl>

##### forEach() {#foreach-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="foreach-3" href="#foreach-3">forEach</a>(`f`: (`node`: [`ProseMirrorNode`](#prosemirrornode), `offset`: `number`, `index`: `number`) => `void`): `void`</code>

</dt>

<dd>

Call `f` for every child node, passing the node, its offset
into this parent node, and its index.

</dd>

</dl>

##### hasMarkup() {#hasmarkup}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="hasmarkup-1" href="#hasmarkup-1">hasMarkup</a>(`type`: [`NodeType`](#nodetype), `attrs?`: `null` \| [`Attrs`](#attrs-7), `marks?`: readonly [`Mark`](#mark)[]): `boolean`</code>

</dt>

<dd>

Check whether this node's markup correspond to the given type,
attributes, and marks.

</dd>

</dl>

##### mark() {#mark-1}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="mark-2" href="#mark-2">mark</a>(`marks`: readonly [`Mark`](#mark)[]): [`ProseMirrorNode`](#prosemirrornode)</code>

</dt>

<dd>

Create a copy of this node, with the given set of marks instead
of the node's own marks.

</dd>

</dl>

##### maybeChild() {#maybechild-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="maybechild-3" href="#maybechild-3">maybeChild</a>(`index`: `number`): `null` \| [`ProseMirrorNode`](#prosemirrornode)</code>

</dt>

<dd>

Get the child node at the given index, if it exists.

</dd>

</dl>

##### nodeAt() {#nodeat}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="nodeat-1" href="#nodeat-1">nodeAt</a>(`pos`: `number`): `null` \| [`ProseMirrorNode`](#prosemirrornode)</code>

</dt>

<dd>

Find the node directly after the given position.

</dd>

</dl>

##### nodesBetween() {#nodesbetween-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="nodesbetween-3" href="#nodesbetween-3">nodesBetween</a>(`from`: `number`, `to`: `number`, `f`: (`node`: [`ProseMirrorNode`](#prosemirrornode), `pos`: `number`, `parent`: `null` \| [`ProseMirrorNode`](#prosemirrornode), `index`: `number`) => `boolean` \| `void`, `startPos?`: `number`): `void`</code>

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

</dd>

</dl>

##### rangeHasMark() {#rangehasmark}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="rangehasmark-1" href="#rangehasmark-1">rangeHasMark</a>(`from`: `number`, `to`: `number`, `type`: [`MarkType`](#marktype-1) \| [`Mark`](#mark)): `boolean`</code>

</dt>

<dd>

Test whether a given mark or mark type occurs in this document
between the two given positions.

</dd>

</dl>

##### replace() {#replace}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="replace-1" href="#replace-1">replace</a>(`from`: `number`, `to`: `number`, `slice`: [`Slice`](#slice-2)): [`ProseMirrorNode`](#prosemirrornode)</code>

</dt>

<dd>

Replace the part of the document between the given positions with
the given slice. The slice must 'fit', meaning its open sides
must be able to connect to the surrounding content, and its
content nodes must be valid children for the node they are placed
into. If any of this is violated, an error of type
[`ReplaceError`](https://prosemirror.net/docs/ref/#model.ReplaceError) is thrown.

</dd>

</dl>

##### resolve() {#resolve}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="resolve-1" href="#resolve-1">resolve</a>(`pos`: `number`): [`ResolvedPos`](#resolvedpos)</code>

</dt>

<dd>

Resolve the given position in the document, returning an
[object](https://prosemirror.net/docs/ref/#model.ResolvedPos) with information about its context.

</dd>

</dl>

##### sameMarkup() {#samemarkup}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="samemarkup-1" href="#samemarkup-1">sameMarkup</a>(`other`: [`ProseMirrorNode`](#prosemirrornode)): `boolean`</code>

</dt>

<dd>

Compare the markup (type, attributes, and marks) of this node to
those of another. Returns `true` if both have the same markup.

</dd>

</dl>

##### slice() {#slice}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="slice-1" href="#slice-1">slice</a>(`from`: `number`, `to?`: `number`, `includeParents?`: `boolean`): [`Slice`](#slice-2)</code>

</dt>

<dd>

Cut out the part of the document between the given positions, and
return it as a `Slice` object.

</dd>

</dl>

##### textBetween() {#textbetween-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="textbetween-3" href="#textbetween-3">textBetween</a>(`from`: `number`, `to`: `number`, `blockSeparator?`: `null` \| `string`, `leafText?`: `null` \| `string` \| (`leafNode`: [`ProseMirrorNode`](#prosemirrornode)) => `string`): `string`</code>

</dt>

<dd>

Get all text between positions `from` and `to`. When
`blockSeparator` is given, it will be inserted to separate text
from different block nodes. If `leafText` is given, it'll be
inserted for every non-text leaf node encountered, otherwise
[`leafText`](https://prosemirror.net/docs/ref/#model.NodeSpec^leafText) will be used.

</dd>

</dl>

##### toJSON() {#tojson-4}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="tojson-5" href="#tojson-5">toJSON</a>(): `any`</code>

</dt>

<dd>

Return a JSON-serializeable representation of this node.

</dd>

</dl>

##### toString() {#tostring-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="tostring-3" href="#tostring-3">toString</a>(): `string`</code>

</dt>

<dd>

Return a string representation of this node for debugging
purposes.

</dd>

</dl>

##### fromJSON() {#fromjson-4}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="fromjson-5" href="#fromjson-5">fromJSON</a>(`schema`: [`Schema`](#schema-3), `json`: `any`): [`ProseMirrorNode`](#prosemirrornode)</code>

</dt>

<dd>

Deserialize a node from its JSON representation.

</dd>

</dl>

***

### ReplaceError {#replaceerror}

Error type raised by [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) when
given an invalid replacement.

#### Extends

- [`Error`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructorreplaceerror" href="#constructorreplaceerror">ReplaceError</a>(`message?`: `string`): [`ReplaceError`](#replaceerror)</code>

</dt>

<dd>

###### Inherited from

`Error.constructor`

</dd>

</dl>

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructorreplaceerror-1" href="#constructorreplaceerror-1">ReplaceError</a>(`message?`: `string`, `options?`: `ErrorOptions`): [`ReplaceError`](#replaceerror)</code>

</dt>

<dd>

###### Inherited from

`Error.constructor`

</dd>

</dl>

***

### ResolvedPos {#resolvedpos}

You can [_resolve_](https://prosemirror.net/docs/ref/#model.Node.resolve) a position to get more
information about it. Objects of this class represent such a
resolved position, providing various pieces of context
information, and some helper methods.

Throughout this interface, methods that take an optional `depth`
parameter will interpret undefined as `this.depth` and negative
numbers as `this.depth + value`.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructorresolvedpos" href="#constructorresolvedpos">ResolvedPos</a>(): [`ResolvedPos`](#resolvedpos)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="depth-1" href="#depth-1">depth</a>: `number`</code>

</dt>

<dd>

The number of levels the parent node is from the root. If this
position points directly into the root node, it is 0. If it
points into a top-level paragraph, 1, and so on.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="parentoffset" href="#parentoffset">parentOffset</a>: `number`</code>

</dt>

<dd>

The offset this position has into its parent node.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="pos" href="#pos">pos</a>: `number`</code>

</dt>

<dd>

The position that was resolved.

</dd>

</dl>

#### Accessors

##### doc {#doc}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="docdoc" href="#docdoc">doc</a>(): [`ProseMirrorNode`](#prosemirrornode)</code>

The root node in which the position was resolved.

###### Returns

[`ProseMirrorNode`](#prosemirrornode)

##### nodeAfter {#nodeafter}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="nodeafternodeafter" href="#nodeafternodeafter">nodeAfter</a>(): `null` \| [`ProseMirrorNode`](#prosemirrornode)</code>

Get the node directly after the position, if any. If the position
points into a text node, only the part of that node after the
position is returned.

###### Returns

`null` \| [`ProseMirrorNode`](#prosemirrornode)

##### nodeBefore {#nodebefore}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="nodebeforenodebefore" href="#nodebeforenodebefore">nodeBefore</a>(): `null` \| [`ProseMirrorNode`](#prosemirrornode)</code>

Get the node directly before the position, if any. If the
position points into a text node, only the part of that node
before the position is returned.

###### Returns

`null` \| [`ProseMirrorNode`](#prosemirrornode)

##### parent {#parent-1}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="parentparent-1" href="#parentparent-1">parent</a>(): [`ProseMirrorNode`](#prosemirrornode)</code>

The parent node that the position points into. Note that even if
a position points into a text node, that node is not considered
the parent—text nodes are ‘flat’ in this model, and have no content.

###### Returns

[`ProseMirrorNode`](#prosemirrornode)

##### textOffset {#textoffset}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="textoffsettextoffset" href="#textoffsettextoffset">textOffset</a>(): `number`</code>

When this position points into a text node, this returns the
distance between the position and the start of the text node.
Will be zero for positions that point between nodes.

###### Returns

`number`

#### Methods

##### after() {#after}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="after-1" href="#after-1">after</a>(`depth?`: `null` \| `number`): `number`</code>

</dt>

<dd>

The (absolute) position directly after the wrapping node at the
given level, or the original position when `depth` is `this.depth + 1`.

</dd>

</dl>

##### before() {#before}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="before-1" href="#before-1">before</a>(`depth?`: `null` \| `number`): `number`</code>

</dt>

<dd>

The (absolute) position directly before the wrapping node at the
given level, or, when `depth` is `this.depth + 1`, the original
position.

</dd>

</dl>

##### blockRange() {#blockrange}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="blockrange-1" href="#blockrange-1">blockRange</a>(`other?`: [`ResolvedPos`](#resolvedpos), `pred?`: (`node`: [`ProseMirrorNode`](#prosemirrornode)) => `boolean`): `null` \| [`NodeRange`](#noderange)</code>

</dt>

<dd>

Returns a range based on the place where this position and the
given position diverge around block content. If both point into
the same textblock, for example, a range around that textblock
will be returned. If they point into different blocks, the range
around those blocks in their shared ancestor is returned. You can
pass in an optional predicate that will be called with a parent
node to see if a range into that parent is acceptable.

</dd>

</dl>

##### end() {#end-1}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="end-2" href="#end-2">end</a>(`depth?`: `null` \| `number`): `number`</code>

</dt>

<dd>

The (absolute) position at the end of the node at the given
level.

</dd>

</dl>

##### index() {#index}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="index-1" href="#index-1">index</a>(`depth?`: `null` \| `number`): `number`</code>

</dt>

<dd>

The index into the ancestor at the given level. If this points
at the 3rd node in the 2nd paragraph on the top level, for
example, `p.index(0)` is 1 and `p.index(1)` is 2.

</dd>

</dl>

##### indexAfter() {#indexafter}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="indexafter-1" href="#indexafter-1">indexAfter</a>(`depth?`: `null` \| `number`): `number`</code>

</dt>

<dd>

The index pointing after this position into the ancestor at the
given level.

</dd>

</dl>

##### marks() {#marks-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="marks-3" href="#marks-3">marks</a>(): readonly [`Mark`](#mark)[]</code>

</dt>

<dd>

Get the marks at this position, factoring in the surrounding
marks' [`inclusive`](https://prosemirror.net/docs/ref/#model.MarkSpec.inclusive) property. If the
position is at the start of a non-empty node, the marks of the
node after it (if any) are returned.

</dd>

</dl>

##### marksAcross() {#marksacross}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="marksacross-1" href="#marksacross-1">marksAcross</a>(`$end`: [`ResolvedPos`](#resolvedpos)): `null` \| readonly [`Mark`](#mark)[]</code>

</dt>

<dd>

Get the marks after the current position, if any, except those
that are non-inclusive and not present at position `$end`. This
is mostly useful for getting the set of marks to preserve after a
deletion. Will return `null` if this position is at the end of
its parent node or its parent node isn't a textblock (in which
case no marks should be preserved).

</dd>

</dl>

##### max() {#max}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="max-1" href="#max-1">max</a>(`other`: [`ResolvedPos`](#resolvedpos)): [`ResolvedPos`](#resolvedpos)</code>

</dt>

<dd>

Return the greater of this and the given position.

</dd>

</dl>

##### min() {#min}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="min-1" href="#min-1">min</a>(`other`: [`ResolvedPos`](#resolvedpos)): [`ResolvedPos`](#resolvedpos)</code>

</dt>

<dd>

Return the smaller of this and the given position.

</dd>

</dl>

##### node() {#node}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="node-1" href="#node-1">node</a>(`depth?`: `null` \| `number`): [`ProseMirrorNode`](#prosemirrornode)</code>

</dt>

<dd>

The ancestor node at the given level. `p.node(p.depth)` is the
same as `p.parent`.

</dd>

</dl>

##### posAtIndex() {#posatindex}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="posatindex-1" href="#posatindex-1">posAtIndex</a>(`index`: `number`, `depth?`: `null` \| `number`): `number`</code>

</dt>

<dd>

Get the position at the given index in the parent node at the
given depth (which defaults to `this.depth`).

</dd>

</dl>

##### sameParent() {#sameparent}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="sameparent-1" href="#sameparent-1">sameParent</a>(`other`: [`ResolvedPos`](#resolvedpos)): `boolean`</code>

</dt>

<dd>

Query whether the given position shares the same parent node.

</dd>

</dl>

##### sharedDepth() {#shareddepth}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="shareddepth-1" href="#shareddepth-1">sharedDepth</a>(`pos`: `number`): `number`</code>

</dt>

<dd>

The depth up to which this position and the given (non-resolved)
position share the same parent nodes.

</dd>

</dl>

##### start() {#start-1}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="start-2" href="#start-2">start</a>(`depth?`: `null` \| `number`): `number`</code>

</dt>

<dd>

The (absolute) position at the start of the node at the given
level.

</dd>

</dl>

***

### Schema\<Nodes, Marks\> {#schema-3}

A document schema. Holds [node](https://prosemirror.net/docs/ref/#model.NodeType) and [mark
type](https://prosemirror.net/docs/ref/#model.MarkType) objects for the nodes and marks that may
occur in conforming documents, and provides functionality for
creating and deserializing such documents.

When given, the type parameters provide the names of the nodes and
marks in this schema.

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

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructorschema" href="#constructorschema">Schema</a>\<Nodes, Marks\>(`spec`: [`SchemaSpec`](#schemaspec-1)\<`Nodes`, `Marks`\>): [`Schema`](#schema-3)\<`Nodes`, `Marks`\></code>

</dt>

<dd>

Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="cached" href="#cached">cached</a>: `object`</code>

</dt>

<dd>

An object for storing whatever values modules may want to
compute and cache per schema. (If you want to store something
in it, try to use property names unlikely to clash.)

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="linebreakreplacement" href="#linebreakreplacement">linebreakReplacement</a>: `null` \| [`NodeType`](#nodetype)</code>

</dt>

<dd>

The [linebreak
replacement](https://prosemirror.net/docs/ref/#model.NodeSpec.linebreakReplacement) node defined
in this schema, if any.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="marks-5" href="#marks-5">marks</a>: `{ readonly [name in string]: MarkType }` & `object`</code>

</dt>

<dd>

A map from mark names to mark type objects.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="nodes-2" href="#nodes-2">nodes</a>: `{ readonly [name in string]: NodeType }` & `object`</code>

</dt>

<dd>

An object mapping the schema's node names to node type objects.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="spec-2" href="#spec-2">spec</a>: `object`</code>

</dt>

<dd>

The [spec](https://prosemirror.net/docs/ref/#model.SchemaSpec) on which the schema is based,
with the added guarantee that its `nodes` and `marks`
properties are
[`OrderedMap`](https://github.com/marijnh/orderedmap) instances
(not raw objects).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="topnodetype" href="#topnodetype">topNodeType</a>: [`NodeType`](#nodetype)</code>

</dt>

<dd>

The type of the [default top node](https://prosemirror.net/docs/ref/#model.SchemaSpec.topNode)
for this schema.

</dd>

</dl>

#### Methods

##### mark() {#mark-3}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="mark-4" href="#mark-4">mark</a>(`type`: `string` \| [`MarkType`](#marktype-1), `attrs?`: `null` \| [`Attrs`](#attrs-7)): [`Mark`](#mark)</code>

</dt>

<dd>

Create a mark with the given type and attributes.

</dd>

</dl>

##### markFromJSON() {#markfromjson-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="markfromjson-3" href="#markfromjson-3">markFromJSON</a>(`json`: `any`): [`Mark`](#mark)</code>

</dt>

<dd>

Deserialize a mark from its JSON representation. This method is
bound.

</dd>

</dl>

##### node() {#node-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="node-3" href="#node-3">node</a>(`type`: `string` \| [`NodeType`](#nodetype), `attrs?`: `null` \| [`Attrs`](#attrs-7), `content?`: [`ProseMirrorNode`](#prosemirrornode) \| [`ProseMirrorFragment`](#prosemirrorfragment) \| readonly [`ProseMirrorNode`](#prosemirrornode)[], `marks?`: readonly [`Mark`](#mark)[]): [`ProseMirrorNode`](#prosemirrornode)</code>

</dt>

<dd>

Create a node in this schema. The `type` may be a string or a
`NodeType` instance. Attributes will be extended with defaults,
`content` may be a `Fragment`, `null`, a `Node`, or an array of
nodes.

</dd>

</dl>

##### nodeFromJSON() {#nodefromjson}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="nodefromjson-1" href="#nodefromjson-1">nodeFromJSON</a>(`json`: `any`): [`ProseMirrorNode`](#prosemirrornode)</code>

</dt>

<dd>

Deserialize a node from its JSON representation. This method is
bound.

</dd>

</dl>

##### text() {#text-1}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="text-2" href="#text-2">text</a>(`text`: `string`, `marks?`: `null` \| readonly [`Mark`](#mark)[]): [`ProseMirrorNode`](#prosemirrornode)</code>

</dt>

<dd>

Create a text node in the schema. Empty text nodes are not
allowed.

</dd>

</dl>

***

### Slice {#slice-2}

A slice represents a piece cut out of a larger document. It
stores not only a fragment, but also the depth up to which nodes on
both side are ‘open’ (cut through).

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructorslice" href="#constructorslice">Slice</a>(`content`: [`ProseMirrorFragment`](#prosemirrorfragment), `openStart`: `number`, `openEnd`: `number`): [`Slice`](#slice-2)</code>

</dt>

<dd>

Create a slice. When specifying a non-zero open depth, you must
make sure that there are nodes of at least that depth at the
appropriate side of the fragment—i.e. if the fragment is an
empty paragraph node, `openStart` and `openEnd` can't be greater
than 1.

It is not necessary for the content of open nodes to conform to
the schema's content constraints, though it should be a valid
start/end/middle for such a node, depending on which sides are
open.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="content-2" href="#content-2">content</a>: [`ProseMirrorFragment`](#prosemirrorfragment)</code>

</dt>

<dd>

The slice's content.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="openend" href="#openend">openEnd</a>: `number`</code>

</dt>

<dd>

The open depth at the end.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="openstart" href="#openstart">openStart</a>: `number`</code>

</dt>

<dd>

The open depth at the start of the fragment.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="empty-1" href="#empty-1">empty</a>: [`Slice`](#slice-2)</code>

</dt>

<dd>

The empty slice.

</dd>

</dl>

#### Accessors

##### size {#size-1}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="sizesize" href="#sizesize">size</a>(): `number`</code>

The size this slice would add when inserted into a document.

###### Returns

`number`

#### Methods

##### eq() {#eq-6}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="eq-7" href="#eq-7">eq</a>(`other`: [`Slice`](#slice-2)): `boolean`</code>

</dt>

<dd>

Tests whether this slice is equal to another slice.

</dd>

</dl>

##### toJSON() {#tojson-6}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="tojson-7" href="#tojson-7">toJSON</a>(): `any`</code>

</dt>

<dd>

Convert a slice to a JSON-serializable representation.

</dd>

</dl>

##### fromJSON() {#fromjson-6}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="fromjson-7" href="#fromjson-7">fromJSON</a>(`schema`: [`Schema`](#schema-3), `json`: `any`): [`Slice`](#slice-2)</code>

</dt>

<dd>

Deserialize a slice from its JSON representation.

</dd>

</dl>

##### maxOpen() {#maxopen}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="maxopen-1" href="#maxopen-1">maxOpen</a>(`fragment`: [`ProseMirrorFragment`](#prosemirrorfragment), `openIsolating?`: `boolean`): [`Slice`](#slice-2)</code>

</dt>

<dd>

Create a slice from a fragment by taking the maximum possible
open value on both side of the fragment.

</dd>

</dl>

## Interfaces

### AttributeSpec {#attributespec}

Used to [define](https://prosemirror.net/docs/ref/#model.NodeSpec.attrs) attributes on nodes or
marks.

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="default" href="#default">default</a><i>?</i>: `any`</code>

</dt>

<dd>

The default value for this attribute, to use when no explicit
value is provided. Attributes that have no default must be
provided whenever a node or mark of a type that has them is
created.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="splittable" href="#splittable">splittable</a><i>?</i>: `boolean`</code>

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

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="validate" href="#validate">validate</a><i>?</i>: `string` \| (`value`: `any`) => `void`</code>

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

***

### GenericParseRule {#genericparserule}

Fields that may be present in both [tag](https://prosemirror.net/docs/ref/#model.TagParseRule) and
[style](https://prosemirror.net/docs/ref/#model.StyleParseRule) parse rules.

#### Extended by

- [`StyleParseRule`](#styleparserule)
- [`TagParseRule`](#tagparserule)

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="attrs-2" href="#attrs-2">attrs</a><i>?</i>: [`Attrs`](#attrs-7)</code>

</dt>

<dd>

Attributes for the node or mark created by this rule. When
`getAttrs` is provided, it takes precedence.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="closeparent" href="#closeparent">closeParent</a><i>?</i>: `boolean`</code>

</dt>

<dd>

When true, finding an element that matches this rule will close
the current node.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="consuming" href="#consuming">consuming</a><i>?</i>: `boolean`</code>

</dt>

<dd>

By default, when a rule matches an element or style, no further
rules get a chance to match it. By setting this to `false`, you
indicate that even when this rule matches, other rules that come
after it should also run.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="context" href="#context">context</a><i>?</i>: `string`</code>

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

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="ignore" href="#ignore">ignore</a><i>?</i>: `boolean`</code>

</dt>

<dd>

When true, ignore content that matches this rule.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="mark-5" href="#mark-5">mark</a><i>?</i>: `string`</code>

</dt>

<dd>

The name of the mark type to wrap the matched content in.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="priority" href="#priority">priority</a><i>?</i>: `number`</code>

</dt>

<dd>

Can be used to change the order in which the parse rules in a
schema are tried. Those with higher priority come first. Rules
without a priority are counted as having priority 50. This
property is only meaningful in a schema—when directly
constructing a parser, the order of the rule array is used.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="skip" href="#skip">skip</a><i>?</i>: `boolean`</code>

</dt>

<dd>

When true, ignore the node that matches this rule, but do parse
its content.

</dd>

</dl>

***

### MarkSpec {#markspec}

Used to define marks when creating a schema.

#### Extended by

- [`MarkSpecOptions`](../core.md#markspecoptions)

#### Indexable

\[`key`: `string`\]: `any`

Mark specs can include additional properties that can be
inspected through [`MarkType.spec`](https://prosemirror.net/docs/ref/#model.MarkType.spec) when
working with the mark.

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="attrs-3" href="#attrs-3">attrs</a><i>?</i>: `object`</code>

</dt>

<dd>

The attributes that marks of this type get.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="code" href="#code">code</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Marks the content of this span as being code, which causes some
commands and extensions to treat it differently.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="excludes-2" href="#excludes-2">excludes</a><i>?</i>: `string`</code>

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

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="group" href="#group">group</a><i>?</i>: `string`</code>

</dt>

<dd>

The group or space-separated groups to which this mark belongs.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="inclusive" href="#inclusive">inclusive</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether this mark should be active when the cursor is positioned
at its end (or at its start when that is also the start of the
parent node). Defaults to true.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="parsedom" href="#parsedom">parseDOM</a><i>?</i>: readonly [`ParseRule`](#parserule)[]</code>

</dt>

<dd>

Associates DOM parser information with this mark (see the
corresponding [node spec field](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM)). The
`mark` field in the rules is implied.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="spanning" href="#spanning">spanning</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Determines whether marks of this type can span multiple adjacent
nodes when serialized to DOM/HTML. Defaults to true.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="todom" href="#todom">toDOM</a><i>?</i>: (`mark`: [`Mark`](#mark), `inline`: `boolean`) => [`DOMOutputSpec`](#domoutputspec)</code>

</dt>

<dd>

Defines the default way marks of this type should be serialized
to DOM/HTML. When the resulting spec contains a hole, that is
where the marked content is placed. Otherwise, it is appended to
the top node.

</dd>

</dl>

***

### NodeSpec {#nodespec}

A description of a node type, used when defining a schema.

#### Extended by

- [`NodeSpecOptions`](../core.md#nodespecoptions)

#### Indexable

\[`key`: `string`\]: `any`

Node specs may include arbitrary properties that can be read by
other code via [`NodeType.spec`](https://prosemirror.net/docs/ref/#model.NodeType.spec).

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="atom" href="#atom">atom</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Can be set to true to indicate that, though this isn't a [leaf
node](https://prosemirror.net/docs/ref/#model.NodeType.isLeaf), it doesn't have directly editable
content and should be treated as a single unit in the view.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="attrs-4" href="#attrs-4">attrs</a><i>?</i>: `object`</code>

</dt>

<dd>

The attributes that nodes of this type get.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="code-1" href="#code-1">code</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Can be used to indicate that this node contains code, which
causes some commands to behave differently.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="content-3" href="#content-3">content</a><i>?</i>: `string`</code>

</dt>

<dd>

The content expression for this node, as described in the [schema
guide](https://prosemirror.net/docs/guide/#schema.content_expressions). When not given,
the node does not allow any content.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="defining" href="#defining">defining</a><i>?</i>: `boolean`</code>

</dt>

<dd>

When enabled, enables both
[`definingAsContext`](https://prosemirror.net/docs/ref/#model.NodeSpec.definingAsContext) and
[`definingForContent`](https://prosemirror.net/docs/ref/#model.NodeSpec.definingForContent).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="definingascontext" href="#definingascontext">definingAsContext</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Determines whether this node is considered an important parent
node during replace operations (such as paste). Non-defining (the
default) nodes get dropped when their entire content is replaced,
whereas defining nodes persist and wrap the inserted content.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="definingforcontent" href="#definingforcontent">definingForContent</a><i>?</i>: `boolean`</code>

</dt>

<dd>

In inserted content the defining parents of the content are
preserved when possible. Typically, non-default-paragraph
textblock types, and possibly list items, are marked as defining.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="disabledropcursor" href="#disabledropcursor">disableDropCursor</a><i>?</i>: `boolean` \| (`view`: [`EditorView`](view.md#editorview), `pos`: `object`, `event`: [`DragEvent`](https://developer.mozilla.org/docs/Web/API/DragEvent)) => `boolean`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="draggable" href="#draggable">draggable</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Determines whether nodes of this type can be dragged without
being selected. Defaults to false.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="group-1" href="#group-1">group</a><i>?</i>: `string`</code>

</dt>

<dd>

The group or space-separated groups to which this node belongs,
which can be referred to in the content expressions for the
schema.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="inline" href="#inline">inline</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Should be set to true for inline nodes. (Implied for text nodes.)

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="isolating" href="#isolating">isolating</a><i>?</i>: `boolean`</code>

</dt>

<dd>

When enabled (default is false), the sides of nodes of this type
count as boundaries that regular editing operations, like
backspacing or lifting, won't cross. An example of a node that
should probably have this enabled is a table cell.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="leaftext" href="#leaftext">leafText</a><i>?</i>: (`node`: [`ProseMirrorNode`](#prosemirrornode)) => `string`</code>

</dt>

<dd>

Defines the default way a [leaf node](https://prosemirror.net/docs/ref/#model.NodeType.isLeaf) of
this type should be serialized to a string (as used by
[`Node.textBetween`](https://prosemirror.net/docs/ref/#model.Node^textBetween) and
[`Node.textContent`](https://prosemirror.net/docs/ref/#model.Node^textContent)).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="linebreakreplacement-1" href="#linebreakreplacement-1">linebreakReplacement</a><i>?</i>: `boolean`</code>

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

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="marks-6" href="#marks-6">marks</a><i>?</i>: `string`</code>

</dt>

<dd>

The marks that are allowed inside of this node. May be a
space-separated string referring to mark names or groups, `"_"`
to explicitly allow all marks, or `""` to disallow marks. When
not given, nodes with inline content default to allowing all
marks, other nodes default to not allowing marks.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="parsedom-1" href="#parsedom-1">parseDOM</a><i>?</i>: readonly [`TagParseRule`](#tagparserule)[]</code>

</dt>

<dd>

Associates DOM parser information with this node, which can be
used by [`DOMParser.fromSchema`](https://prosemirror.net/docs/ref/#model.DOMParser^fromSchema) to
automatically derive a parser. The `node` field in the rules is
implied (the name of this node will be filled in automatically).
If you supply your own parser, you do not need to also specify
parsing rules in your schema.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="selectable" href="#selectable">selectable</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Controls whether nodes of this type can be selected as a [node
selection](https://prosemirror.net/docs/ref/#state.NodeSelection). Defaults to true for non-text
nodes.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="todebugstring" href="#todebugstring">toDebugString</a><i>?</i>: (`node`: [`ProseMirrorNode`](#prosemirrornode)) => `string`</code>

</dt>

<dd>

Defines the default way a node of this type should be serialized
to a string representation for debugging (e.g. in error messages).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="todom-1" href="#todom-1">toDOM</a><i>?</i>: (`node`: [`ProseMirrorNode`](#prosemirrornode)) => [`DOMOutputSpec`](#domoutputspec)</code>

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

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="whitespace-1" href="#whitespace-1">whitespace</a><i>?</i>: `"pre"` \| `"normal"`</code>

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

***

### ParseOptions {#parseoptions}

These are the options recognized by the
[`parse`](https://prosemirror.net/docs/ref/#model.DOMParser.parse) and
[`parseSlice`](https://prosemirror.net/docs/ref/#model.DOMParser.parseSlice) methods.

#### Extended by

- [`DOMParserOptions`](../core.md#domparseroptions)

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="context-1" href="#context-1">context</a><i>?</i>: [`ResolvedPos`](#resolvedpos)</code>

</dt>

<dd>

A set of additional nodes to count as
[context](https://prosemirror.net/docs/ref/#model.ParseRule.context) when parsing, above the
given [top node](https://prosemirror.net/docs/ref/#model.ParseOptions.topNode).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="findpositions" href="#findpositions">findPositions</a><i>?</i>: `object`[]</code>

</dt>

<dd>

When given, the parser will, beside parsing the content,
record the document positions of the given DOM positions. It
will do so by writing to the objects, adding a `pos` property
that holds the document position. DOM positions that are not
in the parsed content will not be written to.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="from-3" href="#from-3">from</a><i>?</i>: `number`</code>

</dt>

<dd>

The child node index to start parsing from.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="preservewhitespace" href="#preservewhitespace">preserveWhitespace</a><i>?</i>: `boolean` \| `"full"`</code>

</dt>

<dd>

By default, whitespace is collapsed as per HTML's rules. Pass
`true` to preserve whitespace, but normalize newlines to
spaces, and `"full"` to preserve whitespace entirely.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="to-1" href="#to-1">to</a><i>?</i>: `number`</code>

</dt>

<dd>

The child node index to stop parsing at.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="topmatch" href="#topmatch">topMatch</a><i>?</i>: [`ContentMatch`](#contentmatch)</code>

</dt>

<dd>

Provide the starting content match that content parsed into the
top node is matched against.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="topnode" href="#topnode">topNode</a><i>?</i>: [`ProseMirrorNode`](#prosemirrornode)</code>

</dt>

<dd>

By default, the content is parsed into the schema's default
[top node type](https://prosemirror.net/docs/ref/#model.Schema.topNodeType). You can pass this
option to use the type and attributes from a different node
as the top container.

</dd>

</dl>

***

### SchemaSpec\<Nodes, Marks\> {#schemaspec-1}

An object describing a schema, as passed to the [`Schema`](https://prosemirror.net/docs/ref/#model.Schema)
constructor.

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

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="marks-8" href="#marks-8">marks</a><i>?</i>: `{ [name in string]: MarkSpec }` \| `OrderedMap`\<[`MarkSpec`](#markspec)\></code>

</dt>

<dd>

The mark types that exist in this schema. The order in which they
are provided determines the order in which [mark
sets](https://prosemirror.net/docs/ref/#model.Mark.addToSet) are sorted and in which [parse
rules](https://prosemirror.net/docs/ref/#model.MarkSpec.parseDOM) are tried.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="nodes-4" href="#nodes-4">nodes</a>: `{ [name in string]: NodeSpec }` \| `OrderedMap`\<[`NodeSpec`](#nodespec)\></code>

</dt>

<dd>

The node types in this schema. Maps names to
[`NodeSpec`](https://prosemirror.net/docs/ref/#model.NodeSpec) objects that describe the node type
associated with that name. Their order is significant—it
determines which [parse rules](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM) take
precedence by default, and which nodes come first in a given
[group](https://prosemirror.net/docs/ref/#model.NodeSpec.group).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="topnode-1" href="#topnode-1">topNode</a><i>?</i>: `string`</code>

</dt>

<dd>

The name of the default top-level node for the schema. Defaults
to `"doc"`.

</dd>

</dl>

***

### StyleParseRule {#styleparserule}

A parse rule targeting a style property.

#### Extends

- [`GenericParseRule`](#genericparserule)

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="attrs-5" href="#attrs-5">attrs</a><i>?</i>: [`Attrs`](#attrs-7)</code>

</dt>

<dd>

Attributes for the node or mark created by this rule. When
`getAttrs` is provided, it takes precedence.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="clearmark" href="#clearmark">clearMark</a><i>?</i>: (`mark`: [`Mark`](#mark)) => `boolean`</code>

</dt>

<dd>

Style rules can remove marks from the set of active marks.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="closeparent-1" href="#closeparent-1">closeParent</a><i>?</i>: `boolean`</code>

</dt>

<dd>

When true, finding an element that matches this rule will close
the current node.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="consuming-1" href="#consuming-1">consuming</a><i>?</i>: `boolean`</code>

</dt>

<dd>

By default, when a rule matches an element or style, no further
rules get a chance to match it. By setting this to `false`, you
indicate that even when this rule matches, other rules that come
after it should also run.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="context-2" href="#context-2">context</a><i>?</i>: `string`</code>

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

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="getattrs" href="#getattrs">getAttrs</a><i>?</i>: (`node`: `string`) => `null` \| `false` \| [`Attrs`](#attrs-7)</code>

</dt>

<dd>

A function used to compute the attributes for the node or mark
created by this rule. Called with the style's value.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="ignore-1" href="#ignore-1">ignore</a><i>?</i>: `boolean`</code>

</dt>

<dd>

When true, ignore content that matches this rule.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="mark-6" href="#mark-6">mark</a><i>?</i>: `string`</code>

</dt>

<dd>

The name of the mark type to wrap the matched content in.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="priority-1" href="#priority-1">priority</a><i>?</i>: `number`</code>

</dt>

<dd>

Can be used to change the order in which the parse rules in a
schema are tried. Those with higher priority come first. Rules
without a priority are counted as having priority 50. This
property is only meaningful in a schema—when directly
constructing a parser, the order of the rule array is used.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="skip-1" href="#skip-1">skip</a><i>?</i>: `boolean`</code>

</dt>

<dd>

When true, ignore the node that matches this rule, but do parse
its content.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="style" href="#style">style</a>: `string`</code>

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

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="tag" href="#tag">tag</a><i>?</i>: `undefined`</code>

</dt>

<dd>

Given to make TS see ParseRule as a tagged union

###### Hide

</dd>

</dl>

***

### TagParseRule {#tagparserule}

Parse rule targeting a DOM element.

#### Extends

- [`GenericParseRule`](#genericparserule)

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="attrs-6" href="#attrs-6">attrs</a><i>?</i>: [`Attrs`](#attrs-7)</code>

</dt>

<dd>

Attributes for the node or mark created by this rule. When
`getAttrs` is provided, it takes precedence.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="closeparent-2" href="#closeparent-2">closeParent</a><i>?</i>: `boolean`</code>

</dt>

<dd>

When true, finding an element that matches this rule will close
the current node.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="consuming-2" href="#consuming-2">consuming</a><i>?</i>: `boolean`</code>

</dt>

<dd>

By default, when a rule matches an element or style, no further
rules get a chance to match it. By setting this to `false`, you
indicate that even when this rule matches, other rules that come
after it should also run.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="contentelement" href="#contentelement">contentElement</a><i>?</i>: `string` \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement) \| (`node`: [`Node`](https://developer.mozilla.org/docs/Web/API/Node)) => [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)</code>

</dt>

<dd>

For rules that produce non-leaf nodes, by default the content of
the DOM element is parsed as content of the node. If the child
nodes are in a descendent node, this may be a CSS selector
string that the parser must use to find the actual content
element, or a function that returns the actual content element
to the parser.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="context-3" href="#context-3">context</a><i>?</i>: `string`</code>

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

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="getattrs-1" href="#getattrs-1">getAttrs</a><i>?</i>: (`node`: [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)) => `null` \| `false` \| [`Attrs`](#attrs-7)</code>

</dt>

<dd>

A function used to compute the attributes for the node or mark
created by this rule. Can also be used to describe further
conditions the DOM element or style must match. When it returns
`false`, the rule won't match. When it returns null or undefined,
that is interpreted as an empty/default set of attributes.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="getcontent" href="#getcontent">getContent</a><i>?</i>: (`node`: [`Node`](https://developer.mozilla.org/docs/Web/API/Node), `schema`: [`Schema`](#schema-3)) => [`ProseMirrorFragment`](#prosemirrorfragment)</code>

</dt>

<dd>

Can be used to override the content of a matched node. When
present, instead of parsing the node's child nodes, the result of
this function is used.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="ignore-2" href="#ignore-2">ignore</a><i>?</i>: `boolean`</code>

</dt>

<dd>

When true, ignore content that matches this rule.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="mark-7" href="#mark-7">mark</a><i>?</i>: `string`</code>

</dt>

<dd>

The name of the mark type to wrap the matched content in.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="namespace" href="#namespace">namespace</a><i>?</i>: `string`</code>

</dt>

<dd>

The namespace to match. Nodes are only matched when the
namespace matches or this property is null.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="node-4" href="#node-4">node</a><i>?</i>: `string`</code>

</dt>

<dd>

The name of the node type to create when this rule matches. Each
rule should have either a `node`, `mark`, or `ignore` property
(except when it appears in a [node](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM) or
[mark spec](https://prosemirror.net/docs/ref/#model.MarkSpec.parseDOM), in which case the `node`
or `mark` property will be derived from its position).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="preservewhitespace-1" href="#preservewhitespace-1">preserveWhitespace</a><i>?</i>: `boolean` \| `"full"`</code>

</dt>

<dd>

Controls whether whitespace should be preserved when parsing the
content inside the matched element. `false` means whitespace may
be collapsed, `true` means that whitespace should be preserved
but newlines normalized to spaces, and `"full"` means that
newlines should also be preserved.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="priority-2" href="#priority-2">priority</a><i>?</i>: `number`</code>

</dt>

<dd>

Can be used to change the order in which the parse rules in a
schema are tried. Those with higher priority come first. Rules
without a priority are counted as having priority 50. This
property is only meaningful in a schema—when directly
constructing a parser, the order of the rule array is used.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="skip-2" href="#skip-2">skip</a><i>?</i>: `boolean`</code>

</dt>

<dd>

When true, ignore the node that matches this rule, but do parse
its content.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="tag-1" href="#tag-1">tag</a>: `string`</code>

</dt>

<dd>

A CSS selector describing the kind of DOM elements to match.

</dd>

</dl>

## Type Aliases

### Attrs {#attrs-7}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="attrs-7" href="#attrs-7">Attrs</a> = `object`</code>

</dt>

<dd>

An object holding the attributes of a node.

</dd>

</dl>

***

### DOMOutputSpec {#domoutputspec}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="domoutputspec" href="#domoutputspec">DOMOutputSpec</a> = `string` \| [`DOMNode`](https://prosemirror.net/docs/ref/#model.DOMNode) \| \{ `contentDOM?`: [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement); `dom`: [`DOMNode`](https://prosemirror.net/docs/ref/#model.DOMNode); \} \| readonly \[`string`, `...any[]`\]</code>

</dt>

<dd>

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

</dd>

</dl>

***

### ParseRule {#parserule}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="parserule" href="#parserule">ParseRule</a> = [`TagParseRule`](#tagparserule) \| [`StyleParseRule`](#styleparserule)</code>

</dt>

<dd>

A value that describes how to parse a given DOM node or inline
style as a ProseMirror node or mark.

</dd>

</dl>

## References

### Fragment {#fragment}

Renames and re-exports [ProseMirrorFragment](#prosemirrorfragment)

***

### Node {#node-5}

Renames and re-exports [ProseMirrorNode](#prosemirrornode)
