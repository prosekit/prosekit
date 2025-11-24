---
title: prosekit/pm/commands
sidebar:
  label: pm/commands
---

Re-exports from [prosemirror-commands](https://github.com/ProseMirror/prosemirror-commands)

## Variables

### deleteSelection {#deleteselection}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="deleteselection" href="#deleteselection">deleteSelection</a>: [`Command`](state.md#command)</code>

</dt>

<dd>

Delete the selection, if there is one.

</dd>

</dl>

***

### joinBackward {#joinbackward}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="joinbackward" href="#joinbackward">joinBackward</a>: [`Command`](state.md#command)</code>

</dt>

<dd>

If the selection is empty and at the start of a textblock, try to
reduce the distance between that block and the one before it—if
there's a block directly before it that can be joined, join them.
If not, try to move the selected block closer to the next one in
the document structure by lifting it out of its parent or moving it
into a parent of the previous block. Will use the view for accurate
(bidi-aware) start-of-textblock detection if given.

</dd>

</dl>

***

### joinTextblockBackward {#jointextblockbackward}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="jointextblockbackward" href="#jointextblockbackward">joinTextblockBackward</a>: [`Command`](state.md#command)</code>

</dt>

<dd>

A more limited form of [`joinBackward`](https://prosemirror.net/docs/ref/#commands.joinBackward)
that only tries to join the current textblock to the one before
it, if the cursor is at the start of a textblock.

</dd>

</dl>

***

### joinTextblockForward {#jointextblockforward}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="jointextblockforward" href="#jointextblockforward">joinTextblockForward</a>: [`Command`](state.md#command)</code>

</dt>

<dd>

A more limited form of [`joinForward`](https://prosemirror.net/docs/ref/#commands.joinForward)
that only tries to join the current textblock to the one after
it, if the cursor is at the end of a textblock.

</dd>

</dl>

***

### selectNodeBackward {#selectnodebackward}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="selectnodebackward" href="#selectnodebackward">selectNodeBackward</a>: [`Command`](state.md#command)</code>

</dt>

<dd>

When the selection is empty and at the start of a textblock, select
the node before that textblock, if possible. This is intended to be
bound to keys like backspace, after
[`joinBackward`](https://prosemirror.net/docs/ref/#commands.joinBackward) or other deleting
commands, as a fall-back behavior when the schema doesn't allow
deletion at the selected point.

</dd>

</dl>

***

### joinForward {#joinforward}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="joinforward" href="#joinforward">joinForward</a>: [`Command`](state.md#command)</code>

</dt>

<dd>

If the selection is empty and the cursor is at the end of a
textblock, try to reduce or remove the boundary between that block
and the one after it, either by joining them or by moving the other
block closer to this one in the tree structure. Will use the view
for accurate start-of-textblock detection if given.

</dd>

</dl>

***

### selectNodeForward {#selectnodeforward}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="selectnodeforward" href="#selectnodeforward">selectNodeForward</a>: [`Command`](state.md#command)</code>

</dt>

<dd>

When the selection is empty and at the end of a textblock, select
the node coming after that textblock, if possible. This is intended
to be bound to keys like delete, after
[`joinForward`](https://prosemirror.net/docs/ref/#commands.joinForward) and similar deleting
commands, to provide a fall-back behavior when the schema doesn't
allow deletion at the selected point.

</dd>

</dl>

***

### joinUp {#joinup}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="joinup" href="#joinup">joinUp</a>: [`Command`](state.md#command)</code>

</dt>

<dd>

Join the selected block or, if there is a text selection, the
closest ancestor block of the selection that can be joined, with
the sibling above it.

</dd>

</dl>

***

### joinDown {#joindown}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="joindown" href="#joindown">joinDown</a>: [`Command`](state.md#command)</code>

</dt>

<dd>

Join the selected block, or the closest ancestor of the selection
that can be joined, with the sibling after it.

</dd>

</dl>

***

### lift {#lift}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="lift" href="#lift">lift</a>: [`Command`](state.md#command)</code>

</dt>

<dd>

Lift the selected block, or the closest ancestor block of the
selection that can be lifted, out of its parent node.

</dd>

</dl>

***

### newlineInCode {#newlineincode}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="newlineincode" href="#newlineincode">newlineInCode</a>: [`Command`](state.md#command)</code>

</dt>

<dd>

If the selection is in a node whose type has a truthy
[`code`](https://prosemirror.net/docs/ref/#model.NodeSpec.code) property in its spec, replace the
selection with a newline character.

</dd>

</dl>

***

### exitCode {#exitcode}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="exitcode" href="#exitcode">exitCode</a>: [`Command`](state.md#command)</code>

</dt>

<dd>

When the selection is in a node with a truthy
[`code`](https://prosemirror.net/docs/ref/#model.NodeSpec.code) property in its spec, create a
default block after the code block, and move the cursor there.

</dd>

</dl>

***

### createParagraphNear {#createparagraphnear}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="createparagraphnear" href="#createparagraphnear">createParagraphNear</a>: [`Command`](state.md#command)</code>

</dt>

<dd>

If a block node is selected, create an empty paragraph before (if
it is its parent's first child) or after it.

</dd>

</dl>

***

### liftEmptyBlock {#liftemptyblock}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="liftemptyblock" href="#liftemptyblock">liftEmptyBlock</a>: [`Command`](state.md#command)</code>

</dt>

<dd>

If the cursor is in an empty textblock that can be lifted, lift the
block.

</dd>

</dl>

***

### splitBlock {#splitblock}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="splitblock" href="#splitblock">splitBlock</a>: [`Command`](state.md#command)</code>

</dt>

<dd>

Split the parent block of the selection. If the selection is a text
selection, also delete its content.

</dd>

</dl>

***

### splitBlockKeepMarks {#splitblockkeepmarks}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="splitblockkeepmarks" href="#splitblockkeepmarks">splitBlockKeepMarks</a>: [`Command`](state.md#command)</code>

</dt>

<dd>

Acts like [`splitBlock`](https://prosemirror.net/docs/ref/#commands.splitBlock), but without
resetting the set of active marks at the cursor.

</dd>

</dl>

***

### selectParentNode {#selectparentnode}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="selectparentnode" href="#selectparentnode">selectParentNode</a>: [`Command`](state.md#command)</code>

</dt>

<dd>

Move the selection to the node wrapping the current selection, if
any. (Will not select the document node.)

</dd>

</dl>

***

### selectAll {#selectall}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="selectall" href="#selectall">selectAll</a>: [`Command`](state.md#command)</code>

</dt>

<dd>

Select the whole document.

</dd>

</dl>

***

### selectTextblockStart {#selecttextblockstart}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="selecttextblockstart" href="#selecttextblockstart">selectTextblockStart</a>: [`Command`](state.md#command)</code>

</dt>

<dd>

Moves the cursor to the start of current text block.

</dd>

</dl>

***

### selectTextblockEnd {#selecttextblockend}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="selecttextblockend" href="#selecttextblockend">selectTextblockEnd</a>: [`Command`](state.md#command)</code>

</dt>

<dd>

Moves the cursor to the end of current text block.

</dd>

</dl>

***

### pcBaseKeymap {#pcbasekeymap}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="pcbasekeymap" href="#pcbasekeymap">pcBaseKeymap</a>: `object`</code>

</dt>

<dd>

A basic keymap containing bindings not specific to any schema.
Binds the following keys (when multiple commands are listed, they
are chained with [`chainCommands`](https://prosemirror.net/docs/ref/#commands.chainCommands)):

* **Enter** to `newlineInCode`, `createParagraphNear`, `liftEmptyBlock`, `splitBlock`
* **Mod-Enter** to `exitCode`
* **Backspace** and **Mod-Backspace** to `deleteSelection`, `joinBackward`, `selectNodeBackward`
* **Delete** and **Mod-Delete** to `deleteSelection`, `joinForward`, `selectNodeForward`
* **Mod-Delete** to `deleteSelection`, `joinForward`, `selectNodeForward`
* **Mod-a** to `selectAll`

</dd>

</dl>

***

### macBaseKeymap {#macbasekeymap}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="macbasekeymap" href="#macbasekeymap">macBaseKeymap</a>: `object`</code>

</dt>

<dd>

A copy of `pcBaseKeymap` that also binds **Ctrl-h** like Backspace,
**Ctrl-d** like Delete, **Alt-Backspace** like Ctrl-Backspace, and
**Ctrl-Alt-Backspace**, **Alt-Delete**, and **Alt-d** like
Ctrl-Delete.

</dd>

</dl>

***

### baseKeymap {#basekeymap}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="basekeymap" href="#basekeymap">baseKeymap</a>: `object`</code>

</dt>

<dd>

Depending on the detected platform, this will hold
[`pcBasekeymap`](https://prosemirror.net/docs/ref/#commands.pcBaseKeymap) or
[`macBaseKeymap`](https://prosemirror.net/docs/ref/#commands.macBaseKeymap).

</dd>

</dl>

## Functions

### splitBlockAs() {#splitblockas}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="splitblockas" href="#splitblockas">splitBlockAs</a>(`splitNode?`: (`node`: [`ProseMirrorNode`](model.md#prosemirrornode), `atEnd`: `boolean`, `$from`: [`ResolvedPos`](model.md#resolvedpos)) => \{ `type`: [`NodeType`](model.md#nodetype); `attrs?`: [`Attrs`](model.md#attrs-4); \} \| `null`): [`Command`](state.md#command)</code>

</dt>

<dd>

Create a variant of [`splitBlock`](https://prosemirror.net/docs/ref/#commands.splitBlock) that uses
a custom function to determine the type of the newly split off block.

</dd>

</dl>

***

### wrapIn() {#wrapin}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="wrapin" href="#wrapin">wrapIn</a>(`nodeType`: [`NodeType`](model.md#nodetype), `attrs?`: [`Attrs`](model.md#attrs-4) \| `null`): [`Command`](state.md#command)</code>

</dt>

<dd>

Wrap the selection in a node of the given type with the given
attributes.

</dd>

</dl>

***

### setBlockType() {#setblocktype}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="setblocktype" href="#setblocktype">setBlockType</a>(`nodeType`: [`NodeType`](model.md#nodetype), `attrs?`: [`Attrs`](model.md#attrs-4) \| `null`): [`Command`](state.md#command)</code>

</dt>

<dd>

Returns a command that tries to set the selected textblocks to the
given node type with the given attributes.

</dd>

</dl>

***

### toggleMark() {#togglemark}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="togglemark" href="#togglemark">toggleMark</a>(`markType`: [`MarkType`](model.md#marktype-1), `attrs?`: [`Attrs`](model.md#attrs-4) \| `null`, `options?`: `object`): [`Command`](state.md#command)</code>

</dt>

<dd>

Create a command function that toggles the given mark with the
given attributes. Will return `false` when the current selection
doesn't support that mark. This will remove the mark if any marks
of that type exist in the selection, or add it otherwise. If the
selection is empty, this applies to the [stored
marks](https://prosemirror.net/docs/ref/#state.EditorState.storedMarks) instead of a range of the
document.

</dd>

</dl>

***

### autoJoin() {#autojoin}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="autojoin" href="#autojoin">autoJoin</a>(`command`: [`Command`](state.md#command), `isJoinable`: readonly `string`[] \| (`before`: [`ProseMirrorNode`](model.md#prosemirrornode), `after`: [`ProseMirrorNode`](model.md#prosemirrornode)) => `boolean`): [`Command`](state.md#command)</code>

</dt>

<dd>

Wrap a command so that, when it produces a transform that causes
two joinable nodes to end up next to each other, those are joined.
Nodes are considered joinable when they are of the same type and
when the `isJoinable` predicate returns true for them or, if an
array of strings was passed, if their node type name is in that
array.

</dd>

</dl>

***

### chainCommands() {#chaincommands}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="chaincommands" href="#chaincommands">chainCommands</a>(...`commands`: readonly [`Command`](state.md#command)[]): [`Command`](state.md#command)</code>

</dt>

<dd>

Combine a number of command functions into a single function (which
calls them one by one until one returns true).

</dd>

</dl>
