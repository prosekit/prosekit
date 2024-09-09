# Table

The table extension adds support for creating and editing tables in your document. It provides a set of commands and utilities for working with table structures.

<!-- @include: @/examples/table.md -->

## Usage

```ts twoslash
import { defineTable } from 'prosekit/extensions/table'

const extension = defineTable()
```

## Commands

### `insertTable`

Insert a new table.

```ts
editor.commands.insertTable({ rows: 3, cols: 3 })
```

### `exitTable`

Exit the table.

```ts
editor.commands.exitTable()
```

### `selectTable`

Select the table.

```ts
editor.commands.selectTable()
```

### `selectTableCell`

Select the table cell.

```ts
editor.commands.selectTableCell()
```

### `selectTableColumn`

Select the table column.

```ts
editor.commands.selectTableColumn()
```

### `selectTableRow`

Select the table row.

```ts
editor.commands.selectTableRow()
```

### `addTableColumnBefore`

Add a new column before the selected column.

```ts
editor.commands.addTableColumnBefore()
```

### `addTableColumnAfter`

Add a new column after the selected column.

```ts
editor.commands.addTableColumnAfter()
```

### `addTableRowAbove`

Add a new row above the selected row or specific position.

```ts
editor.commands.addTableRowAbove()
```

### `addTableRowBelow`

Add a new row below the selected row or specific position.

```ts
editor.commands.addTableRowBelow()
```

### `deleteTable`

Delete the selected table.

```ts
editor.commands.deleteTable()
```

### `deleteTableColumn`

Delete the selected column or specific position.

```ts
editor.commands.deleteTableColumn()
```

### `deleteTableRow`

Delete the selected row or specific position.

```ts
editor.commands.deleteTableRow()
```

### `deleteCellSelection`

Delete the cell selection.

```ts
editor.commands.deleteCellSelection()
```

### `mergeTableCells`

Merge the selected cells.

```ts
editor.commands.mergeTableCells()
```

### `splitTableCell`

Split the selected cell.

```ts
editor.commands.splitTableCell()
```

## Plugins

### `tableEditing` and `columnResizing`

These plugins are built-in plugins in [prosemirror-tables].

```ts twoslash
import { defineTablePlugins } from 'prosekit/extensions/table'

const extension = defineTablePlugins()
```

## Components

### `TableHandle`

You can use the [`TableHandle`](/components/table-handle) component to control the table.

[prosemirror-tables]: https://github.com/ProseMirror/prosemirror-tables
