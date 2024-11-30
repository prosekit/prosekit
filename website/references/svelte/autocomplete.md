# prosekit/svelte/autocomplete

## AutocompleteEmptyProps {#autocomplete-empty-props-3}

Props for the [AutocompleteEmpty](autocomplete.md#autocomplete-empty-4) component.

## AutocompleteItemProps {#autocomplete-item-props-3}

Props for the [AutocompleteItem](autocomplete.md#autocomplete-item-4) component.

<dl>

<dt>

`onSelect?: (event: CustomEvent<void>) => void`

</dt>

<dd>

</dd>

<dt>

`value?: string`

</dt>

<dd>

The value of the item, which will be matched against the query.

If not provided, the value is the item's text content.

**Default**: `""`

</dd>

</dl>

## AutocompleteListProps {#autocomplete-list-props-3}

Props for the [AutocompleteList](autocomplete.md#autocomplete-list-4) component.

<dl>

<dt>

`onValueChange?: (event: string) => void`

</dt>

<dd>

</dd>

</dl>

## AutocompletePopoverProps {#autocomplete-popover-props-3}

Props for the [AutocompletePopover](autocomplete.md#autocomplete-popover-4) component.

<dl>

<dt>

`boundary?: Boundary`

</dt>

<dd>

**Default**: `"The body element"`

</dd>

<dt>

`fitViewport?: boolean`

</dt>

<dd>

**Default**: `true`

</dd>

<dt>

`hoist?: boolean`

</dt>

<dd>

**Default**: `true`

</dd>

<dt>

`inline?: boolean`

</dt>

<dd>

**Default**: `true`

</dd>

<dt>

`offset?: OffsetOptions`

</dt>

<dd>

The distance between the popover and the hovered block.

**Default**: `4`

</dd>

<dt>

`onOpenChange?: (event: boolean) => void`

</dt>

<dd>

</dd>

<dt>

`onQueryChange?: (event: string) => void`

</dt>

<dd>

</dd>

<dt>

`overflowPadding?: number`

</dt>

<dd>

**Default**: `8`

</dd>

<dt>

`placement?: Placement`

</dt>

<dd>

The placement of the popover, relative to the text cursor.

**Default**: `"bottom-start"`

</dd>

<dt>

`regex?: null | RegExp`

</dt>

<dd>

The regular expression to match the query text to autocomplete.

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
