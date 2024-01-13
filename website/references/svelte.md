# prosekit/svelte

<a id="ProseKit" name="ProseKit"></a>

## ProseKit

> **`const`** **ProseKit**: *typeof* `SvelteComponent`

***

<a id="useEditor" name="useEditor"></a>

## useEditor()

> **useEditor**\<`E`\>(`options`?): `Readable`\<[`Editor`](core.md#EditorE)\<`E`\>\>

### Type parameters

• **E** extends [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\> = `any`

### Parameters

• **options?**: `Object`

• **options\.update?**: `boolean`

### Returns

`Readable`\<[`Editor`](core.md#EditorE)\<`E`\>\>

***

<a id="useExtension" name="useExtension"></a>

## useExtension()

> **useExtension**\<`T`\>(`extensionStore`): `void`

Add an extension to the editor.

It accepts a store to an optional extension. If the extension is changed, the
previous extension will be removed and the new one (if not null) will be
added.

### Type parameters

• **T** extends [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\> = [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

### Parameters

• **extensionStore**: `Readable`\<`null` \| `T`\>

### Returns

`void`

***

<a id="useKeymap" name="useKeymap"></a>

## useKeymap()

> **useKeymap**(`keymapStore`, `options`?): `void`

### Parameters

• **keymapStore**: `Readable`\<[`Keymap`](core.md#Keymap)\>

• **options?**: `Object`

• **options\.priority?**: [`Priority`](core.md#Priority)

### Returns

`void`

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
