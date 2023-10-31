# prosekit/react

## ProseKitProps

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `children`? | `ReactNode` | - |
| `editor` | [`Editor`](core.md#editore)\<`any`\> | - |

***

## ReactNodeViewOptions

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `component` | `ComponentType`\<`NodeViewContext`\> | - |
| `contentDOM`? | `string` \| () => [`HTMLElement`]( https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement ) | - |
| `dom`? | `string` \| () => [`HTMLElement`]( https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement ) | - |
| `name` | `string` | - |

***

## UseEditorOptions

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `update`? | `boolean` | - |

***

## ReactNodeViewComponentProps

```ts
type ReactNodeViewComponentProps: NodeViewContext;
```

***

## ProseKit

```ts
const ProseKit: ComponentType<ProseKitProps>;
```

***

## defineReactNodeView()

```ts
defineReactNodeView(options): Extension
```

### Parameters

▪ **options**: [`ReactNodeViewOptions`](react.md#reactnodeviewoptions)

### Returns

[`Extension`](core.md#extensiont)

***

## useEditor()

```ts
useEditor<E>(options?): Editor<E>
```

### Type parameters

▪ **E** extends [`Extension`](core.md#extensiont)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\> = `any`

### Parameters

▪ **options?**: [`UseEditorOptions`](react.md#useeditoroptions)

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
