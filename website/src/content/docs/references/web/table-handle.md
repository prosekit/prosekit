---
title: prosekit/web/table-handle
sidebar:
  label: web/table-handle
---

## Anatomy

```html
<prosekit-table-handle-root>
  <prosekit-table-handle-drag-preview></prosekit-table-handle-drag-preview>
  <prosekit-table-handle-drop-indicator></prosekit-table-handle-drop-indicator>
  <prosekit-table-handle-column-positioner>
    <prosekit-table-handle-column-popup>
      <prosekit-table-handle-column-menu-root>
        <prosekit-table-handle-column-menu-trigger>...</prosekit-table-handle-column-menu-trigger>
        <prosekit-menu-positioner>
          <prosekit-menu-popup>
            <prosekit-menu-item>...</prosekit-menu-item>
          </prosekit-menu-popup>
        </prosekit-menu-positioner>
      </prosekit-table-handle-column-menu-root>
    </prosekit-table-handle-column-popup>
  </prosekit-table-handle-column-positioner>
  <prosekit-table-handle-row-positioner>
    <prosekit-table-handle-row-popup>
      <prosekit-table-handle-row-menu-root>
        <prosekit-table-handle-row-menu-trigger>...</prosekit-table-handle-row-menu-trigger>
        <prosekit-menu-positioner>
          <prosekit-menu-popup>
            <prosekit-menu-item>...</prosekit-menu-item>
          </prosekit-menu-popup>
        </prosekit-menu-positioner>
      </prosekit-table-handle-row-menu-root>
    </prosekit-table-handle-row-popup>
  </prosekit-table-handle-row-positioner>
</prosekit-table-handle-root>
```

## Classes

### TableHandleColumnMenuRootElement {#tablehandlecolumnmenurootelement}

`<prosekit-table-handle-column-menu-root>` custom element.

