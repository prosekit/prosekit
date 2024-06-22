# prosekit/web/autocomplete

<a id="AutocompleteEmptyElement" name="AutocompleteEmptyElement"></a>

## AutocompleteEmptyElement

Renames and re-exports [AutocompleteEmpty](../lit/autocomplete.md#AutocompleteEmpty)

<a id="AutocompleteItemElement" name="AutocompleteItemElement"></a>

## AutocompleteItemElement

Renames and re-exports [AutocompleteItem](../lit/autocomplete.md#AutocompleteItem)

<a id="AutocompleteListElement" name="AutocompleteListElement"></a>

## AutocompleteListElement

Renames and re-exports [AutocompleteList](../lit/autocomplete.md#AutocompleteList)

<a id="AutocompletePopoverElement" name="AutocompletePopoverElement"></a>

## AutocompletePopoverElement

Renames and re-exports [AutocompletePopover](../lit/autocomplete.md#AutocompletePopover)

<a id="AutocompleteEmptyProps" name="AutocompleteEmptyProps"></a>

## AutocompleteEmptyProps

***

<a id="AutocompleteItemProps" name="AutocompleteItemProps"></a>

## AutocompleteItemProps

### Properties

<a id="onSelect" name="onSelect"></a>

#### onSelect

> **onSelect**: `null` \| `VoidFunction`

The function to call when the item is selected.

##### Default

```ts
null
```

<a id="value" name="value"></a>

#### value

> **value**: `string`

The value of the item, which will be matched against the query.

If not provided, the value is the item's text content.

##### Default

```ts
""
```

***

<a id="AutocompleteListProps" name="AutocompleteListProps"></a>

## AutocompleteListProps

### Extends

- [`Pick`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)\<`ListboxProps`, `"filter"`\>

### Properties

<a id="editor" name="editor"></a>

#### editor

> **editor**: `null` \| [`Editor`](../core.md#EditorE)\<`any`\>

***

<a id="AutocompletePopoverProps" name="AutocompletePopoverProps"></a>

## AutocompletePopoverProps

### Extends

- `OverlayPositionerProps`

### Properties

<a id="boundary" name="boundary"></a>

#### boundary

> **boundary**: `Boundary`

##### Default

```ts
"The body element"
```

##### Overrides

`OverlayPositionerProps.boundary`

<a id="editor-1" name="editor-1"></a>

#### editor

> **editor**: `null` \| [`Editor`](../core.md#EditorE)\<`any`\>

The ProseKit editor instance.

##### Default

```ts
null
```

<a id="fitViewport" name="fitViewport"></a>

#### fitViewport

> **fitViewport**: `boolean`

##### Default

```ts
true
```

##### Overrides

`OverlayPositionerProps.fitViewport`

<a id="hoist" name="hoist"></a>

#### hoist

> **hoist**: `boolean`

##### Default

```ts
true
```

##### Overrides

`OverlayPositionerProps.hoist`

<a id="inline" name="inline"></a>

#### inline

> **inline**: `boolean`

##### Default

```ts
true
```

##### Overrides

`OverlayPositionerProps.inline`

<a id="offset" name="offset"></a>

#### offset

> **offset**: `null` \| `OffsetOptions`

The distance between the popover and the hovered block.

##### Default

```ts
4
```

##### Overrides

`OverlayPositionerProps.offset`

<a id="onOpenChange" name="onOpenChange"></a>

#### onOpenChange

> **onOpenChange**: `null` \| (`open`) => `void`

A callback that is called when the open state changes.

<a id="onQueryChange" name="onQueryChange"></a>

#### onQueryChange

> **onQueryChange**: `null` \| (`query`) => `void`

A callback that is called when the query changes.

<a id="overflowPadding" name="overflowPadding"></a>

#### overflowPadding

> **overflowPadding**: `number`

##### Default

```ts
8
```

##### Overrides

`OverlayPositionerProps.overflowPadding`

<a id="placement" name="placement"></a>

#### placement

> **placement**: `Placement`

The placement of the popover, relative to the text cursor.

##### Default

```ts
"bottom-start"
```

##### Overrides

`OverlayPositionerProps.placement`

<a id="regex" name="regex"></a>

#### regex

> **regex**: `null` \| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

The regular expression to match the query text to autocomplete.

##### Default

```ts
null
```

***

<a id="defaultAutocompleteEmptyProps" name="defaultAutocompleteEmptyProps"></a>

## defaultAutocompleteEmptyProps

> `const` **defaultAutocompleteEmptyProps**: `object`

***

<a id="defaultAutocompleteItemProps" name="defaultAutocompleteItemProps"></a>

## defaultAutocompleteItemProps

> `const` **defaultAutocompleteItemProps**: `object`

### Type declaration

| Name | Type | Default value |
| ------ | ------ | ------ |
| `onSelect` | `null` | null |
| `value` | `string` | '' |

***

<a id="defaultAutocompleteListProps" name="defaultAutocompleteListProps"></a>

## defaultAutocompleteListProps

> `const` **defaultAutocompleteListProps**: `object`

### Type declaration

| Name | Type | Default value |
| ------ | ------ | ------ |
| `editor` | `null` | null |
| `filter` | (`options`) => `boolean` | defaultFilter |

***

<a id="defaultAutocompletePopoverProps" name="defaultAutocompletePopoverProps"></a>

## defaultAutocompletePopoverProps

> `const` **defaultAutocompletePopoverProps**: [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<`object`\>

### Type declaration

| Name | Type | Default value |
| ------ | ------ | ------ |
| `boundary` | [`HTMLBodyElement`](https://developer.mozilla.org/docs/Web/API/HTMLBodyElement) \| `"clippingAncestors"` | defaultBoundary |
| `editor` | `null` | null |
| `fitViewport` | `true` | true |
| `hoist` | `true` | true |
| `inline` | `true` | true |
| `offset` | `4` | 4 |
| `onOpenChange` | `null` | null |
| `onQueryChange` | `null` | null |
| `overflowPadding` | `8` | 8 |
| `placement` | `"bottom-start"` | 'bottom-start' |
| `regex` | `null` | null |
