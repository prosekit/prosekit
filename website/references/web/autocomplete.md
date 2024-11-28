# prosekit/web/autocomplete

## AutocompleteItemEvents {#autocomplete-item-events}

## AutocompleteItemProps {#autocomplete-item-props-5}

<dl>

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

## AutocompleteListEvents {#autocomplete-list-events}

## AutocompleteListProps {#autocomplete-list-props-5}

## AutocompletePopoverEvents {#autocomplete-popover-events}

<dl>

<dt>

`openChange`

</dt>

<dd>

Fired when the open state changes.

**Type**: `CustomEvent<boolean>`

</dd>

<dt>

`queryChange`

</dt>

<dd>

Fired when the query changes.

**Type**: `CustomEvent<string>`

</dd>

</dl>

## AutocompletePopoverProps {#autocomplete-popover-props-5}

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
