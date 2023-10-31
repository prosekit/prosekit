# prosekit/lit/combo-box-input

<a id="comboboxinput" name="comboboxinput"></a>

## ComboBoxInput

### Extends

- `LightElement`

### Constructors

<a id="constructors" name="constructors"></a>

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

<a id="createrenderroot" name="createrenderroot"></a>

#### createRenderRoot()

```ts
createRenderRoot(): ComboBoxInput
```

##### Returns

[`ComboBoxInput`](combo-box-input.md#comboboxinput)

##### Inherited from

LightElement.createRenderRoot

<a id="firstupdated" name="firstupdated"></a>

#### firstUpdated()

```ts
protected firstUpdated(): void
```

##### Returns

`void`

##### Overrides

LightElement.firstUpdated

<a id="handleinput" name="handleinput"></a>

#### handleInput()

```ts
private handleInput(event): void
```

##### Parameters

▪ **event**: [`InputEvent`]( https://developer.mozilla.org/en-US/docs/Web/API/InputEvent )

##### Returns

`void`

<a id="handlekeydown" name="handlekeydown"></a>

#### handleKeydown()

```ts
private handleKeydown(event): void
```

##### Parameters

▪ **event**: [`KeyboardEvent`]( https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent )

##### Returns

`void`

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

***

<a id="comboboxinputprops" name="comboboxinputprops"></a>

## ComboBoxInputProps

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `placeholder`? | `string` | - |

***

<a id="propnames" name="propnames"></a>

## propNames

```ts
const propNames: readonly ["placeholder"];
```

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
