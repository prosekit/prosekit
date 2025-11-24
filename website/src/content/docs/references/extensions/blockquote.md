---
title: prosekit/extensions/blockquote
sidebar:
  label: extensions/blockquote
---

## Type Aliases

### BlockquoteCommandsExtension {#blockquotecommandsextension}

<dl>

<dt>

<code data-typedoc-code>type <a id="blockquotecommandsextension" href="#blockquotecommandsextension">BlockquoteCommandsExtension</a> = [`Extension`](../core.md#extension-1)\<\{ `Commands`: \{ `setBlockquote`: \[\]; `insertBlockquote`: \[\]; `toggleBlockquote`: \[\]; \}; \}\></code>

</dt>

</dl>

***

### BlockquoteSpecExtension {#blockquotespecextension}

<dl>

<dt>

<code data-typedoc-code>type <a id="blockquotespecextension" href="#blockquotespecextension">BlockquoteSpecExtension</a> = [`Extension`](../core.md#extension-1)\<\{ `Nodes`: \{ `blockquote`: [`Attrs`](../pm/model.md#attrs-4); \}; \}\></code>

</dt>

</dl>

## Functions

### defineBlockquoteInputRule() {#defineblockquoteinputrule}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="defineblockquoteinputrule" href="#defineblockquoteinputrule">defineBlockquoteInputRule</a>(): `PlainExtension`</code>

</dt>

<dd>

Wraps the text block in a blockquote when `>` is typed at the start of a new
line followed by a space.

</dd>

</dl>

***

### defineBlockquoteSpec() {#defineblockquotespec}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="defineblockquotespec" href="#defineblockquotespec">defineBlockquoteSpec</a>(): [`BlockquoteSpecExtension`](#blockquotespecextension)</code>

</dt>

</dl>

***

### defineBlockquote() {#defineblockquote}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="defineblockquote" href="#defineblockquote">defineBlockquote</a>(): `BlockquoteExtension`</code>

</dt>

<dd>

</dd>

</dl>
