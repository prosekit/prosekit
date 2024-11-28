# prosekit/extensions/yjs

## YjsCursorOptions {#yjs-cursor-options}

Options for `y-prosemirror`'s `yCursorPlugin`.

<dl>

<dt>

`awareness`

</dt>

<dd>

**Type**: `Awareness`

</dd>

</dl>

## YjsOptions {#yjs-options}

<dl>

<dt>

`awareness`

</dt>

<dd>

The Awareness instance.

**Type**: `Awareness`

</dd>

<dt>

`cursor`

</dt>

<dd>

Options for `y-prosemirror`'s `yCursorPlugin`.

**Type**: `{}`

</dd>

<dt>

`doc`

</dt>

<dd>

The Yjs instance handles the state of shared data.

**Type**: `Doc`

</dd>

<dt>

`fragment`

</dt>

<dd>

The Yjs XmlFragment to use. If not provided,
`doc.getXmlFragment('prosemirror')` will be used.

**Type**: `YXmlFragment`

</dd>

<dt>

`sync`

</dt>

<dd>

Options for `y-prosemirror`'s `ySyncPlugin`.

**Type**: `YSyncOpts`

</dd>

<dt>

`undo`

</dt>

<dd>

Options for the `y-prosemirror`'s `yUndoPlugin`.

**Type**: `{}`

</dd>

</dl>

## YjsSyncOptions {#yjs-sync-options}

Options for `y-prosemirror`'s `ySyncPlugin`.

<dl>

<dt>

`fragment`

</dt>

<dd>

**Type**: `YXmlFragment`

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

## defineYjsUndoPlugin {#define-yjs-undo-plugin}

```ts
function defineYjsUndoPlugin(options: YjsUndoOptions): PlainExtension
```
