# prosekit/lit/inline-popover

<a id="PositioningOptions" name="PositioningOptions"></a>

## PositioningOptions

Re-exports [PositioningOptions](autocomplete-popover.md#PositioningOptions)

<a id="InlinePopover" name="InlinePopover"></a>

## ~~InlinePopover~~

A custom element that displays a popover anchored to a reference element.

### Deprecated

Use `prosekit-popover-root` instead.

### Extends

- [`Popover`](popover.md#Popover)

### Implements

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`InlinePopoverProps`](inline-popover.md#InlinePopoverProps)\>

### Properties

<a id="available" name="available"></a>

#### ~~available?~~

> **`optional`** **available**: `boolean` = `true`

##### Implementation of

`Partial.available`

<a id="editor" name="editor"></a>

#### ~~editor?~~

> **`optional`** **editor**: [`Editor`](../core.md#EditorE)\<`any`\>

##### Implementation of

`Partial.editor`

<a id="elevated" name="elevated"></a>

#### ~~elevated?~~

> **`optional`** **elevated**: `boolean` = `true`

##### Implementation of

`Partial.elevated`

##### Inherited from

[`Popover`](popover.md#Popover).[`elevated`](popover.md#elevated)

<a id="onOpenChange" name="onOpenChange"></a>

#### ~~onOpenChange()?~~

> **`optional`** **onOpenChange**: (`open`) => `void`

##### Parameters

• **open**: `boolean`

##### Returns

`void`

##### Implementation of

`Partial.onOpenChange`

##### Inherited from

[`Popover`](popover.md#Popover).[`onOpenChange`](popover.md#onOpenChange)

<a id="open" name="open"></a>

#### ~~open?~~

> **`optional`** **open**: `boolean`

##### Implementation of

`Partial.open`

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

##### Implementation of

`Partial.reference`

##### Inherited from

[`Popover`](popover.md#Popover).[`reference`](popover.md#reference)

***

<a id="InlinePopoverProps" name="InlinePopoverProps"></a>

## InlinePopoverProps

> **InlinePopoverProps**: `object` & [`PopoverProps`](popover.md#PopoverProps)

### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `available` | `boolean` | Whether the popover is available to be shown.<br /><br />If `true`, the popover will be shown when the editor selection is not empty.<br />If `false`, the popover will always be hidden.<br /><br />**Default**<br />`true` |
| `editor` | [`Editor`](../core.md#EditorE) | - |

***

<a id="propNames" name="propNames"></a>

## propNames

> **`const`** **propNames**: readonly [`"editor"`, `"available"`, `"open"`, `"onOpenChange"`, `"reference"`, `"positioning"`]
