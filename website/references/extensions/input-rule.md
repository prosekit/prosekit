# prosekit/extensions/input-rule

<a id="defineInputRule" name="defineInputRule"></a>

## defineInputRule()

> **defineInputRule**(`rule`): [`Extension`](../core.md#ExtensionT)

Defines an input rule extension.

### Parameters

• **rule**: [`InputRule`]( https://prosemirror.net/docs/ref/#inputrules.InputRule )

The ProseMirror input rule to add.

### Returns

[`Extension`](../core.md#ExtensionT)

***

<a id="defineTextBlockInputRule" name="defineTextBlockInputRule"></a>

## defineTextBlockInputRule()

> **defineTextBlockInputRule**(`__namedParameters`): [`Extension`](../core.md#ExtensionT)

Defines an input rule that changes the type of a textblock when the matched
text is typed into it.

See also [textblockTypeInputRule](https://prosemirror.net/docs/ref/#inputrules.textblockTypeInputRule)

### Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.attrs?**: `null` \| [`Attrs`]( https://prosemirror.net/docs/ref/#model.Attrs ) \| (`match`) => `null` \| [`Attrs`]( https://prosemirror.net/docs/ref/#model.Attrs )

Attributes to set on the node.

• **\_\_namedParameters.regex**: [`RegExp`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp )

The regular expression to match against. You'll usually want to start it
with `^` to that it is only matched at the start of a textblock.

• **\_\_namedParameters.type**: `string` \| [`NodeType`]( https://prosemirror.net/docs/ref/#model.NodeType )

The node type to replace the matched text with.

### Returns

[`Extension`](../core.md#ExtensionT)

***

<a id="defineWrappingInputRule" name="defineWrappingInputRule"></a>

## defineWrappingInputRule()

> **defineWrappingInputRule**(`__namedParameters`): [`Extension`](../core.md#ExtensionT)

Defines an input rule for automatically wrapping a textblock when a given
string is typed.

See also [wrappingInputRule](https://prosemirror.net/docs/ref/#inputrules.wrappingInputRule)

### Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.attrs?**: `null` \| [`Attrs`]( https://prosemirror.net/docs/ref/#model.Attrs ) \| (`match`) => `null` \| [`Attrs`]( https://prosemirror.net/docs/ref/#model.Attrs )

Attributes to set on the node.

• **\_\_namedParameters.join?**

By default, if there's a node with the same type above the newly wrapped
node, the rule will try to
[join](https://prosemirror.net/docs/ref/#transform.Transform.join) those
two nodes. You can pass a join predicate, which takes a regular expression
match and the node before the wrapped node, and can return a boolean to
indicate whether a join should happen.

• **\_\_namedParameters.regex**: [`RegExp`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp )

The regular expression to match against. You'll usually want to start it
with `^` to that it is only matched at the start of a textblock.

• **\_\_namedParameters.type**: `string` \| [`NodeType`]( https://prosemirror.net/docs/ref/#model.NodeType )

The type of node to wrap in.

### Returns

[`Extension`](../core.md#ExtensionT)
