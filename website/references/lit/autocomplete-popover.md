# prosekit/lit/autocomplete-popover

<a id="AutocompletePopover" name="AutocompletePopover"></a>

## AutocompletePopover

A custom element that displays a popover anchored to a reference element.

### Extends

- [`Popover`](popover.md#Popover)

### Implements

- [`Partial`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype )\<[`AutocompletePopoverProps`](autocomplete-popover.md#AutocompletePopoverProps)\>

### Properties

<a id="active" name="active"></a>

#### active

> **active**: `boolean` = `false`

Controls the visibility of the popover element. When set to `true`, the
popover is displayed and positioned relative to its reference element. When
set to `false`, the popover is hidden and its positioning logic is
deactivated.

##### Inherited from

[`prosekit/lit/popover.Popover.active`](popover.md#active)

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

##### Inherited from

[`prosekit/lit/popover.Popover.autoUpdate`](popover.md#autoUpdate)

<a id="autoUpdateOptions" name="autoUpdateOptions"></a>

#### autoUpdateOptions?

> **autoUpdateOptions**?: [`Partial`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype )\<`Object`\>

The options that are passed to the `autoUpdate` function from Floating UI.
These options are used to configure the automatic update behavior of the
popover position. For more information on the available options, please
refer to the Floating UI documentation. This property is only used when the
`autoUpdate` property is set to `true`.

##### Type declaration

##### Inherited from

[`prosekit/lit/popover.Popover.autoUpdateOptions`](popover.md#autoUpdateOptions)

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

##### Inherited from

[`prosekit/lit/popover.Popover.dismiss`](popover.md#dismiss)

<a id="editor" name="editor"></a>

#### editor?

> **editor**?: [`Editor`](../core.md#EditorE)\<`any`\>

##### Implementation of

`Partial.editor`

<a id="onSelect" name="onSelect"></a>

#### onSelect?

> **onSelect**?: `VoidFunction`

<a id="options" name="options"></a>

#### options?

> **options**?: `Object`

The options that are passed to the `computePosition` function from Floating
UI. These options are used to configure the positioning of the popover
element relative to its reference element. For more information on the
available options, please refer to the Floating UI documentation.

##### Inherited from

[`prosekit/lit/popover.Popover.options`](popover.md#options)

<a id="popoverOptions" name="popoverOptions"></a>

#### popoverOptions

> **popoverOptions**: `Object` = `defaultPopoverOptions`

##### Implementation of

`Partial.popoverOptions`

<a id="reference" name="reference"></a>

#### reference?

> **reference**?: [`Element`]( https://developer.mozilla.org/docs/Web/API/Element ) \| [`VirtualElement`]( https://floating-ui.com/docs/virtual-elements )

The element that the popover is anchored to. This can be either a DOM
element or an object that implements the virtual element interface from
Floating UI.

##### Inherited from

[`prosekit/lit/popover.Popover.reference`](popover.md#reference)

<a id="regex" name="regex"></a>

#### regex?

> **regex**?: [`RegExp`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp )

##### Implementation of

`Partial.regex`

### Methods

<a id="createRenderRoot" name="createRenderRoot"></a>

#### createRenderRoot()

> **createRenderRoot**(): [`AutocompletePopover`](autocomplete-popover.md#AutocompletePopover)

##### Returns

[`AutocompletePopover`](autocomplete-popover.md#AutocompletePopover)

##### Inherited from

[`prosekit/lit/popover.Popover.createRenderRoot`](popover.md#createRenderRoot)

<a id="setHidden" name="setHidden"></a>

#### setHidden()

> **setHidden**(`hidden`): `void`

##### Parameters

• **hidden**: `boolean`

##### Returns

`void`

##### Inherited from

[`prosekit/lit/popover.Popover.setHidden`](popover.md#setHidden)

***

<a id="AutocompletePopoverProps" name="AutocompletePopoverProps"></a>

## AutocompletePopoverProps

### Properties

<a id="editor-1" name="editor-1"></a>

#### editor

> **editor**: [`Editor`](../core.md#EditorE)\<`any`\>

<a id="popoverOptions-1" name="popoverOptions-1"></a>

#### popoverOptions?

> **popoverOptions**?: `Object`

<a id="regex-1" name="regex-1"></a>

#### regex

> **regex**: [`RegExp`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp )

***

<a id="PopoverOptions" name="PopoverOptions"></a>

## PopoverOptions

> **PopoverOptions**: [`ComputePositionConfig`]( https://floating-ui.com/docs/computeposition#options )

The `PopoverOptions` interface defines the options that can be passed to the
`computePosition` function from Floating UI. These options are used to
configure the positioning of the popover element relative to its reference
element. For more information on the available options, please refer to the
Floating UI documentation.

https://floating-ui.com/docs/computeposition#options

***

<a id="propNames" name="propNames"></a>

## propNames

> **`const`** **propNames**: readonly [`"editor"`, `"regex"`, `"popoverOptions"`]

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
