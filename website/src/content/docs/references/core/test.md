---
title: prosekit/core/test
sidebar:
  label: core/test
---

## Interfaces

### TestEditor\<E\> {#testeditor}

An editor for testing purposes.

#### Accessors

<dl>

<dt>

<code data-typedoc-code>get <i></i> <a id="mounted" href="#mounted">mounted</a>(): `boolean`</code>

</dt>

<dd>

Whether the editor is mounted.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <i></i> <a id="view" href="#view">view</a>(): [`EditorView`](../pm/view.md#editorview)</code>

</dt>

<dd>

The editor view.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <i></i> <a id="schema" href="#schema">schema</a>(): [`Schema`](../pm/model.md#schema-3)\<`ExtractNodeNames`\<`E`\>, `ExtractMarkNames`\<`E`\>\></code>

</dt>

<dd>

The editor schema.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <i></i> <a id="state" href="#state">state</a>(): [`EditorState`](../pm/state.md#editorstate)</code>

</dt>

<dd>

The editor's current state.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <i></i> <a id="focused" href="#focused">focused</a>(): `boolean`</code>

</dt>

<dd>

Whether the editor is focused.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <i></i> <a id="commands" href="#commands">commands</a>(): [`ExtractCommandActions`](../core.md#extractcommandactions)\<`E`\></code>

</dt>

<dd>

All [CommandAction](../core.md#commandaction)s defined by the editor.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <i></i> <a id="nodes" href="#nodes">nodes</a>(): [`ExtractNodeActions`](../core.md#extractnodeactions)\<`E`\></code>

</dt>

<dd>

All [NodeAction](../core.md#nodeaction)s defined by the editor.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code>get <i></i> <a id="marks" href="#marks">marks</a>(): [`ExtractMarkActions`](../core.md#extractmarkactions)\<`E`\></code>

</dt>

<dd>

All [MarkAction](../core.md#markaction)s defined by the editor.

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="mount" href="#mount">mount</a>(`place`: `undefined` \| `null` \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement)): `void`</code>

</dt>

<dd>

Mount the editor to the given HTML element.
Pass `null` or `undefined` to unmount the editor.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="unmount" href="#unmount">unmount</a>(): `void`</code>

</dt>

<dd>

Unmount the editor. This is equivalent to `mount(null)`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="focus" href="#focus">focus</a>(): `void`</code>

</dt>

<dd>

Focus the editor.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="blur" href="#blur">blur</a>(): `void`</code>

</dt>

<dd>

Blur the editor.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="use" href="#use">use</a>(`extension`: [`Extension`](../core.md#extension-1)): `VoidFunction`</code>

</dt>

<dd>

Register an extension to the editor. Return a function to unregister the
extension.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="updatestate" href="#updatestate">updateState</a>(`state`: [`EditorState`](../pm/state.md#editorstate)): `void`</code>

</dt>

<dd>

Update the editor's state.

###### Remarks

This is an advanced method. Use it only if you have a specific reason to
directly manipulate the editor's state.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="setcontent" href="#setcontent">setContent</a>(`content`: `string` \| [`ProseMirrorNode`](../pm/model.md#prosemirrornode) \| [`NodeJSON`](../core.md#nodejson) \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement), `selection?`: [`Selection`](../pm/state.md#selection-3) \| `"start"` \| [`SelectionJSON`](../core.md#selectionjson) \| `"end"`): `void`</code>

</dt>

<dd>

Update the editor's document and selection.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="getdocjson" href="#getdocjson">getDocJSON</a>(): [`NodeJSON`](../core.md#nodejson)</code>

</dt>

<dd>

Return a JSON object representing the editor's current document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="getdochtml" href="#getdochtml">getDocHTML</a>(`options?`: `getDocHTMLOptions`): `string`</code>

</dt>

<dd>

Return a HTML string representing the editor's current document.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="exec" href="#exec">exec</a>(`command`: [`Command`](../pm/state.md#command)): `boolean`</code>

</dt>

<dd>

Execute the given command. Return `true` if the command was successfully
executed, otherwise `false`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="canexec" href="#canexec">canExec</a>(`command`: [`Command`](../pm/state.md#command)): `boolean`</code>

</dt>

<dd>

Check if the given command can be executed. Return `true` if the command
can be executed, otherwise `false`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="set" href="#set">set</a>(`doc`: [`ProseMirrorNode`](../pm/model.md#prosemirrornode)): `void`</code>

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

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="dispatchevent" href="#dispatchevent">dispatchEvent</a>(`event`: [`Event`](https://developer.mozilla.org/docs/Web/API/Event)): `void`</code>

</dt>

</dl>

## Functions

### createTestEditor() {#createtesteditor}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <i></i> <a id="createtesteditor" href="#createtesteditor">createTestEditor</a>\<E\>(`options`: [`EditorOptions`](../core.md#editoroptions)\<`E`\>): [`TestEditor`](#testeditor)\<`E`\></code>

</dt>

<dd>

</dd>

</dl>
