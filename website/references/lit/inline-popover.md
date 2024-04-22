# prosekit/lit/inline-popover

<a id="InlinePopover" name="InlinePopover"></a>

## InlinePopover

### Extends

- `BaseElement`.[`InlinePopoverProps`](../web/inline-popover.md#InlinePopoverProps)

### Implements

- [`InlinePopoverProps`](../web/inline-popover.md#InlinePopoverProps)

### Constructors

<a id="Constructors" name="Constructors"></a>

#### new InlinePopover(undefined)

> **new InlinePopover**(): [`InlinePopover`](inline-popover.md#InlinePopover)

##### Returns

[`InlinePopover`](inline-popover.md#InlinePopover)

##### Overrides

`BaseElement.constructor`

### Properties

<a id="_s" name="_s"></a>

#### \_s

> **`readonly`** **\_s**: `SignalState`\<[`InlinePopoverProps`](../web/inline-popover.md#InlinePopoverProps)\>

<a id="editor" name="editor"></a>

#### editor

> **editor**: `null` \| [`Editor`](../core.md#EditorE)\<`any`\>

The ProseKit editor instance.

##### Default

```ts
null
```

##### Implementation of

[`InlinePopoverProps`](../web/inline-popover.md#InlinePopoverProps).[`editor`](../web/inline-popover.md#editor)

##### Inherited from

[`InlinePopoverProps`](../web/inline-popover.md#InlinePopoverProps).[`editor`](../web/inline-popover.md#editor)

<a id="flip" name="flip"></a>

#### flip

> **flip**: `boolean` \| `Placement`[]

##### Default

```ts
true
```

##### Implementation of

[`InlinePopoverProps`](../web/inline-popover.md#InlinePopoverProps).[`flip`](../web/inline-popover.md#flip)

##### Inherited from

[`InlinePopoverProps`](../web/inline-popover.md#InlinePopoverProps).[`flip`](../web/inline-popover.md#flip)

<a id="hide" name="hide"></a>

#### hide

> **hide**: `boolean`

##### Default

```ts
true
```

##### Implementation of

[`InlinePopoverProps`](../web/inline-popover.md#InlinePopoverProps).[`hide`](../web/inline-popover.md#hide)

##### Inherited from

[`InlinePopoverProps`](../web/inline-popover.md#InlinePopoverProps).[`hide`](../web/inline-popover.md#hide)

<a id="hoist" name="hoist"></a>

#### hoist

> **hoist**: `boolean`

##### Default

```ts
true
```

##### Implementation of

[`InlinePopoverProps`](../web/inline-popover.md#InlinePopoverProps).[`hoist`](../web/inline-popover.md#hoist)

##### Inherited from

[`InlinePopoverProps`](../web/inline-popover.md#InlinePopoverProps).[`hoist`](../web/inline-popover.md#hoist)

<a id="inline" name="inline"></a>

#### inline

> **inline**: `boolean`

##### Default

```ts
true
```

##### Implementation of

[`InlinePopoverProps`](../web/inline-popover.md#InlinePopoverProps).[`inline`](../web/inline-popover.md#inline)

##### Inherited from

[`InlinePopoverProps`](../web/inline-popover.md#InlinePopoverProps).[`inline`](../web/inline-popover.md#inline)

<a id="offset" name="offset"></a>

#### offset

> **offset**: `null` \| `OffsetOptions`

##### Default

```ts
12
```

##### Implementation of

[`InlinePopoverProps`](../web/inline-popover.md#InlinePopoverProps).[`offset`](../web/inline-popover.md#offset)

##### Inherited from

[`InlinePopoverProps`](../web/inline-popover.md#InlinePopoverProps).[`offset`](../web/inline-popover.md#offset)

<a id="onOpenChange" name="onOpenChange"></a>

#### onOpenChange

> **onOpenChange**: `null` \| (`open`) => `void`

A callback that is called when the popover's open state changes.

##### Default

```ts
null
```

##### Implementation of

[`InlinePopoverProps`](../web/inline-popover.md#InlinePopoverProps).[`onOpenChange`](../web/inline-popover.md#onOpenChange)

##### Inherited from

[`InlinePopoverProps`](../web/inline-popover.md#InlinePopoverProps).[`onOpenChange`](../web/inline-popover.md#onOpenChange)

<a id="open" name="open"></a>

#### open

> **open**: `boolean`

Whether the popover is open.

Notice that the popover will be always hidden if the inline selection is empty.

##### Default

`true`

##### Implementation of

[`InlinePopoverProps`](../web/inline-popover.md#InlinePopoverProps).[`open`](../web/inline-popover.md#open)

##### Inherited from

[`InlinePopoverProps`](../web/inline-popover.md#InlinePopoverProps).[`open`](../web/inline-popover.md#open)

<a id="overlap" name="overlap"></a>

#### overlap

> **overlap**: `boolean`

##### Default

```ts
true
```

##### Implementation of

[`InlinePopoverProps`](../web/inline-popover.md#InlinePopoverProps).[`overlap`](../web/inline-popover.md#overlap)

##### Inherited from

[`InlinePopoverProps`](../web/inline-popover.md#InlinePopoverProps).[`overlap`](../web/inline-popover.md#overlap)

<a id="placement" name="placement"></a>

#### placement

> **placement**: `Placement`

The placement of the popover, relative to the selected inline content.

##### Default

```ts
"top"
```

##### Implementation of

[`InlinePopoverProps`](../web/inline-popover.md#InlinePopoverProps).[`placement`](../web/inline-popover.md#placement)

##### Inherited from

[`InlinePopoverProps`](../web/inline-popover.md#InlinePopoverProps).[`placement`](../web/inline-popover.md#placement)
