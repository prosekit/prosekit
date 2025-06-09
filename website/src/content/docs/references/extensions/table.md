---
title: prosekit/extensions/table
sidebar:
  label: extensions/table
---


## InsertTableOptions {#insert-table-options}

<dl>

<dt>

`col: number`

</dt>

<dd>

The number of columns in the table.

</dd>

<dt>

`header?: boolean`

</dt>

<dd>

Whether the table has a header row.

**Default**: `false`

</dd>

<dt>

`row: number`

</dt>

<dd>

The number of rows in the table.

</dd>

</dl>

## SelectTableCellOptions {#select-table-cell-options}

<dl>

<dt>

`pos?: number`

</dt>

<dd>

A hit position of the table cell to select from. By default, the selection
anchor will be used.

</dd>

</dl>

## SelectTableColumnOptions {#select-table-column-options}

<dl>

<dt>

`anchor?: number`

</dt>

<dd>

A hit position of the table cell to select from. By default, the selection
anchor will be used.

</dd>

<dt>

`head?: number`

</dt>

<dd>

A hit position of the table cell to select to. By default, the selection
head will be used.

</dd>

</dl>

## SelectTableOptions {#select-table-options}

<dl>

<dt>

`pos?: number`

</dt>

<dd>

A hit position of the table to select from. By default, the selection
anchor will be used.

</dd>

</dl>

## SelectTableRowOptions {#select-table-row-options}

<dl>

<dt>

`anchor?: number`

</dt>

<dd>

A hit position of the table cell to select from. By default, the selection
anchor will be used.

</dd>

<dt>

`head?: number`

</dt>

<dd>

A hit position of the table cell to select to. By default, the selection
head will be used.

</dd>

</dl>

## defineTable {#define-table}

```ts
function defineTable(): TableExtension
```

## defineTableCommands {#define-table-commands}

```ts
function defineTableCommands(): TableCommandsExtension
```

Adds commands for working with `table` nodes.

## defineTableHeaderCellSpec {#define-table-header-cell-spec}

```ts
function defineTableHeaderCellSpec(): TableHeaderCellSpecExtension
```

## defineTablePlugins {#define-table-plugins}

```ts
function defineTablePlugins(): PlainExtension
```

## exitTable {#exit-table}

When the selection is in a table node, create a default block after the table
table, and move the cursor there.

```ts
function exitTable(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean
```

## insertTable {#insert-table}

```ts
function insertTable(options: InsertTableOptions): Command
```

Insert a table node with the given number of rows and columns, and optionally
a header row.

## isCellSelection {#is-cell-selection}

```ts
function isCellSelection(value: unknown): value is CellSelection
```

Checks if the given object is a `CellSelection` instance.

## selectTable {#select-table}

```ts
function selectTable(options?: SelectTableOptions): Command
```

## selectTableCell {#select-table-cell}

```ts
function selectTableCell(options?: SelectTableCellOptions): Command
```

## selectTableColumn {#select-table-column}

```ts
function selectTableColumn(options?: SelectTableColumnOptions): Command
```

## selectTableRow {#select-table-row}

```ts
function selectTableRow(options?: SelectTableRowOptions): Command
```
