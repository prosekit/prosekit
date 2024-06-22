# prosekit/solid

<a id="UseExtensionOptions" name="UseExtensionOptions"></a>

## UseExtensionOptions

### Properties

<a id="editor" name="editor"></a>

#### editor?

> `optional` **editor**: [`MaybeAccessor`](solid.md#MaybeAccessorT)\<[`Editor`](core.md#EditorE)\<`any`\>\>

The editor to add the extension to. If not provided, it will use the
editor from the nearest `ProseKit` component.

<a id="priority" name="priority"></a>

#### priority?

> `optional` **priority**: [`Priority`](core.md#Priority)

Optional priority to add the extension with.

***

<a id="MaybeAccessorT" name="MaybeAccessorT"></a>

## MaybeAccessor\<T\>

> **MaybeAccessor**\<`T`\>: `T` \| `Accessor`\<`T`\>

T or a reactive/non-reactive function returning T

### Type Parameters

• **T**

***

<a id="ProseKitProps" name="ProseKitProps"></a>

## ProseKitProps

> **ProseKitProps**: `ParentProps`\<`object`\>

### Type declaration

| Name | Type |
| ------ | ------ |
| `editor` | [`Editor`](core.md#EditorE) |

***

<a id="ProseKit" name="ProseKit"></a>

## ProseKit()

> **ProseKit**(`props`): `Element`

The root component for a ProseKit editor.

### Parameters

• **props**: [`ProseKitProps`](solid.md#ProseKitProps)

### Returns

`Element`

***

<a id="useDocChange" name="useDocChange"></a>

## useDocChange()

> **useDocChange**(`handler`, `options`?): `void`

Calls the given handler whenever the editor document changes.

### Parameters

• **handler**

• **options?**: [`UseExtensionOptions`](solid.md#UseExtensionOptions)

### Returns

`void`

***

<a id="useEditor" name="useEditor"></a>

## useEditor()

> **useEditor**\<`E`\>(`options`?): () => [`Editor`](core.md#EditorE)\<`E`\>

Retrieves the editor instance from the nearest ProseKit component.

### Type Parameters

• **E** *extends* [`Extension`](core.md#ExtensionT)\<`any`\> = `any`

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

`Function`

#### Returns

[`Editor`](core.md#EditorE)\<`E`\>

***

<a id="useExtension" name="useExtension"></a>

## useExtension()

> **useExtension**(`extension`, `options`?): `void`

Add an extension to the editor.

### Parameters

• **extension**: `Accessor`\<`null` \| [`Extension`](core.md#ExtensionT)\<`any`\>\>

The accessor to an extension to add to the editor. If it changes, the previous
extension will be removed and the new one (if not null) will be added.

• **options?**: [`UseExtensionOptions`](solid.md#UseExtensionOptions)

### Returns

`void`

***

<a id="useKeymap" name="useKeymap"></a>

## useKeymap()

> **useKeymap**(`keymap`, `options`?): `void`

### Parameters

• **keymap**

• **options?**: [`UseExtensionOptions`](solid.md#UseExtensionOptions)

### Returns

`void`

***

<a id="useStateUpdate" name="useStateUpdate"></a>

## useStateUpdate()

> **useStateUpdate**(`handler`, `options`?): `void`

Calls the given handler whenever the editor state changes.

### Parameters

• **handler**

• **options?**: [`UseExtensionOptions`](solid.md#UseExtensionOptions)

### Returns

`void`
