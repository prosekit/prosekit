---
title: prosekit/react/tooltip
sidebar:
  label: react/tooltip
---

## Interfaces

### TooltipContentProps {#tooltipcontentprops}

Props for the [TooltipContent](#tooltipcontent) component.

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

<code data-typedoc-code><i></i> <a id="placement" href="#placement">placement</a><i>?</i>: `Placement`</code>

</dt>

<dd>

The initial placement of the floating element

###### Default

`"top"`

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

<code data-typedoc-code><i></i> <a id="hoist" href="#hoist">hoist</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content. When enabled,
the floating element won't be clipped by an ancestor. This provides a
similar result to React's `<Portals>` or Vue's `<Teleport>`.

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

<code data-typedoc-code><i></i> <a id="flip" href="#flip">flip</a><i>?</i>: `boolean` \| `Placement`[]</code>

</dt>

<dd>

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="shift" href="#shift">shift</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the floating element should shift to keep it in view.

###### Default

`true`

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

<code data-typedoc-code><i></i> <a id="hide" href="#hide">hide</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

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

***

### TooltipRootProps {#tooltiprootprops}

Props for the [TooltipRoot](#tooltiproot) component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="opendelay" href="#opendelay">openDelay</a><i>?</i>: `number`</code>

</dt>

<dd>

The delay in milliseconds before the tooltip opens.

###### Default

`700`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="closedelay" href="#closedelay">closeDelay</a><i>?</i>: `number`</code>

</dt>

<dd>

The delay in milliseconds before the tooltip closes.

###### Default

`300`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="open" href="#open">open</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the popover is open.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="onopenchange" href="#onopenchange">onOpenChange</a><i>?</i>: (`event`: `boolean`) => `void`</code>

</dt>

</dl>

***

### TooltipTriggerProps {#tooltiptriggerprops}

Props for the [TooltipTrigger](#tooltiptrigger) component.

## Variables

### TooltipContent {#tooltipcontent}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="tooltipcontent" href="#tooltipcontent">TooltipContent</a>: `ForwardRefExoticComponent`\<[`TooltipContentProps`](#tooltipcontentprops) & `RefAttributes`\<[`TooltipContentElement`](../web/tooltip.md#tooltipcontentelement)\> & `HTMLAttributes`\<[`TooltipContentElement`](../web/tooltip.md#tooltipcontentelement)\>\></code>

</dt>

</dl>

***

### TooltipRoot {#tooltiproot}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="tooltiproot" href="#tooltiproot">TooltipRoot</a>: `ForwardRefExoticComponent`\<[`TooltipRootProps`](#tooltiprootprops) & `RefAttributes`\<[`TooltipRootElement`](../web/tooltip.md#tooltiprootelement)\> & `HTMLAttributes`\<[`TooltipRootElement`](../web/tooltip.md#tooltiprootelement)\>\></code>

</dt>

</dl>

***

### TooltipTrigger {#tooltiptrigger}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="tooltiptrigger" href="#tooltiptrigger">TooltipTrigger</a>: `ForwardRefExoticComponent`\<[`TooltipTriggerProps`](#tooltiptriggerprops) & `RefAttributes`\<[`TooltipTriggerElement`](../web/tooltip.md#tooltiptriggerelement)\> & `HTMLAttributes`\<[`TooltipTriggerElement`](../web/tooltip.md#tooltiptriggerelement)\>\></code>

</dt>

</dl>
