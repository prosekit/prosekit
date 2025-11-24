---
title: prosekit/web/inline-popover
sidebar:
  label: web/inline-popover
---

## Classes

### InlinePopoverElement {#inlinepopoverelement}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor" href="#constructor">InlinePopoverElement</a>(): [`InlinePopoverElement`](#inlinepopoverelement)</code>

</dt>

</dl>

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

<code data-typedoc-code><a id="hoist" href="#hoist">hoist</a>: `boolean`</code>

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

<code data-typedoc-code><a id="transform" href="#transform">transform</a>: `boolean`</code>

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

<code data-typedoc-code><a id="flip" href="#flip">flip</a>: `boolean` \| `Placement`[]</code>

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

<code data-typedoc-code><a id="shift" href="#shift">shift</a>: `boolean`</code>

</dt>

<dd>

Whether the floating element should shift to keep it in view.

###### Default

`true`

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

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="defaultopen" href="#defaultopen">defaultOpen</a>: `boolean`</code>

</dt>

<dd>

Whether the popover is open by default when some inline content is
selected.

When `defaultOpen` is true, the popover will open or close based on the
inline selection. When `defaultOpen` is false, the popover will never be
opened unless the `open` prop is true.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="open" href="#open">open</a>: `boolean`</code>

</dt>

<dd>

Whether the popover is open.

Notice that the popover will be always hidden if the inline selection is
empty.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="dismissonescape" href="#dismissonescape">dismissOnEscape</a>: `boolean`</code>

</dt>

<dd>

Whether the inline popover should be dismissed when the editor receives an
Escape key press.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="placement" href="#placement">placement</a>: `Placement`</code>

</dt>

<dd>

###### Default

`"top"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="offset" href="#offset">offset</a>: `OffsetOptions` \| `undefined`</code>

</dt>

<dd>

###### Default

`12`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="hide" href="#hide">hide</a>: `boolean`</code>

</dt>

<dd>

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overlap" href="#overlap">overlap</a>: `boolean`</code>

</dt>

<dd>

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="inline" href="#inline">inline</a>: `boolean`</code>

</dt>

<dd>

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overflowpadding" href="#overflowpadding">overflowPadding</a>: `number`</code>

</dt>

<dd>

###### Default

`8`

</dd>

</dl>

## Interfaces

### InlinePopoverProps {#inlinepopoverprops}

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

<code data-typedoc-code><a id="hoist-1" href="#hoist-1">hoist</a>: `boolean`</code>

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

<code data-typedoc-code><a id="transform-1" href="#transform-1">transform</a>: `boolean`</code>

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

<code data-typedoc-code><a id="flip-1" href="#flip-1">flip</a>: `boolean` \| `Placement`[]</code>

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

<code data-typedoc-code><a id="shift-1" href="#shift-1">shift</a>: `boolean`</code>

</dt>

<dd>

Whether the floating element should shift to keep it in view.

###### Default

`true`

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

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="defaultopen-1" href="#defaultopen-1">defaultOpen</a>: `boolean`</code>

</dt>

<dd>

Whether the popover is open by default when some inline content is
selected.

When `defaultOpen` is true, the popover will open or close based on the
inline selection. When `defaultOpen` is false, the popover will never be
opened unless the `open` prop is true.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="open-1" href="#open-1">open</a>: `boolean`</code>

</dt>

<dd>

Whether the popover is open.

Notice that the popover will be always hidden if the inline selection is
empty.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="dismissonescape-1" href="#dismissonescape-1">dismissOnEscape</a>: `boolean`</code>

</dt>

<dd>

Whether the inline popover should be dismissed when the editor receives an
Escape key press.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="placement-1" href="#placement-1">placement</a>: `Placement`</code>

</dt>

<dd>

###### Default

`"top"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="offset-1" href="#offset-1">offset</a>: `OffsetOptions` \| `undefined`</code>

</dt>

<dd>

###### Default

`12`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="hide-1" href="#hide-1">hide</a>: `boolean`</code>

</dt>

<dd>

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overlap-1" href="#overlap-1">overlap</a>: `boolean`</code>

</dt>

<dd>

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="inline-1" href="#inline-1">inline</a>: `boolean`</code>

</dt>

<dd>

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overflowpadding-1" href="#overflowpadding-1">overflowPadding</a>: `number`</code>

</dt>

<dd>

###### Default

`8`

</dd>

</dl>

***

### InlinePopoverEvents {#inlinepopoverevents}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="openchange" href="#openchange">openChange</a>: [`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<`boolean`\></code>

</dt>

<dd>

Fired when the open state changes.

</dd>

</dl>
