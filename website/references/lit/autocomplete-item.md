# prosekit/lit/autocomplete-item

<a id="AutocompleteItem" name="AutocompleteItem"></a>

## AutocompleteItem

Command menu item. Becomes active on pointer enter or through keyboard
navigation. Preferably pass a `value`, otherwise the value will be inferred
from the rendered item's `textContent`.

### Extends

- `LightElement`

### Implements

- [`Partial`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype )\<[`AutocompleteItemProps`](autocomplete-item.md#AutocompleteItemProps)\>

### Properties

<a id="onSelect" name="onSelect"></a>

#### onSelect?

> **onSelect**?: `VoidFunction`

##### Implementation of

`Partial.onSelect`

<a id="selected" name="selected"></a>

#### selected

> **selected**: `boolean` = `false`

<a id="value" name="value"></a>

#### value

> **value**: `string` = `''`

##### Implementation of

`Partial.value`

### Accessors

<a id="content" name="content"></a>

#### content

> **`get`** **content**(): `string`

##### Returns

`string`

### Methods

<a id="connectedCallback" name="connectedCallback"></a>

#### connectedCallback()

> **connectedCallback**(): `void`

##### Returns

`void`

##### Overrides

`LightElement.connectedCallback`

<a id="createRenderRoot" name="createRenderRoot"></a>

#### createRenderRoot()

> **createRenderRoot**(): [`AutocompleteItem`](autocomplete-item.md#AutocompleteItem)

##### Returns

[`AutocompleteItem`](autocomplete-item.md#AutocompleteItem)

##### Inherited from

`LightElement.createRenderRoot`

<a id="setHidden" name="setHidden"></a>

#### setHidden()

> **setHidden**(`hidden`): `void`

##### Parameters

• **hidden**: `boolean`

##### Returns

`void`

##### Inherited from

`LightElement.setHidden`

<a id="updated" name="updated"></a>

#### updated()

> **`protected`** **updated**(`changedProperties`): `void`

##### Parameters

• **changedProperties**: `PropertyValueMap`\<[`AutocompleteItem`](autocomplete-item.md#AutocompleteItem)\>

##### Returns

`void`

##### Overrides

`LightElement.updated`

<a id="willUpdate" name="willUpdate"></a>

#### willUpdate()

> **`protected`** **willUpdate**(): `void`

##### Returns

`void`

##### Overrides

`LightElement.willUpdate`

***

<a id="AutocompleteItemProps" name="AutocompleteItemProps"></a>

## AutocompleteItemProps

### Properties

<a id="onSelect-1" name="onSelect-1"></a>

#### onSelect

> **onSelect**: `VoidFunction`

<a id="value-1" name="value-1"></a>

#### value?

> **value**?: `string`

***

<a id="propNames" name="propNames"></a>

## propNames

> **`const`** **propNames**: readonly [`"value"`, `"onSelect"`]

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
