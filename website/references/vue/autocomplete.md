# prosekit/vue/autocomplete

## AutocompleteEmptyEmits {#autocomplete-empty-emits}

Emits for the [AutocompleteEmpty](autocomplete.md#autocomplete-empty-5) component.

## AutocompleteEmptyProps {#autocomplete-empty-props-4}

Props for the [AutocompleteEmpty](autocomplete.md#autocomplete-empty-5) component.

## AutocompleteItemEmits {#autocomplete-item-emits}

Emits for the [AutocompleteItem](autocomplete.md#autocomplete-item-5) component.

## AutocompleteItemProps {#autocomplete-item-props-4}

Props for the [AutocompleteItem](autocomplete.md#autocomplete-item-5) component.

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

## AutocompleteListEmits {#autocomplete-list-emits}

Emits for the [AutocompleteList](autocomplete.md#autocomplete-list-5) component.

## AutocompleteListProps {#autocomplete-list-props-4}

Props for the [AutocompleteList](autocomplete.md#autocomplete-list-5) component.

## AutocompletePopoverEmits {#autocomplete-popover-emits}

Emits for the [AutocompletePopover](autocomplete.md#autocomplete-popover-5) component.

<dl>

<dt>

`openChange`

</dt>

<dd>

Fired when the open state changes.

**Type**: `(event: boolean) => void`

</dd>

<dt>

`queryChange`

</dt>

<dd>

Fired when the query changes.

**Type**: `(event: string) => void`

</dd>

</dl>

## AutocompletePopoverProps {#autocomplete-popover-props-4}

Props for the [AutocompletePopover](autocomplete.md#autocomplete-popover-5) component.

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

## AutocompleteEmpty {#autocomplete-empty-5}

**Type**: `DefineSetupFnComponent<AutocompleteEmptyProps & HTMLAttributes, AutocompleteEmptyEmits>`

## AutocompleteItem {#autocomplete-item-5}

**Type**: `DefineSetupFnComponent<AutocompleteItemProps & HTMLAttributes, AutocompleteItemEmits>`

## AutocompleteList {#autocomplete-list-5}

**Type**: `DefineSetupFnComponent<AutocompleteListProps & HTMLAttributes, AutocompleteListEmits>`

## AutocompletePopover {#autocomplete-popover-5}

**Type**: `DefineSetupFnComponent<AutocompletePopoverProps & HTMLAttributes, AutocompletePopoverEmits>`
