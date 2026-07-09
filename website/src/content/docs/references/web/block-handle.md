---
title: prosekit/web/block-handle
sidebar:
  label: web/block-handle
---

## Anatomy

```html
<prosekit-block-handle-root>
  <prosekit-block-handle-positioner>
    <prosekit-block-handle-popup>
      <prosekit-block-handle-add>...</prosekit-block-handle-add>
      <prosekit-block-handle-draggable>...</prosekit-block-handle-draggable>
    </prosekit-block-handle-popup>
  </prosekit-block-handle-positioner>
</prosekit-block-handle-root>
```

## Classes

### BlockHandleAddElement {#blockhandleaddelement}

`<prosekit-block-handle-add>` custom element.

Properties: [BlockHandleAddProps](#blockhandleaddprops)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor" href="#constructor">BlockHandleAddElement</a>(): [`BlockHandleAddElement`](#blockhandleaddelement)</code>

</dt>

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

### BlockHandleDraggableElement {#blockhandledraggableelement}

`<prosekit-block-handle-draggable>` custom element.

Properties: [BlockHandleDraggableProps](#blockhandledraggableprops)

Data attributes:

| Attribute | Description |
| --- | --- |
| `data-dragging` | Present when the element is being dragged |

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-1" href="#constructor-1">BlockHandleDraggableElement</a>(): [`BlockHandleDraggableElement`](#blockhandledraggableelement)</code>

</dt>

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

***

### BlockHandlePopupElement {#blockhandlepopupelement}

`<prosekit-block-handle-popup>` custom element.

Properties: [BlockHandlePopupProps](#blockhandlepopupprops)

Data attributes:

| Attribute | Description |
| --- | --- |
| `data-state` | `"open"` when the block handle is visible, `"closed"` otherwise |

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-2" href="#constructor-2">BlockHandlePopupElement</a>(): [`BlockHandlePopupElement`](#blockhandlepopupelement)</code>

</dt>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="addcontroller-2" href="#addcontroller-2">addController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="removecontroller-2" href="#removecontroller-2">removeController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="connectedcallback-2" href="#connectedcallback-2">connectedCallback</a>(): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disconnectedcallback-2" href="#disconnectedcallback-2">disconnectedCallback</a>(): `void`</code>

</dt>

</dl>

***

### BlockHandlePositionerElement {#blockhandlepositionerelement}

`<prosekit-block-handle-positioner>` custom element.

Properties: [BlockHandlePositionerProps](#blockhandlepositionerprops)

Data attributes:

| Attribute | Description |
| --- | --- |
| `data-state` | `"open"` when the block handle is visible, `"closed"` otherwise |
| `data-side` | The side of the anchor element the positioner is on |
| `data-align` | The alignment of the positioner relative to the anchor element |

CSS variables:

| Variable | Description |
| --- | --- |
| `--transform-origin` | The coordinates that this element is anchored to. Useful for scale animations. |

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-3" href="#constructor-3">BlockHandlePositionerElement</a>(): [`BlockHandlePositionerElement`](#blockhandlepositionerelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="strategy-1" href="#strategy-1">strategy</a>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

`"absolute"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="autoupdate-1" href="#autoupdate-1">autoUpdate</a>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

</dt>

<dd>

Options to activate auto-update listeners

###### See

https://floating-ui.com/docs/autoUpdate

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="offset-1" href="#offset-1">offset</a>: `OffsetOptions`</code>

</dt>

<dd>

The distance between the reference and floating element.

###### Default

`6`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overlap-1" href="#overlap-1">overlap</a>: `boolean`</code>

</dt>

<dd>

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="fitviewport-1" href="#fitviewport-1">fitViewport</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width and height to not exceed
the viewport.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="samewidth-1" href="#samewidth-1">sameWidth</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="sameheight-1" href="#sameheight-1">sameHeight</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="inline-1" href="#inline-1">inline</a>: `boolean`</code>

</dt>

<dd>

Whether to improve positioning for inline reference elements that span over
multiple lines.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="boundary-1" href="#boundary-1">boundary</a>: `Boundary`</code>

</dt>

<dd>

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

###### Default

`'clippingAncestors'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="rootboundary-1" href="#rootboundary-1">rootBoundary</a>: `RootBoundary`</code>

</dt>

<dd>

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

`'viewport'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overflowpadding-1" href="#overflowpadding-1">overflowPadding</a>: `number`</code>

</dt>

<dd>

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

###### Default

`4`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="elementcontext-1" href="#elementcontext-1">elementContext</a>: `ElementContext`</code>

</dt>

<dd>

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

`'floating'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="altboundary-1" href="#altboundary-1">altBoundary</a>: `boolean`</code>

</dt>

<dd>

Whether to check the alternate elementContext's boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="placement-1" href="#placement-1">placement</a>: `Placement`</code>

</dt>

<dd>

The placement of the popover, relative to the hovered block.

###### Default

`"left"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="hoist-1" href="#hoist-1">hoist</a>: `boolean`</code>

</dt>

<dd>

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content.

###### Default

`false`

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="addcontroller-3" href="#addcontroller-3">addController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="removecontroller-3" href="#removecontroller-3">removeController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="connectedcallback-3" href="#connectedcallback-3">connectedCallback</a>(): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disconnectedcallback-3" href="#disconnectedcallback-3">disconnectedCallback</a>(): `void`</code>

</dt>

</dl>

***

### BlockHandleStateChangeEvent {#blockhandlestatechangeevent}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-4" href="#constructor-4">BlockHandleStateChangeEvent</a>(`state`: \{ `node`: [`EditorNode`](../pm/model.md#editornode); `pos`: `number`; \} \| `null`): [`BlockHandleStateChangeEvent`](#blockhandlestatechangeevent)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="detail" href="#detail">detail</a>: \{ `node`: [`EditorNode`](../pm/model.md#editornode); `pos`: `number`; \} \| `null`</code>

</dt>

<dd>

The currently hovered block's node and position, or `null` if no block is hovered.

</dd>

</dl>

***

### BlockHandleRootElement {#blockhandlerootelement}

`<prosekit-block-handle-root>` custom element.

Properties: [BlockHandleRootProps](#blockhandlerootprops)

Events: [BlockHandleRootEvents](#blockhandlerootevents)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-5" href="#constructor-5">BlockHandleRootElement</a>(): [`BlockHandleRootElement`](#blockhandlerootelement)</code>

</dt>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="addcontroller-4" href="#addcontroller-4">addController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="removecontroller-4" href="#removecontroller-4">removeController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="connectedcallback-4" href="#connectedcallback-4">connectedCallback</a>(): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disconnectedcallback-4" href="#disconnectedcallback-4">disconnectedCallback</a>(): `void`</code>

</dt>

</dl>

## Interfaces

### BlockHandleAddProps {#blockhandleaddprops}

***

### BlockHandleDraggableProps {#blockhandledraggableprops}

***

### BlockHandlePopupProps {#blockhandlepopupprops}

***

### BlockHandlePositionerProps {#blockhandlepositionerprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="strategy" href="#strategy">strategy</a>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

`"absolute"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="autoupdate" href="#autoupdate">autoUpdate</a>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

</dt>

<dd>

Options to activate auto-update listeners

###### See

https://floating-ui.com/docs/autoUpdate

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="offset" href="#offset">offset</a>: `OffsetOptions`</code>

</dt>

<dd>

The distance between the reference and floating element.

###### Default

`6`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overlap" href="#overlap">overlap</a>: `boolean`</code>

</dt>

<dd>

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="fitviewport" href="#fitviewport">fitViewport</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width and height to not exceed
the viewport.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="samewidth" href="#samewidth">sameWidth</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="sameheight" href="#sameheight">sameHeight</a>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="inline" href="#inline">inline</a>: `boolean`</code>

</dt>

<dd>

Whether to improve positioning for inline reference elements that span over
multiple lines.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="boundary" href="#boundary">boundary</a>: `Boundary`</code>

</dt>

<dd>

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

###### Default

`'clippingAncestors'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="rootboundary" href="#rootboundary">rootBoundary</a>: `RootBoundary`</code>

</dt>

<dd>

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

`'viewport'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overflowpadding" href="#overflowpadding">overflowPadding</a>: `number`</code>

</dt>

<dd>

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

###### Default

`4`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="elementcontext" href="#elementcontext">elementContext</a>: `ElementContext`</code>

</dt>

<dd>

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

`'floating'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="altboundary" href="#altboundary">altBoundary</a>: `boolean`</code>

</dt>

<dd>

Whether to check the alternate elementContext's boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="placement" href="#placement">placement</a>: `Placement`</code>

</dt>

<dd>

The placement of the popover, relative to the hovered block.

###### Default

`"left"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="hoist" href="#hoist">hoist</a>: `boolean`</code>

</dt>

<dd>

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content.

###### Default

`false`

</dd>

</dl>

***

### BlockHandleRootProps {#blockhandlerootprops}

***

### BlockHandleRootEvents {#blockhandlerootevents}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="statechange" href="#statechange">stateChange</a>: [`BlockHandleStateChangeEvent`](#blockhandlestatechangeevent)</code>

</dt>

<dd>

Fired when the hovered block changes.

</dd>

</dl>
