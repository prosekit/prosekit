# prosekit/extensions/table

<a id="InsertTableOptions" name="InsertTableOptions"></a>

## InsertTableOptions

### Properties

<a id="col" name="col"></a>

#### col

> **col**: `number`

<a id="header" name="header"></a>

#### header

> **header**: `boolean`

<a id="row" name="row"></a>

#### row

> **row**: `number`

***

<a id="SelectTableCellOptions" name="SelectTableCellOptions"></a>

## SelectTableCellOptions

### Properties

<a id="pos" name="pos"></a>

#### pos?

> `optional` **pos**: `number`

A hit position of the table cell to select from. By default, the selection
anchor will be used.

***

<a id="SelectTableColumnOptions" name="SelectTableColumnOptions"></a>

## SelectTableColumnOptions

### Properties

<a id="anchor" name="anchor"></a>

#### anchor?

> `optional` **anchor**: `number`

A hit position of the table cell to select from. By default, the selection
anchor will be used.

<a id="head" name="head"></a>

#### head?

> `optional` **head**: `number`

A hit position of the table cell to select to. By default, the selection
head will be used.

***

<a id="SelectTableOptions" name="SelectTableOptions"></a>

## SelectTableOptions

### Properties

<a id="pos-1" name="pos-1"></a>

#### pos?

> `optional` **pos**: `number`

A hit position of the table to select from. By default, the selection
anchor will be used.

***

<a id="SelectTableRowOptions" name="SelectTableRowOptions"></a>

## SelectTableRowOptions

### Properties

<a id="anchor-1" name="anchor-1"></a>

#### anchor?

> `optional` **anchor**: `number`

A hit position of the table cell to select from. By default, the selection
anchor will be used.

<a id="head-1" name="head-1"></a>

#### head?

> `optional` **head**: `number`

A hit position of the table cell to select to. By default, the selection
head will be used.

***

<a id="defineTable" name="defineTable"></a>

## defineTable()

> **defineTable**(): `TableExtension`

### Returns

`TableExtension`

***

<a id="defineTableCommands" name="defineTableCommands"></a>

## defineTableCommands()

> **defineTableCommands**(): `TableCommandsExtension`

Adds commands for working with `table` nodes.

### Returns

`TableCommandsExtension`

***

<a id="defineTableHeaderCellSpec" name="defineTableHeaderCellSpec"></a>

## defineTableHeaderCellSpec()

> **defineTableHeaderCellSpec**(): `TableHeaderCellSpecExtension`

### Returns

`TableHeaderCellSpecExtension`

***

<a id="defineTablePlugins" name="defineTablePlugins"></a>

## defineTablePlugins()

> **defineTablePlugins**(): `PlainExtension`

### Returns

`PlainExtension`

***

<a id="exitTable" name="exitTable"></a>

## exitTable()

> **exitTable**(`state`, `dispatch`?, `view`?): `boolean`

When the selection is in a table node, create a default block after the table
table, and move the cursor there.

### Parameters

• **state**: [`EditorState`](https://prosemirror.net/docs/ref/#state.EditorState)

• **dispatch?**

• **view?**: [`EditorView`](https://prosemirror.net/docs/ref/#view.EditorView)

### Returns

`boolean`

***

<a id="insertTable" name="insertTable"></a>

## insertTable()

> **insertTable**(`options`): [`Command`](https://prosemirror.net/docs/ref/#state.Command)

Insert a table node with the given number of rows and columns, and optionally
a header row.

### Parameters

• **options**: [`InsertTableOptions`](table.md#InsertTableOptions)

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)

***

<a id="isCellSelection" name="isCellSelection"></a>

## isCellSelection()

> **isCellSelection**(`value`): `value is CellSelection`

Checks if the given object is a `CellSelection` instance.

### Parameters

• **value**: `unknown`

### Returns

`value is CellSelection`

***

<a id="selectTable" name="selectTable"></a>

## selectTable()

> **selectTable**(`options`?): [`Command`](https://prosemirror.net/docs/ref/#state.Command)

### Parameters

• **options?**: [`SelectTableOptions`](table.md#SelectTableOptions)

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)

***

<a id="selectTableCell" name="selectTableCell"></a>

## selectTableCell()

> **selectTableCell**(`options`?): [`Command`](https://prosemirror.net/docs/ref/#state.Command)

### Parameters

• **options?**: [`SelectTableCellOptions`](table.md#SelectTableCellOptions)

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)

***

<a id="selectTableColumn" name="selectTableColumn"></a>

## selectTableColumn()

> **selectTableColumn**(`options`?): [`Command`](https://prosemirror.net/docs/ref/#state.Command)

### Parameters

• **options?**: [`SelectTableColumnOptions`](table.md#SelectTableColumnOptions)

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)

***

<a id="selectTableRow" name="selectTableRow"></a>

## selectTableRow()

> **selectTableRow**(`options`?): [`Command`](https://prosemirror.net/docs/ref/#state.Command)

### Parameters

• **options?**: [`SelectTableRowOptions`](table.md#SelectTableRowOptions)

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)
