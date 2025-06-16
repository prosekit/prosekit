---
title: prosekit/core
sidebar:
  label: core
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Enumerations

### Priority {#priority}

<!-- DEBUG memberWithGroups 1 -->

ProseKit extension priority.

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Enumeration Members

<table>
<thead>
<tr>
<th>Enumeration Member</th>
<th>Value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="default"></a> `default`

</td>
<td>

`2`

</td>
</tr>
<tr>
<td>

<a id="high"></a> `high`

</td>
<td>

`3`

</td>
</tr>
<tr>
<td>

<a id="highest"></a> `highest`

</td>
<td>

`4`

</td>
</tr>
<tr>
<td>

<a id="low"></a> `low`

</td>
<td>

`1`

</td>
</tr>
<tr>
<td>

<a id="lowest"></a> `lowest`

</td>
<td>

`0`

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

## Classes

### Editor\<E\> {#editor}

<!-- DEBUG memberWithGroups 1 -->

#### Extended by

- [`TestEditor`](core/test.md#testeditor)

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

`E` *extends* [`Extension`](#extension-1)

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

#### Accessors

##### commands {#commands}

###### Get Signature

```ts
get commands(): ExtractCommandActions<E>;
```

All [CommandAction](#commandaction)s defined by the editor.

###### Returns

[`ExtractCommandActions`](#extractcommandactions)\<`E`\>

##### focused {#focused}

###### Get Signature

```ts
get focused(): boolean;
```

Whether the editor is focused.

###### Returns

`boolean`

##### marks {#marks}

###### Get Signature

```ts
get marks(): ExtractMarkActions<E>;
```

All [MarkAction](#markaction)s defined by the editor.

###### Returns

[`ExtractMarkActions`](#extractmarkactions)\<`E`\>

##### mounted {#mounted}

###### Get Signature

```ts
get mounted(): boolean;
```

Whether the editor is mounted.

###### Returns

`boolean`

##### nodes {#nodes}

###### Get Signature

```ts
get nodes(): ExtractNodeActions<E>;
```

All [NodeAction](#nodeaction)s defined by the editor.

###### Returns

[`ExtractNodeActions`](#extractnodeactions)\<`E`\>

##### schema {#schema}

###### Get Signature

```ts
get schema(): Schema<ExtractNodeNames<E>, ExtractMarkNames<E>>;
```

The editor schema.

###### Returns

[`Schema`](pm/model.md#schema-3)\<`ExtractNodeNames`\<`E`\>, `ExtractMarkNames`\<`E`\>\>

##### state {#state}

###### Get Signature

```ts
get state(): EditorState;
```

The editor's current state.

###### Returns

[`EditorState`](pm/state.md#editorstate)

##### view {#view}

###### Get Signature

```ts
get view(): EditorView;
```

The editor view.

###### Returns

[`EditorView`](pm/view.md#editorview)

#### Methods

##### blur() {#blur}

```ts
blur(): void;
```

Blur the editor.

###### Returns

`void`

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

[`Command`](pm/state.md#command)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

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

[`Command`](pm/state.md#command)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

##### focus() {#focus}

```ts
focus(): void;
```

Focus the editor.

###### Returns

`void`

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

##### getDocJSON() {#getdocjson}

```ts
getDocJSON(): NodeJSON;
```

Return a JSON object representing the editor's current document.

###### Returns

[`NodeJSON`](#nodejson)

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

 \| `string` \| [`ProseMirrorNode`](pm/model.md#prosemirrornode) \| [`NodeJSON`](#nodejson) \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

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

 \| [`Selection`](pm/state.md#selection-1) \| `"start"` \| [`SelectionJSON`](#selectionjson) \| `"end"`

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

##### unmount() {#unmount}

```ts
unmount(): void;
```

Unmount the editor. This is equivalent to `mount(null)`.

###### Returns

`void`

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

[`EditorState`](pm/state.md#editorstate)

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Remarks

This is an advanced method. Use it only if you have a specific reason to
directly manipulate the editor's state.

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

[`Extension`](#extension-1)

</td>
</tr>
</tbody>
</table>

###### Returns

`VoidFunction`

<!-- DEBUG memberWithGroups 10 -->

## Interfaces

### AddMarkOptions {#addmarkoptions}

<!-- DEBUG memberWithGroups 1 -->

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

<a id="attrs"></a> `attrs?`

</td>
<td>

`null` \| [`Attrs`](pm/model.md#attrs-5)

</td>
<td>

The attributes of the mark to add.

</td>
</tr>
<tr>
<td>

<a id="from"></a> `from?`

</td>
<td>

`number`

</td>
<td>

The start position of the document. By default it will be the start position of current selection.

</td>
</tr>
<tr>
<td>

<a id="to"></a> `to?`

</td>
<td>

`number`

</td>
<td>

The end position of the document. By default it will be the end position of current selection.

</td>
</tr>
<tr>
<td>

<a id="type"></a> `type`

</td>
<td>

`string` \| [`MarkType`](pm/model.md#marktype-1)

</td>
<td>

The type of the mark to add.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### CommandAction()\<Args\> {#commandaction}

<!-- DEBUG memberWithGroups 1 -->

A function to apply a command to the editor. It will return `true` if the command was applied, and `false` otherwise.

It also has a `canExec` method to check if the command can be applied.

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

`Args` *extends* `any`[]

</td>
<td>

`any`[]

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 7 -->

```ts
CommandAction(...args: Args): boolean;
```

A function to apply a command to the editor. It will return `true` if the command was applied, and `false` otherwise.

It also has a `canExec` method to check if the command can be applied.

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

...`args`

</td>
<td>

`Args`

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Methods

##### ~~canApply()~~ {#canapply}

```ts
canApply(...args: Args): boolean;
```

An alias for `canExec`.

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

...`args`

</td>
<td>

`Args`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

###### Deprecated

Use `canExec` instead.

##### canExec() {#canexec-2}

```ts
canExec(...args: Args): boolean;
```

Check if the current command can be executed. Return `true` if the command
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

...`args`

</td>
<td>

`Args`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

<!-- DEBUG memberWithGroups 10 -->

***

### DefaultStateOptions {#defaultstateoptions}

<!-- DEBUG memberWithGroups 1 -->

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

<a id="defaultcontent"></a> `defaultContent?`

</td>
<td>

 \| `string` \| [`NodeJSON`](#nodejson) \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

</td>
<td>

The starting document to use when creating the editor. It can be a
ProseMirror node JSON object, a HTML string, or a HTML element instance.

</td>
</tr>
<tr>
<td>

<a id="defaultdoc"></a> ~~`defaultDoc?`~~

</td>
<td>

[`NodeJSON`](#nodejson)

</td>
<td>

A JSON object representing the starting document to use when creating the
editor.

**Deprecated**

Use `defaultContent` instead.

</td>
</tr>
<tr>
<td>

<a id="defaulthtml"></a> ~~`defaultHTML?`~~

</td>
<td>

 \| `string` \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

</td>
<td>

A HTML element or a HTML string representing the starting document to use
when creating the editor.

**Deprecated**

Use `defaultContent` instead.

</td>
</tr>
<tr>
<td>

<a id="defaultselection"></a> `defaultSelection?`

</td>
<td>

[`SelectionJSON`](#selectionjson)

</td>
<td>

A JSON object representing the starting selection to use when creating the
editor. It's only used when `defaultContent` is also provided.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### DOMDocumentOptions {#domdocumentoptions}

<!-- DEBUG memberWithGroups 1 -->

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

<a id="document"></a> `document?`

</td>
<td>

[`Document`](https://developer.mozilla.org/docs/Web/API/Document)

</td>
<td>

The Document object to use for DOM operations. If not provided, defaults to
the current browser's document object. Useful for server-side rendering or
testing environments.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### DOMParserOptions {#domparseroptions}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- [`ParseOptions`](pm/model.md#parseoptions)

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
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="domparser"></a> `DOMParser?`

</td>
<td>

*typeof* [`DOMParser`](pm/model.md#domparser)

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### DOMSerializerOptions {#domserializeroptions}

<!-- DEBUG memberWithGroups 1 -->

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
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="domserializer"></a> `DOMSerializer?`

</td>
<td>

`object`

</td>
</tr>
<tr>
<td>

`DOMSerializer.fromSchema`

</td>
<td>

(`schema`: [`Schema`](pm/model.md#schema-3)) => [`DOMSerializer`](pm/model.md#domserializer)

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### EditorOptions\<E\> {#editoroptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

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

`E` *extends* [`Extension`](#extension-1)

</td>
</tr>
</tbody>
</table>

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

<a id="defaultcontent-1"></a> `defaultContent?`

</td>
<td>

 \| `string` \| [`NodeJSON`](#nodejson) \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

</td>
<td>

The starting document to use when creating the editor. It can be a
ProseMirror node JSON object, a HTML string, or a HTML element instance.

</td>
</tr>
<tr>
<td>

<a id="defaultdoc-1"></a> ~~`defaultDoc?`~~

</td>
<td>

[`NodeJSON`](#nodejson)

</td>
<td>

A JSON object representing the starting document to use when creating the
editor.

**Deprecated**

Use `defaultContent` instead.

</td>
</tr>
<tr>
<td>

<a id="defaulthtml-1"></a> ~~`defaultHTML?`~~

</td>
<td>

 \| `string` \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

</td>
<td>

A HTML element or a HTML string representing the starting document to use
when creating the editor.

**Deprecated**

Use `defaultContent` instead.

</td>
</tr>
<tr>
<td>

<a id="defaultselection-1"></a> `defaultSelection?`

</td>
<td>

[`SelectionJSON`](#selectionjson)

</td>
<td>

A JSON object representing the starting selection to use when creating the
editor. It's only used when `defaultContent` is also provided.

</td>
</tr>
<tr>
<td>

<a id="extension"></a> `extension`

</td>
<td>

`E`

</td>
<td>

The extension to use when creating the editor.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### ExpandMarkOptions {#expandmarkoptions}

<!-- DEBUG memberWithGroups 1 -->

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

<a id="type-1"></a> `type`

</td>
<td>

`string` \| [`MarkType`](pm/model.md#marktype-1)

</td>
<td>

The type of the mark to expand.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### Extension\<T\> {#extension-1}

<!-- DEBUG memberWithGroups 1 -->

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

`T` *extends* `ExtensionTyping`\<`any`, `any`, `any`\>

</td>
<td>

`ExtensionTyping`\<`any`, `any`, `any`\>

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="_type"></a> `_type?`

</td>
<td>

`public`

</td>
<td>

`T`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="extension-2"></a> `extension`

</td>
<td>

`public`

</td>
<td>

 \| [`Extension`](#extension-1)\<`ExtensionTyping`\<`any`, `any`, `any`\>\> \| [`Extension`](#extension-1)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>[]

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="priority-1"></a> `priority?`

</td>
<td>

`public`

</td>
<td>

[`Priority`](#priority)

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="schema-1"></a> `schema`

</td>
<td>

`public`

</td>
<td>

`null` \| [`Schema`](pm/model.md#schema-3)\<`any`, `any`\>

</td>
<td>

The schema that this extension represents.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### FindParentNodeResult {#findparentnoderesult}

<!-- DEBUG memberWithGroups 1 -->

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

<a id="depth"></a> `depth`

</td>
<td>

`number`

</td>
<td>

The depth of the node.

</td>
</tr>
<tr>
<td>

<a id="node"></a> `node`

</td>
<td>

[`ProseMirrorNode`](pm/model.md#prosemirrornode)

</td>
<td>

The closest parent node that satisfies the predicate.

</td>
</tr>
<tr>
<td>

<a id="pos"></a> `pos`

</td>
<td>

`number`

</td>
<td>

The position directly before the node.

</td>
</tr>
<tr>
<td>

<a id="start"></a> `start`

</td>
<td>

`number`

</td>
<td>

The position at the start of the node.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### HistoryOptions {#historyoptions}

<!-- DEBUG memberWithGroups 1 -->

Options for [defineHistory](#definehistory).

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

<a id="depth-1"></a> `depth?`

</td>
<td>

`number`

</td>
<td>

The amount of history events that are collected before the oldest events
are discarded.

**Default**

```ts
200
```

</td>
</tr>
<tr>
<td>

<a id="newgroupdelay"></a> `newGroupDelay?`

</td>
<td>

`number`

</td>
<td>

The delay in milliseconds between changes after which a new group should be
started.

**Default**

```ts
250
```

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### InsertDefaultBlockOptions {#insertdefaultblockoptions}

<!-- DEBUG memberWithGroups 1 -->

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

<a id="pos-1"></a> `pos?`

</td>
<td>

`number`

</td>
<td>

The position to insert the node at. By default it will insert after the
current selection.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### InsertNodeOptions {#insertnodeoptions}

<!-- DEBUG memberWithGroups 1 -->

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

<a id="attrs-1"></a> `attrs?`

</td>
<td>

[`Attrs`](pm/model.md#attrs-5)

</td>
<td>

When `type` is provided, the attributes of the node to insert.

</td>
</tr>
<tr>
<td>

<a id="node-1"></a> `node?`

</td>
<td>

[`ProseMirrorNode`](pm/model.md#prosemirrornode)

</td>
<td>

The node to insert. Either this or `type` must be provided.

</td>
</tr>
<tr>
<td>

<a id="pos-2"></a> `pos?`

</td>
<td>

`number`

</td>
<td>

The position to insert the node at. By default it will be the anchor
position of current selection.

</td>
</tr>
<tr>
<td>

<a id="type-2"></a> `type?`

</td>
<td>

`string` \| [`NodeType`](pm/model.md#nodetype)

</td>
<td>

The type of the node to insert. Either this or `node` must be provided.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### JSONParserOptions {#jsonparseroptions}

<!-- DEBUG memberWithGroups 1 -->

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

<a id="schema-2"></a> `schema`

</td>
<td>

[`Schema`](pm/model.md#schema-3)

</td>
<td>

The editor schema to use.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### Keymap {#keymap}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

#### Indexable

```ts
[key: string]: Command
```

<!-- DEBUG memberWithGroups 9 -->

<!-- DEBUG memberWithGroups 10 -->

***

### MarkAction()\<Attrs\> {#markaction}

<!-- DEBUG memberWithGroups 1 -->

A function for creating a mark with optional attributes and any number of
children.

It also has a `isActive` method for checking if the mark is active in the
current editor selection.

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

`Attrs` *extends* [`AnyAttrs`](#anyattrs)

</td>
<td>

[`AnyAttrs`](#anyattrs)

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 7 -->

#### Call Signature

```ts
MarkAction(attrs: null | Attrs, ...children: NodeChild[]): ProseMirrorNode[];
```

A function for creating a mark with optional attributes and any number of
children.

It also has a `isActive` method for checking if the mark is active in the
current editor selection.

##### Parameters

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

`attrs`

</td>
<td>

`null` \| `Attrs`

</td>
</tr>
<tr>
<td>

...`children`

</td>
<td>

[`NodeChild`](#nodechild)[]

</td>
</tr>
</tbody>
</table>

##### Returns

[`ProseMirrorNode`](pm/model.md#prosemirrornode)[]

#### Call Signature

```ts
MarkAction(...children: NodeChild[]): ProseMirrorNode[];
```

A function for creating a mark with optional attributes and any number of
children.

It also has a `isActive` method for checking if the mark is active in the
current editor selection.

##### Parameters

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

...`children`

</td>
<td>

[`NodeChild`](#nodechild)[]

</td>
</tr>
</tbody>
</table>

##### Returns

[`ProseMirrorNode`](pm/model.md#prosemirrornode)[]

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

<a id="isactive"></a> `isActive`

</td>
<td>

(`attrs?`: `Attrs`) => `boolean`

</td>
<td>

Checks if the mark is active in the current editor selection. If the
optional `attrs` parameter is provided, it will check if the mark is active
with the given attributes.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### MarkAttrOptions\<MarkName, AttrName, AttrType\> {#markattroptions}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- [`AttrSpec`](#attrspec)\<`AttrType`\>

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

`MarkName` *extends* `string`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`AttrName` *extends* `string`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`AttrType`

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

<a id="attr"></a> `attr`

</td>
<td>

`AttrName`

</td>
<td>

The name of the attribute.

</td>
</tr>
<tr>
<td>

<a id="parsedom"></a> `parseDOM?`

</td>
<td>

(`node`: [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)) => `AttrType`

</td>
<td>

Parses the attribute value from the DOM.

</td>
</tr>
<tr>
<td>

<a id="todom"></a> `toDOM?`

</td>
<td>

(`value`: `AttrType`) => `undefined` \| `null` \| \[`string`, `string`\]

</td>
<td>

Returns the attribute key and value to be set on the HTML element.

If the returned `key` is `"style"`, the value is a string of CSS properties and will
be prepended to the existing `style` attribute on the DOM node.

</td>
</tr>
<tr>
<td>

<a id="type-3"></a> `type`

</td>
<td>

`MarkName`

</td>
<td>

The name of the mark type.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### MarkSpecOptions\<MarkName, Attrs\> {#markspecoptions}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- [`MarkSpec`](pm/model.md#markspec)

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

`MarkName` *extends* `string`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`Attrs` *extends* [`AnyAttrs`](#anyattrs)

</td>
<td>

[`AnyAttrs`](#anyattrs)

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Overrides</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="attrs-4"></a> `attrs?`

</td>
<td>

\{ \[K in string \| number \| symbol\]: AttrSpec\<Attrs\[K\]\> \}

</td>
<td>

The attributes that marks of this type get.

</td>
<td>

[`MarkSpec`](pm/model.md#markspec).[`attrs`](pm/model.md#markspec#attrs-3)

</td>
</tr>
<tr>
<td>

<a id="name"></a> `name`

</td>
<td>

`MarkName`

</td>
<td>

The name of the mark type.

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### MarkViewOptions {#markviewoptions}

<!-- DEBUG memberWithGroups 1 -->

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
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="constructor"></a> `constructor`

</td>
<td>

[`MarkViewConstructor`](pm/view.md#markviewconstructor)

</td>
</tr>
<tr>
<td>

<a id="name-1"></a> `name`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### NodeAction()\<Attrs\> {#nodeaction}

<!-- DEBUG memberWithGroups 1 -->

A function for creating a node with optional attributes and any number of
children.

It also has a `isActive` method for checking if the node is active in the
current editor selection.

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

`Attrs` *extends* [`AnyAttrs`](#anyattrs)

</td>
<td>

[`AnyAttrs`](#anyattrs)

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 7 -->

#### Call Signature

```ts
NodeAction(attrs: null | Attrs, ...children: NodeChild[]): ProseMirrorNode;
```

A function for creating a node with optional attributes and any number of
children.

It also has a `isActive` method for checking if the node is active in the
current editor selection.

##### Parameters

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

`attrs`

</td>
<td>

`null` \| `Attrs`

</td>
</tr>
<tr>
<td>

...`children`

</td>
<td>

[`NodeChild`](#nodechild)[]

</td>
</tr>
</tbody>
</table>

##### Returns

[`ProseMirrorNode`](pm/model.md#prosemirrornode)

#### Call Signature

```ts
NodeAction(...children: NodeChild[]): ProseMirrorNode;
```

A function for creating a node with optional attributes and any number of
children.

It also has a `isActive` method for checking if the node is active in the
current editor selection.

##### Parameters

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

...`children`

</td>
<td>

[`NodeChild`](#nodechild)[]

</td>
</tr>
</tbody>
</table>

##### Returns

[`ProseMirrorNode`](pm/model.md#prosemirrornode)

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

<a id="isactive-1"></a> `isActive`

</td>
<td>

(`attrs?`: `Attrs`) => `boolean`

</td>
<td>

Checks if the node is active in the current editor selection. If the
optional `attrs` parameter is provided, it will check if the node is active
with the given attributes.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### NodeAttrOptions\<NodeName, AttrName, AttrType\> {#nodeattroptions}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- [`AttrSpec`](#attrspec)\<`AttrType`\>

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

`NodeName` *extends* `string`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`AttrName` *extends* `string`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`AttrType`

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

<a id="attr-1"></a> `attr`

</td>
<td>

`AttrName`

</td>
<td>

The name of the attribute.

</td>
</tr>
<tr>
<td>

<a id="parsedom-1"></a> `parseDOM?`

</td>
<td>

(`node`: [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)) => `AttrType`

</td>
<td>

Parses the attribute value from the DOM.

</td>
</tr>
<tr>
<td>

<a id="splittable"></a> `splittable?`

</td>
<td>

`boolean`

</td>
<td>

Whether the attribute should be kept when the node is split. Set it to
`true` if you want to inherit the attribute from the previous node when
splitting the node by pressing `Enter`.

**Default**

```ts
undefined
```

</td>
</tr>
<tr>
<td>

<a id="todom-1"></a> `toDOM?`

</td>
<td>

(`value`: `AttrType`) => `undefined` \| `null` \| \[`string`, `string`\]

</td>
<td>

Returns the attribute key and value to be set on the HTML element.

If the returned `key` is `"style"`, the value is a string of CSS properties and will
be prepended to the existing `style` attribute on the DOM node.

</td>
</tr>
<tr>
<td>

<a id="type-4"></a> `type`

</td>
<td>

`NodeName`

</td>
<td>

The name of the node type.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### NodeJSON {#nodejson}

<!-- DEBUG memberWithGroups 1 -->

A JSON representation of the prosemirror node.

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
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="attrs-6"></a> `attrs?`

</td>
<td>

[`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `any`\>

</td>
</tr>
<tr>
<td>

<a id="content"></a> `content?`

</td>
<td>

[`NodeJSON`](#nodejson)[]

</td>
</tr>
<tr>
<td>

<a id="marks-1"></a> `marks?`

</td>
<td>

`object`[]

</td>
</tr>
<tr>
<td>

<a id="text"></a> `text?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="type-5"></a> `type`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### NodeSpecOptions\<NodeName, Attrs\> {#nodespecoptions}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- [`NodeSpec`](pm/model.md#nodespec)

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

`NodeName` *extends* `string`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`Attrs` *extends* [`AnyAttrs`](#anyattrs)

</td>
<td>

[`AnyAttrs`](#anyattrs)

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Overrides</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="attrs-8"></a> `attrs?`

</td>
<td>

\{ \[key in string \| number \| symbol\]: AttrSpec\<Attrs\[key\]\> \}

</td>
<td>

The attributes that nodes of this type get.

</td>
<td>

[`NodeSpec`](pm/model.md#nodespec).[`attrs`](pm/model.md#nodespec#attrs-4)

</td>
</tr>
<tr>
<td>

<a id="name-2"></a> `name`

</td>
<td>

`NodeName`

</td>
<td>

The name of the node type.

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="topnode"></a> `topNode?`

</td>
<td>

`boolean`

</td>
<td>

Whether this is the top-level node type. Only one node type can be the
top-level node type in a schema.

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### NodeViewOptions {#nodeviewoptions}

<!-- DEBUG memberWithGroups 1 -->

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
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="constructor-1"></a> `constructor`

</td>
<td>

[`NodeViewConstructor`](pm/view.md#nodeviewconstructor)

</td>
</tr>
<tr>
<td>

<a id="name-3"></a> `name`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### RemoveMarkOptions {#removemarkoptions}

<!-- DEBUG memberWithGroups 1 -->

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

<a id="attrs-9"></a> `attrs?`

</td>
<td>

`null` \| [`Attrs`](pm/model.md#attrs-5)

</td>
<td>

If attrs is given, remove precisely the mark with the given attrs. Otherwise, remove all marks of the given type.

</td>
</tr>
<tr>
<td>

<a id="from-1"></a> `from?`

</td>
<td>

`number`

</td>
<td>

The start position of the document. By default it will be the start position of current selection.

</td>
</tr>
<tr>
<td>

<a id="to-1"></a> `to?`

</td>
<td>

`number`

</td>
<td>

The end position of the document. By default it will be the end position of current selection.

</td>
</tr>
<tr>
<td>

<a id="type-6"></a> `type`

</td>
<td>

`string` \| [`MarkType`](pm/model.md#marktype-1)

</td>
<td>

The type of the mark to remove.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### RemoveNodeOptions {#removenodeoptions}

<!-- DEBUG memberWithGroups 1 -->

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

<a id="pos-3"></a> `pos?`

</td>
<td>

`number`

</td>
<td>

The document position to start searching node. By default it will be the
anchor position of current selection.

</td>
</tr>
<tr>
<td>

<a id="type-7"></a> `type`

</td>
<td>

`string` \| [`NodeType`](pm/model.md#nodetype)

</td>
<td>

The type of the node to remove.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### SelectionJSON {#selectionjson}

<!-- DEBUG memberWithGroups 1 -->

A JSON representation of the prosemirror selection.

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
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="anchor"></a> `anchor`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

<a id="head"></a> `head`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

<a id="type-8"></a> `type`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### SetBlockTypeOptions {#setblocktypeoptions}

<!-- DEBUG memberWithGroups 1 -->

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
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="attrs-10"></a> `attrs?`

</td>
<td>

`null` \| [`Attrs`](pm/model.md#attrs-5)

</td>
</tr>
<tr>
<td>

<a id="from-2"></a> `from?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

<a id="to-2"></a> `to?`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

<a id="type-9"></a> `type`

</td>
<td>

`string` \| [`NodeType`](pm/model.md#nodetype)

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### SetNodeAttrsOptions {#setnodeattrsoptions}

<!-- DEBUG memberWithGroups 1 -->

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

<a id="attrs-11"></a> `attrs`

</td>
<td>

[`Attrs`](pm/model.md#attrs-5)

</td>
<td>

The attributes to set.

</td>
</tr>
<tr>
<td>

<a id="pos-4"></a> `pos?`

</td>
<td>

`number`

</td>
<td>

The position of the node. Defaults to the position of the wrapping node
containing the current selection.

</td>
</tr>
<tr>
<td>

<a id="type-10"></a> `type`

</td>
<td>

 \| `string` \| [`NodeType`](pm/model.md#nodetype) \| `string`[] \| [`NodeType`](pm/model.md#nodetype)[]

</td>
<td>

The type of node to set the attributes of.

If current node is not of this type, the command will do nothing.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### StateJSON {#statejson}

<!-- DEBUG memberWithGroups 1 -->

A JSON representation of the prosemirror state.

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

<a id="doc"></a> `doc`

</td>
<td>

[`NodeJSON`](#nodejson)

</td>
<td>

The main `ProseMirror` doc.

</td>
</tr>
<tr>
<td>

<a id="selection"></a> `selection`

</td>
<td>

[`SelectionJSON`](#selectionjson)

</td>
<td>

The current selection.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### StepJSON {#stepjson}

<!-- DEBUG memberWithGroups 1 -->

A JSON representation of the prosemirror step.

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

#### Indexable

```ts
[x: string]: unknown
```

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

<a id="steptype"></a> `stepType`

</td>
<td>

`string`

</td>
<td>

The type of the step.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### ToggleMarkOptions {#togglemarkoptions}

<!-- DEBUG memberWithGroups 1 -->

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

<a id="attrs-12"></a> `attrs?`

</td>
<td>

`null` \| [`Attrs`](pm/model.md#attrs-5)

</td>
<td>

The optional attributes to set on the mark.

</td>
</tr>
<tr>
<td>

<a id="enterinlineatoms"></a> `enterInlineAtoms?`

</td>
<td>

`boolean`

</td>
<td>

Whether the command should act on the content of inline nodes marked as
[atoms](https://prosemirror.net/docs/ref/#model.NodeSpec.atom) that are
completely covered by a selection range.

**Default**

```ts
true
```

</td>
</tr>
<tr>
<td>

<a id="removewhenpresent"></a> `removeWhenPresent?`

</td>
<td>

`boolean`

</td>
<td>

Controls whether, when part of the selected range has the mark
already and part doesn't, the mark is removed (`true`) or added
(`false`).

**Default**

```ts
false
```

</td>
</tr>
<tr>
<td>

<a id="type-11"></a> `type`

</td>
<td>

`string` \| [`MarkType`](pm/model.md#marktype-1)

</td>
<td>

The mark type to toggle.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### ToggleNodeOptions {#togglenodeoptions}

<!-- DEBUG memberWithGroups 1 -->

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

<a id="attrs-13"></a> `attrs?`

</td>
<td>

`null` \| [`Attrs`](pm/model.md#attrs-5)

</td>
<td>

The attributes of the node to toggle.

</td>
</tr>
<tr>
<td>

<a id="type-12"></a> `type`

</td>
<td>

`string` \| [`NodeType`](pm/model.md#nodetype)

</td>
<td>

The type of the node to toggle.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### ToggleWrapOptions {#togglewrapoptions}

<!-- DEBUG memberWithGroups 1 -->

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

<a id="attrs-14"></a> `attrs?`

</td>
<td>

`null` \| [`Attrs`](pm/model.md#attrs-5)

</td>
<td>

The attributes of the node to toggle.

</td>
</tr>
<tr>
<td>

<a id="type-13"></a> `type`

</td>
<td>

`string` \| [`NodeType`](pm/model.md#nodetype)

</td>
<td>

The type of the node to toggle.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### UnsetBlockTypeOptions {#unsetblocktypeoptions}

<!-- DEBUG memberWithGroups 1 -->

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

<a id="from-3"></a> `from?`

</td>
<td>

`number`

</td>
<td>

The start position of the document. By default it will be the start position of current selection.

</td>
</tr>
<tr>
<td>

<a id="to-3"></a> `to?`

</td>
<td>

`number`

</td>
<td>

The end position of the document. By default it will be the end position of current selection.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### UnsetMarkOptions {#unsetmarkoptions}

<!-- DEBUG memberWithGroups 1 -->

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

<a id="from-4"></a> `from?`

</td>
<td>

`number`

</td>
<td>

The start position of the document. By default it will be the start position of current selection.

</td>
</tr>
<tr>
<td>

<a id="to-4"></a> `to?`

</td>
<td>

`number`

</td>
<td>

The end position of the document. By default it will be the end position of current selection.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### WrapOptions {#wrapoptions}

<!-- DEBUG memberWithGroups 1 -->

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

<a id="attrs-15"></a> `attrs?`

</td>
<td>

`null` \| [`Attrs`](pm/model.md#attrs-5)

</td>
<td>

Optional attributes to apply to the node.

</td>
</tr>
<tr>
<td>

<a id="nodetype"></a> ~~`nodeType?`~~

</td>
<td>

[`NodeType`](pm/model.md#nodetype)

</td>
<td>

**Deprecated**

Use `nodeSpec` instead.

</td>
</tr>
<tr>
<td>

<a id="type-14"></a> `type`

</td>
<td>

`string` \| [`NodeType`](pm/model.md#nodetype)

</td>
<td>

The node type to wrap the selected textblock with.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

## Type Aliases

### AnyAttrs {#anyattrs}

```ts
type AnyAttrs = Attrs;
```

An object holding the attributes of a node.

***

### AttrSpec\<AttrType\> {#attrspec}

<!-- DEBUG memberWithGroups 1 -->

```ts
type AttrSpec<AttrType> = object;
```

#### Extended by

- [`MarkAttrOptions`](#markattroptions)
- [`NodeAttrOptions`](#nodeattroptions)

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

`AttrType`

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

##### default? {#default-1}

```ts
optional default: AttrType;
```

The default value for this attribute, to use when no explicit value is
provided. Attributes that have no default must be provided whenever a node
or mark of a type that has them is created.

##### validate? {#validate}

```ts
optional validate: string | (value: unknown) => void;
```

A function or type name used to validate values of this attribute. This
will be used when deserializing the attribute from JSON, and when running
[`Node.check`](https://prosemirror.net/docs/ref/#model.Node.check). When a
function, it should raise an exception if the value isn't of the expected
type or shape. When a string, it should be a `|`-separated string of
primitive types (`"number"`, `"string"`, `"boolean"`, `"null"`, and
`"undefined"`), and the library will raise an error when the value is not
one of those types.

<!-- DEBUG memberWithGroups 10 -->

***

### ClickHandler() {#clickhandler}

```ts
type ClickHandler = (view: EditorView, pos: number, event: MouseEvent) => boolean | void;
```

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

`view`

</td>
<td>

[`EditorView`](pm/view.md#editorview)

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

`event`

</td>
<td>

[`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean` \| `void`

***

### ClickOnHandler() {#clickonhandler}

```ts
type ClickOnHandler = (view: EditorView, pos: number, node: ProseMirrorNode, nodePos: number, event: MouseEvent, direct: boolean) => boolean | void;
```

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

`view`

</td>
<td>

[`EditorView`](pm/view.md#editorview)

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

`node`

</td>
<td>

[`ProseMirrorNode`](pm/model.md#prosemirrornode)

</td>
</tr>
<tr>
<td>

`nodePos`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)

</td>
</tr>
<tr>
<td>

`direct`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean` \| `void`

***

### DocChangeHandler() {#docchangehandler}

```ts
type DocChangeHandler = (view: EditorView, prevState: EditorState) => void;
```

A function that is called when the editor document is changed.

#### Parameters

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

`view`

</td>
<td>

[`EditorView`](pm/view.md#editorview)

</td>
<td>

The editor view.

</td>
</tr>
<tr>
<td>

`prevState`

</td>
<td>

[`EditorState`](pm/state.md#editorstate)

</td>
<td>

The previous editor state.

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

***

### DOMEventHandler()\<Event\> {#domeventhandler}

```ts
type DOMEventHandler<Event> = (view: EditorView, event: DOMEventMap[Event]) => boolean | void;
```

A function to handle the events fired on the editable DOM element. Returns
`true` to indicate that it handled the given event. you are responsible for
calling `preventDefault` yourself (or not, if you want to allow the default
behavior).

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

`Event` *extends* keyof [`DOMEventMap`](pm/view.md#domeventmap)

</td>
<td>

`string`

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

`view`

</td>
<td>

[`EditorView`](pm/view.md#editorview)

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`DOMEventMap`](pm/view.md#domeventmap)\[`Event`\]

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean` \| `void`

***

### DoubleClickHandler() {#doubleclickhandler}

```ts
type DoubleClickHandler = (view: EditorView, pos: number, event: MouseEvent) => boolean | void;
```

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

`view`

</td>
<td>

[`EditorView`](pm/view.md#editorview)

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

`event`

</td>
<td>

[`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean` \| `void`

***

### DoubleClickOnHandler() {#doubleclickonhandler}

```ts
type DoubleClickOnHandler = (view: EditorView, pos: number, node: ProseMirrorNode, nodePos: number, event: MouseEvent, direct: boolean) => boolean | void;
```

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

`view`

</td>
<td>

[`EditorView`](pm/view.md#editorview)

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

`node`

</td>
<td>

[`ProseMirrorNode`](pm/model.md#prosemirrornode)

</td>
</tr>
<tr>
<td>

`nodePos`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)

</td>
</tr>
<tr>
<td>

`direct`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean` \| `void`

***

### DropHandler() {#drophandler}

```ts
type DropHandler = (view: EditorView, event: DragEvent, slice: Slice, moved: boolean) => boolean | void;
```

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

`view`

</td>
<td>

[`EditorView`](pm/view.md#editorview)

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`DragEvent`](https://developer.mozilla.org/docs/Web/API/DragEvent)

</td>
</tr>
<tr>
<td>

`slice`

</td>
<td>

[`Slice`](pm/model.md#slice-2)

</td>
</tr>
<tr>
<td>

`moved`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean` \| `void`

***

### ExtractCommandActions\<E\> {#extractcommandactions}

```ts
type ExtractCommandActions<E> = ToCommandAction<ExtractCommands<E>>;
```

Extracts the [CommandAction](#commandaction)s from an extension type.

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

`E` *extends* [`Extension`](#extension-1)

</td>
</tr>
</tbody>
</table>

***

### ~~ExtractCommandAppliers\<E\>~~ {#extractcommandappliers}

```ts
type ExtractCommandAppliers<E> = ExtractCommandActions<E>;
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

`E` *extends* [`Extension`](#extension-1)

</td>
</tr>
</tbody>
</table>

#### Deprecated

Use `ExtractCommandActions` instead.

***

### ExtractCommandCreators\<E\> {#extractcommandcreators}

```ts
type ExtractCommandCreators<E> = ToCommandCreators<ExtractCommands<E>>;
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

`E` *extends* [`Extension`](#extension-1)

</td>
</tr>
</tbody>
</table>

***

### ExtractMarkActions\<E\> {#extractmarkactions}

```ts
type ExtractMarkActions<E> = ToMarkAction<ExtractMarks<E>>;
```

Extracts the [MarkAction](#markaction)s from an extension type.

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

`E` *extends* [`Extension`](#extension-1)

</td>
</tr>
</tbody>
</table>

***

### ExtractMarks\<E\> {#extractmarks}

```ts
type ExtractMarks<E> = SimplifyDeeper<SimplifyUnion<ExtractTyping<E>["Marks"]>>;
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

`E` *extends* [`Extension`](#extension-1)

</td>
</tr>
</tbody>
</table>

***

### ExtractNodeActions\<E\> {#extractnodeactions}

```ts
type ExtractNodeActions<E> = ToNodeAction<ExtractNodes<E>>;
```

Extracts the [NodeAction](#nodeaction)s from an extension type.

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

`E` *extends* [`Extension`](#extension-1)

</td>
</tr>
</tbody>
</table>

***

### ExtractNodes\<E\> {#extractnodes}

```ts
type ExtractNodes<E> = SimplifyDeeper<SimplifyUnion<ExtractTyping<E>["Nodes"]>>;
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

`E` *extends* [`Extension`](#extension-1)

</td>
</tr>
</tbody>
</table>

***

### FocusChangeHandler() {#focuschangehandler}

```ts
type FocusChangeHandler = (hasFocus: boolean) => void;
```

A function that is called when the editor gains or loses focus.

#### Parameters

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

`hasFocus`

</td>
<td>

`boolean`

</td>
<td>

Whether the editor has focus.

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

***

### KeyDownHandler() {#keydownhandler}

```ts
type KeyDownHandler = (view: EditorView, event: KeyboardEvent) => boolean | void;
```

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

`view`

</td>
<td>

[`EditorView`](pm/view.md#editorview)

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`KeyboardEvent`](https://developer.mozilla.org/docs/Web/API/KeyboardEvent)

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean` \| `void`

***

### KeyPressHandler() {#keypresshandler}

```ts
type KeyPressHandler = (view: EditorView, event: KeyboardEvent) => boolean | void;
```

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

`view`

</td>
<td>

[`EditorView`](pm/view.md#editorview)

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`KeyboardEvent`](https://developer.mozilla.org/docs/Web/API/KeyboardEvent)

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean` \| `void`

***

### ~~MarkBuilder~~ {#markbuilder}

```ts
type MarkBuilder = MarkAction;
```

#### Deprecated

Use type [MarkAction](#markaction) instead.

***

### MountHandler() {#mounthandler}

```ts
type MountHandler = (view: EditorView) => void;
```

A function that is called when the editor view is mounted.

#### Parameters

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

`view`

</td>
<td>

[`EditorView`](pm/view.md#editorview)

</td>
<td>

The editor view.

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

***

### ~~NodeBuilder~~ {#nodebuilder}

```ts
type NodeBuilder = NodeAction;
```

#### Deprecated

Use type [NodeAction](#nodeaction) instead.

***

### NodeChild {#nodechild}

```ts
type NodeChild = 
  | ProseMirrorNode
  | string
  | NodeChild[];
```

Available children parameters for [NodeAction](#nodeaction) and [MarkAction](#markaction).

***

### ~~NodeContent~~ {#nodecontent}

```ts
type NodeContent = 
  | ProseMirrorNode
  | ProseMirrorFragment
  | NodeContent[];
```

#### Deprecated

***

### PasteHandler() {#pastehandler}

```ts
type PasteHandler = (view: EditorView, event: ClipboardEvent, slice: Slice) => boolean | void;
```

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

`view`

</td>
<td>

[`EditorView`](pm/view.md#editorview)

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`ClipboardEvent`](https://developer.mozilla.org/docs/Web/API/ClipboardEvent)

</td>
</tr>
<tr>
<td>

`slice`

</td>
<td>

[`Slice`](pm/model.md#slice-2)

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean` \| `void`

***

### ScrollToSelectionHandler() {#scrolltoselectionhandler}

```ts
type ScrollToSelectionHandler = (view: EditorView) => boolean;
```

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

`view`

</td>
<td>

[`EditorView`](pm/view.md#editorview)

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean`

***

### TextInputHandler() {#textinputhandler}

```ts
type TextInputHandler = (view: EditorView, from: number, to: number, text: string) => boolean | void;
```

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

`view`

</td>
<td>

[`EditorView`](pm/view.md#editorview)

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

`text`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean` \| `void`

***

### TripleClickHandler() {#tripleclickhandler}

```ts
type TripleClickHandler = (view: EditorView, pos: number, event: MouseEvent) => boolean | void;
```

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

`view`

</td>
<td>

[`EditorView`](pm/view.md#editorview)

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

`event`

</td>
<td>

[`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean` \| `void`

***

### TripleClickOnHandler() {#tripleclickonhandler}

```ts
type TripleClickOnHandler = (view: EditorView, pos: number, node: ProseMirrorNode, nodePos: number, event: MouseEvent, direct: boolean) => boolean | void;
```

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

`view`

</td>
<td>

[`EditorView`](pm/view.md#editorview)

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

`node`

</td>
<td>

[`ProseMirrorNode`](pm/model.md#prosemirrornode)

</td>
</tr>
<tr>
<td>

`nodePos`

</td>
<td>

`number`

</td>
</tr>
<tr>
<td>

`event`

</td>
<td>

[`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)

</td>
</tr>
<tr>
<td>

`direct`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean` \| `void`

***

### UnmountHandler() {#unmounthandler}

```ts
type UnmountHandler = () => void;
```

A function that is called when the editor view is unmounted.

#### Returns

`void`

***

### UpdateHandler() {#updatehandler}

```ts
type UpdateHandler = (view: EditorView, prevState: EditorState) => void;
```

A function that is called when the editor state is updated.

#### Parameters

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

`view`

</td>
<td>

[`EditorView`](pm/view.md#editorview)

</td>
<td>

The editor view.

</td>
</tr>
<tr>
<td>

`prevState`

</td>
<td>

[`EditorState`](pm/state.md#editorstate)

</td>
<td>

The previous editor state.

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

## Variables

### canUseRegexLookbehind() {#canuseregexlookbehind}

```ts
const canUseRegexLookbehind: () => boolean;
```

#### Returns

`boolean`

***

### clsx() {#clsx}

```ts
const clsx: (...args: (string | boolean | null | undefined)[]) => string = clsxLite;
```

A utility for constructing `className` strings conditionally.

It is a re-export of [clsx/lite](https://www.npmjs.com/package/clsx) with stricter types.

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

...`args`

</td>
<td>

(`string` \| `boolean` \| `null` \| `undefined`)[]

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

## Functions

### addMark() {#addmark}

```ts
function addMark(options: AddMarkOptions): Command;
```

Returns a command that adds the given mark with the given attributes.

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

[`AddMarkOptions`](#addmarkoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Command`](pm/state.md#command)

***

### collectChildren() {#collectchildren}

```ts
function collectChildren(parent: 
  | ProseMirrorNode
  | ProseMirrorFragment): ProseMirrorNode[];
```

Collects all children of a node or a fragment, and returns them as an array.

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

`parent`

</td>
<td>

 \| [`ProseMirrorNode`](pm/model.md#prosemirrornode) \| [`ProseMirrorFragment`](pm/model.md#prosemirrorfragment)

</td>
</tr>
</tbody>
</table>

#### Returns

[`ProseMirrorNode`](pm/model.md#prosemirrornode)[]

***

### ~~collectNodes()~~ {#collectnodes}

```ts
function collectNodes(content: NodeContent): ProseMirrorNode[];
```

Collects all nodes from a given content.

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

`content`

</td>
<td>

[`NodeContent`](#nodecontent)

</td>
</tr>
</tbody>
</table>

#### Returns

[`ProseMirrorNode`](pm/model.md#prosemirrornode)[]

#### Deprecated

Use `collectChildren` instead.

***

### createEditor() {#createeditor}

```ts
function createEditor<E>(options: EditorOptions<E>): Editor<E>;
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

`E` *extends* [`Extension`](#extension-1)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

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

[`EditorOptions`](#editoroptions)\<`E`\>

</td>
</tr>
</tbody>
</table>

#### Returns

[`Editor`](#editor)\<`E`\>

***

### defineBaseCommands() {#definebasecommands}

```ts
function defineBaseCommands(): BaseCommandsExtension;
```

Add some base commands

#### Returns

`BaseCommandsExtension`

***

### defineBaseKeymap() {#definebasekeymap}

```ts
function defineBaseKeymap(options?: object): PlainExtension;
```

Defines some basic key bindings.

#### Parameters

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

`options?`

</td>
<td>

\{ `priority?`: [`Priority`](#priority); \}

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`options.priority?`

</td>
<td>

[`Priority`](#priority)

</td>
<td>

The priority of the keymap.

**Default**

```ts
Priority.low
```

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### defineClickHandler() {#defineclickhandler}

```ts
function defineClickHandler(handler: ClickHandler): PlainExtension;
```

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleClick](https://prosemirror.net/docs/ref/#view.EditorProps.handleClick)

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

`handler`

</td>
<td>

[`ClickHandler`](#clickhandler)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### defineClickOnHandler() {#defineclickonhandler}

```ts
function defineClickOnHandler(handler: ClickOnHandler): PlainExtension;
```

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleClickOn](https://prosemirror.net/docs/ref/#view.EditorProps.handleClickOn)

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

`handler`

</td>
<td>

[`ClickOnHandler`](#clickonhandler)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### defineCommands() {#definecommands}

```ts
function defineCommands<T>(commands: T): Extension<{
  Commands: { [K in string | number | symbol]: Parameters<T[K]> };
}>;
```

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

`T` *extends* [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `CommandCreator`\>

</td>
<td>

[`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `CommandCreator`\>

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

`commands`

</td>
<td>

`T`

</td>
</tr>
</tbody>
</table>

#### Returns

[`Extension`](#extension-1)\<\{
  `Commands`: \{ \[K in string \| number \| symbol\]: Parameters\<T\[K\]\> \};
\}\>

***

### defineDefaultState() {#definedefaultstate}

```ts
function defineDefaultState(options: DefaultStateOptions): PlainExtension;
```

Define a default state for the editor.

#### Parameters

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

`options`

</td>
<td>

[`DefaultStateOptions`](#defaultstateoptions)

</td>
<td>

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### ~~defineDoc()~~ {#definedoc}

```ts
function defineDoc(): DocExtension;
```

#### Returns

`DocExtension`

#### Deprecated

Use the following import instead:

```ts
import { defineDoc } from 'prosekit/extensions/doc'
```

***

### defineDocChangeHandler() {#definedocchangehandler}

```ts
function defineDocChangeHandler(handler: DocChangeHandler): PlainExtension;
```

Registers a event handler that is called when the editor document is changed.

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

`handler`

</td>
<td>

[`DocChangeHandler`](#docchangehandler)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### defineDOMEventHandler() {#definedomeventhandler}

```ts
function defineDOMEventHandler<Event>(event: Event, handler: DOMEventHandler<Event>): PlainExtension;
```

Register a new event handler for the given event type.

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

`Event` *extends* keyof [`DOMEventMap`](pm/view.md#domeventmap)

</td>
<td>

`string`

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

`event`

</td>
<td>

`Event`

</td>
</tr>
<tr>
<td>

`handler`

</td>
<td>

[`DOMEventHandler`](#domeventhandler)\<`Event`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### defineDoubleClickHandler() {#definedoubleclickhandler}

```ts
function defineDoubleClickHandler(handler: DoubleClickHandler): PlainExtension;
```

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleDoubleClick](https://prosemirror.net/docs/ref/#view.EditorProps.handleDoubleClick)

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

`handler`

</td>
<td>

[`DoubleClickHandler`](#doubleclickhandler)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### defineDoubleClickOnHandler() {#definedoubleclickonhandler}

```ts
function defineDoubleClickOnHandler(handler: DoubleClickOnHandler): PlainExtension;
```

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleDoubleClickOn](https://prosemirror.net/docs/ref/#view.EditorProps.handleDoubleClickOn)

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

`handler`

</td>
<td>

[`DoubleClickOnHandler`](#doubleclickonhandler)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### defineDropHandler() {#definedrophandler}

```ts
function defineDropHandler(handler: DropHandler): PlainExtension;
```

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleDrop](https://prosemirror.net/docs/ref/#view.EditorProps.handleDrop)

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

`handler`

</td>
<td>

[`DropHandler`](#drophandler)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### defineFocusChangeHandler() {#definefocuschangehandler}

```ts
function defineFocusChangeHandler(handler: FocusChangeHandler): PlainExtension;
```

Registers a event handler that is called when the editor gains or loses focus.

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

`handler`

</td>
<td>

[`FocusChangeHandler`](#focuschangehandler)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### defineHistory() {#definehistory}

```ts
function defineHistory(options: HistoryOptions): HistoryExtension;
```

Add undo/redo history to the editor.

#### Parameters

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

`options`

</td>
<td>

[`HistoryOptions`](#historyoptions)

</td>
<td>

</td>
</tr>
</tbody>
</table>

#### Returns

`HistoryExtension`

***

### defineKeyDownHandler() {#definekeydownhandler}

```ts
function defineKeyDownHandler(handler: KeyDownHandler): PlainExtension;
```

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleKeyDown](https://prosemirror.net/docs/ref/#view.EditorProps.handleKeyDown)

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

`handler`

</td>
<td>

[`KeyDownHandler`](#keydownhandler)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### defineKeymap() {#definekeymap}

```ts
function defineKeymap(keymap: Keymap): PlainExtension;
```

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

`keymap`

</td>
<td>

[`Keymap`](#keymap)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### defineKeyPressHandler() {#definekeypresshandler}

```ts
function defineKeyPressHandler(handler: KeyPressHandler): PlainExtension;
```

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleKeyPress](https://prosemirror.net/docs/ref/#view.EditorProps.handleKeyPress)

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

`handler`

</td>
<td>

[`KeyPressHandler`](#keypresshandler)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### defineMarkAttr() {#definemarkattr}

```ts
function defineMarkAttr<MarkType, AttrName, AttrType>(options: MarkAttrOptions<MarkType, AttrName, AttrType>): Extension<{
  Marks: { [K in string]: AttrType };
}>;
```

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

`MarkType` *extends* `string`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`AttrName` *extends* `string`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`AttrType`

</td>
<td>

`any`

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

[`MarkAttrOptions`](#markattroptions)\<`MarkType`, `AttrName`, `AttrType`\>

</td>
</tr>
</tbody>
</table>

#### Returns

[`Extension`](#extension-1)\<\{
  `Marks`: `{ [K in string]: AttrType }`;
\}\>

***

### defineMarkSpec() {#definemarkspec}

```ts
function defineMarkSpec<Mark, Attrs>(options: MarkSpecOptions<Mark, Attrs>): Extension<{
  Marks: { [K in string]: Attrs };
}>;
```

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

`Mark` *extends* `string`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`Attrs` *extends* [`Attrs`](pm/model.md#attrs-5)

</td>
<td>

[`Attrs`](pm/model.md#attrs-5)

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

[`MarkSpecOptions`](#markspecoptions)\<`Mark`, `Attrs`\>

</td>
</tr>
</tbody>
</table>

#### Returns

[`Extension`](#extension-1)\<\{
  `Marks`: `{ [K in string]: Attrs }`;
\}\>

***

### defineMarkView() {#definemarkview}

```ts
function defineMarkView(options: MarkViewOptions): Extension;
```

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

[`MarkViewOptions`](#markviewoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Extension`](#extension-1)

***

### defineMountHandler() {#definemounthandler}

```ts
function defineMountHandler(handler: MountHandler): PlainExtension;
```

Registers a event handler that is called when the editor view is mounted.

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

`handler`

</td>
<td>

[`MountHandler`](#mounthandler)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### defineNodeAttr() {#definenodeattr}

```ts
function defineNodeAttr<NodeType, AttrName, AttrType>(options: NodeAttrOptions<NodeType, AttrName, AttrType>): Extension<{
  Nodes: { [K in string]: { [K in string]: AttrType } };
}>;
```

Defines an attribute for a node type.

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

`NodeType` *extends* `string`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`AttrName` *extends* `string`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`AttrType`

</td>
<td>

`any`

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

[`NodeAttrOptions`](#nodeattroptions)\<`NodeType`, `AttrName`, `AttrType`\>

</td>
</tr>
</tbody>
</table>

#### Returns

[`Extension`](#extension-1)\<\{
  `Nodes`: `{ [K in string]: { [K in string]: AttrType } }`;
\}\>

***

### defineNodeSpec() {#definenodespec}

```ts
function defineNodeSpec<Node, Attrs>(options: NodeSpecOptions<Node, Attrs>): Extension<{
  Nodes: { [K in string]: Attrs };
}>;
```

Defines a node type.

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

`Node` *extends* `string`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`Attrs` *extends* [`Attrs`](pm/model.md#attrs-5)

</td>
<td>

[`Attrs`](pm/model.md#attrs-5)

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

[`NodeSpecOptions`](#nodespecoptions)\<`Node`, `Attrs`\>

</td>
</tr>
</tbody>
</table>

#### Returns

[`Extension`](#extension-1)\<\{
  `Nodes`: `{ [K in string]: Attrs }`;
\}\>

***

### defineNodeView() {#definenodeview}

```ts
function defineNodeView(options: NodeViewOptions): Extension;
```

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

[`NodeViewOptions`](#nodeviewoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Extension`](#extension-1)

***

### ~~defineParagraph()~~ {#defineparagraph}

```ts
function defineParagraph(): ParagraphSpecExtension;
```

Defines a paragraph node spec as the highest priority, because it should be the default block node for most cases.

#### Returns

`ParagraphSpecExtension`

#### Deprecated

Use the following import instead:

```ts
import { defineParagraph } from 'prosekit/extensions/paragraph'
```

***

### definePasteHandler() {#definepastehandler}

```ts
function definePasteHandler(handler: PasteHandler): PlainExtension;
```

See [https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste](https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste)

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

`handler`

</td>
<td>

[`PasteHandler`](#pastehandler)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### definePlugin() {#defineplugin}

```ts
function definePlugin(plugin: 
  | ProseMirrorPlugin<any>
  | ProseMirrorPlugin<any>[]
  | (context: object) => 
  | ProseMirrorPlugin<any>
  | ProseMirrorPlugin<any>[]): PlainExtension;
```

Adds a ProseMirror plugin to the editor.

#### Parameters

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

`plugin`

</td>
<td>

 \| [`ProseMirrorPlugin`](pm/state.md#prosemirrorplugin)\<`any`\> \| [`ProseMirrorPlugin`](pm/state.md#prosemirrorplugin)\<`any`\>[] \| (`context`: `object`) => \| [`ProseMirrorPlugin`](pm/state.md#prosemirrorplugin)\<`any`\> \| [`ProseMirrorPlugin`](pm/state.md#prosemirrorplugin)\<`any`\>[]

</td>
<td>

The ProseMirror plugin to add, or an array of plugins, or a
function that returns one or multiple plugins.

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### defineScrollToSelectionHandler() {#definescrolltoselectionhandler}

```ts
function defineScrollToSelectionHandler(handler: ScrollToSelectionHandler): PlainExtension;
```

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleScrollToSelection](https://prosemirror.net/docs/ref/#view.EditorProps.handleScrollToSelection)

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

`handler`

</td>
<td>

[`ScrollToSelectionHandler`](#scrolltoselectionhandler)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### ~~defineText()~~ {#definetext}

```ts
function defineText(): TextExtension;
```

#### Returns

`TextExtension`

#### Deprecated

Use the following import instead:

```ts
import { defineText } from 'prosekit/extensions/text'
```

***

### defineTextInputHandler() {#definetextinputhandler}

```ts
function defineTextInputHandler(handler: TextInputHandler): PlainExtension;
```

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleTextInput](https://prosemirror.net/docs/ref/#view.EditorProps.handleTextInput)

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

`handler`

</td>
<td>

[`TextInputHandler`](#textinputhandler)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### defineTripleClickHandler() {#definetripleclickhandler}

```ts
function defineTripleClickHandler(handler: TripleClickHandler): PlainExtension;
```

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleTripleClick](https://prosemirror.net/docs/ref/#view.EditorProps.handleTripleClick)

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

`handler`

</td>
<td>

[`TripleClickHandler`](#tripleclickhandler)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### defineTripleClickOnHandler() {#definetripleclickonhandler}

```ts
function defineTripleClickOnHandler(handler: TripleClickOnHandler): PlainExtension;
```

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleTripleClickOn](https://prosemirror.net/docs/ref/#view.EditorProps.handleTripleClickOn)

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

`handler`

</td>
<td>

[`TripleClickOnHandler`](#tripleclickonhandler)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### defineUnmountHandler() {#defineunmounthandler}

```ts
function defineUnmountHandler(handler: UnmountHandler): PlainExtension;
```

Registers a event handler that is called when the editor view is unmounted.

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

`handler`

</td>
<td>

[`UnmountHandler`](#unmounthandler)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### defineUpdateHandler() {#defineupdatehandler}

```ts
function defineUpdateHandler(handler: UpdateHandler): PlainExtension;
```

Registers a event handler that is called when the editor state is updated.

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

`handler`

</td>
<td>

[`UpdateHandler`](#updatehandler)

</td>
</tr>
</tbody>
</table>

#### Returns

`PlainExtension`

***

### elementFromJSON() {#elementfromjson}

```ts
function elementFromJSON(json: NodeJSON, options: JSONParserOptions & DOMSerializerOptions & DOMDocumentOptions): HTMLElement;
```

Parse a ProseMirror document JSON object to a HTML element.

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

`json`

</td>
<td>

[`NodeJSON`](#nodejson)

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`JSONParserOptions`](#jsonparseroptions) & [`DOMSerializerOptions`](#domserializeroptions) & [`DOMDocumentOptions`](#domdocumentoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

#### Example

```ts
const json = { type: 'doc', content: [{ type: 'paragraph' }] }
const element = elementFromJSON(json, { schema: editor.schema })
```

***

### elementFromNode() {#elementfromnode}

```ts
function elementFromNode(node: ProseMirrorNode, options?: DOMSerializerOptions & DOMDocumentOptions): HTMLElement;
```

Serialize a ProseMirror node to a HTML element.

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

`node`

</td>
<td>

[`ProseMirrorNode`](pm/model.md#prosemirrornode)

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`DOMSerializerOptions`](#domserializeroptions) & [`DOMDocumentOptions`](#domdocumentoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)

#### Example

```ts
const node = editor.state.doc
const element = elementFromNode(node)
```

***

### expandMark() {#expandmark}

```ts
function expandMark(options: ExpandMarkOptions): Command;
```

Expands the selection to include the entire mark at the current position.

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

[`ExpandMarkOptions`](#expandmarkoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Command`](pm/state.md#command)

***

### findParentNode() {#findparentnode}

```ts
function findParentNode(predicate: (node: ProseMirrorNode) => boolean, $pos: ResolvedPos): undefined | FindParentNodeResult;
```

Find the closest parent node that satisfies the predicate.

#### Parameters

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

`predicate`

</td>
<td>

(`node`: [`ProseMirrorNode`](pm/model.md#prosemirrornode)) => `boolean`

</td>
<td>

The predicate to test the parent node.

</td>
</tr>
<tr>
<td>

`$pos`

</td>
<td>

[`ResolvedPos`](pm/model.md#resolvedpos)

</td>
<td>

The position to start searching from.

</td>
</tr>
</tbody>
</table>

#### Returns

`undefined` \| [`FindParentNodeResult`](#findparentnoderesult)

***

### findParentNodeOfType() {#findparentnodeoftype}

```ts
function findParentNodeOfType(type: string | NodeType, $pos: ResolvedPos): undefined | FindParentNodeResult;
```

Finds the closest parent node that matches the given node type.

#### Parameters

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

`type`

</td>
<td>

`string` \| [`NodeType`](pm/model.md#nodetype)

</td>
<td>

The type of the node to find.

</td>
</tr>
<tr>
<td>

`$pos`

</td>
<td>

[`ResolvedPos`](pm/model.md#resolvedpos)

</td>
<td>

The position to start searching from.

</td>
</tr>
</tbody>
</table>

#### Returns

`undefined` \| [`FindParentNodeResult`](#findparentnoderesult)

***

### htmlFromJSON() {#htmlfromjson}

```ts
function htmlFromJSON(json: NodeJSON, options: JSONParserOptions & DOMSerializerOptions & DOMDocumentOptions): string;
```

Parse a ProseMirror document JSON object to a HTML string.

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

`json`

</td>
<td>

[`NodeJSON`](#nodejson)

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`JSONParserOptions`](#jsonparseroptions) & [`DOMSerializerOptions`](#domserializeroptions) & [`DOMDocumentOptions`](#domdocumentoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

#### Example

```ts
const json = { type: 'doc', content: [{ type: 'paragraph' }] }
const html = htmlFromJSON(json, { schema: editor.schema })
```

***

### htmlFromNode() {#htmlfromnode}

```ts
function htmlFromNode(node: ProseMirrorNode, options?: DOMSerializerOptions & DOMDocumentOptions): string;
```

Serialize a ProseMirror node to a HTML string

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

`node`

</td>
<td>

[`ProseMirrorNode`](pm/model.md#prosemirrornode)

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`DOMSerializerOptions`](#domserializeroptions) & [`DOMDocumentOptions`](#domdocumentoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

#### Example

```ts
const node = document.getElementById('content')
const html = htmlFromNode(node)
```

***

### insertDefaultBlock() {#insertdefaultblock}

```ts
function insertDefaultBlock(options?: InsertDefaultBlockOptions): Command;
```

Returns a command that inserts a default block after current selection or at
the given position.

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

`options?`

</td>
<td>

[`InsertDefaultBlockOptions`](#insertdefaultblockoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Command`](pm/state.md#command)

***

### insertNode() {#insertnode}

```ts
function insertNode(options: InsertNodeOptions): Command;
```

Returns a command that inserts the given node at the current selection or at
the given position.

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

[`InsertNodeOptions`](#insertnodeoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Command`](pm/state.md#command)

***

### isAllSelection() {#isallselection}

```ts
function isAllSelection(sel: Selection): sel is AllSelection;
```

Checks if the given object is a `AllSelection` instance.

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

`sel`

</td>
<td>

[`Selection`](pm/state.md#selection-1)

</td>
</tr>
</tbody>
</table>

#### Returns

`sel is AllSelection`

***

### isFragment() {#isfragment}

```ts
function isFragment(fragment: unknown): fragment is ProseMirrorFragment;
```

Checks if the given object is a `Fragment` instance.

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

`fragment`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

#### Returns

`fragment is ProseMirrorFragment`

***

### isMark() {#ismark}

```ts
function isMark(mark: unknown): mark is Mark;
```

Checks if the given object is a `Mark` instance.

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

`mark`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

#### Returns

`mark is Mark`

***

### isNodeSelection() {#isnodeselection}

```ts
function isNodeSelection(sel: Selection): sel is NodeSelection;
```

Checks if the given object is a `NodeSelection` instance.

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

`sel`

</td>
<td>

[`Selection`](pm/state.md#selection-1)

</td>
</tr>
</tbody>
</table>

#### Returns

`sel is NodeSelection`

***

### isProseMirrorNode() {#isprosemirrornode}

```ts
function isProseMirrorNode(node: unknown): node is ProseMirrorNode;
```

Checks if the given object is a `ProseMirrorNode` instance.

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

`node`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

#### Returns

`node is ProseMirrorNode`

***

### isSelection() {#isselection}

```ts
function isSelection(sel: unknown): sel is Selection;
```

Checks if the given object is a `Selection` instance.

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

`sel`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

#### Returns

`sel is Selection`

***

### isSlice() {#isslice}

```ts
function isSlice(slice: unknown): slice is Slice;
```

Checks if the given object is a `Slice` instance.

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

`slice`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

#### Returns

`slice is Slice`

***

### isTextSelection() {#istextselection}

```ts
function isTextSelection(sel: Selection): sel is TextSelection;
```

Checks if the given object is a `TextSelection` instance.

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

`sel`

</td>
<td>

[`Selection`](pm/state.md#selection-1)

</td>
</tr>
</tbody>
</table>

#### Returns

`sel is TextSelection`

***

### jsonFromHTML() {#jsonfromhtml}

```ts
function jsonFromHTML(html: string, options: DOMDocumentOptions & DOMParserOptions & JSONParserOptions): NodeJSON;
```

Parse a HTML string to a ProseMirror document JSON object.

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

`html`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`DOMDocumentOptions`](#domdocumentoptions) & [`DOMParserOptions`](#domparseroptions) & [`JSONParserOptions`](#jsonparseroptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`NodeJSON`](#nodejson)

#### Example

```ts
const html = '<p>Hello, world!</p>'
const json = jsonFromHTML(html, { schema: editor.schema })
```

***

### jsonFromNode() {#jsonfromnode}

```ts
function jsonFromNode(node: ProseMirrorNode): NodeJSON;
```

Return a JSON object representing this node.

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

`node`

</td>
<td>

[`ProseMirrorNode`](pm/model.md#prosemirrornode)

</td>
</tr>
</tbody>
</table>

#### Returns

[`NodeJSON`](#nodejson)

#### Example

```ts
const node = editor.state.doc
const json = jsonFromNode(node)
```

***

### jsonFromState() {#jsonfromstate}

```ts
function jsonFromState(state: EditorState): StateJSON;
```

Return a JSON object representing this state.

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

`state`

</td>
<td>

[`EditorState`](pm/state.md#editorstate)

</td>
</tr>
</tbody>
</table>

#### Returns

[`StateJSON`](#statejson)

#### Example

```ts
const state = editor.state
const json = jsonFromState(state)
```

***

### nodeFromElement() {#nodefromelement}

```ts
function nodeFromElement(element: Node, options: DOMParserOptions & JSONParserOptions): ProseMirrorNode;
```

Parse a HTML element to a ProseMirror node.

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

`element`

</td>
<td>

[`Node`](https://developer.mozilla.org/docs/Web/API/Node)

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`DOMParserOptions`](#domparseroptions) & [`JSONParserOptions`](#jsonparseroptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`ProseMirrorNode`](pm/model.md#prosemirrornode)

#### Example

```ts
const element = document.getElementById('content')
const node = nodeFromElement(element, { schema: editor.schema })

***

### nodeFromHTML() {#nodefromhtml}

```ts
function nodeFromHTML(html: string, options: DOMParserOptions & JSONParserOptions & DOMDocumentOptions): ProseMirrorNode;
```

Parse a HTML string to a ProseMirror node.

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

`html`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`DOMParserOptions`](#domparseroptions) & [`JSONParserOptions`](#jsonparseroptions) & [`DOMDocumentOptions`](#domdocumentoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`ProseMirrorNode`](pm/model.md#prosemirrornode)

#### Example

```ts
const html = '<p>Hello, world!</p>'
const node = nodeFromHTML(html, { schema: editor.schema })

***

### nodeFromJSON() {#nodefromjson}

```ts
function nodeFromJSON(json: NodeJSON, options: JSONParserOptions): ProseMirrorNode;
```

Parse a JSON object to a ProseMirror node.

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

`json`

</td>
<td>

[`NodeJSON`](#nodejson)

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`JSONParserOptions`](#jsonparseroptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`ProseMirrorNode`](pm/model.md#prosemirrornode)

#### Example

```ts
const json = { type: 'doc', content: [{ type: 'paragraph' }] }
const node = nodeFromJSON(json, { schema: editor.schema })
```

***

### removeMark() {#removemark}

```ts
function removeMark(options: RemoveMarkOptions): Command;
```

Returns a command that removes the given mark.

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

[`RemoveMarkOptions`](#removemarkoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Command`](pm/state.md#command)

***

### removeNode() {#removenode}

```ts
function removeNode(options: RemoveNodeOptions): Command;
```

Returns a command to remove the nearest ancestor node of a specific type from the current position.

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

[`RemoveNodeOptions`](#removenodeoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Command`](pm/state.md#command)

***

### setBlockType() {#setblocktype}

```ts
function setBlockType(options: SetBlockTypeOptions): Command;
```

Returns a command that tries to set the selected textblocks to the given node
type with the given attributes.

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

[`SetBlockTypeOptions`](#setblocktypeoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Command`](pm/state.md#command)

***

### setNodeAttrs() {#setnodeattrs}

```ts
function setNodeAttrs(options: SetNodeAttrsOptions): Command;
```

Returns a command that set the attributes of the current node.

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

[`SetNodeAttrsOptions`](#setnodeattrsoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Command`](pm/state.md#command)

***

### setSelectionAround() {#setselectionaround}

```ts
function setSelectionAround(tr: Transaction, pos: number): void;
```

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

`tr`

</td>
<td>

[`Transaction`](pm/state.md#transaction)

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

`void`

***

### stateFromJSON() {#statefromjson}

```ts
function stateFromJSON(json: StateJSON, options: JSONParserOptions): EditorState;
```

Parse a JSON object to a ProseMirror state.

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

`json`

</td>
<td>

[`StateJSON`](#statejson)

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`JSONParserOptions`](#jsonparseroptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`EditorState`](pm/state.md#editorstate)

#### Example

```ts
const json = { state: { type: 'doc', content: [{ type: 'paragraph' }], selection: { type: 'text', from: 1, to: 1 } } }
const state = stateFromJSON(json, { schema: editor.schema })
```

***

### toggleMark() {#togglemark}

```ts
function toggleMark(options: ToggleMarkOptions): Command;
```

Returns a command that toggles the given mark with the given attributes.

#### Parameters

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

`options`

</td>
<td>

[`ToggleMarkOptions`](#togglemarkoptions)

</td>
<td>

</td>
</tr>
</tbody>
</table>

#### Returns

[`Command`](pm/state.md#command)

***

### toggleNode() {#togglenode}

```ts
function toggleNode(options: ToggleNodeOptions): Command;
```

Returns a command that set the selected textblocks to the given node type
with the given attributes.

#### Parameters

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

`options`

</td>
<td>

[`ToggleNodeOptions`](#togglenodeoptions)

</td>
<td>

</td>
</tr>
</tbody>
</table>

#### Returns

[`Command`](pm/state.md#command)

***

### toggleWrap() {#togglewrap}

```ts
function toggleWrap(options: ToggleWrapOptions): Command;
```

Toggle between wrapping an inactive node with the provided node type, and
lifting it up into its parent.

#### Parameters

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

`options`

</td>
<td>

[`ToggleWrapOptions`](#togglewrapoptions)

</td>
<td>

</td>
</tr>
</tbody>
</table>

#### Returns

[`Command`](pm/state.md#command)

***

### union() {#union}

#### Call Signature

```ts
function union<E>(...exts: E): Union<E>;
```

Merges multiple extensions into one. You can pass multiple extensions as
arguments or a single array containing multiple extensions.

##### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`E` *extends* readonly [`Extension`](#extension-1)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>[]

</td>
</tr>
</tbody>
</table>

##### Parameters

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

...`exts`

</td>
<td>

`E`

</td>
</tr>
</tbody>
</table>

##### Returns

`Union`\<`E`\>

##### Throws

If no extensions are provided.

##### Examples

```ts
function defineFancyNodes() {
  return union(
    defineFancyParagraph(),
    defineFancyHeading(),
  )
}
```

```ts
function defineFancyNodes() {
  return union([
    defineFancyParagraph(),
    defineFancyHeading(),
  ])
}
```

#### Call Signature

```ts
function union<E>(exts: E): Union<E>;
```

Merges multiple extensions into one. You can pass multiple extensions as
arguments or a single array containing multiple extensions.

##### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`E` *extends* readonly [`Extension`](#extension-1)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>[]

</td>
</tr>
</tbody>
</table>

##### Parameters

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

`exts`

</td>
<td>

`E`

</td>
</tr>
</tbody>
</table>

##### Returns

`Union`\<`E`\>

##### Throws

If no extensions are provided.

##### Examples

```ts
function defineFancyNodes() {
  return union(
    defineFancyParagraph(),
    defineFancyHeading(),
  )
}
```

```ts
function defineFancyNodes() {
  return union([
    defineFancyParagraph(),
    defineFancyHeading(),
  ])
}
```

***

### unsetBlockType() {#unsetblocktype}

```ts
function unsetBlockType(options?: UnsetBlockTypeOptions): Command;
```

Returns a command that set the type of all textblocks between the given range
to the default type (usually `paragraph`).

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

`options?`

</td>
<td>

[`UnsetBlockTypeOptions`](#unsetblocktypeoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Command`](pm/state.md#command)

***

### unsetMark() {#unsetmark}

```ts
function unsetMark(options?: UnsetMarkOptions): Command;
```

Returns a command that removes all marks.

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

`options?`

</td>
<td>

[`UnsetMarkOptions`](#unsetmarkoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Command`](pm/state.md#command)

***

### withPriority() {#withpriority}

```ts
function withPriority<T>(extension: T, priority: Priority): T;
```

Return an new extension with the given priority.

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

`T` *extends* [`Extension`](#extension-1)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

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

`extension`

</td>
<td>

`T`

</td>
</tr>
<tr>
<td>

`priority`

</td>
<td>

[`Priority`](#priority)

</td>
</tr>
</tbody>
</table>

#### Returns

`T`

#### Example

```ts
import { Priority, withPriority } from 'prosekit/core'

const extension = withPriority(defineMyExtension(), Priority.high)
```

***

### wrap() {#wrap}

```ts
function wrap(options: WrapOptions): Command;
```

Returns a command that wraps the selected textblock with the given node type.

#### Parameters

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

`options`

</td>
<td>

[`WrapOptions`](#wrapoptions)

</td>
<td>

</td>
</tr>
</tbody>
</table>

#### Returns

[`Command`](pm/state.md#command)

<!-- DEBUG memberWithGroups 10 -->
