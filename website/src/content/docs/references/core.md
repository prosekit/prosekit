---
title: prosekit/core
sidebar:
  label: core
---

<!-- DEBUG memberWithGroups start 1 -->

## Enumerations

### Priority {#priority}

<!-- DEBUG memberWithGroups start 1 -->

ProseKit extension priority.

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

<!-- DEBUG memberWithGroups end 9 -->

## Classes

### Editor\<E\> {#editor}

<!-- DEBUG memberWithGroups start 1 -->

#### Accessors

##### commands {#commands}

<!-- DEBUG accessor step 1 -->

###### Get Signature

<!-- DEBUG accessor step 2 -->

<code data-typedoc-declaration>get <i></i> <a id="commandscommands" href="#commandscommands">commands</a>(): [`ExtractCommandActions`](#extractcommandactions)\<`E`\></code>

<!-- DEBUG accessor step 3 -->

<!-- DEBUG accessor step 4 -->

All [CommandAction](#commandaction)s defined by the editor.

<!-- DEBUG accessor step 5 -->

<!-- DEBUG accessor step 6 -->

##### focused {#focused}

<!-- DEBUG accessor step 1 -->

###### Get Signature

<!-- DEBUG accessor step 2 -->

<code data-typedoc-declaration>get <i></i> <a id="focusedfocused" href="#focusedfocused">focused</a>(): `boolean`</code>

<!-- DEBUG accessor step 3 -->

<!-- DEBUG accessor step 4 -->

Whether the editor is focused.

<!-- DEBUG accessor step 5 -->

<!-- DEBUG accessor step 6 -->

##### marks {#marks}

<!-- DEBUG accessor step 1 -->

###### Get Signature

<!-- DEBUG accessor step 2 -->

<code data-typedoc-declaration>get <i></i> <a id="marksmarks" href="#marksmarks">marks</a>(): [`ExtractMarkActions`](#extractmarkactions)\<`E`\></code>

<!-- DEBUG accessor step 3 -->

<!-- DEBUG accessor step 4 -->

All [MarkAction](#markaction)s defined by the editor.

<!-- DEBUG accessor step 5 -->

<!-- DEBUG accessor step 6 -->

##### mounted {#mounted}

<!-- DEBUG accessor step 1 -->

###### Get Signature

<!-- DEBUG accessor step 2 -->

<code data-typedoc-declaration>get <i></i> <a id="mountedmounted" href="#mountedmounted">mounted</a>(): `boolean`</code>

<!-- DEBUG accessor step 3 -->

<!-- DEBUG accessor step 4 -->

Whether the editor is mounted.

<!-- DEBUG accessor step 5 -->

<!-- DEBUG accessor step 6 -->

##### nodes {#nodes}

<!-- DEBUG accessor step 1 -->

###### Get Signature

<!-- DEBUG accessor step 2 -->

<code data-typedoc-declaration>get <i></i> <a id="nodesnodes" href="#nodesnodes">nodes</a>(): [`ExtractNodeActions`](#extractnodeactions)\<`E`\></code>

<!-- DEBUG accessor step 3 -->

<!-- DEBUG accessor step 4 -->

All [NodeAction](#nodeaction)s defined by the editor.

<!-- DEBUG accessor step 5 -->

<!-- DEBUG accessor step 6 -->

##### schema {#schema}

<!-- DEBUG accessor step 1 -->

###### Get Signature

<!-- DEBUG accessor step 2 -->

<code data-typedoc-declaration>get <i></i> <a id="schemaschema" href="#schemaschema">schema</a>(): [`Schema`](pm/model.md#schema-3)\<`ExtractNodeNames`\<`E`\>, `ExtractMarkNames`\<`E`\>\></code>

<!-- DEBUG accessor step 3 -->

<!-- DEBUG accessor step 4 -->

The editor schema.

<!-- DEBUG accessor step 5 -->

<!-- DEBUG accessor step 6 -->

##### state {#state}

<!-- DEBUG accessor step 1 -->

###### Get Signature

<!-- DEBUG accessor step 2 -->

<code data-typedoc-declaration>get <i></i> <a id="statestate" href="#statestate">state</a>(): [`EditorState`](pm/state.md#editorstate)</code>

<!-- DEBUG accessor step 3 -->

<!-- DEBUG accessor step 4 -->

The editor's current state.

<!-- DEBUG accessor step 5 -->

<!-- DEBUG accessor step 6 -->

##### view {#view}

<!-- DEBUG accessor step 1 -->

###### Get Signature

<!-- DEBUG accessor step 2 -->

<code data-typedoc-declaration>get <i></i> <a id="viewview" href="#viewview">view</a>(): [`EditorView`](pm/view.md#editorview)</code>

<!-- DEBUG accessor step 3 -->

<!-- DEBUG accessor step 4 -->

The editor view.

<!-- DEBUG accessor step 5 -->

<!-- DEBUG accessor step 6 -->

#### Methods

##### blur() {#blur}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="blur-1" href="#blur-1">blur</a>(): `void`</code>

</dt>

<dd>

Blur the editor.

</dd>

</dl>

##### canExec() {#canexec}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="canexec-1" href="#canexec-1">canExec</a>(`command`: [`Command`](pm/state.md#command)): `boolean`</code>

</dt>

<dd>

Check if the given command can be executed. Return `true` if the command
can be executed, otherwise `false`.

</dd>

</dl>

##### exec() {#exec}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="exec-1" href="#exec-1">exec</a>(`command`: [`Command`](pm/state.md#command)): `boolean`</code>

</dt>

<dd>

Execute the given command. Return `true` if the command was successfully
executed, otherwise `false`.

</dd>

</dl>

##### focus() {#focus}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="focus-1" href="#focus-1">focus</a>(): `void`</code>

</dt>

<dd>

Focus the editor.

</dd>

</dl>

##### getDocHTML() {#getdochtml}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="getdochtml-1" href="#getdochtml-1">getDocHTML</a>(`options?`: `getDocHTMLOptions`): `string`</code>

</dt>

<dd>

Return a HTML string representing the editor's current document.

</dd>

</dl>

##### getDocJSON() {#getdocjson}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="getdocjson-1" href="#getdocjson-1">getDocJSON</a>(): [`NodeJSON`](#nodejson)</code>

</dt>

<dd>

Return a JSON object representing the editor's current document.

</dd>

</dl>

##### mount() {#mount}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="mount-1" href="#mount-1">mount</a>(`place`: `undefined` \| `null` \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)): `void`</code>

</dt>

<dd>

Mount the editor to the given HTML element.
Pass `null` or `undefined` to unmount the editor.

</dd>

</dl>

##### setContent() {#setcontent}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="setcontent-1" href="#setcontent-1">setContent</a>(`content`: `string` \| [`ProseMirrorNode`](pm/model.md#prosemirrornode) \| [`NodeJSON`](#nodejson) \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement), `selection?`: [`Selection`](pm/state.md#selection-1) \| `"start"` \| [`SelectionJSON`](#selectionjson) \| `"end"`): `void`</code>

</dt>

<dd>

Update the editor's document and selection.

</dd>

</dl>

##### unmount() {#unmount}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="unmount-1" href="#unmount-1">unmount</a>(): `void`</code>

</dt>

<dd>

Unmount the editor. This is equivalent to `mount(null)`.

</dd>

</dl>

##### updateState() {#updatestate}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="updatestate-1" href="#updatestate-1">updateState</a>(`state`: [`EditorState`](pm/state.md#editorstate)): `void`</code>

</dt>

<dd>

Update the editor's state.

###### Remarks

This is an advanced method. Use it only if you have a specific reason to
directly manipulate the editor's state.

</dd>

</dl>

##### use() {#use}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="use-1" href="#use-1">use</a>(`extension`: [`Extension`](#extension-1)): `VoidFunction`</code>

</dt>

<dd>

Register an extension to the editor. Return a function to unregister the
extension.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

## Interfaces

### AddMarkOptions {#addmarkoptions}

<!-- DEBUG memberWithGroups start 1 -->

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="attrs" href="#attrs">attrs</a><i>?</i>: `null` \| [`Attrs`](pm/model.md#attrs-7)</code>

</dt>

<dd>

The attributes of the mark to add.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="from" href="#from">from</a><i>?</i>: `number`</code>

</dt>

<dd>

The start position of the document. By default it will be the start position of current selection.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="to" href="#to">to</a><i>?</i>: `number`</code>

</dt>

<dd>

The end position of the document. By default it will be the end position of current selection.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="type" href="#type">type</a>: `string` \| [`MarkType`](pm/model.md#marktype-1)</code>

</dt>

<dd>

The type of the mark to add.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### CommandAction()\<Args\> {#commandaction}

<!-- DEBUG memberWithGroups start 1 -->

A function to apply a command to the editor. It will return `true` if the command was applied, and `false` otherwise.

It also has a `canExec` method to check if the command can be applied.

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="commandaction-1" href="#commandaction-1">CommandAction</a>(...`args`: `Args`): `boolean`</code>

</dt>

<dd>

Execute the current command. Return `true` if the command was successfully
executed, otherwise `false`.

</dd>

</dl>

#### Methods

##### ~~canApply()~~ {#canapply}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="canapply-1" href="#canapply-1">canApply</a>(...`args`: `Args`): `boolean`</code>

</dt>

<dd>

An alias for `canExec`.

###### Deprecated

Use `canExec` instead.

</dd>

</dl>

##### canExec() {#canexec-2}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="canexec-3" href="#canexec-3">canExec</a>(...`args`: `Args`): `boolean`</code>

</dt>

<dd>

Check if the current command can be executed. Return `true` if the command
can be executed, otherwise `false`.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### DefaultStateOptions {#defaultstateoptions}

<!-- DEBUG memberWithGroups start 1 -->

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="defaultcontent" href="#defaultcontent">defaultContent</a><i>?</i>: `string` \| [`NodeJSON`](#nodejson) \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)</code>

</dt>

<dd>

The starting document to use when creating the editor. It can be a
ProseMirror node JSON object, a HTML string, or a HTML element instance.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="defaultdoc" href="#defaultdoc">defaultDoc</a><i>?</i>: [`NodeJSON`](#nodejson)</code>

</dt>

<dd>

A JSON object representing the starting document to use when creating the
editor.

###### Deprecated

Use `defaultContent` instead.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="defaulthtml" href="#defaulthtml">defaultHTML</a><i>?</i>: `string` \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)</code>

</dt>

<dd>

A HTML element or a HTML string representing the starting document to use
when creating the editor.

###### Deprecated

Use `defaultContent` instead.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="defaultselection" href="#defaultselection">defaultSelection</a><i>?</i>: [`SelectionJSON`](#selectionjson)</code>

</dt>

<dd>

A JSON object representing the starting selection to use when creating the
editor. It's only used when `defaultContent` is also provided.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### DOMDocumentOptions {#domdocumentoptions}

<!-- DEBUG memberWithGroups start 1 -->

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="document" href="#document">document</a><i>?</i>: [`Document`](https://developer.mozilla.org/docs/Web/API/Document)</code>

</dt>

<dd>

The Document object to use for DOM operations. If not provided, defaults to
the current browser's document object. Useful for server-side rendering or
testing environments.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### DOMParserOptions {#domparseroptions}

<!-- DEBUG memberWithGroups start 1 -->

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="context" href="#context">context</a><i>?</i>: [`ResolvedPos`](pm/model.md#resolvedpos)</code>

</dt>

<dd>

A set of additional nodes to count as
[context](https://prosemirror.net/docs/ref/#model.ParseRule.context) when parsing, above the
given [top node](https://prosemirror.net/docs/ref/#model.ParseOptions.topNode).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="domparser" href="#domparser">DOMParser</a><i>?</i>: *typeof* [`DOMParser`](pm/model.md#domparser)</code>

</dt>

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

<code data-typedoc-declaration><i></i> <a id="from-1" href="#from-1">from</a><i>?</i>: `number`</code>

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

<code data-typedoc-declaration><i></i> <a id="topmatch" href="#topmatch">topMatch</a><i>?</i>: [`ContentMatch`](pm/model.md#contentmatch)</code>

</dt>

<dd>

Provide the starting content match that content parsed into the
top node is matched against.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="topnode" href="#topnode">topNode</a><i>?</i>: [`ProseMirrorNode`](pm/model.md#prosemirrornode)</code>

</dt>

<dd>

By default, the content is parsed into the schema's default
[top node type](https://prosemirror.net/docs/ref/#model.Schema.topNodeType). You can pass this
option to use the type and attributes from a different node
as the top container.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### DOMSerializerOptions {#domserializeroptions}

<!-- DEBUG memberWithGroups start 1 -->

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="domserializer" href="#domserializer">DOMSerializer</a><i>?</i>: `object`</code>

</dt>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### EditorOptions\<E\> {#editoroptions}

<!-- DEBUG memberWithGroups start 1 -->

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="defaultcontent-1" href="#defaultcontent-1">defaultContent</a><i>?</i>: `string` \| [`NodeJSON`](#nodejson) \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)</code>

</dt>

<dd>

The starting document to use when creating the editor. It can be a
ProseMirror node JSON object, a HTML string, or a HTML element instance.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="defaultdoc-1" href="#defaultdoc-1">defaultDoc</a><i>?</i>: [`NodeJSON`](#nodejson)</code>

</dt>

<dd>

A JSON object representing the starting document to use when creating the
editor.

###### Deprecated

Use `defaultContent` instead.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="defaulthtml-1" href="#defaulthtml-1">defaultHTML</a><i>?</i>: `string` \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)</code>

</dt>

<dd>

A HTML element or a HTML string representing the starting document to use
when creating the editor.

###### Deprecated

Use `defaultContent` instead.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="defaultselection-1" href="#defaultselection-1">defaultSelection</a><i>?</i>: [`SelectionJSON`](#selectionjson)</code>

</dt>

<dd>

A JSON object representing the starting selection to use when creating the
editor. It's only used when `defaultContent` is also provided.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="extension" href="#extension">extension</a>: `E`</code>

</dt>

<dd>

The extension to use when creating the editor.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### ExpandMarkOptions {#expandmarkoptions}

<!-- DEBUG memberWithGroups start 1 -->

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="type-1" href="#type-1">type</a>: `string` \| [`MarkType`](pm/model.md#marktype-1)</code>

</dt>

<dd>

The type of the mark to expand.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### Extension\<T\> {#extension-1}

<!-- DEBUG memberWithGroups start 1 -->

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="extension-2" href="#extension-2">extension</a>: [`Extension`](#extension-1)\<`ExtensionTyping`\<`any`, `any`, `any`\>\> \| [`Extension`](#extension-1)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>[]</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="priority-1" href="#priority-1">priority</a><i>?</i>: [`Priority`](#priority)</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="schema-1" href="#schema-1">schema</a>: `null` \| [`Schema`](pm/model.md#schema-3)\<`any`, `any`\></code>

</dt>

<dd>

The schema that this extension represents.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### Facet\<Input, Output\> {#facet}

<!-- DEBUG memberWithGroups start 1 -->

#### Accessors

##### reducer {#reducer}

<!-- DEBUG accessor step 1 -->

###### Get Signature

<!-- DEBUG accessor step 2 -->

<code data-typedoc-declaration>get <i></i> <a id="reducerreducer" href="#reducerreducer">reducer</a>(): `FacetReducer`\<`Input`, `Output`\></code>

<!-- DEBUG accessor step 3 -->

<!-- DEBUG accessor step 4 -->

<!-- DEBUG accessor step 5 -->

<!-- DEBUG accessor step 6 -->

<!-- DEBUG memberWithGroups end 9 -->

***

### FindParentNodeResult {#findparentnoderesult}

<!-- DEBUG memberWithGroups start 1 -->

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="depth" href="#depth">depth</a>: `number`</code>

</dt>

<dd>

The depth of the node.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="node" href="#node">node</a>: [`ProseMirrorNode`](pm/model.md#prosemirrornode)</code>

</dt>

<dd>

The closest parent node that satisfies the predicate.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="pos" href="#pos">pos</a>: `number`</code>

</dt>

<dd>

The position directly before the node.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="start" href="#start">start</a>: `number`</code>

</dt>

<dd>

The position at the start of the node.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### HistoryOptions {#historyoptions}

<!-- DEBUG memberWithGroups start 1 -->

Options for [defineHistory](#definehistory).

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="depth-1" href="#depth-1">depth</a><i>?</i>: `number`</code>

</dt>

<dd>

The amount of history events that are collected before the oldest events
are discarded.

###### Default

```ts
200
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="newgroupdelay" href="#newgroupdelay">newGroupDelay</a><i>?</i>: `number`</code>

</dt>

<dd>

The delay in milliseconds between changes after which a new group should be
started.

###### Default

```ts
250
```

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### InsertDefaultBlockOptions {#insertdefaultblockoptions}

<!-- DEBUG memberWithGroups start 1 -->

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="pos-1" href="#pos-1">pos</a><i>?</i>: `number`</code>

</dt>

<dd>

The position to insert the node at. By default it will insert after the
current selection.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### InsertNodeOptions {#insertnodeoptions}

<!-- DEBUG memberWithGroups start 1 -->

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="attrs-1" href="#attrs-1">attrs</a><i>?</i>: [`Attrs`](pm/model.md#attrs-7)</code>

</dt>

<dd>

When `type` is provided, the attributes of the node to insert.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="node-1" href="#node-1">node</a><i>?</i>: [`ProseMirrorNode`](pm/model.md#prosemirrornode)</code>

</dt>

<dd>

The node to insert. Either this or `type` must be provided.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="pos-2" href="#pos-2">pos</a><i>?</i>: `number`</code>

</dt>

<dd>

The position to insert the node at. By default it will be the anchor
position of current selection.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="type-2" href="#type-2">type</a><i>?</i>: `string` \| [`NodeType`](pm/model.md#nodetype)</code>

</dt>

<dd>

The type of the node to insert. Either this or `node` must be provided.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### JSONParserOptions {#jsonparseroptions}

<!-- DEBUG memberWithGroups start 1 -->

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="schema-2" href="#schema-2">schema</a>: [`Schema`](pm/model.md#schema-3)</code>

</dt>

<dd>

The editor schema to use.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### Keymap {#keymap}

<!-- DEBUG memberWithGroups start 1 -->

#### Indexable

\[`key`: `string`\]: [`Command`](pm/state.md#command)

<!-- DEBUG memberWithGroups end 9 -->

***

### MarkAction()\<Attrs\> {#markaction}

<!-- DEBUG memberWithGroups start 1 -->

A function for applying a mark with optional attributes and any number of
children.

It also has a `isActive` method for checking if the mark is active in the
current editor selection.

#### Call Signature

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="markaction-1" href="#markaction-1">MarkAction</a>(`attrs`: `null` \| `Attrs`, ...`children`: [`NodeChild`](#nodechild)[]): [`ProseMirrorNode`](pm/model.md#prosemirrornode)[]</code>

</dt>

<dd>

Applies a mark with attributes and any number of children.

</dd>

</dl>

#### Call Signature

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="markaction-2" href="#markaction-2">MarkAction</a>(...`children`: [`NodeChild`](#nodechild)[]): [`ProseMirrorNode`](pm/model.md#prosemirrornode)[]</code>

</dt>

<dd>

Applies a mark with any number of children.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="isactive" href="#isactive">isActive</a>: (`attrs?`: `Attrs`) => `boolean`</code>

</dt>

<dd>

Checks if the mark is active in the current editor selection. If the
optional `attrs` parameter is provided, it will check if the mark is active
with the given attributes.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### MarkAttrOptions\<MarkName, AttrName, AttrType\> {#markattroptions}

<!-- DEBUG memberWithGroups start 1 -->

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="attr" href="#attr">attr</a>: `AttrName`</code>

</dt>

<dd>

The name of the attribute.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="default-1" href="#default-1">default</a><i>?</i>: `AttrType`</code>

</dt>

<dd>

The default value for this attribute, to use when no explicit value is
provided. Attributes that have no default must be provided whenever a node
or mark of a type that has them is created.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="parsedom" href="#parsedom">parseDOM</a><i>?</i>: (`node`: [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)) => `AttrType`</code>

</dt>

<dd>

Parses the attribute value from the DOM.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="todom" href="#todom">toDOM</a><i>?</i>: (`value`: `AttrType`) => `undefined` \| `null` \| \[`string`, `string`\]</code>

</dt>

<dd>

Returns the attribute key and value to be set on the HTML element.

If the returned `key` is `"style"`, the value is a string of CSS properties and will
be prepended to the existing `style` attribute on the DOM node.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="type-3" href="#type-3">type</a>: `MarkName`</code>

</dt>

<dd>

The name of the mark type.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="validate" href="#validate">validate</a><i>?</i>: `string` \| (`value`: `unknown`) => `void`</code>

</dt>

<dd>

A function or type name used to validate values of this attribute. This
will be used when deserializing the attribute from JSON, and when running
[`Node.check`](https://prosemirror.net/docs/ref/#model.Node.check). When a
function, it should raise an exception if the value isn't of the expected
type or shape. When a string, it should be a `|`-separated string of
primitive types (`"number"`, `"string"`, `"boolean"`, `"null"`, and
`"undefined"`), and the library will raise an error when the value is not
one of those types.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### MarkSpecOptions\<MarkName, Attrs\> {#markspecoptions}

<!-- DEBUG memberWithGroups start 1 -->

#### Indexable

\[`key`: `string`\]: `any`

Mark specs can include additional properties that can be
inspected through [`MarkType.spec`](https://prosemirror.net/docs/ref/#model.MarkType.spec) when
working with the mark.

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="attrs-4" href="#attrs-4">attrs</a><i>?</i>: \{ \[K in string \| number \| symbol\]: AttrSpec\<Attrs\[K\]\> \}</code>

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

<code data-typedoc-declaration><i></i> <a id="excludes" href="#excludes">excludes</a><i>?</i>: `string`</code>

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

<code data-typedoc-declaration><i></i> <a id="name" href="#name">name</a>: `MarkName`</code>

</dt>

<dd>

The name of the mark type.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="parsedom-1" href="#parsedom-1">parseDOM</a><i>?</i>: readonly [`ParseRule`](pm/model.md#parserule)[]</code>

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

<code data-typedoc-declaration><i></i> <a id="todom-1" href="#todom-1">toDOM</a><i>?</i>: (`mark`: [`Mark`](pm/model.md#mark), `inline`: `boolean`) => [`DOMOutputSpec`](pm/model.md#domoutputspec)</code>

</dt>

<dd>

Defines the default way marks of this type should be serialized
to DOM/HTML. When the resulting spec contains a hole, that is
where the marked content is placed. Otherwise, it is appended to
the top node.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### MarkViewOptions {#markviewoptions}

<!-- DEBUG memberWithGroups start 1 -->

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="constructor" href="#constructor">constructor</a>: [`MarkViewConstructor`](pm/view.md#markviewconstructor)</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="name-1" href="#name-1">name</a>: `string`</code>

</dt>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### NodeAction()\<Attrs\> {#nodeaction}

<!-- DEBUG memberWithGroups start 1 -->

A function for creating a node with optional attributes and any number of
children.

It also has a `isActive` method for checking if the node is active in the
current editor selection.

#### Call Signature

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="nodeaction-1" href="#nodeaction-1">NodeAction</a>(`attrs`: `null` \| `Attrs`, ...`children`: [`NodeChild`](#nodechild)[]): [`ProseMirrorNode`](pm/model.md#prosemirrornode)</code>

</dt>

<dd>

Creates a node with attributes and any number of children.

</dd>

</dl>

#### Call Signature

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="nodeaction-2" href="#nodeaction-2">NodeAction</a>(...`children`: [`NodeChild`](#nodechild)[]): [`ProseMirrorNode`](pm/model.md#prosemirrornode)</code>

</dt>

<dd>

Creates a node with any number of children.

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="isactive-1" href="#isactive-1">isActive</a>: (`attrs?`: `Attrs`) => `boolean`</code>

</dt>

<dd>

Checks if the node is active in the current editor selection. If the
optional `attrs` parameter is provided, it will check if the node is active
with the given attributes.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### NodeAttrOptions\<NodeName, AttrName, AttrType\> {#nodeattroptions}

<!-- DEBUG memberWithGroups start 1 -->

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="attr-1" href="#attr-1">attr</a>: `AttrName`</code>

</dt>

<dd>

The name of the attribute.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="default-2" href="#default-2">default</a><i>?</i>: `AttrType`</code>

</dt>

<dd>

The default value for this attribute, to use when no explicit value is
provided. Attributes that have no default must be provided whenever a node
or mark of a type that has them is created.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="parsedom-2" href="#parsedom-2">parseDOM</a><i>?</i>: (`node`: [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)) => `AttrType`</code>

</dt>

<dd>

Parses the attribute value from the DOM.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="splittable" href="#splittable">splittable</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the attribute should be kept when the node is split. Set it to
`true` if you want to inherit the attribute from the previous node when
splitting the node by pressing `Enter`.

###### Default

```ts
undefined
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="todom-2" href="#todom-2">toDOM</a><i>?</i>: (`value`: `AttrType`) => `undefined` \| `null` \| \[`string`, `string`\]</code>

</dt>

<dd>

Returns the attribute key and value to be set on the HTML element.

If the returned `key` is `"style"`, the value is a string of CSS properties and will
be prepended to the existing `style` attribute on the DOM node.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="type-4" href="#type-4">type</a>: `NodeName`</code>

</dt>

<dd>

The name of the node type.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="validate-1" href="#validate-1">validate</a><i>?</i>: `string` \| (`value`: `unknown`) => `void`</code>

</dt>

<dd>

A function or type name used to validate values of this attribute. This
will be used when deserializing the attribute from JSON, and when running
[`Node.check`](https://prosemirror.net/docs/ref/#model.Node.check). When a
function, it should raise an exception if the value isn't of the expected
type or shape. When a string, it should be a `|`-separated string of
primitive types (`"number"`, `"string"`, `"boolean"`, `"null"`, and
`"undefined"`), and the library will raise an error when the value is not
one of those types.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### NodeJSON {#nodejson}

<!-- DEBUG memberWithGroups start 1 -->

A JSON representation of the prosemirror node.

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="attrs-6" href="#attrs-6">attrs</a><i>?</i>: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `any`\></code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="content" href="#content">content</a><i>?</i>: [`NodeJSON`](#nodejson)[]</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="marks-1" href="#marks-1">marks</a><i>?</i>: `object`[]</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="text" href="#text">text</a><i>?</i>: `string`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="type-5" href="#type-5">type</a>: `string`</code>

</dt>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### NodeSpecOptions\<NodeName, Attrs\> {#nodespecoptions}

<!-- DEBUG memberWithGroups start 1 -->

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

<code data-typedoc-declaration><i></i> <a id="attrs-8" href="#attrs-8">attrs</a><i>?</i>: \{ \[key in string \| number \| symbol\]: AttrSpec\<Attrs\[key\]\> \}</code>

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

<code data-typedoc-declaration><i></i> <a id="content-1" href="#content-1">content</a><i>?</i>: `string`</code>

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

<code data-typedoc-declaration><i></i> <a id="disabledropcursor" href="#disabledropcursor">disableDropCursor</a><i>?</i>: `boolean` \| (`view`: [`EditorView`](pm/view.md#editorview), `pos`: `object`, `event`: [`DragEvent`](https://developer.mozilla.org/docs/Web/API/DragEvent)) => `boolean`</code>

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

<code data-typedoc-declaration><i></i> <a id="leaftext" href="#leaftext">leafText</a><i>?</i>: (`node`: [`ProseMirrorNode`](pm/model.md#prosemirrornode)) => `string`</code>

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

<code data-typedoc-declaration><i></i> <a id="linebreakreplacement" href="#linebreakreplacement">linebreakReplacement</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-declaration><i></i> <a id="marks-2" href="#marks-2">marks</a><i>?</i>: `string`</code>

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

<code data-typedoc-declaration><i></i> <a id="name-2" href="#name-2">name</a>: `NodeName`</code>

</dt>

<dd>

The name of the node type.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="parsedom-3" href="#parsedom-3">parseDOM</a><i>?</i>: readonly [`TagParseRule`](pm/model.md#tagparserule)[]</code>

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

<code data-typedoc-declaration><i></i> <a id="todebugstring" href="#todebugstring">toDebugString</a><i>?</i>: (`node`: [`ProseMirrorNode`](pm/model.md#prosemirrornode)) => `string`</code>

</dt>

<dd>

Defines the default way a node of this type should be serialized
to a string representation for debugging (e.g. in error messages).

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="todom-3" href="#todom-3">toDOM</a><i>?</i>: (`node`: [`ProseMirrorNode`](pm/model.md#prosemirrornode)) => [`DOMOutputSpec`](pm/model.md#domoutputspec)</code>

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

<code data-typedoc-declaration><i></i> <a id="topnode-1" href="#topnode-1">topNode</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether this is the top-level node type. Only one node type can be the
top-level node type in a schema.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="whitespace" href="#whitespace">whitespace</a><i>?</i>: `"pre"` \| `"normal"`</code>

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

<!-- DEBUG memberWithGroups end 9 -->

***

### NodeViewOptions {#nodeviewoptions}

<!-- DEBUG memberWithGroups start 1 -->

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="constructor-1" href="#constructor-1">constructor</a>: [`NodeViewConstructor`](pm/view.md#nodeviewconstructor)</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="name-3" href="#name-3">name</a>: `string`</code>

</dt>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### RemoveMarkOptions {#removemarkoptions}

<!-- DEBUG memberWithGroups start 1 -->

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="attrs-9" href="#attrs-9">attrs</a><i>?</i>: `null` \| [`Attrs`](pm/model.md#attrs-7)</code>

</dt>

<dd>

If attrs is given, remove precisely the mark with the given attrs. Otherwise, remove all marks of the given type.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="from-2" href="#from-2">from</a><i>?</i>: `number`</code>

</dt>

<dd>

The start position of the document. By default it will be the start position of current selection.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="to-2" href="#to-2">to</a><i>?</i>: `number`</code>

</dt>

<dd>

The end position of the document. By default it will be the end position of current selection.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="type-6" href="#type-6">type</a>: `string` \| [`MarkType`](pm/model.md#marktype-1)</code>

</dt>

<dd>

The type of the mark to remove.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### RemoveNodeOptions {#removenodeoptions}

<!-- DEBUG memberWithGroups start 1 -->

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="pos-3" href="#pos-3">pos</a><i>?</i>: `number`</code>

</dt>

<dd>

The document position to start searching node. By default it will be the
anchor position of current selection.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="type-7" href="#type-7">type</a>: `string` \| [`NodeType`](pm/model.md#nodetype)</code>

</dt>

<dd>

The type of the node to remove.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### SelectionJSON {#selectionjson}

<!-- DEBUG memberWithGroups start 1 -->

A JSON representation of the prosemirror selection.

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="anchor" href="#anchor">anchor</a>: `number`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="head" href="#head">head</a>: `number`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="type-8" href="#type-8">type</a>: `string`</code>

</dt>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### SetBlockTypeOptions {#setblocktypeoptions}

<!-- DEBUG memberWithGroups start 1 -->

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="attrs-10" href="#attrs-10">attrs</a><i>?</i>: `null` \| [`Attrs`](pm/model.md#attrs-7)</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="from-3" href="#from-3">from</a><i>?</i>: `number`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="to-3" href="#to-3">to</a><i>?</i>: `number`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="type-9" href="#type-9">type</a>: `string` \| [`NodeType`](pm/model.md#nodetype)</code>

</dt>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### SetNodeAttrsOptions {#setnodeattrsoptions}

<!-- DEBUG memberWithGroups start 1 -->

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="attrs-11" href="#attrs-11">attrs</a>: [`Attrs`](pm/model.md#attrs-7)</code>

</dt>

<dd>

The attributes to set.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="pos-4" href="#pos-4">pos</a><i>?</i>: `number`</code>

</dt>

<dd>

The position of the node. Defaults to the position of the wrapping node
containing the current selection.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="type-10" href="#type-10">type</a>: `string` \| [`NodeType`](pm/model.md#nodetype) \| `string`[] \| [`NodeType`](pm/model.md#nodetype)[]</code>

</dt>

<dd>

The type of node to set the attributes of.

If current node is not of this type, the command will do nothing.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### StateJSON {#statejson}

<!-- DEBUG memberWithGroups start 1 -->

A JSON representation of the prosemirror state.

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="doc" href="#doc">doc</a>: [`NodeJSON`](#nodejson)</code>

</dt>

<dd>

The main `ProseMirror` doc.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="selection" href="#selection">selection</a>: [`SelectionJSON`](#selectionjson)</code>

</dt>

<dd>

The current selection.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### StepJSON {#stepjson}

<!-- DEBUG memberWithGroups start 1 -->

A JSON representation of the prosemirror step.

#### Indexable

\[`x`: `string`\]: `unknown`

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="steptype" href="#steptype">stepType</a>: `string`</code>

</dt>

<dd>

The type of the step.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### ToggleMarkOptions {#togglemarkoptions}

<!-- DEBUG memberWithGroups start 1 -->

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="attrs-12" href="#attrs-12">attrs</a><i>?</i>: `null` \| [`Attrs`](pm/model.md#attrs-7)</code>

</dt>

<dd>

The optional attributes to set on the mark.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="enterinlineatoms" href="#enterinlineatoms">enterInlineAtoms</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the command should act on the content of inline nodes marked as
[atoms](https://prosemirror.net/docs/ref/#model.NodeSpec.atom) that are
completely covered by a selection range.

###### Default

```ts
true
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="removewhenpresent" href="#removewhenpresent">removeWhenPresent</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Controls whether, when part of the selected range has the mark
already and part doesn't, the mark is removed (`true`) or added
(`false`).

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="type-11" href="#type-11">type</a>: `string` \| [`MarkType`](pm/model.md#marktype-1)</code>

</dt>

<dd>

The mark type to toggle.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### ToggleNodeOptions {#togglenodeoptions}

<!-- DEBUG memberWithGroups start 1 -->

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="attrs-13" href="#attrs-13">attrs</a><i>?</i>: `null` \| [`Attrs`](pm/model.md#attrs-7)</code>

</dt>

<dd>

The attributes of the node to toggle.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="type-12" href="#type-12">type</a>: `string` \| [`NodeType`](pm/model.md#nodetype)</code>

</dt>

<dd>

The type of the node to toggle.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### ToggleWrapOptions {#togglewrapoptions}

<!-- DEBUG memberWithGroups start 1 -->

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="attrs-14" href="#attrs-14">attrs</a><i>?</i>: `null` \| [`Attrs`](pm/model.md#attrs-7)</code>

</dt>

<dd>

The attributes of the node to toggle.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="type-13" href="#type-13">type</a>: `string` \| [`NodeType`](pm/model.md#nodetype)</code>

</dt>

<dd>

The type of the node to toggle.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### UnsetBlockTypeOptions {#unsetblocktypeoptions}

<!-- DEBUG memberWithGroups start 1 -->

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="from-4" href="#from-4">from</a><i>?</i>: `number`</code>

</dt>

<dd>

The start position of the document. By default it will be the start position of current selection.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="to-4" href="#to-4">to</a><i>?</i>: `number`</code>

</dt>

<dd>

The end position of the document. By default it will be the end position of current selection.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### UnsetMarkOptions {#unsetmarkoptions}

<!-- DEBUG memberWithGroups start 1 -->

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="from-5" href="#from-5">from</a><i>?</i>: `number`</code>

</dt>

<dd>

The start position of the document. By default it will be the start position of current selection.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="to-5" href="#to-5">to</a><i>?</i>: `number`</code>

</dt>

<dd>

The end position of the document. By default it will be the end position of current selection.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### WrapOptions {#wrapoptions}

<!-- DEBUG memberWithGroups start 1 -->

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="attrs-15" href="#attrs-15">attrs</a><i>?</i>: `null` \| [`Attrs`](pm/model.md#attrs-7)</code>

</dt>

<dd>

Optional attributes to apply to the node.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="nodetype" href="#nodetype">nodeType</a><i>?</i>: [`NodeType`](pm/model.md#nodetype)</code>

</dt>

<dd>

###### Deprecated

Use `nodeSpec` instead.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="type-14" href="#type-14">type</a>: `string` \| [`NodeType`](pm/model.md#nodetype)</code>

</dt>

<dd>

The node type to wrap the selected textblock with.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

## Type Aliases

### AnyAttrs {#anyattrs}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="anyattrs" href="#anyattrs">AnyAttrs</a> = [`Attrs`](pm/model.md#attrs-7)</code>

</dt>

<dd>

An object holding the attributes of a node.

</dd>

</dl>

***

### AttrSpec\<AttrType\> {#attrspec}

<!-- DEBUG memberWithGroups start 1 -->

<code data-typedoc-declaration><i></i> type <a id="attrspec" href="#attrspec">AttrSpec</a>\<AttrType\> = \{ `default?`: `AttrType`; `validate?`: `string` \| (`value`: `unknown`) => `void`; \}</code>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="default-3" href="#default-3">default</a><i>?</i>: `AttrType`</code>

</dt>

<dd>

The default value for this attribute, to use when no explicit value is
provided. Attributes that have no default must be provided whenever a node
or mark of a type that has them is created.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="validate-2" href="#validate-2">validate</a><i>?</i>: `string` \| (`value`: `unknown`) => `void`</code>

</dt>

<dd>

A function or type name used to validate values of this attribute. This
will be used when deserializing the attribute from JSON, and when running
[`Node.check`](https://prosemirror.net/docs/ref/#model.Node.check). When a
function, it should raise an exception if the value isn't of the expected
type or shape. When a string, it should be a `|`-separated string of
primitive types (`"number"`, `"string"`, `"boolean"`, `"null"`, and
`"undefined"`), and the library will raise an error when the value is not
one of those types.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->

***

### ClickHandler() {#clickhandler}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="clickhandler" href="#clickhandler">ClickHandler</a> = (`view`: [`EditorView`](pm/view.md#editorview), `pos`: `number`, `event`: [`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)) => `boolean` \| `void`</code>

</dt>

</dl>

***

### ClickOnHandler() {#clickonhandler}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="clickonhandler" href="#clickonhandler">ClickOnHandler</a> = (`view`: [`EditorView`](pm/view.md#editorview), `pos`: `number`, `node`: [`ProseMirrorNode`](pm/model.md#prosemirrornode), `nodePos`: `number`, `event`: [`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent), `direct`: `boolean`) => `boolean` \| `void`</code>

</dt>

</dl>

***

### DocChangeHandler() {#docchangehandler}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="docchangehandler" href="#docchangehandler">DocChangeHandler</a> = (`view`: [`EditorView`](pm/view.md#editorview), `prevState`: [`EditorState`](pm/state.md#editorstate)) => `void`</code>

</dt>

<dd>

A function that is called when the editor document is changed.

</dd>

</dl>

***

### DOMEventHandler()\<Event\> {#domeventhandler}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="domeventhandler" href="#domeventhandler">DOMEventHandler</a>\<Event\> = (`view`: [`EditorView`](pm/view.md#editorview), `event`: [`DOMEventMap`](pm/view.md#domeventmap)\[`Event`\]) => `boolean` \| `void`</code>

</dt>

<dd>

A function to handle the events fired on the editable DOM element. Returns
`true` to indicate that it handled the given event. you are responsible for
calling `preventDefault` yourself (or not, if you want to allow the default
behavior).

<!-- typeParameters start -->

<!-- typeParameters end -->

</dd>

</dl>

***

### DoubleClickHandler() {#doubleclickhandler}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="doubleclickhandler" href="#doubleclickhandler">DoubleClickHandler</a> = (`view`: [`EditorView`](pm/view.md#editorview), `pos`: `number`, `event`: [`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)) => `boolean` \| `void`</code>

</dt>

</dl>

***

### DoubleClickOnHandler() {#doubleclickonhandler}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="doubleclickonhandler" href="#doubleclickonhandler">DoubleClickOnHandler</a> = (`view`: [`EditorView`](pm/view.md#editorview), `pos`: `number`, `node`: [`ProseMirrorNode`](pm/model.md#prosemirrornode), `nodePos`: `number`, `event`: [`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent), `direct`: `boolean`) => `boolean` \| `void`</code>

</dt>

</dl>

***

### DropHandler() {#drophandler}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="drophandler" href="#drophandler">DropHandler</a> = (`view`: [`EditorView`](pm/view.md#editorview), `event`: [`DragEvent`](https://developer.mozilla.org/docs/Web/API/DragEvent), `slice`: [`Slice`](pm/model.md#slice-2), `moved`: `boolean`) => `boolean` \| `void`</code>

</dt>

</dl>

***

### ExtractCommandActions\<E\> {#extractcommandactions}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="extractcommandactions" href="#extractcommandactions">ExtractCommandActions</a>\<E\> = `ToCommandAction`\<`ExtractCommands`\<`E`\>\></code>

</dt>

<dd>

Extracts the [CommandAction](#commandaction)s from an extension type.

<!-- typeParameters start -->

<!-- typeParameters end -->

</dd>

</dl>

***

### ~~ExtractCommandAppliers\<E\>~~ {#extractcommandappliers}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="extractcommandappliers" href="#extractcommandappliers">ExtractCommandAppliers</a>\<E\> = [`ExtractCommandActions`](#extractcommandactions)\<`E`\></code>

</dt>

<dd>

<!-- typeParameters start -->

<!-- typeParameters end -->

#### Deprecated

Use `ExtractCommandActions` instead.

</dd>

</dl>

***

### ExtractCommandCreators\<E\> {#extractcommandcreators}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="extractcommandcreators" href="#extractcommandcreators">ExtractCommandCreators</a>\<E\> = `ToCommandCreators`\<`ExtractCommands`\<`E`\>\></code>

</dt>

<dd>

<!-- typeParameters start -->

<!-- typeParameters end -->

</dd>

</dl>

***

### ExtractMarkActions\<E\> {#extractmarkactions}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="extractmarkactions" href="#extractmarkactions">ExtractMarkActions</a>\<E\> = `ToMarkAction`\<[`ExtractMarks`](#extractmarks)\<`E`\>\></code>

</dt>

<dd>

Extracts the [MarkAction](#markaction)s from an extension type.

<!-- typeParameters start -->

<!-- typeParameters end -->

</dd>

</dl>

***

### ExtractMarks\<E\> {#extractmarks}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="extractmarks" href="#extractmarks">ExtractMarks</a>\<E\> = `SimplifyDeeper`\<`SimplifyUnion`\<`ExtractTyping`\<`E`\>\[`"Marks"`\]\>\></code>

</dt>

<dd>

<!-- typeParameters start -->

<!-- typeParameters end -->

</dd>

</dl>

***

### ExtractNodeActions\<E\> {#extractnodeactions}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="extractnodeactions" href="#extractnodeactions">ExtractNodeActions</a>\<E\> = `ToNodeAction`\<[`ExtractNodes`](#extractnodes)\<`E`\>\></code>

</dt>

<dd>

Extracts the [NodeAction](#nodeaction)s from an extension type.

<!-- typeParameters start -->

<!-- typeParameters end -->

</dd>

</dl>

***

### ExtractNodes\<E\> {#extractnodes}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="extractnodes" href="#extractnodes">ExtractNodes</a>\<E\> = `SimplifyDeeper`\<`SimplifyUnion`\<`ExtractTyping`\<`E`\>\[`"Nodes"`\]\>\></code>

</dt>

<dd>

<!-- typeParameters start -->

<!-- typeParameters end -->

</dd>

</dl>

***

### FocusChangeHandler() {#focuschangehandler}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="focuschangehandler" href="#focuschangehandler">FocusChangeHandler</a> = (`hasFocus`: `boolean`) => `void`</code>

</dt>

<dd>

A function that is called when the editor gains or loses focus.

</dd>

</dl>

***

### KeyDownHandler() {#keydownhandler}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="keydownhandler" href="#keydownhandler">KeyDownHandler</a> = (`view`: [`EditorView`](pm/view.md#editorview), `event`: [`KeyboardEvent`](https://developer.mozilla.org/docs/Web/API/KeyboardEvent)) => `boolean` \| `void`</code>

</dt>

</dl>

***

### KeyPressHandler() {#keypresshandler}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="keypresshandler" href="#keypresshandler">KeyPressHandler</a> = (`view`: [`EditorView`](pm/view.md#editorview), `event`: [`KeyboardEvent`](https://developer.mozilla.org/docs/Web/API/KeyboardEvent)) => `boolean` \| `void`</code>

</dt>

</dl>

***

### ~~MarkBuilder~~ {#markbuilder}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="markbuilder" href="#markbuilder">MarkBuilder</a> = [`MarkAction`](#markaction)</code>

</dt>

<dd>

#### Deprecated

Use type [MarkAction](#markaction) instead.

</dd>

</dl>

***

### MountHandler() {#mounthandler}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="mounthandler" href="#mounthandler">MountHandler</a> = (`view`: [`EditorView`](pm/view.md#editorview)) => `void`</code>

</dt>

<dd>

A function that is called when the editor view is mounted.

</dd>

</dl>

***

### ~~NodeBuilder~~ {#nodebuilder}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="nodebuilder" href="#nodebuilder">NodeBuilder</a> = [`NodeAction`](#nodeaction)</code>

</dt>

<dd>

#### Deprecated

Use type [NodeAction](#nodeaction) instead.

</dd>

</dl>

***

### NodeChild {#nodechild}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="nodechild" href="#nodechild">NodeChild</a> = [`ProseMirrorNode`](pm/model.md#prosemirrornode) \| `string` \| [`NodeChild`](#nodechild)[]</code>

</dt>

<dd>

Available children parameters for [NodeAction](#nodeaction) and [MarkAction](#markaction).

</dd>

</dl>

***

### PasteHandler() {#pastehandler}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="pastehandler" href="#pastehandler">PasteHandler</a> = (`view`: [`EditorView`](pm/view.md#editorview), `event`: [`ClipboardEvent`](https://developer.mozilla.org/docs/Web/API/ClipboardEvent), `slice`: [`Slice`](pm/model.md#slice-2)) => `boolean` \| `void`</code>

</dt>

</dl>

***

### ScrollToSelectionHandler() {#scrolltoselectionhandler}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="scrolltoselectionhandler" href="#scrolltoselectionhandler">ScrollToSelectionHandler</a> = (`view`: [`EditorView`](pm/view.md#editorview)) => `boolean`</code>

</dt>

</dl>

***

### TextInputHandler() {#textinputhandler}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="textinputhandler" href="#textinputhandler">TextInputHandler</a> = (`view`: [`EditorView`](pm/view.md#editorview), `from`: `number`, `to`: `number`, `text`: `string`) => `boolean` \| `void`</code>

</dt>

</dl>

***

### TripleClickHandler() {#tripleclickhandler}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="tripleclickhandler" href="#tripleclickhandler">TripleClickHandler</a> = (`view`: [`EditorView`](pm/view.md#editorview), `pos`: `number`, `event`: [`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent)) => `boolean` \| `void`</code>

</dt>

</dl>

***

### TripleClickOnHandler() {#tripleclickonhandler}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="tripleclickonhandler" href="#tripleclickonhandler">TripleClickOnHandler</a> = (`view`: [`EditorView`](pm/view.md#editorview), `pos`: `number`, `node`: [`ProseMirrorNode`](pm/model.md#prosemirrornode), `nodePos`: `number`, `event`: [`MouseEvent`](https://developer.mozilla.org/docs/Web/API/MouseEvent), `direct`: `boolean`) => `boolean` \| `void`</code>

</dt>

</dl>

***

### UnmountHandler() {#unmounthandler}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="unmounthandler" href="#unmounthandler">UnmountHandler</a> = () => `void`</code>

</dt>

<dd>

A function that is called when the editor view is unmounted.

</dd>

</dl>

***

### UpdateHandler() {#updatehandler}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="updatehandler" href="#updatehandler">UpdateHandler</a> = (`view`: [`EditorView`](pm/view.md#editorview), `prevState`: [`EditorState`](pm/state.md#editorstate)) => `void`</code>

</dt>

<dd>

A function that is called when the editor state is updated.

</dd>

</dl>

## Variables

### canUseRegexLookbehind() {#canuseregexlookbehind}

<dl>

<dt>

<code data-typedoc-declaration><i>const</i> <a id="canuseregexlookbehind" href="#canuseregexlookbehind">canUseRegexLookbehind</a>: () => `boolean`</code>

</dt>

</dl>

***

### clsx() {#clsx}

<dl>

<dt>

<code data-typedoc-declaration><i>const</i> <a id="clsx" href="#clsx">clsx</a>: (...`args`: (`string` \| `boolean` \| `null` \| `undefined`)[]) => `string` = `clsxLite`</code>

</dt>

<dd>

A utility for constructing `className` strings conditionally.

It is a re-export of [clsx/lite](https://www.npmjs.com/package/clsx) with stricter types.

</dd>

</dl>

## Functions

### addMark() {#addmark}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="addmark-2" href="#addmark-2">addMark</a>(`options`: [`AddMarkOptions`](#addmarkoptions)): [`Command`](pm/state.md#command)</code>

</dt>

<dd>

Returns a command that adds the given mark with the given attributes.

</dd>

</dl>

***

### createEditor() {#createeditor}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="createeditor-2" href="#createeditor-2">createEditor</a>\<E\>(`options`: [`EditorOptions`](#editoroptions)\<`E`\>): [`Editor`](#editor)\<`E`\></code>

</dt>

<dd>

</dd>

</dl>

***

### defineBaseCommands() {#definebasecommands}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definebasecommands-2" href="#definebasecommands-2">defineBaseCommands</a>(): `BaseCommandsExtension`</code>

</dt>

<dd>

Add some base commands

</dd>

</dl>

***

### defineBaseKeymap() {#definebasekeymap}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definebasekeymap-2" href="#definebasekeymap-2">defineBaseKeymap</a>(`options?`: `object`): `PlainExtension`</code>

</dt>

<dd>

Defines some basic key bindings.

</dd>

</dl>

***

### defineClickHandler() {#defineclickhandler}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="defineclickhandler-2" href="#defineclickhandler-2">defineClickHandler</a>(`handler`: [`ClickHandler`](#clickhandler)): `PlainExtension`</code>

</dt>

<dd>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleClick](https://prosemirror.net/docs/ref/#view.EditorProps.handleClick)

</dd>

</dl>

***

### defineClickOnHandler() {#defineclickonhandler}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="defineclickonhandler-2" href="#defineclickonhandler-2">defineClickOnHandler</a>(`handler`: [`ClickOnHandler`](#clickonhandler)): `PlainExtension`</code>

</dt>

<dd>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleClickOn](https://prosemirror.net/docs/ref/#view.EditorProps.handleClickOn)

</dd>

</dl>

***

### defineCommands() {#definecommands}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definecommands-2" href="#definecommands-2">defineCommands</a>\<T\>(`commands`: `T`): [`Extension`](#extension-1)\<\{ `Commands`: \{ \[K in string \| number \| symbol\]: Parameters\<T\[K\]\> \}; \}\></code>

</dt>

</dl>

***

### defineDefaultState() {#definedefaultstate}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definedefaultstate-2" href="#definedefaultstate-2">defineDefaultState</a>(`options`: [`DefaultStateOptions`](#defaultstateoptions)): `PlainExtension`</code>

</dt>

<dd>

Define a default state for the editor.

</dd>

</dl>

***

### ~~defineDoc()~~ {#definedoc}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definedoc-2" href="#definedoc-2">defineDoc</a>(): `DocExtension`</code>

</dt>

<dd>

#### Deprecated

Use the following import instead:

```ts
import { defineDoc } from 'prosekit/extensions/doc'
```

</dd>

</dl>

***

### defineDocChangeHandler() {#definedocchangehandler}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definedocchangehandler-2" href="#definedocchangehandler-2">defineDocChangeHandler</a>(`handler`: [`DocChangeHandler`](#docchangehandler)): `PlainExtension`</code>

</dt>

<dd>

Registers a event handler that is called when the editor document is changed.

</dd>

</dl>

***

### defineDOMEventHandler() {#definedomeventhandler}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definedomeventhandler-2" href="#definedomeventhandler-2">defineDOMEventHandler</a>\<Event\>(`event`: `Event`, `handler`: [`DOMEventHandler`](#domeventhandler)\<`Event`\>): `PlainExtension`</code>

</dt>

<dd>

Register a new event handler for the given event type.

</dd>

</dl>

***

### defineDoubleClickHandler() {#definedoubleclickhandler}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definedoubleclickhandler-2" href="#definedoubleclickhandler-2">defineDoubleClickHandler</a>(`handler`: [`DoubleClickHandler`](#doubleclickhandler)): `PlainExtension`</code>

</dt>

<dd>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleDoubleClick](https://prosemirror.net/docs/ref/#view.EditorProps.handleDoubleClick)

</dd>

</dl>

***

### defineDoubleClickOnHandler() {#definedoubleclickonhandler}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definedoubleclickonhandler-2" href="#definedoubleclickonhandler-2">defineDoubleClickOnHandler</a>(`handler`: [`DoubleClickOnHandler`](#doubleclickonhandler)): `PlainExtension`</code>

</dt>

<dd>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleDoubleClickOn](https://prosemirror.net/docs/ref/#view.EditorProps.handleDoubleClickOn)

</dd>

</dl>

***

### defineDropHandler() {#definedrophandler}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definedrophandler-2" href="#definedrophandler-2">defineDropHandler</a>(`handler`: [`DropHandler`](#drophandler)): `PlainExtension`</code>

</dt>

<dd>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleDrop](https://prosemirror.net/docs/ref/#view.EditorProps.handleDrop)

</dd>

</dl>

***

### defineFocusChangeHandler() {#definefocuschangehandler}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definefocuschangehandler-2" href="#definefocuschangehandler-2">defineFocusChangeHandler</a>(`handler`: [`FocusChangeHandler`](#focuschangehandler)): `PlainExtension`</code>

</dt>

<dd>

Registers a event handler that is called when the editor gains or loses focus.

</dd>

</dl>

***

### defineHistory() {#definehistory}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definehistory-2" href="#definehistory-2">defineHistory</a>(`options`: [`HistoryOptions`](#historyoptions)): `HistoryExtension`</code>

</dt>

<dd>

Add undo/redo history to the editor.

</dd>

</dl>

***

### defineKeyDownHandler() {#definekeydownhandler}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definekeydownhandler-2" href="#definekeydownhandler-2">defineKeyDownHandler</a>(`handler`: [`KeyDownHandler`](#keydownhandler)): `PlainExtension`</code>

</dt>

<dd>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleKeyDown](https://prosemirror.net/docs/ref/#view.EditorProps.handleKeyDown)

</dd>

</dl>

***

### defineKeymap() {#definekeymap}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definekeymap-2" href="#definekeymap-2">defineKeymap</a>(`keymap`: [`Keymap`](#keymap)): `PlainExtension`</code>

</dt>

<dd>

</dd>

</dl>

***

### defineKeyPressHandler() {#definekeypresshandler}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definekeypresshandler-2" href="#definekeypresshandler-2">defineKeyPressHandler</a>(`handler`: [`KeyPressHandler`](#keypresshandler)): `PlainExtension`</code>

</dt>

<dd>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleKeyPress](https://prosemirror.net/docs/ref/#view.EditorProps.handleKeyPress)

</dd>

</dl>

***

### defineMarkAttr() {#definemarkattr}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definemarkattr-2" href="#definemarkattr-2">defineMarkAttr</a>\<MarkType, AttrName, AttrType\>(`options`: [`MarkAttrOptions`](#markattroptions)\<`MarkType`, `AttrName`, `AttrType`\>): [`Extension`](#extension-1)\<\{ `Marks`: `{ [K in string]: AttrType }`; \}\></code>

</dt>

<dd>

</dd>

</dl>

***

### defineMarkSpec() {#definemarkspec}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definemarkspec-2" href="#definemarkspec-2">defineMarkSpec</a>\<Mark, Attrs\>(`options`: [`MarkSpecOptions`](#markspecoptions)\<`Mark`, `Attrs`\>): [`Extension`](#extension-1)\<\{ `Marks`: `{ [K in string]: Attrs }`; \}\></code>

</dt>

<dd>

</dd>

</dl>

***

### defineMarkView() {#definemarkview}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definemarkview-2" href="#definemarkview-2">defineMarkView</a>(`options`: [`MarkViewOptions`](#markviewoptions)): [`Extension`](#extension-1)</code>

</dt>

</dl>

***

### defineMountHandler() {#definemounthandler}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definemounthandler-2" href="#definemounthandler-2">defineMountHandler</a>(`handler`: [`MountHandler`](#mounthandler)): `PlainExtension`</code>

</dt>

<dd>

Registers a event handler that is called when the editor view is mounted.

</dd>

</dl>

***

### defineNodeAttr() {#definenodeattr}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definenodeattr-2" href="#definenodeattr-2">defineNodeAttr</a>\<NodeType, AttrName, AttrType\>(`options`: [`NodeAttrOptions`](#nodeattroptions)\<`NodeType`, `AttrName`, `AttrType`\>): [`Extension`](#extension-1)\<\{ `Nodes`: `{ [K in string]: { [K in string]: AttrType } }`; \}\></code>

</dt>

<dd>

Defines an attribute for a node type.

</dd>

</dl>

***

### defineNodeSpec() {#definenodespec}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definenodespec-2" href="#definenodespec-2">defineNodeSpec</a>\<Node, Attrs\>(`options`: [`NodeSpecOptions`](#nodespecoptions)\<`Node`, `Attrs`\>): [`Extension`](#extension-1)\<\{ `Nodes`: `{ [K in string]: Attrs }`; \}\></code>

</dt>

<dd>

Defines a node type.

</dd>

</dl>

***

### defineNodeView() {#definenodeview}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definenodeview-2" href="#definenodeview-2">defineNodeView</a>(`options`: [`NodeViewOptions`](#nodeviewoptions)): [`Extension`](#extension-1)</code>

</dt>

</dl>

***

### ~~defineParagraph()~~ {#defineparagraph}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="defineparagraph-2" href="#defineparagraph-2">defineParagraph</a>(): `ParagraphSpecExtension`</code>

</dt>

<dd>

Defines a paragraph node spec as the highest priority, because it should be the default block node for most cases.

#### Deprecated

Use the following import instead:

```ts
import { defineParagraph } from 'prosekit/extensions/paragraph'
```

</dd>

</dl>

***

### definePasteHandler() {#definepastehandler}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definepastehandler-2" href="#definepastehandler-2">definePasteHandler</a>(`handler`: [`PasteHandler`](#pastehandler)): `PlainExtension`</code>

</dt>

<dd>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste](https://prosemirror.net/docs/ref/#view.EditorProps.handlePaste)

</dd>

</dl>

***

### definePlugin() {#defineplugin}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="defineplugin-2" href="#defineplugin-2">definePlugin</a>(`plugin`: [`ProseMirrorPlugin`](pm/state.md#prosemirrorplugin)\<`any`\> \| [`ProseMirrorPlugin`](pm/state.md#prosemirrorplugin)\<`any`\>[] \| (`context`: `object`) => [`ProseMirrorPlugin`](pm/state.md#prosemirrorplugin)\<`any`\> \| [`ProseMirrorPlugin`](pm/state.md#prosemirrorplugin)\<`any`\>[]): `PlainExtension`</code>

</dt>

<dd>

Adds a ProseMirror plugin to the editor.

</dd>

</dl>

***

### defineScrollToSelectionHandler() {#definescrolltoselectionhandler}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definescrolltoselectionhandler-2" href="#definescrolltoselectionhandler-2">defineScrollToSelectionHandler</a>(`handler`: [`ScrollToSelectionHandler`](#scrolltoselectionhandler)): `PlainExtension`</code>

</dt>

<dd>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleScrollToSelection](https://prosemirror.net/docs/ref/#view.EditorProps.handleScrollToSelection)

</dd>

</dl>

***

### ~~defineText()~~ {#definetext}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definetext-2" href="#definetext-2">defineText</a>(): `TextExtension`</code>

</dt>

<dd>

#### Deprecated

Use the following import instead:

```ts
import { defineText } from 'prosekit/extensions/text'
```

</dd>

</dl>

***

### defineTextInputHandler() {#definetextinputhandler}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definetextinputhandler-2" href="#definetextinputhandler-2">defineTextInputHandler</a>(`handler`: [`TextInputHandler`](#textinputhandler)): `PlainExtension`</code>

</dt>

<dd>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleTextInput](https://prosemirror.net/docs/ref/#view.EditorProps.handleTextInput)

</dd>

</dl>

***

### defineTripleClickHandler() {#definetripleclickhandler}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definetripleclickhandler-2" href="#definetripleclickhandler-2">defineTripleClickHandler</a>(`handler`: [`TripleClickHandler`](#tripleclickhandler)): `PlainExtension`</code>

</dt>

<dd>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleTripleClick](https://prosemirror.net/docs/ref/#view.EditorProps.handleTripleClick)

</dd>

</dl>

***

### defineTripleClickOnHandler() {#definetripleclickonhandler}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definetripleclickonhandler-2" href="#definetripleclickonhandler-2">defineTripleClickOnHandler</a>(`handler`: [`TripleClickOnHandler`](#tripleclickonhandler)): `PlainExtension`</code>

</dt>

<dd>

See [https://prosemirror.net/docs/ref/#view.EditorProps.handleTripleClickOn](https://prosemirror.net/docs/ref/#view.EditorProps.handleTripleClickOn)

</dd>

</dl>

***

### defineUnmountHandler() {#defineunmounthandler}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="defineunmounthandler-2" href="#defineunmounthandler-2">defineUnmountHandler</a>(`handler`: [`UnmountHandler`](#unmounthandler)): `PlainExtension`</code>

</dt>

<dd>

Registers a event handler that is called when the editor view is unmounted.

</dd>

</dl>

***

### defineUpdateHandler() {#defineupdatehandler}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="defineupdatehandler-2" href="#defineupdatehandler-2">defineUpdateHandler</a>(`handler`: [`UpdateHandler`](#updatehandler)): `PlainExtension`</code>

</dt>

<dd>

Registers a event handler that is called when the editor state is updated.

</dd>

</dl>

***

### elementFromJSON() {#elementfromjson}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="elementfromjson-2" href="#elementfromjson-2">elementFromJSON</a>(`json`: [`NodeJSON`](#nodejson), `options`: [`JSONParserOptions`](#jsonparseroptions) & [`DOMSerializerOptions`](#domserializeroptions) & [`DOMDocumentOptions`](#domdocumentoptions)): [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)</code>

</dt>

<dd>

Parse a ProseMirror document JSON object to a HTML element.

#### Example

```ts
const json = { type: 'doc', content: [{ type: 'paragraph' }] }
const element = elementFromJSON(json, { schema: editor.schema })
```

</dd>

</dl>

***

### elementFromNode() {#elementfromnode}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="elementfromnode-2" href="#elementfromnode-2">elementFromNode</a>(`node`: [`ProseMirrorNode`](pm/model.md#prosemirrornode), `options?`: [`DOMSerializerOptions`](#domserializeroptions) & [`DOMDocumentOptions`](#domdocumentoptions)): [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)</code>

</dt>

<dd>

Serialize a ProseMirror node to a HTML element.

#### Example

```ts
const node = editor.state.doc
const element = elementFromNode(node)
```

</dd>

</dl>

***

### expandMark() {#expandmark}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="expandmark-2" href="#expandmark-2">expandMark</a>(`options`: [`ExpandMarkOptions`](#expandmarkoptions)): [`Command`](pm/state.md#command)</code>

</dt>

<dd>

Expands the selection to include the entire mark at the current position.

</dd>

</dl>

***

### findParentNode() {#findparentnode}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="findparentnode-2" href="#findparentnode-2">findParentNode</a>(`predicate`: (`node`: [`ProseMirrorNode`](pm/model.md#prosemirrornode)) => `boolean`, `$pos`: [`ResolvedPos`](pm/model.md#resolvedpos)): `undefined` \| [`FindParentNodeResult`](#findparentnoderesult)</code>

</dt>

<dd>

Find the closest parent node that satisfies the predicate.

</dd>

</dl>

***

### findParentNodeOfType() {#findparentnodeoftype}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="findparentnodeoftype-2" href="#findparentnodeoftype-2">findParentNodeOfType</a>(`type`: `string` \| [`NodeType`](pm/model.md#nodetype), `$pos`: [`ResolvedPos`](pm/model.md#resolvedpos)): `undefined` \| [`FindParentNodeResult`](#findparentnoderesult)</code>

</dt>

<dd>

Finds the closest parent node that matches the given node type.

</dd>

</dl>

***

### htmlFromJSON() {#htmlfromjson}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="htmlfromjson-2" href="#htmlfromjson-2">htmlFromJSON</a>(`json`: [`NodeJSON`](#nodejson), `options`: [`JSONParserOptions`](#jsonparseroptions) & [`DOMSerializerOptions`](#domserializeroptions) & [`DOMDocumentOptions`](#domdocumentoptions)): `string`</code>

</dt>

<dd>

Parse a ProseMirror document JSON object to a HTML string.

#### Example

```ts
const json = { type: 'doc', content: [{ type: 'paragraph' }] }
const html = htmlFromJSON(json, { schema: editor.schema })
```

</dd>

</dl>

***

### htmlFromNode() {#htmlfromnode}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="htmlfromnode-2" href="#htmlfromnode-2">htmlFromNode</a>(`node`: [`ProseMirrorNode`](pm/model.md#prosemirrornode), `options?`: [`DOMSerializerOptions`](#domserializeroptions) & [`DOMDocumentOptions`](#domdocumentoptions)): `string`</code>

</dt>

<dd>

Serialize a ProseMirror node to a HTML string

#### Example

```ts
const node = document.getElementById('content')
const html = htmlFromNode(node)
```

</dd>

</dl>

***

### insertDefaultBlock() {#insertdefaultblock}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="insertdefaultblock-2" href="#insertdefaultblock-2">insertDefaultBlock</a>(`options?`: [`InsertDefaultBlockOptions`](#insertdefaultblockoptions)): [`Command`](pm/state.md#command)</code>

</dt>

<dd>

Returns a command that inserts a default block after current selection or at
the given position.

</dd>

</dl>

***

### insertNode() {#insertnode}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="insertnode-2" href="#insertnode-2">insertNode</a>(`options`: [`InsertNodeOptions`](#insertnodeoptions)): [`Command`](pm/state.md#command)</code>

</dt>

<dd>

Returns a command that inserts the given node at the current selection or at
the given position.

</dd>

</dl>

***

### isAllSelection() {#isallselection}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="isallselection-2" href="#isallselection-2">isAllSelection</a>(`value`: [`Selection`](pm/state.md#selection-1)): `value is AllSelection`</code>

</dt>

<dd>

Checks if the given object is a [AllSelection](pm/state.md#allselection) instance.

</dd>

</dl>

***

### isFragment() {#isfragment}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="isfragment-2" href="#isfragment-2">isFragment</a>(`value`: `unknown`): `value is ProseMirrorFragment`</code>

</dt>

<dd>

Checks if the given object is a [Fragment](pm/model.md#prosemirrorfragment) instance.

</dd>

</dl>

***

### isMark() {#ismark}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="ismark-2" href="#ismark-2">isMark</a>(`value`: `unknown`): `value is Mark`</code>

</dt>

<dd>

Checks if the given object is a [Mark](pm/model.md#mark) instance.

</dd>

</dl>

***

### isNodeSelection() {#isnodeselection}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="isnodeselection-2" href="#isnodeselection-2">isNodeSelection</a>(`value`: [`Selection`](pm/state.md#selection-1)): `value is NodeSelection`</code>

</dt>

<dd>

Checks if the given object is a [NodeSelection](pm/state.md#nodeselection) instance.

</dd>

</dl>

***

### isProseMirrorNode() {#isprosemirrornode}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="isprosemirrornode-2" href="#isprosemirrornode-2">isProseMirrorNode</a>(`value`: `unknown`): `value is ProseMirrorNode`</code>

</dt>

<dd>

Checks if the given object is a [ProseMirrorNode](pm/model.md#prosemirrornode) instance.

</dd>

</dl>

***

### isSelection() {#isselection}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="isselection-2" href="#isselection-2">isSelection</a>(`value`: `unknown`): `value is Selection`</code>

</dt>

<dd>

Checks if the given object is a [Selection](pm/state.md#selection-1) instance.

</dd>

</dl>

***

### isSlice() {#isslice}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="isslice-2" href="#isslice-2">isSlice</a>(`value`: `unknown`): `value is Slice`</code>

</dt>

<dd>

Checks if the given object is a [Slice](pm/model.md#slice-2) instance.

</dd>

</dl>

***

### isTextSelection() {#istextselection}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="istextselection-2" href="#istextselection-2">isTextSelection</a>(`value`: [`Selection`](pm/state.md#selection-1)): `value is TextSelection`</code>

</dt>

<dd>

Checks if the given object is a [TextSelection](pm/state.md#textselection) instance.

</dd>

</dl>

***

### jsonFromHTML() {#jsonfromhtml}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="jsonfromhtml-2" href="#jsonfromhtml-2">jsonFromHTML</a>(`html`: `string`, `options`: [`DOMDocumentOptions`](#domdocumentoptions) & [`DOMParserOptions`](#domparseroptions) & [`JSONParserOptions`](#jsonparseroptions)): [`NodeJSON`](#nodejson)</code>

</dt>

<dd>

Parse a HTML string to a ProseMirror document JSON object.

#### Example

```ts
const html = '<p>Hello, world!</p>'
const json = jsonFromHTML(html, { schema: editor.schema })
```

</dd>

</dl>

***

### jsonFromNode() {#jsonfromnode}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="jsonfromnode-2" href="#jsonfromnode-2">jsonFromNode</a>(`node`: [`ProseMirrorNode`](pm/model.md#prosemirrornode)): [`NodeJSON`](#nodejson)</code>

</dt>

<dd>

Return a JSON object representing this node.

#### Example

```ts
const node = editor.state.doc
const json = jsonFromNode(node)
```

</dd>

</dl>

***

### jsonFromState() {#jsonfromstate}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="jsonfromstate-2" href="#jsonfromstate-2">jsonFromState</a>(`state`: [`EditorState`](pm/state.md#editorstate)): [`StateJSON`](#statejson)</code>

</dt>

<dd>

Return a JSON object representing this state.

#### Example

```ts
const state = editor.state
const json = jsonFromState(state)
```

</dd>

</dl>

***

### nodeFromElement() {#nodefromelement}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="nodefromelement-2" href="#nodefromelement-2">nodeFromElement</a>(`element`: [`Node`](https://developer.mozilla.org/docs/Web/API/Node), `options`: [`DOMParserOptions`](#domparseroptions) & [`JSONParserOptions`](#jsonparseroptions)): [`ProseMirrorNode`](pm/model.md#prosemirrornode)</code>

</dt>

<dd>

Parse a HTML element to a ProseMirror node.

#### Example

```ts
const element = document.getElementById('content')
const node = nodeFromElement(element, { schema: editor.schema })

</dd>

</dl>

***

### nodeFromHTML() {#nodefromhtml}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="nodefromhtml-2" href="#nodefromhtml-2">nodeFromHTML</a>(`html`: `string`, `options`: [`DOMParserOptions`](#domparseroptions) & [`JSONParserOptions`](#jsonparseroptions) & [`DOMDocumentOptions`](#domdocumentoptions)): [`ProseMirrorNode`](pm/model.md#prosemirrornode)</code>

</dt>

<dd>

Parse a HTML string to a ProseMirror node.

#### Example

```ts
const html = '<p>Hello, world!</p>'
const node = nodeFromHTML(html, { schema: editor.schema })

</dd>

</dl>

***

### nodeFromJSON() {#nodefromjson}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="nodefromjson-2" href="#nodefromjson-2">nodeFromJSON</a>(`json`: [`NodeJSON`](#nodejson), `options`: [`JSONParserOptions`](#jsonparseroptions)): [`ProseMirrorNode`](pm/model.md#prosemirrornode)</code>

</dt>

<dd>

Parse a JSON object to a ProseMirror node.

#### Example

```ts
const json = { type: 'doc', content: [{ type: 'paragraph' }] }
const node = nodeFromJSON(json, { schema: editor.schema })
```

</dd>

</dl>

***

### removeMark() {#removemark}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="removemark-2" href="#removemark-2">removeMark</a>(`options`: [`RemoveMarkOptions`](#removemarkoptions)): [`Command`](pm/state.md#command)</code>

</dt>

<dd>

Returns a command that removes the given mark.

</dd>

</dl>

***

### removeNode() {#removenode}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="removenode-2" href="#removenode-2">removeNode</a>(`options`: [`RemoveNodeOptions`](#removenodeoptions)): [`Command`](pm/state.md#command)</code>

</dt>

<dd>

Returns a command to remove the nearest ancestor node of a specific type from the current position.

</dd>

</dl>

***

### setBlockType() {#setblocktype}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="setblocktype-2" href="#setblocktype-2">setBlockType</a>(`options`: [`SetBlockTypeOptions`](#setblocktypeoptions)): [`Command`](pm/state.md#command)</code>

</dt>

<dd>

Returns a command that tries to set the selected textblocks to the given node
type with the given attributes.

</dd>

</dl>

***

### setNodeAttrs() {#setnodeattrs}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="setnodeattrs-2" href="#setnodeattrs-2">setNodeAttrs</a>(`options`: [`SetNodeAttrsOptions`](#setnodeattrsoptions)): [`Command`](pm/state.md#command)</code>

</dt>

<dd>

Returns a command that set the attributes of the current node.

</dd>

</dl>

***

### setSelectionAround() {#setselectionaround}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="setselectionaround-2" href="#setselectionaround-2">setSelectionAround</a>(`tr`: [`Transaction`](pm/state.md#transaction), `pos`: `number`): `void`</code>

</dt>

</dl>

***

### stateFromJSON() {#statefromjson}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="statefromjson-2" href="#statefromjson-2">stateFromJSON</a>(`json`: [`StateJSON`](#statejson), `options`: [`JSONParserOptions`](#jsonparseroptions)): [`EditorState`](pm/state.md#editorstate)</code>

</dt>

<dd>

Parse a JSON object to a ProseMirror state.

#### Example

```ts
const json = { state: { type: 'doc', content: [{ type: 'paragraph' }], selection: { type: 'text', from: 1, to: 1 } } }
const state = stateFromJSON(json, { schema: editor.schema })
```

</dd>

</dl>

***

### toggleMark() {#togglemark}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="togglemark-2" href="#togglemark-2">toggleMark</a>(`options`: [`ToggleMarkOptions`](#togglemarkoptions)): [`Command`](pm/state.md#command)</code>

</dt>

<dd>

Returns a command that toggles the given mark with the given attributes.

</dd>

</dl>

***

### toggleNode() {#togglenode}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="togglenode-2" href="#togglenode-2">toggleNode</a>(`options`: [`ToggleNodeOptions`](#togglenodeoptions)): [`Command`](pm/state.md#command)</code>

</dt>

<dd>

Returns a command that set the selected textblocks to the given node type
with the given attributes.

</dd>

</dl>

***

### toggleWrap() {#togglewrap}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="togglewrap-2" href="#togglewrap-2">toggleWrap</a>(`options`: [`ToggleWrapOptions`](#togglewrapoptions)): [`Command`](pm/state.md#command)</code>

</dt>

<dd>

Toggle between wrapping an inactive node with the provided node type, and
lifting it up into its parent.

</dd>

</dl>

***

### union() {#union}

#### Call Signature

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="union-3" href="#union-3">union</a>\<E\>(...`exts`: `E`): `Union`\<`E`\></code>

</dt>

<dd>

Merges multiple extensions into one. You can pass multiple extensions as
arguments or a single array containing multiple extensions.

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

</dd>

</dl>

#### Call Signature

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="union-4" href="#union-4">union</a>\<E\>(`exts`: `E`): `Union`\<`E`\></code>

</dt>

<dd>

Merges multiple extensions into one. You can pass multiple extensions as
arguments or a single array containing multiple extensions.

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

</dd>

</dl>

***

### unsetBlockType() {#unsetblocktype}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="unsetblocktype-2" href="#unsetblocktype-2">unsetBlockType</a>(`options?`: [`UnsetBlockTypeOptions`](#unsetblocktypeoptions)): [`Command`](pm/state.md#command)</code>

</dt>

<dd>

Returns a command that set the type of all textblocks between the given range
to the default type (usually `paragraph`).

</dd>

</dl>

***

### unsetMark() {#unsetmark}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="unsetmark-2" href="#unsetmark-2">unsetMark</a>(`options?`: [`UnsetMarkOptions`](#unsetmarkoptions)): [`Command`](pm/state.md#command)</code>

</dt>

<dd>

Returns a command that removes all marks.

</dd>

</dl>

***

### withPriority() {#withpriority}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="withpriority-2" href="#withpriority-2">withPriority</a>\<T\>(`extension`: `T`, `priority`: [`Priority`](#priority)): `T`</code>

</dt>

<dd>

Return an new extension with the given priority.

#### Example

```ts
import { Priority, withPriority } from 'prosekit/core'

const extension = withPriority(defineMyExtension(), Priority.high)
```

</dd>

</dl>

***

### wrap() {#wrap}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="wrap-2" href="#wrap-2">wrap</a>(`options`: [`WrapOptions`](#wrapoptions)): [`Command`](pm/state.md#command)</code>

</dt>

<dd>

Returns a command that wraps the selected textblock with the given node type.

</dd>

</dl>

<!-- DEBUG memberWithGroups end 9 -->
