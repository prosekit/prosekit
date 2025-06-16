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

<!-- DEBUG inheritance start -->

##### focused {#focused}

###### Get Signature

```ts
get focused(): boolean;
```

Whether the editor is focused.

###### Returns

`boolean`

<!-- DEBUG inheritance start -->

##### marks {#marks}

###### Get Signature

```ts
get marks(): ExtractMarkActions<E>;
```

All [MarkAction](#markaction)s defined by the editor.

###### Returns

[`ExtractMarkActions`](#extractmarkactions)\<`E`\>

<!-- DEBUG inheritance start -->

##### mounted {#mounted}

###### Get Signature

```ts
get mounted(): boolean;
```

Whether the editor is mounted.

###### Returns

`boolean`

<!-- DEBUG inheritance start -->

##### nodes {#nodes}

###### Get Signature

```ts
get nodes(): ExtractNodeActions<E>;
```

All [NodeAction](#nodeaction)s defined by the editor.

###### Returns

[`ExtractNodeActions`](#extractnodeactions)\<`E`\>

<!-- DEBUG inheritance start -->

##### schema {#schema}

###### Get Signature

```ts
get schema(): Schema<ExtractNodeNames<E>, ExtractMarkNames<E>>;
```

The editor schema.

###### Returns

[`Schema`](pm/model.md#schema-3)\<`ExtractNodeNames`\<`E`\>, `ExtractMarkNames`\<`E`\>\>

<!-- DEBUG inheritance start -->

##### state {#state}

###### Get Signature

```ts
get state(): EditorState;
```

The editor's current state.

###### Returns

[`EditorState`](pm/state.md#editorstate)

<!-- DEBUG inheritance start -->

##### view {#view}

###### Get Signature

```ts
get view(): EditorView;
```

The editor view.

###### Returns

[`EditorView`](pm/view.md#editorview)

<!-- DEBUG inheritance start -->

#### Methods

##### blur() {#blur}

```ts
blur(): void;
```

Blur the editor.

###### Returns

`void`

<!-- DEBUG inheritance start -->

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

[`Command`](pm/state.md#command)

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

<!-- DEBUG inheritance start -->

##### focus() {#focus}

```ts
focus(): void;
```

Focus the editor.

###### Returns

`void`

<!-- DEBUG inheritance start -->

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

##### getDocJSON() {#getdocjson}

```ts
getDocJSON(): NodeJSON;
```

Return a JSON object representing the editor's current document.

###### Returns

[`NodeJSON`](#nodejson)

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

##### unmount() {#unmount}

```ts
unmount(): void;
```

Unmount the editor. This is equivalent to `mount(null)`.

###### Returns

`void`

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

<!-- DEBUG memberWithGroups 10 -->

## Interfaces

### AddMarkOptions {#addmarkoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### attrs? {#attrs}

```ts
optional attrs: null | Attrs;
```

The attributes of the mark to add.

<!-- DEBUG inheritance start -->

##### from? {#from}

```ts
optional from: number;
```

The start position of the document. By default it will be the start position of current selection.

<!-- DEBUG inheritance start -->

##### to? {#to}

```ts
optional to: number;
```

The end position of the document. By default it will be the end position of current selection.

<!-- DEBUG inheritance start -->

##### type {#type}

```ts
type: string | MarkType;
```

The type of the mark to add.

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

<!-- DEBUG memberWithGroups 10 -->

***

### DefaultStateOptions {#defaultstateoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### defaultContent? {#defaultcontent}

```ts
optional defaultContent: 
  | string
  | NodeJSON
  | HTMLElement;
```

The starting document to use when creating the editor. It can be a
ProseMirror node JSON object, a HTML string, or a HTML element instance.

<!-- DEBUG inheritance start -->

##### ~~defaultDoc?~~ {#defaultdoc}

```ts
optional defaultDoc: NodeJSON;
```

A JSON object representing the starting document to use when creating the
editor.

###### Deprecated

Use `defaultContent` instead.

<!-- DEBUG inheritance start -->

##### ~~defaultHTML?~~ {#defaulthtml}

```ts
optional defaultHTML: 
  | string
  | HTMLElement;
```

A HTML element or a HTML string representing the starting document to use
when creating the editor.

###### Deprecated

Use `defaultContent` instead.

<!-- DEBUG inheritance start -->

##### defaultSelection? {#defaultselection}

```ts
optional defaultSelection: SelectionJSON;
```

A JSON object representing the starting selection to use when creating the
editor. It's only used when `defaultContent` is also provided.

<!-- DEBUG inheritance start -->

<!-- DEBUG memberWithGroups 10 -->

***

### DOMDocumentOptions {#domdocumentoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### document? {#document}

```ts
optional document: Document;
```

The Document object to use for DOM operations. If not provided, defaults to
the current browser's document object. Useful for server-side rendering or
testing environments.

<!-- DEBUG inheritance start -->

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

##### context? {#context}

```ts
optional context: ResolvedPos;
```

A set of additional nodes to count as
[context](https://prosemirror.net/docs/ref/#model.ParseRule.context) when parsing, above the
given [top node](https://prosemirror.net/docs/ref/#model.ParseOptions.topNode).

<!-- DEBUG inheritance start -->

###### Inherited from

[`ParseOptions`](pm/model.md#parseoptions).[`context`](pm/model.md#parseoptions#context-1)

##### DOMParser? {#domparser}

```ts
optional DOMParser: typeof DOMParser;
```

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

###### offset

```ts
offset: number;
```

<!-- DEBUG inheritance start -->

###### pos?

```ts
optional pos: number;
```

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

###### Inherited from

[`ParseOptions`](pm/model.md#parseoptions).[`findPositions`](pm/model.md#parseoptions#findpositions)

##### from? {#from-1}

```ts
optional from: number;
```

The child node index to start parsing from.

<!-- DEBUG inheritance start -->

###### Inherited from

[`ParseOptions`](pm/model.md#parseoptions).[`from`](pm/model.md#parseoptions#from-3)

##### preserveWhitespace? {#preservewhitespace}

```ts
optional preserveWhitespace: boolean | "full";
```

By default, whitespace is collapsed as per HTML's rules. Pass
`true` to preserve whitespace, but normalize newlines to
spaces, and `"full"` to preserve whitespace entirely.

<!-- DEBUG inheritance start -->

###### Inherited from

[`ParseOptions`](pm/model.md#parseoptions).[`preserveWhitespace`](pm/model.md#parseoptions#preservewhitespace)

##### to? {#to-1}

```ts
optional to: number;
```

The child node index to stop parsing at.

<!-- DEBUG inheritance start -->

###### Inherited from

[`ParseOptions`](pm/model.md#parseoptions).[`to`](pm/model.md#parseoptions#to-1)

##### topMatch? {#topmatch}

```ts
optional topMatch: ContentMatch;
```

Provide the starting content match that content parsed into the
top node is matched against.

<!-- DEBUG inheritance start -->

###### Inherited from

[`ParseOptions`](pm/model.md#parseoptions).[`topMatch`](pm/model.md#parseoptions#topmatch)

##### topNode? {#topnode}

```ts
optional topNode: ProseMirrorNode;
```

By default, the content is parsed into the schema's default
[top node type](https://prosemirror.net/docs/ref/#model.Schema.topNodeType). You can pass this
option to use the type and attributes from a different node
as the top container.

<!-- DEBUG inheritance start -->

###### Inherited from

[`ParseOptions`](pm/model.md#parseoptions).[`topNode`](pm/model.md#parseoptions#topnode)

<!-- DEBUG memberWithGroups 10 -->

***

### DOMSerializerOptions {#domserializeroptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### DOMSerializer? {#domserializer}

```ts
optional DOMSerializer: object;
```

###### fromSchema()

```ts
fromSchema: (schema: Schema) => DOMSerializer;
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

[`Schema`](pm/model.md#schema-3)

</td>
</tr>
</tbody>
</table>

###### Returns

[`DOMSerializer`](pm/model.md#domserializer)

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

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

##### defaultContent? {#defaultcontent-1}

```ts
optional defaultContent: 
  | string
  | NodeJSON
  | HTMLElement;
```

The starting document to use when creating the editor. It can be a
ProseMirror node JSON object, a HTML string, or a HTML element instance.

<!-- DEBUG inheritance start -->

##### ~~defaultDoc?~~ {#defaultdoc-1}

```ts
optional defaultDoc: NodeJSON;
```

A JSON object representing the starting document to use when creating the
editor.

###### Deprecated

Use `defaultContent` instead.

<!-- DEBUG inheritance start -->

##### ~~defaultHTML?~~ {#defaulthtml-1}

```ts
optional defaultHTML: 
  | string
  | HTMLElement;
```

A HTML element or a HTML string representing the starting document to use
when creating the editor.

###### Deprecated

Use `defaultContent` instead.

<!-- DEBUG inheritance start -->

##### defaultSelection? {#defaultselection-1}

```ts
optional defaultSelection: SelectionJSON;
```

A JSON object representing the starting selection to use when creating the
editor. It's only used when `defaultContent` is also provided.

<!-- DEBUG inheritance start -->

##### extension {#extension}

```ts
extension: E;
```

The extension to use when creating the editor.

<!-- DEBUG inheritance start -->

<!-- DEBUG memberWithGroups 10 -->

***

### ExpandMarkOptions {#expandmarkoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### type {#type-1}

```ts
type: string | MarkType;
```

The type of the mark to expand.

<!-- DEBUG inheritance start -->

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

##### \_type? {#_type}

```ts
optional _type: T;
```

<!-- DEBUG inheritance start -->

##### extension {#extension-2}

```ts
extension: 
  | Extension<ExtensionTyping<any, any, any>>
  | Extension<ExtensionTyping<any, any, any>>[];
```

<!-- DEBUG inheritance start -->

##### priority? {#priority-1}

```ts
optional priority: Priority;
```

<!-- DEBUG inheritance start -->

##### schema {#schema-1}

```ts
schema: null | Schema<any, any>;
```

The schema that this extension represents.

<!-- DEBUG inheritance start -->

<!-- DEBUG memberWithGroups 10 -->

***

### FindParentNodeResult {#findparentnoderesult}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### depth {#depth}

```ts
depth: number;
```

The depth of the node.

<!-- DEBUG inheritance start -->

##### node {#node}

```ts
node: ProseMirrorNode;
```

The closest parent node that satisfies the predicate.

<!-- DEBUG inheritance start -->

##### pos {#pos}

```ts
pos: number;
```

The position directly before the node.

<!-- DEBUG inheritance start -->

##### start {#start}

```ts
start: number;
```

The position at the start of the node.

<!-- DEBUG inheritance start -->

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

##### depth? {#depth-1}

```ts
optional depth: number;
```

The amount of history events that are collected before the oldest events
are discarded.

###### Default

```ts
200
```

<!-- DEBUG inheritance start -->

##### newGroupDelay? {#newgroupdelay}

```ts
optional newGroupDelay: number;
```

The delay in milliseconds between changes after which a new group should be
started.

###### Default

```ts
250
```

<!-- DEBUG inheritance start -->

<!-- DEBUG memberWithGroups 10 -->

***

### InsertDefaultBlockOptions {#insertdefaultblockoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### pos? {#pos-1}

```ts
optional pos: number;
```

The position to insert the node at. By default it will insert after the
current selection.

<!-- DEBUG inheritance start -->

<!-- DEBUG memberWithGroups 10 -->

***

### InsertNodeOptions {#insertnodeoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### attrs? {#attrs-1}

```ts
optional attrs: Attrs;
```

When `type` is provided, the attributes of the node to insert.

<!-- DEBUG inheritance start -->

##### node? {#node-1}

```ts
optional node: ProseMirrorNode;
```

The node to insert. Either this or `type` must be provided.

<!-- DEBUG inheritance start -->

##### pos? {#pos-2}

```ts
optional pos: number;
```

The position to insert the node at. By default it will be the anchor
position of current selection.

<!-- DEBUG inheritance start -->

##### type? {#type-2}

```ts
optional type: string | NodeType;
```

The type of the node to insert. Either this or `node` must be provided.

<!-- DEBUG inheritance start -->

<!-- DEBUG memberWithGroups 10 -->

***

### JSONParserOptions {#jsonparseroptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### schema {#schema-2}

```ts
schema: Schema;
```

The editor schema to use.

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### isActive() {#isactive}

```ts
isActive: (attrs?: Attrs) => boolean;
```

Checks if the mark is active in the current editor selection. If the
optional `attrs` parameter is provided, it will check if the mark is active
with the given attributes.

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

`Attrs`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

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

##### attr {#attr}

```ts
attr: AttrName;
```

The name of the attribute.

<!-- DEBUG inheritance start -->

##### default? {#default-1}

```ts
optional default: AttrType;
```

The default value for this attribute, to use when no explicit value is
provided. Attributes that have no default must be provided whenever a node
or mark of a type that has them is created.

<!-- DEBUG inheritance start -->

###### Inherited from

[`AttrSpec`](#attrspec).[`default`](#default-3)

##### parseDOM()? {#parsedom}

```ts
optional parseDOM: (node: HTMLElement) => AttrType;
```

Parses the attribute value from the DOM.

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

`AttrType`

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

##### toDOM()? {#todom}

```ts
optional toDOM: (value: AttrType) => undefined | null | [string, string];
```

Returns the attribute key and value to be set on the HTML element.

If the returned `key` is `"style"`, the value is a string of CSS properties and will
be prepended to the existing `style` attribute on the DOM node.

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

`value`

</td>
<td>

`AttrType`

</td>
<td>

The value of the attribute of current ProseMirror node.

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined` \| `null` \| \[`string`, `string`\]

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

##### type {#type-3}

```ts
type: MarkName;
```

The name of the mark type.

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

###### Inherited from

[`AttrSpec`](#attrspec).[`validate`](#validate-2)

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

##### attrs? {#attrs-4}

```ts
optional attrs: { [K in string | number | symbol]: AttrSpec<Attrs[K]> };
```

The attributes that marks of this type get.

<!-- DEBUG inheritance start -->

###### Overrides

[`MarkSpec`](pm/model.md#markspec).[`attrs`](pm/model.md#markspec#attrs-3)

##### code? {#code}

```ts
optional code: boolean;
```

Marks the content of this span as being code, which causes some
commands and extensions to treat it differently.

<!-- DEBUG inheritance start -->

###### Inherited from

[`MarkSpec`](pm/model.md#markspec).[`code`](pm/model.md#markspec#code)

##### excludes? {#excludes}

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

<!-- DEBUG inheritance start -->

###### Inherited from

[`MarkSpec`](pm/model.md#markspec).[`excludes`](pm/model.md#markspec#excludes-2)

##### group? {#group}

```ts
optional group: string;
```

The group or space-separated groups to which this mark belongs.

<!-- DEBUG inheritance start -->

###### Inherited from

[`MarkSpec`](pm/model.md#markspec).[`group`](pm/model.md#markspec#group)

##### inclusive? {#inclusive}

```ts
optional inclusive: boolean;
```

Whether this mark should be active when the cursor is positioned
at its end (or at its start when that is also the start of the
parent node). Defaults to true.

<!-- DEBUG inheritance start -->

###### Inherited from

[`MarkSpec`](pm/model.md#markspec).[`inclusive`](pm/model.md#markspec#inclusive)

##### name {#name}

```ts
name: MarkName;
```

The name of the mark type.

<!-- DEBUG inheritance start -->

##### parseDOM? {#parsedom-1}

```ts
optional parseDOM: readonly ParseRule[];
```

Associates DOM parser information with this mark (see the
corresponding [node spec field](https://prosemirror.net/docs/ref/#model.NodeSpec.parseDOM)). The
`mark` field in the rules is implied.

<!-- DEBUG inheritance start -->

###### Inherited from

[`MarkSpec`](pm/model.md#markspec).[`parseDOM`](pm/model.md#markspec#parsedom)

##### spanning? {#spanning}

```ts
optional spanning: boolean;
```

Determines whether marks of this type can span multiple adjacent
nodes when serialized to DOM/HTML. Defaults to true.

<!-- DEBUG inheritance start -->

###### Inherited from

[`MarkSpec`](pm/model.md#markspec).[`spanning`](pm/model.md#markspec#spanning)

##### toDOM()? {#todom-1}

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

[`Mark`](pm/model.md#mark)

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

[`DOMOutputSpec`](pm/model.md#domoutputspec)

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

###### Inherited from

[`MarkSpec`](pm/model.md#markspec).[`toDOM`](pm/model.md#markspec#todom)

<!-- DEBUG memberWithGroups 10 -->

***

### MarkViewOptions {#markviewoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### constructor {#constructor}

```ts
constructor: MarkViewConstructor;
```

<!-- DEBUG inheritance start -->

##### name {#name-1}

```ts
name: string;
```

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### isActive() {#isactive-1}

```ts
isActive: (attrs?: Attrs) => boolean;
```

Checks if the node is active in the current editor selection. If the
optional `attrs` parameter is provided, it will check if the node is active
with the given attributes.

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

`Attrs`

</td>
</tr>
</tbody>
</table>

###### Returns

`boolean`

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

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

##### attr {#attr-1}

```ts
attr: AttrName;
```

The name of the attribute.

<!-- DEBUG inheritance start -->

##### default? {#default-2}

```ts
optional default: AttrType;
```

The default value for this attribute, to use when no explicit value is
provided. Attributes that have no default must be provided whenever a node
or mark of a type that has them is created.

<!-- DEBUG inheritance start -->

###### Inherited from

[`AttrSpec`](#attrspec).[`default`](#default-3)

##### parseDOM()? {#parsedom-2}

```ts
optional parseDOM: (node: HTMLElement) => AttrType;
```

Parses the attribute value from the DOM.

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

`AttrType`

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

##### splittable? {#splittable}

```ts
optional splittable: boolean;
```

Whether the attribute should be kept when the node is split. Set it to
`true` if you want to inherit the attribute from the previous node when
splitting the node by pressing `Enter`.

###### Default

```ts
undefined
```

<!-- DEBUG inheritance start -->

##### toDOM()? {#todom-2}

```ts
optional toDOM: (value: AttrType) => undefined | null | [string, string];
```

Returns the attribute key and value to be set on the HTML element.

If the returned `key` is `"style"`, the value is a string of CSS properties and will
be prepended to the existing `style` attribute on the DOM node.

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

`value`

</td>
<td>

`AttrType`

</td>
<td>

The value of the attribute of current ProseMirror node.

</td>
</tr>
</tbody>
</table>

###### Returns

`undefined` \| `null` \| \[`string`, `string`\]

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

##### type {#type-4}

```ts
type: NodeName;
```

The name of the node type.

<!-- DEBUG inheritance start -->

##### validate? {#validate-1}

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

<!-- DEBUG inheritance start -->

###### Inherited from

[`AttrSpec`](#attrspec).[`validate`](#validate-2)

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

##### attrs? {#attrs-6}

```ts
optional attrs: Record<string, any>;
```

<!-- DEBUG inheritance start -->

##### content? {#content}

```ts
optional content: NodeJSON[];
```

<!-- DEBUG inheritance start -->

##### marks? {#marks-1}

```ts
optional marks: object[];
```

###### attrs?

```ts
optional attrs: Record<string, any>;
```

<!-- DEBUG inheritance start -->

###### type

```ts
type: string;
```

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

##### text? {#text}

```ts
optional text: string;
```

<!-- DEBUG inheritance start -->

##### type {#type-5}

```ts
type: string;
```

<!-- DEBUG inheritance start -->

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

##### atom? {#atom}

```ts
optional atom: boolean;
```

Can be set to true to indicate that, though this isn't a [leaf
node](https://prosemirror.net/docs/ref/#model.NodeType.isLeaf), it doesn't have directly editable
content and should be treated as a single unit in the view.

<!-- DEBUG inheritance start -->

###### Inherited from

[`NodeSpec`](pm/model.md#nodespec).[`atom`](pm/model.md#nodespec#atom)

##### attrs? {#attrs-8}

```ts
optional attrs: { [key in string | number | symbol]: AttrSpec<Attrs[key]> };
```

The attributes that nodes of this type get.

<!-- DEBUG inheritance start -->

###### Overrides

[`NodeSpec`](pm/model.md#nodespec).[`attrs`](pm/model.md#nodespec#attrs-4)

##### code? {#code-1}

```ts
optional code: boolean;
```

Can be used to indicate that this node contains code, which
causes some commands to behave differently.

<!-- DEBUG inheritance start -->

###### Inherited from

[`NodeSpec`](pm/model.md#nodespec).[`code`](pm/model.md#nodespec#code-1)

##### content? {#content-1}

```ts
optional content: string;
```

The content expression for this node, as described in the [schema
guide](https://prosemirror.net/docs/guide/#schema.content_expressions). When not given,
the node does not allow any content.

<!-- DEBUG inheritance start -->

###### Inherited from

[`NodeSpec`](pm/model.md#nodespec).[`content`](pm/model.md#nodespec#content-3)

##### defining? {#defining}

```ts
optional defining: boolean;
```

When enabled, enables both
[`definingAsContext`](https://prosemirror.net/docs/ref/#model.NodeSpec.definingAsContext) and
[`definingForContent`](https://prosemirror.net/docs/ref/#model.NodeSpec.definingForContent).

<!-- DEBUG inheritance start -->

###### Inherited from

[`NodeSpec`](pm/model.md#nodespec).[`defining`](pm/model.md#nodespec#defining)

##### definingAsContext? {#definingascontext}

```ts
optional definingAsContext: boolean;
```

Determines whether this node is considered an important parent
node during replace operations (such as paste). Non-defining (the
default) nodes get dropped when their entire content is replaced,
whereas defining nodes persist and wrap the inserted content.

<!-- DEBUG inheritance start -->

###### Inherited from

[`NodeSpec`](pm/model.md#nodespec).[`definingAsContext`](pm/model.md#nodespec#definingascontext)

##### definingForContent? {#definingforcontent}

```ts
optional definingForContent: boolean;
```

In inserted content the defining parents of the content are
preserved when possible. Typically, non-default-paragraph
textblock types, and possibly list items, are marked as defining.

<!-- DEBUG inheritance start -->

###### Inherited from

[`NodeSpec`](pm/model.md#nodespec).[`definingForContent`](pm/model.md#nodespec#definingforcontent)

##### disableDropCursor? {#disabledropcursor}

```ts
optional disableDropCursor: 
  | boolean
  | (view: EditorView, pos: object, event: DragEvent) => boolean;
```

<!-- DEBUG inheritance start -->

###### Inherited from

[`NodeSpec`](pm/model.md#nodespec).[`disableDropCursor`](pm/model.md#nodespec#disabledropcursor)

##### draggable? {#draggable}

```ts
optional draggable: boolean;
```

Determines whether nodes of this type can be dragged without
being selected. Defaults to false.

<!-- DEBUG inheritance start -->

###### Inherited from

[`NodeSpec`](pm/model.md#nodespec).[`draggable`](pm/model.md#nodespec#draggable)

##### group? {#group-1}

```ts
optional group: string;
```

The group or space-separated groups to which this node belongs,
which can be referred to in the content expressions for the
schema.

<!-- DEBUG inheritance start -->

###### Inherited from

[`NodeSpec`](pm/model.md#nodespec).[`group`](pm/model.md#nodespec#group-1)

##### inline? {#inline}

```ts
optional inline: boolean;
```

Should be set to true for inline nodes. (Implied for text nodes.)

<!-- DEBUG inheritance start -->

###### Inherited from

[`NodeSpec`](pm/model.md#nodespec).[`inline`](pm/model.md#nodespec#inline)

##### isolating? {#isolating}

```ts
optional isolating: boolean;
```

When enabled (default is false), the sides of nodes of this type
count as boundaries that regular editing operations, like
backspacing or lifting, won't cross. An example of a node that
should probably have this enabled is a table cell.

<!-- DEBUG inheritance start -->

###### Inherited from

[`NodeSpec`](pm/model.md#nodespec).[`isolating`](pm/model.md#nodespec#isolating)

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

[`ProseMirrorNode`](pm/model.md#prosemirrornode)

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

###### Inherited from

[`NodeSpec`](pm/model.md#nodespec).[`leafText`](pm/model.md#nodespec#leaftext)

##### linebreakReplacement? {#linebreakreplacement}

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

<!-- DEBUG inheritance start -->

###### Inherited from

[`NodeSpec`](pm/model.md#nodespec).[`linebreakReplacement`](pm/model.md#nodespec#linebreakreplacement-1)

##### marks? {#marks-2}

```ts
optional marks: string;
```

The marks that are allowed inside of this node. May be a
space-separated string referring to mark names or groups, `"_"`
to explicitly allow all marks, or `""` to disallow marks. When
not given, nodes with inline content default to allowing all
marks, other nodes default to not allowing marks.

<!-- DEBUG inheritance start -->

###### Inherited from

[`NodeSpec`](pm/model.md#nodespec).[`marks`](pm/model.md#nodespec#marks-6)

##### name {#name-2}

```ts
name: NodeName;
```

The name of the node type.

<!-- DEBUG inheritance start -->

##### parseDOM? {#parsedom-3}

```ts
optional parseDOM: readonly TagParseRule[];
```

Associates DOM parser information with this node, which can be
used by [`DOMParser.fromSchema`](https://prosemirror.net/docs/ref/#model.DOMParser^fromSchema) to
automatically derive a parser. The `node` field in the rules is
implied (the name of this node will be filled in automatically).
If you supply your own parser, you do not need to also specify
parsing rules in your schema.

<!-- DEBUG inheritance start -->

###### Inherited from

[`NodeSpec`](pm/model.md#nodespec).[`parseDOM`](pm/model.md#nodespec#parsedom-1)

##### selectable? {#selectable}

```ts
optional selectable: boolean;
```

Controls whether nodes of this type can be selected as a [node
selection](https://prosemirror.net/docs/ref/#state.NodeSelection). Defaults to true for non-text
nodes.

<!-- DEBUG inheritance start -->

###### Inherited from

[`NodeSpec`](pm/model.md#nodespec).[`selectable`](pm/model.md#nodespec#selectable)

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

[`ProseMirrorNode`](pm/model.md#prosemirrornode)

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

###### Inherited from

[`NodeSpec`](pm/model.md#nodespec).[`toDebugString`](pm/model.md#nodespec#todebugstring)

##### toDOM()? {#todom-3}

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

[`ProseMirrorNode`](pm/model.md#prosemirrornode)

</td>
</tr>
</tbody>
</table>

###### Returns

[`DOMOutputSpec`](pm/model.md#domoutputspec)

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

###### Inherited from

[`NodeSpec`](pm/model.md#nodespec).[`toDOM`](pm/model.md#nodespec#todom-1)

##### topNode? {#topnode-1}

```ts
optional topNode: boolean;
```

Whether this is the top-level node type. Only one node type can be the
top-level node type in a schema.

<!-- DEBUG inheritance start -->

##### whitespace? {#whitespace}

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

<!-- DEBUG inheritance start -->

###### Inherited from

[`NodeSpec`](pm/model.md#nodespec).[`whitespace`](pm/model.md#nodespec#whitespace-1)

<!-- DEBUG memberWithGroups 10 -->

***

### NodeViewOptions {#nodeviewoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### constructor {#constructor-1}

```ts
constructor: NodeViewConstructor;
```

<!-- DEBUG inheritance start -->

##### name {#name-3}

```ts
name: string;
```

<!-- DEBUG inheritance start -->

<!-- DEBUG memberWithGroups 10 -->

***

### RemoveMarkOptions {#removemarkoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### attrs? {#attrs-9}

```ts
optional attrs: null | Attrs;
```

If attrs is given, remove precisely the mark with the given attrs. Otherwise, remove all marks of the given type.

<!-- DEBUG inheritance start -->

##### from? {#from-2}

```ts
optional from: number;
```

The start position of the document. By default it will be the start position of current selection.

<!-- DEBUG inheritance start -->

##### to? {#to-2}

```ts
optional to: number;
```

The end position of the document. By default it will be the end position of current selection.

<!-- DEBUG inheritance start -->

##### type {#type-6}

```ts
type: string | MarkType;
```

The type of the mark to remove.

<!-- DEBUG inheritance start -->

<!-- DEBUG memberWithGroups 10 -->

***

### RemoveNodeOptions {#removenodeoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### pos? {#pos-3}

```ts
optional pos: number;
```

The document position to start searching node. By default it will be the
anchor position of current selection.

<!-- DEBUG inheritance start -->

##### type {#type-7}

```ts
type: string | NodeType;
```

The type of the node to remove.

<!-- DEBUG inheritance start -->

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

##### anchor {#anchor}

```ts
anchor: number;
```

<!-- DEBUG inheritance start -->

##### head {#head}

```ts
head: number;
```

<!-- DEBUG inheritance start -->

##### type {#type-8}

```ts
type: string;
```

<!-- DEBUG inheritance start -->

<!-- DEBUG memberWithGroups 10 -->

***

### SetBlockTypeOptions {#setblocktypeoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### attrs? {#attrs-10}

```ts
optional attrs: null | Attrs;
```

<!-- DEBUG inheritance start -->

##### from? {#from-3}

```ts
optional from: number;
```

<!-- DEBUG inheritance start -->

##### to? {#to-3}

```ts
optional to: number;
```

<!-- DEBUG inheritance start -->

##### type {#type-9}

```ts
type: string | NodeType;
```

<!-- DEBUG inheritance start -->

<!-- DEBUG memberWithGroups 10 -->

***

### SetNodeAttrsOptions {#setnodeattrsoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### attrs {#attrs-11}

```ts
attrs: Attrs;
```

The attributes to set.

<!-- DEBUG inheritance start -->

##### pos? {#pos-4}

```ts
optional pos: number;
```

The position of the node. Defaults to the position of the wrapping node
containing the current selection.

<!-- DEBUG inheritance start -->

##### type {#type-10}

```ts
type: 
  | string
  | NodeType
  | string[]
  | NodeType[];
```

The type of node to set the attributes of.

If current node is not of this type, the command will do nothing.

<!-- DEBUG inheritance start -->

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

##### doc {#doc}

```ts
doc: NodeJSON;
```

The main `ProseMirror` doc.

<!-- DEBUG inheritance start -->

##### selection {#selection}

```ts
selection: SelectionJSON;
```

The current selection.

<!-- DEBUG inheritance start -->

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

##### stepType {#steptype}

```ts
stepType: string;
```

The type of the step.

<!-- DEBUG inheritance start -->

<!-- DEBUG memberWithGroups 10 -->

***

### ToggleMarkOptions {#togglemarkoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### attrs? {#attrs-12}

```ts
optional attrs: null | Attrs;
```

The optional attributes to set on the mark.

<!-- DEBUG inheritance start -->

##### enterInlineAtoms? {#enterinlineatoms}

```ts
optional enterInlineAtoms: boolean;
```

Whether the command should act on the content of inline nodes marked as
[atoms](https://prosemirror.net/docs/ref/#model.NodeSpec.atom) that are
completely covered by a selection range.

###### Default

```ts
true
```

<!-- DEBUG inheritance start -->

##### removeWhenPresent? {#removewhenpresent}

```ts
optional removeWhenPresent: boolean;
```

Controls whether, when part of the selected range has the mark
already and part doesn't, the mark is removed (`true`) or added
(`false`).

###### Default

```ts
false
```

<!-- DEBUG inheritance start -->

##### type {#type-11}

```ts
type: string | MarkType;
```

The mark type to toggle.

<!-- DEBUG inheritance start -->

<!-- DEBUG memberWithGroups 10 -->

***

### ToggleNodeOptions {#togglenodeoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### attrs? {#attrs-13}

```ts
optional attrs: null | Attrs;
```

The attributes of the node to toggle.

<!-- DEBUG inheritance start -->

##### type {#type-12}

```ts
type: string | NodeType;
```

The type of the node to toggle.

<!-- DEBUG inheritance start -->

<!-- DEBUG memberWithGroups 10 -->

***

### ToggleWrapOptions {#togglewrapoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### attrs? {#attrs-14}

```ts
optional attrs: null | Attrs;
```

The attributes of the node to toggle.

<!-- DEBUG inheritance start -->

##### type {#type-13}

```ts
type: string | NodeType;
```

The type of the node to toggle.

<!-- DEBUG inheritance start -->

<!-- DEBUG memberWithGroups 10 -->

***

### UnsetBlockTypeOptions {#unsetblocktypeoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### from? {#from-4}

```ts
optional from: number;
```

The start position of the document. By default it will be the start position of current selection.

<!-- DEBUG inheritance start -->

##### to? {#to-4}

```ts
optional to: number;
```

The end position of the document. By default it will be the end position of current selection.

<!-- DEBUG inheritance start -->

<!-- DEBUG memberWithGroups 10 -->

***

### UnsetMarkOptions {#unsetmarkoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### from? {#from-5}

```ts
optional from: number;
```

The start position of the document. By default it will be the start position of current selection.

<!-- DEBUG inheritance start -->

##### to? {#to-5}

```ts
optional to: number;
```

The end position of the document. By default it will be the end position of current selection.

<!-- DEBUG inheritance start -->

<!-- DEBUG memberWithGroups 10 -->

***

### WrapOptions {#wrapoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### attrs? {#attrs-15}

```ts
optional attrs: null | Attrs;
```

Optional attributes to apply to the node.

<!-- DEBUG inheritance start -->

##### ~~nodeType?~~ {#nodetype}

```ts
optional nodeType: NodeType;
```

###### Deprecated

Use `nodeSpec` instead.

<!-- DEBUG inheritance start -->

##### type {#type-14}

```ts
type: string | NodeType;
```

The node type to wrap the selected textblock with.

<!-- DEBUG inheritance start -->

<!-- DEBUG memberWithGroups 10 -->

## Type Aliases

### AnyAttrs {#anyattrs}

```ts
type AnyAttrs = Attrs;
```

An object holding the attributes of a node.

<!-- DEBUG inheritance start -->

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

##### default? {#default-3}

```ts
optional default: AttrType;
```

The default value for this attribute, to use when no explicit value is
provided. Attributes that have no default must be provided whenever a node
or mark of a type that has them is created.

<!-- DEBUG inheritance start -->

##### validate? {#validate-2}

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

***

### ~~MarkBuilder~~ {#markbuilder}

```ts
type MarkBuilder = MarkAction;
```

#### Deprecated

Use type [MarkAction](#markaction) instead.

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

***

### ~~NodeBuilder~~ {#nodebuilder}

```ts
type NodeBuilder = NodeAction;
```

#### Deprecated

Use type [NodeAction](#nodeaction) instead.

<!-- DEBUG inheritance start -->

***

### NodeChild {#nodechild}

```ts
type NodeChild = 
  | ProseMirrorNode
  | string
  | NodeChild[];
```

Available children parameters for [NodeAction](#nodeaction) and [MarkAction](#markaction).

<!-- DEBUG inheritance start -->

***

### ~~NodeContent~~ {#nodecontent}

```ts
type NodeContent = 
  | ProseMirrorNode
  | ProseMirrorFragment
  | NodeContent[];
```

#### Deprecated

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

***

### UnmountHandler() {#unmounthandler}

```ts
type UnmountHandler = () => void;
```

A function that is called when the editor view is unmounted.

#### Returns

`void`

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

## Variables

### canUseRegexLookbehind() {#canuseregexlookbehind}

```ts
const canUseRegexLookbehind: () => boolean;
```

#### Returns

`boolean`

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

***

### defineBaseCommands() {#definebasecommands}

```ts
function defineBaseCommands(): BaseCommandsExtension;
```

Add some base commands

#### Returns

`BaseCommandsExtension`

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

`Attrs` *extends* [`Attrs`](pm/model.md#attrs-7)

</td>
<td>

[`Attrs`](pm/model.md#attrs-7)

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

`Attrs` *extends* [`Attrs`](pm/model.md#attrs-7)

</td>
<td>

[`Attrs`](pm/model.md#attrs-7)

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

<!-- DEBUG memberWithGroups 10 -->
