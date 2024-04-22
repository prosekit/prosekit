# prosekit/basic

<a id="BasicExtension" name="BasicExtension"></a>

## BasicExtension

> **BasicExtension**: [`ReturnType`](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype)\<*typeof* [`defineBasicExtension`](basic.md#defineBasicExtension)\>

***

<a id="defineBasicExtension" name="defineBasicExtension"></a>

## defineBasicExtension()

> **defineBasicExtension**(): [`Extension`](core.md#ExtensionT)\<`object`\>

A basic extension that includes some common functionality. You can copy this
function and customize it to your needs.

### Returns

[`Extension`](core.md#ExtensionT)\<`object`\>

> | Member | Type | Value |
> | :------ | :------ | :------ |
> | `COMMAND_ARGS` | `object` | - |
> | `COMMAND_ARGS.addLink` | [[`LinkAttrs`](extensions/link.md#LinkAttrs)] | ... |
> | `COMMAND_ARGS.addMark` | [`object`] | - |
> | `COMMAND_ARGS.dedentList` | [`DedentListOptions`] | createDedentListCommand |
> | `COMMAND_ARGS.exitTable` | [] | ... |
> | `COMMAND_ARGS.expandLink` | [] | ... |
> | `COMMAND_ARGS.indentList` | [`IndentListOptions`] | createIndentListCommand |
> | `COMMAND_ARGS.insertHeading` | [[`HeadingAttrs`](extensions/heading.md#HeadingAttrs)] | ... |
> | `COMMAND_ARGS.insertImage` | [[`ImageAttrs`](extensions/image.md#ImageAttrs)] | ... |
> | `COMMAND_ARGS.insertList` | [`ListAttributes`] | ... |
> | `COMMAND_ARGS.insertNode` | [`object` \| `object`] | - |
> | `COMMAND_ARGS.insertTable` | [`object`] | - |
> | `COMMAND_ARGS.insertText` | [`object`] | - |
> | `COMMAND_ARGS.moveList` | [`"up"` \| `"down"`] | createMoveListCommand |
> | `COMMAND_ARGS.redo` | [] | ... |
> | `COMMAND_ARGS.removeLink` | [] | ... |
> | `COMMAND_ARGS.removeMark` | [`object`] | - |
> | `COMMAND_ARGS.selectAll` | [] | - |
> | `COMMAND_ARGS.setBlockType` | [`object`] | - |
> | `COMMAND_ARGS.setHeading` | [[`HeadingAttrs`](extensions/heading.md#HeadingAttrs)] | ... |
> | `COMMAND_ARGS.setNodeAttrs` | [`object`] | - |
> | `COMMAND_ARGS.splitList` | [] | createSplitListCommand |
> | `COMMAND_ARGS.toggleBold` | [] | ... |
> | `COMMAND_ARGS.toggleCode` | [] | ... |
> | `COMMAND_ARGS.toggleCollapsed` | [`ToggleCollapsedOptions?`] | createToggleCollapsedCommand |
> | `COMMAND_ARGS.toggleHeading` | [[`HeadingAttrs`](extensions/heading.md#HeadingAttrs)] | ... |
> | `COMMAND_ARGS.toggleItalic` | [] | ... |
> | `COMMAND_ARGS.toggleLink` | [[`LinkAttrs`](extensions/link.md#LinkAttrs)] | ... |
> | `COMMAND_ARGS.toggleList` | [`ListAttributes`] | createToggleListCommand |
> | `COMMAND_ARGS.toggleStrike` | [] | ... |
> | `COMMAND_ARGS.toggleUnderline` | [] | ... |
> | `COMMAND_ARGS.undo` | [] | ... |
> | `COMMAND_ARGS.unwrapList` | [`UnwrapListOptions`] | createUnwrapListCommand |
> | `COMMAND_ARGS.wrap` | [`object`] | - |
> | `COMMAND_ARGS.wrapInList` | [`ListAttributes` \| (`range`) => `null` \| `ListAttributes`] | createWrapInListCommand |
> | `MARKS` | `"code"` \| `"link"` \| `"bold"` \| `"strike"` \| `"italic"` \| `"underline"` | - |
> | `NODES` | `"blockquote"` \| `"table"` \| `"text"` \| `"doc"` \| `"paragraph"` \| `"heading"` \| `"image"` \| `"list"` \| `"tableRow"` \| `"tableCell"` \| `"tableHeaderCell"` | - |
>
