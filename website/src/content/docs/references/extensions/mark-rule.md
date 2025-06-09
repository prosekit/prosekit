---
title: prosekit/extensions/mark-rule
sidebar:
  label: extensions/mark-rule
---


## MarkRuleOptions {#mark-rule-options}

The options for [defineMarkRule](mark-rule.md#define-mark-rule).

<dl>

<dt>

`attrs?: null | Attrs | ((match: RegExpMatchArray) => null | Attrs)`

</dt>

<dd>

Attributes to set on the mark. If a function is provided, it will be called
with the matched result from the regular expression.

**Default**: `null`

</dd>

<dt>

`regex: RegExp`

</dt>

<dd>

The regular expression to match against. It must has a `g` flag to match
all instances of the mark.

</dd>

<dt>

`type: string | MarkType`

</dt>

<dd>

The mark type to apply to the matched text.

</dd>

</dl>

## defineMarkRule {#define-mark-rule}

```ts
function defineMarkRule(options: MarkRuleOptions): PlainExtension
```

A mark rule is something that can automatically apply marks to text if it
matches a certain pattern, and remove them if it doesn't match anymore.
