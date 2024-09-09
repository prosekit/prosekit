# prosekit/extensions/horizontal-rule

<a id="HorizontalRuleCommandsExtension" name="HorizontalRuleCommandsExtension"></a>

## HorizontalRuleCommandsExtension

> **HorizontalRuleCommandsExtension**: [`Extension`](../core.md#ExtensionT)\<`object`\>

### Type declaration

| Name | Type |
| ------ | ------ |
| `Commands` | `object` |
| `Commands.insertHorizontalRule` | [] |

***

<a id="HorizontalRuleExtension" name="HorizontalRuleExtension"></a>

## HorizontalRuleExtension

> **HorizontalRuleExtension**: `Union`\<[[`HorizontalRuleSpecExtension`](horizontal-rule.md#HorizontalRuleSpecExtension), [`HorizontalRuleCommandsExtension`](horizontal-rule.md#HorizontalRuleCommandsExtension)]\>

***

<a id="HorizontalRuleSpecExtension" name="HorizontalRuleSpecExtension"></a>

## HorizontalRuleSpecExtension

> **HorizontalRuleSpecExtension**: [`Extension`](../core.md#ExtensionT)\<`object`\>

### Type declaration

| Name | Type |
| ------ | ------ |
| `Nodes` | `object` |
| `Nodes.horizontalRule` | [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs) |

***

<a id="defineHorizontalRule" name="defineHorizontalRule"></a>

## defineHorizontalRule()

> **defineHorizontalRule**(): [`HorizontalRuleExtension`](horizontal-rule.md#HorizontalRuleExtension)

### Returns

[`HorizontalRuleExtension`](horizontal-rule.md#HorizontalRuleExtension)

***

<a id="defineHorizontalRuleCommands" name="defineHorizontalRuleCommands"></a>

## defineHorizontalRuleCommands()

> **defineHorizontalRuleCommands**(): [`HorizontalRuleCommandsExtension`](horizontal-rule.md#HorizontalRuleCommandsExtension)

### Returns

[`HorizontalRuleCommandsExtension`](horizontal-rule.md#HorizontalRuleCommandsExtension)

***

<a id="defineHorizontalRuleInputRule" name="defineHorizontalRuleInputRule"></a>

## defineHorizontalRuleInputRule()

> **defineHorizontalRuleInputRule**(): `PlainExtension`

### Returns

`PlainExtension`

***

<a id="defineHorizontalRuleSpec" name="defineHorizontalRuleSpec"></a>

## defineHorizontalRuleSpec()

> **defineHorizontalRuleSpec**(): [`HorizontalRuleSpecExtension`](horizontal-rule.md#HorizontalRuleSpecExtension)

### Returns

[`HorizontalRuleSpecExtension`](horizontal-rule.md#HorizontalRuleSpecExtension)

***

<a id="insertHorizontalRule" name="insertHorizontalRule"></a>

## insertHorizontalRule()

> **insertHorizontalRule**(): [`Command`](https://prosemirror.net/docs/ref/#state.Command)

Returns a command that inserts a horizontal rule at the current selection.

### Returns

[`Command`](https://prosemirror.net/docs/ref/#state.Command)
