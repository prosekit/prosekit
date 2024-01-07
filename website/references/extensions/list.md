# prosekit/extensions/list

<a id="defineList" name="defineList"></a>

## defineList()

> **defineList**(): [`Extension`](../core.md#ExtensionT)\<`Object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`Object`\>

> | Member | Type | Description |
> | :------ | :------ | :------ |
> | `COMMAND_ARGS` | `Object` | - |
> | `COMMAND_ARGS.dedentList` | [`DedentListOptions`] | - |
> | `COMMAND_ARGS.indentList` | [`IndentListOptions`] | - |
> | `COMMAND_ARGS.insertList` | [`ListAttributes`] | - |
> | `COMMAND_ARGS.moveList` | [`"up"` \| `"down"`] | - |
> | `COMMAND_ARGS.splitList` | [] | - |
> | `COMMAND_ARGS.toggleCollapsed` | [`ToggleCollapsedOptions?`] | - |
> | `COMMAND_ARGS.toggleList` | [`ListAttributes`] | - |
> | `COMMAND_ARGS.unwrapList` | [`UnwrapListOptions`] | - |
> | `COMMAND_ARGS.wrapInList` | [`ListAttributes` \| (`range`) => `null` \| `ListAttributes`] | - |
> | `NODES` | `"list"` | - |
>

***

<a id="defineListCommands" name="defineListCommands"></a>

## defineListCommands()

> **defineListCommands**(): [`Extension`](../core.md#ExtensionT)\<`Object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`Object`\>

> | Member | Type | Description |
> | :------ | :------ | :------ |
> | `COMMAND_ARGS` | `Object` | - |
> | `COMMAND_ARGS.dedentList` | [`DedentListOptions`] | - |
> | `COMMAND_ARGS.indentList` | [`IndentListOptions`] | - |
> | `COMMAND_ARGS.insertList` | [`ListAttributes`] | - |
> | `COMMAND_ARGS.moveList` | [`"up"` \| `"down"`] | - |
> | `COMMAND_ARGS.splitList` | [] | - |
> | `COMMAND_ARGS.toggleCollapsed` | [`ToggleCollapsedOptions?`] | - |
> | `COMMAND_ARGS.toggleList` | [`ListAttributes`] | - |
> | `COMMAND_ARGS.unwrapList` | [`UnwrapListOptions`] | - |
> | `COMMAND_ARGS.wrapInList` | [`ListAttributes` \| (`range`) => `null` \| `ListAttributes`] | - |
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

> | Member | Type | Description |
> | :------ | :------ | :------ |
> | `NODES` | `"list"` | - |
>

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
