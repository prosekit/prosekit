---
title: prosekit/web/resizable
sidebar:
  label: web/resizable
---

## Anatomy

```html
<prosekit-resizable-root>
  <img src="..." />
  <prosekit-resizable-handle>...</prosekit-resizable-handle>
</prosekit-resizable-root>
```

## Classes

### ResizableHandleElement {#resizablehandleelement}

`<prosekit-resizable-handle>` custom element.

Properties: [ResizableHandleProps](#resizablehandleprops)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor" href="#constructor">ResizableHandleElement</a>(): [`ResizableHandleElement`](#resizablehandleelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="position-1" href="#position-1">position</a>: `"left"` \| `"right"` \| `"top"` \| `"bottom"` \| `"top-left"` \| `"top-right"` \| `"bottom-left"` \| `"bottom-right"`</code>

</dt>

<dd>

The position of the handle.

###### Default

`"bottom-right"`

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="addcontroller" href="#addcontroller">addController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="removecontroller" href="#removecontroller">removeController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="connectedcallback" href="#connectedcallback">connectedCallback</a>(): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disconnectedcallback" href="#disconnectedcallback">disconnectedCallback</a>(): `void`</code>

</dt>

</dl>

***

### ResizeStartEvent {#resizestartevent}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-1" href="#constructor-1">ResizeStartEvent</a>(`width`: `number`, `height`: `number`): [`ResizeStartEvent`](#resizestartevent)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="detail" href="#detail">detail</a>: `object`</code>

</dt>

</dl>

***

### ResizeEndEvent {#resizeendevent}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-2" href="#constructor-2">ResizeEndEvent</a>(`width`: `number`, `height`: `number`): [`ResizeEndEvent`](#resizeendevent)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="detail-1" href="#detail-1">detail</a>: `object`</code>

</dt>

</dl>

***

### ResizableRootElement {#resizablerootelement}

`<prosekit-resizable-root>` custom element.

Properties: [ResizableRootProps](#resizablerootprops)

Events: [ResizableRootEvents](#resizablerootevents)

Data attributes:

| Attribute | Description |
| --- | --- |
| `data-resizing` | Present when the element is being resized |

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-3" href="#constructor-3">ResizableRootElement</a>(): [`ResizableRootElement`](#resizablerootelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="width-1" href="#width-1">width</a>: `number` \| `null`</code>

</dt>

<dd>

The width of the resizable element.

###### Default

`null`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="height-1" href="#height-1">height</a>: `number` \| `null`</code>

</dt>

<dd>

The height of the resizable element.

###### Default

`null`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="aspectratio-1" href="#aspectratio-1">aspectRatio</a>: `number` \| `null`</code>

</dt>

<dd>

The aspect ratio of the resizable element.

###### Default

`null`

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="addcontroller-1" href="#addcontroller-1">addController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="removecontroller-1" href="#removecontroller-1">removeController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="connectedcallback-1" href="#connectedcallback-1">connectedCallback</a>(): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disconnectedcallback-1" href="#disconnectedcallback-1">disconnectedCallback</a>(): `void`</code>

</dt>

</dl>

## Interfaces

### ResizableHandleProps {#resizablehandleprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="position" href="#position">position</a>: `"left"` \| `"right"` \| `"top"` \| `"bottom"` \| `"top-left"` \| `"top-right"` \| `"bottom-left"` \| `"bottom-right"`</code>

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

<code data-typedoc-code><a id="width" href="#width">width</a>: `number` \| `null`</code>

</dt>

<dd>

The width of the resizable element.

###### Default

`null`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="height" href="#height">height</a>: `number` \| `null`</code>

</dt>

<dd>

The height of the resizable element.

###### Default

`null`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="aspectratio" href="#aspectratio">aspectRatio</a>: `number` \| `null`</code>

</dt>

<dd>

The aspect ratio of the resizable element.

###### Default

`null`

</dd>

</dl>

***

### ResizableRootEvents {#resizablerootevents}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="resizestart" href="#resizestart">resizeStart</a>: [`ResizeStartEvent`](#resizestartevent)</code>

</dt>

<dd>

Emitted when a resize operation starts.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="resizeend" href="#resizeend">resizeEnd</a>: [`ResizeEndEvent`](#resizeendevent)</code>

</dt>

<dd>

Emitted when a resize operation ends.

</dd>

</dl>
