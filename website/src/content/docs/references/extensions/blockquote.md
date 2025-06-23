---
title: prosekit/extensions/blockquote
sidebar:
  label: extensions/blockquote
---

## Type Aliases

### BlockquoteCommandsExtension {#blockquotecommandsextension}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="blockquotecommandsextension" href="#blockquotecommandsextension">BlockquoteCommandsExtension</a> = [`Extension`](../core.md#extension-1)\<\{ `Commands`: \{ `insertBlockquote`: \[\]; `setBlockquote`: \[\]; `toggleBlockquote`: \[\]; \}; \}\></code>

</dt>

</dl>

***

### BlockquoteSpecExtension {#blockquotespecextension}

<dl>

<dt>

<code data-typedoc-declaration><i></i> type <a id="blockquotespecextension" href="#blockquotespecextension">BlockquoteSpecExtension</a> = [`Extension`](../core.md#extension-1)\<\{ `Nodes`: \{ `blockquote`: [`Attrs`](../pm/model.md#attrs-7); \}; \}\></code>

</dt>

</dl>

## Functions

### defineBlockquote() {#defineblockquote}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="defineblockquote-2" href="#defineblockquote-2">defineBlockquote</a>(): `BlockquoteExtension`</code>

</dt>

<dd>

</dd>

</dl>

***

### defineBlockquoteInputRule() {#defineblockquoteinputrule}

<dl>

<dt>

<code data-typedoc-declaration><i>function</i> <i></i> <a id="defineblockquoteinputrule-2" href="#defineblockquoteinputrule-2">defineBlockquoteInputRule</a>(): `PlainExtension`</code>

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

<code data-typedoc-declaration><i>function</i> <i></i> <a id="defineblockquotespec-2" href="#defineblockquotespec-2">defineBlockquoteSpec</a>(): [`BlockquoteSpecExtension`](#blockquotespecextension)</code>

</dt>

</dl>
