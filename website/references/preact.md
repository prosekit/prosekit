# prosekit/preact

<a id="ProseKitProps" name="ProseKitProps"></a>

## ProseKitProps

### Properties

<a id="children" name="children"></a>

#### children?

> `optional` **children**: `ComponentChildren`

<a id="editor" name="editor"></a>

#### editor

> **editor**: [`Editor`](core.md#EditorE)\<`any`\>

***

<a id="UseExtensionOptions" name="UseExtensionOptions"></a>

## UseExtensionOptions

### Properties

<a id="editor-1" name="editor-1"></a>

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

> `const` **ProseKit**: `ComponentType`\<[`ProseKitProps`](preact.md#ProseKitProps)\>

The root component for a ProseKit editor.

***

<a id="useDocChange" name="useDocChange"></a>

## useDocChange()

> **useDocChange**(`handler`, `options`?): `void`

Calls the given handler whenever the editor document changes.

### Parameters

• **handler**

• **options?**: [`UseExtensionOptions`](preact.md#UseExtensionOptions)

### Returns

`void`

***

<a id="useEditor" name="useEditor"></a>

## useEditor()

> **useEditor**\<`E`\>(`options`?): [`Editor`](core.md#EditorE)\<`E`\>

Retrieves the editor instance from the nearest ProseKit component.

### Type Parameters

• **E** *extends* [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\> = `any`

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

[`Editor`](core.md#EditorE)\<`E`\>

***

<a id="useExtension" name="useExtension"></a>

## useExtension()

> **useExtension**(`extension`, `options`?): `void`

Add an extension to the editor.

### Parameters

• **extension**: `null` \| [`Extension`](core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

The extension to add to the editor. If it changes, the previous
extension will be removed and the new one (if not null) will be added.

• **options?**: [`UseExtensionOptions`](preact.md#UseExtensionOptions)

### Returns

`void`

***

<a id="useKeymap" name="useKeymap"></a>

## useKeymap()

> **useKeymap**(`keymap`, `options`?): `void`

### Parameters

• **keymap**: [`Keymap`](core.md#Keymap)

• **options?**: [`UseExtensionOptions`](preact.md#UseExtensionOptions)

### Returns

`void`

***

<a id="useStateUpdate" name="useStateUpdate"></a>

## useStateUpdate()

> **useStateUpdate**(`handler`, `options`?): `void`

Calls the given handler whenever the editor state changes.

### Parameters

• **handler**

• **options?**: [`UseExtensionOptions`](preact.md#UseExtensionOptions)

### Returns

`void`
