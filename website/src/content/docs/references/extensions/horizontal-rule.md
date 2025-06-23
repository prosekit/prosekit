---
title: prosekit/extensions/horizontal-rule
sidebar:
  label: extensions/horizontal-rule
---

## Type Aliases

### HorizontalRuleCommandsExtension {#horizontalrulecommandsextension}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="horizontalrulecommandsextension" href="#horizontalrulecommandsextension">HorizontalRuleCommandsExtension</a> = [`Extension`](../core.md#extension-1)\<\{ `Commands`: \{ `insertHorizontalRule`: \[\]; \}; \}\></code>

</dt>

</dl>

***

### HorizontalRuleExtension {#horizontalruleextension}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="horizontalruleextension" href="#horizontalruleextension">HorizontalRuleExtension</a> = `Union`\<\[[`HorizontalRuleSpecExtension`](#horizontalrulespecextension), [`HorizontalRuleCommandsExtension`](#horizontalrulecommandsextension)\]\></code>

</dt>

</dl>

***

### HorizontalRuleSpecExtension {#horizontalrulespecextension}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="horizontalrulespecextension" href="#horizontalrulespecextension">HorizontalRuleSpecExtension</a> = [`Extension`](../core.md#extension-1)\<\{ `Nodes`: \{ `horizontalRule`: [`Attrs`](../pm/model.md#attrs-7); \}; \}\></code>

</dt>

</dl>

## Functions

### defineHorizontalRule() {#definehorizontalrule}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definehorizontalrule-2" href="#definehorizontalrule-2">defineHorizontalRule</a>(): [`HorizontalRuleExtension`](#horizontalruleextension)</code>

</dt>

<dd>

</dd>

</dl>

***

### defineHorizontalRuleCommands() {#definehorizontalrulecommands}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definehorizontalrulecommands-2" href="#definehorizontalrulecommands-2">defineHorizontalRuleCommands</a>(): [`HorizontalRuleCommandsExtension`](#horizontalrulecommandsextension)</code>

</dt>

</dl>

***

### defineHorizontalRuleInputRule() {#definehorizontalruleinputrule}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definehorizontalruleinputrule-2" href="#definehorizontalruleinputrule-2">defineHorizontalRuleInputRule</a>(): `PlainExtension`</code>

</dt>

<dd>

</dd>

</dl>

***

### defineHorizontalRuleSpec() {#definehorizontalrulespec}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="definehorizontalrulespec-2" href="#definehorizontalrulespec-2">defineHorizontalRuleSpec</a>(): [`HorizontalRuleSpecExtension`](#horizontalrulespecextension)</code>

</dt>

</dl>

***

### insertHorizontalRule() {#inserthorizontalrule}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="inserthorizontalrule-2" href="#inserthorizontalrule-2">insertHorizontalRule</a>(): [`Command`](../pm/state.md#command)</code>

</dt>

<dd>

Returns a command that inserts a horizontal rule at the current selection.

</dd>

</dl>
