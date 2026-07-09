---
title: prosekit/extensions/table
sidebar:
  label: extensions/table
---

## Classes

### TableView {#tableview}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor" href="#constructor">TableView</a>(`node`: [`EditorNode`](../pm/model.md#editornode), `defaultCellMinWidth`: `number`): [`TableView`](#tableview)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="node" href="#node">node</a>: [`EditorNode`](../pm/model.md#editornode)</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="defaultcellminwidth-1" href="#defaultcellminwidth-1">defaultCellMinWidth</a>: `number`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="dom" href="#dom">dom</a>: [`HTMLDivElement`](https://developer.mozilla.org/docs/Web/API/HTMLDivElement)</code>

</dt>

<dd>

The outer DOM node that represents the document node.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="table" href="#table">table</a>: [`HTMLTableElement`](https://developer.mozilla.org/docs/Web/API/HTMLTableElement)</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="colgroup" href="#colgroup">colgroup</a>: [`HTMLTableColElement`](https://developer.mozilla.org/docs/Web/API/HTMLTableColElement)</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="contentdom" href="#contentdom">contentDOM</a>: [`HTMLTableSectionElement`](https://developer.mozilla.org/docs/Web/API/HTMLTableSectionElement)</code>

</dt>

<dd>

The DOM node that should hold the node's content. Only meaningful
if the node view also defines a `dom` property and if its node
type is not a leaf node type. When this is present, ProseMirror
will take care of rendering the node's children into it. When it
is not present, the node view itself is responsible for rendering
(or deciding not to render) its child nodes.

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="update" href="#update">update</a>(`node`: [`EditorNode`](../pm/model.md#editornode)): `boolean`</code>

</dt>

<dd>

When given, this will be called when the view is updating
itself. It will be given a node, an array of active decorations
around the node (which are automatically drawn, and the node
view may ignore if it isn't interested in them), and a
[decoration source](https://prosemirror.net/docs/ref/#view.DecorationSource) that represents any
decorations that apply to the content of the node (which again
may be ignored). It should return true if it was able to update
to that node, and false otherwise. If the node view has a
`contentDOM` property (or no `dom` property), updating its child
nodes will be handled by ProseMirror.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="ignoremutation" href="#ignoremutation">ignoreMutation</a>(`record`: [`ViewMutationRecord`](../pm/view.md#viewmutationrecord)): `boolean`</code>

</dt>

<dd>

Called when a [mutation](https://prosemirror.net/docs/ref/#view.ViewMutationRecord) happens within the
view. Return false if the editor should re-read the selection or re-parse
the range around the mutation, true if it can safely be ignored.

</dd>

</dl>

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

## Type Aliases

### ColumnResizingOptions {#columnresizingoptions}

<code data-typedoc-code>type <a id="columnresizingoptions" href="#columnresizingoptions">ColumnResizingOptions</a> = \{ `handleWidth?`: `number`; `cellMinWidth?`: `number`; `defaultCellMinWidth?`: `number`; `lastColumnResizable?`: `boolean`; `View?`: ((`node`: [`EditorNode`](../pm/model.md#editornode), `cellMinWidth`: `number`, `view`: [`EditorView`](../pm/view.md#editorview)) => [`NodeView`](../pm/view.md#nodeview)) \| `null`; \}</code>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="handlewidth" href="#handlewidth">handleWidth</a><i>?</i>: `number`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="cellminwidth" href="#cellminwidth">cellMinWidth</a><i>?</i>: `number`</code>

</dt>

<dd>

Minimum width of a cell /column. The column cannot be resized smaller than this.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="defaultcellminwidth" href="#defaultcellminwidth">defaultCellMinWidth</a><i>?</i>: `number`</code>

</dt>

<dd>

The default minWidth of a cell / column when it doesn't have an explicit width (i.e.: it has not been resized manually)

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="lastcolumnresizable" href="#lastcolumnresizable">lastColumnResizable</a><i>?</i>: `boolean`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="view" href="#view">View</a><i>?</i>: ((`node`: [`EditorNode`](../pm/model.md#editornode), `cellMinWidth`: `number`, `view`: [`EditorView`](../pm/view.md#editorview)) => [`NodeView`](../pm/view.md#nodeview)) \| `null`</code>

</dt>

<dd>

A custom node view for the rendering table nodes. By default, the plugin
uses the [TableView](#tableview) class. You can explicitly set this to `null` to
not use a custom node view.

</dd>

</dl>

***

### TableEditingOptions {#tableeditingoptions}

<code data-typedoc-code>type <a id="tableeditingoptions" href="#tableeditingoptions">TableEditingOptions</a> = \{ `allowTableNodeSelection?`: `boolean`; \}</code>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="allowtablenodeselection" href="#allowtablenodeselection">allowTableNodeSelection</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to allow table node selection.

By default, any node selection wrapping a table will be converted into a
CellSelection wrapping all cells in the table. You can pass `true` to allow
the selection to remain a NodeSelection.

###### Default

`false`

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

</dl>

***

### selectTableColumn() {#selecttablecolumn}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="selecttablecolumn" href="#selecttablecolumn">selectTableColumn</a>(`options?`: [`SelectTableColumnOptions`](#selecttablecolumnoptions)): [`Command`](../pm/state.md#command)</code>

</dt>

</dl>

***

### selectTableRow() {#selecttablerow}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="selecttablerow" href="#selecttablerow">selectTableRow</a>(`options?`: [`SelectTableRowOptions`](#selecttablerowoptions)): [`Command`](../pm/state.md#command)</code>

</dt>

</dl>

***

### selectTable() {#selecttable}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="selecttable" href="#selecttable">selectTable</a>(`options?`: [`SelectTableOptions`](#selecttableoptions)): [`Command`](../pm/state.md#command)</code>

</dt>

</dl>

***

### defineTableEditingPlugin() {#definetableeditingplugin}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definetableeditingplugin" href="#definetableeditingplugin">defineTableEditingPlugin</a>(`options?`: [`TableEditingOptions`](#tableeditingoptions)): `PlainExtension`</code>

</dt>

</dl>

***

### defineColumnResizingPlugin() {#definecolumnresizingplugin}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definecolumnresizingplugin" href="#definecolumnresizingplugin">defineColumnResizingPlugin</a>(`options?`: [`ColumnResizingOptions`](#columnresizingoptions)): `PlainExtension`</code>

</dt>

</dl>

***

### defineTablePlugins() {#definetableplugins}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definetableplugins" href="#definetableplugins">defineTablePlugins</a>(): `PlainExtension`</code>

</dt>

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

</dl>

***

### addTableColumnBefore() {#addtablecolumnbefore}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="addtablecolumnbefore" href="#addtablecolumnbefore">addTableColumnBefore</a>(`state`: [`EditorState`](../pm/state.md#editorstate), `dispatch?`: (`tr`: [`Transaction`](../pm/state.md#transaction)) => `void`): `boolean`</code>

</dt>

<dd>

Command to add a column before the column with the selection.

</dd>

</dl>

***

### addTableColumnAfter() {#addtablecolumnafter}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="addtablecolumnafter" href="#addtablecolumnafter">addTableColumnAfter</a>(`state`: [`EditorState`](../pm/state.md#editorstate), `dispatch?`: (`tr`: [`Transaction`](../pm/state.md#transaction)) => `void`): `boolean`</code>

</dt>

<dd>

Command to add a column after the column with the selection.

</dd>

</dl>

***

### deleteTableColumn() {#deletetablecolumn}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="deletetablecolumn" href="#deletetablecolumn">deleteTableColumn</a>(`state`: [`EditorState`](../pm/state.md#editorstate), `dispatch?`: (`tr`: [`Transaction`](../pm/state.md#transaction)) => `void`): `boolean`</code>

</dt>

<dd>

Command function that removes the selected columns from a table.

</dd>

</dl>

***

### addTableRowAbove() {#addtablerowabove}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="addtablerowabove" href="#addtablerowabove">addTableRowAbove</a>(`state`: [`EditorState`](../pm/state.md#editorstate), `dispatch?`: (`tr`: [`Transaction`](../pm/state.md#transaction)) => `void`): `boolean`</code>

</dt>

<dd>

Add a table row before the selection.

</dd>

</dl>

***

### addTableRowBelow() {#addtablerowbelow}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="addtablerowbelow" href="#addtablerowbelow">addTableRowBelow</a>(`state`: [`EditorState`](../pm/state.md#editorstate), `dispatch?`: (`tr`: [`Transaction`](../pm/state.md#transaction)) => `void`): `boolean`</code>

</dt>

<dd>

Add a table row after the selection.

</dd>

</dl>

***

### deleteTableRow() {#deletetablerow}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="deletetablerow" href="#deletetablerow">deleteTableRow</a>(`state`: [`EditorState`](../pm/state.md#editorstate), `dispatch?`: (`tr`: [`Transaction`](../pm/state.md#transaction)) => `void`): `boolean`</code>

</dt>

<dd>

Remove the selected rows from a table.

</dd>

</dl>

***

### mergeTableCells() {#mergetablecells}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="mergetablecells" href="#mergetablecells">mergeTableCells</a>(`state`: [`EditorState`](../pm/state.md#editorstate), `dispatch?`: (`tr`: [`Transaction`](../pm/state.md#transaction)) => `void`): `boolean`</code>

</dt>

<dd>

Merge the selected cells into a single cell. Only available when
the selected cells' outline forms a rectangle.

</dd>

</dl>

***

### splitTableCell() {#splittablecell}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="splittablecell" href="#splittablecell">splitTableCell</a>(`state`: [`EditorState`](../pm/state.md#editorstate), `dispatch?`: (`tr`: [`Transaction`](../pm/state.md#transaction)) => `void`): `boolean`</code>

</dt>

<dd>

Split a selected cell, whose rowpan or colspan is greater than one,
into smaller cells. Use the first cell type for the new cells.

</dd>

</dl>

***

### deleteTable() {#deletetable}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="deletetable" href="#deletetable">deleteTable</a>(`state`: [`EditorState`](../pm/state.md#editorstate), `dispatch?`: (`tr`: [`Transaction`](../pm/state.md#transaction)) => `void`): `boolean`</code>

</dt>

<dd>

Deletes the table around the selection, if any.

</dd>

</dl>

***

### deleteCellSelection() {#deletecellselection}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="deletecellselection" href="#deletecellselection">deleteCellSelection</a>(`state`: [`EditorState`](../pm/state.md#editorstate), `dispatch?`: (`tr`: [`Transaction`](../pm/state.md#transaction)) => `void`): `boolean`</code>

</dt>

<dd>

Deletes the content of the selected cells, if they are not empty.

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
