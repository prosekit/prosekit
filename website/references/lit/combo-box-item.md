# prosekit/lit/combo-box-item

## ComboBoxItem

### Extends

- `LightElement`

### Constructors

#### new ComboBoxItem(undefined)

```ts
new ComboBoxItem(): ComboBoxItem
```

##### Returns

[`ComboBoxItem`](combo-box-item.md#comboboxitem)

##### Inherited from

LightElement.constructor

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `comboBoxContext`? | `ComboBoxContext` | - |
| `editor`? | [`Editor`](../core.md#editore)\<`any`\> | - |
| `selected` | `boolean` | - |

### Methods

#### createRenderRoot()

```ts
createRenderRoot(): ComboBoxItem
```

##### Returns

[`ComboBoxItem`](combo-box-item.md#comboboxitem)

##### Inherited from

LightElement.createRenderRoot

#### setHidden()

```ts
setHidden(hidden): void
```

##### Parameters

▪ **hidden**: `boolean`

##### Returns

`void`

##### Inherited from

LightElement.setHidden

#### updated()

```ts
protected updated(): void
```

##### Returns

`void`

##### Overrides

LightElement.updated

***

## ComboBoxItemProps

```ts
type ComboBoxItemProps: object;
```

### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `onSelect` | `VoidFunction` | - |

***

## propNames

```ts
const propNames: never[] = [];
```

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
