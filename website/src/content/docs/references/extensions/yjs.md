---
title: prosekit/extensions/yjs
sidebar:
  label: extensions/yjs
---


## YjsCursorOptions {#yjs-cursor-options}

Options for `y-prosemirror`'s `yCursorPlugin`.

<dl>

<dt>

`awareness: Awareness`

</dt>

<dd>

</dd>

</dl>

## YjsOptions {#yjs-options}

<dl>

<dt>

`awareness: Awareness`

</dt>

<dd>

The Awareness instance.

</dd>

<dt>

`cursor?: {}`

</dt>

<dd>

Options for `y-prosemirror`'s `yCursorPlugin`.

</dd>

<dt>

`doc: Doc`

</dt>

<dd>

The Yjs instance handles the state of shared data.

</dd>

<dt>

`fragment?: YXmlFragment`

</dt>

<dd>

The Yjs XmlFragment to use. If not provided,
`doc.getXmlFragment('prosemirror')` will be used.

</dd>

<dt>

`sync?: YSyncOpts`

</dt>

<dd>

Options for `y-prosemirror`'s `ySyncPlugin`.

</dd>

<dt>

`undo?: {}`

</dt>

<dd>

Options for the `y-prosemirror`'s `yUndoPlugin`.

</dd>

</dl>

## YjsSyncOptions {#yjs-sync-options}

Options for `y-prosemirror`'s `ySyncPlugin`.

<dl>

<dt>

`fragment: YXmlFragment`

</dt>

<dd>

</dd>

</dl>

## YjsUndoOptions {#yjs-undo-options}

Options for the `y-prosemirror`'s `yUndoPlugin`.

## YjsCursorPluginOptions {#yjs-cursor-plugin-options}

Options for `y-prosemirror`'s `yCursorPlugin`.

**Type**: `NonNullable<Parameters<typeof yCursorPlugin>[1]>`

## YjsSyncPluginOptions {#yjs-sync-plugin-options}

Options for `y-prosemirror`'s `ySyncPlugin`.

**Type**: `NonNullable<Parameters<typeof ySyncPlugin>[1]>`

## YjsUndoPluginOptions {#yjs-undo-plugin-options}

Options for the `y-prosemirror`'s `yUndoPlugin`.

**Type**: `NonNullable<Parameters<typeof originalYUndoPlugin>[0]>`

## defineYjs {#define-yjs}

```ts
function defineYjs(options: YjsOptions): YjsExtension
```

## defineYjsCommands {#define-yjs-commands}

```ts
function defineYjsCommands(): YjsCommandsExtension
```

## defineYjsCursorPlugin {#define-yjs-cursor-plugin}

```ts
function defineYjsCursorPlugin(options: YjsCursorOptions): PlainExtension
```

## defineYjsKeymap {#define-yjs-keymap}

```ts
function defineYjsKeymap(): PlainExtension
```

## defineYjsSyncPlugin {#define-yjs-sync-plugin}

```ts
function defineYjsSyncPlugin(options: YjsSyncOptions): PlainExtension
```
