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

`value`

</dt>

<dd>

The value of the item, which will be matched against the query.

If not provided, the value is the item's text content.

**Type**: `string`

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

**Type**: `undefined | OffsetOptions`

**Default**: `4`

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
