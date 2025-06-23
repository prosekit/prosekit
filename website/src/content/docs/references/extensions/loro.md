---
title: prosekit/extensions/loro
sidebar:
  label: extensions/loro
---

## Interfaces

### LoroCursorOptions {#lorocursoroptions}

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="awareness" href="#awareness">awareness</a>: `CursorAwareness`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="createcursor" href="#createcursor">createCursor</a><i>?</i>: (`user`: `` `${number}` ``) => [`Element`](https://developer.mozilla.org/docs/Web/API/Element)</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="createselection" href="#createselection">createSelection</a><i>?</i>: (`user`: `` `${number}` ``) => [`DecorationAttrs`](../pm/view.md#decorationattrs)</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="getselection" href="#getselection">getSelection</a><i>?</i>: (`state`: [`EditorState`](../pm/state.md#editorstate)) => [`Selection`](../pm/state.md#selection-1)</code>

</dt>

</dl>

***

### LoroOptions {#lorooptions}

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="awareness-1" href="#awareness-1">awareness</a>: `CursorAwareness`</code>

</dt>

<dd>

The Awareness instance.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="cursor" href="#cursor">cursor</a><i>?</i>: [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<[`LoroCursorOptions`](#lorocursoroptions), `"awareness"`\></code>

</dt>

<dd>

Extra options for `LoroCursorPlugin`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="doc" href="#doc">doc</a>: `LoroDocType`</code>

</dt>

<dd>

The Loro instance handles the state of shared data.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="sync" href="#sync">sync</a><i>?</i>: [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`LoroSyncPluginProps`, `"doc"`\></code>

</dt>

<dd>

Extra options for `LoroSyncPlugin`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="undo" href="#undo">undo</a><i>?</i>: [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`LoroUndoPluginProps`, `"doc"`\></code>

</dt>

<dd>

Extra options for the `LoroUndoPlugin`.

</dd>

</dl>

## Functions

### defineLoro() {#defineloro}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="defineloro-2" href="#defineloro-2">defineLoro</a>(`options`: [`LoroOptions`](#lorooptions)): `LoroExtension`</code>

</dt>

<dd>

</dd>

</dl>

***

### defineLoroCommands() {#definelorocommands}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definelorocommands-2" href="#definelorocommands-2">defineLoroCommands</a>(): `LoroCommandsExtension`</code>

</dt>

</dl>

***

### defineLoroCursorPlugin() {#definelorocursorplugin}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definelorocursorplugin-2" href="#definelorocursorplugin-2">defineLoroCursorPlugin</a>(`options`: [`LoroCursorOptions`](#lorocursoroptions)): `PlainExtension`</code>

</dt>

</dl>

***

### defineLoroKeymap() {#definelorokeymap}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definelorokeymap-2" href="#definelorokeymap-2">defineLoroKeymap</a>(): `PlainExtension`</code>

</dt>

</dl>

***

### defineLoroSyncPlugin() {#definelorosyncplugin}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definelorosyncplugin-2" href="#definelorosyncplugin-2">defineLoroSyncPlugin</a>(`options`: `LoroSyncPluginProps`): `PlainExtension`</code>

</dt>

</dl>

***

### defineLoroUndoPlugin() {#defineloroundoplugin}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="defineloroundoplugin-2" href="#defineloroundoplugin-2">defineLoroUndoPlugin</a>(`options`: `LoroUndoPluginProps`): `PlainExtension`</code>

</dt>

</dl>
