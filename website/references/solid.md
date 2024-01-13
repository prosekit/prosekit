# prosekit/solid

<a id="ProseKitProps" name="ProseKitProps"></a>

## ProseKitProps

> **ProseKitProps**: `ParentProps`\<`Object`\>

### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `editor` | [`Editor`](core.md#EditorE) | - |

***

<a id="ProseKit" name="ProseKit"></a>

## ProseKit()

> **ProseKit**(`props`): `Element`

### Parameters

• **props**: [`ProseKitProps`](solid.md#ProseKitProps)

### Returns

`Element`

***

<a id="useEditor" name="useEditor"></a>

## useEditor()

> **useEditor**\<`E`\>(`options`?): () => [`Editor`](core.md#EditorE)\<`E`\>

### Type parameters

• **E** extends [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\> = `any`

### Parameters

• **options?**: `Object`

• **options\.update?**: `boolean`

### Returns

`Function`

> #### Returns
>
> [`Editor`](core.md#EditorE)\<`E`\>
>

***

<a id="useExtension" name="useExtension"></a>

## useExtension()

> **useExtension**\<`T`\>(`extension`): `void`

Add an extension to the editor.

It accepts an accessor to an optional extension. If the extension is changed,
the previous extension will be removed and the new one (if not null) will be
added.

### Type parameters

• **T** extends [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\> = [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

### Parameters

• **extension**: `null` \| `T` \| () => `null` \| `T`

### Returns

`void`

***

<a id="useKeymap" name="useKeymap"></a>

## useKeymap()

> **useKeymap**(`keymap`, `options`?): `void`

### Parameters

• **keymap**: [`Keymap`](core.md#Keymap) \| () => [`Keymap`](core.md#Keymap)

• **options?**: `Object`

• **options\.priority?**: [`Priority`](core.md#Priority)

### Returns

`void`

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
