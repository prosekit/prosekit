# prosekit/react/table-handle

## TableHandleColumnRootProps {#table-handle-column-root-props-1}

Props for the [TableHandleColumnRoot](table-handle.md#table-handle-column-root-2) component.

<dl>

<dt>

`placement?: Placement`

</dt>

<dd>

The placement of the popover, relative to the hovered table cell.

**Default**: `"top"`

</dd>

</dl>

## TableHandleColumnTriggerProps {#table-handle-column-trigger-props-1}

Props for the [TableHandleColumnTrigger](table-handle.md#table-handle-column-trigger-2) component.

<dl>

<dt>

`editor?: null | Editor<TableCommandsExtension>`

</dt>

<dd>

</dd>

</dl>

## TableHandlePopoverContentProps {#table-handle-popover-content-props-1}

Props for the [TableHandlePopoverContent](table-handle.md#table-handle-popover-content-2) component.

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

## TableHandlePopoverItemProps {#table-handle-popover-item-props-1}

Props for the [TableHandlePopoverItem](table-handle.md#table-handle-popover-item-2) component.

<dl>

<dt>

`onSelect?: (event: CustomEvent<void>) => void`

</dt>

<dd>

</dd>

</dl>

## TableHandleRootProps {#table-handle-root-props-1}

Props for the [TableHandleRoot](table-handle.md#table-handle-root-2) component.

## TableHandleRowRootProps {#table-handle-row-root-props-1}

Props for the [TableHandleRowRoot](table-handle.md#table-handle-row-root-2) component.

<dl>

<dt>

`placement?: Placement`

</dt>

<dd>

The placement of the popover, relative to the hovered table cell.

**Default**: `"left"`

</dd>

</dl>

## TableHandleRowTriggerProps {#table-handle-row-trigger-props-1}

Props for the [TableHandleRowTrigger](table-handle.md#table-handle-row-trigger-2) component.

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

## TableHandleColumnRoot {#table-handle-column-root-2}

```ts
function TableHandleColumnRoot(props: TableHandleColumnRootProps & RefAttributes<TableHandleColumnRoot> & HTMLAttributes<TableHandleColumnRoot>): ReactNode
```

## TableHandleColumnTrigger {#table-handle-column-trigger-2}

```ts
function TableHandleColumnTrigger(props: TableHandleColumnTriggerProps & RefAttributes<TableHandleColumnTrigger> & HTMLAttributes<TableHandleColumnTrigger>): ReactNode
```

## TableHandlePopoverContent {#table-handle-popover-content-2}

```ts
function TableHandlePopoverContent(props: TableHandlePopoverContentProps & RefAttributes<TableHandlePopoverContent> & HTMLAttributes<TableHandlePopoverContent>): ReactNode
```

## TableHandlePopoverItem {#table-handle-popover-item-2}

```ts
function TableHandlePopoverItem(props: TableHandlePopoverItemProps & RefAttributes<TableHandlePopoverItem> & HTMLAttributes<TableHandlePopoverItem>): ReactNode
```

## TableHandleRoot {#table-handle-root-2}

```ts
function TableHandleRoot(props: TableHandleRootProps & RefAttributes<TableHandleRoot> & HTMLAttributes<TableHandleRoot>): ReactNode
```

## TableHandleRowRoot {#table-handle-row-root-2}

```ts
function TableHandleRowRoot(props: TableHandleRowRootProps & RefAttributes<TableHandleRowRoot> & HTMLAttributes<TableHandleRowRoot>): ReactNode
```

## TableHandleRowTrigger {#table-handle-row-trigger-2}

```ts
function TableHandleRowTrigger(props: TableHandleRowTriggerProps & RefAttributes<TableHandleRowTrigger> & HTMLAttributes<TableHandleRowTrigger>): ReactNode
```
