# prosekit/extensions/table

<a id="defineTable" name="defineTable"></a>

## defineTable()

> **defineTable**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

| Name | Type |
| ------ | ------ |
| `Commands` | `object` |
| `Marks` | `any` |
| `Nodes` | `any` |

***

<a id="defineTableCellSpec" name="defineTableCellSpec"></a>

## defineTableCellSpec()

> **defineTableCellSpec**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

| Name | Type |
| ------ | ------ |
| `Commands` | `never` |
| `Marks` | `never` |
| `Nodes` | `"tableCell"` |

***

<a id="defineTableCommands" name="defineTableCommands"></a>

## defineTableCommands()

> **defineTableCommands**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

Adds commands for working with `table` nodes.

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

| Name | Type |
| ------ | ------ |
| `Commands` | `object` |
| `Commands.exitTable` | [] |
| `Commands.insertTable` | [`object`] |
| `Marks` | `never` |
| `Nodes` | `never` |

***

<a id="defineTableHeaderCellSpec" name="defineTableHeaderCellSpec"></a>

## defineTableHeaderCellSpec()

> **defineTableHeaderCellSpec**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

| Name | Type |
| ------ | ------ |
| `Commands` | `never` |
| `Marks` | `never` |
| `Nodes` | `"tableHeaderCell"` |

***

<a id="defineTablePlugins" name="defineTablePlugins"></a>

## defineTablePlugins()

> **defineTablePlugins**(): [`Extension`](../core.md#ExtensionT)\<`any`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`any`\>

***

<a id="defineTableRowSpec" name="defineTableRowSpec"></a>

## defineTableRowSpec()

> **defineTableRowSpec**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

| Name | Type |
| ------ | ------ |
| `Commands` | `never` |
| `Marks` | `never` |
| `Nodes` | `"tableRow"` |

***

<a id="defineTableSpec" name="defineTableSpec"></a>

## defineTableSpec()

> **defineTableSpec**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

| Name | Type |
| ------ | ------ |
| `Commands` | `never` |
| `Marks` | `never` |
| `Nodes` | `"table"` |
