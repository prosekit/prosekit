---
title: prosekit/preact/block-handle
sidebar:
  label: preact/block-handle
---

## Anatomy

```jsx
import {
  BlockHandleAdd,
  BlockHandleDraggable,
  BlockHandlePopup,
  BlockHandlePositioner,
  BlockHandleRoot,
} from 'prosekit/preact/block-handle'

<BlockHandleRoot>
  <BlockHandlePositioner>
    <BlockHandlePopup>
      <BlockHandleAdd>...</BlockHandleAdd>
      <BlockHandleDraggable>...</BlockHandleDraggable>
    </BlockHandlePopup>
  </BlockHandlePositioner>
</BlockHandleRoot>
```

## Interfaces

### BlockHandleAddProps {#blockhandleaddprops}

Props for the [BlockHandleAdd](#blockhandleadd) Preact component.

***

### BlockHandleDraggableProps {#blockhandledraggableprops}

Props for the [BlockHandleDraggable](#blockhandledraggable) Preact component.

***

### BlockHandlePopupProps {#blockhandlepopupprops}

Props for the [BlockHandlePopup](#blockhandlepopup) Preact component.

***

### BlockHandlePositionerProps {#blockhandlepositionerprops}

Props for the [BlockHandlePositioner](#blockhandlepositioner) Preact component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="placement" href="#placement">placement</a><i>?</i>: `Placement`</code>

</dt>

<dd>

The placement of the popover, relative to the hovered block.

###### Default

`"left"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="hoist" href="#hoist">hoist</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="strategy" href="#strategy">strategy</a><i>?</i>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

`"absolute"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="autoupdate" href="#autoupdate">autoUpdate</a><i>?</i>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

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

<code data-typedoc-code><a id="offset" href="#offset">offset</a><i>?</i>: `OffsetOptions`</code>

</dt>

<dd>

The distance between the reference and floating element.

###### Default

`6`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overlap" href="#overlap">overlap</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="fitviewport" href="#fitviewport">fitViewport</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="samewidth" href="#samewidth">sameWidth</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="sameheight" href="#sameheight">sameHeight</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="inline" href="#inline">inline</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="boundary" href="#boundary">boundary</a><i>?</i>: `Boundary`</code>

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

<code data-typedoc-code><a id="rootboundary" href="#rootboundary">rootBoundary</a><i>?</i>: `RootBoundary`</code>

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

<code data-typedoc-code><a id="overflowpadding" href="#overflowpadding">overflowPadding</a><i>?</i>: `number`</code>

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

<code data-typedoc-code><a id="elementcontext" href="#elementcontext">elementContext</a><i>?</i>: `ElementContext`</code>

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

<code data-typedoc-code><a id="altboundary" href="#altboundary">altBoundary</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to check the alternate elementContext's boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

`false`

</dd>

</dl>

***

### BlockHandleRootProps {#blockhandlerootprops}

Props for the [BlockHandleRoot](#blockhandleroot) Preact component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="onstatechange" href="#onstatechange">onStateChange</a><i>?</i>: (`event`: [`BlockHandleStateChangeEvent`](../web/block-handle.md#blockhandlestatechangeevent)) => `void`</code>

</dt>

<dd>

Fired when the hovered block changes.

</dd>

</dl>

## Variables

### BlockHandleAdd {#blockhandleadd}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="blockhandleadd" href="#blockhandleadd">BlockHandleAdd</a>: `ForwardRefExoticComponent`\<[`BlockHandleAddProps`](#blockhandleaddprops) & `HTMLAttributes`\<[`BlockHandleAddElement`](../web/block-handle.md#blockhandleaddelement)\> & `RefAttributes`\<[`BlockHandleAddElement`](../web/block-handle.md#blockhandleaddelement)\>\></code>

</dt>

<dd>

A Preact component that renders an `prosekit-block-handle-add` custom element.

</dd>

</dl>

***

### BlockHandleDraggable {#blockhandledraggable}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="blockhandledraggable" href="#blockhandledraggable">BlockHandleDraggable</a>: `ForwardRefExoticComponent`\<[`BlockHandleDraggableProps`](#blockhandledraggableprops) & `HTMLAttributes`\<[`BlockHandleDraggableElement`](../web/block-handle.md#blockhandledraggableelement)\> & `RefAttributes`\<[`BlockHandleDraggableElement`](../web/block-handle.md#blockhandledraggableelement)\>\></code>

</dt>

<dd>

A Preact component that renders an `prosekit-block-handle-draggable` custom element.

</dd>

</dl>

***

### BlockHandlePopup {#blockhandlepopup}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="blockhandlepopup" href="#blockhandlepopup">BlockHandlePopup</a>: `ForwardRefExoticComponent`\<[`BlockHandlePopupProps`](#blockhandlepopupprops) & `HTMLAttributes`\<[`BlockHandlePopupElement`](../web/block-handle.md#blockhandlepopupelement)\> & `RefAttributes`\<[`BlockHandlePopupElement`](../web/block-handle.md#blockhandlepopupelement)\>\></code>

</dt>

<dd>

A Preact component that renders an `prosekit-block-handle-popup` custom element.

</dd>

</dl>

***

### BlockHandlePositioner {#blockhandlepositioner}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="blockhandlepositioner" href="#blockhandlepositioner">BlockHandlePositioner</a>: `ForwardRefExoticComponent`\<[`BlockHandlePositionerProps`](#blockhandlepositionerprops) & `HTMLAttributes`\<[`BlockHandlePositionerElement`](../web/block-handle.md#blockhandlepositionerelement)\> & `RefAttributes`\<[`BlockHandlePositionerElement`](../web/block-handle.md#blockhandlepositionerelement)\>\></code>

</dt>

<dd>

A Preact component that renders an `prosekit-block-handle-positioner` custom element.

</dd>

</dl>

***

### BlockHandleRoot {#blockhandleroot}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="blockhandleroot" href="#blockhandleroot">BlockHandleRoot</a>: `ForwardRefExoticComponent`\<[`BlockHandleRootProps`](#blockhandlerootprops) & `HTMLAttributes`\<[`BlockHandleRootElement`](../web/block-handle.md#blockhandlerootelement)\> & `RefAttributes`\<[`BlockHandleRootElement`](../web/block-handle.md#blockhandlerootelement)\>\></code>

</dt>

<dd>

A Preact component that renders an `prosekit-block-handle-root` custom element.

</dd>

</dl>
