# prosekit/lit/autocomplete

## AutocompleteEmpty {#autocomplete-empty}

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new AutocompleteEmpty(): AutocompleteEmpty
```

</dd>

</dl>

## AutocompleteItem {#autocomplete-item}

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new AutocompleteItem(): AutocompleteItem
```

</dd>

<dt>

`value: string`

</dt>

<dd>

The value of the item, which will be matched against the query.

If not provided, the value is the item's text content.

**Default**: `""`

</dd>

</dl>

## AutocompleteList {#autocomplete-list}

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new AutocompleteList(): AutocompleteList
```

</dd>

</dl>

## AutocompletePopover {#autocomplete-popover}

<dl>

<dt>

`constructor`

</dt>

<dd>

```
new AutocompletePopover(): AutocompletePopover
```

</dd>

<dt>

`boundary: Boundary`

</dt>

<dd>

**Default**: `"The body element"`

</dd>

<dt>

`fitViewport: boolean`

</dt>

<dd>

**Default**: `true`

</dd>

<dt>

`hoist: boolean`

</dt>

<dd>

**Default**: `true`

</dd>

<dt>

`inline: boolean`

</dt>

<dd>

**Default**: `true`

</dd>

<dt>

`offset: undefined | OffsetOptions`

</dt>

<dd>

The distance between the popover and the hovered block.

**Default**: `4`

</dd>

<dt>

`overflowPadding: number`

</dt>

<dd>

**Default**: `8`

</dd>

<dt>

`placement: Placement`

</dt>

<dd>

The placement of the popover, relative to the text cursor.

**Default**: `"bottom-start"`

</dd>

<dt>

`regex: null | RegExp`

</dt>

<dd>

The regular expression to match the query text to autocomplete.

**Default**: `null`

</dd>

</dl>
