# prosekit/lit/combo-box-input

## ComboBoxInput

### Extends

- `LightElement`

### Constructors

#### new ComboBoxInput(undefined)

```ts
new ComboBoxInput(): ComboBoxInput
```

##### Returns

[`ComboBoxInput`](combo-box-input.md#comboboxinput)

##### Inherited from

LightElement.constructor

### Properties

| Modifier | Property | Type | Description |
| :------ | :------ | :------ | :------ |
| `public` | `comboBoxContext` | `null` \| `ComboBoxContext` | - |
| `public` | `placeholder` | `string` | - |
| `private` | `visible` | `boolean` | - |

### Methods

#### createRenderRoot()

```ts
createRenderRoot(): ComboBoxInput
```

##### Returns

[`ComboBoxInput`](combo-box-input.md#comboboxinput)

##### Inherited from

LightElement.createRenderRoot

#### firstUpdated()

```ts
protected firstUpdated(): void
```

##### Returns

`void`

##### Overrides

LightElement.firstUpdated

#### handleInput()

```ts
private handleInput(event): void
```

##### Parameters

▪ **event**: [`InputEvent`]( https://developer.mozilla.org/en-US/docs/Web/API/InputEvent )

##### Returns

`void`

#### handleKeydown()

```ts
private handleKeydown(event): void
```

##### Parameters

▪ **event**: [`KeyboardEvent`]( https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent )

##### Returns

`void`

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

***

## ComboBoxInputProps

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `placeholder`? | `string` | - |

***

## propNames

```ts
const propNames: readonly ["placeholder"];
```

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
