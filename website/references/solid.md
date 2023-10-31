# prosekit/solid

## ProseKitProps

```ts
type ProseKitProps: ParentProps<object>;
```

***

## ProseKit()

```ts
ProseKit(props): Element
```

A general `Component` has no implicit `children` prop.  If desired, you can
specify one as in `Component<{name: String, children: JSX.Element}>`.

### Parameters

▪ **props**: [`ProseKitProps`](solid.md#prosekitprops)

### Returns

`Element`

***

## useEditor()

```ts
useEditor<E>(options?): () => Editor<E>
```

### Type parameters

▪ **E** extends [`Extension`](core.md#extensiont)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\> = `any`

### Parameters

▪ **options?**: `UseEditorOptions`

### Returns

`function`

> ```ts
> (): Editor<E>
> ```
>
> #### Returns
>
> [`Editor`](core.md#editore)\<`E`\>
>

***

## useExtension()

```ts
useExtension(__namedParameters): void
```

### Parameters

▪ **\_\_namedParameters**: `UseExtensionProps`\<[`Extension`](core.md#extensiont)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>\>

### Returns

`void`

***

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
