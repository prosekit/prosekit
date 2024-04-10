# prosekit/extensions/table

<a id="defineTable" name="defineTable"></a>

## defineTable()

> **defineTable**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

> | Member | Type | Value |
> | :------ | :------ | :------ |
> | `COMMAND_ARGS` | `object` | - |
> | `COMMAND_ARGS.exitTable` | [] | - |
> | `COMMAND_ARGS.insertTable` | [`object`] | - |
> | `NODES` | `"table"` \| `"tableRow"` \| `"tableCell"` \| `"tableHeaderCell"` | - |
>

***

<a id="defineTableCellSpec" name="defineTableCellSpec"></a>

## defineTableCellSpec()

> **defineTableCellSpec**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

> | Member | Type |
> | :------ | :------ |
> | `NODES` | `"tableCell"` |
>

***

<a id="defineTableCommands" name="defineTableCommands"></a>

## defineTableCommands()

> **defineTableCommands**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

Adds commands for working with `table` nodes.

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

> | Member | Type | Value |
> | :------ | :------ | :------ |
> | `COMMAND_ARGS` | `object` | - |
> | `COMMAND_ARGS.exitTable` | [] | - |
> | `COMMAND_ARGS.insertTable` | [`object`] | - |
>

***

<a id="defineTableHeaderCellSpec" name="defineTableHeaderCellSpec"></a>

## defineTableHeaderCellSpec()

> **defineTableHeaderCellSpec**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

> | Member | Type |
> | :------ | :------ |
> | `NODES` | `"tableHeaderCell"` |
>

***

<a id="defineTablePlugins" name="defineTablePlugins"></a>

## defineTablePlugins()

> **defineTablePlugins**(): [`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

***

<a id="defineTableRowSpec" name="defineTableRowSpec"></a>

## defineTableRowSpec()

> **defineTableRowSpec**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

> | Member | Type |
> | :------ | :------ |
> | `NODES` | `"tableRow"` |
>

***

<a id="defineTableSpec" name="defineTableSpec"></a>

## defineTableSpec()

> **defineTableSpec**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

> | Member | Type |
> | :------ | :------ |
> | `NODES` | `"table"` |
>
