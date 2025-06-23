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

<code data-typedoc-declaration><i></i> <a id="col" href="#col">col</a>: `number`</code>

</dt>

<dd>

The number of columns in the table.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="header" href="#header">header</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the table has a header row.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="row" href="#row">row</a>: `number`</code>

</dt>

<dd>

The number of rows in the table.

</dd>

</dl>

***

### SelectTableCellOptions {#selecttablecelloptions}

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="pos" href="#pos">pos</a><i>?</i>: `number`</code>

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

<code data-typedoc-declaration><i></i> <a id="anchor" href="#anchor">anchor</a><i>?</i>: `number`</code>

</dt>

<dd>

A hit position of the table cell to select from. By default, the selection
anchor will be used.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="head" href="#head">head</a><i>?</i>: `number`</code>

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

<code data-typedoc-declaration><i></i> <a id="pos-1" href="#pos-1">pos</a><i>?</i>: `number`</code>

</dt>

<dd>

A hit position of the table to select from. By default, the selection
anchor will be used.

</dd>

</dl>

***

### SelectTableRowOptions {#selecttablerowoptions}

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="anchor-1" href="#anchor-1">anchor</a><i>?</i>: `number`</code>

</dt>

<dd>

A hit position of the table cell to select from. By default, the selection
anchor will be used.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="head-1" href="#head-1">head</a><i>?</i>: `number`</code>

</dt>

<dd>

A hit position of the table cell to select to. By default, the selection
head will be used.

</dd>

</dl>

## Variables

### exitTable {#exittable}

<dl>

<dt>

<code data-typedoc-declaration><i>const</i> <a id="exittable" href="#exittable">exitTable</a>: [`Command`](../pm/state.md#command)</code>

</dt>

<dd>

When the selection is in a table node, create a default block after the table
table, and move the cursor there.

</dd>

</dl>

## Functions

### defineTable() {#definetable}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definetable-2" href="#definetable-2">defineTable</a>(): `TableExtension`</code>

</dt>

<dd>

</dd>

</dl>

***

### defineTableCommands() {#definetablecommands}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definetablecommands-2" href="#definetablecommands-2">defineTableCommands</a>(): `TableCommandsExtension`</code>

</dt>

<dd>

Adds commands for working with `table` nodes.

</dd>

</dl>

***

### defineTableHeaderCellSpec() {#definetableheadercellspec}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definetableheadercellspec-2" href="#definetableheadercellspec-2">defineTableHeaderCellSpec</a>(): `TableHeaderCellSpecExtension`</code>

</dt>

</dl>

***

### defineTablePlugins() {#definetableplugins}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definetableplugins-2" href="#definetableplugins-2">defineTablePlugins</a>(): `PlainExtension`</code>

</dt>

<dd>

</dd>

</dl>

***

### insertTable() {#inserttable}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="inserttable-2" href="#inserttable-2">insertTable</a>(`options`: [`InsertTableOptions`](#inserttableoptions)): [`Command`](../pm/state.md#command)</code>

</dt>

<dd>

Insert a table node with the given number of rows and columns, and optionally
a header row.

</dd>

</dl>

***

### isCellSelection() {#iscellselection}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="iscellselection-2" href="#iscellselection-2">isCellSelection</a>(`value`: `unknown`): `value is CellSelection`</code>

</dt>

<dd>

Checks if the given object is a `CellSelection` instance.

</dd>

</dl>

***

### selectTable() {#selecttable}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="selecttable-2" href="#selecttable-2">selectTable</a>(`options?`: [`SelectTableOptions`](#selecttableoptions)): [`Command`](../pm/state.md#command)</code>

</dt>

<dd>

</dd>

</dl>

***

### selectTableCell() {#selecttablecell}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="selecttablecell-2" href="#selecttablecell-2">selectTableCell</a>(`options?`: [`SelectTableCellOptions`](#selecttablecelloptions)): [`Command`](../pm/state.md#command)</code>

</dt>

<dd>

</dd>

</dl>

***

### selectTableColumn() {#selecttablecolumn}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="selecttablecolumn-2" href="#selecttablecolumn-2">selectTableColumn</a>(`options?`: [`SelectTableColumnOptions`](#selecttablecolumnoptions)): [`Command`](../pm/state.md#command)</code>

</dt>

<dd>

</dd>

</dl>

***

### selectTableRow() {#selecttablerow}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="selecttablerow-2" href="#selecttablerow-2">selectTableRow</a>(`options?`: [`SelectTableRowOptions`](#selecttablerowoptions)): [`Command`](../pm/state.md#command)</code>

</dt>

<dd>

</dd>

</dl>
