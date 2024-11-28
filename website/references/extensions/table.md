# prosekit/extensions/table

## InsertTableOptions {#insert-table-options}

<dl>

<dt>

`col`

</dt>

<dd>

**Type**: `number`

</dd>

<dt>

`header`

</dt>

<dd>

**Type**: `boolean`

</dd>

<dt>

`row`

</dt>

<dd>

**Type**: `number`

</dd>

</dl>

## SelectTableCellOptions {#select-table-cell-options}

<dl>

<dt>

`pos`

</dt>

<dd>

A hit position of the table cell to select from. By default, the selection
anchor will be used.

**Type**: `number`

</dd>

</dl>

## SelectTableColumnOptions {#select-table-column-options}

<dl>

<dt>

`anchor`

</dt>

<dd>

A hit position of the table cell to select from. By default, the selection
anchor will be used.

**Type**: `number`

</dd>

<dt>

`head`

</dt>

<dd>

A hit position of the table cell to select to. By default, the selection
head will be used.

**Type**: `number`

</dd>

</dl>

## SelectTableOptions {#select-table-options}

<dl>

<dt>

`pos`

</dt>

<dd>

A hit position of the table to select from. By default, the selection
anchor will be used.

**Type**: `number`

</dd>

</dl>

## SelectTableRowOptions {#select-table-row-options}

<dl>

<dt>

`anchor`

</dt>

<dd>

A hit position of the table cell to select from. By default, the selection
anchor will be used.

**Type**: `number`

</dd>

<dt>

`head`

</dt>

<dd>

A hit position of the table cell to select to. By default, the selection
head will be used.

**Type**: `number`

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
