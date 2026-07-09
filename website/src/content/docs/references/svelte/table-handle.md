---
title: prosekit/svelte/table-handle
sidebar:
  label: svelte/table-handle
---

## Anatomy

```jsx
import {
  TableHandleColumnMenuRoot,
  TableHandleColumnMenuTrigger,
  TableHandleColumnPopup,
  TableHandleColumnPositioner,
  TableHandleDragPreview,
  TableHandleDropIndicator,
  TableHandleRoot,
  TableHandleRowMenuRoot,
  TableHandleRowMenuTrigger,
  TableHandleRowPopup,
  TableHandleRowPositioner,
} from 'prosekit/svelte/table-handle'
import {
  MenuItem,
  MenuPopup,
  MenuPositioner,
} from 'prosekit/svelte/menu'

<TableHandleRoot>
  <TableHandleDragPreview />
  <TableHandleDropIndicator />
  <TableHandleColumnPositioner>
    <TableHandleColumnPopup>
      <TableHandleColumnMenuRoot>
        <TableHandleColumnMenuTrigger>...</TableHandleColumnMenuTrigger>
        <MenuPositioner>
          <MenuPopup>
            <MenuItem>...</MenuItem>
          </MenuPopup>
        </MenuPositioner>
      </TableHandleColumnMenuRoot>
    </TableHandleColumnPopup>
  </TableHandleColumnPositioner>
  <TableHandleRowPositioner>
    <TableHandleRowPopup>
      <TableHandleRowMenuRoot>
        <TableHandleRowMenuTrigger>...</TableHandleRowMenuTrigger>
        <MenuPositioner>
          <MenuPopup>
            <MenuItem>...</MenuItem>
          </MenuPopup>
        </MenuPositioner>
      </TableHandleRowMenuRoot>
    </TableHandleRowPopup>
  </TableHandleRowPositioner>
</TableHandleRoot>
```

## Interfaces

### TableHandleColumnMenuRootProps {#tablehandlecolumnmenurootprops}

