# prosekit/extensions/list

<a id="defineList" name="defineList"></a>

## defineList()

> **defineList**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

| Member | Type |
| :------ | :------ |
| `Commands` | `object` |
| `Marks` | `any` |
| `Nodes` | `any` |

***

<a id="defineListCommands" name="defineListCommands"></a>

## defineListCommands()

> **defineListCommands**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

| Member | Type | Value |
| :------ | :------ | :------ |
| `Commands` | `object` | - |
| `Commands.dedentList` | [`DedentListOptions`] | createDedentListCommand |
| `Commands.indentList` | [`IndentListOptions`] | createIndentListCommand |
| `Commands.insertList` | [`ListAttributes`] | ... |
| `Commands.moveList` | [`"up"` \| `"down"`] | createMoveListCommand |
| `Commands.splitList` | [] | createSplitListCommand |
| `Commands.toggleCollapsed` | [`ToggleCollapsedOptions?`] | createToggleCollapsedCommand |
| `Commands.toggleList` | [`ListAttributes`] | createToggleListCommand |
| `Commands.unwrapList` | [`UnwrapListOptions`] | createUnwrapListCommand |
| `Commands.wrapInList` | [`ListAttributes` \| (`range`) => `null` \| `ListAttributes`] | createWrapInListCommand |
| `Marks` | `never` | - |
| `Nodes` | `never` | - |

***

<a id="defineListInputRules" name="defineListInputRules"></a>

## defineListInputRules()

> **defineListInputRules**(): [`Extension`](../core.md#ExtensionT)

### Returns

[`Extension`](../core.md#ExtensionT)

***

<a id="defineListKeymap" name="defineListKeymap"></a>

## defineListKeymap()

> **defineListKeymap**(): [`Extension`](../core.md#ExtensionT)\<`any`\>

Returns a extension that adds key bindings for list.

### Returns

[`Extension`](../core.md#ExtensionT)\<`any`\>

***

<a id="defineListPlugins" name="defineListPlugins"></a>

## defineListPlugins()

> **defineListPlugins**(): [`Extension`](../core.md#ExtensionT)\<`any`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`any`\>

***

<a id="defineListSpec" name="defineListSpec"></a>

## defineListSpec()

> **defineListSpec**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

| Member | Type |
| :------ | :------ |
| `Commands` | `never` |
| `Marks` | `never` |
| `Nodes` | `"list"` |
