---
title: prosekit/pm/transform
sidebar:
  label: pm/transform
---


Re-exports from [prosemirror-transform](https://github.com/ProseMirror/prosemirror-transform).

## AddMarkStep {#add-mark-step}

**Extends** `Step`

Add a mark to all inline content between two positions.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new AddMarkStep(from: number, to: number, mark: Mark): AddMarkStep
```

</dd>

<dt>

`from: number`

</dt>

<dd>

The start of the marked range.

</dd>

<dt>

`mark: Mark`

</dt>

<dd>

The mark to add.

</dd>

<dt>

`to: number`

</dt>

<dd>

The end of the marked range.

</dd>

<dt>

`apply`

</dt>

<dd>

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

```ts
const apply: (doc: ProseMirrorNode) => StepResult
```

</dd>

<dt>

`invert`

</dt>

<dd>

Create an inverted version of this step. Needs the document as it
was before the step as argument.

```ts
const invert: () => Step
```

</dd>

<dt>

`map`

</dt>

<dd>

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

```ts
const map: (mapping: Mappable) => null | Step
```

</dd>

<dt>

`merge`

</dt>

<dd>

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

```ts
const merge: (other: Step) => null | Step
```

</dd>

<dt>

`toJSON`

</dt>

<dd>

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

```ts
const toJSON: () => any
```

</dd>

</dl>

## AddNodeMarkStep {#add-node-mark-step}

**Extends** `Step`

Add a mark to a specific node.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new AddNodeMarkStep(pos: number, mark: Mark): AddNodeMarkStep
```

</dd>

<dt>

`mark: Mark`

</dt>

<dd>

The mark to add.

</dd>

<dt>

`pos: number`

</dt>

<dd>

The position of the target node.

</dd>

<dt>

`apply`

</dt>

<dd>

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

```ts
const apply: (doc: ProseMirrorNode) => StepResult
```

</dd>

<dt>

`invert`

</dt>

<dd>

Create an inverted version of this step. Needs the document as it
was before the step as argument.

```ts
const invert: (doc: ProseMirrorNode) => Step
```

</dd>

<dt>

`map`

</dt>

<dd>

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

```ts
const map: (mapping: Mappable) => null | Step
```

</dd>

<dt>

`toJSON`

</dt>

<dd>

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

```ts
const toJSON: () => any
```

</dd>

</dl>

## AttrStep {#attr-step}

**Extends** `Step`

Update an attribute in a specific node.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new AttrStep(pos: number, attr: string, value: any): AttrStep
```

</dd>

<dt>

`attr: string`

</dt>

<dd>

The attribute to set.

</dd>

<dt>

`pos: number`

</dt>

<dd>

The position of the target node.

</dd>

<dt>

`value: any`

</dt>

<dd>

</dd>

<dt>

`apply`

</dt>

<dd>

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

```ts
const apply: (doc: ProseMirrorNode) => StepResult
```

</dd>

<dt>

`getMap`

</dt>

<dd>

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

```ts
const getMap: () => StepMap
```

</dd>

<dt>

`invert`

</dt>

<dd>

Create an inverted version of this step. Needs the document as it
was before the step as argument.

```ts
const invert: (doc: ProseMirrorNode) => AttrStep
```

</dd>

<dt>

`map`

</dt>

<dd>

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

```ts
const map: (mapping: Mappable) => null | AttrStep
```

</dd>

<dt>

`toJSON`

</dt>

<dd>

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

```ts
const toJSON: () => any
```

</dd>

<dt>

`fromJSON`

</dt>

<dd>

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

```ts
const fromJSON: (schema: Schema, json: any) => AttrStep
```

</dd>

</dl>

## DocAttrStep {#doc-attr-step}

**Extends** `Step`

Update an attribute in the doc node.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new DocAttrStep(attr: string, value: any): DocAttrStep
```

</dd>

<dt>

`attr: string`

</dt>

<dd>

The attribute to set.

</dd>

<dt>

`value: any`

</dt>

<dd>

</dd>

<dt>

`apply`

</dt>

<dd>

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

```ts
const apply: (doc: ProseMirrorNode) => StepResult
```

</dd>

<dt>

`getMap`

</dt>

<dd>

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

```ts
const getMap: () => StepMap
```

</dd>

<dt>

`invert`

</dt>

<dd>

Create an inverted version of this step. Needs the document as it
was before the step as argument.

```ts
const invert: (doc: ProseMirrorNode) => DocAttrStep
```

</dd>

<dt>

`map`

</dt>

<dd>

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

```ts
const map: (mapping: Mappable) => this
```

</dd>

<dt>

`toJSON`

</dt>

<dd>

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

```ts
const toJSON: () => any
```

</dd>

<dt>

`fromJSON`

</dt>

<dd>

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

```ts
const fromJSON: (schema: Schema, json: any) => DocAttrStep
```

</dd>

</dl>

## Mapping {#mapping-1}

A mapping represents a pipeline of zero or more [step
maps](https://prosemirror.net/docs/ref/#transform.StepMap). It has special provisions for losslessly
handling mapping positions through a series of steps in which some
steps are inverted versions of earlier steps. (This comes up when
‘[rebasing](https://prosemirror.net/docs/guide/#transform.rebasing)’ steps for
collaboration or history management.)

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new Mapping(maps?: readonly StepMap[], from?: number, to?: number): Mapping
```

</dd>

<dt>

`from: number`

</dt>

<dd>

The starting position in the `maps` array, used when `map` or
`mapResult` is called.

</dd>

<dt>

`to: number`

</dt>

<dd>

The end position in the `maps` array.

</dd>

<dt>

`get maps(): readonly StepMap[]`

</dt>

<dd>

The step maps in this mapping.

</dd>

<dt>

`appendMap`

</dt>

<dd>

Add a step map to the end of this mapping. If `mirrors` is
given, it should be the index of the step map that is the mirror
image of this one.

```ts
const appendMap: (map: StepMap, mirrors?: number) => void
```

</dd>

<dt>

`appendMapping`

</dt>

<dd>

Add all the step maps in a given mapping to this one (preserving
mirroring information).

```ts
const appendMapping: (mapping: Mapping) => void
```

</dd>

<dt>

`appendMappingInverted`

</dt>

<dd>

Append the inverse of the given mapping to this one.

```ts
const appendMappingInverted: (mapping: Mapping) => void
```

</dd>

<dt>

`getMirror`

</dt>

<dd>

Finds the offset of the step map that mirrors the map at the
given offset, in this mapping (as per the second argument to
`appendMap`).

```ts
const getMirror: (n: number) => undefined | number
```

</dd>

<dt>

`invert`

</dt>

<dd>

Create an inverted version of this mapping.

```ts
const invert: () => Mapping
```

</dd>

<dt>

`map`

</dt>

<dd>

Map a position through this mapping.

```ts
const map: (pos: number, assoc?: number) => number
```

</dd>

<dt>

`mapResult`

</dt>

<dd>

Map a position through this mapping, returning a mapping
result.

```ts
const mapResult: (pos: number, assoc?: number) => MapResult
```

</dd>

<dt>

`slice`

</dt>

<dd>

Create a mapping that maps only through a part of this one.

```ts
const slice: (from?: number, to?: number) => Mapping
```

</dd>

</dl>

## MapResult {#map-result-1}

An object representing a mapped position with extra
information.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new MapResult(): MapResult
```

</dd>

<dt>

`pos: number`

</dt>

<dd>

The mapped version of the position.

</dd>

<dt>

`get deleted(): boolean`

</dt>

<dd>

Tells you whether the position was deleted, that is, whether the
step removed the token on the side queried (via the `assoc`)
argument from the document.

</dd>

<dt>

`get deletedAcross(): boolean`

</dt>

<dd>

Tells whether any of the steps mapped through deletes across the
position (including both the token before and after the
position).

</dd>

<dt>

`get deletedAfter(): boolean`

</dt>

<dd>

True when the token after the mapped position was deleted.

</dd>

<dt>

`get deletedBefore(): boolean`

</dt>

<dd>

Tells you whether the token before the mapped position was deleted.

</dd>

</dl>

## RemoveMarkStep {#remove-mark-step}

**Extends** `Step`

Remove a mark from all inline content between two positions.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new RemoveMarkStep(from: number, to: number, mark: Mark): RemoveMarkStep
```

</dd>

<dt>

`from: number`

</dt>

<dd>

The start of the unmarked range.

</dd>

<dt>

`mark: Mark`

</dt>

<dd>

The mark to remove.

</dd>

<dt>

`to: number`

</dt>

<dd>

The end of the unmarked range.

</dd>

<dt>

`apply`

</dt>

<dd>

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

```ts
const apply: (doc: ProseMirrorNode) => StepResult
```

</dd>

<dt>

`invert`

</dt>

<dd>

Create an inverted version of this step. Needs the document as it
was before the step as argument.

```ts
const invert: () => Step
```

</dd>

<dt>

`map`

</dt>

<dd>

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

```ts
const map: (mapping: Mappable) => null | Step
```

</dd>

<dt>

`merge`

</dt>

<dd>

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

```ts
const merge: (other: Step) => null | Step
```

</dd>

<dt>

`toJSON`

</dt>

<dd>

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

```ts
const toJSON: () => any
```

</dd>

</dl>

## RemoveNodeMarkStep {#remove-node-mark-step}

**Extends** `Step`

Remove a mark from a specific node.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new RemoveNodeMarkStep(pos: number, mark: Mark): RemoveNodeMarkStep
```

</dd>

<dt>

`mark: Mark`

</dt>

<dd>

The mark to remove.

</dd>

<dt>

`pos: number`

</dt>

<dd>

The position of the target node.

</dd>

<dt>

`apply`

</dt>

<dd>

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

```ts
const apply: (doc: ProseMirrorNode) => StepResult
```

</dd>

<dt>

`invert`

</dt>

<dd>

Create an inverted version of this step. Needs the document as it
was before the step as argument.

```ts
const invert: (doc: ProseMirrorNode) => Step
```

</dd>

<dt>

`map`

</dt>

<dd>

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

```ts
const map: (mapping: Mappable) => null | Step
```

</dd>

<dt>

`toJSON`

</dt>

<dd>

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

```ts
const toJSON: () => any
```

</dd>

</dl>

## ReplaceAroundStep {#replace-around-step}

**Extends** `Step`

Replace a part of the document with a slice of content, but
preserve a range of the replaced content by moving it into the
slice.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new ReplaceAroundStep(from: number, to: number, gapFrom: number, gapTo: number, slice: Slice, insert: number): ReplaceAroundStep
```

</dd>

<dt>

`from: number`

</dt>

<dd>

The start position of the replaced range.

</dd>

<dt>

`gapFrom: number`

</dt>

<dd>

The start of preserved range.

</dd>

<dt>

`gapTo: number`

</dt>

<dd>

The end of preserved range.

</dd>

<dt>

`insert: number`

</dt>

<dd>

The position in the slice where the preserved range should be
inserted.

</dd>

<dt>

`slice: Slice`

</dt>

<dd>

The slice to insert.

</dd>

<dt>

`to: number`

</dt>

<dd>

The end position of the replaced range.

</dd>

<dt>

`apply`

</dt>

<dd>

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

```ts
const apply: (doc: ProseMirrorNode) => StepResult
```

</dd>

<dt>

`getMap`

</dt>

<dd>

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

```ts
const getMap: () => StepMap
```

</dd>

<dt>

`invert`

</dt>

<dd>

Create an inverted version of this step. Needs the document as it
was before the step as argument.

```ts
const invert: (doc: ProseMirrorNode) => ReplaceAroundStep
```

</dd>

<dt>

`map`

</dt>

<dd>

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

```ts
const map: (mapping: Mappable) => null | ReplaceAroundStep
```

</dd>

<dt>

`toJSON`

</dt>

<dd>

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

```ts
const toJSON: () => any
```

</dd>

</dl>

## ReplaceStep {#replace-step}

**Extends** `Step`

Replace a part of the document with a slice of new content.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new ReplaceStep(from: number, to: number, slice: Slice): ReplaceStep
```

</dd>

<dt>

`from: number`

</dt>

<dd>

The start position of the replaced range.

</dd>

<dt>

`slice: Slice`

</dt>

<dd>

The slice to insert.

</dd>

<dt>

`to: number`

</dt>

<dd>

The end position of the replaced range.

</dd>

<dt>

`apply`

</dt>

<dd>

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

```ts
const apply: (doc: ProseMirrorNode) => StepResult
```

</dd>

<dt>

`getMap`

</dt>

<dd>

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

```ts
const getMap: () => StepMap
```

</dd>

<dt>

`invert`

</dt>

<dd>

Create an inverted version of this step. Needs the document as it
was before the step as argument.

```ts
const invert: (doc: ProseMirrorNode) => ReplaceStep
```

</dd>

<dt>

`map`

</dt>

<dd>

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

```ts
const map: (mapping: Mappable) => null | ReplaceStep
```

</dd>

<dt>

`merge`

</dt>

<dd>

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

```ts
const merge: (other: Step) => null | ReplaceStep
```

</dd>

<dt>

`toJSON`

</dt>

<dd>

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

```ts
const toJSON: () => any
```

</dd>

</dl>

## Step {#step-1}

A step object represents an atomic change. It generally applies
only to the document it was created for, since the positions
stored in it will only make sense for that document.

New steps are defined by creating classes that extend `Step`,
overriding the `apply`, `invert`, `map`, `getMap` and `fromJSON`
methods, and registering your class with a unique
JSON-serialization identifier using
[`Step.jsonID`](https://prosemirror.net/docs/ref/#transform.Step^jsonID).

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new Step(): Step
```

</dd>

<dt>

`apply`

</dt>

<dd>

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

```ts
const apply: (doc: ProseMirrorNode) => StepResult
```

</dd>

<dt>

`getMap`

</dt>

<dd>

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

```ts
const getMap: () => StepMap
```

</dd>

<dt>

`invert`

</dt>

<dd>

Create an inverted version of this step. Needs the document as it
was before the step as argument.

```ts
const invert: (doc: ProseMirrorNode) => Step
```

</dd>

<dt>

`map`

</dt>

<dd>

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

```ts
const map: (mapping: Mappable) => null | Step
```

</dd>

<dt>

`merge`

</dt>

<dd>

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

```ts
const merge: (other: Step) => null | Step
```

</dd>

<dt>

`toJSON`

</dt>

<dd>

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

```ts
const toJSON: () => any
```

</dd>

<dt>

`fromJSON`

</dt>

<dd>

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

```ts
const fromJSON: (schema: Schema, json: any) => Step
```

</dd>

<dt>

`jsonID`

</dt>

<dd>

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

```ts
const jsonID: (id: string, stepClass: { fromJSON: any }) => { fromJSON: any }
```

</dd>

</dl>

## StepMap {#step-map}

A map describing the deletions and insertions made by a step, which
can be used to find the correspondence between positions in the
pre-step version of a document and the same position in the
post-step version.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new StepMap(): StepMap
```

</dd>

<dt>

`empty: StepMap`

</dt>

<dd>

A StepMap that contains no changed ranges.

</dd>

<dt>

`forEach`

</dt>

<dd>

Calls the given function on each of the changed ranges included in
this map.

```ts
const forEach: (f: (oldStart: number, oldEnd: number, newStart: number, newEnd: number) => void) => void
```

</dd>

<dt>

`invert`

</dt>

<dd>

Create an inverted version of this map. The result can be used to
map positions in the post-step document to the pre-step document.

```ts
const invert: () => StepMap
```

</dd>

<dt>

`map`

</dt>

<dd>

Map a position through this object. When given, `assoc` (should
be -1 or 1, defaults to 1) determines with which side the
position is associated, which determines in which direction to
move when a chunk of content is inserted at the mapped position.

```ts
const map: (pos: number, assoc?: number) => number
```

</dd>

<dt>

`mapResult`

</dt>

<dd>

Map a position, and return an object containing additional
information about the mapping. The result's `deleted` field tells
you whether the position was deleted (completely enclosed in a
replaced range) during the mapping. When content on only one side
is deleted, the position itself is only considered deleted when
`assoc` points in the direction of the deleted content.

```ts
const mapResult: (pos: number, assoc?: number) => MapResult
```

</dd>

<dt>

`offset`

</dt>

<dd>

Create a map that moves all positions by offset `n` (which may be
negative). This can be useful when applying steps meant for a
sub-document to a larger document, or vice-versa.

```ts
const offset: (n: number) => StepMap
```

</dd>

</dl>

## StepResult {#step-result}

The result of [applying](https://prosemirror.net/docs/ref/#transform.Step.apply) a step. Contains either a
new document or a failure value.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new StepResult(): StepResult
```

</dd>

<dt>

`doc: null | ProseMirrorNode`

</dt>

<dd>

The transformed document, if successful.

</dd>

<dt>

`failed: null | string`

</dt>

<dd>

The failure message, if unsuccessful.

</dd>

<dt>

`fail`

</dt>

<dd>

Create a failed step result.

```ts
const fail: (message: string) => StepResult
```

</dd>

<dt>

`fromReplace`

</dt>

<dd>

Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
arguments. Create a successful result if it succeeds, and a
failed one if it throws a `ReplaceError`.

```ts
const fromReplace: (doc: ProseMirrorNode, from: number, to: number, slice: Slice) => StepResult
```

</dd>

<dt>

`ok`

</dt>

<dd>

Create a successful step result.

```ts
const ok: (doc: ProseMirrorNode) => StepResult
```

</dd>

</dl>

## Transform {#transform}

Abstraction to build up and track an array of
[steps](https://prosemirror.net/docs/ref/#transform.Step) representing a document transformation.

Most transforming methods return the `Transform` object itself, so
that they can be chained.

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new Transform(doc: ProseMirrorNode): Transform
```

</dd>

<dt>

`doc: ProseMirrorNode`

</dt>

<dd>

The current document (the result of applying the steps in the
transform).

</dd>

<dt>

`docs: ProseMirrorNode[]`

</dt>

<dd>

The documents before each of the steps.

</dd>

<dt>

`mapping: Mapping`

</dt>

<dd>

A mapping with the maps for each of the steps in this transform.

</dd>

<dt>

`steps: Step[]`

</dt>

<dd>

The steps in this transform.

</dd>

<dt>

`get before(): ProseMirrorNode`

</dt>

<dd>

The starting document.

</dd>

<dt>

`get docChanged(): boolean`

</dt>

<dd>

True when the document has been changed (when there are any
steps).

</dd>

<dt>

`addMark`

</dt>

<dd>

Add the given mark to the inline content between `from` and `to`.

```ts
const addMark: (from: number, to: number, mark: Mark) => this
```

</dd>

<dt>

`addNodeMark`

</dt>

<dd>

Add a mark to the node at position `pos`.

```ts
const addNodeMark: (pos: number, mark: Mark) => this
```

</dd>

<dt>

`clearIncompatible`

</dt>

<dd>

Removes all marks and nodes from the content of the node at
`pos` that don't match the given new parent node type. Accepts
an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
third argument.

```ts
const clearIncompatible: (pos: number, parentType: NodeType, match?: ContentMatch) => this
```

</dd>

<dt>

`delete`

</dt>

<dd>

Delete the content between the given positions.

```ts
const delete: (from: number, to: number) => this
```

</dd>

<dt>

`deleteRange`

</dt>

<dd>

Delete the given range, expanding it to cover fully covered
parent nodes until a valid replace is found.

```ts
const deleteRange: (from: number, to: number) => this
```

</dd>

<dt>

`insert`

</dt>

<dd>

Insert the given content at the given position.

```ts
const insert: (pos: number, content: ProseMirrorNode | ProseMirrorFragment | readonly ProseMirrorNode[]) => this
```

</dd>

<dt>

`join`

</dt>

<dd>

Join the blocks around the given position. If depth is 2, their
last and first siblings are also joined, and so on.

```ts
const join: (pos: number, depth?: number) => this
```

</dd>

<dt>

`lift`

</dt>

<dd>

Split the content in the given range off from its parent, if there
is sibling content before or after it, and move it up the tree to
the depth specified by `target`. You'll probably want to use
[`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
sure the lift is valid.

```ts
const lift: (range: NodeRange, target: number) => this
```

</dd>

<dt>

`maybeStep`

</dt>

<dd>

Try to apply a step in this transformation, ignoring it if it
fails. Returns the step result.

```ts
const maybeStep: (step: Step) => StepResult
```

</dd>

<dt>

`removeMark`

</dt>

<dd>

Remove marks from inline nodes between `from` and `to`. When
`mark` is a single mark, remove precisely that mark. When it is
a mark type, remove all marks of that type. When it is null,
remove all marks of any type.

```ts
const removeMark: (from: number, to: number, mark?: null | MarkType | Mark) => this
```

</dd>

<dt>

`removeNodeMark`

</dt>

<dd>

Remove a mark (or all marks of the given type) from the node at
position `pos`.

```ts
const removeNodeMark: (pos: number, mark: MarkType | Mark) => this
```

</dd>

<dt>

`replace`

</dt>

<dd>

Replace the part of the document between `from` and `to` with the
given `slice`.

```ts
const replace: (from: number, to?: number, slice?: Slice) => this
```

</dd>

<dt>

`replaceRange`

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
open parent node from the slice that *is* marked as [defining
its content](https://prosemirror.net/docs/ref/#model.NodeSpec.definingForContent).

This is the method, for example, to handle paste. The similar
[`replace`](https://prosemirror.net/docs/ref/#transform.Transform.replace) method is a more
primitive tool which will *not* move the start and end of its given
range, and is useful in situations where you need more precise
control over what happens.

```ts
const replaceRange: (from: number, to: number, slice: Slice) => this
```

</dd>

<dt>

`replaceRangeWith`

</dt>

<dd>

Replace the given range with a node, but use `from` and `to` as
hints, rather than precise positions. When from and to are the same
and are at the start or end of a parent node in which the given
node doesn't fit, this method may *move* them out towards a parent
that does allow the given node to be placed. When the given range
completely covers a parent node, this method may completely replace
that parent node.

```ts
const replaceRangeWith: (from: number, to: number, node: ProseMirrorNode) => this
```

</dd>

<dt>

`replaceWith`

</dt>

<dd>

Replace the given range with the given content, which may be a
fragment, node, or array of nodes.

```ts
const replaceWith: (from: number, to: number, content: ProseMirrorNode | ProseMirrorFragment | readonly ProseMirrorNode[]) => this
```

</dd>

<dt>

`setBlockType`

</dt>

<dd>

Set the type of all textblocks (partly) between `from` and `to` to
the given node type with the given attributes.

```ts
const setBlockType: (from: number, to: undefined | number, type: NodeType, attrs?: null | Attrs | ((oldNode: ProseMirrorNode) => Attrs)) => this
```

</dd>

<dt>

`setDocAttribute`

</dt>

<dd>

Set a single attribute on the document to a new value.

```ts
const setDocAttribute: (attr: string, value: any) => this
```

</dd>

<dt>

`setNodeAttribute`

</dt>

<dd>

Set a single attribute on a given node to a new value.
The `pos` addresses the document content. Use `setDocAttribute`
to set attributes on the document itself.

```ts
const setNodeAttribute: (pos: number, attr: string, value: any) => this
```

</dd>

<dt>

`setNodeMarkup`

</dt>

<dd>

Change the type, attributes, and/or marks of the node at `pos`.
When `type` isn't given, the existing node type is preserved,

```ts
const setNodeMarkup: (pos: number, type?: null | NodeType, attrs?: null | Attrs, marks?: readonly Mark[]) => this
```

</dd>

<dt>

`split`

</dt>

<dd>

Split the node at the given position, and optionally, if `depth` is
greater than one, any number of nodes above that. By default, the
parts split off will inherit the node type of the original node.
This can be changed by passing an array of types and attributes to
use after the split (with the outermost nodes coming first).

```ts
const split: (pos: number, depth?: number, typesAfter?: (null | ({ attrs?: null | Attrs; type: NodeType }))[]) => this
```

</dd>

<dt>

`step`

</dt>

<dd>

Apply a new step in this transform, saving the result. Throws an
error when the step fails.

```ts
const step: (step: Step) => this
```

</dd>

<dt>

`wrap`

</dt>

<dd>

Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
The wrappers are assumed to be valid in this position, and should
probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).

```ts
const wrap: (range: NodeRange, wrappers: readonly { attrs?: null | Attrs; type: NodeType }[]) => this
```

</dd>

</dl>

## Mappable {#mappable}

There are several things that positions can be mapped through.
Such objects conform to this interface.

<dl>

<dt>

`map: (pos: number, assoc?: number) => number`

</dt>

<dd>

Map a position through this object. When given, `assoc` (should
be -1 or 1, defaults to 1) determines with which side the
position is associated, which determines in which direction to
move when a chunk of content is inserted at the mapped position.

</dd>

<dt>

`mapResult: (pos: number, assoc?: number) => MapResult`

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

## canJoin {#can-join}

```ts
function canJoin(doc: ProseMirrorNode, pos: number): boolean
```

Test whether the blocks before and after a given position can be
joined.

## canSplit {#can-split}

```ts
function canSplit(doc: ProseMirrorNode, pos: number, depth?: number, typesAfter?: (null | ({ attrs?: null | Attrs; type: NodeType }))[]): boolean
```

Check whether splitting at the given position is allowed.

## dropPoint {#drop-point}

```ts
function dropPoint(doc: ProseMirrorNode, pos: number, slice: Slice): null | number
```

Finds a position at or around the given position where the given
slice can be inserted. Will look at parent nodes' nearest boundary
and try there, even if the original position wasn't directly at the
start or end of that node. Returns null when no position was found.

## findWrapping {#find-wrapping-1}

```ts
function findWrapping(range: NodeRange, nodeType: NodeType, attrs?: null | Attrs, innerRange?: NodeRange): null | { attrs: null | Attrs; type: NodeType }[]
```

Try to find a valid way to wrap the content in the given range in a
node of the given type. May introduce extra nodes around and inside
the wrapper node, if necessary. Returns null if no valid wrapping
could be found. When `innerRange` is given, that range's content is
used as the content to fit into the wrapping, instead of the
content of `range`.

## insertPoint {#insert-point}

```ts
function insertPoint(doc: ProseMirrorNode, pos: number, nodeType: NodeType): null | number
```

Try to find a point where a node of the given type can be inserted
near `pos`, by searching up the node hierarchy when `pos` itself
isn't a valid place but is at the start or end of a node. Return
null if no position was found.

## joinPoint {#join-point}

```ts
function joinPoint(doc: ProseMirrorNode, pos: number, dir?: number): undefined | number
```

Find an ancestor of the given position that can be joined to the
block before (or after if `dir` is positive). Returns the joinable
point, if any.

## liftTarget {#lift-target}

```ts
function liftTarget(range: NodeRange): null | number
```

Try to find a target depth to which the content in the given range
can be lifted. Will not go across
[isolating](https://prosemirror.net/docs/ref/#model.NodeSpec.isolating) parent nodes.

## replaceStep {#replace-step-1}

```ts
function replaceStep(doc: ProseMirrorNode, from: number, to?: number, slice?: Slice): null | Step
```

‘Fit’ a slice into a given position in the document, producing a
[step](https://prosemirror.net/docs/ref/#transform.Step) that inserts it. Will return null if
there's no meaningful way to insert the slice here, or inserting it
would be a no-op (an empty slice over an empty range).
