# prosekit/vue

<a id="prosekitprops" name="prosekitprops"></a>

## ProseKitProps

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `editor` | [`Editor`](core.md#editore)\<`any`\> | - |

***

<a id="prosekit" name="prosekit"></a>

## ProseKit()

```ts
ProseKit(props): any
```

### Parameters

▪ **props**: [`ProseKitProps`](vue.md#prosekitprops) & `object`

### Returns

`any`

***

<a id="useeditor" name="useeditor"></a>

## useEditor()

```ts
useEditor<E>(): Editor<E>
```

### Type parameters

▪ **E** extends [`Extension`](core.md#extensiont)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\> = `any`

### Returns

[`Editor`](core.md#editore)\<`E`\>

***

<a id="useeditorref" name="useeditorref"></a>

## useEditorRef()

```ts
useEditorRef<E>(): ShallowRef<Editor<E>>
```

### Type parameters

▪ **E** extends [`Extension`](core.md#extensiont)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\> = `any`

### Returns

`ShallowRef`\<[`Editor`](core.md#editore)\<`E`\>\>

***

<a id="usekeymap" name="usekeymap"></a>

## useKeymap()

```ts
useKeymap(__namedParameters): void
```

### Parameters

▪ **\_\_namedParameters**: `object`

▪ **\_\_namedParameters.keymap**: [`Keymap`](core.md#keymap)

### Returns

`void`

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
