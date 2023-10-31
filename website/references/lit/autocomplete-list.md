# prosekit/lit/autocomplete-list

## AutocompleteList

### Extends

- `LightElement`

### Implements

- `Partial`\<[`AutocompleteListProps`](autocomplete-list.md#autocompletelistprops)\>

### Constructors

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

#### active

```ts
get private active(): boolean
```

##### Returns

`boolean`

#### items

```ts
get private items(): AutocompleteItem[]
```

##### Returns

[`AutocompleteItem`](autocomplete-item.md#autocompleteitem)[]

### Methods

#### connectedCallback()

```ts
connectedCallback(): void
```

##### Returns

`void`

##### Overrides

LightElement.connectedCallback

#### createRenderRoot()

```ts
createRenderRoot(): AutocompleteList
```

##### Returns

[`AutocompleteList`](autocomplete-list.md#autocompletelist)

##### Inherited from

LightElement.createRenderRoot

#### selectFirstItem()

```ts
selectFirstItem(): void
```

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

#### updateValue()

```ts
private updateValue(selectedValue): void
```

##### Parameters

▪ **selectedValue**: `string`

##### Returns

`void`

***

## AutocompleteListProps

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `editor` | [`Editor`](../core.md#editore)\<`any`\> | - |

***

## propNames

```ts
const propNames: readonly ["editor"];
```

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
