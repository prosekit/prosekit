# prosekit/lit/autocomplete-item

## AutocompleteItem

Command menu item. Becomes active on pointer enter or through keyboard
navigation. Preferably pass a `value`, otherwise the value will be inferred
from the rendered item's `textContent`.

### Extends

- `LightElement`

### Implements

- `Partial`\<[`AutocompleteItemProps`](autocomplete-item.md#autocompleteitemprops)\>

### Constructors

#### new AutocompleteItem(undefined)

```ts
new AutocompleteItem(): AutocompleteItem
```

##### Returns

[`AutocompleteItem`](autocomplete-item.md#autocompleteitem)

##### Inherited from

LightElement.constructor

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `listContext`? | `AutocompleteListContext` | - |
| `selected` | `boolean` | - |
| `value` | `string` | - |

### Accessors

#### content

```ts
get content(): string
```

##### Returns

`string`

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
createRenderRoot(): AutocompleteItem
```

##### Returns

[`AutocompleteItem`](autocomplete-item.md#autocompleteitem)

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
protected updated(changedProperties): void
```

##### Parameters

▪ **changedProperties**: `PropertyValueMap`\<[`AutocompleteItem`](autocomplete-item.md#autocompleteitem)\>

##### Returns

`void`

##### Overrides

LightElement.updated

#### willUpdate()

```ts
protected willUpdate(): void
```

##### Returns

`void`

##### Overrides

LightElement.willUpdate

***

## AutocompleteItemProps

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `onSelect` | `VoidFunction` | - |
| `value`? | `string` | - |

***

## propNames

```ts
const propNames: readonly ["value", "onSelect"];
```

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
