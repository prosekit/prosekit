# prosekit/extensions/enter-rule

<a id="EnterRuleHandler" name="EnterRuleHandler"></a>

## EnterRuleHandler()

> **EnterRuleHandler**: (`options`) => [`Transaction`](https://prosemirror.net/docs/ref/#state.Transaction) \| `null`

### Parameters

• **options**

• **options.from**: `number`

The start position of the matched text.

• **options.match**: `RegExpExecArray`

The matched result from the regular expression.

• **options.state**: [`EditorState`](https://prosemirror.net/docs/ref/#state.EditorState)

The current editor state.

• **options.to**: `number`

The end position of the matched text.

### Returns

[`Transaction`](https://prosemirror.net/docs/ref/#state.Transaction) \| `null`

***

<a id="EnterRuleOptions" name="EnterRuleOptions"></a>

## EnterRuleOptions

> **EnterRuleOptions**: `object`

Options for [defineEnterRule](enter-rule.md#defineEnterRule).

### Type declaration

| Name | Type | Description |
| ------ | ------ | ------ |
| `handler` | [`EnterRuleHandler`](enter-rule.md#EnterRuleHandler) | A function to be called when an enter rule is triggered. |
| `regex` | [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp) | The regular expression to match against. It should end with `$`. |
| `stop`? | `boolean` | Whether to stop further handlers from being called if this rule is triggered. **Default** `false` |

***

<a id="TextBlockEnterRuleOptions" name="TextBlockEnterRuleOptions"></a>

## TextBlockEnterRuleOptions

> **TextBlockEnterRuleOptions**: `object`

Options for [defineTextBlockEnterRule](enter-rule.md#defineTextBlockEnterRule).

### Type declaration

| Name | Type | Description |
| ------ | ------ | ------ |
| `attrs`? | [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs) \| `null` \| (`match`) => [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs) \| `null` | Attributes to set on the node. If a function is provided, it will be called with the matched result from the regular expression. |
| `regex` | [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp) | The regular expression to match against. It should end with `$`. |
| `stop`? | `boolean` | Whether to stop further handlers from being called if this rule is triggered. **Default** `true` |
| `type` | `string` \| [`NodeType`](https://prosemirror.net/docs/ref/#model.NodeType) | The node type to replace the matched text with. |

***

<a id="defineEnterRule" name="defineEnterRule"></a>

## defineEnterRule()

> **defineEnterRule**(`options`): `PlainExtension`

Defines an enter rule. An enter rule applies when the text directly in front of
the cursor matches `regex` and user presses Enter. The `regex` should end
with `$`.

### Parameters

• **options**: [`EnterRuleOptions`](enter-rule.md#EnterRuleOptions)

### Returns

`PlainExtension`

***

<a id="defineTextBlockEnterRule" name="defineTextBlockEnterRule"></a>

## defineTextBlockEnterRule()

> **defineTextBlockEnterRule**(`options`): `PlainExtension`

Defines an enter rule that replaces the matched text with a block node.

See also [defineEnterRule](enter-rule.md#defineEnterRule).

### Parameters

• **options**: [`TextBlockEnterRuleOptions`](enter-rule.md#TextBlockEnterRuleOptions)

### Returns

`PlainExtension`
