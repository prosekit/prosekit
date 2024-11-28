# prosekit/svelte/autocomplete

## AutocompleteEmptyProps {#autocomplete-empty-props-3}

Props for the [AutocompleteEmpty](autocomplete.md#autocomplete-empty-4) component.

## AutocompleteItemProps {#autocomplete-item-props-3}

Props for the [AutocompleteItem](autocomplete.md#autocomplete-item-4) component.

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

## AutocompleteListProps {#autocomplete-list-props-3}

Props for the [AutocompleteList](autocomplete.md#autocomplete-list-4) component.

<dl>

<dt>

`onValueChange`

</dt>

<dd>

**Type**: `(event: string) => void`

</dd>

</dl>

## AutocompletePopoverProps {#autocomplete-popover-props-3}

Props for the [AutocompletePopover](autocomplete.md#autocomplete-popover-4) component.

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

## AutocompleteEmpty {#autocomplete-empty-4}

**Type**: `typeof SvelteComponent`

## AutocompleteItem {#autocomplete-item-4}

**Type**: `typeof SvelteComponent`

## AutocompleteList {#autocomplete-list-4}

**Type**: `typeof SvelteComponent`

## AutocompletePopover {#autocomplete-popover-4}

**Type**: `typeof SvelteComponent`
