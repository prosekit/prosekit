---
title: prosekit/extensions/yjs
sidebar:
  label: extensions/yjs
---

## Interfaces

### YjsCursorOptions {#yjscursoroptions}

Options for `y-prosemirror`'s `yCursorPlugin`.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="awareness" href="#awareness">awareness</a>: `Awareness`</code>

</dt>

</dl>

***

### YjsSyncOptions {#yjssyncoptions}

Options for `y-prosemirror`'s `ySyncPlugin`.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="fragment" href="#fragment">fragment</a>: `YXmlFragment`</code>

</dt>

</dl>

***

### YjsUndoOptions {#yjsundooptions}

Options for the `y-prosemirror`'s `yUndoPlugin`.

***

### YjsOptions {#yjsoptions}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="doc" href="#doc">doc</a>: `Doc`</code>

</dt>

<dd>

The Yjs instance handles the state of shared data.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="awareness-1" href="#awareness-1">awareness</a>: `Awareness`</code>

</dt>

<dd>

The Awareness instance.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="fragment-1" href="#fragment-1">fragment</a><i>?</i>: `YXmlFragment`</code>

</dt>

<dd>

The Yjs XmlFragment to use. If not provided,
`doc.getXmlFragment('prosemirror')` will be used.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="sync" href="#sync">sync</a><i>?</i>: `YSyncOpts`</code>

</dt>

<dd>

Options for `y-prosemirror`'s `ySyncPlugin`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="undo" href="#undo">undo</a><i>?</i>: `object`</code>

</dt>

<dd>

Options for the `y-prosemirror`'s `yUndoPlugin`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="cursor" href="#cursor">cursor</a><i>?</i>: `object`</code>

</dt>

<dd>

Options for `y-prosemirror`'s `yCursorPlugin`.

</dd>

</dl>

## Type Aliases

### YjsCursorPluginOptions {#yjscursorpluginoptions}

<dl>

<dt>

<code data-typedoc-code>type <a id="yjscursorpluginoptions" href="#yjscursorpluginoptions">YjsCursorPluginOptions</a> = [`NonNullable`](https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype)\<[`Parameters`](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)\<*typeof* `yCursorPlugin`\>\[`1`\]\></code>

</dt>

<dd>

Options for `y-prosemirror`'s `yCursorPlugin`.

</dd>

</dl>

***

### YjsSyncPluginOptions {#yjssyncpluginoptions}

<dl>

<dt>

<code data-typedoc-code>type <a id="yjssyncpluginoptions" href="#yjssyncpluginoptions">YjsSyncPluginOptions</a> = [`NonNullable`](https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype)\<[`Parameters`](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)\<*typeof* `ySyncPlugin`\>\[`1`\]\></code>

</dt>

<dd>

Options for `y-prosemirror`'s `ySyncPlugin`.

</dd>

</dl>

***

### YjsUndoPluginOptions {#yjsundopluginoptions}

<dl>

<dt>

<code data-typedoc-code>type <a id="yjsundopluginoptions" href="#yjsundopluginoptions">YjsUndoPluginOptions</a> = [`NonNullable`](https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype)\<[`Parameters`](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)\<*typeof* `originalYUndoPlugin`\>\[`0`\]\></code>

</dt>

<dd>

Options for the `y-prosemirror`'s `yUndoPlugin`.

</dd>

</dl>

## Functions

### defineYjsCommands() {#defineyjscommands}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="defineyjscommands" href="#defineyjscommands">defineYjsCommands</a>(): `YjsCommandsExtension`</code>

</dt>

</dl>

***

### defineYjsCursorPlugin() {#defineyjscursorplugin}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="defineyjscursorplugin" href="#defineyjscursorplugin">defineYjsCursorPlugin</a>(`options`: [`YjsCursorOptions`](#yjscursoroptions)): `PlainExtension`</code>

</dt>

</dl>

***

### defineYjsKeymap() {#defineyjskeymap}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="defineyjskeymap" href="#defineyjskeymap">defineYjsKeymap</a>(): `PlainExtension`</code>

</dt>

</dl>

***

### defineYjsSyncPlugin() {#defineyjssyncplugin}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="defineyjssyncplugin" href="#defineyjssyncplugin">defineYjsSyncPlugin</a>(`options`: [`YjsSyncOptions`](#yjssyncoptions)): `PlainExtension`</code>

</dt>

</dl>

***

### defineYjs() {#defineyjs}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="defineyjs" href="#defineyjs">defineYjs</a>(`options`: [`YjsOptions`](#yjsoptions)): `YjsExtension`</code>

</dt>

<dd>

</dd>

</dl>
