---
title: prosekit/pm/history
sidebar:
  label: pm/history
---


Re-exports from [prosemirror-history](https://github.com/ProseMirror/prosemirror-history).

## closeHistory {#close-history}

```ts
function closeHistory(tr: Transaction): Transaction
```

Set a flag on the given transaction that will prevent further steps
from being appended to an existing history event (so that they
require a separate undo command to undo).

## history {#history}

```ts
function history(config?: HistoryOptions): ProseMirrorPlugin
```

Returns a plugin that enables the undo history for an editor. The
plugin will track undo and redo stacks, which can be used with the
[`undo`](https://prosemirror.net/docs/ref/#history.undo) and [`redo`](https://prosemirror.net/docs/ref/#history.redo) commands.

You can set an `"addToHistory"` [metadata
property](https://prosemirror.net/docs/ref/#state.Transaction.setMeta) of `false` on a transaction
to prevent it from being rolled back by undo.

## redo {#redo}

A command function that redoes the last undone change, if any.

```ts
function redo(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean
```

## redoDepth {#redo-depth}

```ts
function redoDepth(state: EditorState): any
```

The amount of redoable events available in a given editor state.

## redoNoScroll {#redo-no-scroll}

A command function that redoes the last undone change. Don't
scroll the selection into view.

```ts
function redoNoScroll(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean
```

## undo {#undo-2}

A command function that undoes the last change, if any.

```ts
function undo(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean
```

## undoDepth {#undo-depth}

```ts
function undoDepth(state: EditorState): any
```

The amount of undoable events available in a given state.

## undoNoScroll {#undo-no-scroll}

A command function that undoes the last change. Don't scroll the
selection into view.

```ts
function undoNoScroll(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean
```
