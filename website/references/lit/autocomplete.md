# prosekit/lit/autocomplete

<a id="AutocompleteEmpty" name="AutocompleteEmpty"></a>

## AutocompleteEmpty

### Extends

- `BaseElement`.[`AutocompleteEmptyProps`](../web/autocomplete.md#AutocompleteEmptyProps)

### Implements

- [`AutocompleteEmptyProps`](../web/autocomplete.md#AutocompleteEmptyProps)

### Constructors

<a id="Constructors" name="Constructors"></a>

#### new AutocompleteEmpty(undefined)

> **new AutocompleteEmpty**(): [`AutocompleteEmpty`](autocomplete.md#AutocompleteEmpty)

##### Returns

[`AutocompleteEmpty`](autocomplete.md#AutocompleteEmpty)

##### Overrides

`BaseElement.constructor`

### Properties

<a id="_s" name="_s"></a>

#### \_s

> **`readonly`** **\_s**: `SignalState`\<[`AutocompleteEmptyProps`](../web/autocomplete.md#AutocompleteEmptyProps)\>

***

<a id="AutocompleteItem" name="AutocompleteItem"></a>

## AutocompleteItem

### Extends

- `BaseElement`.[`AutocompleteItemProps`](../web/autocomplete.md#AutocompleteItemProps)

### Implements

- [`AutocompleteItemProps`](../web/autocomplete.md#AutocompleteItemProps)

### Constructors

<a id="Constructors-1" name="Constructors-1"></a>

#### new AutocompleteItem(undefined)

> **new AutocompleteItem**(): [`AutocompleteItem`](autocomplete.md#AutocompleteItem)

##### Returns

[`AutocompleteItem`](autocomplete.md#AutocompleteItem)

##### Overrides

`BaseElement.constructor`

### Properties

<a id="_s-1" name="_s-1"></a>

#### \_s

> **`readonly`** **\_s**: `SignalState`\<[`AutocompleteItemProps`](../web/autocomplete.md#AutocompleteItemProps)\>

<a id="onSelect" name="onSelect"></a>

#### onSelect

> **onSelect**: `null` \| `VoidFunction`

The function to call when the item is selected.

##### Default

```ts
null
```

##### Implementation of

[`AutocompleteItemProps`](../web/autocomplete.md#AutocompleteItemProps).[`onSelect`](../web/autocomplete.md#onSelect)

##### Inherited from

[`AutocompleteItemProps`](../web/autocomplete.md#AutocompleteItemProps).[`onSelect`](../web/autocomplete.md#onSelect)

<a id="value" name="value"></a>

#### value

> **value**: `string`

The value of the item, which will be matched against the query.

If not provided, the value is the item's text content.

##### Default

```ts
""
```

##### Implementation of

[`AutocompleteItemProps`](../web/autocomplete.md#AutocompleteItemProps).[`value`](../web/autocomplete.md#value)

##### Inherited from

[`AutocompleteItemProps`](../web/autocomplete.md#AutocompleteItemProps).[`value`](../web/autocomplete.md#value)

***

<a id="AutocompleteList" name="AutocompleteList"></a>

## AutocompleteList

### Extends

- `BaseElement`.[`AutocompleteListProps`](../web/autocomplete.md#AutocompleteListProps)

### Implements

- [`AutocompleteListProps`](../web/autocomplete.md#AutocompleteListProps)

### Constructors

<a id="Constructors-2" name="Constructors-2"></a>

#### new AutocompleteList(undefined)

> **new AutocompleteList**(): [`AutocompleteList`](autocomplete.md#AutocompleteList)

##### Returns

[`AutocompleteList`](autocomplete.md#AutocompleteList)

##### Overrides

`BaseElement.constructor`

### Properties

<a id="_s-2" name="_s-2"></a>

#### \_s

> **`readonly`** **\_s**: `SignalState`\<[`AutocompleteListProps`](../web/autocomplete.md#AutocompleteListProps)\>

<a id="editor" name="editor"></a>

#### editor

> **editor**: `null` \| [`Editor`](../core.md#EditorE)\<`any`\>

##### Implementation of

[`AutocompleteListProps`](../web/autocomplete.md#AutocompleteListProps).[`editor`](../web/autocomplete.md#editor)

##### Inherited from

[`AutocompleteListProps`](../web/autocomplete.md#AutocompleteListProps).[`editor`](../web/autocomplete.md#editor)

***

<a id="AutocompletePopover" name="AutocompletePopover"></a>

## AutocompletePopover

### Extends

- `BaseElement`.[`AutocompletePopoverProps`](../web/autocomplete.md#AutocompletePopoverProps)

### Implements

- [`AutocompletePopoverProps`](../web/autocomplete.md#AutocompletePopoverProps)

### Constructors

<a id="Constructors-3" name="Constructors-3"></a>

#### new AutocompletePopover(undefined)

> **new AutocompletePopover**(): [`AutocompletePopover`](autocomplete.md#AutocompletePopover)

##### Returns

[`AutocompletePopover`](autocomplete.md#AutocompletePopover)

##### Overrides

`BaseElement.constructor`

### Properties

<a id="_s-3" name="_s-3"></a>

#### \_s

> **`readonly`** **\_s**: `SignalState`\<[`AutocompletePopoverProps`](../web/autocomplete.md#AutocompletePopoverProps)\>

<a id="boundary" name="boundary"></a>

#### boundary

> **boundary**: `Boundary`

##### Default

```ts
"The body element"
```

##### Implementation of

[`AutocompletePopoverProps`](../web/autocomplete.md#AutocompletePopoverProps).[`boundary`](../web/autocomplete.md#boundary)

##### Inherited from

[`AutocompletePopoverProps`](../web/autocomplete.md#AutocompletePopoverProps).[`boundary`](../web/autocomplete.md#boundary)

<a id="editor-1" name="editor-1"></a>

#### editor

> **editor**: `null` \| [`Editor`](../core.md#EditorE)\<`any`\>

The ProseKit editor instance.

##### Default

```ts
null
```

##### Implementation of

[`AutocompletePopoverProps`](../web/autocomplete.md#AutocompletePopoverProps).[`editor`](../web/autocomplete.md#editor-1)

##### Inherited from

[`AutocompletePopoverProps`](../web/autocomplete.md#AutocompletePopoverProps).[`editor`](../web/autocomplete.md#editor-1)

<a id="fitViewport" name="fitViewport"></a>

#### fitViewport

> **fitViewport**: `boolean`

##### Default

```ts
true
```

##### Implementation of

[`AutocompletePopoverProps`](../web/autocomplete.md#AutocompletePopoverProps).[`fitViewport`](../web/autocomplete.md#fitViewport)

##### Inherited from

[`AutocompletePopoverProps`](../web/autocomplete.md#AutocompletePopoverProps).[`fitViewport`](../web/autocomplete.md#fitViewport)

<a id="hoist" name="hoist"></a>

#### hoist

> **hoist**: `boolean`

##### Default

```ts
true
```

##### Implementation of

[`AutocompletePopoverProps`](../web/autocomplete.md#AutocompletePopoverProps).[`hoist`](../web/autocomplete.md#hoist)

##### Inherited from

[`AutocompletePopoverProps`](../web/autocomplete.md#AutocompletePopoverProps).[`hoist`](../web/autocomplete.md#hoist)

<a id="inline" name="inline"></a>

#### inline

> **inline**: `boolean`

##### Default

```ts
true
```

##### Implementation of

[`AutocompletePopoverProps`](../web/autocomplete.md#AutocompletePopoverProps).[`inline`](../web/autocomplete.md#inline)

##### Inherited from

[`AutocompletePopoverProps`](../web/autocomplete.md#AutocompletePopoverProps).[`inline`](../web/autocomplete.md#inline)

<a id="offset" name="offset"></a>

#### offset

> **offset**: `null` \| `OffsetOptions`

The distance between the popover and the hovered block.

##### Default

```ts
4
```

##### Implementation of

[`AutocompletePopoverProps`](../web/autocomplete.md#AutocompletePopoverProps).[`offset`](../web/autocomplete.md#offset)

##### Inherited from

[`AutocompletePopoverProps`](../web/autocomplete.md#AutocompletePopoverProps).[`offset`](../web/autocomplete.md#offset)

<a id="onOpenChange" name="onOpenChange"></a>

#### onOpenChange

> **onOpenChange**: `null` \| (`open`) => `void`

A callback that is called when the open state changes.

##### Implementation of

[`AutocompletePopoverProps`](../web/autocomplete.md#AutocompletePopoverProps).[`onOpenChange`](../web/autocomplete.md#onOpenChange)

##### Inherited from

[`AutocompletePopoverProps`](../web/autocomplete.md#AutocompletePopoverProps).[`onOpenChange`](../web/autocomplete.md#onOpenChange)

<a id="onQueryChange" name="onQueryChange"></a>

#### onQueryChange

> **onQueryChange**: `null` \| (`query`) => `void`

A callback that is called when the query changes.

##### Implementation of

[`AutocompletePopoverProps`](../web/autocomplete.md#AutocompletePopoverProps).[`onQueryChange`](../web/autocomplete.md#onQueryChange)

##### Inherited from

[`AutocompletePopoverProps`](../web/autocomplete.md#AutocompletePopoverProps).[`onQueryChange`](../web/autocomplete.md#onQueryChange)

<a id="overflowPadding" name="overflowPadding"></a>

#### overflowPadding

> **overflowPadding**: `number`

##### Default

```ts
8
```

##### Implementation of

[`AutocompletePopoverProps`](../web/autocomplete.md#AutocompletePopoverProps).[`overflowPadding`](../web/autocomplete.md#overflowPadding)

##### Inherited from

[`AutocompletePopoverProps`](../web/autocomplete.md#AutocompletePopoverProps).[`overflowPadding`](../web/autocomplete.md#overflowPadding)

<a id="placement" name="placement"></a>

#### placement

> **placement**: `Placement`

The placement of the popover, relative to the text cursor.

##### Default

```ts
"bottom-start"
```

##### Implementation of

[`AutocompletePopoverProps`](../web/autocomplete.md#AutocompletePopoverProps).[`placement`](../web/autocomplete.md#placement)

##### Inherited from

[`AutocompletePopoverProps`](../web/autocomplete.md#AutocompletePopoverProps).[`placement`](../web/autocomplete.md#placement)

<a id="regex" name="regex"></a>

#### regex

> **regex**: `null` \| [`RegExp`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp )

The regular expression to match the query text to autocomplete.

##### Default

```ts
null
```

##### Implementation of

[`AutocompletePopoverProps`](../web/autocomplete.md#AutocompletePopoverProps).[`regex`](../web/autocomplete.md#regex)

##### Inherited from

[`AutocompletePopoverProps`](../web/autocomplete.md#AutocompletePopoverProps).[`regex`](../web/autocomplete.md#regex)
