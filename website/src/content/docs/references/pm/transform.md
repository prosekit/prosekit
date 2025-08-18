---
title: prosekit/pm/transform
sidebar:
  label: pm/transform
---

Re-exports from [prosemirror-transform](https://github.com/ProseMirror/prosemirror-transform).

## Classes

### MapResult {#mapresult-1}

An object representing a mapped position with extra
information.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor" href="#constructor">MapResult</a>(): [`MapResult`](#mapresult-1)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="pos" href="#pos">pos</a>: `number`</code>

</dt>

<dd>

The mapped version of the position.

</dd>

</dl>

#### Accessors

<dl>

<dt>

<code data-typedoc-code>get <a id="deleted" href="#deleted">deleted</a>(): `boolean`</code>

</dt>

<dd>

Tells you whether the position was deleted, that is, whether the
step removed the token on the side queried (via the `assoc`)
argument from the document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="deletedbefore" href="#deletedbefore">deletedBefore</a>(): `boolean`</code>

</dt>

<dd>

Tells you whether the token before the mapped position was deleted.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="deletedafter" href="#deletedafter">deletedAfter</a>(): `boolean`</code>

</dt>

<dd>

True when the token after the mapped position was deleted.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <a id="deletedacross" href="#deletedacross">deletedAcross</a>(): `boolean`</code>

</dt>

<dd>

Tells whether any of the steps mapped through deletes across the
position (including both the token before and after the
position).

</dd>

</dl>

***

### StepMap {#stepmap}

A map describing the deletions and insertions made by a step, which
can be used to find the correspondence between positions in the
pre-step version of a document and the same position in the
post-step version.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-1" href="#constructor-1">StepMap</a>(): [`StepMap`](#stepmap)</code>

</dt>

<dd>

Create a position map. The modifications to the document are
represented as an array of numbers, in which each group of three
represents a modified chunk as `[start, oldSize, newSize]`.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="empty" href="#empty">empty</a>: [`StepMap`](#stepmap)</code>

</dt>

<dd>

A StepMap that contains no changed ranges.

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="mapresult-2" href="#mapresult-2">mapResult</a>(`pos`: `number`, `assoc?`: `number`): [`MapResult`](#mapresult-1)</code>

</dt>

<dd>

Map a position, and return an object containing additional
information about the mapping. The result's `deleted` field tells
you whether the position was deleted (completely enclosed in a
replaced range) during the mapping. When content on only one side
is deleted, the position itself is only considered deleted when
`assoc` points in the direction of the deleted content.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="map-1" href="#map-1">map</a>(`pos`: `number`, `assoc?`: `number`): `number`</code>

</dt>

<dd>

Map a position through this object. When given, `assoc` (should
be -1 or 1, defaults to 1) determines with which side the
position is associated, which determines in which direction to
move when a chunk of content is inserted at the mapped position.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="foreach" href="#foreach">forEach</a>(`f`: (`oldStart`: `number`, `oldEnd`: `number`, `newStart`: `number`, `newEnd`: `number`) => `void`): `void`</code>

</dt>

<dd>

Calls the given function on each of the changed ranges included in
this map.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="invert" href="#invert">invert</a>(): [`StepMap`](#stepmap)</code>

</dt>

<dd>

Create an inverted version of this map. The result can be used to
map positions in the post-step document to the pre-step document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="offset" href="#offset">offset</a>(`n`: `number`): [`StepMap`](#stepmap)</code>

</dt>

<dd>

Create a map that moves all positions by offset `n` (which may be
negative). This can be useful when applying steps meant for a
sub-document to a larger document, or vice-versa.

</dd>

</dl>

***

### Mapping {#mapping}

A mapping represents a pipeline of zero or more [step
maps](https://prosemirror.net/docs/ref/#transform.StepMap). It has special provisions for losslessly
handling mapping positions through a series of steps in which some
steps are inverted versions of earlier steps. (This comes up when
‘[rebasing](https://prosemirror.net/docs/guide/#transform.rebasing)’ steps for
collaboration or history management.)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-2" href="#constructor-2">Mapping</a>(`maps?`: readonly [`StepMap`](#stepmap)[], `from?`: `number`, `to?`: `number`): [`Mapping`](#mapping)</code>

</dt>

<dd>

Create a new mapping with the given position maps.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="from" href="#from">from</a>: `number`</code>

</dt>

<dd>

The starting position in the `maps` array, used when `map` or
`mapResult` is called.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="to" href="#to">to</a>: `number`</code>

</dt>

<dd>

The end position in the `maps` array.

</dd>

</dl>

#### Accessors

<dl>

<dt>

<code data-typedoc-code>get <a id="maps" href="#maps">maps</a>(): readonly [`StepMap`](#stepmap)[]</code>

</dt>

<dd>

The step maps in this mapping.

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="slice" href="#slice">slice</a>(`from?`: `number`, `to?`: `number`): [`Mapping`](#mapping)</code>

</dt>

<dd>

Create a mapping that maps only through a part of this one.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="appendmap" href="#appendmap">appendMap</a>(`map`: [`StepMap`](#stepmap), `mirrors?`: `number`): `void`</code>

</dt>

<dd>

Add a step map to the end of this mapping. If `mirrors` is
given, it should be the index of the step map that is the mirror
image of this one.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="appendmapping" href="#appendmapping">appendMapping</a>(`mapping`: [`Mapping`](#mapping)): `void`</code>

</dt>

<dd>

Add all the step maps in a given mapping to this one (preserving
mirroring information).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="getmirror" href="#getmirror">getMirror</a>(`n`: `number`): `undefined` \| `number`</code>

</dt>

<dd>

Finds the offset of the step map that mirrors the map at the
given offset, in this mapping (as per the second argument to
`appendMap`).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="appendmappinginverted" href="#appendmappinginverted">appendMappingInverted</a>(`mapping`: [`Mapping`](#mapping)): `void`</code>

</dt>

<dd>

Append the inverse of the given mapping to this one.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="invert-2" href="#invert-2">invert</a>(): [`Mapping`](#mapping)</code>

</dt>

<dd>

Create an inverted version of this mapping.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="map-3" href="#map-3">map</a>(`pos`: `number`, `assoc?`: `number`): `number`</code>

</dt>

<dd>

Map a position through this mapping.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="mapresult-4" href="#mapresult-4">mapResult</a>(`pos`: `number`, `assoc?`: `number`): [`MapResult`](#mapresult-1)</code>

</dt>

<dd>

Map a position through this mapping, returning a mapping
result.

</dd>

</dl>

***

### abstract Step {#step}

A step object represents an atomic change. It generally applies
only to the document it was created for, since the positions
stored in it will only make sense for that document.

New steps are defined by creating classes that extend `Step`,
overriding the `apply`, `invert`, `map`, `getMap` and `fromJSON`
methods, and registering your class with a unique
JSON-serialization identifier using
[`Step.jsonID`](https://prosemirror.net/docs/ref/#transform.Step^jsonID).

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-3" href="#constructor-3">Step</a>(): [`Step`](#step)</code>

</dt>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="fromjson" href="#fromjson">fromJSON</a>(`schema`: [`Schema`](model.md#schema-3), `json`: `any`): [`Step`](#step)</code>

</dt>

<dd>

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="jsonid" href="#jsonid">jsonID</a>(`id`: `string`, `stepClass`: `object`): `object`</code>

</dt>

<dd>

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>abstract</i> <a id="apply" href="#apply">apply</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`StepResult`](#stepresult)</code>

</dt>

<dd>

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="getmap" href="#getmap">getMap</a>(): [`StepMap`](#stepmap)</code>

</dt>

<dd>

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>abstract</i> <a id="invert-4" href="#invert-4">invert</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`Step`](#step)</code>

</dt>

<dd>

Create an inverted version of this step. Needs the document as it
was before the step as argument.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>abstract</i> <a id="map-5" href="#map-5">map</a>(`mapping`: [`Mappable`](#mappable)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="merge" href="#merge">merge</a>(`other`: [`Step`](#step)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>abstract</i> <a id="tojson" href="#tojson">toJSON</a>(): `any`</code>

</dt>

<dd>

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

</dd>

</dl>

***

### StepResult {#stepresult}

The result of [applying](https://prosemirror.net/docs/ref/#transform.Step.apply) a step. Contains either a
new document or a failure value.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-4" href="#constructor-4">StepResult</a>(): [`StepResult`](#stepresult)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="doc" href="#doc">doc</a>: `null` \| [`ProseMirrorNode`](model.md#prosemirrornode)</code>

</dt>

<dd>

The transformed document, if successful.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="failed" href="#failed">failed</a>: `null` \| `string`</code>

</dt>

<dd>

The failure message, if unsuccessful.

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="ok" href="#ok">ok</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`StepResult`](#stepresult)</code>

</dt>

<dd>

Create a successful step result.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="fail" href="#fail">fail</a>(`message`: `string`): [`StepResult`](#stepresult)</code>

</dt>

<dd>

Create a failed step result.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="fromreplace" href="#fromreplace">fromReplace</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `from`: `number`, `to`: `number`, `slice`: [`Slice`](model.md#slice)): [`StepResult`](#stepresult)</code>

</dt>

<dd>

Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
arguments. Create a successful result if it succeeds, and a
failed one if it throws a `ReplaceError`.

</dd>

</dl>

***

### Transform {#transform}

Abstraction to build up and track an array of
[steps](https://prosemirror.net/docs/ref/#transform.Step) representing a document transformation.

Most transforming methods return the `Transform` object itself, so
that they can be chained.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-5" href="#constructor-5">Transform</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`Transform`](#transform)</code>

</dt>

<dd>

Create a transform that starts with the given document.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="doc-1" href="#doc-1">doc</a>: [`ProseMirrorNode`](model.md#prosemirrornode)</code>

</dt>

<dd>

The current document (the result of applying the steps in the
transform).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="steps" href="#steps">steps</a>: [`Step`](#step)[]</code>

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

<code data-typedoc-code><i>readonly</i> <a id="mapping-1" href="#mapping-1">mapping</a>: [`Mapping`](#mapping)</code>

</dt>

<dd>

A mapping with the maps for each of the steps in this transform.

</dd>

</dl>

#### Accessors

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

<code data-typedoc-code><a id="step-1" href="#step-1">step</a>(`step`: [`Step`](#step)): `this`</code>

</dt>

<dd>

Apply a new step in this transform, saving the result. Throws an
error when the step fails.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="maybestep" href="#maybestep">maybeStep</a>(`step`: [`Step`](#step)): [`StepResult`](#stepresult)</code>

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

### AddMarkStep {#addmarkstep}

Add a mark to all inline content between two positions.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-6" href="#constructor-6">AddMarkStep</a>(`from`: `number`, `to`: `number`, `mark`: [`Mark`](model.md#mark)): [`AddMarkStep`](#addmarkstep)</code>

</dt>

<dd>

Create a mark step.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="from-1" href="#from-1">from</a>: `number`</code>

</dt>

<dd>

The start of the marked range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="to-1" href="#to-1">to</a>: `number`</code>

</dt>

<dd>

The end of the marked range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="mark" href="#mark">mark</a>: [`Mark`](model.md#mark)</code>

</dt>

<dd>

The mark to add.

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="getmap-2" href="#getmap-2">getMap</a>(): [`StepMap`](#stepmap)</code>

</dt>

<dd>

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="fromjson-2" href="#fromjson-2">fromJSON</a>(`schema`: [`Schema`](model.md#schema-3), `json`: `any`): [`Step`](#step)</code>

</dt>

<dd>

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="jsonid-2" href="#jsonid-2">jsonID</a>(`id`: `string`, `stepClass`: `object`): `object`</code>

</dt>

<dd>

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="apply-2" href="#apply-2">apply</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`StepResult`](#stepresult)</code>

</dt>

<dd>

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="invert-6" href="#invert-6">invert</a>(): [`Step`](#step)</code>

</dt>

<dd>

Create an inverted version of this step. Needs the document as it
was before the step as argument.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="map-7" href="#map-7">map</a>(`mapping`: [`Mappable`](#mappable)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="merge-2" href="#merge-2">merge</a>(`other`: [`Step`](#step)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="tojson-2" href="#tojson-2">toJSON</a>(): `any`</code>

</dt>

<dd>

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

</dd>

</dl>

***

### RemoveMarkStep {#removemarkstep}

Remove a mark from all inline content between two positions.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-7" href="#constructor-7">RemoveMarkStep</a>(`from`: `number`, `to`: `number`, `mark`: [`Mark`](model.md#mark)): [`RemoveMarkStep`](#removemarkstep)</code>

</dt>

<dd>

Create a mark-removing step.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="from-2" href="#from-2">from</a>: `number`</code>

</dt>

<dd>

The start of the unmarked range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="to-2" href="#to-2">to</a>: `number`</code>

</dt>

<dd>

The end of the unmarked range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="mark-1" href="#mark-1">mark</a>: [`Mark`](model.md#mark)</code>

</dt>

<dd>

The mark to remove.

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="getmap-4" href="#getmap-4">getMap</a>(): [`StepMap`](#stepmap)</code>

</dt>

<dd>

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="fromjson-4" href="#fromjson-4">fromJSON</a>(`schema`: [`Schema`](model.md#schema-3), `json`: `any`): [`Step`](#step)</code>

</dt>

<dd>

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="jsonid-4" href="#jsonid-4">jsonID</a>(`id`: `string`, `stepClass`: `object`): `object`</code>

</dt>

<dd>

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="apply-4" href="#apply-4">apply</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`StepResult`](#stepresult)</code>

</dt>

<dd>

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="invert-8" href="#invert-8">invert</a>(): [`Step`](#step)</code>

</dt>

<dd>

Create an inverted version of this step. Needs the document as it
was before the step as argument.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="map-9" href="#map-9">map</a>(`mapping`: [`Mappable`](#mappable)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="merge-4" href="#merge-4">merge</a>(`other`: [`Step`](#step)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="tojson-4" href="#tojson-4">toJSON</a>(): `any`</code>

</dt>

<dd>

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

</dd>

</dl>

***

### AddNodeMarkStep {#addnodemarkstep}

Add a mark to a specific node.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-8" href="#constructor-8">AddNodeMarkStep</a>(`pos`: `number`, `mark`: [`Mark`](model.md#mark)): [`AddNodeMarkStep`](#addnodemarkstep)</code>

</dt>

<dd>

Create a node mark step.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="pos-1" href="#pos-1">pos</a>: `number`</code>

</dt>

<dd>

The position of the target node.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="mark-2" href="#mark-2">mark</a>: [`Mark`](model.md#mark)</code>

</dt>

<dd>

The mark to add.

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="getmap-6" href="#getmap-6">getMap</a>(): [`StepMap`](#stepmap)</code>

</dt>

<dd>

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="merge-6" href="#merge-6">merge</a>(`other`: [`Step`](#step)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="fromjson-6" href="#fromjson-6">fromJSON</a>(`schema`: [`Schema`](model.md#schema-3), `json`: `any`): [`Step`](#step)</code>

</dt>

<dd>

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="jsonid-6" href="#jsonid-6">jsonID</a>(`id`: `string`, `stepClass`: `object`): `object`</code>

</dt>

<dd>

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="apply-6" href="#apply-6">apply</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`StepResult`](#stepresult)</code>

</dt>

<dd>

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="invert-10" href="#invert-10">invert</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`Step`](#step)</code>

</dt>

<dd>

Create an inverted version of this step. Needs the document as it
was before the step as argument.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="map-11" href="#map-11">map</a>(`mapping`: [`Mappable`](#mappable)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="tojson-6" href="#tojson-6">toJSON</a>(): `any`</code>

</dt>

<dd>

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

</dd>

</dl>

***

### RemoveNodeMarkStep {#removenodemarkstep}

Remove a mark from a specific node.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-9" href="#constructor-9">RemoveNodeMarkStep</a>(`pos`: `number`, `mark`: [`Mark`](model.md#mark)): [`RemoveNodeMarkStep`](#removenodemarkstep)</code>

</dt>

<dd>

Create a mark-removing step.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="pos-2" href="#pos-2">pos</a>: `number`</code>

</dt>

<dd>

The position of the target node.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="mark-3" href="#mark-3">mark</a>: [`Mark`](model.md#mark)</code>

</dt>

<dd>

The mark to remove.

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="getmap-8" href="#getmap-8">getMap</a>(): [`StepMap`](#stepmap)</code>

</dt>

<dd>

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="merge-8" href="#merge-8">merge</a>(`other`: [`Step`](#step)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="fromjson-8" href="#fromjson-8">fromJSON</a>(`schema`: [`Schema`](model.md#schema-3), `json`: `any`): [`Step`](#step)</code>

</dt>

<dd>

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="jsonid-8" href="#jsonid-8">jsonID</a>(`id`: `string`, `stepClass`: `object`): `object`</code>

</dt>

<dd>

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="apply-8" href="#apply-8">apply</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`StepResult`](#stepresult)</code>

</dt>

<dd>

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="invert-12" href="#invert-12">invert</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`Step`](#step)</code>

</dt>

<dd>

Create an inverted version of this step. Needs the document as it
was before the step as argument.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="map-13" href="#map-13">map</a>(`mapping`: [`Mappable`](#mappable)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="tojson-8" href="#tojson-8">toJSON</a>(): `any`</code>

</dt>

<dd>

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

</dd>

</dl>

***

### ReplaceStep {#replacestep}

Replace a part of the document with a slice of new content.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-10" href="#constructor-10">ReplaceStep</a>(`from`: `number`, `to`: `number`, `slice`: [`Slice`](model.md#slice)): [`ReplaceStep`](#replacestep)</code>

</dt>

<dd>

The given `slice` should fit the 'gap' between `from` and
`to`—the depths must line up, and the surrounding nodes must be
able to be joined with the open sides of the slice. When
`structure` is true, the step will fail if the content between
from and to is not just a sequence of closing and then opening
tokens (this is to guard against rebased replace steps
overwriting something they weren't supposed to).

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="from-3" href="#from-3">from</a>: `number`</code>

</dt>

<dd>

The start position of the replaced range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="to-3" href="#to-3">to</a>: `number`</code>

</dt>

<dd>

The end position of the replaced range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="slice-2" href="#slice-2">slice</a>: [`Slice`](model.md#slice)</code>

</dt>

<dd>

The slice to insert.

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="fromjson-10" href="#fromjson-10">fromJSON</a>(`schema`: [`Schema`](model.md#schema-3), `json`: `any`): [`Step`](#step)</code>

</dt>

<dd>

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="jsonid-10" href="#jsonid-10">jsonID</a>(`id`: `string`, `stepClass`: `object`): `object`</code>

</dt>

<dd>

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="apply-10" href="#apply-10">apply</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`StepResult`](#stepresult)</code>

</dt>

<dd>

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="getmap-10" href="#getmap-10">getMap</a>(): [`StepMap`](#stepmap)</code>

</dt>

<dd>

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="invert-14" href="#invert-14">invert</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`ReplaceStep`](#replacestep)</code>

</dt>

<dd>

Create an inverted version of this step. Needs the document as it
was before the step as argument.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="map-15" href="#map-15">map</a>(`mapping`: [`Mappable`](#mappable)): `null` \| [`ReplaceStep`](#replacestep)</code>

</dt>

<dd>

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="merge-10" href="#merge-10">merge</a>(`other`: [`Step`](#step)): `null` \| [`ReplaceStep`](#replacestep)</code>

</dt>

<dd>

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="tojson-10" href="#tojson-10">toJSON</a>(): `any`</code>

</dt>

<dd>

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

</dd>

</dl>

***

### ReplaceAroundStep {#replacearoundstep}

Replace a part of the document with a slice of content, but
preserve a range of the replaced content by moving it into the
slice.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-11" href="#constructor-11">ReplaceAroundStep</a>(`from`: `number`, `to`: `number`, `gapFrom`: `number`, `gapTo`: `number`, `slice`: [`Slice`](model.md#slice), `insert`: `number`): [`ReplaceAroundStep`](#replacearoundstep)</code>

</dt>

<dd>

Create a replace-around step with the given range and gap.
`insert` should be the point in the slice into which the content
of the gap should be moved. `structure` has the same meaning as
it has in the [`ReplaceStep`](https://prosemirror.net/docs/ref/#transform.ReplaceStep) class.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="from-4" href="#from-4">from</a>: `number`</code>

</dt>

<dd>

The start position of the replaced range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="to-4" href="#to-4">to</a>: `number`</code>

</dt>

<dd>

The end position of the replaced range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="gapfrom" href="#gapfrom">gapFrom</a>: `number`</code>

</dt>

<dd>

The start of preserved range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="gapto" href="#gapto">gapTo</a>: `number`</code>

</dt>

<dd>

The end of preserved range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="slice-3" href="#slice-3">slice</a>: [`Slice`](model.md#slice)</code>

</dt>

<dd>

The slice to insert.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="insert-2" href="#insert-2">insert</a>: `number`</code>

</dt>

<dd>

The position in the slice where the preserved range should be
inserted.

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="merge-12" href="#merge-12">merge</a>(`other`: [`Step`](#step)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="fromjson-12" href="#fromjson-12">fromJSON</a>(`schema`: [`Schema`](model.md#schema-3), `json`: `any`): [`Step`](#step)</code>

</dt>

<dd>

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="jsonid-12" href="#jsonid-12">jsonID</a>(`id`: `string`, `stepClass`: `object`): `object`</code>

</dt>

<dd>

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="apply-12" href="#apply-12">apply</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`StepResult`](#stepresult)</code>

</dt>

<dd>

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="getmap-12" href="#getmap-12">getMap</a>(): [`StepMap`](#stepmap)</code>

</dt>

<dd>

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="invert-16" href="#invert-16">invert</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`ReplaceAroundStep`](#replacearoundstep)</code>

</dt>

<dd>

Create an inverted version of this step. Needs the document as it
was before the step as argument.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="map-17" href="#map-17">map</a>(`mapping`: [`Mappable`](#mappable)): `null` \| [`ReplaceAroundStep`](#replacearoundstep)</code>

</dt>

<dd>

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="tojson-12" href="#tojson-12">toJSON</a>(): `any`</code>

</dt>

<dd>

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

</dd>

</dl>

***

### AttrStep {#attrstep}

Update an attribute in a specific node.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-12" href="#constructor-12">AttrStep</a>(`pos`: `number`, `attr`: `string`, `value`: `any`): [`AttrStep`](#attrstep)</code>

</dt>

<dd>

Construct an attribute step.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="pos-3" href="#pos-3">pos</a>: `number`</code>

</dt>

<dd>

The position of the target node.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="attr" href="#attr">attr</a>: `string`</code>

</dt>

<dd>

The attribute to set.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="value" href="#value">value</a>: `any`</code>

</dt>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="merge-14" href="#merge-14">merge</a>(`other`: [`Step`](#step)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="jsonid-14" href="#jsonid-14">jsonID</a>(`id`: `string`, `stepClass`: `object`): `object`</code>

</dt>

<dd>

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="apply-14" href="#apply-14">apply</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`StepResult`](#stepresult)</code>

</dt>

<dd>

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="getmap-14" href="#getmap-14">getMap</a>(): [`StepMap`](#stepmap)</code>

</dt>

<dd>

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="invert-18" href="#invert-18">invert</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`AttrStep`](#attrstep)</code>

</dt>

<dd>

Create an inverted version of this step. Needs the document as it
was before the step as argument.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="map-19" href="#map-19">map</a>(`mapping`: [`Mappable`](#mappable)): `null` \| [`AttrStep`](#attrstep)</code>

</dt>

<dd>

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="tojson-14" href="#tojson-14">toJSON</a>(): `any`</code>

</dt>

<dd>

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="fromjson-14" href="#fromjson-14">fromJSON</a>(`schema`: [`Schema`](model.md#schema-3), `json`: `any`): [`AttrStep`](#attrstep)</code>

</dt>

<dd>

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

</dd>

</dl>

***

### DocAttrStep {#docattrstep}

Update an attribute in the doc node.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-13" href="#constructor-13">DocAttrStep</a>(`attr`: `string`, `value`: `any`): [`DocAttrStep`](#docattrstep)</code>

</dt>

<dd>

Construct an attribute step.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="attr-1" href="#attr-1">attr</a>: `string`</code>

</dt>

<dd>

The attribute to set.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="value-1" href="#value-1">value</a>: `any`</code>

</dt>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="merge-16" href="#merge-16">merge</a>(`other`: [`Step`](#step)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="jsonid-16" href="#jsonid-16">jsonID</a>(`id`: `string`, `stepClass`: `object`): `object`</code>

</dt>

<dd>

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="apply-16" href="#apply-16">apply</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`StepResult`](#stepresult)</code>

</dt>

<dd>

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="getmap-16" href="#getmap-16">getMap</a>(): [`StepMap`](#stepmap)</code>

</dt>

<dd>

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="invert-20" href="#invert-20">invert</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`DocAttrStep`](#docattrstep)</code>

</dt>

<dd>

Create an inverted version of this step. Needs the document as it
was before the step as argument.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="map-21" href="#map-21">map</a>(`mapping`: [`Mappable`](#mappable)): `this`</code>

</dt>

<dd>

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="tojson-16" href="#tojson-16">toJSON</a>(): `any`</code>

</dt>

<dd>

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i>static</i> <a id="fromjson-16" href="#fromjson-16">fromJSON</a>(`schema`: [`Schema`](model.md#schema-3), `json`: `any`): [`DocAttrStep`](#docattrstep)</code>

</dt>

<dd>

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

</dd>

</dl>

## Interfaces

### Mappable {#mappable}

There are several things that positions can be mapped through.
Such objects conform to this interface.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="map" href="#map">map</a>: (`pos`: `number`, `assoc?`: `number`) => `number`</code>

</dt>

<dd>

Map a position through this object. When given, `assoc` (should
be -1 or 1, defaults to 1) determines with which side the
position is associated, which determines in which direction to
move when a chunk of content is inserted at the mapped position.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="mapresult" href="#mapresult">mapResult</a>: (`pos`: `number`, `assoc?`: `number`) => [`MapResult`](#mapresult-1)</code>

</dt>

<dd>

Map a position, and return an object containing additional
information about the mapping. The result's `deleted` field tells
you whether the position was deleted (completely enclosed in a
replaced range) during the mapping. When content on only one side
is deleted, the position itself is only considered deleted when
`assoc` points in the direction of the deleted content.

</dd>

</dl>

## Functions

### liftTarget() {#lifttarget}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="lifttarget" href="#lifttarget">liftTarget</a>(`range`: [`NodeRange`](model.md#noderange)): `null` \| `number`</code>

</dt>

<dd>

Try to find a target depth to which the content in the given range
can be lifted. Will not go across
[isolating](https://prosemirror.net/docs/ref/#model.NodeSpec.isolating) parent nodes.

</dd>

</dl>

***

### findWrapping() {#findwrapping}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="findwrapping" href="#findwrapping">findWrapping</a>(`range`: [`NodeRange`](model.md#noderange), `nodeType`: [`NodeType`](model.md#nodetype), `attrs?`: `null` \| [`Attrs`](model.md#attrs-4), `innerRange?`: [`NodeRange`](model.md#noderange)): `null` \| `object`[]</code>

</dt>

<dd>

Try to find a valid way to wrap the content in the given range in a
node of the given type. May introduce extra nodes around and inside
the wrapper node, if necessary. Returns null if no valid wrapping
could be found. When `innerRange` is given, that range's content is
used as the content to fit into the wrapping, instead of the
content of `range`.

</dd>

</dl>

***

### canSplit() {#cansplit}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="cansplit" href="#cansplit">canSplit</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `pos`: `number`, `depth?`: `number`, `typesAfter?`: (`null` \| \{ `type`: [`NodeType`](model.md#nodetype); `attrs?`: `null` \| [`Attrs`](model.md#attrs-4); \})[]): `boolean`</code>

</dt>

<dd>

Check whether splitting at the given position is allowed.

</dd>

</dl>

***

### canJoin() {#canjoin}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="canjoin" href="#canjoin">canJoin</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `pos`: `number`): `boolean`</code>

</dt>

<dd>

Test whether the blocks before and after a given position can be
joined.

</dd>

</dl>

***

### joinPoint() {#joinpoint}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="joinpoint" href="#joinpoint">joinPoint</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `pos`: `number`, `dir?`: `number`): `undefined` \| `number`</code>

</dt>

<dd>

Find an ancestor of the given position that can be joined to the
block before (or after if `dir` is positive). Returns the joinable
point, if any.

</dd>

</dl>

***

### insertPoint() {#insertpoint}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="insertpoint" href="#insertpoint">insertPoint</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `pos`: `number`, `nodeType`: [`NodeType`](model.md#nodetype)): `null` \| `number`</code>

</dt>

<dd>

Try to find a point where a node of the given type can be inserted
near `pos`, by searching up the node hierarchy when `pos` itself
isn't a valid place but is at the start or end of a node. Return
null if no position was found.

</dd>

</dl>

***

### dropPoint() {#droppoint}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="droppoint" href="#droppoint">dropPoint</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `pos`: `number`, `slice`: [`Slice`](model.md#slice)): `null` \| `number`</code>

</dt>

<dd>

Finds a position at or around the given position where the given
slice can be inserted. Will look at parent nodes' nearest boundary
and try there, even if the original position wasn't directly at the
start or end of that node. Returns null when no position was found.

</dd>

</dl>

***

### replaceStep() {#replacestep-1}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="replacestep-1" href="#replacestep-1">replaceStep</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `from`: `number`, `to?`: `number`, `slice?`: [`Slice`](model.md#slice)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

‘Fit’ a slice into a given position in the document, producing a
[step](https://prosemirror.net/docs/ref/#transform.Step) that inserts it. Will return null if
there's no meaningful way to insert the slice here, or inserting it
would be a no-op (an empty slice over an empty range).

</dd>

</dl>
