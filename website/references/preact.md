# prosekit/preact

<a id="ProseKitProps" name="ProseKitProps"></a>

## ProseKitProps

### Properties

<a id="children" name="children"></a>

#### children?

> **children**?: `ComponentChildren`

<a id="editor" name="editor"></a>

#### editor

> **editor**: [`Editor`](core.md#EditorE)\<`any`\>

***

<a id="ProseKit" name="ProseKit"></a>

## ProseKit

> **`const`** **ProseKit**: `ComponentType`\<[`ProseKitProps`](preact.md#ProseKitProps)\>

***

<a id="useEditor" name="useEditor"></a>

## useEditor()

> **useEditor**\<`E`\>(): [`Editor`](core.md#EditorE)\<`E`\>

### Type parameters

• **E** extends [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\> = `any`

### Returns

[`Editor`](core.md#EditorE)\<`E`\>

***

<a id="useExtension" name="useExtension"></a>

## useExtension()

> **useExtension**\<`T`\>(`extension`): `void`

Add an extension to the editor.

It accepts an optional extension. If the extension is changed, the previous
extension will be removed and the new one (if not null) will be added.

### Type parameters

• **T** extends [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\> = [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

### Parameters

• **extension**: `null` \| `T`

### Returns

`void`

***

<a id="useKeymap" name="useKeymap"></a>

## useKeymap()

> **useKeymap**(`keymap`, `options`?): `void`

### Parameters

• **keymap**: [`Keymap`](core.md#Keymap)

• **options?**: `Object`

• **options\.priority?**: [`Priority`](core.md#Priority)

### Returns

`void`

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
