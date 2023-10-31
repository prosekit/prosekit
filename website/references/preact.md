# prosekit/preact

## ProseKitProps

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `children`? | `ComponentChildren` | - |
| `editor` | [`Editor`](core.md#editore)\<`any`\> | - |

***

## ProseKit

```ts
const ProseKit: ComponentType<ProseKitProps>;
```

***

## useEditor()

```ts
useEditor<E>(): Editor<E>
```

### Type parameters

▪ **E** extends [`Extension`](core.md#extensiont)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\> = `any`

### Returns

[`Editor`](core.md#editore)\<`E`\>

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
