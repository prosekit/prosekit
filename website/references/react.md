# prosekit/react

<a id="prosekitprops" name="prosekitprops"></a>

## ProseKitProps

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `children`? | `ReactNode` | - |
| `editor` | [`Editor`](core.md#editore)\<`any`\> | - |

***

<a id="reactnodeviewoptions" name="reactnodeviewoptions"></a>

## ReactNodeViewOptions

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `component` | `ComponentType`\<`NodeViewContext`\> | - |
| `contentDOM`? | `string` \| () => [`HTMLElement`]( https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement ) | - |
| `dom`? | `string` \| () => [`HTMLElement`]( https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement ) | - |
| `name` | `string` | - |

***

<a id="useeditoroptions" name="useeditoroptions"></a>

## UseEditorOptions

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `update`? | `boolean` | - |

***

<a id="reactnodeviewcomponentprops" name="reactnodeviewcomponentprops"></a>

## ReactNodeViewComponentProps

```ts
type ReactNodeViewComponentProps: NodeViewContext;
```

***

<a id="prosekit" name="prosekit"></a>

## ProseKit

```ts
const ProseKit: ComponentType<ProseKitProps>;
```

***

<a id="definereactnodeview" name="definereactnodeview"></a>

## defineReactNodeView()

```ts
defineReactNodeView(options): Extension
```

### Parameters

▪ **options**: [`ReactNodeViewOptions`](react.md#reactnodeviewoptions)

### Returns

[`Extension`](core.md#extensiont)

***

<a id="useeditor" name="useeditor"></a>

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

<a id="useextension" name="useextension"></a>

## useExtension()

```ts
useExtension(__namedParameters): void
```

### Parameters

▪ **\_\_namedParameters**: `UseExtensionProps`\<[`Extension`](core.md#extensiont)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>\>

### Returns

`void`

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
