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

<code data-typedoc-code><a id="awareness" href="#awareness">awareness</a>: `CursorAwareness`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="getselection" href="#getselection">getSelection</a><i>?</i>: (`state`: [`EditorState`](../pm/state.md#editorstate)) => [`Selection`](../pm/state.md#selection-3)</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="createcursor" href="#createcursor">createCursor</a><i>?</i>: (`user`: `` `${number}` ``) => [`Element`](https://developer.mozilla.org/docs/Web/API/Element)</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="createselection" href="#createselection">createSelection</a><i>?</i>: (`user`: `` `${number}` ``) => [`DecorationAttrs`](../pm/view.md#decorationattrs)</code>

</dt>

</dl>

***

### LoroOptions {#lorooptions}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="doc" href="#doc">doc</a>: `LoroDocType`</code>

</dt>

<dd>

The Loro instance handles the state of shared data.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="awareness-1" href="#awareness-1">awareness</a>: `CursorAwareness`</code>

</dt>

<dd>

The Awareness instance.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="sync" href="#sync">sync</a><i>?</i>: [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`LoroSyncPluginProps`, `"doc"`\></code>

</dt>

<dd>

Extra options for `LoroSyncPlugin`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="undo" href="#undo">undo</a><i>?</i>: [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`LoroUndoPluginProps`, `"doc"`\></code>

</dt>

<dd>

Extra options for the `LoroUndoPlugin`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="cursor" href="#cursor">cursor</a><i>?</i>: [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<[`LoroCursorOptions`](#lorocursoroptions), `"awareness"`\></code>

</dt>

<dd>

Extra options for `LoroCursorPlugin`.

</dd>

</dl>

## Functions

### defineLoroCommands() {#definelorocommands}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definelorocommands" href="#definelorocommands">defineLoroCommands</a>(): `LoroCommandsExtension`</code>

</dt>

</dl>

***

### defineLoroCursorPlugin() {#definelorocursorplugin}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definelorocursorplugin" href="#definelorocursorplugin">defineLoroCursorPlugin</a>(`options`: [`LoroCursorOptions`](#lorocursoroptions)): `PlainExtension`</code>

</dt>

</dl>

***

### defineLoroKeymap() {#definelorokeymap}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definelorokeymap" href="#definelorokeymap">defineLoroKeymap</a>(): `PlainExtension`</code>

</dt>

</dl>

***

### defineLoroSyncPlugin() {#definelorosyncplugin}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definelorosyncplugin" href="#definelorosyncplugin">defineLoroSyncPlugin</a>(`options`: `LoroSyncPluginProps`): `PlainExtension`</code>

</dt>

</dl>

***

### defineLoroUndoPlugin() {#defineloroundoplugin}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="defineloroundoplugin" href="#defineloroundoplugin">defineLoroUndoPlugin</a>(`options`: `LoroUndoPluginProps`): `PlainExtension`</code>

</dt>

</dl>

***

### defineLoro() {#defineloro}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="defineloro" href="#defineloro">defineLoro</a>(`options`: [`LoroOptions`](#lorooptions)): `LoroExtension`</code>

</dt>

<dd>

</dd>

</dl>
