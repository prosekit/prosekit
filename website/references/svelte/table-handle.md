# prosekit/svelte/table-handle

## TableHandleColumnRootProps {#table-handle-column-root-props-3}

Props for the [TableHandleColumnRoot](table-handle.md#table-handle-column-root-4) component.

<dl>

<dt>

`placement?: Placement`

</dt>

<dd>

The placement of the popover, relative to the hovered table cell.

**Default**: `"top"`

</dd>

</dl>

## TableHandleColumnTriggerProps {#table-handle-column-trigger-props-3}

Props for the [TableHandleColumnTrigger](table-handle.md#table-handle-column-trigger-4) component.

<dl>

<dt>

`editor?: null | Editor<TableCommandsExtension>`

</dt>

<dd>

</dd>

</dl>

## TableHandlePopoverContentProps {#table-handle-popover-content-props-3}

Props for the [TableHandlePopoverContent](table-handle.md#table-handle-popover-content-4) component.

<dl>

<dt>

`editor?: null | Editor<any>`

</dt>

<dd>

</dd>

<dt>

`offset?: OffsetOptions`

</dt>

<dd>

**Default**: `{mainAxis: -4, crossAxis: 4}`

</dd>

<dt>

`onEscapeKeyDown?: (event: EscapeKeyDownEvent) => void`

</dt>

<dd>

</dd>

<dt>

`onFocusOutside?: (event: FocusOutsideEvent) => void`

</dt>

<dd>

</dd>

<dt>

`onInteractOutside?: (event: InteractOutsideEvent) => void`

</dt>

<dd>

</dd>

<dt>

`onPointerDownOutside?: (event: PointerDownOutsideEvent) => void`

</dt>

<dd>

</dd>

<dt>

`placement?: Placement`

</dt>

<dd>

**Default**: `'bottom-start'`

</dd>

</dl>

## TableHandlePopoverItemProps {#table-handle-popover-item-props-3}

Props for the [TableHandlePopoverItem](table-handle.md#table-handle-popover-item-4) component.

<dl>

<dt>

`onSelect?: (event: CustomEvent<void>) => void`

</dt>

<dd>

</dd>

</dl>

## TableHandleRootProps {#table-handle-root-props-3}

Props for the [TableHandleRoot](table-handle.md#table-handle-root-4) component.

## TableHandleRowRootProps {#table-handle-row-root-props-3}

Props for the [TableHandleRowRoot](table-handle.md#table-handle-row-root-4) component.

<dl>

<dt>

`placement?: Placement`

</dt>

<dd>

The placement of the popover, relative to the hovered table cell.

**Default**: `"left"`

</dd>

</dl>

## TableHandleRowTriggerProps {#table-handle-row-trigger-props-3}

Props for the [TableHandleRowTrigger](table-handle.md#table-handle-row-trigger-4) component.

<dl>

<dt>

`editor?: null | Editor<TableCommandsExtension>`

</dt>

<dd>

</dd>

<dt>

`onSelect?: (event: CustomEvent<void>) => void`

</dt>

<dd>

</dd>

</dl>

## TableHandleColumnRoot {#table-handle-column-root-4}

**Type**: `typeof SvelteComponent`

## TableHandleColumnTrigger {#table-handle-column-trigger-4}

**Type**: `typeof SvelteComponent`

## TableHandlePopoverContent {#table-handle-popover-content-4}

**Type**: `typeof SvelteComponent`

## TableHandlePopoverItem {#table-handle-popover-item-4}

**Type**: `typeof SvelteComponent`

## TableHandleRoot {#table-handle-root-4}

**Type**: `typeof SvelteComponent`

## TableHandleRowRoot {#table-handle-row-root-4}

**Type**: `typeof SvelteComponent`

## TableHandleRowTrigger {#table-handle-row-trigger-4}

**Type**: `typeof SvelteComponent`
