---
title: prosekit/pm/transform
sidebar:
  label: pm/transform
---

Re-exports from [prosemirror-transform](https://github.com/ProseMirror/prosemirror-transform).

## Classes

### AddMarkStep {#addmarkstep}

Add a mark to all inline content between two positions.

#### Extends

- [`Step`](#step)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructoraddmarkstep" href="#constructoraddmarkstep">AddMarkStep</a>(`from`: `number`, `to`: `number`, `mark`: [`Mark`](model.md#mark)): [`AddMarkStep`](#addmarkstep)</code>

</dt>

<dd>

Create a mark step.

###### Overrides

[`Step`](#step).[`constructor`](#constructor-10)

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="from" href="#from">from</a>: `number`</code>

</dt>

<dd>

The start of the marked range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="mark" href="#mark">mark</a>: [`Mark`](model.md#mark)</code>

</dt>

<dd>

The mark to add.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="to" href="#to">to</a>: `number`</code>

</dt>

<dd>

The end of the marked range.

</dd>

</dl>

#### Methods

##### apply() {#apply}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="apply-1" href="#apply-1">apply</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`StepResult`](#stepresult)</code>

</dt>

<dd>

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

###### Overrides

[`Step`](#step).[`apply`](#apply-16)

</dd>

</dl>

##### getMap() {#getmap}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="getmap-1" href="#getmap-1">getMap</a>(): [`StepMap`](#stepmap-2)</code>

</dt>

<dd>

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

###### Inherited from

[`Step`](#step).[`getMap`](#getmap-16)

</dd>

</dl>

##### invert() {#invert}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="invert-1" href="#invert-1">invert</a>(): [`Step`](#step)</code>

</dt>

<dd>

Create an inverted version of this step. Needs the document as it
was before the step as argument.

###### Overrides

[`Step`](#step).[`invert`](#invert-18)

</dd>

</dl>

##### map() {#map}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="map-1" href="#map-1">map</a>(`mapping`: [`Mappable`](#mappable)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

###### Overrides

[`Step`](#step).[`map`](#map-18)

</dd>

</dl>

##### merge() {#merge}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="merge-1" href="#merge-1">merge</a>(`other`: [`Step`](#step)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

###### Overrides

[`Step`](#step).[`merge`](#merge-16)

</dd>

</dl>

##### toJSON() {#tojson}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="tojson-1" href="#tojson-1">toJSON</a>(): `any`</code>

</dt>

<dd>

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

###### Overrides

[`Step`](#step).[`toJSON`](#tojson-16)

</dd>

</dl>

##### fromJSON() {#fromjson}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="fromjson-1" href="#fromjson-1">fromJSON</a>(`schema`: [`Schema`](model.md#schema-3), `json`: `any`): [`Step`](#step)</code>

</dt>

<dd>

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

###### Inherited from

[`Step`](#step).[`fromJSON`](#fromjson-16)

</dd>

</dl>

##### jsonID() {#jsonid}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="jsonid-1" href="#jsonid-1">jsonID</a>(`id`: `string`, `stepClass`: `object`): `object`</code>

</dt>

<dd>

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

###### Inherited from

[`Step`](#step).[`jsonID`](#jsonid-16)

</dd>

</dl>

***

### AddNodeMarkStep {#addnodemarkstep}

Add a mark to a specific node.

#### Extends

- [`Step`](#step)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructoraddnodemarkstep" href="#constructoraddnodemarkstep">AddNodeMarkStep</a>(`pos`: `number`, `mark`: [`Mark`](model.md#mark)): [`AddNodeMarkStep`](#addnodemarkstep)</code>

</dt>

<dd>

Create a node mark step.

###### Overrides

[`Step`](#step).[`constructor`](#constructor-10)

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="mark-1" href="#mark-1">mark</a>: [`Mark`](model.md#mark)</code>

</dt>

<dd>

The mark to add.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="pos" href="#pos">pos</a>: `number`</code>

</dt>

<dd>

The position of the target node.

</dd>

</dl>

#### Methods

##### apply() {#apply-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="apply-3" href="#apply-3">apply</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`StepResult`](#stepresult)</code>

</dt>

<dd>

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

###### Overrides

[`Step`](#step).[`apply`](#apply-16)

</dd>

</dl>

##### getMap() {#getmap-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="getmap-3" href="#getmap-3">getMap</a>(): [`StepMap`](#stepmap-2)</code>

</dt>

<dd>

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

###### Inherited from

[`Step`](#step).[`getMap`](#getmap-16)

</dd>

</dl>

##### invert() {#invert-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="invert-3" href="#invert-3">invert</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`Step`](#step)</code>

</dt>

<dd>

Create an inverted version of this step. Needs the document as it
was before the step as argument.

###### Overrides

[`Step`](#step).[`invert`](#invert-18)

</dd>

</dl>

##### map() {#map-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="map-3" href="#map-3">map</a>(`mapping`: [`Mappable`](#mappable)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

###### Overrides

[`Step`](#step).[`map`](#map-18)

</dd>

</dl>

##### merge() {#merge-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="merge-3" href="#merge-3">merge</a>(`other`: [`Step`](#step)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

###### Inherited from

[`Step`](#step).[`merge`](#merge-16)

</dd>

</dl>

##### toJSON() {#tojson-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="tojson-3" href="#tojson-3">toJSON</a>(): `any`</code>

</dt>

<dd>

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

###### Overrides

[`Step`](#step).[`toJSON`](#tojson-16)

</dd>

</dl>

##### fromJSON() {#fromjson-2}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="fromjson-3" href="#fromjson-3">fromJSON</a>(`schema`: [`Schema`](model.md#schema-3), `json`: `any`): [`Step`](#step)</code>

</dt>

<dd>

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

###### Inherited from

[`Step`](#step).[`fromJSON`](#fromjson-16)

</dd>

</dl>

##### jsonID() {#jsonid-2}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="jsonid-3" href="#jsonid-3">jsonID</a>(`id`: `string`, `stepClass`: `object`): `object`</code>

</dt>

<dd>

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

###### Inherited from

[`Step`](#step).[`jsonID`](#jsonid-16)

</dd>

</dl>

***

### AttrStep {#attrstep}

Update an attribute in a specific node.

#### Extends

- [`Step`](#step)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructorattrstep" href="#constructorattrstep">AttrStep</a>(`pos`: `number`, `attr`: `string`, `value`: `any`): [`AttrStep`](#attrstep)</code>

</dt>

<dd>

Construct an attribute step.

###### Overrides

[`Step`](#step).[`constructor`](#constructor-10)

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="attr" href="#attr">attr</a>: `string`</code>

</dt>

<dd>

The attribute to set.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="pos-1" href="#pos-1">pos</a>: `number`</code>

</dt>

<dd>

The position of the target node.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="value" href="#value">value</a>: `any`</code>

</dt>

</dl>

#### Methods

##### apply() {#apply-4}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="apply-5" href="#apply-5">apply</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`StepResult`](#stepresult)</code>

</dt>

<dd>

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

###### Overrides

[`Step`](#step).[`apply`](#apply-16)

</dd>

</dl>

##### getMap() {#getmap-4}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="getmap-5" href="#getmap-5">getMap</a>(): [`StepMap`](#stepmap-2)</code>

</dt>

<dd>

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

###### Overrides

[`Step`](#step).[`getMap`](#getmap-16)

</dd>

</dl>

##### invert() {#invert-4}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="invert-5" href="#invert-5">invert</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`AttrStep`](#attrstep)</code>

</dt>

<dd>

Create an inverted version of this step. Needs the document as it
was before the step as argument.

###### Overrides

[`Step`](#step).[`invert`](#invert-18)

</dd>

</dl>

##### map() {#map-4}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="map-5" href="#map-5">map</a>(`mapping`: [`Mappable`](#mappable)): `null` \| [`AttrStep`](#attrstep)</code>

</dt>

<dd>

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

###### Overrides

[`Step`](#step).[`map`](#map-18)

</dd>

</dl>

##### merge() {#merge-4}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="merge-5" href="#merge-5">merge</a>(`other`: [`Step`](#step)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

###### Inherited from

[`Step`](#step).[`merge`](#merge-16)

</dd>

</dl>

##### toJSON() {#tojson-4}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="tojson-5" href="#tojson-5">toJSON</a>(): `any`</code>

</dt>

<dd>

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

###### Overrides

[`Step`](#step).[`toJSON`](#tojson-16)

</dd>

</dl>

##### fromJSON() {#fromjson-4}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="fromjson-5" href="#fromjson-5">fromJSON</a>(`schema`: [`Schema`](model.md#schema-3), `json`: `any`): [`AttrStep`](#attrstep)</code>

</dt>

<dd>

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

###### Overrides

[`Step`](#step).[`fromJSON`](#fromjson-16)

</dd>

</dl>

##### jsonID() {#jsonid-4}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="jsonid-5" href="#jsonid-5">jsonID</a>(`id`: `string`, `stepClass`: `object`): `object`</code>

</dt>

<dd>

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

###### Inherited from

[`Step`](#step).[`jsonID`](#jsonid-16)

</dd>

</dl>

***

### DocAttrStep {#docattrstep}

Update an attribute in the doc node.

#### Extends

- [`Step`](#step)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructordocattrstep" href="#constructordocattrstep">DocAttrStep</a>(`attr`: `string`, `value`: `any`): [`DocAttrStep`](#docattrstep)</code>

</dt>

<dd>

Construct an attribute step.

###### Overrides

[`Step`](#step).[`constructor`](#constructor-10)

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="attr-1" href="#attr-1">attr</a>: `string`</code>

</dt>

<dd>

The attribute to set.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="value-1" href="#value-1">value</a>: `any`</code>

</dt>

</dl>

#### Methods

##### apply() {#apply-6}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="apply-7" href="#apply-7">apply</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`StepResult`](#stepresult)</code>

</dt>

<dd>

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

###### Overrides

[`Step`](#step).[`apply`](#apply-16)

</dd>

</dl>

##### getMap() {#getmap-6}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="getmap-7" href="#getmap-7">getMap</a>(): [`StepMap`](#stepmap-2)</code>

</dt>

<dd>

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

###### Overrides

[`Step`](#step).[`getMap`](#getmap-16)

</dd>

</dl>

##### invert() {#invert-6}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="invert-7" href="#invert-7">invert</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`DocAttrStep`](#docattrstep)</code>

</dt>

<dd>

Create an inverted version of this step. Needs the document as it
was before the step as argument.

###### Overrides

[`Step`](#step).[`invert`](#invert-18)

</dd>

</dl>

##### map() {#map-6}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="map-7" href="#map-7">map</a>(`mapping`: [`Mappable`](#mappable)): `this`</code>

</dt>

<dd>

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

###### Overrides

[`Step`](#step).[`map`](#map-18)

</dd>

</dl>

##### merge() {#merge-6}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="merge-7" href="#merge-7">merge</a>(`other`: [`Step`](#step)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

###### Inherited from

[`Step`](#step).[`merge`](#merge-16)

</dd>

</dl>

##### toJSON() {#tojson-6}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="tojson-7" href="#tojson-7">toJSON</a>(): `any`</code>

</dt>

<dd>

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

###### Overrides

[`Step`](#step).[`toJSON`](#tojson-16)

</dd>

</dl>

##### fromJSON() {#fromjson-6}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="fromjson-7" href="#fromjson-7">fromJSON</a>(`schema`: [`Schema`](model.md#schema-3), `json`: `any`): [`DocAttrStep`](#docattrstep)</code>

</dt>

<dd>

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

###### Overrides

[`Step`](#step).[`fromJSON`](#fromjson-16)

</dd>

</dl>

##### jsonID() {#jsonid-6}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="jsonid-7" href="#jsonid-7">jsonID</a>(`id`: `string`, `stepClass`: `object`): `object`</code>

</dt>

<dd>

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

###### Inherited from

[`Step`](#step).[`jsonID`](#jsonid-16)

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

#### Implements

- [`Mappable`](#mappable)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructormapping" href="#constructormapping">Mapping</a>(`maps?`: readonly [`StepMap`](#stepmap-2)[], `from?`: `number`, `to?`: `number`): [`Mapping`](#mapping)</code>

</dt>

<dd>

Create a new mapping with the given position maps.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="from-1" href="#from-1">from</a>: `number`</code>

</dt>

<dd>

The starting position in the `maps` array, used when `map` or
`mapResult` is called.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="to-1" href="#to-1">to</a>: `number`</code>

</dt>

<dd>

The end position in the `maps` array.

</dd>

</dl>

#### Accessors

##### maps {#maps}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="mapsmaps" href="#mapsmaps">maps</a>(): readonly [`StepMap`](#stepmap-2)[]</code>

The step maps in this mapping.

###### Returns

readonly [`StepMap`](#stepmap-2)[]

#### Methods

##### appendMap() {#appendmap}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="appendmap-1" href="#appendmap-1">appendMap</a>(`map`: [`StepMap`](#stepmap-2), `mirrors?`: `number`): `void`</code>

</dt>

<dd>

Add a step map to the end of this mapping. If `mirrors` is
given, it should be the index of the step map that is the mirror
image of this one.

</dd>

</dl>

##### appendMapping() {#appendmapping}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="appendmapping-1" href="#appendmapping-1">appendMapping</a>(`mapping`: [`Mapping`](#mapping)): `void`</code>

</dt>

<dd>

Add all the step maps in a given mapping to this one (preserving
mirroring information).

</dd>

</dl>

##### appendMappingInverted() {#appendmappinginverted}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="appendmappinginverted-1" href="#appendmappinginverted-1">appendMappingInverted</a>(`mapping`: [`Mapping`](#mapping)): `void`</code>

</dt>

<dd>

Append the inverse of the given mapping to this one.

</dd>

</dl>

##### getMirror() {#getmirror}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="getmirror-1" href="#getmirror-1">getMirror</a>(`n`: `number`): `undefined` \| `number`</code>

</dt>

<dd>

Finds the offset of the step map that mirrors the map at the
given offset, in this mapping (as per the second argument to
`appendMap`).

</dd>

</dl>

##### invert() {#invert-8}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="invert-9" href="#invert-9">invert</a>(): [`Mapping`](#mapping)</code>

</dt>

<dd>

Create an inverted version of this mapping.

</dd>

</dl>

##### map() {#map-8}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="map-9" href="#map-9">map</a>(`pos`: `number`, `assoc?`: `number`): `number`</code>

</dt>

<dd>

Map a position through this mapping.

###### Implementation of

[`Mappable`](#mappable).[`map`](#map-22)

</dd>

</dl>

##### mapResult() {#mapresult}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="mapresult-1" href="#mapresult-1">mapResult</a>(`pos`: `number`, `assoc?`: `number`): [`MapResult`](#mapresult-2)</code>

</dt>

<dd>

Map a position through this mapping, returning a mapping
result.

###### Implementation of

[`Mappable`](#mappable).[`mapResult`](#mapresult-5)

</dd>

</dl>

##### slice() {#slice}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="slice-1" href="#slice-1">slice</a>(`from?`: `number`, `to?`: `number`): [`Mapping`](#mapping)</code>

</dt>

<dd>

Create a mapping that maps only through a part of this one.

</dd>

</dl>

***

### MapResult {#mapresult-2}

An object representing a mapped position with extra
information.

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructormapresult" href="#constructormapresult">MapResult</a>(): [`MapResult`](#mapresult-2)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="pos-2" href="#pos-2">pos</a>: `number`</code>

</dt>

<dd>

The mapped version of the position.

</dd>

</dl>

#### Accessors

##### deleted {#deleted}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="deleteddeleted" href="#deleteddeleted">deleted</a>(): `boolean`</code>

Tells you whether the position was deleted, that is, whether the
step removed the token on the side queried (via the `assoc`)
argument from the document.

###### Returns

`boolean`

##### deletedAcross {#deletedacross}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="deletedacrossdeletedacross" href="#deletedacrossdeletedacross">deletedAcross</a>(): `boolean`</code>

Tells whether any of the steps mapped through deletes across the
position (including both the token before and after the
position).

###### Returns

`boolean`

##### deletedAfter {#deletedafter}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="deletedafterdeletedafter" href="#deletedafterdeletedafter">deletedAfter</a>(): `boolean`</code>

True when the token after the mapped position was deleted.

###### Returns

`boolean`

##### deletedBefore {#deletedbefore}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="deletedbeforedeletedbefore" href="#deletedbeforedeletedbefore">deletedBefore</a>(): `boolean`</code>

Tells you whether the token before the mapped position was deleted.

###### Returns

`boolean`

***

### RemoveMarkStep {#removemarkstep}

Remove a mark from all inline content between two positions.

#### Extends

- [`Step`](#step)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructorremovemarkstep" href="#constructorremovemarkstep">RemoveMarkStep</a>(`from`: `number`, `to`: `number`, `mark`: [`Mark`](model.md#mark)): [`RemoveMarkStep`](#removemarkstep)</code>

</dt>

<dd>

Create a mark-removing step.

###### Overrides

[`Step`](#step).[`constructor`](#constructor-10)

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="from-2" href="#from-2">from</a>: `number`</code>

</dt>

<dd>

The start of the unmarked range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="mark-2" href="#mark-2">mark</a>: [`Mark`](model.md#mark)</code>

</dt>

<dd>

The mark to remove.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="to-2" href="#to-2">to</a>: `number`</code>

</dt>

<dd>

The end of the unmarked range.

</dd>

</dl>

#### Methods

##### apply() {#apply-8}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="apply-9" href="#apply-9">apply</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`StepResult`](#stepresult)</code>

</dt>

<dd>

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

###### Overrides

[`Step`](#step).[`apply`](#apply-16)

</dd>

</dl>

##### getMap() {#getmap-8}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="getmap-9" href="#getmap-9">getMap</a>(): [`StepMap`](#stepmap-2)</code>

</dt>

<dd>

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

###### Inherited from

[`Step`](#step).[`getMap`](#getmap-16)

</dd>

</dl>

##### invert() {#invert-10}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="invert-11" href="#invert-11">invert</a>(): [`Step`](#step)</code>

</dt>

<dd>

Create an inverted version of this step. Needs the document as it
was before the step as argument.

###### Overrides

[`Step`](#step).[`invert`](#invert-18)

</dd>

</dl>

##### map() {#map-10}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="map-11" href="#map-11">map</a>(`mapping`: [`Mappable`](#mappable)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

###### Overrides

[`Step`](#step).[`map`](#map-18)

</dd>

</dl>

##### merge() {#merge-8}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="merge-9" href="#merge-9">merge</a>(`other`: [`Step`](#step)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

###### Overrides

[`Step`](#step).[`merge`](#merge-16)

</dd>

</dl>

##### toJSON() {#tojson-8}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="tojson-9" href="#tojson-9">toJSON</a>(): `any`</code>

</dt>

<dd>

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

###### Overrides

[`Step`](#step).[`toJSON`](#tojson-16)

</dd>

</dl>

##### fromJSON() {#fromjson-8}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="fromjson-9" href="#fromjson-9">fromJSON</a>(`schema`: [`Schema`](model.md#schema-3), `json`: `any`): [`Step`](#step)</code>

</dt>

<dd>

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

###### Inherited from

[`Step`](#step).[`fromJSON`](#fromjson-16)

</dd>

</dl>

##### jsonID() {#jsonid-8}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="jsonid-9" href="#jsonid-9">jsonID</a>(`id`: `string`, `stepClass`: `object`): `object`</code>

</dt>

<dd>

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

###### Inherited from

[`Step`](#step).[`jsonID`](#jsonid-16)

</dd>

</dl>

***

### RemoveNodeMarkStep {#removenodemarkstep}

Remove a mark from a specific node.

#### Extends

- [`Step`](#step)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructorremovenodemarkstep" href="#constructorremovenodemarkstep">RemoveNodeMarkStep</a>(`pos`: `number`, `mark`: [`Mark`](model.md#mark)): [`RemoveNodeMarkStep`](#removenodemarkstep)</code>

</dt>

<dd>

Create a mark-removing step.

###### Overrides

[`Step`](#step).[`constructor`](#constructor-10)

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="mark-3" href="#mark-3">mark</a>: [`Mark`](model.md#mark)</code>

</dt>

<dd>

The mark to remove.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="pos-3" href="#pos-3">pos</a>: `number`</code>

</dt>

<dd>

The position of the target node.

</dd>

</dl>

#### Methods

##### apply() {#apply-10}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="apply-11" href="#apply-11">apply</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`StepResult`](#stepresult)</code>

</dt>

<dd>

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

###### Overrides

[`Step`](#step).[`apply`](#apply-16)

</dd>

</dl>

##### getMap() {#getmap-10}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="getmap-11" href="#getmap-11">getMap</a>(): [`StepMap`](#stepmap-2)</code>

</dt>

<dd>

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

###### Inherited from

[`Step`](#step).[`getMap`](#getmap-16)

</dd>

</dl>

##### invert() {#invert-12}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="invert-13" href="#invert-13">invert</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`Step`](#step)</code>

</dt>

<dd>

Create an inverted version of this step. Needs the document as it
was before the step as argument.

###### Overrides

[`Step`](#step).[`invert`](#invert-18)

</dd>

</dl>

##### map() {#map-12}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="map-13" href="#map-13">map</a>(`mapping`: [`Mappable`](#mappable)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

###### Overrides

[`Step`](#step).[`map`](#map-18)

</dd>

</dl>

##### merge() {#merge-10}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="merge-11" href="#merge-11">merge</a>(`other`: [`Step`](#step)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

###### Inherited from

[`Step`](#step).[`merge`](#merge-16)

</dd>

</dl>

##### toJSON() {#tojson-10}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="tojson-11" href="#tojson-11">toJSON</a>(): `any`</code>

</dt>

<dd>

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

###### Overrides

[`Step`](#step).[`toJSON`](#tojson-16)

</dd>

</dl>

##### fromJSON() {#fromjson-10}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="fromjson-11" href="#fromjson-11">fromJSON</a>(`schema`: [`Schema`](model.md#schema-3), `json`: `any`): [`Step`](#step)</code>

</dt>

<dd>

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

###### Inherited from

[`Step`](#step).[`fromJSON`](#fromjson-16)

</dd>

</dl>

##### jsonID() {#jsonid-10}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="jsonid-11" href="#jsonid-11">jsonID</a>(`id`: `string`, `stepClass`: `object`): `object`</code>

</dt>

<dd>

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

###### Inherited from

[`Step`](#step).[`jsonID`](#jsonid-16)

</dd>

</dl>

***

### ReplaceAroundStep {#replacearoundstep}

Replace a part of the document with a slice of content, but
preserve a range of the replaced content by moving it into the
slice.

#### Extends

- [`Step`](#step)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructorreplacearoundstep" href="#constructorreplacearoundstep">ReplaceAroundStep</a>(`from`: `number`, `to`: `number`, `gapFrom`: `number`, `gapTo`: `number`, `slice`: [`Slice`](model.md#slice-2), `insert`: `number`): [`ReplaceAroundStep`](#replacearoundstep)</code>

</dt>

<dd>

Create a replace-around step with the given range and gap.
`insert` should be the point in the slice into which the content
of the gap should be moved. `structure` has the same meaning as
it has in the [`ReplaceStep`](https://prosemirror.net/docs/ref/#transform.ReplaceStep) class.

###### Overrides

[`Step`](#step).[`constructor`](#constructor-10)

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="from-3" href="#from-3">from</a>: `number`</code>

</dt>

<dd>

The start position of the replaced range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="gapfrom" href="#gapfrom">gapFrom</a>: `number`</code>

</dt>

<dd>

The start of preserved range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="gapto" href="#gapto">gapTo</a>: `number`</code>

</dt>

<dd>

The end of preserved range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="insert" href="#insert">insert</a>: `number`</code>

</dt>

<dd>

The position in the slice where the preserved range should be
inserted.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="slice-2" href="#slice-2">slice</a>: [`Slice`](model.md#slice-2)</code>

</dt>

<dd>

The slice to insert.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="to-3" href="#to-3">to</a>: `number`</code>

</dt>

<dd>

The end position of the replaced range.

</dd>

</dl>

#### Methods

##### apply() {#apply-12}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="apply-13" href="#apply-13">apply</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`StepResult`](#stepresult)</code>

</dt>

<dd>

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

###### Overrides

[`Step`](#step).[`apply`](#apply-16)

</dd>

</dl>

##### getMap() {#getmap-12}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="getmap-13" href="#getmap-13">getMap</a>(): [`StepMap`](#stepmap-2)</code>

</dt>

<dd>

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

###### Overrides

[`Step`](#step).[`getMap`](#getmap-16)

</dd>

</dl>

##### invert() {#invert-14}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="invert-15" href="#invert-15">invert</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`ReplaceAroundStep`](#replacearoundstep)</code>

</dt>

<dd>

Create an inverted version of this step. Needs the document as it
was before the step as argument.

###### Overrides

[`Step`](#step).[`invert`](#invert-18)

</dd>

</dl>

##### map() {#map-14}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="map-15" href="#map-15">map</a>(`mapping`: [`Mappable`](#mappable)): `null` \| [`ReplaceAroundStep`](#replacearoundstep)</code>

</dt>

<dd>

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

###### Overrides

[`Step`](#step).[`map`](#map-18)

</dd>

</dl>

##### merge() {#merge-12}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="merge-13" href="#merge-13">merge</a>(`other`: [`Step`](#step)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

###### Inherited from

[`Step`](#step).[`merge`](#merge-16)

</dd>

</dl>

##### toJSON() {#tojson-12}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="tojson-13" href="#tojson-13">toJSON</a>(): `any`</code>

</dt>

<dd>

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

###### Overrides

[`Step`](#step).[`toJSON`](#tojson-16)

</dd>

</dl>

##### fromJSON() {#fromjson-12}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="fromjson-13" href="#fromjson-13">fromJSON</a>(`schema`: [`Schema`](model.md#schema-3), `json`: `any`): [`Step`](#step)</code>

</dt>

<dd>

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

###### Inherited from

[`Step`](#step).[`fromJSON`](#fromjson-16)

</dd>

</dl>

##### jsonID() {#jsonid-12}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="jsonid-13" href="#jsonid-13">jsonID</a>(`id`: `string`, `stepClass`: `object`): `object`</code>

</dt>

<dd>

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

###### Inherited from

[`Step`](#step).[`jsonID`](#jsonid-16)

</dd>

</dl>

***

### ReplaceStep {#replacestep}

Replace a part of the document with a slice of new content.

#### Extends

- [`Step`](#step)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructorreplacestep" href="#constructorreplacestep">ReplaceStep</a>(`from`: `number`, `to`: `number`, `slice`: [`Slice`](model.md#slice-2)): [`ReplaceStep`](#replacestep)</code>

</dt>

<dd>

The given `slice` should fit the 'gap' between `from` and
`to`—the depths must line up, and the surrounding nodes must be
able to be joined with the open sides of the slice. When
`structure` is true, the step will fail if the content between
from and to is not just a sequence of closing and then opening
tokens (this is to guard against rebased replace steps
overwriting something they weren't supposed to).

###### Overrides

[`Step`](#step).[`constructor`](#constructor-10)

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="from-4" href="#from-4">from</a>: `number`</code>

</dt>

<dd>

The start position of the replaced range.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="slice-3" href="#slice-3">slice</a>: [`Slice`](model.md#slice-2)</code>

</dt>

<dd>

The slice to insert.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="to-4" href="#to-4">to</a>: `number`</code>

</dt>

<dd>

The end position of the replaced range.

</dd>

</dl>

#### Methods

##### apply() {#apply-14}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="apply-15" href="#apply-15">apply</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`StepResult`](#stepresult)</code>

</dt>

<dd>

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

###### Overrides

[`Step`](#step).[`apply`](#apply-16)

</dd>

</dl>

##### getMap() {#getmap-14}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="getmap-15" href="#getmap-15">getMap</a>(): [`StepMap`](#stepmap-2)</code>

</dt>

<dd>

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

###### Overrides

[`Step`](#step).[`getMap`](#getmap-16)

</dd>

</dl>

##### invert() {#invert-16}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="invert-17" href="#invert-17">invert</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`ReplaceStep`](#replacestep)</code>

</dt>

<dd>

Create an inverted version of this step. Needs the document as it
was before the step as argument.

###### Overrides

[`Step`](#step).[`invert`](#invert-18)

</dd>

</dl>

##### map() {#map-16}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="map-17" href="#map-17">map</a>(`mapping`: [`Mappable`](#mappable)): `null` \| [`ReplaceStep`](#replacestep)</code>

</dt>

<dd>

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

###### Overrides

[`Step`](#step).[`map`](#map-18)

</dd>

</dl>

##### merge() {#merge-14}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="merge-15" href="#merge-15">merge</a>(`other`: [`Step`](#step)): `null` \| [`ReplaceStep`](#replacestep)</code>

</dt>

<dd>

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

###### Overrides

[`Step`](#step).[`merge`](#merge-16)

</dd>

</dl>

##### toJSON() {#tojson-14}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="tojson-15" href="#tojson-15">toJSON</a>(): `any`</code>

</dt>

<dd>

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

###### Overrides

[`Step`](#step).[`toJSON`](#tojson-16)

</dd>

</dl>

##### fromJSON() {#fromjson-14}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="fromjson-15" href="#fromjson-15">fromJSON</a>(`schema`: [`Schema`](model.md#schema-3), `json`: `any`): [`Step`](#step)</code>

</dt>

<dd>

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

###### Inherited from

[`Step`](#step).[`fromJSON`](#fromjson-16)

</dd>

</dl>

##### jsonID() {#jsonid-14}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="jsonid-15" href="#jsonid-15">jsonID</a>(`id`: `string`, `stepClass`: `object`): `object`</code>

</dt>

<dd>

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

###### Inherited from

[`Step`](#step).[`jsonID`](#jsonid-16)

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

#### Extended by

- [`AddMarkStep`](#addmarkstep)
- [`AddNodeMarkStep`](#addnodemarkstep)
- [`AttrStep`](#attrstep)
- [`DocAttrStep`](#docattrstep)
- [`RemoveMarkStep`](#removemarkstep)
- [`RemoveNodeMarkStep`](#removenodemarkstep)
- [`ReplaceAroundStep`](#replacearoundstep)
- [`ReplaceStep`](#replacestep)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructorstep" href="#constructorstep">Step</a>(): [`Step`](#step)</code>

</dt>

</dl>

#### Methods

##### apply() {#apply-16}

<dl>

<dt>

<code data-typedoc-declaration><i>abstract</i> <a id="apply-17" href="#apply-17">apply</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`StepResult`](#stepresult)</code>

</dt>

<dd>

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

</dd>

</dl>

##### getMap() {#getmap-16}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="getmap-17" href="#getmap-17">getMap</a>(): [`StepMap`](#stepmap-2)</code>

</dt>

<dd>

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

</dd>

</dl>

##### invert() {#invert-18}

<dl>

<dt>

<code data-typedoc-declaration><i>abstract</i> <a id="invert-19" href="#invert-19">invert</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`Step`](#step)</code>

</dt>

<dd>

Create an inverted version of this step. Needs the document as it
was before the step as argument.

</dd>

</dl>

##### map() {#map-18}

<dl>

<dt>

<code data-typedoc-declaration><i>abstract</i> <a id="map-19" href="#map-19">map</a>(`mapping`: [`Mappable`](#mappable)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

</dd>

</dl>

##### merge() {#merge-16}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="merge-17" href="#merge-17">merge</a>(`other`: [`Step`](#step)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

</dd>

</dl>

##### toJSON() {#tojson-16}

<dl>

<dt>

<code data-typedoc-declaration><i>abstract</i> <a id="tojson-17" href="#tojson-17">toJSON</a>(): `any`</code>

</dt>

<dd>

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

</dd>

</dl>

##### fromJSON() {#fromjson-16}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="fromjson-17" href="#fromjson-17">fromJSON</a>(`schema`: [`Schema`](model.md#schema-3), `json`: `any`): [`Step`](#step)</code>

</dt>

<dd>

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

</dd>

</dl>

##### jsonID() {#jsonid-16}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="jsonid-17" href="#jsonid-17">jsonID</a>(`id`: `string`, `stepClass`: `object`): `object`</code>

</dt>

<dd>

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

</dd>

</dl>

***

### StepMap {#stepmap-2}

A map describing the deletions and insertions made by a step, which
can be used to find the correspondence between positions in the
pre-step version of a document and the same position in the
post-step version.

#### Implements

- [`Mappable`](#mappable)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructorstepmap" href="#constructorstepmap">StepMap</a>(): [`StepMap`](#stepmap-2)</code>

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

<code data-typedoc-declaration><i>static</i> <a id="empty" href="#empty">empty</a>: [`StepMap`](#stepmap-2)</code>

</dt>

<dd>

A StepMap that contains no changed ranges.

</dd>

</dl>

#### Methods

##### forEach() {#foreach}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="foreach-1" href="#foreach-1">forEach</a>(`f`: (`oldStart`: `number`, `oldEnd`: `number`, `newStart`: `number`, `newEnd`: `number`) => `void`): `void`</code>

</dt>

<dd>

Calls the given function on each of the changed ranges included in
this map.

</dd>

</dl>

##### invert() {#invert-20}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="invert-21" href="#invert-21">invert</a>(): [`StepMap`](#stepmap-2)</code>

</dt>

<dd>

Create an inverted version of this map. The result can be used to
map positions in the post-step document to the pre-step document.

</dd>

</dl>

##### map() {#map-20}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="map-21" href="#map-21">map</a>(`pos`: `number`, `assoc?`: `number`): `number`</code>

</dt>

<dd>

Map a position through this object. When given, `assoc` (should
be -1 or 1, defaults to 1) determines with which side the
position is associated, which determines in which direction to
move when a chunk of content is inserted at the mapped position.

###### Implementation of

[`Mappable`](#mappable).[`map`](#map-22)

</dd>

</dl>

##### mapResult() {#mapresult-3}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="mapresult-4" href="#mapresult-4">mapResult</a>(`pos`: `number`, `assoc?`: `number`): [`MapResult`](#mapresult-2)</code>

</dt>

<dd>

Map a position, and return an object containing additional
information about the mapping. The result's `deleted` field tells
you whether the position was deleted (completely enclosed in a
replaced range) during the mapping. When content on only one side
is deleted, the position itself is only considered deleted when
`assoc` points in the direction of the deleted content.

###### Implementation of

[`Mappable`](#mappable).[`mapResult`](#mapresult-5)

</dd>

</dl>

##### offset() {#offset}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="offset-1" href="#offset-1">offset</a>(`n`: `number`): [`StepMap`](#stepmap-2)</code>

</dt>

<dd>

Create a map that moves all positions by offset `n` (which may be
negative). This can be useful when applying steps meant for a
sub-document to a larger document, or vice-versa.

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

<code data-typedoc-declaration><i></i> new <a id="constructorstepresult" href="#constructorstepresult">StepResult</a>(): [`StepResult`](#stepresult)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="doc" href="#doc">doc</a>: `null` \| [`ProseMirrorNode`](model.md#prosemirrornode)</code>

</dt>

<dd>

The transformed document, if successful.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="failed" href="#failed">failed</a>: `null` \| `string`</code>

</dt>

<dd>

The failure message, if unsuccessful.

</dd>

</dl>

#### Methods

##### fail() {#fail}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="fail-1" href="#fail-1">fail</a>(`message`: `string`): [`StepResult`](#stepresult)</code>

</dt>

<dd>

Create a failed step result.

</dd>

</dl>

##### fromReplace() {#fromreplace}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="fromreplace-1" href="#fromreplace-1">fromReplace</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `from`: `number`, `to`: `number`, `slice`: [`Slice`](model.md#slice-2)): [`StepResult`](#stepresult)</code>

</dt>

<dd>

Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
arguments. Create a successful result if it succeeds, and a
failed one if it throws a `ReplaceError`.

</dd>

</dl>

##### ok() {#ok}

<dl>

<dt>

<code data-typedoc-declaration><i>static</i> <a id="ok-1" href="#ok-1">ok</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`StepResult`](#stepresult)</code>

</dt>

<dd>

Create a successful step result.

</dd>

</dl>

***

### Transform {#transform}

Abstraction to build up and track an array of
[steps](https://prosemirror.net/docs/ref/#transform.Step) representing a document transformation.

Most transforming methods return the `Transform` object itself, so
that they can be chained.

#### Extended by

- [`Transaction`](state.md#transaction)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructortransform" href="#constructortransform">Transform</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode)): [`Transform`](#transform)</code>

</dt>

<dd>

Create a transform that starts with the given document.

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

<code data-typedoc-declaration><i>readonly</i> <a id="mapping-1" href="#mapping-1">mapping</a>: [`Mapping`](#mapping)</code>

</dt>

<dd>

A mapping with the maps for each of the steps in this transform.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i>readonly</i> <a id="steps" href="#steps">steps</a>: [`Step`](#step)[]</code>

</dt>

<dd>

The steps in this transform.

</dd>

</dl>

#### Accessors

##### before {#before}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="beforebefore" href="#beforebefore">before</a>(): [`ProseMirrorNode`](model.md#prosemirrornode)</code>

The starting document.

###### Returns

[`ProseMirrorNode`](model.md#prosemirrornode)

##### docChanged {#docchanged}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="docchangeddocchanged" href="#docchangeddocchanged">docChanged</a>(): `boolean`</code>

True when the document has been changed (when there are any
steps).

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

</dd>

</dl>

##### addNodeMark() {#addnodemark}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="addnodemark-1" href="#addnodemark-1">addNodeMark</a>(`pos`: `number`, `mark`: [`Mark`](model.md#mark)): `this`</code>

</dt>

<dd>

Add a mark to the node at position `pos`.

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

</dd>

</dl>

##### delete() {#delete}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="delete-1" href="#delete-1">delete</a>(`from`: `number`, `to`: `number`): `this`</code>

</dt>

<dd>

Delete the content between the given positions.

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

</dd>

</dl>

##### insert() {#insert-1}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="insert-2" href="#insert-2">insert</a>(`pos`: `number`, `content`: [`ProseMirrorNode`](model.md#prosemirrornode) \| [`ProseMirrorFragment`](model.md#prosemirrorfragment) \| readonly [`ProseMirrorNode`](model.md#prosemirrornode)[]): `this`</code>

</dt>

<dd>

Insert the given content at the given position.

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

</dd>

</dl>

##### maybeStep() {#maybestep}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="maybestep-1" href="#maybestep-1">maybeStep</a>(`step`: [`Step`](#step)): [`StepResult`](#stepresult)</code>

</dt>

<dd>

Try to apply a step in this transformation, ignoring it if it
fails. Returns the step result.

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

</dd>

</dl>

##### replace() {#replace}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="replace-1" href="#replace-1">replace</a>(`from`: `number`, `to?`: `number`, `slice?`: [`Slice`](model.md#slice-2)): `this`</code>

</dt>

<dd>

Replace the part of the document between `from` and `to` with the
given `slice`.

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

</dd>

</dl>

##### replaceWith() {#replacewith}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="replacewith-1" href="#replacewith-1">replaceWith</a>(`from`: `number`, `to`: `number`, `content`: [`ProseMirrorNode`](model.md#prosemirrornode) \| [`ProseMirrorFragment`](model.md#prosemirrorfragment) \| readonly [`ProseMirrorNode`](model.md#prosemirrornode)[]): `this`</code>

</dt>

<dd>

Replace the given range with the given content, which may be a
fragment, node, or array of nodes.

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

</dd>

</dl>

##### setDocAttribute() {#setdocattribute}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="setdocattribute-1" href="#setdocattribute-1">setDocAttribute</a>(`attr`: `string`, `value`: `any`): `this`</code>

</dt>

<dd>

Set a single attribute on the document to a new value.

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

</dd>

</dl>

##### step() {#step-1}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="step-2" href="#step-2">step</a>(`step`: [`Step`](#step)): `this`</code>

</dt>

<dd>

Apply a new step in this transform, saving the result. Throws an
error when the step fails.

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

</dd>

</dl>

## Interfaces

### Mappable {#mappable}

There are several things that positions can be mapped through.
Such objects conform to this interface.

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="map-22" href="#map-22">map</a>: (`pos`: `number`, `assoc?`: `number`) => `number`</code>

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

<code data-typedoc-declaration><i></i> <a id="mapresult-5" href="#mapresult-5">mapResult</a>: (`pos`: `number`, `assoc?`: `number`) => [`MapResult`](#mapresult-2)</code>

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

### canJoin() {#canjoin}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="canjoin-2" href="#canjoin-2">canJoin</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `pos`: `number`): `boolean`</code>

</dt>

<dd>

Test whether the blocks before and after a given position can be
joined.

</dd>

</dl>

***

### canSplit() {#cansplit}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="cansplit-2" href="#cansplit-2">canSplit</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `pos`: `number`, `depth?`: `number`, `typesAfter?`: (`null` \| \{ `attrs?`: `null` \| [`Attrs`](model.md#attrs-7); `type`: [`NodeType`](model.md#nodetype); \})[]): `boolean`</code>

</dt>

<dd>

Check whether splitting at the given position is allowed.

</dd>

</dl>

***

### dropPoint() {#droppoint}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="droppoint-2" href="#droppoint-2">dropPoint</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `pos`: `number`, `slice`: [`Slice`](model.md#slice-2)): `null` \| `number`</code>

</dt>

<dd>

Finds a position at or around the given position where the given
slice can be inserted. Will look at parent nodes' nearest boundary
and try there, even if the original position wasn't directly at the
start or end of that node. Returns null when no position was found.

</dd>

</dl>

***

### findWrapping() {#findwrapping}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="findwrapping-2" href="#findwrapping-2">findWrapping</a>(`range`: [`NodeRange`](model.md#noderange), `nodeType`: [`NodeType`](model.md#nodetype), `attrs?`: `null` \| [`Attrs`](model.md#attrs-7), `innerRange?`: [`NodeRange`](model.md#noderange)): `null` \| `object`[]</code>

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

### insertPoint() {#insertpoint}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="insertpoint-2" href="#insertpoint-2">insertPoint</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `pos`: `number`, `nodeType`: [`NodeType`](model.md#nodetype)): `null` \| `number`</code>

</dt>

<dd>

Try to find a point where a node of the given type can be inserted
near `pos`, by searching up the node hierarchy when `pos` itself
isn't a valid place but is at the start or end of a node. Return
null if no position was found.

</dd>

</dl>

***

### joinPoint() {#joinpoint}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="joinpoint-2" href="#joinpoint-2">joinPoint</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `pos`: `number`, `dir?`: `number`): `undefined` \| `number`</code>

</dt>

<dd>

Find an ancestor of the given position that can be joined to the
block before (or after if `dir` is positive). Returns the joinable
point, if any.

</dd>

</dl>

***

### liftTarget() {#lifttarget}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="lifttarget-2" href="#lifttarget-2">liftTarget</a>(`range`: [`NodeRange`](model.md#noderange)): `null` \| `number`</code>

</dt>

<dd>

Try to find a target depth to which the content in the given range
can be lifted. Will not go across
[isolating](https://prosemirror.net/docs/ref/#model.NodeSpec.isolating) parent nodes.

</dd>

</dl>

***

### replaceStep() {#replacestep-1}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="replacestep-3" href="#replacestep-3">replaceStep</a>(`doc`: [`ProseMirrorNode`](model.md#prosemirrornode), `from`: `number`, `to?`: `number`, `slice?`: [`Slice`](model.md#slice-2)): `null` \| [`Step`](#step)</code>

</dt>

<dd>

‘Fit’ a slice into a given position in the document, producing a
[step](https://prosemirror.net/docs/ref/#transform.Step) that inserts it. Will return null if
there's no meaningful way to insert the slice here, or inserting it
would be a no-op (an empty slice over an empty range).

</dd>

</dl>
