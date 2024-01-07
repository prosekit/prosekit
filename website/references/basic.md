# prosekit/basic

<a id="BasicExtension" name="BasicExtension"></a>

## BasicExtension

> **BasicExtension**: [`ReturnType`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype )\<*typeof* [`defineBasicExtension`](basic.md#defineBasicExtension)\>

***

<a id="defineBasicExtension" name="defineBasicExtension"></a>

## defineBasicExtension()

> **defineBasicExtension**(): [`Extension`](core.md#ExtensionT)\<`Object`\>

### Returns

[`Extension`](core.md#ExtensionT)\<`Object`\>

> | Member | Type | Description |
> | :------ | :------ | :------ |
> | `COMMAND_ARGS` | `Object` | - |
> | `COMMAND_ARGS.addMark` | [`Object`] | - |
> | `COMMAND_ARGS.dedentList` | [`DedentListOptions`] | - |
> | `COMMAND_ARGS.indentList` | [`IndentListOptions`] | - |
> | `COMMAND_ARGS.insertHeading` | [[`HeadingAttrs`](extensions/heading.md#HeadingAttrs)] | - |
> | `COMMAND_ARGS.insertImage` | [[`ImageAttrs`](extensions/image.md#ImageAttrs)] | - |
> | `COMMAND_ARGS.insertList` | [`ListAttributes`] | - |
> | `COMMAND_ARGS.insertNode` | [`Object` \| `Object`] | - |
> | `COMMAND_ARGS.insertText` | [`Object`] | - |
> | `COMMAND_ARGS.moveList` | [`"up"` \| `"down"`] | - |
> | `COMMAND_ARGS.redo` | [] | - |
> | `COMMAND_ARGS.removeMark` | [`Object`] | - |
> | `COMMAND_ARGS.selectAll` | [] | - |
> | `COMMAND_ARGS.setBlockType` | [`Object`] | - |
> | `COMMAND_ARGS.setHeading` | [[`HeadingAttrs`](extensions/heading.md#HeadingAttrs)] | - |
> | `COMMAND_ARGS.splitList` | [] | - |
> | `COMMAND_ARGS.toggleBold` | [] | - |
> | `COMMAND_ARGS.toggleCode` | [] | - |
> | `COMMAND_ARGS.toggleCollapsed` | [`ToggleCollapsedOptions?`] | - |
> | `COMMAND_ARGS.toggleHeading` | [[`HeadingAttrs`](extensions/heading.md#HeadingAttrs)] | - |
> | `COMMAND_ARGS.toggleItalic` | [] | - |
> | `COMMAND_ARGS.toggleList` | [`ListAttributes`] | - |
> | `COMMAND_ARGS.toggleStrike` | [] | - |
> | `COMMAND_ARGS.toggleUnderline` | [] | - |
> | `COMMAND_ARGS.undo` | [] | - |
> | `COMMAND_ARGS.unwrapList` | [`UnwrapListOptions`] | - |
> | `COMMAND_ARGS.wrap` | [`Object`] | - |
> | `COMMAND_ARGS.wrapInList` | [`ListAttributes` \| (`range`) => `null` \| `ListAttributes`] | - |
> | `MARKS` | `"code"` \| `"bold"` \| `"italic"` \| `"strike"` \| `"underline"` | - |
> | `NODES` | `"text"` \| `"doc"` \| `"paragraph"` \| `"heading"` \| `"image"` \| `"list"` | - |
>

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
