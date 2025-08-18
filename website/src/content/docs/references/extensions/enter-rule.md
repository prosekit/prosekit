---
title: prosekit/extensions/enter-rule
sidebar:
  label: extensions/enter-rule
---

## Interfaces

### EnterRuleHandlerOptions {#enterrulehandleroptions}

Options for [EnterRuleHandler](#enterrulehandler).

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="state" href="#state">state</a>: [`EditorState`](../pm/state.md#editorstate)</code>

</dt>

<dd>

The current editor state.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="from" href="#from">from</a>: `number`</code>

</dt>

<dd>

The start position of the matched text.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="to" href="#to">to</a>: `number`</code>

</dt>

<dd>

The end position of the matched text.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="match" href="#match">match</a>: `RegExpExecArray`</code>

</dt>

<dd>

The matched result from the regular expression.

</dd>

</dl>

***

### TextBlockEnterRuleOptions {#textblockenterruleoptions}

Options for [defineTextBlockEnterRule](#definetextblockenterrule).

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="regex-1" href="#regex-1">regex</a>: [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)</code>

</dt>

<dd>

The regular expression to match against. It should end with `$`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="type" href="#type">type</a>: `string` \| [`NodeType`](../pm/model.md#nodetype)</code>

</dt>

<dd>

The node type to replace the matched text with.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="attrs" href="#attrs">attrs</a><i>?</i>: `null` \| [`Attrs`](../pm/model.md#attrs-4) \| (`match`: `RegExpMatchArray`) => `null` \| [`Attrs`](../pm/model.md#attrs-4)</code>

</dt>

<dd>

Attributes to set on the node. If a function is provided, it will be called
with the matched result from the regular expression.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="stop-1" href="#stop-1">stop</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to stop further handlers from being called if this rule is triggered.

###### Default

`true`

</dd>

</dl>

## Type Aliases

### EnterRuleHandler() {#enterrulehandler}

<dl>

<dt>

<code data-typedoc-code>type <a id="enterrulehandler" href="#enterrulehandler">EnterRuleHandler</a> = (`options`: [`EnterRuleHandlerOptions`](#enterrulehandleroptions)) => [`Transaction`](../pm/state.md#transaction) \| `null`</code>

</dt>

<dd>

</dd>

</dl>

***

### EnterRuleOptions {#enterruleoptions}

<code data-typedoc-code>type <a id="enterruleoptions" href="#enterruleoptions">EnterRuleOptions</a> = \{ `regex`: [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp); `handler`: [`EnterRuleHandler`](#enterrulehandler); `stop?`: `boolean`; \}</code>

Options for [defineEnterRule](#defineenterrule).

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="regex" href="#regex">regex</a>: [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)</code>

</dt>

<dd>

The regular expression to match against. It should end with `$`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="handler" href="#handler">handler</a>: [`EnterRuleHandler`](#enterrulehandler)</code>

</dt>

<dd>

A function to be called when an enter rule is triggered.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="stop" href="#stop">stop</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to stop further handlers from being called if this rule is triggered.

###### Default

`false`

</dd>

</dl>

## Functions

### defineEnterRule() {#defineenterrule}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="defineenterrule" href="#defineenterrule">defineEnterRule</a>(`options`: [`EnterRuleOptions`](#enterruleoptions)): `PlainExtension`</code>

</dt>

<dd>

Defines an enter rule. An enter rule applies when the text directly in front of
the cursor matches `regex` and user presses Enter. The `regex` should end
with `$`.

</dd>

</dl>

***

### defineTextBlockEnterRule() {#definetextblockenterrule}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definetextblockenterrule" href="#definetextblockenterrule">defineTextBlockEnterRule</a>(`options`: [`TextBlockEnterRuleOptions`](#textblockenterruleoptions)): `PlainExtension`</code>

</dt>

<dd>

Defines an enter rule that replaces the matched text with a block node.

See also [defineEnterRule](#defineenterrule).

</dd>

</dl>
