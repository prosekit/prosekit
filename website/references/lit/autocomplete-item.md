# prosekit/lit/autocomplete-item

<a id="autocompleteitem" name="autocompleteitem"></a>

## AutocompleteItem

Command menu item. Becomes active on pointer enter or through keyboard
navigation. Preferably pass a `value`, otherwise the value will be inferred
from the rendered item's `textContent`.

### Extends

- `LightElement`

### Implements

- `Partial`\<[`AutocompleteItemProps`](autocomplete-item.md#autocompleteitemprops)\>

### Constructors

<a id="constructors" name="constructors"></a>

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

<a id="content" name="content"></a>

#### content

```ts
get content(): string
```

##### Returns

`string`

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
createRenderRoot(): AutocompleteItem
```

##### Returns

[`AutocompleteItem`](autocomplete-item.md#autocompleteitem)

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
protected updated(changedProperties): void
```

##### Parameters

▪ **changedProperties**: `PropertyValueMap`\<[`AutocompleteItem`](autocomplete-item.md#autocompleteitem)\>

##### Returns

`void`

##### Overrides

LightElement.updated

<a id="willupdate" name="willupdate"></a>

#### willUpdate()

```ts
protected willUpdate(): void
```

##### Returns

`void`

##### Overrides

LightElement.willUpdate

***

<a id="autocompleteitemprops" name="autocompleteitemprops"></a>

## AutocompleteItemProps

### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `onSelect` | `VoidFunction` | - |
| `value`? | `string` | - |

***

<a id="propnames" name="propnames"></a>

## propNames

```ts
const propNames: readonly ["value", "onSelect"];
```

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
