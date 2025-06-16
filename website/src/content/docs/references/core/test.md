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

<!-- DEBUG inheritance start -->

###### Overrides

```ts
Editor<E>.constructor
```

#### Accessors

##### commands {#commands}

###### Get Signature

```ts
get commands(): ExtractCommandActions<E>;
```

All [CommandAction](../core.md#commandaction)s defined by the editor.

###### Returns

[`ExtractCommandActions`](../core.md#extractcommandactions)\<`E`\>

<!-- DEBUG inheritance start -->

###### Inherited from

[`Editor`](../core.md#editor).[`commands`](../core.md#editor#commands)

##### focused {#focused}

###### Get Signature

```ts
get focused(): boolean;
```

Whether the editor is focused.

###### Returns

`boolean`

<!-- DEBUG inheritance start -->

###### Inherited from

[`Editor`](../core.md#editor).[`focused`](../core.md#editor#focused)

##### marks {#marks}

###### Get Signature

```ts
get marks(): ExtractMarkActions<E>;
```

All [MarkAction](../core.md#markaction)s defined by the editor.

###### Returns

[`ExtractMarkActions`](../core.md#extractmarkactions)\<`E`\>

<!-- DEBUG inheritance start -->

###### Inherited from

[`Editor`](../core.md#editor).[`marks`](../core.md#editor#marks)

##### mounted {#mounted}

###### Get Signature

```ts
get mounted(): boolean;
```

Whether the editor is mounted.

###### Returns

`boolean`

<!-- DEBUG inheritance start -->

###### Inherited from

[`Editor`](../core.md#editor).[`mounted`](../core.md#editor#mounted)

##### nodes {#nodes}

###### Get Signature

```ts
get nodes(): ExtractNodeActions<E>;
```

All [NodeAction](../core.md#nodeaction)s defined by the editor.

###### Returns

[`ExtractNodeActions`](../core.md#extractnodeactions)\<`E`\>

<!-- DEBUG inheritance start -->

###### Inherited from

[`Editor`](../core.md#editor).[`nodes`](../core.md#editor#nodes)

##### schema {#schema}

###### Get Signature

```ts
get schema(): Schema<ExtractNodeNames<E>, ExtractMarkNames<E>>;
```

The editor schema.

###### Returns

[`Schema`](../pm/model.md#schema-3)\<`ExtractNodeNames`\<`E`\>, `ExtractMarkNames`\<`E`\>\>

<!-- DEBUG inheritance start -->

###### Inherited from

[`Editor`](../core.md#editor).[`schema`](../core.md#editor#schema)

##### state {#state}

###### Get Signature

```ts
get state(): EditorState;
```

The editor's current state.

###### Returns

[`EditorState`](../pm/state.md#editorstate)

<!-- DEBUG inheritance start -->

###### Inherited from

[`Editor`](../core.md#editor).[`state`](../core.md#editor#state)

##### view {#view}

###### Get Signature

```ts
get view(): EditorView;
```

The editor view.

###### Returns

[`EditorView`](../pm/view.md#editorview)

<!-- DEBUG inheritance start -->

###### Inherited from

[`Editor`](../core.md#editor).[`view`](../core.md#editor#view)

#### Methods

##### blur() {#blur}

```ts
blur(): void;
```

Blur the editor.

###### Returns

`void`

<!-- DEBUG inheritance start -->

###### Inherited from

[`Editor`](../core.md#editor).[`blur`](../core.md#editor#blur)

##### canExec() {#canexec}

```ts
canExec(command: Command): boolean;
```

Check if the given command can be executed. Return `true` if the command
can be executed, otherwise `false`.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`command`

</td>
<td>

[`Command`](../pm/state.md#command)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

<!-- DEBUG inheritance start -->

###### Inherited from

[`Editor`](../core.md#editor).[`canExec`](../core.md#editor#canexec)

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

<!-- DEBUG inheritance start -->

##### exec() {#exec}

```ts
exec(command: Command): boolean;
```

Execute the given command. Return `true` if the command was successfully
executed, otherwise `false`.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`command`

</td>
<td>

[`Command`](../pm/state.md#command)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

<!-- DEBUG inheritance start -->

###### Inherited from

[`Editor`](../core.md#editor).[`exec`](../core.md#editor#exec)

##### focus() {#focus}

```ts
focus(): void;
```

Focus the editor.

###### Returns

`void`

<!-- DEBUG inheritance start -->

###### Inherited from

[`Editor`](../core.md#editor).[`focus`](../core.md#editor#focus)

##### getDocHTML() {#getdochtml}

```ts
getDocHTML(options?: getDocHTMLOptions): string;
```

Return a HTML string representing the editor's current document.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options?`

</td>
<td>

`getDocHTMLOptions`

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

<!-- DEBUG inheritance start -->

###### Inherited from

[`Editor`](../core.md#editor).[`getDocHTML`](../core.md#editor#getdochtml)

##### getDocJSON() {#getdocjson}

```ts
getDocJSON(): NodeJSON;
```

Return a JSON object representing the editor's current document.

###### Returns

[`NodeJSON`](../core.md#nodejson)

<!-- DEBUG inheritance start -->

###### Inherited from

[`Editor`](../core.md#editor).[`getDocJSON`](../core.md#editor#getdocjson)

##### mount() {#mount}

```ts
mount(place: 
  | undefined
  | null
  | HTMLElement): void;
```

Mount the editor to the given HTML element.
Pass `null` or `undefined` to unmount the editor.

###### Parameters

<table>
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

 \| `undefined` \| `null` \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

<!-- DEBUG inheritance start -->

###### Inherited from

[`Editor`](../core.md#editor).[`mount`](../core.md#editor#mount)

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

<!-- DEBUG inheritance start -->

##### setContent() {#setcontent}

```ts
setContent(content: 
  | string
  | ProseMirrorNode
  | NodeJSON
  | HTMLElement, selection?: 
  | Selection
  | "start"
  | SelectionJSON
  | "end"): void;
```

Update the editor's document and selection.

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

 \| `string` \| [`ProseMirrorNode`](../pm/model.md#prosemirrornode) \| [`NodeJSON`](../core.md#nodejson) \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

</td>
<td>

The new document to set. It can be one of the following:
  - A ProseMirror node instance
  - A ProseMirror node JSON object
  - An HTML string
  - An HTML element instance

</td>
</tr>
<tr>
<td>

`selection?`

</td>
<td>

 \| [`Selection`](../pm/state.md#selection-1) \| `"start"` \| [`SelectionJSON`](../core.md#selectionjson) \| `"end"`

</td>
<td>

Optional. Specifies the new selection. It can be one of the following:
  - A ProseMirror selection instance
  - A ProseMirror selection JSON object
  - The string "start" (to set selection at the beginning, default value)
  - The string "end" (to set selection at the end)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

<!-- DEBUG inheritance start -->

###### Inherited from

[`Editor`](../core.md#editor).[`setContent`](../core.md#editor#setcontent)

##### unmount() {#unmount}

```ts
unmount(): void;
```

Unmount the editor. This is equivalent to `mount(null)`.

###### Returns

`void`

<!-- DEBUG inheritance start -->

###### Inherited from

[`Editor`](../core.md#editor).[`unmount`](../core.md#editor#unmount)

##### updateState() {#updatestate}

```ts
updateState(state: EditorState): void;
```

Update the editor's state.

###### Parameters

<table>
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

[`EditorState`](../pm/state.md#editorstate)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Remarks

This is an advanced method. Use it only if you have a specific reason to
directly manipulate the editor's state.

<!-- DEBUG inheritance start -->

###### Inherited from

[`Editor`](../core.md#editor).[`updateState`](../core.md#editor#updatestate)

##### use() {#use}

```ts
use(extension: Extension): VoidFunction;
```

Register an extension to the editor. Return a function to unregister the
extension.

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`extension`

</td>
<td>

[`Extension`](../core.md#extension-1)

</td>
</tr>
</tbody>
</table>

###### Returns

`VoidFunction`

<!-- DEBUG inheritance start -->

###### Inherited from

[`Editor`](../core.md#editor).[`use`](../core.md#editor#use)

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

<!-- DEBUG inheritance start -->

<!-- DEBUG memberWithGroups 10 -->
