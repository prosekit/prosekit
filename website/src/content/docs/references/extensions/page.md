---
title: prosekit/extensions/page
sidebar:
  label: extensions/page
---

## Interfaces

### PageRenderingOptions {#pagerenderingoptions}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="pagewidth" href="#pagewidth">pageWidth</a><i>?</i>: `number`</code>

</dt>

<dd>

The width of the page in px.

###### Default

```ts
794 (Portrait A4 paper size in 96 DPI)
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="pageheight" href="#pageheight">pageHeight</a><i>?</i>: `number`</code>

</dt>

<dd>

The height of the page in px.

###### Default

```ts
1123 (Portrait A4 paper size in 96 DPI)
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="margintop" href="#margintop">marginTop</a><i>?</i>: `number`</code>

</dt>

<dd>

The top margin of the page in px.

###### Default

`70`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="marginright" href="#marginright">marginRight</a><i>?</i>: `number`</code>

</dt>

<dd>

The right margin of the page in px.

###### Default

`70`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="marginbottom" href="#marginbottom">marginBottom</a><i>?</i>: `number`</code>

</dt>

<dd>

The bottom margin of the page in px.

###### Default

`70`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="marginleft" href="#marginleft">marginLeft</a><i>?</i>: `number`</code>

</dt>

<dd>

The left margin of the page in px.

###### Default

`70`

</dd>

</dl>

## Functions

### definePageBreak() {#definepagebreak}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definepagebreak" href="#definepagebreak">definePageBreak</a>(): `PageBreakExtension`</code>

</dt>

<dd>

</dd>

</dl>

***

### definePageRendering() {#definepagerendering}

<dl>

<dt>

<code data-typedoc-code><i>function</i> <a id="definepagerendering" href="#definepagerendering">definePageRendering</a>(`options?`: [`PageRenderingOptions`](#pagerenderingoptions)): `PageRenderingExtension`</code>

</dt>

<dd>

</dd>

</dl>
