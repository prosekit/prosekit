# prosekit/lit/autocomplete-list

<a id="autocompletelist" name="autocompletelist"></a>

## AutocompleteList

### Extends

- `LightElement`

### Implements

- `Partial`\<[`AutocompleteListProps`](autocomplete-list.md#autocompletelistprops)\>

### Constructors

<a id="constructors" name="constructors"></a>

#### new AutocompleteList(undefined)

```ts
new AutocompleteList(): AutocompleteList
```

##### Returns

[`AutocompleteList`](autocomplete-list.md#autocompletelist)

##### Inherited from

LightElement.constructor

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `context` | `AutocompleteListContext` | - |
| `editor`? | [`Editor`](../core.md#editore)\<`any`\> | - |
| `popoverContext` | `null` \| `AutocompletePopoverContext` | - |

### Accessors

<a id="active" name="active"></a>

#### active

```ts
get private active(): boolean
```

##### Returns

`boolean`

<a id="items" name="items"></a>

#### items

```ts
get private items(): AutocompleteItem[]
```

##### Returns

[`AutocompleteItem`](autocomplete-item.md#autocompleteitem)[]

### Methods

<a id="connectedcallback" name="connectedcallback"></a>

#### connectedCallback()

```ts
connectedCallback(): void
```

##### Returns

`void`

##### Overrides

LightElement.connectedCallback

<a id="createrenderroot" name="createrenderroot"></a>

#### createRenderRoot()

```ts
createRenderRoot(): AutocompleteList
```

##### Returns

[`AutocompleteList`](autocomplete-list.md#autocompletelist)

##### Inherited from

LightElement.createRenderRoot

<a id="selectfirstitem" name="selectfirstitem"></a>

#### selectFirstItem()

```ts
selectFirstItem(): void
```

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

<a id="updatevalue" name="updatevalue"></a>

#### updateValue()

```ts
private updateValue(selectedValue): void
```

##### Parameters

▪ **selectedValue**: `string`

##### Returns

`void`

***

<a id="autocompletelistprops" name="autocompletelistprops"></a>

## AutocompleteListProps

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `editor` | [`Editor`](../core.md#editore)\<`any`\> | - |

***

<a id="propnames" name="propnames"></a>

## propNames

```ts
const propNames: readonly ["editor"];
```

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
