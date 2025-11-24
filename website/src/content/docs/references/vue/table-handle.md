---
title: prosekit/vue/table-handle
sidebar:
  label: vue/table-handle
---

## Interfaces

### TableHandleColumnRootProps {#tablehandlecolumnrootprops}

Props for the [TableHandleColumnRoot](#tablehandlecolumnroot) component.

#### Properties

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

<code data-typedoc-code><a id="transform" href="#transform">transform</a><i>?</i>: `boolean`</code>

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

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="placement" href="#placement">placement</a><i>?</i>: `Placement`</code>

</dt>

<dd>

The placement of the popover, relative to the hovered table cell.

###### Default

`"top"`

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

***

### TableHandleColumnRootEmits {#tablehandlecolumnrootemits}

Emits for the [TableHandleColumnRoot](#tablehandlecolumnroot) component.

***

### TableHandleColumnTriggerProps {#tablehandlecolumntriggerprops}

Props for the [TableHandleColumnTrigger](#tablehandlecolumntrigger) component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="editor" href="#editor">editor</a><i>?</i>: [`Editor`](../core.md#editor)\<`TableCommandsExtension`\> \| `null`</code>

</dt>

</dl>

***

### TableHandleColumnTriggerEmits {#tablehandlecolumntriggeremits}

Emits for the [TableHandleColumnTrigger](#tablehandlecolumntrigger) component.

***

### TableHandleDragPreviewProps {#tablehandledragpreviewprops}

Props for the [TableHandleDragPreview](#tablehandledragpreview) component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="editor-1" href="#editor-1">editor</a><i>?</i>: [`Editor`](../core.md#editor)\<`any`\> \| `null`</code>

</dt>

</dl>

***

### TableHandleDragPreviewEmits {#tablehandledragpreviewemits}

Emits for the [TableHandleDragPreview](#tablehandledragpreview) component.

***

### TableHandleDropIndicatorProps {#tablehandledropindicatorprops}

Props for the [TableHandleDropIndicator](#tablehandledropindicator) component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="editor-2" href="#editor-2">editor</a><i>?</i>: [`Editor`](../core.md#editor)\<`TableCommandsExtension`\> \| `null`</code>

</dt>

</dl>

***

### TableHandleDropIndicatorEmits {#tablehandledropindicatoremits}

Emits for the [TableHandleDropIndicator](#tablehandledropindicator) component.

***

### TableHandlePopoverContentProps {#tablehandlepopovercontentprops}

Props for the [TableHandlePopoverContent](#tablehandlepopovercontent) component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="eventtarget" href="#eventtarget">eventTarget</a><i>?</i>: [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement) \| `TypedEventTarget`\<`"keydown"`\></code>

</dt>

<dd>

By default, the menu element will listen for keydown events. You can pass a
different element to listen for keydown events.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="strategy-1" href="#strategy-1">strategy</a><i>?</i>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

`"absolute"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="autoupdate-1" href="#autoupdate-1">autoUpdate</a><i>?</i>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

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

<code data-typedoc-code><a id="hoist-1" href="#hoist-1">hoist</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="transform-1" href="#transform-1">transform</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="overlap-1" href="#overlap-1">overlap</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="fitviewport-1" href="#fitviewport-1">fitViewport</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="samewidth-1" href="#samewidth-1">sameWidth</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="sameheight-1" href="#sameheight-1">sameHeight</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="inline-1" href="#inline-1">inline</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="hide" href="#hide">hide</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="boundary-1" href="#boundary-1">boundary</a><i>?</i>: `Boundary`</code>

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

<code data-typedoc-code><a id="rootboundary-1" href="#rootboundary-1">rootBoundary</a><i>?</i>: `RootBoundary`</code>

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

<code data-typedoc-code><a id="overflowpadding-1" href="#overflowpadding-1">overflowPadding</a><i>?</i>: `number`</code>

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

<code data-typedoc-code><a id="elementcontext-1" href="#elementcontext-1">elementContext</a><i>?</i>: `ElementContext`</code>

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

<code data-typedoc-code><a id="altboundary-1" href="#altboundary-1">altBoundary</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="placement-1" href="#placement-1">placement</a><i>?</i>: `Placement`</code>

</dt>

<dd>

###### Default

`'bottom-start'`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="offset-1" href="#offset-1">offset</a><i>?</i>: `OffsetOptions`</code>

</dt>

<dd>

###### Default

```ts
{mainAxis: -4, crossAxis: 4}
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="editor-3" href="#editor-3">editor</a><i>?</i>: [`Editor`](../core.md#editor)\<`any`\> \| `null`</code>

</dt>

</dl>

***

### TableHandlePopoverContentEmits {#tablehandlepopovercontentemits}

Emits for the [TableHandlePopoverContent](#tablehandlepopovercontent) component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="escapekeydown" href="#escapekeydown">escapeKeyDown</a>: (`event`: `EscapeKeyDownEvent`) => `void`</code>

</dt>

<dd>

Fired when the escape key is pressed.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="pointerdownoutside" href="#pointerdownoutside">pointerDownOutside</a>: (`event`: `PointerDownOutsideEvent`) => `void`</code>

</dt>

<dd>

Fired when the pointer is pressed down outside the element.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="focusoutside" href="#focusoutside">focusOutside</a>: (`event`: `FocusOutsideEvent`) => `void`</code>

</dt>

<dd>

Fired when the focus is moved outside the element.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="interactoutside" href="#interactoutside">interactOutside</a>: (`event`: `InteractOutsideEvent`) => `void`</code>

</dt>

<dd>

Fired when an interaction (pointer or focus) happens outside the
component.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

</dd>

</dl>

***

### TableHandlePopoverItemProps {#tablehandlepopoveritemprops}

Props for the [TableHandlePopoverItem](#tablehandlepopoveritem) component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="value" href="#value">value</a><i>?</i>: `string`</code>

</dt>

<dd>

The value of the item. Every item must have a unique value in the parent
list. By default, a random value is generated.

###### Default

`""`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="query" href="#query">query</a><i>?</i>: `string`</code>

</dt>

<dd>

The query string to filter the listbox items.

###### Default

`""`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="filter" href="#filter">filter</a><i>?</i>: `ItemFilter`</code>

</dt>

<dd>

The filter function to determine if an item should be shown in the listbox.

###### Default

`defaultItemFilter`

</dd>

</dl>

***

### TableHandlePopoverItemEmits {#tablehandlepopoveritememits}

Emits for the [TableHandlePopoverItem](#tablehandlepopoveritem) component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="select" href="#select">select</a>: (`event`: [`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<`void`\>) => `void`</code>

</dt>

<dd>

Fired when the item is selected.

</dd>

</dl>

***

### TableHandleRootProps {#tablehandlerootprops}

Props for the [TableHandleRoot](#tablehandleroot) component.

***

### TableHandleRootEmits {#tablehandlerootemits}

Emits for the [TableHandleRoot](#tablehandleroot) component.

***

### TableHandleRowRootProps {#tablehandlerowrootprops}

Props for the [TableHandleRowRoot](#tablehandlerowroot) component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="strategy-2" href="#strategy-2">strategy</a><i>?</i>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

`"absolute"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="autoupdate-2" href="#autoupdate-2">autoUpdate</a><i>?</i>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

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

<code data-typedoc-code><a id="transform-2" href="#transform-2">transform</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="offset-2" href="#offset-2">offset</a><i>?</i>: `OffsetOptions`</code>

</dt>

<dd>

The distance between the reference and floating element.

###### Default

`6`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overlap-2" href="#overlap-2">overlap</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="fitviewport-2" href="#fitviewport-2">fitViewport</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="samewidth-2" href="#samewidth-2">sameWidth</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="sameheight-2" href="#sameheight-2">sameHeight</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="inline-2" href="#inline-2">inline</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="boundary-2" href="#boundary-2">boundary</a><i>?</i>: `Boundary`</code>

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

<code data-typedoc-code><a id="rootboundary-2" href="#rootboundary-2">rootBoundary</a><i>?</i>: `RootBoundary`</code>

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

<code data-typedoc-code><a id="overflowpadding-2" href="#overflowpadding-2">overflowPadding</a><i>?</i>: `number`</code>

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

<code data-typedoc-code><a id="elementcontext-2" href="#elementcontext-2">elementContext</a><i>?</i>: `ElementContext`</code>

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

<code data-typedoc-code><a id="altboundary-2" href="#altboundary-2">altBoundary</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="placement-2" href="#placement-2">placement</a><i>?</i>: `Placement`</code>

</dt>

<dd>

The placement of the popover, relative to the hovered table cell.

###### Default

`"left"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="hoist-2" href="#hoist-2">hoist</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content.

###### Default

`false`

</dd>

</dl>

***

### TableHandleRowRootEmits {#tablehandlerowrootemits}

Emits for the [TableHandleRowRoot](#tablehandlerowroot) component.

***

### TableHandleRowTriggerProps {#tablehandlerowtriggerprops}

Props for the [TableHandleRowTrigger](#tablehandlerowtrigger) component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="editor-4" href="#editor-4">editor</a><i>?</i>: [`Editor`](../core.md#editor)\<`TableCommandsExtension`\> \| `null`</code>

</dt>

</dl>

***

### TableHandleRowTriggerEmits {#tablehandlerowtriggeremits}

Emits for the [TableHandleRowTrigger](#tablehandlerowtrigger) component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="select-1" href="#select-1">select</a>: (`event`: [`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<`void`\>) => `void`</code>

</dt>

</dl>

## Variables

### TableHandleColumnRoot {#tablehandlecolumnroot}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="tablehandlecolumnroot" href="#tablehandlecolumnroot">TableHandleColumnRoot</a>: `DefineSetupFnComponent`\<[`TableHandleColumnRootProps`](#tablehandlecolumnrootprops) & `HTMLAttributes`, [`TableHandleColumnRootEmits`](#tablehandlecolumnrootemits)\></code>

</dt>

</dl>

***

### TableHandleColumnTrigger {#tablehandlecolumntrigger}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="tablehandlecolumntrigger" href="#tablehandlecolumntrigger">TableHandleColumnTrigger</a>: `DefineSetupFnComponent`\<[`TableHandleColumnTriggerProps`](#tablehandlecolumntriggerprops) & `HTMLAttributes`, [`TableHandleColumnTriggerEmits`](#tablehandlecolumntriggeremits)\></code>

</dt>

</dl>

***

### TableHandleDragPreview {#tablehandledragpreview}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="tablehandledragpreview" href="#tablehandledragpreview">TableHandleDragPreview</a>: `DefineSetupFnComponent`\<[`TableHandleDragPreviewProps`](#tablehandledragpreviewprops) & `HTMLAttributes`, [`TableHandleDragPreviewEmits`](#tablehandledragpreviewemits)\></code>

</dt>

</dl>

***

### TableHandleDropIndicator {#tablehandledropindicator}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="tablehandledropindicator" href="#tablehandledropindicator">TableHandleDropIndicator</a>: `DefineSetupFnComponent`\<[`TableHandleDropIndicatorProps`](#tablehandledropindicatorprops) & `HTMLAttributes`, [`TableHandleDropIndicatorEmits`](#tablehandledropindicatoremits)\></code>

</dt>

</dl>

***

### TableHandlePopoverContent {#tablehandlepopovercontent}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="tablehandlepopovercontent" href="#tablehandlepopovercontent">TableHandlePopoverContent</a>: `DefineSetupFnComponent`\<[`TableHandlePopoverContentProps`](#tablehandlepopovercontentprops) & `HTMLAttributes`, [`TableHandlePopoverContentEmits`](#tablehandlepopovercontentemits)\></code>

</dt>

</dl>

***

### TableHandlePopoverItem {#tablehandlepopoveritem}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="tablehandlepopoveritem" href="#tablehandlepopoveritem">TableHandlePopoverItem</a>: `DefineSetupFnComponent`\<[`TableHandlePopoverItemProps`](#tablehandlepopoveritemprops) & `HTMLAttributes`, [`TableHandlePopoverItemEmits`](#tablehandlepopoveritememits)\></code>

</dt>

</dl>

***

### TableHandleRoot {#tablehandleroot}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="tablehandleroot" href="#tablehandleroot">TableHandleRoot</a>: `DefineSetupFnComponent`\<[`TableHandleRootProps`](#tablehandlerootprops) & `HTMLAttributes`, [`TableHandleRootEmits`](#tablehandlerootemits)\></code>

</dt>

</dl>

***

### TableHandleRowRoot {#tablehandlerowroot}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="tablehandlerowroot" href="#tablehandlerowroot">TableHandleRowRoot</a>: `DefineSetupFnComponent`\<[`TableHandleRowRootProps`](#tablehandlerowrootprops) & `HTMLAttributes`, [`TableHandleRowRootEmits`](#tablehandlerowrootemits)\></code>

</dt>

</dl>

***

### TableHandleRowTrigger {#tablehandlerowtrigger}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="tablehandlerowtrigger" href="#tablehandlerowtrigger">TableHandleRowTrigger</a>: `DefineSetupFnComponent`\<[`TableHandleRowTriggerProps`](#tablehandlerowtriggerprops) & `HTMLAttributes`, [`TableHandleRowTriggerEmits`](#tablehandlerowtriggeremits)\></code>

</dt>

</dl>
