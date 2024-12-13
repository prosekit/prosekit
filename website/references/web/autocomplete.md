# prosekit/web/autocomplete

## AutocompleteItemEvents {#autocomplete-item-events}

## AutocompleteItemProps {#autocomplete-item-props-5}

<dl>

<dt>

`value: string`

</dt>

<dd>

The value of the item, which will be matched against the query.

If not provided, the value is the item's text content.

**Default**: `""`

</dd>

</dl>

## AutocompleteListEvents {#autocomplete-list-events}

## AutocompleteListProps {#autocomplete-list-props-5}

## AutocompletePopoverEvents {#autocomplete-popover-events}

<dl>

<dt>

`openChange: CustomEvent<boolean>`

</dt>

<dd>

Fired when the open state changes.

</dd>

<dt>

`queryChange: CustomEvent<string>`

</dt>

<dd>

Fired when the query changes.

</dd>

</dl>

## AutocompletePopoverProps {#autocomplete-popover-props-5}

<dl>

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

## autocompleteListEvents {#autocomplete-list-events-1}

**Type**: `EventDeclarations<ListboxEvents>`

## autocompleteListProps {#autocomplete-list-props-6}

**Type**: `{ editor: { default: null }; filter: PropDeclaration<null | ItemFilter> }`

## AutocompleteEmptyElement {#autocomplete-empty-element}

<!-- Declaration kind 4194304 is not implemented (name: AutocompleteEmptyElement) -->

## AutocompleteItemElement {#autocomplete-item-element}

<!-- Declaration kind 4194304 is not implemented (name: AutocompleteItemElement) -->

## AutocompleteListElement {#autocomplete-list-element}

<!-- Declaration kind 4194304 is not implemented (name: AutocompleteListElement) -->

## AutocompletePopoverElement {#autocomplete-popover-element}

<!-- Declaration kind 4194304 is not implemented (name: AutocompletePopoverElement) -->
