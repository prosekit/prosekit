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

`value?: string`

</dt>

<dd>

The value of the item, which will be matched against the query.

If not provided, the value is the item's text content.

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

`openChange: (event: boolean) => void`

</dt>

<dd>

Fired when the open state changes.

</dd>

<dt>

`queryChange: (event: string) => void`

</dt>

<dd>

Fired when the query changes.

</dd>

</dl>

## AutocompletePopoverProps {#autocomplete-popover-props-4}

Props for the [AutocompletePopover](autocomplete.md#autocomplete-popover-5) component.

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

## AutocompleteEmpty {#autocomplete-empty-5}

**Type**: `DefineSetupFnComponent<AutocompleteEmptyProps & HTMLAttributes, AutocompleteEmptyEmits>`

## AutocompleteItem {#autocomplete-item-5}

**Type**: `DefineSetupFnComponent<AutocompleteItemProps & HTMLAttributes, AutocompleteItemEmits>`

## AutocompleteList {#autocomplete-list-5}

**Type**: `DefineSetupFnComponent<AutocompleteListProps & HTMLAttributes, AutocompleteListEmits>`

## AutocompletePopover {#autocomplete-popover-5}

**Type**: `DefineSetupFnComponent<AutocompletePopoverProps & HTMLAttributes, AutocompletePopoverEmits>`
