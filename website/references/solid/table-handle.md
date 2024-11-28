# prosekit/solid/table-handle

## TableHandleColumnRootProps {#table-handle-column-root-props-2}

Props for the [TableHandleColumnRoot](table-handle.md#table-handle-column-root-3) component.

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

## TableHandleColumnTriggerProps {#table-handle-column-trigger-props-2}

Props for the [TableHandleColumnTrigger](table-handle.md#table-handle-column-trigger-3) component.

<dl>

<dt>

`editor`

</dt>

<dd>

**Type**: `null | Editor<TableCommandsExtension>`

</dd>

</dl>

## TableHandlePopoverContentProps {#table-handle-popover-content-props-2}

Props for the [TableHandlePopoverContent](table-handle.md#table-handle-popover-content-3) component.

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

`onEscapeKeyDown`

</dt>

<dd>

**Type**: `(event: EscapeKeyDownEvent) => void`

</dd>

<dt>

`onFocusOutside`

</dt>

<dd>

**Type**: `(event: FocusOutsideEvent) => void`

</dd>

<dt>

`onInteractOutside`

</dt>

<dd>

**Type**: `(event: InteractOutsideEvent) => void`

</dd>

<dt>

`onPointerDownOutside`

</dt>

<dd>

**Type**: `(event: PointerDownOutsideEvent) => void`

</dd>

<dt>

`placement`

</dt>

<dd>

**Type**: `Placement`

**Default**: `'bottom-start'`

</dd>

</dl>

## TableHandlePopoverItemProps {#table-handle-popover-item-props-2}

Props for the [TableHandlePopoverItem](table-handle.md#table-handle-popover-item-3) component.

<dl>

<dt>

`onSelect`

</dt>

<dd>

**Type**: `(event: CustomEvent<void>) => void`

</dd>

</dl>

## TableHandleRootProps {#table-handle-root-props-2}

Props for the [TableHandleRoot](table-handle.md#table-handle-root-3) component.

## TableHandleRowRootProps {#table-handle-row-root-props-2}

Props for the [TableHandleRowRoot](table-handle.md#table-handle-row-root-3) component.

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

## TableHandleRowTriggerProps {#table-handle-row-trigger-props-2}

Props for the [TableHandleRowTrigger](table-handle.md#table-handle-row-trigger-3) component.

<dl>

<dt>

`editor`

</dt>

<dd>

**Type**: `null | Editor<TableCommandsExtension>`

</dd>

<dt>

`onSelect`

</dt>

<dd>

**Type**: `(event: CustomEvent<void>) => void`

</dd>

</dl>

## TableHandleColumnRoot {#table-handle-column-root-3}

```ts
function TableHandleColumnRoot(props: Partial<TableHandleColumnRootProps> & HTMLAttributes<TableHandleColumnRoot>): Element
```

## TableHandleColumnTrigger {#table-handle-column-trigger-3}

```ts
function TableHandleColumnTrigger(props: Partial<TableHandleColumnTriggerProps> & HTMLAttributes<TableHandleColumnTrigger>): Element
```

## TableHandlePopoverContent {#table-handle-popover-content-3}

```ts
function TableHandlePopoverContent(props: Partial<TableHandlePopoverContentProps> & HTMLAttributes<TableHandlePopoverContent>): Element
```

## TableHandlePopoverItem {#table-handle-popover-item-3}

```ts
function TableHandlePopoverItem(props: Partial<TableHandlePopoverItemProps> & HTMLAttributes<TableHandlePopoverItem>): Element
```

## TableHandleRoot {#table-handle-root-3}

```ts
function TableHandleRoot(props: Partial<TableHandleRootProps> & HTMLAttributes<TableHandleRoot>): Element
```

## TableHandleRowRoot {#table-handle-row-root-3}

```ts
function TableHandleRowRoot(props: Partial<TableHandleRowRootProps> & HTMLAttributes<TableHandleRowRoot>): Element
```

## TableHandleRowTrigger {#table-handle-row-trigger-3}

```ts
function TableHandleRowTrigger(props: Partial<TableHandleRowTriggerProps> & HTMLAttributes<TableHandleRowTrigger>): Element
```
