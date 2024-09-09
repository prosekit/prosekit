# prosekit/extensions/input-rule

<a id="MarkInputRuleOptions" name="MarkInputRuleOptions"></a>

## MarkInputRuleOptions

Options for [defineMarkInputRule](input-rule.md#defineMarkInputRule).

### Properties

<a id="attrs" name="attrs"></a>

#### attrs?

> `optional` **attrs**: `null` \| [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs) \| (`match`) => `null` \| [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs)

Attributes to set on the mark.

<a id="regex" name="regex"></a>

#### regex

> **regex**: [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

The regular expression to match against, which should end with `$` and has
exactly one capture group. All other matched text outside the capture group
will be deleted.

<a id="type" name="type"></a>

#### type

> **type**: `string` \| [`MarkType`](https://prosemirror.net/docs/ref/#model.MarkType)

The type of mark to set.

***

<a id="defineInputRule" name="defineInputRule"></a>

## defineInputRule()

> **defineInputRule**(`rule`): `PlainExtension`

Defines an input rule extension.

### Parameters

• **rule**: [`InputRule`](https://prosemirror.net/docs/ref/#inputrules.InputRule)

The ProseMirror input rule to add.

### Returns

`PlainExtension`

***

<a id="defineMarkInputRule" name="defineMarkInputRule"></a>

## defineMarkInputRule()

> **defineMarkInputRule**(`options`): `PlainExtension`

Defines an input rule for automatically adding inline marks when a given
pattern is typed.

### Parameters

• **options**: [`MarkInputRuleOptions`](input-rule.md#MarkInputRuleOptions)

### Returns

`PlainExtension`

***

<a id="defineTextBlockInputRule" name="defineTextBlockInputRule"></a>

## defineTextBlockInputRule()

> **defineTextBlockInputRule**(`options`): `PlainExtension`

Defines an input rule that changes the type of a textblock when the matched
text is typed into it.

See also [textblockTypeInputRule](https://prosemirror.net/docs/ref/#inputrules.textblockTypeInputRule)

### Parameters

• **options**

• **options.attrs?**: `null` \| [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs) \| (`match`) => `null` \| [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs)

Attributes to set on the node.

• **options.regex**: [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

The regular expression to match against, which should end with `$`. It
usually also starts with `^` to that it is only matched at the start of a
textblock.

• **options.type**: `string` \| [`NodeType`](https://prosemirror.net/docs/ref/#model.NodeType)

The node type to replace the matched text with.

### Returns

`PlainExtension`

***

<a id="defineWrappingInputRule" name="defineWrappingInputRule"></a>

## defineWrappingInputRule()

> **defineWrappingInputRule**(`options`): `PlainExtension`

Defines an input rule for automatically wrapping a textblock when a given
string is typed.

See also [wrappingInputRule](https://prosemirror.net/docs/ref/#inputrules.wrappingInputRule)

### Parameters

• **options**

• **options.attrs?**: `null` \| [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs) \| (`match`) => `null` \| [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs)

Attributes to set on the node.

• **options.join?**

By default, if there's a node with the same type above the newly wrapped
node, the rule will try to
[join](https://prosemirror.net/docs/ref/#transform.Transform.join) those
two nodes. You can pass a join predicate, which takes a regular expression
match and the node before the wrapped node, and can return a boolean to
indicate whether a join should happen.

• **options.regex**: [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

The regular expression to match against, which should end with `$`. It
usually also starts with `^` to that it is only matched at the start of a
textblock.

• **options.type**: `string` \| [`NodeType`](https://prosemirror.net/docs/ref/#model.NodeType)

The type of node to wrap in.

### Returns

`PlainExtension`
