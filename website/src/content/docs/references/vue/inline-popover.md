---
title: prosekit/vue/inline-popover
sidebar:
  label: vue/inline-popover
---

## Anatomy

```jsx
import {
  InlinePopoverPopup,
  InlinePopoverPositioner,
  InlinePopoverRoot,
} from 'prosekit/vue/inline-popover'

<InlinePopoverRoot>
  <InlinePopoverPositioner>
    <InlinePopoverPopup>...</InlinePopoverPopup>
  </InlinePopoverPositioner>
</InlinePopoverRoot>
```

## Interfaces

### InlinePopoverPopupProps {#inlinepopoverpopupprops}

Props for the [InlinePopoverPopup](#inlinepopoverpopup) Vue component.

***

### InlinePopoverPositionerProps {#inlinepopoverpositionerprops}

Props for the [InlinePopoverPositioner](#inlinepopoverpositioner) Vue component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="placement" href="#placement">placement</a><i>?</i>: `Placement`</code>

</dt>

<dd>

The initial placement of the floating element

###### Default

`"top"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="offset" href="#offset">offset</a><i>?</i>: `OffsetOptions`</code>

</dt>

<dd>

The distance between the reference and floating element.

###### Default

`12`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="hide" href="#hide">hide</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

`true`

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

<code data-typedoc-code><a id="overlap" href="#overlap">overlap</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

`true`

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

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overflowpadding" href="#overflowpadding">overflowPadding</a><i>?</i>: `number`</code>

</dt>

<dd>

Describes the virtual padding around the boundary to check for overflow.

###### Default

`8`

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

<code data-typedoc-code><a id="flip" href="#flip">flip</a><i>?</i>: `boolean` \| `Placement`[]</code>

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

<code data-typedoc-code><a id="shift" href="#shift">shift</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the floating element should shift to keep it in view.

###### Default

`true`

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

### InlinePopoverRootProps {#inlinepopoverrootprops}

Props for the [InlinePopoverRoot](#inlinepopoverroot) Vue component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="defaultopen" href="#defaultopen">defaultOpen</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the popover is open by default when some inline content is
selected.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="dismissonescape" href="#dismissonescape">dismissOnEscape</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="open" href="#open">open</a><i>?</i>: `boolean` \| `null`</code>

</dt>

<dd>

Whether the overlay is currently open.

###### Default

`null`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disabled" href="#disabled">disabled</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the component should ignore user interaction.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="onopenchange" href="#onopenchange">onOpenChange</a><i>?</i>: (`event`: [`OpenChangeEvent`](../web/autocomplete.md#openchangeevent)) => `void`</code>

</dt>

<dd>

Emitted when the open state of the popover changes.

</dd>

</dl>

## Variables

### InlinePopoverPopup {#inlinepopoverpopup}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="inlinepopoverpopup" href="#inlinepopoverpopup">InlinePopoverPopup</a>: `DefineSetupFnComponent`\<[`InlinePopoverPopupProps`](#inlinepopoverpopupprops) & `HTMLAttributes`\></code>

</dt>

<dd>

A Vue component that renders an `prosekit-inline-popover-popup` custom element.

</dd>

</dl>

***

### InlinePopoverPositioner {#inlinepopoverpositioner}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="inlinepopoverpositioner" href="#inlinepopoverpositioner">InlinePopoverPositioner</a>: `DefineSetupFnComponent`\<[`InlinePopoverPositionerProps`](#inlinepopoverpositionerprops) & `HTMLAttributes`\></code>

</dt>

<dd>

A Vue component that renders an `prosekit-inline-popover-positioner` custom element.

</dd>

</dl>

***

### InlinePopoverRoot {#inlinepopoverroot}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="inlinepopoverroot" href="#inlinepopoverroot">InlinePopoverRoot</a>: `DefineSetupFnComponent`\<[`InlinePopoverRootProps`](#inlinepopoverrootprops) & `HTMLAttributes`\></code>

</dt>

<dd>

A Vue component that renders an `prosekit-inline-popover-root` custom element.

</dd>

</dl>
