---
title: prosekit/solid/block-handle
sidebar:
  label: solid/block-handle
---

## Interfaces

### BlockHandleAddProps {#blockhandleaddprops}

Props for the [BlockHandleAdd](#blockhandleadd) component.

***

### BlockHandleDraggableProps {#blockhandledraggableprops}

Props for the [BlockHandleDraggable](#blockhandledraggable) component.

***

### BlockHandlePopoverProps {#blockhandlepopoverprops}

Props for the [BlockHandlePopover](#blockhandlepopover) component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="strategy" href="#strategy">strategy</a><i>?</i>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

`"absolute"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="autoupdate" href="#autoupdate">autoUpdate</a><i>?</i>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

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

<code data-typedoc-code><i></i> <a id="transform" href="#transform">transform</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="offset" href="#offset">offset</a><i>?</i>: `OffsetOptions`</code>

</dt>

<dd>

The distance between the reference and floating element.

###### Default

`6`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="overlap" href="#overlap">overlap</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><i></i> <a id="fitviewport" href="#fitviewport">fitViewport</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><i></i> <a id="samewidth" href="#samewidth">sameWidth</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><i></i> <a id="sameheight" href="#sameheight">sameHeight</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><i></i> <a id="inline" href="#inline">inline</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><i></i> <a id="boundary" href="#boundary">boundary</a><i>?</i>: `Boundary`</code>

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

<code data-typedoc-code><i></i> <a id="rootboundary" href="#rootboundary">rootBoundary</a><i>?</i>: `RootBoundary`</code>

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

<code data-typedoc-code><i></i> <a id="overflowpadding" href="#overflowpadding">overflowPadding</a><i>?</i>: `number`</code>

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

<code data-typedoc-code><i></i> <a id="elementcontext" href="#elementcontext">elementContext</a><i>?</i>: `ElementContext`</code>

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

<code data-typedoc-code><i></i> <a id="altboundary" href="#altboundary">altBoundary</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="placement" href="#placement">placement</a><i>?</i>: `Placement`</code>

</dt>

<dd>

The placement of the popover, relative to the hovered block.

###### Default

`"left"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="hoist" href="#hoist">hoist</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><i></i> <a id="onstatechange" href="#onstatechange">onStateChange</a><i>?</i>: (`event`: `null` \| \{ `node`: [`ProseMirrorNode`](../pm/model.md#prosemirrornode); `pos`: `number`; \}) => `void`</code>

</dt>

</dl>

## Variables

### BlockHandleAdd {#blockhandleadd}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="blockhandleadd" href="#blockhandleadd">BlockHandleAdd</a>: `Component`\<`PropsWithElement`\<[`BlockHandleAddProps`](#blockhandleaddprops), [`BlockHandleAddElement`](../web/block-handle.md#blockhandleaddelement)\>\></code>

</dt>

</dl>

***

### BlockHandleDraggable {#blockhandledraggable}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="blockhandledraggable" href="#blockhandledraggable">BlockHandleDraggable</a>: `Component`\<`PropsWithElement`\<[`BlockHandleDraggableProps`](#blockhandledraggableprops), [`BlockHandleDraggableElement`](../web/block-handle.md#blockhandledraggableelement)\>\></code>

</dt>

</dl>

***

### BlockHandlePopover {#blockhandlepopover}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="blockhandlepopover" href="#blockhandlepopover">BlockHandlePopover</a>: `Component`\<`PropsWithElement`\<[`BlockHandlePopoverProps`](#blockhandlepopoverprops), [`BlockHandlePopoverElement`](../web/block-handle.md#blockhandlepopoverelement)\>\></code>

</dt>

</dl>
