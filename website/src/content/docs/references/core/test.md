---
title: prosekit/core/test
sidebar:
  label: core/test
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Classes

### TestEditor\<E\> {#testeditor}

<!-- DEBUG memberWithGroups 1 -->

An editor for testing purposes.

#### Extends

- [`Editor`](../core.md#editor)\<`E`\>

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

`E` *extends* [`Extension`](../core.md#extension-1)

</td>
<td>

[`Extension`](../core.md#extension-1)

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
new TestEditor<E>(instance: EditorInstance): TestEditor<E>;
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

`instance`

</td>
<td>

`EditorInstance`

</td>
</tr>
</tbody>
</table>

###### Returns

[`TestEditor`](#testeditor)\<`E`\>

###### Overrides

```ts
Editor<E>.constructor
```

#### Methods

##### dispatchEvent() {#dispatchevent}

```ts
dispatchEvent(event: Event): void;
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

##### set() {#set}

```ts
set(doc: ProseMirrorNode): void;
```

Set the editor state to the given document. You can use special tokens
`<a>` and `<b>` to set the anchor and head positions of the selection.

###### Parameters

<table>
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

[`ProseMirrorNode`](../pm/model.md#prosemirrornode)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Example

```ts
const editor = createTestEditor({ extension })
const n = editor.nodes
const doc = n.doc(n.paragraph('<a>Hello<b> world!'))
editor.set(doc) // "Hello" is selected.
```

<!-- DEBUG memberWithGroups 10 -->

## Functions

### createTestEditor() {#createtesteditor}

```ts
function createTestEditor<E>(options: EditorOptions<E>): TestEditor<E>;
```

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`E` *extends* [`Extension`](../core.md#extension-1)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

</td>
</tr>
</tbody>
</table>

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

`options`

</td>
<td>

[`EditorOptions`](../core.md#editoroptions)\<`E`\>

</td>
</tr>
</tbody>
</table>

#### Returns

[`TestEditor`](#testeditor)\<`E`\>

<!-- DEBUG memberWithGroups 10 -->
