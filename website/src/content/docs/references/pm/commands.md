---
title: prosekit/pm/commands
sidebar:
  label: pm/commands
---

<!-- DEBUG memberWithGroups 1 -->

Re-exports from [prosemirror-commands](https://github.com/ProseMirror/prosemirror-commands)

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Variables

### baseKeymap {#basekeymap}

```ts
const baseKeymap: object;
```

Depending on the detected platform, this will hold
[`pcBasekeymap`](https://prosemirror.net/docs/ref/#commands.pcBaseKeymap) or
[`macBaseKeymap`](https://prosemirror.net/docs/ref/#commands.macBaseKeymap).

#### Index Signature

```ts
[key: string]: Command
```

<!-- DEBUG inheritance start kind=32 -->

***

### createParagraphNear {#createparagraphnear}

```ts
const createParagraphNear: Command;
```

If a block node is selected, create an empty paragraph before (if
it is its parent's first child) or after it.

<!-- DEBUG inheritance start kind=32 -->

***

### deleteSelection {#deleteselection}

```ts
const deleteSelection: Command;
```

Delete the selection, if there is one.

<!-- DEBUG inheritance start kind=32 -->

***

### exitCode {#exitcode}

```ts
const exitCode: Command;
```

When the selection is in a node with a truthy
[`code`](https://prosemirror.net/docs/ref/#model.NodeSpec.code) property in its spec, create a
default block after the code block, and move the cursor there.

<!-- DEBUG inheritance start kind=32 -->

***

### joinBackward {#joinbackward}

```ts
const joinBackward: Command;
```

If the selection is empty and at the start of a textblock, try to
reduce the distance between that block and the one before it—if
there's a block directly before it that can be joined, join them.
If not, try to move the selected block closer to the next one in
the document structure by lifting it out of its parent or moving it
into a parent of the previous block. Will use the view for accurate
(bidi-aware) start-of-textblock detection if given.

<!-- DEBUG inheritance start kind=32 -->

***

### joinDown {#joindown}

```ts
const joinDown: Command;
```

Join the selected block, or the closest ancestor of the selection
that can be joined, with the sibling after it.

<!-- DEBUG inheritance start kind=32 -->

***

### joinForward {#joinforward}

```ts
const joinForward: Command;
```

If the selection is empty and the cursor is at the end of a
textblock, try to reduce or remove the boundary between that block
and the one after it, either by joining them or by moving the other
block closer to this one in the tree structure. Will use the view
for accurate start-of-textblock detection if given.

<!-- DEBUG inheritance start kind=32 -->

***

### joinTextblockBackward {#jointextblockbackward}

```ts
const joinTextblockBackward: Command;
```

A more limited form of [`joinBackward`](https://prosemirror.net/docs/ref/#commands.joinBackward)
that only tries to join the current textblock to the one before
it, if the cursor is at the start of a textblock.

<!-- DEBUG inheritance start kind=32 -->

***

### joinTextblockForward {#jointextblockforward}

```ts
const joinTextblockForward: Command;
```

A more limited form of [`joinForward`](https://prosemirror.net/docs/ref/#commands.joinForward)
that only tries to join the current textblock to the one after
it, if the cursor is at the end of a textblock.

<!-- DEBUG inheritance start kind=32 -->

***

### joinUp {#joinup}

```ts
const joinUp: Command;
```

Join the selected block or, if there is a text selection, the
closest ancestor block of the selection that can be joined, with
the sibling above it.

<!-- DEBUG inheritance start kind=32 -->

***

### lift {#lift}

```ts
const lift: Command;
```

Lift the selected block, or the closest ancestor block of the
selection that can be lifted, out of its parent node.

<!-- DEBUG inheritance start kind=32 -->

***

### liftEmptyBlock {#liftemptyblock}

```ts
const liftEmptyBlock: Command;
```

If the cursor is in an empty textblock that can be lifted, lift the
block.

<!-- DEBUG inheritance start kind=32 -->

***

### macBaseKeymap {#macbasekeymap}

```ts
const macBaseKeymap: object;
```

A copy of `pcBaseKeymap` that also binds **Ctrl-h** like Backspace,
**Ctrl-d** like Delete, **Alt-Backspace** like Ctrl-Backspace, and
**Ctrl-Alt-Backspace**, **Alt-Delete**, and **Alt-d** like
Ctrl-Delete.

#### Index Signature

```ts
[key: string]: Command
```

<!-- DEBUG inheritance start kind=32 -->

***

### newlineInCode {#newlineincode}

```ts
const newlineInCode: Command;
```

If the selection is in a node whose type has a truthy
[`code`](https://prosemirror.net/docs/ref/#model.NodeSpec.code) property in its spec, replace the
selection with a newline character.

<!-- DEBUG inheritance start kind=32 -->

***

### pcBaseKeymap {#pcbasekeymap}

```ts
const pcBaseKeymap: object;
```

A basic keymap containing bindings not specific to any schema.
Binds the following keys (when multiple commands are listed, they
are chained with [`chainCommands`](https://prosemirror.net/docs/ref/#commands.chainCommands)):

* **Enter** to `newlineInCode`, `createParagraphNear`, `liftEmptyBlock`, `splitBlock`
* **Mod-Enter** to `exitCode`
* **Backspace** and **Mod-Backspace** to `deleteSelection`, `joinBackward`, `selectNodeBackward`
* **Delete** and **Mod-Delete** to `deleteSelection`, `joinForward`, `selectNodeForward`
* **Mod-Delete** to `deleteSelection`, `joinForward`, `selectNodeForward`
* **Mod-a** to `selectAll`

#### Index Signature

```ts
[key: string]: Command
```

<!-- DEBUG inheritance start kind=32 -->

***

### selectAll {#selectall}

```ts
const selectAll: Command;
```

Select the whole document.

<!-- DEBUG inheritance start kind=32 -->

***

### selectNodeBackward {#selectnodebackward}

```ts
const selectNodeBackward: Command;
```

When the selection is empty and at the start of a textblock, select
the node before that textblock, if possible. This is intended to be
bound to keys like backspace, after
[`joinBackward`](https://prosemirror.net/docs/ref/#commands.joinBackward) or other deleting
commands, as a fall-back behavior when the schema doesn't allow
deletion at the selected point.

<!-- DEBUG inheritance start kind=32 -->

***

### selectNodeForward {#selectnodeforward}

```ts
const selectNodeForward: Command;
```

When the selection is empty and at the end of a textblock, select
the node coming after that textblock, if possible. This is intended
to be bound to keys like delete, after
[`joinForward`](https://prosemirror.net/docs/ref/#commands.joinForward) and similar deleting
commands, to provide a fall-back behavior when the schema doesn't
allow deletion at the selected point.

<!-- DEBUG inheritance start kind=32 -->

***

### selectParentNode {#selectparentnode}

```ts
const selectParentNode: Command;
```

Move the selection to the node wrapping the current selection, if
any. (Will not select the document node.)

<!-- DEBUG inheritance start kind=32 -->

***

### selectTextblockEnd {#selecttextblockend}

```ts
const selectTextblockEnd: Command;
```

Moves the cursor to the end of current text block.

<!-- DEBUG inheritance start kind=32 -->

***

### selectTextblockStart {#selecttextblockstart}

```ts
const selectTextblockStart: Command;
```

Moves the cursor to the start of current text block.

<!-- DEBUG inheritance start kind=32 -->

***

### splitBlock {#splitblock}

```ts
const splitBlock: Command;
```

Split the parent block of the selection. If the selection is a text
selection, also delete its content.

<!-- DEBUG inheritance start kind=32 -->

***

### splitBlockKeepMarks {#splitblockkeepmarks}

```ts
const splitBlockKeepMarks: Command;
```

Acts like [`splitBlock`](https://prosemirror.net/docs/ref/#commands.splitBlock), but without
resetting the set of active marks at the cursor.

<!-- DEBUG inheritance start kind=32 -->

## Functions

### autoJoin() {#autojoin}

```ts
function autoJoin(command: Command, isJoinable: 
  | readonly string[]
  | (before: ProseMirrorNode, after: ProseMirrorNode) => boolean): Command;
```

Wrap a command so that, when it produces a transform that causes
two joinable nodes to end up next to each other, those are joined.
Nodes are considered joinable when they are of the same type and
when the `isJoinable` predicate returns true for them or, if an
array of strings was passed, if their node type name is in that
array.

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

`command`

</td>
<td>

[`Command`](state.md#command)

</td>
</tr>
<tr>
<td>

`isJoinable`

</td>
<td>

 \| readonly `string`[] \| (`before`: [`ProseMirrorNode`](model.md#prosemirrornode), `after`: [`ProseMirrorNode`](model.md#prosemirrornode)) => `boolean`

</td>
</tr>
</tbody>
</table>

#### Returns

[`Command`](state.md#command)

<!-- DEBUG inheritance start kind=4096 -->

***

### chainCommands() {#chaincommands}

```ts
function chainCommands(...commands: readonly Command[]): Command;
```

Combine a number of command functions into a single function (which
calls them one by one until one returns true).

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

...`commands`

</td>
<td>

readonly [`Command`](state.md#command)[]

</td>
</tr>
</tbody>
</table>

#### Returns

[`Command`](state.md#command)

<!-- DEBUG inheritance start kind=4096 -->

***

### setBlockType() {#setblocktype}

```ts
function setBlockType(nodeType: NodeType, attrs?: null | Attrs): Command;
```

Returns a command that tries to set the selected textblocks to the
given node type with the given attributes.

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

`nodeType`

</td>
<td>

[`NodeType`](model.md#nodetype)

</td>
</tr>
<tr>
<td>

`attrs?`

</td>
<td>

`null` \| [`Attrs`](model.md#attrs-7)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Command`](state.md#command)

<!-- DEBUG inheritance start kind=4096 -->

***

### splitBlockAs() {#splitblockas}

```ts
function splitBlockAs(splitNode?: (node: ProseMirrorNode, atEnd: boolean, $from: ResolvedPos) => 
  | null
  | {
  attrs?: Attrs;
  type: NodeType;
}): Command;
```

Create a variant of [`splitBlock`](https://prosemirror.net/docs/ref/#commands.splitBlock) that uses
a custom function to determine the type of the newly split off block.

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

`splitNode?`

</td>
<td>

(`node`: [`ProseMirrorNode`](model.md#prosemirrornode), `atEnd`: `boolean`, `$from`: [`ResolvedPos`](model.md#resolvedpos)) => \| `null` \| \{ `attrs?`: [`Attrs`](model.md#attrs-7); `type`: [`NodeType`](model.md#nodetype); \}

</td>
</tr>
</tbody>
</table>

#### Returns

[`Command`](state.md#command)

<!-- DEBUG inheritance start kind=4096 -->

***

### toggleMark() {#togglemark}

```ts
function toggleMark(
   markType: MarkType, 
   attrs?: null | Attrs, 
   options?: object): Command;
```

Create a command function that toggles the given mark with the
given attributes. Will return `false` when the current selection
doesn't support that mark. This will remove the mark if any marks
of that type exist in the selection, or add it otherwise. If the
selection is empty, this applies to the [stored
marks](https://prosemirror.net/docs/ref/#state.EditorState.storedMarks) instead of a range of the
document.

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

`markType`

</td>
<td>

[`MarkType`](model.md#marktype-1)

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`attrs?`

</td>
<td>

`null` \| [`Attrs`](model.md#attrs-7)

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

\{ `enterInlineAtoms?`: `boolean`; `includeWhitespace?`: `boolean`; `removeWhenPresent?`: `boolean`; \}

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`options.enterInlineAtoms?`

</td>
<td>

`boolean`

</td>
<td>

When set to false, this will prevent the command from acting on
the content of inline nodes marked as
[atoms](https://prosemirror.net/docs/ref/#model.NodeSpec.atom) that are completely covered by a
selection range.

</td>
</tr>
<tr>
<td>

`options.includeWhitespace?`

</td>
<td>

`boolean`

</td>
<td>

By default, this command doesn't apply to leading and trailing
whitespace in the selection. Set this to `true` to change that.

</td>
</tr>
<tr>
<td>

`options.removeWhenPresent?`

</td>
<td>

`boolean`

</td>
<td>

Controls whether, when part of the selected range has the mark
already and part doesn't, the mark is removed (`true`, the
default) or added (`false`).

</td>
</tr>
</tbody>
</table>

#### Returns

[`Command`](state.md#command)

<!-- DEBUG inheritance start kind=4096 -->

***

### wrapIn() {#wrapin}

```ts
function wrapIn(nodeType: NodeType, attrs?: null | Attrs): Command;
```

Wrap the selection in a node of the given type with the given
attributes.

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

`nodeType`

</td>
<td>

[`NodeType`](model.md#nodetype)

</td>
</tr>
<tr>
<td>

`attrs?`

</td>
<td>

`null` \| [`Attrs`](model.md#attrs-7)

</td>
</tr>
</tbody>
</table>

#### Returns

[`Command`](state.md#command)

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG memberWithGroups 10 -->
