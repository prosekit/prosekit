---
title: prosekit/extensions/horizontal-rule
sidebar:
  label: extensions/horizontal-rule
---

## Type Aliases

### HorizontalRuleCommandsExtension {#horizontalrulecommandsextension}

<dl>

<dt>

<code data-typedoc-code>type <a id="horizontalrulecommandsextension" href="#horizontalrulecommandsextension">HorizontalRuleCommandsExtension</a> = [`Extension`](../core.md#extension-1)\<\{ `Commands`: \{ `insertHorizontalRule`: \[\]; \}; \}\></code>

</dt>

</dl>

***

### HorizontalRuleSpecExtension {#horizontalrulespecextension}

<dl>

<dt>

<code data-typedoc-code>type <a id="horizontalrulespecextension" href="#horizontalrulespecextension">HorizontalRuleSpecExtension</a> = [`Extension`](../core.md#extension-1)\<\{ `Nodes`: \{ `horizontalRule`: [`Attrs`](../pm/model.md#attrs-4); \}; \}\></code>

</dt>

</dl>

***

### HorizontalRuleExtension {#horizontalruleextension}

<dl>

<dt>

<code data-typedoc-code>type <a id="horizontalruleextension" href="#horizontalruleextension">HorizontalRuleExtension</a> = `Union`\<\[[`HorizontalRuleSpecExtension`](#horizontalrulespecextension), [`HorizontalRuleCommandsExtension`](#horizontalrulecommandsextension)\]\></code>

</dt>

</dl>

## Functions

### insertHorizontalRule() {#inserthorizontalrule}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="inserthorizontalrule" href="#inserthorizontalrule">insertHorizontalRule</a>(): [`Command`](../pm/state.md#command)</code>

</dt>

<dd>

Returns a command that inserts a horizontal rule at the current selection.

</dd>

</dl>

***

### defineHorizontalRuleCommands() {#definehorizontalrulecommands}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definehorizontalrulecommands" href="#definehorizontalrulecommands">defineHorizontalRuleCommands</a>(): [`HorizontalRuleCommandsExtension`](#horizontalrulecommandsextension)</code>

</dt>

</dl>

***

### defineHorizontalRuleInputRule() {#definehorizontalruleinputrule}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definehorizontalruleinputrule" href="#definehorizontalruleinputrule">defineHorizontalRuleInputRule</a>(): `PlainExtension`</code>

</dt>

<dd>

</dd>

</dl>

***

### defineHorizontalRuleSpec() {#definehorizontalrulespec}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definehorizontalrulespec" href="#definehorizontalrulespec">defineHorizontalRuleSpec</a>(): [`HorizontalRuleSpecExtension`](#horizontalrulespecextension)</code>

</dt>

</dl>

***

### defineHorizontalRule() {#definehorizontalrule}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definehorizontalrule" href="#definehorizontalrule">defineHorizontalRule</a>(): [`HorizontalRuleExtension`](#horizontalruleextension)</code>

</dt>

<dd>

</dd>

</dl>
