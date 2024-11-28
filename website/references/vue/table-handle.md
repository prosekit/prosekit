# prosekit/vue/table-handle

## TableHandleColumnRootEmits {#table-handle-column-root-emits}

Emits for the [TableHandleColumnRoot](table-handle.md#table-handle-column-root-5) component.

## TableHandleColumnRootProps {#table-handle-column-root-props-4}

Props for the [TableHandleColumnRoot](table-handle.md#table-handle-column-root-5) component.

<dl>

<dt>

`placement`

</dt>

<dd>

The placement of the popover, relative to the hovered table cell.

**Type**: `Placement`

**Default**: `"top"`

</dd>

</dl>

## TableHandleColumnTriggerEmits {#table-handle-column-trigger-emits}

Emits for the [TableHandleColumnTrigger](table-handle.md#table-handle-column-trigger-5) component.

## TableHandleColumnTriggerProps {#table-handle-column-trigger-props-4}

Props for the [TableHandleColumnTrigger](table-handle.md#table-handle-column-trigger-5) component.

<dl>

<dt>

`editor`

</dt>

<dd>

**Type**: `null | Editor<TableCommandsExtension>`

</dd>

</dl>

## TableHandlePopoverContentEmits {#table-handle-popover-content-emits}

Emits for the [TableHandlePopoverContent](table-handle.md#table-handle-popover-content-5) component.

## TableHandlePopoverContentProps {#table-handle-popover-content-props-4}

Props for the [TableHandlePopoverContent](table-handle.md#table-handle-popover-content-5) component.

<dl>

<dt>

`editor`

</dt>

<dd>

**Type**: `null | Editor<any>`

</dd>

<dt>

`offset`

</dt>

<dd>

**Type**: `OffsetOptions`

**Default**: `{mainAxis: -4, crossAxis: 4}`

</dd>

<dt>

`placement`

</dt>

<dd>

**Type**: `Placement`

**Default**: `'bottom-start'`

</dd>

</dl>

## TableHandlePopoverItemEmits {#table-handle-popover-item-emits}

Emits for the [TableHandlePopoverItem](table-handle.md#table-handle-popover-item-5) component.

## TableHandlePopoverItemProps {#table-handle-popover-item-props-4}

Props for the [TableHandlePopoverItem](table-handle.md#table-handle-popover-item-5) component.

## TableHandleRootEmits {#table-handle-root-emits}

Emits for the [TableHandleRoot](table-handle.md#table-handle-root-5) component.

## TableHandleRootProps {#table-handle-root-props-4}

Props for the [TableHandleRoot](table-handle.md#table-handle-root-5) component.

## TableHandleRowRootEmits {#table-handle-row-root-emits}

Emits for the [TableHandleRowRoot](table-handle.md#table-handle-row-root-5) component.

## TableHandleRowRootProps {#table-handle-row-root-props-4}

Props for the [TableHandleRowRoot](table-handle.md#table-handle-row-root-5) component.

<dl>

<dt>

`placement`

</dt>

<dd>

The placement of the popover, relative to the hovered table cell.

**Type**: `Placement`

**Default**: `"left"`

</dd>

</dl>

## TableHandleRowTriggerEmits {#table-handle-row-trigger-emits}

Emits for the [TableHandleRowTrigger](table-handle.md#table-handle-row-trigger-5) component.

<dl>

<dt>

`select`

</dt>

<dd>

**Type**: `(event: CustomEvent<void>) => void`

</dd>

</dl>

## TableHandleRowTriggerProps {#table-handle-row-trigger-props-4}

Props for the [TableHandleRowTrigger](table-handle.md#table-handle-row-trigger-5) component.

<dl>

<dt>

`editor`

</dt>

<dd>

**Type**: `null | Editor<TableCommandsExtension>`

</dd>

</dl>

## TableHandleColumnRoot {#table-handle-column-root-5}

**Type**: `DefineSetupFnComponent<TableHandleColumnRootProps & HTMLAttributes, TableHandleColumnRootEmits>`

## TableHandleColumnTrigger {#table-handle-column-trigger-5}

**Type**: `DefineSetupFnComponent<TableHandleColumnTriggerProps & HTMLAttributes, TableHandleColumnTriggerEmits>`

## TableHandlePopoverContent {#table-handle-popover-content-5}

**Type**: `DefineSetupFnComponent<TableHandlePopoverContentProps & HTMLAttributes, TableHandlePopoverContentEmits>`

## TableHandlePopoverItem {#table-handle-popover-item-5}

**Type**: `DefineSetupFnComponent<TableHandlePopoverItemProps & HTMLAttributes, TableHandlePopoverItemEmits>`

## TableHandleRoot {#table-handle-root-5}

**Type**: `DefineSetupFnComponent<TableHandleRootProps & HTMLAttributes, TableHandleRootEmits>`

## TableHandleRowRoot {#table-handle-row-root-5}

**Type**: `DefineSetupFnComponent<TableHandleRowRootProps & HTMLAttributes, TableHandleRowRootEmits>`

## TableHandleRowTrigger {#table-handle-row-trigger-5}

**Type**: `DefineSetupFnComponent<TableHandleRowTriggerProps & HTMLAttributes, TableHandleRowTriggerEmits>`
