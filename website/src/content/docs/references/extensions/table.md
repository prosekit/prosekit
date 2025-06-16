---
title: prosekit/extensions/table
sidebar:
  label: extensions/table
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Interfaces

### InsertTableOptions {#inserttableoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="col"></a> `col`

</td>
<td>

`number`

</td>
<td>

The number of columns in the table.

</td>
</tr>
<tr>
<td>

<a id="header"></a> `header?`

</td>
<td>

`boolean`

</td>
<td>

Whether the table has a header row.

**Default**

```ts
false
```

</td>
</tr>
<tr>
<td>

<a id="row"></a> `row`

</td>
<td>

`number`

</td>
<td>

The number of rows in the table.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### SelectTableCellOptions {#selecttablecelloptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="pos"></a> `pos?`

</td>
<td>

`number`

</td>
<td>

A hit position of the table cell to select from. By default, the selection
anchor will be used.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### SelectTableColumnOptions {#selecttablecolumnoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="anchor"></a> `anchor?`

</td>
<td>

`number`

</td>
<td>

A hit position of the table cell to select from. By default, the selection
anchor will be used.

</td>
</tr>
<tr>
<td>

<a id="head"></a> `head?`

</td>
<td>

`number`

</td>
<td>

A hit position of the table cell to select to. By default, the selection
head will be used.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### SelectTableOptions {#selecttableoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="pos-1"></a> `pos?`

</td>
<td>

`number`

</td>
<td>

A hit position of the table to select from. By default, the selection
anchor will be used.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### SelectTableRowOptions {#selecttablerowoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="anchor-1"></a> `anchor?`

</td>
<td>

`number`

</td>
<td>

A hit position of the table cell to select from. By default, the selection
anchor will be used.

</td>
</tr>
<tr>
<td>

<a id="head-1"></a> `head?`

</td>
<td>

`number`

</td>
<td>

A hit position of the table cell to select to. By default, the selection
head will be used.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

## Variables

### exitTable {#exittable}

```ts
const exitTable: Command;
```

When the selection is in a table node, create a default block after the table
table, and move the cursor there.

## Functions

### defineTable() {#definetable}

```ts
function defineTable(): TableExtension;
```

#### Returns

`TableExtension`

***

### defineTableCommands() {#definetablecommands}

```ts
function defineTableCommands(): TableCommandsExtension;
```

Adds commands for working with `table` nodes.

#### Returns

`TableCommandsExtension`

***

### defineTableHeaderCellSpec() {#definetableheadercellspec}

```ts
function defineTableHeaderCellSpec(): TableHeaderCellSpecExtension;
```

#### Returns

`TableHeaderCellSpecExtension`

***

### defineTablePlugins() {#definetableplugins}

```ts
function defineTablePlugins(): PlainExtension;
```

#### Returns

`PlainExtension`

***

### insertTable() {#inserttable}

```ts
function insertTable(options: InsertTableOptions): Command;
```

Insert a table node with the given number of rows and columns, and optionally
a header row.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`InsertTableOptions`](#inserttableoptions)

</td>
<td>

</td>
</tr>
</tbody>
</table>

#### Returns

[`Command`](../pm/state.md#command)

***

### isCellSelection() {#iscellselection}

```ts
function isCellSelection(value: unknown): value is CellSelection;
```

Checks if the given object is a `CellSelection` instance.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

#### Returns

`value is CellSelection`

***

### selectTable() {#selecttable}

```ts
function selectTable(options?: SelectTableOptions): Command;
```

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options?`

</td>
<td>

[`SelectTableOptions`](#selecttableoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Command`](../pm/state.md#command)

***

### selectTableCell() {#selecttablecell}

```ts
function selectTableCell(options?: SelectTableCellOptions): Command;
```

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options?`

</td>
<td>

[`SelectTableCellOptions`](#selecttablecelloptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Command`](../pm/state.md#command)

***

### selectTableColumn() {#selecttablecolumn}

```ts
function selectTableColumn(options?: SelectTableColumnOptions): Command;
```

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options?`

</td>
<td>

[`SelectTableColumnOptions`](#selecttablecolumnoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Command`](../pm/state.md#command)

***

### selectTableRow() {#selecttablerow}

```ts
function selectTableRow(options?: SelectTableRowOptions): Command;
```

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options?`

</td>
<td>

[`SelectTableRowOptions`](#selecttablerowoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Command`](../pm/state.md#command)

<!-- DEBUG memberWithGroups 10 -->
