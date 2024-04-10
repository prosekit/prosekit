# prosekit/lit/autocomplete-popover

<a id="AutocompletePopover" name="AutocompletePopover"></a>

## ~~AutocompletePopover~~

A custom element that displays a popover anchored to a reference element.

### Deprecated

Use `prosekit-popover-root` instead.

### Extends

- [`Popover`](popover.md#Popover)

### Implements

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`AutocompletePopoverProps`](autocomplete-popover.md#AutocompletePopoverProps)\>

### Properties

<a id="editor" name="editor"></a>

#### ~~editor?~~

> **`optional`** **editor**: [`Editor`](../core.md#EditorE)\<`any`\>

##### Implementation of

`Partial.editor`

<a id="elevated" name="elevated"></a>

#### ~~elevated?~~

> **`optional`** **elevated**: `boolean` = `true`

##### Inherited from

[`Popover`](popover.md#Popover).[`elevated`](popover.md#elevated)

<a id="onOpenChange" name="onOpenChange"></a>

#### ~~onOpenChange()?~~

> **`optional`** **onOpenChange**: (`open`) => `void`

##### Parameters

• **open**: `boolean`

##### Returns

`void`

##### Inherited from

[`Popover`](popover.md#Popover).[`onOpenChange`](popover.md#onOpenChange)

<a id="open" name="open"></a>

#### ~~open?~~

> **`optional`** **open**: `boolean`

##### Inherited from

[`Popover`](popover.md#Popover).[`open`](popover.md#open)

<a id="positioning" name="positioning"></a>

#### ~~positioning?~~

> **`optional`** **positioning**: [`PositioningOptions`](autocomplete-popover.md#PositioningOptions)

##### Implementation of

`Partial.positioning`

##### Overrides

[`Popover`](popover.md#Popover).[`positioning`](popover.md#positioning)

<a id="reference" name="reference"></a>

#### ~~reference?~~

> **`optional`** **reference**: [`HTMLElement`]( https://developer.mozilla.org/docs/Web/API/HTMLElement ) \| [`VirtualElement`]( https://floating-ui.com/docs/virtual-elements )

##### Inherited from

[`Popover`](popover.md#Popover).[`reference`](popover.md#reference)

<a id="regex" name="regex"></a>

#### ~~regex?~~

> **`optional`** **regex**: [`RegExp`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp )

##### Implementation of

`Partial.regex`

***

<a id="AutocompletePopoverProps" name="AutocompletePopoverProps"></a>

## AutocompletePopoverProps

### Properties

<a id="editor-1" name="editor-1"></a>

#### editor

> **editor**: [`Editor`](../core.md#EditorE)\<`any`\>

<a id="positioning-1" name="positioning-1"></a>

#### positioning?

> **`optional`** **positioning**: [`PositioningOptions`](autocomplete-popover.md#PositioningOptions)

<a id="regex-1" name="regex-1"></a>

#### regex

> **regex**: [`RegExp`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp )

***

<a id="PositioningOptions" name="PositioningOptions"></a>

## PositioningOptions

### Properties

<a id="autoUpdate" name="autoUpdate"></a>

#### autoUpdate?

> **`optional`** **autoUpdate**: `boolean` \| [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`object`\>

Options to activate auto-update listeners

##### Default

```ts
true
```

<a id="boundary" name="boundary"></a>

#### boundary?

> **`optional`** **boundary**: `Boundary` \| () => `Boundary`

The overflow boundary of the reference element

##### Default

```ts
undefined
```

<a id="fitViewport" name="fitViewport"></a>

#### fitViewport?

> **`optional`** **fitViewport**: `boolean`

Whether the popover should fit the viewport.

##### Default

```ts
false
```

<a id="flip" name="flip"></a>

#### flip?

> **`optional`** **flip**: `boolean` \| `Placement`[]

Whether to flip the placement

##### Default

```ts
true
```

<a id="hide" name="hide"></a>

#### hide?

> **`optional`** **hide**: `boolean`

Whether to hide the floating element when the reference element is fully clipped.

##### Default

```ts
true
```

<a id="inline" name="inline"></a>

#### inline?

> **`optional`** **inline**: `boolean`

Whether to improve positioning for inline reference elements that span over
multiple lines.

##### Default

```ts
false
```

<a id="offset" name="offset"></a>

#### offset?

> **`optional`** **offset**: `number` \| `object`

The distance between the reference and floating element.

##### Default

```ts
8
```

<a id="onCleanup" name="onCleanup"></a>

#### onCleanup?

> **`optional`** **onCleanup**: `VoidFunction`

Function called on cleanup of all listeners

##### Default

```ts
undefined
```

<a id="onEscapeKeyDown" name="onEscapeKeyDown"></a>

#### onEscapeKeyDown()?

> **`optional`** **onEscapeKeyDown**: (`event`) => `void`

Function called when the escape key is down. By default, the popover is
hidden when the escape key is down. It can be prevented by calling
`event.preventDefault`.

##### Parameters

• **event**: [`KeyboardEvent`]( https://developer.mozilla.org/docs/Web/API/KeyboardEvent )

##### Returns

`void`

<a id="onPointerDownOutside" name="onPointerDownOutside"></a>

#### onPointerDownOutside()?

> **`optional`** **onPointerDownOutside**: (`event`) => `void`

Function called when when pointer down event happens outside of the
popover. By default, the popover is hidden when the pointer down event
happens outside of the popover. It can be prevented by calling
`event.preventDefault`.

##### Parameters

• **event**: [`Event`]( https://developer.mozilla.org/docs/Web/API/Event )

##### Returns

`void`

<a id="overflowPadding" name="overflowPadding"></a>

#### overflowPadding?

> **`optional`** **overflowPadding**: `number`

The virtual padding around the viewport edges to check for overflow

##### Default

```ts
8
```

<a id="overlap" name="overlap"></a>

#### overlap?

> **`optional`** **overlap**: `boolean`

Whether the floating element can overlap the reference element

##### Default

```ts
false
```

<a id="placement" name="placement"></a>

#### placement?

> **`optional`** **placement**: `Placement`

The initial placement of the floating element

##### Default

```ts
'bottom'
```

<a id="sameWidth" name="sameWidth"></a>

#### sameWidth?

> **`optional`** **sameWidth**: `boolean`

Whether to make the floating element same width as the reference element

##### Default

```ts
false
```

<a id="shift" name="shift"></a>

#### shift?

> **`optional`** **shift**: `boolean`

Whether the floating element should shift to keep it in view.

##### Default

```ts
true
```

<a id="strategy" name="strategy"></a>

#### strategy?

> **`optional`** **strategy**: `"fixed"` \| `"absolute"`

The strategy to use for positioning

##### Default

```ts
'absolute'
```

### Methods

<a id="onComplete" name="onComplete"></a>

#### onComplete()?

> **`optional`** **onComplete**(`data`): `void`

Function called when the placement is computed

##### Parameters

• **data**: `ComputePositionReturn`

##### Returns

`void`

##### Default

```ts
undefined
```

***

<a id="propNames" name="propNames"></a>

## propNames

> **`const`** **propNames**: readonly [`"editor"`, `"regex"`, `"positioning"`]
