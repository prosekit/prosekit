# prosekit/extensions/loro

## LoroCursorOptions {#loro-cursor-options}

<dl>

<dt>

`awareness`

</dt>

<dd>

**Type**: `CursorAwareness`

</dd>

<dt>

`createCursor`

</dt>

<dd>

**Type**: ``(user: `${number}`) => Element``

</dd>

<dt>

`createSelection`

</dt>

<dd>

**Type**: ``(user: `${number}`) => DecorationAttrs``

</dd>

<dt>

`getSelection`

</dt>

<dd>

**Type**: `(state: EditorState) => Selection`

</dd>

</dl>

## LoroOptions {#loro-options}

<dl>

<dt>

`awareness`

</dt>

<dd>

The Awareness instance.

**Type**: `CursorAwareness`

</dd>

<dt>

`cursor`

</dt>

<dd>

Extra options for `LoroCursorPlugin`.

**Type**: `Omit<LoroCursorOptions, "awareness">`

</dd>

<dt>

`doc`

</dt>

<dd>

The Loro instance handles the state of shared data.

**Type**: `LoroDocType`

</dd>

<dt>

`sync`

</dt>

<dd>

Extra options for `LoroSyncPlugin`.

**Type**: `Omit<LoroSyncPluginProps, "doc">`

</dd>

<dt>

`undo`

</dt>

<dd>

Extra options for the `LoroUndoPlugin`.

**Type**: `Omit<LoroUndoPluginProps, "doc">`

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
