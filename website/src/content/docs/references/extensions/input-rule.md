---
title: prosekit/extensions/input-rule
sidebar:
  label: extensions/input-rule
---

## Interfaces

### MarkInputRuleOptions {#markinputruleoptions}

Options for [defineMarkInputRule](#definemarkinputrule).

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="regex" href="#regex">regex</a>: [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)</code>

</dt>

<dd>

The regular expression to match against, which should end with `$` and has
exactly one capture group. All other matched text outside the capture group
will be deleted.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="type" href="#type">type</a>: `string` \| [`MarkType`](../pm/model.md#marktype-1)</code>

</dt>

<dd>

The type of mark to set.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="attrs" href="#attrs">attrs</a><i>?</i>: `null` \| [`Attrs`](../pm/model.md#attrs-4) \| (`match`: `RegExpMatchArray`) => `null` \| [`Attrs`](../pm/model.md#attrs-4)</code>

</dt>

<dd>

Attributes to set on the mark.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="incodemark" href="#incodemark">inCodeMark</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether this rule should fire inside marks marked as [code](https://prosemirror.net/docs/ref/#model.MarkSpec.code).

###### Default

`false`

</dd>

</dl>

## Functions

### defineInputRule() {#defineinputrule}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="defineinputrule" href="#defineinputrule">defineInputRule</a>(`rule`: [`InputRule`](https://prosemirror.net/docs/ref/#inputrules.InputRule)): `PlainExtension`</code>

</dt>

<dd>

Defines an input rule extension.

</dd>

</dl>

***

### defineMarkInputRule() {#definemarkinputrule}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definemarkinputrule" href="#definemarkinputrule">defineMarkInputRule</a>(`options`: [`MarkInputRuleOptions`](#markinputruleoptions)): `PlainExtension`</code>

</dt>

<dd>

Defines an input rule for automatically adding inline marks when a given
pattern is typed.

</dd>

</dl>

***

### defineTextBlockInputRule() {#definetextblockinputrule}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definetextblockinputrule" href="#definetextblockinputrule">defineTextBlockInputRule</a>(`options`: `object`): `PlainExtension`</code>

</dt>

<dd>

Defines an input rule that changes the type of a textblock when the matched
text is typed into it.

See also [textblockTypeInputRule](https://prosemirror.net/docs/ref/#inputrules.textblockTypeInputRule)

</dd>

</dl>

***

### defineWrappingInputRule() {#definewrappinginputrule}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definewrappinginputrule" href="#definewrappinginputrule">defineWrappingInputRule</a>(`options`: `object`): `PlainExtension`</code>

</dt>

<dd>

Defines an input rule for automatically wrapping a textblock when a given
string is typed.

See also [wrappingInputRule](https://prosemirror.net/docs/ref/#inputrules.wrappingInputRule)

</dd>

</dl>
