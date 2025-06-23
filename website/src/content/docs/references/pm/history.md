---
title: prosekit/pm/history
sidebar:
  label: pm/history
---

Re-exports from [prosemirror-history](https://github.com/ProseMirror/prosemirror-history).

## Variables

### redo {#redo}

<dl>

<dt>

<code data-typedoc-declaration><i>const</i> <a id="redo" href="#redo">redo</a>: [`Command`](state.md#command)</code>

</dt>

<dd>

A command function that redoes the last undone change, if any.

</dd>

</dl>

***

### redoNoScroll {#redonoscroll}

<dl>

<dt>

<code data-typedoc-declaration><i>const</i> <a id="redonoscroll" href="#redonoscroll">redoNoScroll</a>: [`Command`](state.md#command)</code>

</dt>

<dd>

A command function that redoes the last undone change. Don't
scroll the selection into view.

</dd>

</dl>

***

### undo {#undo}

<dl>

<dt>

<code data-typedoc-declaration><i>const</i> <a id="undo" href="#undo">undo</a>: [`Command`](state.md#command)</code>

</dt>

<dd>

A command function that undoes the last change, if any.

</dd>

</dl>

***

### undoNoScroll {#undonoscroll}

<dl>

<dt>

<code data-typedoc-declaration><i>const</i> <a id="undonoscroll" href="#undonoscroll">undoNoScroll</a>: [`Command`](state.md#command)</code>

</dt>

<dd>

A command function that undoes the last change. Don't scroll the
selection into view.

</dd>

</dl>

## Functions

### closeHistory() {#closehistory}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="closehistory-2" href="#closehistory-2">closeHistory</a>(`tr`: [`Transaction`](state.md#transaction)): [`Transaction`](state.md#transaction)</code>

</dt>

<dd>

Set a flag on the given transaction that will prevent further steps
from being appended to an existing history event (so that they
require a separate undo command to undo).

</dd>

</dl>

***

### history() {#history}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="history-2" href="#history-2">history</a>(`config?`: [`HistoryOptions`](https://prosemirror.net/docs/ref/#history.HistoryOptions)): [`ProseMirrorPlugin`](state.md#prosemirrorplugin)</code>

</dt>

<dd>

Returns a plugin that enables the undo history for an editor. The
plugin will track undo and redo stacks, which can be used with the
[`undo`](https://prosemirror.net/docs/ref/#history.undo) and [`redo`](https://prosemirror.net/docs/ref/#history.redo) commands.

You can set an `"addToHistory"` [metadata
property](https://prosemirror.net/docs/ref/#state.Transaction.setMeta) of `false` on a transaction
to prevent it from being rolled back by undo.

</dd>

</dl>

***

### redoDepth() {#redodepth}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="redodepth-2" href="#redodepth-2">redoDepth</a>(`state`: [`EditorState`](state.md#editorstate)): `any`</code>

</dt>

<dd>

The amount of redoable events available in a given editor state.

</dd>

</dl>

***

### undoDepth() {#undodepth}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="undodepth-2" href="#undodepth-2">undoDepth</a>(`state`: [`EditorState`](state.md#editorstate)): `any`</code>

</dt>

<dd>

The amount of undoable events available in a given state.

</dd>

</dl>
