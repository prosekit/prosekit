# prosekit/solid/autocomplete

## AutocompleteEmptyProps {#autocomplete-empty-props-2}

Props for the [AutocompleteEmpty](autocomplete.md#autocomplete-empty-3) component.

## AutocompleteItemProps {#autocomplete-item-props-2}

Props for the [AutocompleteItem](autocomplete.md#autocomplete-item-3) component.

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

## AutocompleteListProps {#autocomplete-list-props-2}

Props for the [AutocompleteList](autocomplete.md#autocomplete-list-3) component.

<dl>

<dt>

`onValueChange?: (event: string) => void`

</dt>

<dd>

</dd>

</dl>

## AutocompletePopoverProps {#autocomplete-popover-props-2}

Props for the [AutocompletePopover](autocomplete.md#autocomplete-popover-3) component.

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
