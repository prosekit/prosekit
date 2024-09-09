# prosekit/extensions/mark-rule

<a id="MarkRuleOptions" name="MarkRuleOptions"></a>

## MarkRuleOptions

The options for [defineMarkRule](mark-rule.md#defineMarkRule).

### Properties

<a id="attrs" name="attrs"></a>

#### attrs?

> `optional` **attrs**: `null` \| [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs) \| (`match`) => `null` \| [`Attrs`](https://prosemirror.net/docs/ref/#model.Attrs)

Attributes to set on the mark. If a function is provided, it will be called
with the matched result from the regular expression.

##### Default

```ts
null
```

<a id="regex" name="regex"></a>

#### regex

> **regex**: [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

The regular expression to match against. It must has a `g` flag to match
all instances of the mark.

<a id="type" name="type"></a>

#### type

> **type**: `string` \| [`MarkType`](https://prosemirror.net/docs/ref/#model.MarkType)

The mark type to apply to the matched text.

***

<a id="defineMarkRule" name="defineMarkRule"></a>

## defineMarkRule()

> **defineMarkRule**(`options`): [`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>

A mark rule is something that can automatically apply marks to text if it
matches a certain pattern, and remove them if it doesn't match anymore.

### Parameters

• **options**: [`MarkRuleOptions`](mark-rule.md#MarkRuleOptions)

### Returns

[`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`any`, `any`, `any`\>\>