Properties: [TableHandleColumnMenuRootProps](#tablehandlecolumnmenurootprops)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor" href="#constructor">TableHandleColumnMenuRootElement</a>(): [`TableHandleColumnMenuRootElement`](#tablehandlecolumnmenurootelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="defaultopen-1" href="#defaultopen-1">defaultOpen</a>: `boolean`</code>

</dt>

<dd>

Whether the overlay is initially open.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="open-1" href="#open-1">open</a>: `boolean` \| `null`</code>

</dt>

<dd>

Whether the overlay is currently open.

###### Default

`null`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disabled-1" href="#disabled-1">disabled</a>: `boolean`</code>

</dt>

<dd>

Whether the component should ignore user interaction.

###### Default

`false`

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

### TableHandleColumnMenuTriggerElement {#tablehandlecolumnmenutriggerelement}

`<prosekit-table-handle-column-menu-trigger>` custom element.

Properties: [TableHandleColumnMenuTriggerProps](#tablehandlecolumnmenutriggerprops)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-1" href="#constructor-1">TableHandleColumnMenuTriggerElement</a>(): [`TableHandleColumnMenuTriggerElement`](#tablehandlecolumnmenutriggerelement)</code>

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

### TableHandleColumnPopupElement {#tablehandlecolumnpopupelement}

`<prosekit-table-handle-column-popup>` custom element.

Properties: [TableHandleColumnPopupProps](#tablehandlecolumnpopupprops)

Data attributes:

| Attribute | Description |
| --- | --- |
| `data-state` | `"open"` when visible, `"closed"` otherwise |

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-2" href="#constructor-2">TableHandleColumnPopupElement</a>(): [`TableHandleColumnPopupElement`](#tablehandlecolumnpopupelement)</code>

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

### TableHandleColumnPositionerElement {#tablehandlecolumnpositionerelement}

`<prosekit-table-handle-column-positioner>` custom element.

Properties: [TableHandleColumnPositionerProps](#tablehandlecolumnpositionerprops)

Data attributes:

| Attribute | Description |
| --- | --- |
| `data-state` | `"open"` when visible, `"closed"` otherwise |
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

<code data-typedoc-code>new <a id="constructor-3" href="#constructor-3">TableHandleColumnPositionerElement</a>(): [`TableHandleColumnPositionerElement`](#tablehandlecolumnpositionerelement)</code>

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

<code data-typedoc-code><a id="hoist-1" href="#hoist-1">hoist</a>: `boolean`</code>

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

<code data-typedoc-code><a id="placement-1" href="#placement-1">placement</a>: `Placement`</code>

</dt>

<dd>

The placement of the popover, relative to the hovered table cell.

###### Default

`"top"`

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

### TableHandleDragPreviewElement {#tablehandledragpreviewelement}

`<prosekit-table-handle-drag-preview>` custom element.

Properties: [TableHandleDragPreviewProps](#tablehandledragpreviewprops)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-4" href="#constructor-4">TableHandleDragPreviewElement</a>(): [`TableHandleDragPreviewElement`](#tablehandledragpreviewelement)</code>

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

***

### TableHandleDropIndicatorElement {#tablehandledropindicatorelement}

`<prosekit-table-handle-drop-indicator>` custom element.

Properties: [TableHandleDropIndicatorProps](#tablehandledropindicatorprops)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-5" href="#constructor-5">TableHandleDropIndicatorElement</a>(): [`TableHandleDropIndicatorElement`](#tablehandledropindicatorelement)</code>

</dt>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="addcontroller-5" href="#addcontroller-5">addController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="removecontroller-5" href="#removecontroller-5">removeController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="connectedcallback-5" href="#connectedcallback-5">connectedCallback</a>(): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disconnectedcallback-5" href="#disconnectedcallback-5">disconnectedCallback</a>(): `void`</code>

</dt>

</dl>

***

### TableHandleRootElement {#tablehandlerootelement}

`<prosekit-table-handle-root>` custom element.

Properties: [TableHandleRootProps](#tablehandlerootprops)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-6" href="#constructor-6">TableHandleRootElement</a>(): [`TableHandleRootElement`](#tablehandlerootelement)</code>

</dt>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="addcontroller-6" href="#addcontroller-6">addController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="removecontroller-6" href="#removecontroller-6">removeController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="connectedcallback-6" href="#connectedcallback-6">connectedCallback</a>(): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disconnectedcallback-6" href="#disconnectedcallback-6">disconnectedCallback</a>(): `void`</code>

</dt>

</dl>

***

### TableHandleRowMenuRootElement {#tablehandlerowmenurootelement}

`<prosekit-table-handle-row-menu-root>` custom element.

Properties: [TableHandleRowMenuRootProps](#tablehandlerowmenurootprops)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-7" href="#constructor-7">TableHandleRowMenuRootElement</a>(): [`TableHandleRowMenuRootElement`](#tablehandlerowmenurootelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="defaultopen-3" href="#defaultopen-3">defaultOpen</a>: `boolean`</code>

</dt>

<dd>

Whether the overlay is initially open.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="open-3" href="#open-3">open</a>: `boolean` \| `null`</code>

</dt>

<dd>

Whether the overlay is currently open.

###### Default

`null`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disabled-3" href="#disabled-3">disabled</a>: `boolean`</code>

</dt>

<dd>

Whether the component should ignore user interaction.

###### Default

`false`

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="addcontroller-7" href="#addcontroller-7">addController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="removecontroller-7" href="#removecontroller-7">removeController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="connectedcallback-7" href="#connectedcallback-7">connectedCallback</a>(): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disconnectedcallback-7" href="#disconnectedcallback-7">disconnectedCallback</a>(): `void`</code>

</dt>

</dl>

***

### TableHandleRowMenuTriggerElement {#tablehandlerowmenutriggerelement}

`<prosekit-table-handle-row-menu-trigger>` custom element.

Properties: [TableHandleRowMenuTriggerProps](#tablehandlerowmenutriggerprops)

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-8" href="#constructor-8">TableHandleRowMenuTriggerElement</a>(): [`TableHandleRowMenuTriggerElement`](#tablehandlerowmenutriggerelement)</code>

</dt>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="addcontroller-8" href="#addcontroller-8">addController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="removecontroller-8" href="#removecontroller-8">removeController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="connectedcallback-8" href="#connectedcallback-8">connectedCallback</a>(): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disconnectedcallback-8" href="#disconnectedcallback-8">disconnectedCallback</a>(): `void`</code>

</dt>

</dl>

***

### TableHandleRowPopupElement {#tablehandlerowpopupelement}

`<prosekit-table-handle-row-popup>` custom element.

Properties: [TableHandleRowPopupProps](#tablehandlerowpopupprops)

Data attributes:

| Attribute | Description |
| --- | --- |
| `data-state` | `"open"` when visible, `"closed"` otherwise |

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-9" href="#constructor-9">TableHandleRowPopupElement</a>(): [`TableHandleRowPopupElement`](#tablehandlerowpopupelement)</code>

</dt>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="addcontroller-9" href="#addcontroller-9">addController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="removecontroller-9" href="#removecontroller-9">removeController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="connectedcallback-9" href="#connectedcallback-9">connectedCallback</a>(): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disconnectedcallback-9" href="#disconnectedcallback-9">disconnectedCallback</a>(): `void`</code>

</dt>

</dl>

***

### TableHandleRowPositionerElement {#tablehandlerowpositionerelement}

`<prosekit-table-handle-row-positioner>` custom element.

Properties: [TableHandleRowPositionerProps](#tablehandlerowpositionerprops)

Data attributes:

| Attribute | Description |
| --- | --- |
| `data-state` | `"open"` when visible, `"closed"` otherwise |
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

<code data-typedoc-code>new <a id="constructor-10" href="#constructor-10">TableHandleRowPositionerElement</a>(): [`TableHandleRowPositionerElement`](#tablehandlerowpositionerelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="strategy-3" href="#strategy-3">strategy</a>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

`"absolute"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="autoupdate-3" href="#autoupdate-3">autoUpdate</a>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

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

<code data-typedoc-code><a id="overlap-3" href="#overlap-3">overlap</a>: `boolean`</code>

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

<code data-typedoc-code><a id="fitviewport-3" href="#fitviewport-3">fitViewport</a>: `boolean`</code>

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

<code data-typedoc-code><a id="samewidth-3" href="#samewidth-3">sameWidth</a>: `boolean`</code>

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

<code data-typedoc-code><a id="sameheight-3" href="#sameheight-3">sameHeight</a>: `boolean`</code>

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

<code data-typedoc-code><a id="inline-3" href="#inline-3">inline</a>: `boolean`</code>

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

<code data-typedoc-code><a id="boundary-3" href="#boundary-3">boundary</a>: `Boundary`</code>

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

<code data-typedoc-code><a id="rootboundary-3" href="#rootboundary-3">rootBoundary</a>: `RootBoundary`</code>

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

<code data-typedoc-code><a id="overflowpadding-3" href="#overflowpadding-3">overflowPadding</a>: `number`</code>

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

<code data-typedoc-code><a id="elementcontext-3" href="#elementcontext-3">elementContext</a>: `ElementContext`</code>

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

<code data-typedoc-code><a id="altboundary-3" href="#altboundary-3">altBoundary</a>: `boolean`</code>

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

<code data-typedoc-code><a id="hoist-3" href="#hoist-3">hoist</a>: `boolean`</code>

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

<code data-typedoc-code><a id="placement-3" href="#placement-3">placement</a>: `Placement`</code>

</dt>

<dd>

The placement of the popover, relative to the hovered table cell.

###### Default

`"left"`

</dd>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><a id="addcontroller-10" href="#addcontroller-10">addController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="removecontroller-10" href="#removecontroller-10">removeController</a>(`controller`: `ReactiveController`): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="connectedcallback-10" href="#connectedcallback-10">connectedCallback</a>(): `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disconnectedcallback-10" href="#disconnectedcallback-10">disconnectedCallback</a>(): `void`</code>

</dt>

</dl>

## Interfaces

### TableHandleColumnMenuRootProps {#tablehandlecolumnmenurootprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="defaultopen" href="#defaultopen">defaultOpen</a>: `boolean`</code>

</dt>

<dd>

Whether the overlay is initially open.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="open" href="#open">open</a>: `boolean` \| `null`</code>

</dt>

<dd>

Whether the overlay is currently open.

###### Default

`null`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disabled" href="#disabled">disabled</a>: `boolean`</code>

</dt>

<dd>

Whether the component should ignore user interaction.

###### Default

`false`

</dd>

</dl>

***

### TableHandleColumnMenuTriggerProps {#tablehandlecolumnmenutriggerprops}

***

### TableHandleColumnPopupProps {#tablehandlecolumnpopupprops}

***

### TableHandleColumnPositionerProps {#tablehandlecolumnpositionerprops}

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

<code data-typedoc-code><a id="hoist" href="#hoist">hoist</a>: `boolean`</code>

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

<code data-typedoc-code><a id="placement" href="#placement">placement</a>: `Placement`</code>

</dt>

<dd>

The placement of the popover, relative to the hovered table cell.

###### Default

`"top"`

</dd>

</dl>

***

### TableHandleDragPreviewProps {#tablehandledragpreviewprops}

***

### TableHandleDropIndicatorProps {#tablehandledropindicatorprops}

***

### TableHandleRootProps {#tablehandlerootprops}

***

### TableHandleRowMenuRootProps {#tablehandlerowmenurootprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="defaultopen-2" href="#defaultopen-2">defaultOpen</a>: `boolean`</code>

</dt>

<dd>

Whether the overlay is initially open.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="open-2" href="#open-2">open</a>: `boolean` \| `null`</code>

</dt>

<dd>

Whether the overlay is currently open.

###### Default

`null`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="disabled-2" href="#disabled-2">disabled</a>: `boolean`</code>

</dt>

<dd>

Whether the component should ignore user interaction.

###### Default

`false`

</dd>

</dl>

***

### TableHandleRowMenuTriggerProps {#tablehandlerowmenutriggerprops}

***

### TableHandleRowPopupProps {#tablehandlerowpopupprops}

***

### TableHandleRowPositionerProps {#tablehandlerowpositionerprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="strategy-2" href="#strategy-2">strategy</a>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

`"absolute"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="autoupdate-2" href="#autoupdate-2">autoUpdate</a>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

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

<code data-typedoc-code><a id="overlap-2" href="#overlap-2">overlap</a>: `boolean`</code>

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

<code data-typedoc-code><a id="fitviewport-2" href="#fitviewport-2">fitViewport</a>: `boolean`</code>

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

<code data-typedoc-code><a id="samewidth-2" href="#samewidth-2">sameWidth</a>: `boolean`</code>

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

<code data-typedoc-code><a id="sameheight-2" href="#sameheight-2">sameHeight</a>: `boolean`</code>

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

<code data-typedoc-code><a id="inline-2" href="#inline-2">inline</a>: `boolean`</code>

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

<code data-typedoc-code><a id="boundary-2" href="#boundary-2">boundary</a>: `Boundary`</code>

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

<code data-typedoc-code><a id="rootboundary-2" href="#rootboundary-2">rootBoundary</a>: `RootBoundary`</code>

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

<code data-typedoc-code><a id="overflowpadding-2" href="#overflowpadding-2">overflowPadding</a>: `number`</code>

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

<code data-typedoc-code><a id="elementcontext-2" href="#elementcontext-2">elementContext</a>: `ElementContext`</code>

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

<code data-typedoc-code><a id="altboundary-2" href="#altboundary-2">altBoundary</a>: `boolean`</code>

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

<code data-typedoc-code><a id="hoist-2" href="#hoist-2">hoist</a>: `boolean`</code>

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

<code data-typedoc-code><a id="placement-2" href="#placement-2">placement</a>: `Placement`</code>

</dt>

<dd>

The placement of the popover, relative to the hovered table cell.

###### Default

`"left"`

</dd>

</dl>
