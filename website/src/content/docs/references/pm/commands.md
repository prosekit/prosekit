---
title: prosekit/pm/commands
sidebar:
  label: pm/commands
---


Re-exports from [prosemirror-commands](https://github.com/ProseMirror/prosemirror-commands)

## baseKeymap {#base-keymap}

Depending on the detected platform, this will hold
[`pcBasekeymap`](https://prosemirror.net/docs/ref/#commands.pcBaseKeymap) or
[`macBaseKeymap`](https://prosemirror.net/docs/ref/#commands.macBaseKeymap).

**Type**: `{ [key]: Command }`

## macBaseKeymap {#mac-base-keymap}

A copy of `pcBaseKeymap` that also binds **Ctrl-h** like Backspace,
**Ctrl-d** like Delete, **Alt-Backspace** like Ctrl-Backspace, and
**Ctrl-Alt-Backspace**, **Alt-Delete**, and **Alt-d** like
Ctrl-Delete.

**Type**: `{ [key]: Command }`

## pcBaseKeymap {#pc-base-keymap}

A basic keymap containing bindings not specific to any schema.
Binds the following keys (when multiple commands are listed, they
are chained with [`chainCommands`](https://prosemirror.net/docs/ref/#commands.chainCommands)):

* **Enter** to `newlineInCode`, `createParagraphNear`, `liftEmptyBlock`, `splitBlock`
* **Mod-Enter** to `exitCode`
* **Backspace** and **Mod-Backspace** to `deleteSelection`, `joinBackward`, `selectNodeBackward`
* **Delete** and **Mod-Delete** to `deleteSelection`, `joinForward`, `selectNodeForward`
* **Mod-Delete** to `deleteSelection`, `joinForward`, `selectNodeForward`
* **Mod-a** to `selectAll`

**Type**: `{ [key]: Command }`

## autoJoin {#auto-join}

```ts
function autoJoin(command: Command, isJoinable: readonly string[] | ((before: ProseMirrorNode, after: ProseMirrorNode) => boolean)): Command
```

Wrap a command so that, when it produces a transform that causes
two joinable nodes to end up next to each other, those are joined.
Nodes are considered joinable when they are of the same type and
when the `isJoinable` predicate returns true for them or, if an
array of strings was passed, if their node type name is in that
array.

## chainCommands {#chain-commands}

```ts
function chainCommands(...commands: readonly Command[]): Command
```

Combine a number of command functions into a single function (which
calls them one by one until one returns true).

## createParagraphNear {#create-paragraph-near}

If a block node is selected, create an empty paragraph before (if
it is its parent's first child) or after it.

```ts
function createParagraphNear(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean
```

## deleteSelection {#delete-selection}

Delete the selection, if there is one.

```ts
function deleteSelection(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean
```

## exitCode {#exit-code}

When the selection is in a node with a truthy
[`code`](https://prosemirror.net/docs/ref/#model.NodeSpec.code) property in its spec, create a
default block after the code block, and move the cursor there.

```ts
function exitCode(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean
```

## joinBackward {#join-backward}

If the selection is empty and at the start of a textblock, try to
reduce the distance between that block and the one before it—if
there's a block directly before it that can be joined, join them.
If not, try to move the selected block closer to the next one in
the document structure by lifting it out of its parent or moving it
into a parent of the previous block. Will use the view for accurate
(bidi-aware) start-of-textblock detection if given.

```ts
function joinBackward(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean
```

## joinDown {#join-down}

Join the selected block, or the closest ancestor of the selection
that can be joined, with the sibling after it.

```ts
function joinDown(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean
```

## joinForward {#join-forward}

If the selection is empty and the cursor is at the end of a
textblock, try to reduce or remove the boundary between that block
and the one after it, either by joining them or by moving the other
block closer to this one in the tree structure. Will use the view
for accurate start-of-textblock detection if given.

```ts
function joinForward(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean
```

## joinTextblockBackward {#join-textblock-backward}

A more limited form of [`joinBackward`](https://prosemirror.net/docs/ref/#commands.joinBackward)
that only tries to join the current textblock to the one before
it, if the cursor is at the start of a textblock.

```ts
function joinTextblockBackward(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean
```

## joinTextblockForward {#join-textblock-forward}

A more limited form of [`joinForward`](https://prosemirror.net/docs/ref/#commands.joinForward)
that only tries to join the current textblock to the one after
it, if the cursor is at the end of a textblock.

```ts
function joinTextblockForward(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean
```

## joinUp {#join-up}

Join the selected block or, if there is a text selection, the
closest ancestor block of the selection that can be joined, with
the sibling above it.

```ts
function joinUp(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean
```

## lift {#lift}

Lift the selected block, or the closest ancestor block of the
selection that can be lifted, out of its parent node.

```ts
function lift(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean
```

## liftEmptyBlock {#lift-empty-block}

If the cursor is in an empty textblock that can be lifted, lift the
block.

```ts
function liftEmptyBlock(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean
```

## newlineInCode {#newline-in-code}

If the selection is in a node whose type has a truthy
[`code`](https://prosemirror.net/docs/ref/#model.NodeSpec.code) property in its spec, replace the
selection with a newline character.

```ts
function newlineInCode(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean
```

## selectAll {#select-all}

Select the whole document.

```ts
function selectAll(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean
```

## selectNodeBackward {#select-node-backward}

When the selection is empty and at the start of a textblock, select
the node before that textblock, if possible. This is intended to be
bound to keys like backspace, after
[`joinBackward`](https://prosemirror.net/docs/ref/#commands.joinBackward) or other deleting
commands, as a fall-back behavior when the schema doesn't allow
deletion at the selected point.

```ts
function selectNodeBackward(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean
```

## selectNodeForward {#select-node-forward}

When the selection is empty and at the end of a textblock, select
the node coming after that textblock, if possible. This is intended
to be bound to keys like delete, after
[`joinForward`](https://prosemirror.net/docs/ref/#commands.joinForward) and similar deleting
commands, to provide a fall-back behavior when the schema doesn't
allow deletion at the selected point.

```ts
function selectNodeForward(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean
```

## selectParentNode {#select-parent-node}

Move the selection to the node wrapping the current selection, if
any. (Will not select the document node.)

```ts
function selectParentNode(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean
```

## selectTextblockEnd {#select-textblock-end}

Moves the cursor to the end of current text block.

```ts
function selectTextblockEnd(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean
```

## selectTextblockStart {#select-textblock-start}

Moves the cursor to the start of current text block.

```ts
function selectTextblockStart(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean
```

## setBlockType {#set-block-type-1}

```ts
function setBlockType(nodeType: NodeType, attrs?: null | Attrs): Command
```

Returns a command that tries to set the selected textblocks to the
given node type with the given attributes.

## splitBlock {#split-block}

Split the parent block of the selection. If the selection is a text
selection, also delete its content.

```ts
function splitBlock(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean
```

## splitBlockAs {#split-block-as}

```ts
function splitBlockAs(splitNode?: (node: ProseMirrorNode, atEnd: boolean, $from: ResolvedPos) => null | ({ attrs?: Attrs; type: NodeType })): Command
```

Create a variant of [`splitBlock`](https://prosemirror.net/docs/ref/#commands.splitBlock) that uses
a custom function to determine the type of the newly split off block.

## splitBlockKeepMarks {#split-block-keep-marks}

Acts like [`splitBlock`](https://prosemirror.net/docs/ref/#commands.splitBlock), but without
resetting the set of active marks at the cursor.

```ts
function splitBlockKeepMarks(state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView): boolean
```

## toggleMark {#toggle-mark-1}

```ts
function toggleMark(markType: MarkType, attrs?: null | Attrs, options?: { enterInlineAtoms?: boolean; includeWhitespace?: boolean; removeWhenPresent?: boolean }): Command
```

Create a command function that toggles the given mark with the
given attributes. Will return `false` when the current selection
doesn't support that mark. This will remove the mark if any marks
of that type exist in the selection, or add it otherwise. If the
selection is empty, this applies to the [stored
marks](https://prosemirror.net/docs/ref/#state.EditorState.storedMarks) instead of a range of the
document.

## wrapIn {#wrap-in}

```ts
function wrapIn(nodeType: NodeType, attrs?: null | Attrs): Command
```

Wrap the selection in a node of the given type with the given
attributes.
