# prosekit/svelte

<a id="UseExtensionOptions" name="UseExtensionOptions"></a>

## UseExtensionOptions

### Properties

<a id="editor" name="editor"></a>

#### editor?

> `optional` **editor**: [`Editor`](core.md#EditorE)\<`any`\>

The editor to add the extension to. If not provided, it will use the
editor from the nearest `ProseKit` component.

<a id="priority" name="priority"></a>

#### priority?

> `optional` **priority**: [`Priority`](core.md#Priority)

Optional priority to add the extension with.

***

<a id="ProseKit" name="ProseKit"></a>

## ProseKit

> `const` **ProseKit**: *typeof* `SvelteComponent`

The root component for a ProseKit editor.

***

<a id="useDocChange" name="useDocChange"></a>

## useDocChange()

> **useDocChange**(`handler`, `options`?): `void`

Calls the given handler whenever the editor document changes.

### Parameters

• **handler**

• **options?**: [`UseExtensionOptions`](svelte.md#UseExtensionOptions)

### Returns

`void`

***

<a id="useEditor" name="useEditor"></a>

## useEditor()

> **useEditor**\<`E`\>(`options`?): `Readable`\<[`Editor`](core.md#EditorE)\<`E`\>\>

Retrieves the editor instance from the nearest ProseKit component.

### Type parameters

• **E** *extends* [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\> = `any`

### Parameters

• **options?**

• **options.update?**: `boolean`

Whether to update the component when the editor is mounted or editor state
is updated.

**Default**
```ts
false
```

### Returns

`Readable`\<[`Editor`](core.md#EditorE)\<`E`\>\>

***

<a id="useExtension" name="useExtension"></a>

## useExtension()

> **useExtension**\<`T`\>(`extension`, `options`?): `void`

Add an extension to the editor.

### Type parameters

• **T** *extends* [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\> = [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

### Parameters

• **extension**: `Readable`\<`null` \| `T`\>

The store to an extension to add to the editor. If it changes, the previous
extension will be removed and the new one (if not null) will be added.

• **options?**: [`UseExtensionOptions`](svelte.md#UseExtensionOptions)

### Returns

`void`

***

<a id="useKeymap" name="useKeymap"></a>

## useKeymap()

> **useKeymap**(`keymapStore`, `options`?): `void`

### Parameters

• **keymapStore**: `Readable`\<[`Keymap`](core.md#Keymap)\>

• **options?**: [`UseExtensionOptions`](svelte.md#UseExtensionOptions)

### Returns

`void`

***

<a id="useStateUpdate" name="useStateUpdate"></a>

## useStateUpdate()

> **useStateUpdate**(`handler`, `options`?): `void`

Calls the given handler whenever the editor state changes.

### Parameters

• **handler**

• **options?**: [`UseExtensionOptions`](svelte.md#UseExtensionOptions)

### Returns

`void`
