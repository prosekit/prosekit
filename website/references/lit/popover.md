# prosekit/lit/popover

<a id="PopoverOptions" name="PopoverOptions"></a>

## PopoverOptions

Re-exports [PopoverOptions](autocomplete-popover.md#PopoverOptions)

<a id="Popover" name="Popover"></a>

## Popover

A custom element that displays a popover anchored to a reference element.

### Extends

- `LightElement`

### Implements

- [`Partial`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype )\<[`PopoverProps`](popover.md#PopoverProps)\>

### Properties

<a id="active" name="active"></a>

#### active

> **active**: `boolean` = `false`

Controls the visibility of the popover element. When set to `true`, the
popover is displayed and positioned relative to its reference element. When
set to `false`, the popover is hidden and its positioning logic is
deactivated.

##### Implementation of

`Partial.active`

<a id="autoUpdate" name="autoUpdate"></a>

#### autoUpdate

> **autoUpdate**: `boolean` = `false`

Controls whether the popover position is automatically updated when the
reference element changes position. When set to `true`, the popover
position is updated automatically. When set to `false`, the popover
position is only updated when the given properties are changed.

##### Default

```ts
false
```

##### Implementation of

`Partial.autoUpdate`

<a id="autoUpdateOptions" name="autoUpdateOptions"></a>

#### autoUpdateOptions?

> **autoUpdateOptions**?: [`Partial`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype )\<`Object`\>

The options that are passed to the `autoUpdate` function from Floating UI.
These options are used to configure the automatic update behavior of the
popover position. For more information on the available options, please
refer to the Floating UI documentation. This property is only used when the
`autoUpdate` property is set to `true`.

##### Type declaration

##### Implementation of

`Partial.autoUpdateOptions`

<a id="dismiss" name="dismiss"></a>

#### dismiss

> **dismiss**: `"click"` \| `"off"` \| `"on"` \| `"escape"` = `'on'`

Controls whether the popover should be dismissed based on user interaction.

Available options:

- "off": The popover is not dismissed.
- "on": The popover is dismissed when the user clicks outside of the popover or presses the escape key.
- "click": The popover is dismissed when the user clicks outside of the popover.
- "escape": The popover is dismissed when the user presses the escape key.

##### Default

```ts
"on"
```

<a id="options" name="options"></a>

#### options?

> **options**?: `Object`

The options that are passed to the `computePosition` function from Floating
UI. These options are used to configure the positioning of the popover
element relative to its reference element. For more information on the
available options, please refer to the Floating UI documentation.

##### Implementation of

`Partial.options`

<a id="reference" name="reference"></a>

#### reference?

> **reference**?: [`Element`]( https://developer.mozilla.org/docs/Web/API/Element ) \| [`VirtualElement`]( https://floating-ui.com/docs/virtual-elements )

The element that the popover is anchored to. This can be either a DOM
element or an object that implements the virtual element interface from
Floating UI.

##### Implementation of

`Partial.reference`

### Methods

<a id="createRenderRoot" name="createRenderRoot"></a>

#### createRenderRoot()

> **createRenderRoot**(): [`Popover`](popover.md#Popover)

##### Returns

[`Popover`](popover.md#Popover)

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

***

<a id="PopoverProps" name="PopoverProps"></a>

## PopoverProps

### Properties

<a id="active-1" name="active-1"></a>

#### active

> **active**: `boolean`

<a id="autoUpdate-1" name="autoUpdate-1"></a>

#### autoUpdate?

> **autoUpdate**?: `boolean`

<a id="autoUpdateOptions-1" name="autoUpdateOptions-1"></a>

#### autoUpdateOptions?

> **autoUpdateOptions**?: [`Partial`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype )\<`Object`\>

##### Type declaration

<a id="options-1" name="options-1"></a>

#### options?

> **options**?: `Object`

<a id="reference-1" name="reference-1"></a>

#### reference?

> **reference**?: [`Element`]( https://developer.mozilla.org/docs/Web/API/Element ) \| [`VirtualElement`]( https://floating-ui.com/docs/virtual-elements )

***

<a id="propNames" name="propNames"></a>

## propNames

> **`const`** **propNames**: readonly [`"active"`, `"reference"`, `"options"`, `"autoUpdate"`, `"autoUpdateOptions"`]

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
