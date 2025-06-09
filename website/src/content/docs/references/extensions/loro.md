---
title: prosekit/extensions/loro
sidebar:
  label: extensions/loro
---


## LoroCursorOptions {#loro-cursor-options}

<dl>

<dt>

`awareness: CursorAwareness`

</dt>

<dd>

</dd>

<dt>

``createCursor?: (user: `${number}`) => Element``

</dt>

<dd>

</dd>

<dt>

``createSelection?: (user: `${number}`) => DecorationAttrs``

</dt>

<dd>

</dd>

<dt>

`getSelection?: (state: EditorState) => Selection`

</dt>

<dd>

</dd>

</dl>

## LoroOptions {#loro-options}

<dl>

<dt>

`awareness: CursorAwareness`

</dt>

<dd>

The Awareness instance.

</dd>

<dt>

`cursor?: Omit<LoroCursorOptions, "awareness">`

</dt>

<dd>

Extra options for `LoroCursorPlugin`.

</dd>

<dt>

`doc: LoroDocType`

</dt>

<dd>

The Loro instance handles the state of shared data.

</dd>

<dt>

`sync?: Omit<LoroSyncPluginProps, "doc">`

</dt>

<dd>

Extra options for `LoroSyncPlugin`.

</dd>

<dt>

`undo?: Omit<LoroUndoPluginProps, "doc">`

</dt>

<dd>

Extra options for the `LoroUndoPlugin`.

</dd>

</dl>

## defineLoro {#define-loro}

```ts
function defineLoro(options: LoroOptions): LoroExtension
```

## defineLoroCommands {#define-loro-commands}

```ts
function defineLoroCommands(): LoroCommandsExtension
```

## defineLoroCursorPlugin {#define-loro-cursor-plugin}

```ts
function defineLoroCursorPlugin(options: LoroCursorOptions): PlainExtension
```

## defineLoroKeymap {#define-loro-keymap}

```ts
function defineLoroKeymap(): PlainExtension
```

## defineLoroSyncPlugin {#define-loro-sync-plugin}

```ts
function defineLoroSyncPlugin(options: LoroSyncPluginProps): PlainExtension
```

## defineLoroUndoPlugin {#define-loro-undo-plugin}

```ts
function defineLoroUndoPlugin(options: LoroUndoPluginProps): PlainExtension
```
