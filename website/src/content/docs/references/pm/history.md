---
title: prosekit/pm/history
sidebar:
  label: pm/history
---

<!-- DEBUG memberWithGroups 1 -->

Re-exports from [prosemirror-history](https://github.com/ProseMirror/prosemirror-history).

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Variables

### redo {#redo}

```ts
const redo: Command;
```

A command function that redoes the last undone change, if any.

<!-- DEBUG inheritance start kind=32 -->

***

### redoNoScroll {#redonoscroll}

```ts
const redoNoScroll: Command;
```

A command function that redoes the last undone change. Don't
scroll the selection into view.

<!-- DEBUG inheritance start kind=32 -->

***

### undo {#undo}

```ts
const undo: Command;
```

A command function that undoes the last change, if any.

<!-- DEBUG inheritance start kind=32 -->

***

### undoNoScroll {#undonoscroll}

```ts
const undoNoScroll: Command;
```

A command function that undoes the last change. Don't scroll the
selection into view.

<!-- DEBUG inheritance start kind=32 -->

## Functions

### closeHistory() {#closehistory}

```ts
function closeHistory(tr: Transaction): Transaction;
```

Set a flag on the given transaction that will prevent further steps
from being appended to an existing history event (so that they
require a separate undo command to undo).

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

`tr`

</td>
<td>

[`Transaction`](state.md#transaction)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Transaction`](state.md#transaction)

<!-- DEBUG inheritance start kind=4096 -->

***

### history() {#history}

```ts
function history(config?: HistoryOptions): ProseMirrorPlugin;
```

Returns a plugin that enables the undo history for an editor. The
plugin will track undo and redo stacks, which can be used with the
[`undo`](https://prosemirror.net/docs/ref/#history.undo) and [`redo`](https://prosemirror.net/docs/ref/#history.redo) commands.

You can set an `"addToHistory"` [metadata
property](https://prosemirror.net/docs/ref/#state.Transaction.setMeta) of `false` on a transaction
to prevent it from being rolled back by undo.

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

`config?`

</td>
<td>

[`HistoryOptions`](https://prosemirror.net/docs/ref/#history.HistoryOptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`ProseMirrorPlugin`](state.md#prosemirrorplugin)

<!-- DEBUG inheritance start kind=4096 -->

***

### redoDepth() {#redodepth}

```ts
function redoDepth(state: EditorState): any;
```

The amount of redoable events available in a given editor state.

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

`state`

</td>
<td>

[`EditorState`](state.md#editorstate)

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

<!-- DEBUG inheritance start kind=4096 -->

***

### undoDepth() {#undodepth}

```ts
function undoDepth(state: EditorState): any;
```

The amount of undoable events available in a given state.

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

`state`

</td>
<td>

[`EditorState`](state.md#editorstate)

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG memberWithGroups 10 -->
