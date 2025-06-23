---
title: prosekit/preact
sidebar:
  label: preact
---

## Interfaces

### ProseKitProps {#prosekitprops}

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="children" href="#children">children</a><i>?</i>: `ComponentChildren`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="editor" href="#editor">editor</a>: [`Editor`](core.md#editor)</code>

</dt>

</dl>

***

### UseExtensionOptions {#useextensionoptions}

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="editor-1" href="#editor-1">editor</a><i>?</i>: [`Editor`](core.md#editor)\<`any`\></code>

</dt>

<dd>

The editor to add the extension to. If not provided, it will use the
editor from the nearest `ProseKit` component.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="priority" href="#priority">priority</a><i>?</i>: [`Priority`](core.md#priority)</code>

</dt>

<dd>

Optional priority to add the extension with.

</dd>

</dl>

## Variables

### ProseKit {#prosekit}

<dl>

<dt>

<code data-typedoc-declaration><i>const</i> <a id="prosekit" href="#prosekit">ProseKit</a>: `ComponentType`\<[`ProseKitProps`](#prosekitprops)\></code>

</dt>

<dd>

The root component for a ProseKit editor.

</dd>

</dl>

## Functions

### useDocChange() {#usedocchange}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="usedocchange-2" href="#usedocchange-2">useDocChange</a>(`handler`: (`doc`: [`ProseMirrorNode`](pm/model.md#prosemirrornode)) => `void`, `options?`: [`UseExtensionOptions`](#useextensionoptions)): `void`</code>

</dt>

<dd>

Calls the given handler whenever the editor document changes.

</dd>

</dl>

***

### useEditor() {#useeditor}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="useeditor-2" href="#useeditor-2">useEditor</a>\<E\>(`options?`: `object`): [`Editor`](core.md#editor)\<`E`\></code>

</dt>

<dd>

Retrieves the editor instance from the nearest ProseKit component.

</dd>

</dl>

***

### useExtension() {#useextension}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="useextension-2" href="#useextension-2">useExtension</a>(`extension`: `null` \| [`Extension`](core.md#extension-1)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>, `options?`: [`UseExtensionOptions`](#useextensionoptions)): `void`</code>

</dt>

<dd>

Add an extension to the editor.

</dd>

</dl>

***

### useKeymap() {#usekeymap}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="usekeymap-2" href="#usekeymap-2">useKeymap</a>(`keymap`: [`Keymap`](core.md#keymap), `options?`: [`UseExtensionOptions`](#useextensionoptions)): `void`</code>

</dt>

</dl>

***

### useStateUpdate() {#usestateupdate}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="usestateupdate-2" href="#usestateupdate-2">useStateUpdate</a>(`handler`: (`state`: [`EditorState`](pm/state.md#editorstate)) => `void`, `options?`: [`UseExtensionOptions`](#useextensionoptions)): `void`</code>

</dt>

<dd>

Calls the given handler whenever the editor state changes.

</dd>

</dl>
