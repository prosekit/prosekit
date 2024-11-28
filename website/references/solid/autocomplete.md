# prosekit/solid/autocomplete

## AutocompleteEmptyProps {#autocomplete-empty-props-2}

Props for the [AutocompleteEmpty](autocomplete.md#autocomplete-empty-3) component.

## AutocompleteItemProps {#autocomplete-item-props-2}

Props for the [AutocompleteItem](autocomplete.md#autocomplete-item-3) component.

<dl>

<dt>

`onSelect`

</dt>

<dd>

**Type**: `(event: CustomEvent<void>) => void`

</dd>

<dt>

`value`

</dt>

<dd>

The value of the item, which will be matched against the query.

If not provided, the value is the item's text content.

**Type**: `string`

**Default**: `""`

</dd>

</dl>

## AutocompleteListProps {#autocomplete-list-props-2}

Props for the [AutocompleteList](autocomplete.md#autocomplete-list-3) component.

<dl>

<dt>

`onValueChange`

</dt>

<dd>

**Type**: `(event: string) => void`

</dd>

</dl>

## AutocompletePopoverProps {#autocomplete-popover-props-2}

Props for the [AutocompletePopover](autocomplete.md#autocomplete-popover-3) component.

<dl>

<dt>

`boundary`

</dt>

<dd>

**Type**: `Boundary`

**Default**: `"The body element"`

</dd>

<dt>

`fitViewport`

</dt>

<dd>

**Type**: `boolean`

**Default**: `true`

</dd>

<dt>

`hoist`

</dt>

<dd>

**Type**: `boolean`

**Default**: `true`

</dd>

<dt>

`inline`

</dt>

<dd>

**Type**: `boolean`

**Default**: `true`

</dd>

<dt>

`offset`

</dt>

<dd>

The distance between the popover and the hovered block.

**Type**: `OffsetOptions`

**Default**: `4`

</dd>

<dt>

`onOpenChange`

</dt>

<dd>

**Type**: `(event: boolean) => void`

</dd>

<dt>

`onQueryChange`

</dt>

<dd>

**Type**: `(event: string) => void`

</dd>

<dt>

`overflowPadding`

</dt>

<dd>

**Type**: `number`

**Default**: `8`

</dd>

<dt>

`placement`

</dt>

<dd>

The placement of the popover, relative to the text cursor.

**Type**: `Placement`

**Default**: `"bottom-start"`

</dd>

<dt>

`regex`

</dt>

<dd>

The regular expression to match the query text to autocomplete.

**Type**: `null | RegExp`

**Default**: `null`

</dd>

</dl>

## AutocompleteEmpty {#autocomplete-empty-3}

```ts
function AutocompleteEmpty(props: Partial<AutocompleteEmptyProps> & HTMLAttributes<AutocompleteEmpty>): Element
```

## AutocompleteItem {#autocomplete-item-3}

```ts
function AutocompleteItem(props: Partial<AutocompleteItemProps> & HTMLAttributes<AutocompleteItem>): Element
```

## AutocompleteList {#autocomplete-list-3}

```ts
function AutocompleteList(props: Partial<AutocompleteListProps> & HTMLAttributes<AutocompleteList>): Element
```

## AutocompletePopover {#autocomplete-popover-3}

```ts
function AutocompletePopover(props: Partial<AutocompletePopoverProps> & HTMLAttributes<AutocompletePopover>): Element
```
