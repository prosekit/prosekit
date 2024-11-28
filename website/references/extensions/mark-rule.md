# prosekit/extensions/mark-rule

## MarkRuleOptions {#mark-rule-options}

The options for [defineMarkRule](mark-rule.md#define-mark-rule).

<dl>

<dt>

`attrs`

</dt>

<dd>

Attributes to set on the mark. If a function is provided, it will be called
with the matched result from the regular expression.

**Type**: `null | Attrs | ((match: RegExpMatchArray) => null | Attrs)`

**Default**: `null`

</dd>

<dt>

`regex`

</dt>

<dd>

The regular expression to match against. It must has a `g` flag to match
all instances of the mark.

**Type**: `RegExp`

</dd>

<dt>

`type`

</dt>

<dd>

The mark type to apply to the matched text.

**Type**: `string | MarkType`

</dd>

</dl>

## defineMarkRule {#define-mark-rule}

```ts
function defineMarkRule(options: MarkRuleOptions): Extension<ExtensionTyping<any, any, any>>
```

A mark rule is something that can automatically apply marks to text if it
matches a certain pattern, and remove them if it doesn't match anymore.