Props for the [TableHandleColumnMenuRoot](#tablehandlecolumnmenuroot) Svelte component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="defaultopen" href="#defaultopen">defaultOpen</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the overlay is initially open.

###### Default

`false`

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

<code data-typedoc-code><a id="children" href="#children">children</a><i>?</i>: `Snippet`\<\[\]\></code>

</dt>

</dl>

***

### TableHandleColumnMenuTriggerProps {#tablehandlecolumnmenutriggerprops}

Props for the [TableHandleColumnMenuTrigger](#tablehandlecolumnmenutrigger) Svelte component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="children-1" href="#children-1">children</a><i>?</i>: `Snippet`\<\[\]\></code>

</dt>

</dl>

***

### TableHandleColumnPopupProps {#tablehandlecolumnpopupprops}

Props for the [TableHandleColumnPopup](#tablehandlecolumnpopup) Svelte component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="children-2" href="#children-2">children</a><i>?</i>: `Snippet`\<\[\]\></code>

</dt>

</dl>

***

### TableHandleColumnPositionerProps {#tablehandlecolumnpositionerprops}

Props for the [TableHandleColumnPositioner](#tablehandlecolumnpositioner) Svelte component.

#### Properties

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

<dl>

<dt>

<code data-typedoc-code><a id="children-3" href="#children-3">children</a><i>?</i>: `Snippet`\<\[\]\></code>

</dt>

</dl>

***

### TableHandleDragPreviewProps {#tablehandledragpreviewprops}

Props for the [TableHandleDragPreview](#tablehandledragpreview) Svelte component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="children-4" href="#children-4">children</a><i>?</i>: `Snippet`\<\[\]\></code>

</dt>

</dl>

***

### TableHandleDropIndicatorProps {#tablehandledropindicatorprops}

Props for the [TableHandleDropIndicator](#tablehandledropindicator) Svelte component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="children-5" href="#children-5">children</a><i>?</i>: `Snippet`\<\[\]\></code>

</dt>

</dl>

***

### TableHandleRootProps {#tablehandlerootprops}

Props for the [TableHandleRoot](#tablehandleroot) Svelte component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="children-6" href="#children-6">children</a><i>?</i>: `Snippet`\<\[\]\></code>

</dt>

</dl>

***

### TableHandleRowMenuRootProps {#tablehandlerowmenurootprops}

Props for the [TableHandleRowMenuRoot](#tablehandlerowmenuroot) Svelte component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="defaultopen-1" href="#defaultopen-1">defaultOpen</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the overlay is initially open.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="open-1" href="#open-1">open</a><i>?</i>: `boolean` \| `null`</code>

</dt>

<dd>

Whether the overlay is currently open.

###### Default

`null`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disabled-1" href="#disabled-1">disabled</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the component should ignore user interaction.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="children-7" href="#children-7">children</a><i>?</i>: `Snippet`\<\[\]\></code>

</dt>

</dl>

***

### TableHandleRowMenuTriggerProps {#tablehandlerowmenutriggerprops}

Props for the [TableHandleRowMenuTrigger](#tablehandlerowmenutrigger) Svelte component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="children-8" href="#children-8">children</a><i>?</i>: `Snippet`\<\[\]\></code>

</dt>

</dl>

***

### TableHandleRowPopupProps {#tablehandlerowpopupprops}

Props for the [TableHandleRowPopup](#tablehandlerowpopup) Svelte component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="children-9" href="#children-9">children</a><i>?</i>: `Snippet`\<\[\]\></code>

</dt>

</dl>

***

### TableHandleRowPositionerProps {#tablehandlerowpositionerprops}

Props for the [TableHandleRowPositioner](#tablehandlerowpositioner) Svelte component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="placement-1" href="#placement-1">placement</a><i>?</i>: `Placement`</code>

</dt>

<dd>

The placement of the popover, relative to the hovered table cell.

###### Default

`"left"`

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
to place the floating element on top of other page content.

###### Default

`false`

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

Whether to check the alternate elementContext's boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="children-10" href="#children-10">children</a><i>?</i>: `Snippet`\<\[\]\></code>

</dt>

</dl>

## Variables

### TableHandleColumnMenuRoot {#tablehandlecolumnmenuroot}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="tablehandlecolumnmenuroot" href="#tablehandlecolumnmenuroot">TableHandleColumnMenuRoot</a>: `Component`\<[`TableHandleColumnMenuRootProps`](#tablehandlecolumnmenurootprops) & `HTMLAttributes`\<[`TableHandleColumnMenuRootElement`](../web/table-handle.md#tablehandlecolumnmenurootelement)\>\></code>

</dt>

<dd>

A Svelte component that renders an `prosekit-table-handle-column-menu-root` custom element.

</dd>

</dl>

***

### TableHandleColumnMenuTrigger {#tablehandlecolumnmenutrigger}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="tablehandlecolumnmenutrigger" href="#tablehandlecolumnmenutrigger">TableHandleColumnMenuTrigger</a>: `Component`\<[`TableHandleColumnMenuTriggerProps`](#tablehandlecolumnmenutriggerprops) & `HTMLAttributes`\<[`TableHandleColumnMenuTriggerElement`](../web/table-handle.md#tablehandlecolumnmenutriggerelement)\>\></code>

</dt>

<dd>

A Svelte component that renders an `prosekit-table-handle-column-menu-trigger` custom element.

</dd>

</dl>

***

### TableHandleColumnPopup {#tablehandlecolumnpopup}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="tablehandlecolumnpopup" href="#tablehandlecolumnpopup">TableHandleColumnPopup</a>: `Component`\<[`TableHandleColumnPopupProps`](#tablehandlecolumnpopupprops) & `HTMLAttributes`\<[`TableHandleColumnPopupElement`](../web/table-handle.md#tablehandlecolumnpopupelement)\>\></code>

</dt>

<dd>

A Svelte component that renders an `prosekit-table-handle-column-popup` custom element.

</dd>

</dl>

***

### TableHandleColumnPositioner {#tablehandlecolumnpositioner}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="tablehandlecolumnpositioner" href="#tablehandlecolumnpositioner">TableHandleColumnPositioner</a>: `Component`\<[`TableHandleColumnPositionerProps`](#tablehandlecolumnpositionerprops) & `HTMLAttributes`\<[`TableHandleColumnPositionerElement`](../web/table-handle.md#tablehandlecolumnpositionerelement)\>\></code>

</dt>

<dd>

A Svelte component that renders an `prosekit-table-handle-column-positioner` custom element.

</dd>

</dl>

***

### TableHandleDragPreview {#tablehandledragpreview}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="tablehandledragpreview" href="#tablehandledragpreview">TableHandleDragPreview</a>: `Component`\<[`TableHandleDragPreviewProps`](#tablehandledragpreviewprops) & `HTMLAttributes`\<[`TableHandleDragPreviewElement`](../web/table-handle.md#tablehandledragpreviewelement)\>\></code>

</dt>

<dd>

A Svelte component that renders an `prosekit-table-handle-drag-preview` custom element.

</dd>

</dl>

***

### TableHandleDropIndicator {#tablehandledropindicator}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="tablehandledropindicator" href="#tablehandledropindicator">TableHandleDropIndicator</a>: `Component`\<[`TableHandleDropIndicatorProps`](#tablehandledropindicatorprops) & `HTMLAttributes`\<[`TableHandleDropIndicatorElement`](../web/table-handle.md#tablehandledropindicatorelement)\>\></code>

</dt>

<dd>

A Svelte component that renders an `prosekit-table-handle-drop-indicator` custom element.

</dd>

</dl>

***

### TableHandleRoot {#tablehandleroot}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="tablehandleroot" href="#tablehandleroot">TableHandleRoot</a>: `Component`\<[`TableHandleRootProps`](#tablehandlerootprops) & `HTMLAttributes`\<[`TableHandleRootElement`](../web/table-handle.md#tablehandlerootelement)\>\></code>

</dt>

<dd>

A Svelte component that renders an `prosekit-table-handle-root` custom element.

</dd>

</dl>

***

### TableHandleRowMenuRoot {#tablehandlerowmenuroot}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="tablehandlerowmenuroot" href="#tablehandlerowmenuroot">TableHandleRowMenuRoot</a>: `Component`\<[`TableHandleRowMenuRootProps`](#tablehandlerowmenurootprops) & `HTMLAttributes`\<[`TableHandleRowMenuRootElement`](../web/table-handle.md#tablehandlerowmenurootelement)\>\></code>

</dt>

<dd>

A Svelte component that renders an `prosekit-table-handle-row-menu-root` custom element.

</dd>

</dl>

***

### TableHandleRowMenuTrigger {#tablehandlerowmenutrigger}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="tablehandlerowmenutrigger" href="#tablehandlerowmenutrigger">TableHandleRowMenuTrigger</a>: `Component`\<[`TableHandleRowMenuTriggerProps`](#tablehandlerowmenutriggerprops) & `HTMLAttributes`\<[`TableHandleRowMenuTriggerElement`](../web/table-handle.md#tablehandlerowmenutriggerelement)\>\></code>

</dt>

<dd>

A Svelte component that renders an `prosekit-table-handle-row-menu-trigger` custom element.

</dd>

</dl>

***

### TableHandleRowPopup {#tablehandlerowpopup}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="tablehandlerowpopup" href="#tablehandlerowpopup">TableHandleRowPopup</a>: `Component`\<[`TableHandleRowPopupProps`](#tablehandlerowpopupprops) & `HTMLAttributes`\<[`TableHandleRowPopupElement`](../web/table-handle.md#tablehandlerowpopupelement)\>\></code>

</dt>

<dd>

A Svelte component that renders an `prosekit-table-handle-row-popup` custom element.

</dd>

</dl>

***

### TableHandleRowPositioner {#tablehandlerowpositioner}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="tablehandlerowpositioner" href="#tablehandlerowpositioner">TableHandleRowPositioner</a>: `Component`\<[`TableHandleRowPositionerProps`](#tablehandlerowpositionerprops) & `HTMLAttributes`\<[`TableHandleRowPositionerElement`](../web/table-handle.md#tablehandlerowpositionerelement)\>\></code>

</dt>

<dd>

A Svelte component that renders an `prosekit-table-handle-row-positioner` custom element.

</dd>

</dl>
