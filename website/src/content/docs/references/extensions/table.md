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

##### col {#col}

```ts
col: number;
```

The number of columns in the table.

<!-- DEBUG inheritance start kind=1024 -->

##### header? {#header}

```ts
optional header: boolean;
```

Whether the table has a header row.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### row {#row}

```ts
row: number;
```

The number of rows in the table.

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### SelectTableCellOptions {#selecttablecelloptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### pos? {#pos}

```ts
optional pos: number;
```

A hit position of the table cell to select from. By default, the selection
anchor will be used.

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### SelectTableColumnOptions {#selecttablecolumnoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### anchor? {#anchor}

```ts
optional anchor: number;
```

A hit position of the table cell to select from. By default, the selection
anchor will be used.

<!-- DEBUG inheritance start kind=1024 -->

##### head? {#head}

```ts
optional head: number;
```

A hit position of the table cell to select to. By default, the selection
head will be used.

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### SelectTableOptions {#selecttableoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### pos? {#pos-1}

```ts
optional pos: number;
```

A hit position of the table to select from. By default, the selection
anchor will be used.

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### SelectTableRowOptions {#selecttablerowoptions}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### anchor? {#anchor-1}

```ts
optional anchor: number;
```

A hit position of the table cell to select from. By default, the selection
anchor will be used.

<!-- DEBUG inheritance start kind=1024 -->

##### head? {#head-1}

```ts
optional head: number;
```

A hit position of the table cell to select to. By default, the selection
head will be used.

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

## Variables

### exitTable {#exittable}

```ts
const exitTable: Command;
```

When the selection is in a table node, create a default block after the table
table, and move the cursor there.

<!-- DEBUG inheritance start kind=32 -->

## Functions

### defineTable() {#definetable}

```ts
function defineTable(): TableExtension;
```

#### Returns

`TableExtension`

<!-- DEBUG inheritance start kind=4096 -->

***

### defineTableCommands() {#definetablecommands}

```ts
function defineTableCommands(): TableCommandsExtension;
```

Adds commands for working with `table` nodes.

#### Returns

`TableCommandsExtension`

<!-- DEBUG inheritance start kind=4096 -->

***

### defineTableHeaderCellSpec() {#definetableheadercellspec}

```ts
function defineTableHeaderCellSpec(): TableHeaderCellSpecExtension;
```

#### Returns

`TableHeaderCellSpecExtension`

<!-- DEBUG inheritance start kind=4096 -->

***

### defineTablePlugins() {#definetableplugins}

```ts
function defineTablePlugins(): PlainExtension;
```

#### Returns

`PlainExtension`

<!-- DEBUG inheritance start kind=4096 -->

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

<!-- DEBUG inheritance start kind=4096 -->

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

<!-- DEBUG inheritance start kind=4096 -->

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

<!-- DEBUG inheritance start kind=4096 -->

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

<!-- DEBUG inheritance start kind=4096 -->

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

<!-- DEBUG inheritance start kind=4096 -->

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

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG memberWithGroups 10 -->
