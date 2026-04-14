---
title: prosekit/extensions/table
sidebar:
  label: extensions/table
---

## Interfaces

### InsertTableOptions {#inserttableoptions}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="row" href="#row">row</a>: `number`</code>

</dt>

<dd>

The number of rows in the table.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="col" href="#col">col</a>: `number`</code>

</dt>

<dd>

The number of columns in the table.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="header" href="#header">header</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the table has a header row.

###### Default

`false`

</dd>

</dl>

***

### SelectTableCellOptions {#selecttablecelloptions}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="pos" href="#pos">pos</a><i>?</i>: `number`</code>

</dt>

<dd>

A hit position of the table cell to select from. By default, the selection
anchor will be used.

</dd>

</dl>

***

### SelectTableColumnOptions {#selecttablecolumnoptions}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="anchor" href="#anchor">anchor</a><i>?</i>: `number`</code>

</dt>

<dd>

A hit position of the table cell to select from. By default, the selection
anchor will be used.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="head" href="#head">head</a><i>?</i>: `number`</code>

</dt>

<dd>

A hit position of the table cell to select to. By default, the selection
head will be used.

</dd>

</dl>

***

### SelectTableRowOptions {#selecttablerowoptions}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="anchor-1" href="#anchor-1">anchor</a><i>?</i>: `number`</code>

</dt>

<dd>

A hit position of the table cell to select from. By default, the selection
anchor will be used.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="head-1" href="#head-1">head</a><i>?</i>: `number`</code>

</dt>

<dd>

A hit position of the table cell to select to. By default, the selection
head will be used.

</dd>

</dl>

***

### SelectTableOptions {#selecttableoptions}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="pos-1" href="#pos-1">pos</a><i>?</i>: `number`</code>

</dt>

<dd>

A hit position of the table to select from. By default, the selection
anchor will be used.

</dd>

</dl>

***

### MoveTableRowOptions {#movetablerowoptions}

Options for moveTableRow

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="from" href="#from">from</a>: `number`</code>

</dt>

<dd>

The source row index to move from.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="to" href="#to">to</a>: `number`</code>

</dt>

<dd>

The destination row index to move to.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="select" href="#select">select</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to select the moved row after the operation.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="pos-2" href="#pos-2">pos</a><i>?</i>: `number`</code>

</dt>

<dd>

Optional position to resolve table from. If not provided, uses the current selection.

</dd>

</dl>

***

### MoveTableColumnOptions {#movetablecolumnoptions}

Options for moveTableColumn

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="from-1" href="#from-1">from</a>: `number`</code>

</dt>

<dd>

The source column index to move from.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="to-1" href="#to-1">to</a>: `number`</code>

</dt>

<dd>

The destination column index to move to.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="select-1" href="#select-1">select</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to select the moved column after the operation.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="pos-3" href="#pos-3">pos</a><i>?</i>: `number`</code>

</dt>

<dd>

Optional position to resolve table from. If not provided, uses the current selection.

</dd>

</dl>

## Variables

### exitTable {#exittable}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="exittable" href="#exittable">exitTable</a>: [`Command`](../pm/state.md#command)</code>

</dt>

<dd>

When the selection is in a table node, create a default block after the table
table, and move the cursor there.

</dd>

</dl>

## Functions

### defineTableCommands() {#definetablecommands}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definetablecommands" href="#definetablecommands">defineTableCommands</a>(): `TableCommandsExtension`</code>

</dt>

<dd>

Adds commands for working with `table` nodes.

</dd>

</dl>

***

### insertTable() {#inserttable}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="inserttable" href="#inserttable">insertTable</a>(`options`: [`InsertTableOptions`](#inserttableoptions)): [`Command`](../pm/state.md#command)</code>

</dt>

<dd>

Insert a table node with the given number of rows and columns, and optionally
a header row.

</dd>

</dl>

***

### selectTableCell() {#selecttablecell}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="selecttablecell" href="#selecttablecell">selectTableCell</a>(`options?`: [`SelectTableCellOptions`](#selecttablecelloptions)): [`Command`](../pm/state.md#command)</code>

</dt>

<dd>

</dd>

</dl>

***

### selectTableColumn() {#selecttablecolumn}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="selecttablecolumn" href="#selecttablecolumn">selectTableColumn</a>(`options?`: [`SelectTableColumnOptions`](#selecttablecolumnoptions)): [`Command`](../pm/state.md#command)</code>

</dt>

<dd>

</dd>

</dl>

***

### selectTableRow() {#selecttablerow}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="selecttablerow" href="#selecttablerow">selectTableRow</a>(`options?`: [`SelectTableRowOptions`](#selecttablerowoptions)): [`Command`](../pm/state.md#command)</code>

</dt>

<dd>

</dd>

</dl>

***

### selectTable() {#selecttable}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="selecttable" href="#selecttable">selectTable</a>(`options?`: [`SelectTableOptions`](#selecttableoptions)): [`Command`](../pm/state.md#command)</code>

</dt>

<dd>

</dd>

</dl>

***

### defineTablePlugins() {#definetableplugins}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definetableplugins" href="#definetableplugins">defineTablePlugins</a>(): `PlainExtension`</code>

</dt>

<dd>

</dd>

</dl>

***

### defineTableHeaderCellSpec() {#definetableheadercellspec}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definetableheadercellspec" href="#definetableheadercellspec">defineTableHeaderCellSpec</a>(): `TableHeaderCellSpecExtension`</code>

</dt>

</dl>

***

### isCellSelection() {#iscellselection}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="iscellselection" href="#iscellselection">isCellSelection</a>(`value`: `unknown`): `value is CellSelection`</code>

</dt>

<dd>

Checks if the given object is a `CellSelection` instance.

</dd>

</dl>

***

### defineTable() {#definetable}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definetable" href="#definetable">defineTable</a>(): `TableExtension`</code>

</dt>

<dd>

</dd>

</dl>

***

### moveTableRow() {#movetablerow}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="movetablerow" href="#movetablerow">moveTableRow</a>(`options`: [`MoveTableRowOptions`](#movetablerowoptions)): [`Command`](../pm/state.md#command)</code>

</dt>

<dd>

Move a table row from index `from` to index `to`.

</dd>

</dl>

***

### moveTableColumn() {#movetablecolumn}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="movetablecolumn" href="#movetablecolumn">moveTableColumn</a>(`options`: [`MoveTableColumnOptions`](#movetablecolumnoptions)): [`Command`](../pm/state.md#command)</code>

</dt>

<dd>

Move a table column from index `from` to index `to`.

</dd>

</dl>

***

### findTable() {#findtable}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="findtable" href="#findtable">findTable</a>(`$pos`: [`ResolvedPos`](../pm/model.md#resolvedpos)): `FindNodeResult` \| `null`</code>

</dt>

<dd>

Find the closest table node for a given position.

</dd>

</dl>
