---
title: prosekit/pm/transform
sidebar:
  label: pm/transform
---

<!-- DEBUG memberWithGroups 1 -->

Re-exports from [prosemirror-transform](https://github.com/ProseMirror/prosemirror-transform).

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Classes

### AddMarkStep {#addmarkstep}

<!-- DEBUG memberWithGroups 1 -->

Add a mark to all inline content between two positions.

#### Extends

- [`Step`](#step)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new AddMarkStep(
   from: number, 
   to: number, 
   mark: Mark): AddMarkStep;
```

Create a mark step.

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

The start of the marked range.

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

The end of the marked range.

</td>
</tr>
<tr>
<td>

`mark`

</td>
<td>

[`Mark`](model.md#mark)

</td>
<td>

The mark to add.

</td>
</tr>
</tbody>
</table>

###### Returns

[`AddMarkStep`](#addmarkstep)

###### Overrides

[`Step`](#step).[`constructor`](#constructor-10)

#### Properties

##### from {#from}

```ts
readonly from: number;
```

The start of the marked range.

##### mark {#mark}

```ts
readonly mark: Mark;
```

The mark to add.

##### to {#to}

```ts
readonly to: number;
```

The end of the marked range.

#### Methods

##### apply() {#apply}

```ts
apply(doc: ProseMirrorNode): StepResult;
```

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

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
</tbody>
</table>

###### Returns

[`StepResult`](#stepresult)

###### Overrides

[`Step`](#step).[`apply`](#apply-16)

##### getMap() {#getmap}

```ts
getMap(): StepMap;
```

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

###### Returns

[`StepMap`](#stepmap-2)

###### Inherited from

[`Step`](#step).[`getMap`](#getmap-16)

##### invert() {#invert}

```ts
invert(): Step;
```

Create an inverted version of this step. Needs the document as it
was before the step as argument.

###### Returns

[`Step`](#step)

###### Overrides

[`Step`](#step).[`invert`](#invert-18)

##### map() {#map}

```ts
map(mapping: Mappable): null | Step;
```

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

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

[`Mappable`](#mappable)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`Step`](#step)

###### Overrides

[`Step`](#step).[`map`](#map-18)

##### merge() {#merge}

```ts
merge(other: Step): null | Step;
```

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

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

[`Step`](#step)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`Step`](#step)

###### Overrides

[`Step`](#step).[`merge`](#merge-16)

##### toJSON() {#tojson}

```ts
toJSON(): any;
```

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

###### Returns

`any`

###### Overrides

[`Step`](#step).[`toJSON`](#tojson-16)

##### fromJSON() {#fromjson}

```ts
static fromJSON(schema: Schema, json: any): Step;
```

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

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

[`Schema`](model.md#schema-3)

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

[`Step`](#step)

###### Inherited from

[`Step`](#step).[`fromJSON`](#fromjson-16)

##### jsonID() {#jsonid}

```ts
static jsonID(id: string, stepClass: object): object;
```

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

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

`id`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`stepClass`

</td>
<td>

\{ `fromJSON`: [`Step`](#step); \}

</td>
</tr>
<tr>
<td>

`stepClass.fromJSON`

</td>
</tr>
</tbody>
</table>

###### Returns

`object`

###### fromJSON()

```ts
fromJSON(schema: Schema, json: any): Step;
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

`schema`

</td>
<td>

[`Schema`](model.md#schema-3)

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

[`Step`](#step)

###### Inherited from

[`Step`](#step).[`jsonID`](#jsonid-16)

<!-- DEBUG memberWithGroups 10 -->

***

### AddNodeMarkStep {#addnodemarkstep}

<!-- DEBUG memberWithGroups 1 -->

Add a mark to a specific node.

#### Extends

- [`Step`](#step)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new AddNodeMarkStep(pos: number, mark: Mark): AddNodeMarkStep;
```

Create a node mark step.

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

The position of the target node.

</td>
</tr>
<tr>
<td>

`mark`

</td>
<td>

[`Mark`](model.md#mark)

</td>
<td>

The mark to add.

</td>
</tr>
</tbody>
</table>

###### Returns

[`AddNodeMarkStep`](#addnodemarkstep)

###### Overrides

[`Step`](#step).[`constructor`](#constructor-10)

#### Properties

##### mark {#mark-1}

```ts
readonly mark: Mark;
```

The mark to add.

##### pos {#pos}

```ts
readonly pos: number;
```

The position of the target node.

#### Methods

##### apply() {#apply-2}

```ts
apply(doc: ProseMirrorNode): StepResult;
```

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

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
</tbody>
</table>

###### Returns

[`StepResult`](#stepresult)

###### Overrides

[`Step`](#step).[`apply`](#apply-16)

##### getMap() {#getmap-2}

```ts
getMap(): StepMap;
```

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

###### Returns

[`StepMap`](#stepmap-2)

###### Inherited from

[`Step`](#step).[`getMap`](#getmap-16)

##### invert() {#invert-2}

```ts
invert(doc: ProseMirrorNode): Step;
```

Create an inverted version of this step. Needs the document as it
was before the step as argument.

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
</tbody>
</table>

###### Returns

[`Step`](#step)

###### Overrides

[`Step`](#step).[`invert`](#invert-18)

##### map() {#map-2}

```ts
map(mapping: Mappable): null | Step;
```

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

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

[`Mappable`](#mappable)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`Step`](#step)

###### Overrides

[`Step`](#step).[`map`](#map-18)

##### merge() {#merge-2}

```ts
merge(other: Step): null | Step;
```

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

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

[`Step`](#step)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`Step`](#step)

###### Inherited from

[`Step`](#step).[`merge`](#merge-16)

##### toJSON() {#tojson-2}

```ts
toJSON(): any;
```

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

###### Returns

`any`

###### Overrides

[`Step`](#step).[`toJSON`](#tojson-16)

##### fromJSON() {#fromjson-2}

```ts
static fromJSON(schema: Schema, json: any): Step;
```

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

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

[`Schema`](model.md#schema-3)

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

[`Step`](#step)

###### Inherited from

[`Step`](#step).[`fromJSON`](#fromjson-16)

##### jsonID() {#jsonid-2}

```ts
static jsonID(id: string, stepClass: object): object;
```

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

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

`id`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`stepClass`

</td>
<td>

\{ `fromJSON`: [`Step`](#step); \}

</td>
</tr>
<tr>
<td>

`stepClass.fromJSON`

</td>
</tr>
</tbody>
</table>

###### Returns

`object`

###### fromJSON()

```ts
fromJSON(schema: Schema, json: any): Step;
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

`schema`

</td>
<td>

[`Schema`](model.md#schema-3)

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

[`Step`](#step)

###### Inherited from

[`Step`](#step).[`jsonID`](#jsonid-16)

<!-- DEBUG memberWithGroups 10 -->

***

### AttrStep {#attrstep}

<!-- DEBUG memberWithGroups 1 -->

Update an attribute in a specific node.

#### Extends

- [`Step`](#step)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new AttrStep(
   pos: number, 
   attr: string, 
   value: any): AttrStep;
```

Construct an attribute step.

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

The position of the target node.

</td>
</tr>
<tr>
<td>

`attr`

</td>
<td>

`string`

</td>
<td>

The attribute to set.

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

###### Returns

[`AttrStep`](#attrstep)

###### Overrides

[`Step`](#step).[`constructor`](#constructor-10)

#### Properties

##### attr {#attr}

```ts
readonly attr: string;
```

The attribute to set.

##### pos {#pos-1}

```ts
readonly pos: number;
```

The position of the target node.

##### value {#value}

```ts
readonly value: any;
```

#### Methods

##### apply() {#apply-4}

```ts
apply(doc: ProseMirrorNode): StepResult;
```

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

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
</tbody>
</table>

###### Returns

[`StepResult`](#stepresult)

###### Overrides

[`Step`](#step).[`apply`](#apply-16)

##### getMap() {#getmap-4}

```ts
getMap(): StepMap;
```

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

###### Returns

[`StepMap`](#stepmap-2)

###### Overrides

[`Step`](#step).[`getMap`](#getmap-16)

##### invert() {#invert-4}

```ts
invert(doc: ProseMirrorNode): AttrStep;
```

Create an inverted version of this step. Needs the document as it
was before the step as argument.

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
</tbody>
</table>

###### Returns

[`AttrStep`](#attrstep)

###### Overrides

[`Step`](#step).[`invert`](#invert-18)

##### map() {#map-4}

```ts
map(mapping: Mappable): null | AttrStep;
```

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

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

[`Mappable`](#mappable)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`AttrStep`](#attrstep)

###### Overrides

[`Step`](#step).[`map`](#map-18)

##### merge() {#merge-4}

```ts
merge(other: Step): null | Step;
```

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

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

[`Step`](#step)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`Step`](#step)

###### Inherited from

[`Step`](#step).[`merge`](#merge-16)

##### toJSON() {#tojson-4}

```ts
toJSON(): any;
```

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

###### Returns

`any`

###### Overrides

[`Step`](#step).[`toJSON`](#tojson-16)

##### fromJSON() {#fromjson-4}

```ts
static fromJSON(schema: Schema, json: any): AttrStep;
```

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

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

[`Schema`](model.md#schema-3)

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

[`AttrStep`](#attrstep)

###### Overrides

[`Step`](#step).[`fromJSON`](#fromjson-16)

##### jsonID() {#jsonid-4}

```ts
static jsonID(id: string, stepClass: object): object;
```

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

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

`id`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`stepClass`

</td>
<td>

\{ `fromJSON`: [`Step`](#step); \}

</td>
</tr>
<tr>
<td>

`stepClass.fromJSON`

</td>
</tr>
</tbody>
</table>

###### Returns

`object`

###### fromJSON()

```ts
fromJSON(schema: Schema, json: any): Step;
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

`schema`

</td>
<td>

[`Schema`](model.md#schema-3)

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

[`Step`](#step)

###### Inherited from

[`Step`](#step).[`jsonID`](#jsonid-16)

<!-- DEBUG memberWithGroups 10 -->

***

### DocAttrStep {#docattrstep}

<!-- DEBUG memberWithGroups 1 -->

Update an attribute in the doc node.

#### Extends

- [`Step`](#step)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new DocAttrStep(attr: string, value: any): DocAttrStep;
```

Construct an attribute step.

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

`attr`

</td>
<td>

`string`

</td>
<td>

The attribute to set.

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

###### Returns

[`DocAttrStep`](#docattrstep)

###### Overrides

[`Step`](#step).[`constructor`](#constructor-10)

#### Properties

##### attr {#attr-1}

```ts
readonly attr: string;
```

The attribute to set.

##### value {#value-1}

```ts
readonly value: any;
```

#### Methods

##### apply() {#apply-6}

```ts
apply(doc: ProseMirrorNode): StepResult;
```

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

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
</tbody>
</table>

###### Returns

[`StepResult`](#stepresult)

###### Overrides

[`Step`](#step).[`apply`](#apply-16)

##### getMap() {#getmap-6}

```ts
getMap(): StepMap;
```

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

###### Returns

[`StepMap`](#stepmap-2)

###### Overrides

[`Step`](#step).[`getMap`](#getmap-16)

##### invert() {#invert-6}

```ts
invert(doc: ProseMirrorNode): DocAttrStep;
```

Create an inverted version of this step. Needs the document as it
was before the step as argument.

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
</tbody>
</table>

###### Returns

[`DocAttrStep`](#docattrstep)

###### Overrides

[`Step`](#step).[`invert`](#invert-18)

##### map() {#map-6}

```ts
map(mapping: Mappable): this;
```

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

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

[`Mappable`](#mappable)

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

###### Overrides

[`Step`](#step).[`map`](#map-18)

##### merge() {#merge-6}

```ts
merge(other: Step): null | Step;
```

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

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

[`Step`](#step)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`Step`](#step)

###### Inherited from

[`Step`](#step).[`merge`](#merge-16)

##### toJSON() {#tojson-6}

```ts
toJSON(): any;
```

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

###### Returns

`any`

###### Overrides

[`Step`](#step).[`toJSON`](#tojson-16)

##### fromJSON() {#fromjson-6}

```ts
static fromJSON(schema: Schema, json: any): DocAttrStep;
```

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

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

[`Schema`](model.md#schema-3)

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

[`DocAttrStep`](#docattrstep)

###### Overrides

[`Step`](#step).[`fromJSON`](#fromjson-16)

##### jsonID() {#jsonid-6}

```ts
static jsonID(id: string, stepClass: object): object;
```

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

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

`id`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`stepClass`

</td>
<td>

\{ `fromJSON`: [`Step`](#step); \}

</td>
</tr>
<tr>
<td>

`stepClass.fromJSON`

</td>
</tr>
</tbody>
</table>

###### Returns

`object`

###### fromJSON()

```ts
fromJSON(schema: Schema, json: any): Step;
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

`schema`

</td>
<td>

[`Schema`](model.md#schema-3)

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

[`Step`](#step)

###### Inherited from

[`Step`](#step).[`jsonID`](#jsonid-16)

<!-- DEBUG memberWithGroups 10 -->

***

### Mapping {#mapping}

<!-- DEBUG memberWithGroups 1 -->

A mapping represents a pipeline of zero or more [step
maps](https://prosemirror.net/docs/ref/#transform.StepMap). It has special provisions for losslessly
handling mapping positions through a series of steps in which some
steps are inverted versions of earlier steps. (This comes up when
‘[rebasing](https://prosemirror.net/docs/guide/#transform.rebasing)’ steps for
collaboration or history management.)

<!-- DEBUG memberWithGroups 4 -->

#### Implements

- [`Mappable`](#mappable)

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new Mapping(
   maps?: readonly StepMap[], 
   from?: number, 
   to?: number): Mapping;
```

Create a new mapping with the given position maps.

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

`maps?`

</td>
<td>

readonly [`StepMap`](#stepmap-2)[]

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`from?`

</td>
<td>

`number`

</td>
<td>

The starting position in the `maps` array, used when `map` or
`mapResult` is called.

</td>
</tr>
<tr>
<td>

`to?`

</td>
<td>

`number`

</td>
<td>

The end position in the `maps` array.

</td>
</tr>
</tbody>
</table>

###### Returns

[`Mapping`](#mapping)

#### Properties

##### from {#from-1}

```ts
from: number;
```

The starting position in the `maps` array, used when `map` or
`mapResult` is called.

##### to {#to-1}

```ts
to: number;
```

The end position in the `maps` array.

#### Accessors

##### maps {#maps}

###### Get Signature

```ts
get maps(): readonly StepMap[];
```

The step maps in this mapping.

###### Returns

readonly [`StepMap`](#stepmap-2)[]

#### Methods

##### appendMap() {#appendmap}

```ts
appendMap(map: StepMap, mirrors?: number): void;
```

Add a step map to the end of this mapping. If `mirrors` is
given, it should be the index of the step map that is the mirror
image of this one.

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

`map`

</td>
<td>

[`StepMap`](#stepmap-2)

</td>
</tr>
<tr>
<td>

`mirrors?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### appendMapping() {#appendmapping}

```ts
appendMapping(mapping: Mapping): void;
```

Add all the step maps in a given mapping to this one (preserving
mirroring information).

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

[`Mapping`](#mapping)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### appendMappingInverted() {#appendmappinginverted}

```ts
appendMappingInverted(mapping: Mapping): void;
```

Append the inverse of the given mapping to this one.

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

[`Mapping`](#mapping)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### getMirror() {#getmirror}

```ts
getMirror(n: number): undefined | number;
```

Finds the offset of the step map that mirrors the map at the
given offset, in this mapping (as per the second argument to
`appendMap`).

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

`undefined` \| `number`

##### invert() {#invert-8}

```ts
invert(): Mapping;
```

Create an inverted version of this mapping.

###### Returns

[`Mapping`](#mapping)

##### map() {#map-8}

```ts
map(pos: number, assoc?: number): number;
```

Map a position through this object. When given, `assoc` (should
be -1 or 1, defaults to 1) determines with which side the
position is associated, which determines in which direction to
move when a chunk of content is inserted at the mapped position.

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

`assoc?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Implementation of

[`Mappable`](#mappable).[`map`](#map-22)

##### mapResult() {#mapresult}

```ts
mapResult(pos: number, assoc?: number): MapResult;
```

Map a position, and return an object containing additional
information about the mapping. The result's `deleted` field tells
you whether the position was deleted (completely enclosed in a
replaced range) during the mapping. When content on only one side
is deleted, the position itself is only considered deleted when
`assoc` points in the direction of the deleted content.

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

`assoc?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

[`MapResult`](#mapresult-2)

###### Implementation of

[`Mappable`](#mappable).[`mapResult`](#mapresult-5)

##### slice() {#slice}

```ts
slice(from?: number, to?: number): Mapping;
```

Create a mapping that maps only through a part of this one.

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

`from?`

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

[`Mapping`](#mapping)

<!-- DEBUG memberWithGroups 10 -->

***

### MapResult {#mapresult-2}

<!-- DEBUG memberWithGroups 1 -->

An object representing a mapped position with extra
information.

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new MapResult(): MapResult;
```

###### Returns

[`MapResult`](#mapresult-2)

#### Properties

##### pos {#pos-2}

```ts
readonly pos: number;
```

The mapped version of the position.

#### Accessors

##### deleted {#deleted}

###### Get Signature

```ts
get deleted(): boolean;
```

Tells you whether the position was deleted, that is, whether the
step removed the token on the side queried (via the `assoc`)
argument from the document.

###### Returns

`boolean`

##### deletedAcross {#deletedacross}

###### Get Signature

```ts
get deletedAcross(): boolean;
```

Tells whether any of the steps mapped through deletes across the
position (including both the token before and after the
position).

###### Returns

`boolean`

##### deletedAfter {#deletedafter}

###### Get Signature

```ts
get deletedAfter(): boolean;
```

True when the token after the mapped position was deleted.

###### Returns

`boolean`

##### deletedBefore {#deletedbefore}

###### Get Signature

```ts
get deletedBefore(): boolean;
```

Tells you whether the token before the mapped position was deleted.

###### Returns

`boolean`

<!-- DEBUG memberWithGroups 10 -->

***

### RemoveMarkStep {#removemarkstep}

<!-- DEBUG memberWithGroups 1 -->

Remove a mark from all inline content between two positions.

#### Extends

- [`Step`](#step)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new RemoveMarkStep(
   from: number, 
   to: number, 
   mark: Mark): RemoveMarkStep;
```

Create a mark-removing step.

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

The start of the unmarked range.

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

The end of the unmarked range.

</td>
</tr>
<tr>
<td>

`mark`

</td>
<td>

[`Mark`](model.md#mark)

</td>
<td>

The mark to remove.

</td>
</tr>
</tbody>
</table>

###### Returns

[`RemoveMarkStep`](#removemarkstep)

###### Overrides

[`Step`](#step).[`constructor`](#constructor-10)

#### Properties

##### from {#from-2}

```ts
readonly from: number;
```

The start of the unmarked range.

##### mark {#mark-2}

```ts
readonly mark: Mark;
```

The mark to remove.

##### to {#to-2}

```ts
readonly to: number;
```

The end of the unmarked range.

#### Methods

##### apply() {#apply-8}

```ts
apply(doc: ProseMirrorNode): StepResult;
```

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

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
</tbody>
</table>

###### Returns

[`StepResult`](#stepresult)

###### Overrides

[`Step`](#step).[`apply`](#apply-16)

##### getMap() {#getmap-8}

```ts
getMap(): StepMap;
```

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

###### Returns

[`StepMap`](#stepmap-2)

###### Inherited from

[`Step`](#step).[`getMap`](#getmap-16)

##### invert() {#invert-10}

```ts
invert(): Step;
```

Create an inverted version of this step. Needs the document as it
was before the step as argument.

###### Returns

[`Step`](#step)

###### Overrides

[`Step`](#step).[`invert`](#invert-18)

##### map() {#map-10}

```ts
map(mapping: Mappable): null | Step;
```

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

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

[`Mappable`](#mappable)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`Step`](#step)

###### Overrides

[`Step`](#step).[`map`](#map-18)

##### merge() {#merge-8}

```ts
merge(other: Step): null | Step;
```

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

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

[`Step`](#step)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`Step`](#step)

###### Overrides

[`Step`](#step).[`merge`](#merge-16)

##### toJSON() {#tojson-8}

```ts
toJSON(): any;
```

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

###### Returns

`any`

###### Overrides

[`Step`](#step).[`toJSON`](#tojson-16)

##### fromJSON() {#fromjson-8}

```ts
static fromJSON(schema: Schema, json: any): Step;
```

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

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

[`Schema`](model.md#schema-3)

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

[`Step`](#step)

###### Inherited from

[`Step`](#step).[`fromJSON`](#fromjson-16)

##### jsonID() {#jsonid-8}

```ts
static jsonID(id: string, stepClass: object): object;
```

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

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

`id`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`stepClass`

</td>
<td>

\{ `fromJSON`: [`Step`](#step); \}

</td>
</tr>
<tr>
<td>

`stepClass.fromJSON`

</td>
</tr>
</tbody>
</table>

###### Returns

`object`

###### fromJSON()

```ts
fromJSON(schema: Schema, json: any): Step;
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

`schema`

</td>
<td>

[`Schema`](model.md#schema-3)

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

[`Step`](#step)

###### Inherited from

[`Step`](#step).[`jsonID`](#jsonid-16)

<!-- DEBUG memberWithGroups 10 -->

***

### RemoveNodeMarkStep {#removenodemarkstep}

<!-- DEBUG memberWithGroups 1 -->

Remove a mark from a specific node.

#### Extends

- [`Step`](#step)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new RemoveNodeMarkStep(pos: number, mark: Mark): RemoveNodeMarkStep;
```

Create a mark-removing step.

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

The position of the target node.

</td>
</tr>
<tr>
<td>

`mark`

</td>
<td>

[`Mark`](model.md#mark)

</td>
<td>

The mark to remove.

</td>
</tr>
</tbody>
</table>

###### Returns

[`RemoveNodeMarkStep`](#removenodemarkstep)

###### Overrides

[`Step`](#step).[`constructor`](#constructor-10)

#### Properties

##### mark {#mark-3}

```ts
readonly mark: Mark;
```

The mark to remove.

##### pos {#pos-3}

```ts
readonly pos: number;
```

The position of the target node.

#### Methods

##### apply() {#apply-10}

```ts
apply(doc: ProseMirrorNode): StepResult;
```

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

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
</tbody>
</table>

###### Returns

[`StepResult`](#stepresult)

###### Overrides

[`Step`](#step).[`apply`](#apply-16)

##### getMap() {#getmap-10}

```ts
getMap(): StepMap;
```

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

###### Returns

[`StepMap`](#stepmap-2)

###### Inherited from

[`Step`](#step).[`getMap`](#getmap-16)

##### invert() {#invert-12}

```ts
invert(doc: ProseMirrorNode): Step;
```

Create an inverted version of this step. Needs the document as it
was before the step as argument.

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
</tbody>
</table>

###### Returns

[`Step`](#step)

###### Overrides

[`Step`](#step).[`invert`](#invert-18)

##### map() {#map-12}

```ts
map(mapping: Mappable): null | Step;
```

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

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

[`Mappable`](#mappable)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`Step`](#step)

###### Overrides

[`Step`](#step).[`map`](#map-18)

##### merge() {#merge-10}

```ts
merge(other: Step): null | Step;
```

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

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

[`Step`](#step)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`Step`](#step)

###### Inherited from

[`Step`](#step).[`merge`](#merge-16)

##### toJSON() {#tojson-10}

```ts
toJSON(): any;
```

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

###### Returns

`any`

###### Overrides

[`Step`](#step).[`toJSON`](#tojson-16)

##### fromJSON() {#fromjson-10}

```ts
static fromJSON(schema: Schema, json: any): Step;
```

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

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

[`Schema`](model.md#schema-3)

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

[`Step`](#step)

###### Inherited from

[`Step`](#step).[`fromJSON`](#fromjson-16)

##### jsonID() {#jsonid-10}

```ts
static jsonID(id: string, stepClass: object): object;
```

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

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

`id`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`stepClass`

</td>
<td>

\{ `fromJSON`: [`Step`](#step); \}

</td>
</tr>
<tr>
<td>

`stepClass.fromJSON`

</td>
</tr>
</tbody>
</table>

###### Returns

`object`

###### fromJSON()

```ts
fromJSON(schema: Schema, json: any): Step;
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

`schema`

</td>
<td>

[`Schema`](model.md#schema-3)

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

[`Step`](#step)

###### Inherited from

[`Step`](#step).[`jsonID`](#jsonid-16)

<!-- DEBUG memberWithGroups 10 -->

***

### ReplaceAroundStep {#replacearoundstep}

<!-- DEBUG memberWithGroups 1 -->

Replace a part of the document with a slice of content, but
preserve a range of the replaced content by moving it into the
slice.

#### Extends

- [`Step`](#step)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new ReplaceAroundStep(
   from: number, 
   to: number, 
   gapFrom: number, 
   gapTo: number, 
   slice: Slice, 
   insert: number): ReplaceAroundStep;
```

Create a replace-around step with the given range and gap.
`insert` should be the point in the slice into which the content
of the gap should be moved. `structure` has the same meaning as
it has in the [`ReplaceStep`](https://prosemirror.net/docs/ref/#transform.ReplaceStep) class.

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

The start position of the replaced range.

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

The end position of the replaced range.

</td>
</tr>
<tr>
<td>

`gapFrom`

</td>
<td>

`number`

</td>
<td>

The start of preserved range.

</td>
</tr>
<tr>
<td>

`gapTo`

</td>
<td>

`number`

</td>
<td>

The end of preserved range.

</td>
</tr>
<tr>
<td>

`slice`

</td>
<td>

[`Slice`](model.md#slice-2)

</td>
<td>

The slice to insert.

</td>
</tr>
<tr>
<td>

`insert`

</td>
<td>

`number`

</td>
<td>

The position in the slice where the preserved range should be
inserted.

</td>
</tr>
</tbody>
</table>

###### Returns

[`ReplaceAroundStep`](#replacearoundstep)

###### Overrides

[`Step`](#step).[`constructor`](#constructor-10)

#### Properties

##### from {#from-3}

```ts
readonly from: number;
```

The start position of the replaced range.

##### gapFrom {#gapfrom}

```ts
readonly gapFrom: number;
```

The start of preserved range.

##### gapTo {#gapto}

```ts
readonly gapTo: number;
```

The end of preserved range.

##### insert {#insert}

```ts
readonly insert: number;
```

The position in the slice where the preserved range should be
inserted.

##### slice {#slice-2}

```ts
readonly slice: Slice;
```

The slice to insert.

##### to {#to-3}

```ts
readonly to: number;
```

The end position of the replaced range.

#### Methods

##### apply() {#apply-12}

```ts
apply(doc: ProseMirrorNode): StepResult;
```

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

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
</tbody>
</table>

###### Returns

[`StepResult`](#stepresult)

###### Overrides

[`Step`](#step).[`apply`](#apply-16)

##### getMap() {#getmap-12}

```ts
getMap(): StepMap;
```

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

###### Returns

[`StepMap`](#stepmap-2)

###### Overrides

[`Step`](#step).[`getMap`](#getmap-16)

##### invert() {#invert-14}

```ts
invert(doc: ProseMirrorNode): ReplaceAroundStep;
```

Create an inverted version of this step. Needs the document as it
was before the step as argument.

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
</tbody>
</table>

###### Returns

[`ReplaceAroundStep`](#replacearoundstep)

###### Overrides

[`Step`](#step).[`invert`](#invert-18)

##### map() {#map-14}

```ts
map(mapping: Mappable): null | ReplaceAroundStep;
```

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

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

[`Mappable`](#mappable)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`ReplaceAroundStep`](#replacearoundstep)

###### Overrides

[`Step`](#step).[`map`](#map-18)

##### merge() {#merge-12}

```ts
merge(other: Step): null | Step;
```

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

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

[`Step`](#step)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`Step`](#step)

###### Inherited from

[`Step`](#step).[`merge`](#merge-16)

##### toJSON() {#tojson-12}

```ts
toJSON(): any;
```

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

###### Returns

`any`

###### Overrides

[`Step`](#step).[`toJSON`](#tojson-16)

##### fromJSON() {#fromjson-12}

```ts
static fromJSON(schema: Schema, json: any): Step;
```

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

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

[`Schema`](model.md#schema-3)

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

[`Step`](#step)

###### Inherited from

[`Step`](#step).[`fromJSON`](#fromjson-16)

##### jsonID() {#jsonid-12}

```ts
static jsonID(id: string, stepClass: object): object;
```

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

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

`id`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`stepClass`

</td>
<td>

\{ `fromJSON`: [`Step`](#step); \}

</td>
</tr>
<tr>
<td>

`stepClass.fromJSON`

</td>
</tr>
</tbody>
</table>

###### Returns

`object`

###### fromJSON()

```ts
fromJSON(schema: Schema, json: any): Step;
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

`schema`

</td>
<td>

[`Schema`](model.md#schema-3)

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

[`Step`](#step)

###### Inherited from

[`Step`](#step).[`jsonID`](#jsonid-16)

<!-- DEBUG memberWithGroups 10 -->

***

### ReplaceStep {#replacestep}

<!-- DEBUG memberWithGroups 1 -->

Replace a part of the document with a slice of new content.

#### Extends

- [`Step`](#step)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new ReplaceStep(
   from: number, 
   to: number, 
   slice: Slice): ReplaceStep;
```

The given `slice` should fit the 'gap' between `from` and
`to`—the depths must line up, and the surrounding nodes must be
able to be joined with the open sides of the slice. When
`structure` is true, the step will fail if the content between
from and to is not just a sequence of closing and then opening
tokens (this is to guard against rebased replace steps
overwriting something they weren't supposed to).

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

The start position of the replaced range.

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

The end position of the replaced range.

</td>
</tr>
<tr>
<td>

`slice`

</td>
<td>

[`Slice`](model.md#slice-2)

</td>
<td>

The slice to insert.

</td>
</tr>
</tbody>
</table>

###### Returns

[`ReplaceStep`](#replacestep)

###### Overrides

[`Step`](#step).[`constructor`](#constructor-10)

#### Properties

##### from {#from-4}

```ts
readonly from: number;
```

The start position of the replaced range.

##### slice {#slice-3}

```ts
readonly slice: Slice;
```

The slice to insert.

##### to {#to-4}

```ts
readonly to: number;
```

The end position of the replaced range.

#### Methods

##### apply() {#apply-14}

```ts
apply(doc: ProseMirrorNode): StepResult;
```

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

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
</tbody>
</table>

###### Returns

[`StepResult`](#stepresult)

###### Overrides

[`Step`](#step).[`apply`](#apply-16)

##### getMap() {#getmap-14}

```ts
getMap(): StepMap;
```

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

###### Returns

[`StepMap`](#stepmap-2)

###### Overrides

[`Step`](#step).[`getMap`](#getmap-16)

##### invert() {#invert-16}

```ts
invert(doc: ProseMirrorNode): ReplaceStep;
```

Create an inverted version of this step. Needs the document as it
was before the step as argument.

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
</tbody>
</table>

###### Returns

[`ReplaceStep`](#replacestep)

###### Overrides

[`Step`](#step).[`invert`](#invert-18)

##### map() {#map-16}

```ts
map(mapping: Mappable): null | ReplaceStep;
```

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

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

[`Mappable`](#mappable)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`ReplaceStep`](#replacestep)

###### Overrides

[`Step`](#step).[`map`](#map-18)

##### merge() {#merge-14}

```ts
merge(other: Step): null | ReplaceStep;
```

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

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

[`Step`](#step)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`ReplaceStep`](#replacestep)

###### Overrides

[`Step`](#step).[`merge`](#merge-16)

##### toJSON() {#tojson-14}

```ts
toJSON(): any;
```

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

###### Returns

`any`

###### Overrides

[`Step`](#step).[`toJSON`](#tojson-16)

##### fromJSON() {#fromjson-14}

```ts
static fromJSON(schema: Schema, json: any): Step;
```

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

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

[`Schema`](model.md#schema-3)

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

[`Step`](#step)

###### Inherited from

[`Step`](#step).[`fromJSON`](#fromjson-16)

##### jsonID() {#jsonid-14}

```ts
static jsonID(id: string, stepClass: object): object;
```

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

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

`id`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`stepClass`

</td>
<td>

\{ `fromJSON`: [`Step`](#step); \}

</td>
</tr>
<tr>
<td>

`stepClass.fromJSON`

</td>
</tr>
</tbody>
</table>

###### Returns

`object`

###### fromJSON()

```ts
fromJSON(schema: Schema, json: any): Step;
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

`schema`

</td>
<td>

[`Schema`](model.md#schema-3)

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

[`Step`](#step)

###### Inherited from

[`Step`](#step).[`jsonID`](#jsonid-16)

<!-- DEBUG memberWithGroups 10 -->

***

### `abstract` Step {#step}

<!-- DEBUG memberWithGroups 1 -->

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

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new Step(): Step;
```

###### Returns

[`Step`](#step)

#### Methods

##### apply() {#apply-16}

```ts
abstract apply(doc: ProseMirrorNode): StepResult;
```

Applies this step to the given document, returning a result
object that either indicates failure, if the step can not be
applied to this document, or indicates success by containing a
transformed document.

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
</tbody>
</table>

###### Returns

[`StepResult`](#stepresult)

##### getMap() {#getmap-16}

```ts
getMap(): StepMap;
```

Get the step map that represents the changes made by this step,
and which can be used to transform between positions in the old
and the new document.

###### Returns

[`StepMap`](#stepmap-2)

##### invert() {#invert-18}

```ts
abstract invert(doc: ProseMirrorNode): Step;
```

Create an inverted version of this step. Needs the document as it
was before the step as argument.

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
</tbody>
</table>

###### Returns

[`Step`](#step)

##### map() {#map-18}

```ts
abstract map(mapping: Mappable): null | Step;
```

Map this step through a mappable thing, returning either a
version of that step with its positions adjusted, or `null` if
the step was entirely deleted by the mapping.

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

[`Mappable`](#mappable)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`Step`](#step)

##### merge() {#merge-16}

```ts
merge(other: Step): null | Step;
```

Try to merge this step with another one, to be applied directly
after it. Returns the merged step when possible, null if the
steps can't be merged.

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

[`Step`](#step)

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| [`Step`](#step)

##### toJSON() {#tojson-16}

```ts
abstract toJSON(): any;
```

Create a JSON-serializeable representation of this step. When
defining this for a custom subclass, make sure the result object
includes the step type's [JSON id](https://prosemirror.net/docs/ref/#transform.Step^jsonID) under
the `stepType` property.

###### Returns

`any`

##### fromJSON() {#fromjson-16}

```ts
static fromJSON(schema: Schema, json: any): Step;
```

Deserialize a step from its JSON representation. Will call
through to the step class' own implementation of this method.

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

[`Schema`](model.md#schema-3)

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

[`Step`](#step)

##### jsonID() {#jsonid-16}

```ts
static jsonID(id: string, stepClass: object): object;
```

To be able to serialize steps to JSON, each step needs a string
ID to attach to its JSON representation. Use this method to
register an ID for your step classes. Try to pick something
that's unlikely to clash with steps from other modules.

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

`id`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`stepClass`

</td>
<td>

\{ `fromJSON`: [`Step`](#step); \}

</td>
</tr>
<tr>
<td>

`stepClass.fromJSON`

</td>
</tr>
</tbody>
</table>

###### Returns

`object`

###### fromJSON()

```ts
fromJSON(schema: Schema, json: any): Step;
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

`schema`

</td>
<td>

[`Schema`](model.md#schema-3)

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

[`Step`](#step)

<!-- DEBUG memberWithGroups 10 -->

***

### StepMap {#stepmap-2}

<!-- DEBUG memberWithGroups 1 -->

A map describing the deletions and insertions made by a step, which
can be used to find the correspondence between positions in the
pre-step version of a document and the same position in the
post-step version.

<!-- DEBUG memberWithGroups 4 -->

#### Implements

- [`Mappable`](#mappable)

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new StepMap(): StepMap;
```

Create a position map. The modifications to the document are
represented as an array of numbers, in which each group of three
represents a modified chunk as `[start, oldSize, newSize]`.

###### Returns

[`StepMap`](#stepmap-2)

#### Properties

##### empty {#empty}

```ts
static empty: StepMap;
```

A StepMap that contains no changed ranges.

#### Methods

##### forEach() {#foreach}

```ts
forEach(f: (oldStart: number, oldEnd: number, newStart: number, newEnd: number) => void): void;
```

Calls the given function on each of the changed ranges included in
this map.

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

(`oldStart`: `number`, `oldEnd`: `number`, `newStart`: `number`, `newEnd`: `number`) => `void`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### invert() {#invert-20}

```ts
invert(): StepMap;
```

Create an inverted version of this map. The result can be used to
map positions in the post-step document to the pre-step document.

###### Returns

[`StepMap`](#stepmap-2)

##### map() {#map-20}

```ts
map(pos: number, assoc?: number): number;
```

Map a position through this object. When given, `assoc` (should
be -1 or 1, defaults to 1) determines with which side the
position is associated, which determines in which direction to
move when a chunk of content is inserted at the mapped position.

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

`assoc?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`number`

###### Implementation of

[`Mappable`](#mappable).[`map`](#map-22)

##### mapResult() {#mapresult-3}

```ts
mapResult(pos: number, assoc?: number): MapResult;
```

Map a position, and return an object containing additional
information about the mapping. The result's `deleted` field tells
you whether the position was deleted (completely enclosed in a
replaced range) during the mapping. When content on only one side
is deleted, the position itself is only considered deleted when
`assoc` points in the direction of the deleted content.

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

`assoc?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

[`MapResult`](#mapresult-2)

###### Implementation of

[`Mappable`](#mappable).[`mapResult`](#mapresult-5)

##### offset() {#offset}

```ts
static offset(n: number): StepMap;
```

Create a map that moves all positions by offset `n` (which may be
negative). This can be useful when applying steps meant for a
sub-document to a larger document, or vice-versa.

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

[`StepMap`](#stepmap-2)

<!-- DEBUG memberWithGroups 10 -->

***

### StepResult {#stepresult}

<!-- DEBUG memberWithGroups 1 -->

The result of [applying](https://prosemirror.net/docs/ref/#transform.Step.apply) a step. Contains either a
new document or a failure value.

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new StepResult(): StepResult;
```

###### Returns

[`StepResult`](#stepresult)

#### Properties

##### doc {#doc}

```ts
readonly doc: null | ProseMirrorNode;
```

The transformed document, if successful.

##### failed {#failed}

```ts
readonly failed: null | string;
```

The failure message, if unsuccessful.

#### Methods

##### fail() {#fail}

```ts
static fail(message: string): StepResult;
```

Create a failed step result.

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

`message`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

[`StepResult`](#stepresult)

##### fromReplace() {#fromreplace}

```ts
static fromReplace(
   doc: ProseMirrorNode, 
   from: number, 
   to: number, 
   slice: Slice): StepResult;
```

Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
arguments. Create a successful result if it succeeds, and a
failed one if it throws a `ReplaceError`.

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

[`Slice`](model.md#slice-2)

</td>
</tr>
</tbody>
</table>

###### Returns

[`StepResult`](#stepresult)

##### ok() {#ok}

```ts
static ok(doc: ProseMirrorNode): StepResult;
```

Create a successful step result.

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
</tbody>
</table>

###### Returns

[`StepResult`](#stepresult)

<!-- DEBUG memberWithGroups 10 -->

***

### Transform {#transform}

<!-- DEBUG memberWithGroups 1 -->

Abstraction to build up and track an array of
[steps](https://prosemirror.net/docs/ref/#transform.Step) representing a document transformation.

Most transforming methods return the `Transform` object itself, so
that they can be chained.

#### Extended by

- [`Transaction`](state.md#transaction)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new Transform(doc: ProseMirrorNode): Transform;
```

Create a transform that starts with the given document.

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

`doc`

</td>
<td>

[`ProseMirrorNode`](model.md#prosemirrornode)

</td>
<td>

The current document (the result of applying the steps in the
transform).

</td>
</tr>
</tbody>
</table>

###### Returns

[`Transform`](#transform)

#### Properties

##### doc {#doc-1}

```ts
doc: ProseMirrorNode;
```

The current document (the result of applying the steps in the
transform).

##### docs {#docs}

```ts
readonly docs: ProseMirrorNode[];
```

The documents before each of the steps.

##### mapping {#mapping-1}

```ts
readonly mapping: Mapping;
```

A mapping with the maps for each of the steps in this transform.

##### steps {#steps}

```ts
readonly steps: Step[];
```

The steps in this transform.

#### Accessors

##### before {#before}

###### Get Signature

```ts
get before(): ProseMirrorNode;
```

The starting document.

###### Returns

[`ProseMirrorNode`](model.md#prosemirrornode)

##### docChanged {#docchanged}

###### Get Signature

```ts
get docChanged(): boolean;
```

True when the document has been changed (when there are any
steps).

###### Returns

`boolean`

#### Methods

##### addMark() {#addmark}

```ts
addMark(
   from: number, 
   to: number, 
   mark: Mark): this;
```

Add the given mark to the inline content between `from` and `to`.

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

`mark`

</td>
<td>

[`Mark`](model.md#mark)

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### addNodeMark() {#addnodemark}

```ts
addNodeMark(pos: number, mark: Mark): this;
```

Add a mark to the node at position `pos`.

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

`mark`

</td>
<td>

[`Mark`](model.md#mark)

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### clearIncompatible() {#clearincompatible}

```ts
clearIncompatible(
   pos: number, 
   parentType: NodeType, 
   match?: ContentMatch): this;
```

Removes all marks and nodes from the content of the node at
`pos` that don't match the given new parent node type. Accepts
an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
third argument.

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

`parentType`

</td>
<td>

[`NodeType`](model.md#nodetype)

</td>
</tr>
<tr>
<td>

`match?`

</td>
<td>

[`ContentMatch`](model.md#contentmatch)

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### delete() {#delete}

```ts
delete(from: number, to: number): this;
```

Delete the content between the given positions.

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
</tbody>
</table>

###### Returns

`this`

##### deleteRange() {#deleterange}

```ts
deleteRange(from: number, to: number): this;
```

Delete the given range, expanding it to cover fully covered
parent nodes until a valid replace is found.

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
</tbody>
</table>

###### Returns

`this`

##### insert() {#insert-1}

```ts
insert(pos: number, content: 
  | ProseMirrorNode
  | ProseMirrorFragment
  | readonly ProseMirrorNode[]): this;
```

Insert the given content at the given position.

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

`content`

</td>
<td>

 \| [`ProseMirrorNode`](model.md#prosemirrornode) \| [`ProseMirrorFragment`](model.md#prosemirrorfragment) \| readonly [`ProseMirrorNode`](model.md#prosemirrornode)[]

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### join() {#join}

```ts
join(pos: number, depth?: number): this;
```

Join the blocks around the given position. If depth is 2, their
last and first siblings are also joined, and so on.

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

`depth?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### lift() {#lift}

```ts
lift(range: NodeRange, target: number): this;
```

Split the content in the given range off from its parent, if there
is sibling content before or after it, and move it up the tree to
the depth specified by `target`. You'll probably want to use
[`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
sure the lift is valid.

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

`range`

</td>
<td>

[`NodeRange`](model.md#noderange)

</td>
</tr>
<tr>
<td>

`target`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### maybeStep() {#maybestep}

```ts
maybeStep(step: Step): StepResult;
```

Try to apply a step in this transformation, ignoring it if it
fails. Returns the step result.

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

`step`

</td>
<td>

[`Step`](#step)

</td>
</tr>
</tbody>
</table>

###### Returns

[`StepResult`](#stepresult)

##### removeMark() {#removemark}

```ts
removeMark(
   from: number, 
   to: number, 
   mark?: null | MarkType | Mark): this;
```

Remove marks from inline nodes between `from` and `to`. When
`mark` is a single mark, remove precisely that mark. When it is
a mark type, remove all marks of that type. When it is null,
remove all marks of any type.

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

`mark?`

</td>
<td>

`null` \| [`MarkType`](model.md#marktype-1) \| [`Mark`](model.md#mark)

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### removeNodeMark() {#removenodemark}

```ts
removeNodeMark(pos: number, mark: MarkType | Mark): this;
```

Remove a mark (or all marks of the given type) from the node at
position `pos`.

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

`mark`

</td>
<td>

[`MarkType`](model.md#marktype-1) \| [`Mark`](model.md#mark)

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### replace() {#replace}

```ts
replace(
   from: number, 
   to?: number, 
   slice?: Slice): this;
```

Replace the part of the document between `from` and `to` with the
given `slice`.

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

`slice?`

</td>
<td>

[`Slice`](model.md#slice-2)

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### replaceRange() {#replacerange}

```ts
replaceRange(
   from: number, 
   to: number, 
   slice: Slice): this;
```

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

[`Slice`](model.md#slice-2)

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### replaceRangeWith() {#replacerangewith}

```ts
replaceRangeWith(
   from: number, 
   to: number, 
   node: ProseMirrorNode): this;
```

Replace the given range with a node, but use `from` and `to` as
hints, rather than precise positions. When from and to are the same
and are at the start or end of a parent node in which the given
node doesn't fit, this method may _move_ them out towards a parent
that does allow the given node to be placed. When the given range
completely covers a parent node, this method may completely replace
that parent node.

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

`node`

</td>
<td>

[`ProseMirrorNode`](model.md#prosemirrornode)

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### replaceWith() {#replacewith}

```ts
replaceWith(
   from: number, 
   to: number, 
   content: 
  | ProseMirrorNode
  | ProseMirrorFragment
  | readonly ProseMirrorNode[]): this;
```

Replace the given range with the given content, which may be a
fragment, node, or array of nodes.

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

`content`

</td>
<td>

 \| [`ProseMirrorNode`](model.md#prosemirrornode) \| [`ProseMirrorFragment`](model.md#prosemirrorfragment) \| readonly [`ProseMirrorNode`](model.md#prosemirrornode)[]

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### setBlockType() {#setblocktype}

```ts
setBlockType(
   from: number, 
   to: undefined | number, 
   type: NodeType, 
   attrs?: 
  | null
  | Attrs
  | (oldNode: ProseMirrorNode) => Attrs): this;
```

Set the type of all textblocks (partly) between `from` and `to` to
the given node type with the given attributes.

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

`undefined` \| `number`

</td>
</tr>
<tr>
<td>

`type`

</td>
<td>

[`NodeType`](model.md#nodetype)

</td>
</tr>
<tr>
<td>

`attrs?`

</td>
<td>

 \| `null` \| [`Attrs`](model.md#attrs-7) \| (`oldNode`: [`ProseMirrorNode`](model.md#prosemirrornode)) => [`Attrs`](model.md#attrs-7)

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### setDocAttribute() {#setdocattribute}

```ts
setDocAttribute(attr: string, value: any): this;
```

Set a single attribute on the document to a new value.

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

`attr`

</td>
<td>

`string`

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

`this`

##### setNodeAttribute() {#setnodeattribute}

```ts
setNodeAttribute(
   pos: number, 
   attr: string, 
   value: any): this;
```

Set a single attribute on a given node to a new value.
The `pos` addresses the document content. Use `setDocAttribute`
to set attributes on the document itself.

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

`attr`

</td>
<td>

`string`

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

`this`

##### setNodeMarkup() {#setnodemarkup}

```ts
setNodeMarkup(
   pos: number, 
   type?: null | NodeType, 
   attrs?: null | Attrs, 
   marks?: readonly Mark[]): this;
```

Change the type, attributes, and/or marks of the node at `pos`.
When `type` isn't given, the existing node type is preserved,

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

`type?`

</td>
<td>

`null` \| [`NodeType`](model.md#nodetype)

</td>
</tr>
<tr>
<td>

`attrs?`

</td>
<td>

`null` \| [`Attrs`](model.md#attrs-7)

</td>
</tr>
<tr>
<td>

`marks?`

</td>
<td>

readonly [`Mark`](model.md#mark)[]

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### split() {#split}

```ts
split(
   pos: number, 
   depth?: number, 
   typesAfter?: (
  | null
  | {
  attrs?: null | Attrs;
  type: NodeType;
})[]): this;
```

Split the node at the given position, and optionally, if `depth` is
greater than one, any number of nodes above that. By default, the
parts split off will inherit the node type of the original node.
This can be changed by passing an array of types and attributes to
use after the split (with the outermost nodes coming first).

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

`depth?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`typesAfter?`

</td>
<td>

( \| `null` \| \{ `attrs?`: `null` \| [`Attrs`](model.md#attrs-7); `type`: [`NodeType`](model.md#nodetype); \})[]

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### step() {#step-1}

```ts
step(step: Step): this;
```

Apply a new step in this transform, saving the result. Throws an
error when the step fails.

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

`step`

</td>
<td>

[`Step`](#step)

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

##### wrap() {#wrap}

```ts
wrap(range: NodeRange, wrappers: readonly object[]): this;
```

Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
The wrappers are assumed to be valid in this position, and should
probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).

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

`range`

</td>
<td>

[`NodeRange`](model.md#noderange)

</td>
</tr>
<tr>
<td>

`wrappers`

</td>
<td>

readonly `object`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`this`

<!-- DEBUG memberWithGroups 10 -->

## Interfaces

### Mappable {#mappable}

<!-- DEBUG memberWithGroups 1 -->

There are several things that positions can be mapped through.
Such objects conform to this interface.

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="map-22"></a> `map`

</td>
<td>

(`pos`: `number`, `assoc?`: `number`) => `number`

</td>
<td>

Map a position through this object. When given, `assoc` (should
be -1 or 1, defaults to 1) determines with which side the
position is associated, which determines in which direction to
move when a chunk of content is inserted at the mapped position.

</td>
</tr>
<tr>
<td>

<a id="mapresult-5"></a> `mapResult`

</td>
<td>

(`pos`: `number`, `assoc?`: `number`) => [`MapResult`](#mapresult-2)

</td>
<td>

Map a position, and return an object containing additional
information about the mapping. The result's `deleted` field tells
you whether the position was deleted (completely enclosed in a
replaced range) during the mapping. When content on only one side
is deleted, the position itself is only considered deleted when
`assoc` points in the direction of the deleted content.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

## Functions

### canJoin() {#canjoin}

```ts
function canJoin(doc: ProseMirrorNode, pos: number): boolean;
```

Test whether the blocks before and after a given position can be
joined.

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

`doc`

</td>
<td>

[`ProseMirrorNode`](model.md#prosemirrornode)

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
</tbody>
</table>

#### Returns

`boolean`

***

### canSplit() {#cansplit}

```ts
function canSplit(
   doc: ProseMirrorNode, 
   pos: number, 
   depth?: number, 
   typesAfter?: (
  | null
  | {
  attrs?: null | Attrs;
  type: NodeType;
})[]): boolean;
```

Check whether splitting at the given position is allowed.

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

`doc`

</td>
<td>

[`ProseMirrorNode`](model.md#prosemirrornode)

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

`depth?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`typesAfter?`

</td>
<td>

( \| `null` \| \{ `attrs?`: `null` \| [`Attrs`](model.md#attrs-7); `type`: [`NodeType`](model.md#nodetype); \})[]

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

***

### dropPoint() {#droppoint}

```ts
function dropPoint(
   doc: ProseMirrorNode, 
   pos: number, 
   slice: Slice): null | number;
```

Finds a position at or around the given position where the given
slice can be inserted. Will look at parent nodes' nearest boundary
and try there, even if the original position wasn't directly at the
start or end of that node. Returns null when no position was found.

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

`doc`

</td>
<td>

[`ProseMirrorNode`](model.md#prosemirrornode)

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

`slice`

</td>
<td>

[`Slice`](model.md#slice-2)

</td>
</tr>
</tbody>
</table>

#### Returns

`null` \| `number`

***

### findWrapping() {#findwrapping}

```ts
function findWrapping(
   range: NodeRange, 
   nodeType: NodeType, 
   attrs?: null | Attrs, 
   innerRange?: NodeRange): null | object[];
```

Try to find a valid way to wrap the content in the given range in a
node of the given type. May introduce extra nodes around and inside
the wrapper node, if necessary. Returns null if no valid wrapping
could be found. When `innerRange` is given, that range's content is
used as the content to fit into the wrapping, instead of the
content of `range`.

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

`range`

</td>
<td>

[`NodeRange`](model.md#noderange)

</td>
</tr>
<tr>
<td>

`nodeType`

</td>
<td>

[`NodeType`](model.md#nodetype)

</td>
</tr>
<tr>
<td>

`attrs?`

</td>
<td>

`null` \| [`Attrs`](model.md#attrs-7)

</td>
</tr>
<tr>
<td>

`innerRange?`

</td>
<td>

[`NodeRange`](model.md#noderange)

</td>
</tr>
</tbody>
</table>

#### Returns

`null` \| `object`[]

***

### insertPoint() {#insertpoint}

```ts
function insertPoint(
   doc: ProseMirrorNode, 
   pos: number, 
   nodeType: NodeType): null | number;
```

Try to find a point where a node of the given type can be inserted
near `pos`, by searching up the node hierarchy when `pos` itself
isn't a valid place but is at the start or end of a node. Return
null if no position was found.

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

`doc`

</td>
<td>

[`ProseMirrorNode`](model.md#prosemirrornode)

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

`nodeType`

</td>
<td>

[`NodeType`](model.md#nodetype)

</td>
</tr>
</tbody>
</table>

#### Returns

`null` \| `number`

***

### joinPoint() {#joinpoint}

```ts
function joinPoint(
   doc: ProseMirrorNode, 
   pos: number, 
   dir?: number): undefined | number;
```

Find an ancestor of the given position that can be joined to the
block before (or after if `dir` is positive). Returns the joinable
point, if any.

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

`doc`

</td>
<td>

[`ProseMirrorNode`](model.md#prosemirrornode)

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

`dir?`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

#### Returns

`undefined` \| `number`

***

### liftTarget() {#lifttarget}

```ts
function liftTarget(range: NodeRange): null | number;
```

Try to find a target depth to which the content in the given range
can be lifted. Will not go across
[isolating](https://prosemirror.net/docs/ref/#model.NodeSpec.isolating) parent nodes.

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

`range`

</td>
<td>

[`NodeRange`](model.md#noderange)

</td>
</tr>
</tbody>
</table>

#### Returns

`null` \| `number`

***

### replaceStep() {#replacestep-1}

```ts
function replaceStep(
   doc: ProseMirrorNode, 
   from: number, 
   to?: number, 
   slice?: Slice): null | Step;
```

‘Fit’ a slice into a given position in the document, producing a
[step](https://prosemirror.net/docs/ref/#transform.Step) that inserts it. Will return null if
there's no meaningful way to insert the slice here, or inserting it
would be a no-op (an empty slice over an empty range).

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

`doc`

</td>
<td>

[`ProseMirrorNode`](model.md#prosemirrornode)

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

`to?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`slice?`

</td>
<td>

[`Slice`](model.md#slice-2)

</td>
</tr>
</tbody>
</table>

#### Returns

`null` \| [`Step`](#step)

<!-- DEBUG memberWithGroups 10 -->
