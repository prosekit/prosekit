# prosekit/extensions/loro

<a id="LoroCursorOptions" name="LoroCursorOptions"></a>

## LoroCursorOptions

### Properties

<a id="awareness" name="awareness"></a>

#### awareness

> **awareness**: `CursorAwareness`

<a id="createCursor" name="createCursor"></a>

#### createCursor()?

> `optional` **createCursor**: (`user`) => [`Element`](https://developer.mozilla.org/docs/Web/API/Element)

##### Parameters

• **user**: \`$\{number\}\`

##### Returns

[`Element`](https://developer.mozilla.org/docs/Web/API/Element)

<a id="createSelection" name="createSelection"></a>

#### createSelection()?

> `optional` **createSelection**: (`user`) => [`DecorationAttrs`](https://prosemirror.net/docs/ref/#view.DecorationAttrs)

##### Parameters

• **user**: \`$\{number\}\`

##### Returns

[`DecorationAttrs`](https://prosemirror.net/docs/ref/#view.DecorationAttrs)

<a id="getSelection" name="getSelection"></a>

#### getSelection()?

> `optional` **getSelection**: (`state`) => [`Selection`](https://prosemirror.net/docs/ref/#state.Selection)

##### Parameters

• **state**: [`EditorState`](https://prosemirror.net/docs/ref/#state.EditorState)

##### Returns

[`Selection`](https://prosemirror.net/docs/ref/#state.Selection)

***

<a id="LoroOptions" name="LoroOptions"></a>

## LoroOptions

### Properties

<a id="awareness-1" name="awareness-1"></a>

#### awareness

> **awareness**: `CursorAwareness`

The Awareness instance.

<a id="cursor" name="cursor"></a>

#### cursor?

> `optional` **cursor**: [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<[`LoroCursorOptions`](loro.md#LoroCursorOptions), `"awareness"`\>

Extra options for `LoroCursorPlugin`.

<a id="doc" name="doc"></a>

#### doc

> **doc**: `LoroDocType`

The Loro instance handles the state of shared data.

<a id="sync" name="sync"></a>

#### sync?

> `optional` **sync**: [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`LoroSyncPluginProps`, `"doc"`\>

Extra options for `LoroSyncPlugin`.

<a id="undo" name="undo"></a>

#### undo?

> `optional` **undo**: [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`LoroUndoPluginProps`, `"doc"`\>

Extra options for the `LoroUndoPlugin`.

***

<a id="defineLoro" name="defineLoro"></a>

## defineLoro()

> **defineLoro**(`options`): `LoroExtension`

### Parameters

• **options**: [`LoroOptions`](loro.md#LoroOptions)

### Returns

`LoroExtension`

***

<a id="defineLoroCommands" name="defineLoroCommands"></a>

## defineLoroCommands()

> **defineLoroCommands**(): `LoroCommandsExtension`

### Returns

`LoroCommandsExtension`

***

<a id="defineLoroCursorPlugin" name="defineLoroCursorPlugin"></a>

## defineLoroCursorPlugin()

> **defineLoroCursorPlugin**(`options`): `PlainExtension`

### Parameters

• **options**: [`LoroCursorOptions`](loro.md#LoroCursorOptions)

### Returns

`PlainExtension`

***

<a id="defineLoroKeymap" name="defineLoroKeymap"></a>

## defineLoroKeymap()

> **defineLoroKeymap**(): `PlainExtension`

### Returns

`PlainExtension`

***

<a id="defineLoroSyncPlugin" name="defineLoroSyncPlugin"></a>

## defineLoroSyncPlugin()

> **defineLoroSyncPlugin**(`options`): `PlainExtension`

### Parameters

• **options**: `LoroSyncPluginProps`

### Returns

`PlainExtension`

***

<a id="defineLoroUndoPlugin" name="defineLoroUndoPlugin"></a>

## defineLoroUndoPlugin()

> **defineLoroUndoPlugin**(`options`): `PlainExtension`

### Parameters

• **options**: `LoroUndoPluginProps`

### Returns

`PlainExtension`
