# prosekit/lit/popover

<a id="PositioningOptions" name="PositioningOptions"></a>

## PositioningOptions

Re-exports [PositioningOptions](autocomplete-popover.md#PositioningOptions)

<a id="propNames" name="propNames"></a>

## propNames

Renames and re-exports [popoverPropsNames](popover.md#popoverPropsNames)

<a id="Popover" name="Popover"></a>

## ~~Popover~~

A custom element that displays a popover anchored to a reference element.

### Deprecated

Use `prosekit-popover-root` instead.

### Extends

- `LightElement`

### Implements

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`PopoverProps`](popover.md#PopoverProps)\>

### Properties

<a id="elevated" name="elevated"></a>

#### ~~elevated?~~

> **`optional`** **elevated**: `boolean` = `true`

##### Implementation of

`Partial.elevated`

<a id="onOpenChange" name="onOpenChange"></a>

#### ~~onOpenChange()?~~

> **`optional`** **onOpenChange**: (`open`) => `void`

##### Parameters

• **open**: `boolean`

##### Returns

`void`

##### Implementation of

`Partial.onOpenChange`

<a id="open" name="open"></a>

#### ~~open?~~

> **`optional`** **open**: `boolean`

##### Implementation of

`Partial.open`

<a id="positioning" name="positioning"></a>

#### ~~positioning?~~

> **`optional`** **positioning**: [`PositioningOptions`](autocomplete-popover.md#PositioningOptions)

##### Implementation of

`Partial.positioning`

<a id="reference" name="reference"></a>

#### ~~reference?~~

> **`optional`** **reference**: [`HTMLElement`]( https://developer.mozilla.org/docs/Web/API/HTMLElement ) \| [`VirtualElement`]( https://floating-ui.com/docs/virtual-elements )

##### Implementation of

`Partial.reference`

***

<a id="PopoverProps" name="PopoverProps"></a>

## PopoverProps

### Properties

<a id="elevated-1" name="elevated-1"></a>

#### elevated?

> **`optional`** **elevated**: `boolean`

A boolean that determines if the native [Web Popover
API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) should
be used. If true, the popover will be placed into the top level so that it
will sit on top of all other page content. This is similar to React's
`<Portals>` or Vue's `<Teleport>`.

<a id="onOpenChange-1" name="onOpenChange-1"></a>

#### onOpenChange()?

> **`optional`** **onOpenChange**: (`open`) => `void`

Function invoked when the popover opens or closes.

##### Parameters

• **open**: `boolean`

##### Returns

`void`

<a id="open-1" name="open-1"></a>

#### open?

> **`optional`** **open**: `boolean`

Whether the popover is open.

<a id="positioning-1" name="positioning-1"></a>

#### positioning?

> **`optional`** **positioning**: [`PositioningOptions`](autocomplete-popover.md#PositioningOptions)

The user provided options used to position the popover content.

<a id="reference-1" name="reference-1"></a>

#### reference?

> **`optional`** **reference**: [`Element`]( https://developer.mozilla.org/docs/Web/API/Element ) \| [`VirtualElement`]( https://floating-ui.com/docs/virtual-elements )

The element that the popover is anchored to. This can be either a DOM
element or an object that implements the virtual element interface from
Floating UI.

***

<a id="popoverPropsNames" name="popoverPropsNames"></a>

## popoverPropsNames

> **`const`** **popoverPropsNames**: readonly [`"open"`, `"onOpenChange"`, `"reference"`, `"positioning"`]
