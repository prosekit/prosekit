# prosekit/extensions/list

<a id="defineList" name="defineList"></a>

## defineList()

> **defineList**(): [`Extension`](../core.md#ExtensionT)\<`Object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`Object`\>

> | Member | Type | Value |
> | :------ | :------ | :------ |
> | `COMMAND_ARGS` | `Object` | - |
> | `COMMAND_ARGS.dedentList` | [`DedentListOptions`] | createDedentListCommand |
> | `COMMAND_ARGS.indentList` | [`IndentListOptions`] | createIndentListCommand |
> | `COMMAND_ARGS.insertList` | [`ListAttributes`] | - |
> | `COMMAND_ARGS.moveList` | [`"up"` \| `"down"`] | createMoveListCommand |
> | `COMMAND_ARGS.splitList` | [] | createSplitListCommand |
> | `COMMAND_ARGS.toggleCollapsed` | [`ToggleCollapsedOptions?`] | createToggleCollapsedCommand |
> | `COMMAND_ARGS.toggleList` | [`ListAttributes`] | createToggleListCommand |
> | `COMMAND_ARGS.unwrapList` | [`UnwrapListOptions`] | createUnwrapListCommand |
> | `COMMAND_ARGS.wrapInList` | [`ListAttributes` \| (`range`) => `null` \| `ListAttributes`] | createWrapInListCommand |
> | `NODES` | `"list"` | - |
>

***

<a id="defineListCommands" name="defineListCommands"></a>

## defineListCommands()

> **defineListCommands**(): [`Extension`](../core.md#ExtensionT)\<`Object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`Object`\>

> | Member | Type | Value |
> | :------ | :------ | :------ |
> | `COMMAND_ARGS` | `Object` | - |
> | `COMMAND_ARGS.dedentList` | [`DedentListOptions`] | createDedentListCommand |
> | `COMMAND_ARGS.indentList` | [`IndentListOptions`] | createIndentListCommand |
> | `COMMAND_ARGS.insertList` | [`ListAttributes`] | - |
> | `COMMAND_ARGS.moveList` | [`"up"` \| `"down"`] | createMoveListCommand |
> | `COMMAND_ARGS.splitList` | [] | createSplitListCommand |
> | `COMMAND_ARGS.toggleCollapsed` | [`ToggleCollapsedOptions?`] | createToggleCollapsedCommand |
> | `COMMAND_ARGS.toggleList` | [`ListAttributes`] | createToggleListCommand |
> | `COMMAND_ARGS.unwrapList` | [`UnwrapListOptions`] | createUnwrapListCommand |
> | `COMMAND_ARGS.wrapInList` | [`ListAttributes` \| (`range`) => `null` \| `ListAttributes`] | createWrapInListCommand |
>

***

<a id="defineListInputRules" name="defineListInputRules"></a>

## defineListInputRules()

> **defineListInputRules**(): [`Extension`](../core.md#ExtensionT)

### Returns

[`Extension`](../core.md#ExtensionT)

***

<a id="defineListKeymap" name="defineListKeymap"></a>

## defineListKeymap()

> **defineListKeymap**(): [`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

Returns a extension that adds key bindings for list.

### Returns

[`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

***

<a id="defineListPlugins" name="defineListPlugins"></a>

## defineListPlugins()

> **defineListPlugins**(): [`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

***

<a id="defineListSpec" name="defineListSpec"></a>

## defineListSpec()

> **defineListSpec**(): [`Extension`](../core.md#ExtensionT)\<`Object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`Object`\>

> | Member | Type |
> | :------ | :------ |
> | `NODES` | `"list"` |
>
