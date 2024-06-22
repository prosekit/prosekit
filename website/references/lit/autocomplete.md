# prosekit/lit/autocomplete

<a id="AutocompleteEmpty" name="AutocompleteEmpty"></a>

## AutocompleteEmpty

### Extends

- `BaseElement`\<`this`\> & [`AutocompleteEmptyProps`](../web/autocomplete.md#AutocompleteEmptyProps)

### Constructors

<a id="Constructors" name="Constructors"></a>

#### new AutocompleteEmpty()

> **new AutocompleteEmpty**(): [`AutocompleteEmpty`](autocomplete.md#AutocompleteEmpty)

##### Returns

[`AutocompleteEmpty`](autocomplete.md#AutocompleteEmpty)

##### Inherited from

`ElementBuilder<AutocompleteEmptyProps>(useAutocompleteEmpty, defaultAutocompleteEmptyProps).constructor`

***

<a id="AutocompleteItem" name="AutocompleteItem"></a>

## AutocompleteItem

### Extends

- `BaseElement`\<`this`\> & [`AutocompleteItemProps`](../web/autocomplete.md#AutocompleteItemProps)

### Constructors

<a id="Constructors-1" name="Constructors-1"></a>

#### new AutocompleteItem()

> **new AutocompleteItem**(): [`AutocompleteItem`](autocomplete.md#AutocompleteItem)

##### Returns

[`AutocompleteItem`](autocomplete.md#AutocompleteItem)

##### Inherited from

`ElementBuilder<AutocompleteItemProps>(useAutocompleteItem, defaultAutocompleteItemProps).constructor`

### Properties

<a id="onSelect" name="onSelect"></a>

#### onSelect

> **onSelect**: `null` \| `VoidFunction`

The function to call when the item is selected.

##### Default

```ts
null
```

##### Inherited from

`ElementBuilder<AutocompleteItemProps>(useAutocompleteItem, defaultAutocompleteItemProps).onSelect`

<a id="value" name="value"></a>

#### value

> **value**: `string`

The value of the item, which will be matched against the query.

If not provided, the value is the item's text content.

##### Default

```ts
""
```

##### Inherited from

`ElementBuilder<AutocompleteItemProps>(useAutocompleteItem, defaultAutocompleteItemProps).value`

***

<a id="AutocompleteList" name="AutocompleteList"></a>

## AutocompleteList

### Extends

- `BaseElement`\<`this`\> & [`AutocompleteListProps`](../web/autocomplete.md#AutocompleteListProps)\<`this`\>

### Constructors

<a id="Constructors-2" name="Constructors-2"></a>

#### new AutocompleteList()

> **new AutocompleteList**(): [`AutocompleteList`](autocomplete.md#AutocompleteList)

##### Returns

[`AutocompleteList`](autocomplete.md#AutocompleteList)

##### Inherited from

`ElementBuilder<AutocompleteListProps>(useAutocompleteList, defaultAutocompleteListProps).constructor`

### Properties

<a id="editor" name="editor"></a>

#### editor

> **editor**: `null` \| [`Editor`](../core.md#EditorE)\<`any`\>

##### Inherited from

`ElementBuilder<AutocompleteListProps>(useAutocompleteList, defaultAutocompleteListProps).editor`

***

<a id="AutocompletePopover" name="AutocompletePopover"></a>

## AutocompletePopover

### Extends

- `BaseElement`\<`this`\> & [`AutocompletePopoverProps`](../web/autocomplete.md#AutocompletePopoverProps)

### Constructors

<a id="Constructors-3" name="Constructors-3"></a>

#### new AutocompletePopover()

> **new AutocompletePopover**(): [`AutocompletePopover`](autocomplete.md#AutocompletePopover)

##### Returns

[`AutocompletePopover`](autocomplete.md#AutocompletePopover)

##### Inherited from

`ElementBuilder<AutocompletePopoverProps>(useAutocompletePopover, defaultAutocompletePopoverProps).constructor`

### Properties

<a id="boundary" name="boundary"></a>

#### boundary

> **boundary**: `Boundary`

##### Default

```ts
"The body element"
```

##### Inherited from

`ElementBuilder<AutocompletePopoverProps>(useAutocompletePopover, defaultAutocompletePopoverProps).boundary`

<a id="editor-1" name="editor-1"></a>

#### editor

> **editor**: `null` \| [`Editor`](../core.md#EditorE)\<`any`\>

The ProseKit editor instance.

##### Default

```ts
null
```

##### Inherited from

`ElementBuilder<AutocompletePopoverProps>(useAutocompletePopover, defaultAutocompletePopoverProps).editor`

<a id="fitViewport" name="fitViewport"></a>

#### fitViewport

> **fitViewport**: `boolean`

##### Default

```ts
true
```

##### Inherited from

`ElementBuilder<AutocompletePopoverProps>(useAutocompletePopover, defaultAutocompletePopoverProps).fitViewport`

<a id="hoist" name="hoist"></a>

#### hoist

> **hoist**: `boolean`

##### Default

```ts
true
```

##### Inherited from

`ElementBuilder<AutocompletePopoverProps>(useAutocompletePopover, defaultAutocompletePopoverProps).hoist`

<a id="inline" name="inline"></a>

#### inline

> **inline**: `boolean`

##### Default

```ts
true
```

##### Inherited from

`ElementBuilder<AutocompletePopoverProps>(useAutocompletePopover, defaultAutocompletePopoverProps).inline`

<a id="offset" name="offset"></a>

#### offset

> **offset**: `null` \| `OffsetOptions`

The distance between the popover and the hovered block.

##### Default

```ts
4
```

##### Inherited from

`ElementBuilder<AutocompletePopoverProps>(useAutocompletePopover, defaultAutocompletePopoverProps).offset`

<a id="onOpenChange" name="onOpenChange"></a>

#### onOpenChange

> **onOpenChange**: `null` \| (`open`) => `void`

A callback that is called when the open state changes.

##### Inherited from

`ElementBuilder<AutocompletePopoverProps>(useAutocompletePopover, defaultAutocompletePopoverProps).onOpenChange`

<a id="onQueryChange" name="onQueryChange"></a>

#### onQueryChange

> **onQueryChange**: `null` \| (`query`) => `void`

A callback that is called when the query changes.

##### Inherited from

`ElementBuilder<AutocompletePopoverProps>(useAutocompletePopover, defaultAutocompletePopoverProps).onQueryChange`

<a id="overflowPadding" name="overflowPadding"></a>

#### overflowPadding

> **overflowPadding**: `number`

##### Default

```ts
8
```

##### Inherited from

`ElementBuilder<AutocompletePopoverProps>(useAutocompletePopover, defaultAutocompletePopoverProps).overflowPadding`

<a id="placement" name="placement"></a>

#### placement

> **placement**: `Placement`

The placement of the popover, relative to the text cursor.

##### Default

```ts
"bottom-start"
```

##### Inherited from

`ElementBuilder<AutocompletePopoverProps>(useAutocompletePopover, defaultAutocompletePopoverProps).placement`

<a id="regex" name="regex"></a>

#### regex

> **regex**: `null` \| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

The regular expression to match the query text to autocomplete.

##### Default

```ts
null
```

##### Inherited from

`ElementBuilder<AutocompletePopoverProps>(useAutocompletePopover, defaultAutocompletePopoverProps).regex`
