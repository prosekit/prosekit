---
title: prosekit/core/test
sidebar:
  label: core/test
---

## Classes

### TestEditor\<E\> {#testeditor}

An editor for testing purposes.

#### Extends

- [`Editor`](../core.md#editor)\<`E`\>

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

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-declaration><i></i> new <a id="constructortesteditor" href="#constructortesteditor">TestEditor</a>\<E\>(`instance`: `EditorInstance`): [`TestEditor`](#testeditor)\<`E`\></code>

</dt>

<dd>

###### Overrides

`Editor<E>.constructor`

</dd>

</dl>

#### Accessors

##### commands {#commands}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="commandscommands" href="#commandscommands">commands</a>(): [`ExtractCommandActions`](../core.md#extractcommandactions)\<`E`\></code>

All [CommandAction](../core.md#commandaction)s defined by the editor.

###### Returns

[`ExtractCommandActions`](../core.md#extractcommandactions)\<`E`\>

###### Inherited from

[`Editor`](../core.md#editor).[`commands`](../core.md#editor#commands)

##### focused {#focused}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="focusedfocused" href="#focusedfocused">focused</a>(): `boolean`</code>

Whether the editor is focused.

###### Returns

`boolean`

###### Inherited from

[`Editor`](../core.md#editor).[`focused`](../core.md#editor#focused)

##### marks {#marks}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="marksmarks" href="#marksmarks">marks</a>(): [`ExtractMarkActions`](../core.md#extractmarkactions)\<`E`\></code>

All [MarkAction](../core.md#markaction)s defined by the editor.

###### Returns

[`ExtractMarkActions`](../core.md#extractmarkactions)\<`E`\>

###### Inherited from

[`Editor`](../core.md#editor).[`marks`](../core.md#editor#marks)

##### mounted {#mounted}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="mountedmounted" href="#mountedmounted">mounted</a>(): `boolean`</code>

Whether the editor is mounted.

###### Returns

`boolean`

###### Inherited from

[`Editor`](../core.md#editor).[`mounted`](../core.md#editor#mounted)

##### nodes {#nodes}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="nodesnodes" href="#nodesnodes">nodes</a>(): [`ExtractNodeActions`](../core.md#extractnodeactions)\<`E`\></code>

All [NodeAction](../core.md#nodeaction)s defined by the editor.

###### Returns

[`ExtractNodeActions`](../core.md#extractnodeactions)\<`E`\>

###### Inherited from

[`Editor`](../core.md#editor).[`nodes`](../core.md#editor#nodes)

##### schema {#schema}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="schemaschema" href="#schemaschema">schema</a>(): [`Schema`](../pm/model.md#schema-3)\<`ExtractNodeNames`\<`E`\>, `ExtractMarkNames`\<`E`\>\></code>

The editor schema.

###### Returns

[`Schema`](../pm/model.md#schema-3)\<`ExtractNodeNames`\<`E`\>, `ExtractMarkNames`\<`E`\>\>

###### Inherited from

[`Editor`](../core.md#editor).[`schema`](../core.md#editor#schema)

##### state {#state}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="statestate" href="#statestate">state</a>(): [`EditorState`](../pm/state.md#editorstate)</code>

The editor's current state.

###### Returns

[`EditorState`](../pm/state.md#editorstate)

###### Inherited from

[`Editor`](../core.md#editor).[`state`](../core.md#editor#state)

##### view {#view}

###### Get Signature

<code data-typedoc-declaration>get <i></i> <a id="viewview" href="#viewview">view</a>(): [`EditorView`](../pm/view.md#editorview)</code>

The editor view.

###### Returns

[`EditorView`](../pm/view.md#editorview)

###### Inherited from

[`Editor`](../core.md#editor).[`view`](../core.md#editor#view)

#### Methods

##### blur() {#blur}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="blur-1" href="#blur-1">blur</a>(): `void`</code>

</dt>

<dd>

Blur the editor.

###### Inherited from

[`Editor`](../core.md#editor).[`blur`](../core.md#editor#blur)

</dd>

</dl>

##### canExec() {#canexec}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="canexec-1" href="#canexec-1">canExec</a>(`command`: [`Command`](../pm/state.md#command)): `boolean`</code>

</dt>

<dd>

Check if the given command can be executed. Return `true` if the command
can be executed, otherwise `false`.

###### Inherited from

[`Editor`](../core.md#editor).[`canExec`](../core.md#editor#canexec)

</dd>

</dl>

##### dispatchEvent() {#dispatchevent}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="dispatchevent-1" href="#dispatchevent-1">dispatchEvent</a>(`event`: [`Event`](https://developer.mozilla.org/docs/Web/API/Event)): `void`</code>

</dt>

</dl>

##### exec() {#exec}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="exec-1" href="#exec-1">exec</a>(`command`: [`Command`](../pm/state.md#command)): `boolean`</code>

</dt>

<dd>

Execute the given command. Return `true` if the command was successfully
executed, otherwise `false`.

###### Inherited from

[`Editor`](../core.md#editor).[`exec`](../core.md#editor#exec)

</dd>

</dl>

##### focus() {#focus}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="focus-1" href="#focus-1">focus</a>(): `void`</code>

</dt>

<dd>

Focus the editor.

###### Inherited from

[`Editor`](../core.md#editor).[`focus`](../core.md#editor#focus)

</dd>

</dl>

##### getDocHTML() {#getdochtml}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="getdochtml-1" href="#getdochtml-1">getDocHTML</a>(`options?`: `getDocHTMLOptions`): `string`</code>

</dt>

<dd>

Return a HTML string representing the editor's current document.

###### Inherited from

[`Editor`](../core.md#editor).[`getDocHTML`](../core.md#editor#getdochtml)

</dd>

</dl>

##### getDocJSON() {#getdocjson}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="getdocjson-1" href="#getdocjson-1">getDocJSON</a>(): [`NodeJSON`](../core.md#nodejson)</code>

</dt>

<dd>

Return a JSON object representing the editor's current document.

###### Inherited from

[`Editor`](../core.md#editor).[`getDocJSON`](../core.md#editor#getdocjson)

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

###### Inherited from

[`Editor`](../core.md#editor).[`mount`](../core.md#editor#mount)

</dd>

</dl>

##### set() {#set}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="set-1" href="#set-1">set</a>(`doc`: [`ProseMirrorNode`](../pm/model.md#prosemirrornode)): `void`</code>

</dt>

<dd>

Set the editor state to the given document. You can use special tokens
`<a>` and `<b>` to set the anchor and head positions of the selection.

###### Example

```ts
const editor = createTestEditor({ extension })
const n = editor.nodes
const doc = n.doc(n.paragraph('<a>Hello<b> world!'))
editor.set(doc) // "Hello" is selected.
```

</dd>

</dl>

##### setContent() {#setcontent}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="setcontent-1" href="#setcontent-1">setContent</a>(`content`: `string` \| [`ProseMirrorNode`](../pm/model.md#prosemirrornode) \| [`NodeJSON`](../core.md#nodejson) \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement), `selection?`: [`Selection`](../pm/state.md#selection-1) \| `"start"` \| [`SelectionJSON`](../core.md#selectionjson) \| `"end"`): `void`</code>

</dt>

<dd>

Update the editor's document and selection.

###### Inherited from

[`Editor`](../core.md#editor).[`setContent`](../core.md#editor#setcontent)

</dd>

</dl>

##### unmount() {#unmount}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="unmount-1" href="#unmount-1">unmount</a>(): `void`</code>

</dt>

<dd>

Unmount the editor. This is equivalent to `mount(null)`.

###### Inherited from

[`Editor`](../core.md#editor).[`unmount`](../core.md#editor#unmount)

</dd>

</dl>

##### updateState() {#updatestate}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="updatestate-1" href="#updatestate-1">updateState</a>(`state`: [`EditorState`](../pm/state.md#editorstate)): `void`</code>

</dt>

<dd>

Update the editor's state.

###### Remarks

This is an advanced method. Use it only if you have a specific reason to
directly manipulate the editor's state.

###### Inherited from

[`Editor`](../core.md#editor).[`updateState`](../core.md#editor#updatestate)

</dd>

</dl>

##### use() {#use}

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="use-1" href="#use-1">use</a>(`extension`: [`Extension`](../core.md#extension-1)): `VoidFunction`</code>

</dt>

<dd>

Register an extension to the editor. Return a function to unregister the
extension.

###### Inherited from

[`Editor`](../core.md#editor).[`use`](../core.md#editor#use)

</dd>

</dl>

## Functions

### createTestEditor() {#createtesteditor}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="createtesteditor-2" href="#createtesteditor-2">createTestEditor</a>\<E\>(`options`: [`EditorOptions`](../core.md#editoroptions)\<`E`\>): [`TestEditor`](#testeditor)\<`E`\></code>

</dt>

<dd>

</dd>

</dl>
