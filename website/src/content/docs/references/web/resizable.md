---
title: prosekit/web/resizable
sidebar:
  label: web/resizable
---

## Classes

### ResizableHandleElement {#resizablehandleelement}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code><i></i> new <a id="constructor" href="#constructor">ResizableHandleElement</a>(): [`ResizableHandleElement`](#resizablehandleelement)</code>

</dt>

<dd>

###### Inherited from

`ResizableHandleElementBase.constructor`

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="position" href="#position">position</a>: `"left"` \| `"right"` \| `"top"` \| `"bottom"` \| `"top-left"` \| `"top-right"` \| `"bottom-left"` \| `"bottom-right"`</code>

</dt>

<dd>

The position of the handle.

###### Default

`"bottom-right"`

</dd>

</dl>

***

### ResizableRootElement {#resizablerootelement}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code><i></i> new <a id="constructor-1" href="#constructor-1">ResizableRootElement</a>(): [`ResizableRootElement`](#resizablerootelement)</code>

</dt>

<dd>

###### Inherited from

`ResizableRootElementBase.constructor`

</dd>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="width" href="#width">width</a>: `null` \| `number`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="height" href="#height">height</a>: `null` \| `number`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="aspectratio" href="#aspectratio">aspectRatio</a>: `null` \| `number`</code>

</dt>

</dl>

## Interfaces

### ResizableHandleProps {#resizablehandleprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="position-1" href="#position-1">position</a>: `"left"` \| `"right"` \| `"top"` \| `"bottom"` \| `"top-left"` \| `"top-right"` \| `"bottom-left"` \| `"bottom-right"`</code>

</dt>

<dd>

The position of the handle.

###### Default

`"bottom-right"`

</dd>

</dl>

***

### ResizableRootProps {#resizablerootprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="width-1" href="#width-1">width</a>: `null` \| `number`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="height-1" href="#height-1">height</a>: `null` \| `number`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="aspectratio-1" href="#aspectratio-1">aspectRatio</a>: `null` \| `number`</code>

</dt>

</dl>

***

### ResizableRootEvents {#resizablerootevents}

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="resizestart" href="#resizestart">resizeStart</a>: [`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<\{ `width`: `number`; `height`: `number`; \}\></code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="resizeend" href="#resizeend">resizeEnd</a>: [`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<\{ `width`: `number`; `height`: `number`; \}\></code>

</dt>

</dl>
