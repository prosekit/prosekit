# prosekit/lit/combo-box-item

<a id="comboboxitem" name="comboboxitem"></a>

## ComboBoxItem

### Extends

- `LightElement`

### Constructors

<a id="constructors" name="constructors"></a>

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

<a id="createrenderroot" name="createrenderroot"></a>

#### createRenderRoot()

```ts
createRenderRoot(): ComboBoxItem
```

##### Returns

[`ComboBoxItem`](combo-box-item.md#comboboxitem)

##### Inherited from

LightElement.createRenderRoot

<a id="sethidden" name="sethidden"></a>

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

<a id="updated" name="updated"></a>

#### updated()

```ts
protected updated(): void
```

##### Returns

`void`

##### Overrides

LightElement.updated

***

<a id="comboboxitemprops" name="comboboxitemprops"></a>

## ComboBoxItemProps

```ts
type ComboBoxItemProps: object;
```

### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `onSelect` | `VoidFunction` | - |

***

<a id="propnames" name="propnames"></a>

## propNames

```ts
const propNames: never[] = [];
```

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
