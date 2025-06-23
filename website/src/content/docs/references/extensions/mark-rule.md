---
title: prosekit/extensions/mark-rule
sidebar:
  label: extensions/mark-rule
---

## Interfaces

### MarkRuleOptions {#markruleoptions}

The options for [defineMarkRule](#definemarkrule).

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="attrs" href="#attrs">attrs</a><i>?</i>: `null` \| [`Attrs`](../pm/model.md#attrs-7) \| (`match`: `RegExpMatchArray`) => `null` \| [`Attrs`](../pm/model.md#attrs-7)</code>

</dt>

<dd>

Attributes to set on the mark. If a function is provided, it will be called
with the matched result from the regular expression.

###### Default

```ts
null
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="regex" href="#regex">regex</a>: [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)</code>

</dt>

<dd>

The regular expression to match against. It must has a `g` flag to match
all instances of the mark.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="type" href="#type">type</a>: `string` \| [`MarkType`](../pm/model.md#marktype-1)</code>

</dt>

<dd>

The mark type to apply to the matched text.

</dd>

</dl>

## Functions

### defineMarkRule() {#definemarkrule}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definemarkrule-2" href="#definemarkrule-2">defineMarkRule</a>(`options`: [`MarkRuleOptions`](#markruleoptions)): `PlainExtension`</code>

</dt>

<dd>

A mark rule is something that can automatically apply marks to text if it
matches a certain pattern, and remove them if it doesn't match anymore.

</dd>

</dl>
