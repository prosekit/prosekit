---
title: prosekit/extensions/math
sidebar:
  label: extensions/math
---

## Interfaces

### MathOptions {#mathoptions}

Options for [defineMath](#definemath).

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="rendermathblock" href="#rendermathblock">renderMathBlock</a>: `RenderMathBlock`</code>

</dt>

<dd>

The function to render the math block.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="rendermathinline" href="#rendermathinline">renderMathInline</a>: `RenderMathInline`</code>

</dt>

<dd>

The function to render the math inline.

</dd>

</dl>

## Type Aliases

### MathExtension {#mathextension}

<dl>

<dt>

<code data-typedoc-code>type <a id="mathextension" href="#mathextension">MathExtension</a> = `Union`\<\[`MathInlineExtension`, `MathBlockExtension`\]\></code>

</dt>

<dd>

</dd>

</dl>

## Functions

### defineMathBlock() {#definemathblock}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definemathblock" href="#definemathblock">defineMathBlock</a>(`options`: `MathBlockOptions`): `MathBlockExtension`</code>

</dt>

<dd>

Defines node `mathBlock` and related functionalities.

</dd>

</dl>

***

### defineMathInline() {#definemathinline}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definemathinline" href="#definemathinline">defineMathInline</a>(`options`: `MathInlineOptions`): `MathInlineExtension`</code>

</dt>

<dd>

Defines node `mathInline` and related functionalities.

</dd>

</dl>

***

### defineMathPlugin() {#definemathplugin}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definemathplugin" href="#definemathplugin">defineMathPlugin</a>(): `PlainExtension`</code>

</dt>

</dl>

***

### defineMath() {#definemath}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definemath" href="#definemath">defineMath</a>(`options`: [`MathOptions`](#mathoptions)): [`MathExtension`](#mathextension)</code>

</dt>

<dd>

</dd>

</dl>
