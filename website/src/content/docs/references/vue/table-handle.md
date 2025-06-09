---
title: prosekit/vue/table-handle
sidebar:
  label: vue/table-handle
---


## TableHandleColumnRootEmits {#table-handle-column-root-emits}

Emits for the [TableHandleColumnRoot](table-handle.md#table-handle-column-root-4) component.

## TableHandleColumnRootProps {#table-handle-column-root-props-4}

Props for the [TableHandleColumnRoot](table-handle.md#table-handle-column-root-4) component.

<dl>

<dt>

`altBoundary?: boolean`

</dt>

<dd>

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

**Default**: `false`

</dd>

<dt>

`autoUpdate?: boolean | AutoUpdateOptions`

</dt>

<dd>

Options to activate auto-update listeners

**See**

https://floating-ui.com/docs/autoUpdate

**Default**: `true`

</dd>

<dt>

`boundary?: Boundary`

</dt>

<dd>

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

**Default**: `'clippingAncestors'`

</dd>

<dt>

`elementContext?: ElementContext`

</dt>

<dd>

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

**Default**: `'floating'`

</dd>

<dt>

`fitViewport?: boolean`

</dt>

<dd>

Whether to constrain the floating element's width and height to not exceed
the viewport.

**Default**: `false`

</dd>

<dt>

`flip?: boolean | Placement[]`

</dt>

<dd>

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

**Default**: `true`

</dd>

<dt>

`hide?: boolean`

</dt>

<dd>

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

**Default**: `false`

</dd>

<dt>

`hoist?: boolean`

</dt>

<dd>

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content. When enabled,
the floating element won't be clipped by an ancestor. This provides a
similar result to React's `<Portals>` or Vue's `<Teleport>`.

**Default**: `true`

</dd>

<dt>

`inline?: boolean`

</dt>

<dd>

Whether to improve positioning for inline reference elements that span over
multiple lines.

**Default**: `false`

</dd>

<dt>

`offset?: OffsetOptions`

</dt>

<dd>

The distance between the reference and floating element.

**Default**: `6`

</dd>

<dt>

`overflowPadding?: number`

</dt>

<dd>

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

**Default**: `4`

</dd>

<dt>

`overlap?: boolean`

</dt>

<dd>

Whether the floating element can overlap the reference element to keep it
in view.

**Default**: `false`

</dd>

<dt>

`placement?: Placement`

</dt>

<dd>

The placement of the popover, relative to the hovered table cell.

**Default**: `"top"`

</dd>

<dt>

`rootBoundary?: RootBoundary`

</dt>

<dd>

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

**Default**: `'viewport'`

</dd>

<dt>

`sameHeight?: boolean`

</dt>

<dd>

Whether to constrain the floating element's height so that it matches the
reference element.

**Default**: `false`

</dd>

<dt>

`sameWidth?: boolean`

</dt>

<dd>

Whether to constrain the floating element's width so that it matches the
reference element.

**Default**: `false`

</dd>

<dt>

`shift?: boolean`

</dt>

<dd>

Whether the floating element should shift to keep it in view.

**Default**: `true`

</dd>

<dt>

`strategy?: "fixed" | "absolute"`

</dt>

<dd>

The strategy to use for positioning

**Default**: `"absolute"`

</dd>

<dt>

`transform?: boolean`

</dt>

<dd>

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

**Default**: `false`

</dd>

</dl>

## TableHandleColumnTriggerEmits {#table-handle-column-trigger-emits}

Emits for the [TableHandleColumnTrigger](table-handle.md#table-handle-column-trigger-4) component.

## TableHandleColumnTriggerProps {#table-handle-column-trigger-props-4}

Props for the [TableHandleColumnTrigger](table-handle.md#table-handle-column-trigger-4) component.

<dl>

<dt>

`editor?: null | Editor<TableCommandsExtension>`

</dt>

<dd>

</dd>

</dl>

## TableHandlePopoverContentEmits {#table-handle-popover-content-emits}

Emits for the [TableHandlePopoverContent](table-handle.md#table-handle-popover-content-4) component.

<dl>

<dt>

`escapeKeyDown: (event: EscapeKeyDownEvent) => void`

</dt>

<dd>

Fired when the escape key is pressed.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

</dd>

<dt>

`focusOutside: (event: FocusOutsideEvent) => void`

</dt>

<dd>

Fired when the focus is moved outside the element.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

</dd>

<dt>

`interactOutside: (event: InteractOutsideEvent) => void`

</dt>

<dd>

Fired when an interaction (pointer or focus) happens outside the
component.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

</dd>

<dt>

`pointerDownOutside: (event: PointerDownOutsideEvent) => void`

</dt>

<dd>

Fired when the pointer is pressed down outside the element.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

</dd>

</dl>

## TableHandlePopoverContentProps {#table-handle-popover-content-props-4}

Props for the [TableHandlePopoverContent](table-handle.md#table-handle-popover-content-4) component.

<dl>

<dt>

`altBoundary?: boolean`

</dt>

<dd>

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

**Default**: `false`

</dd>

<dt>

`autoUpdate?: boolean | AutoUpdateOptions`

</dt>

<dd>

Options to activate auto-update listeners

**See**

https://floating-ui.com/docs/autoUpdate

**Default**: `true`

</dd>

<dt>

`boundary?: Boundary`

</dt>

<dd>

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

**Default**: `'clippingAncestors'`

</dd>

<dt>

`editor?: null | Editor<any>`

</dt>

<dd>

</dd>

<dt>

`elementContext?: ElementContext`

</dt>

<dd>

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

**Default**: `'floating'`

</dd>

<dt>

`eventTarget?: HTMLElement | TypedEventTarget<"keydown">`

</dt>

<dd>

By default, the menu element will listen for keydown events. You can pass a
different element to listen for keydown events.

</dd>

<dt>

`fitViewport?: boolean`

</dt>

<dd>

Whether to constrain the floating element's width and height to not exceed
the viewport.

**Default**: `false`

</dd>

<dt>

`flip?: boolean | Placement[]`

</dt>

<dd>

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

**Default**: `true`

</dd>

<dt>

`hide?: boolean`

</dt>

<dd>

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

**Default**: `false`

</dd>

<dt>

`hoist?: boolean`

</dt>

<dd>

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content. When enabled,
the floating element won't be clipped by an ancestor. This provides a
similar result to React's `<Portals>` or Vue's `<Teleport>`.

**Default**: `true`

</dd>

<dt>

`inline?: boolean`

</dt>

<dd>

Whether to improve positioning for inline reference elements that span over
multiple lines.

**Default**: `false`

</dd>

<dt>

`offset?: OffsetOptions`

</dt>

<dd>

**Default**: `{mainAxis: -4, crossAxis: 4}`

</dd>

<dt>

`overflowPadding?: number`

</dt>

<dd>

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

**Default**: `4`

</dd>

<dt>

`overlap?: boolean`

</dt>

<dd>

Whether the floating element can overlap the reference element to keep it
in view.

**Default**: `false`

</dd>

<dt>

`placement?: Placement`

</dt>

<dd>

**Default**: `'bottom-start'`

</dd>

<dt>

`rootBoundary?: RootBoundary`

</dt>

<dd>

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

**Default**: `'viewport'`

</dd>

<dt>

`sameHeight?: boolean`

</dt>

<dd>

Whether to constrain the floating element's height so that it matches the
reference element.

**Default**: `false`

</dd>

<dt>

`sameWidth?: boolean`

</dt>

<dd>

Whether to constrain the floating element's width so that it matches the
reference element.

**Default**: `false`

</dd>

<dt>

`shift?: boolean`

</dt>

<dd>

Whether the floating element should shift to keep it in view.

**Default**: `true`

</dd>

<dt>

`strategy?: "fixed" | "absolute"`

</dt>

<dd>

The strategy to use for positioning

**Default**: `"absolute"`

</dd>

<dt>

`transform?: boolean`

</dt>

<dd>

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

**Default**: `false`

</dd>

</dl>

## TableHandlePopoverItemEmits {#table-handle-popover-item-emits}

Emits for the [TableHandlePopoverItem](table-handle.md#table-handle-popover-item-4) component.

<dl>

<dt>

`select: (event: CustomEvent<void>) => void`

</dt>

<dd>

Fired when the item is selected.

</dd>

</dl>

## TableHandlePopoverItemProps {#table-handle-popover-item-props-4}

Props for the [TableHandlePopoverItem](table-handle.md#table-handle-popover-item-4) component.

<dl>

<dt>

`filter?: ItemFilter`

</dt>

<dd>

The filter function to determine if an item should be shown in the listbox.

**Default**: `defaultItemFilter`

</dd>

<dt>

`query?: string`

</dt>

<dd>

The query string to filter the listbox items.

**Default**: `""`

</dd>

<dt>

`value?: string`

</dt>

<dd>

The value of the item. Every item must have a unique value in the parent
list. By default, a random value is generated.

**Default**: `""`

</dd>

</dl>

## TableHandleRootEmits {#table-handle-root-emits}

Emits for the [TableHandleRoot](table-handle.md#table-handle-root-4) component.

## TableHandleRootProps {#table-handle-root-props-4}

Props for the [TableHandleRoot](table-handle.md#table-handle-root-4) component.

## TableHandleRowRootEmits {#table-handle-row-root-emits}

Emits for the [TableHandleRowRoot](table-handle.md#table-handle-row-root-4) component.

## TableHandleRowRootProps {#table-handle-row-root-props-4}

Props for the [TableHandleRowRoot](table-handle.md#table-handle-row-root-4) component.

<dl>

<dt>

`altBoundary?: boolean`

</dt>

<dd>

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

**Default**: `false`

</dd>

<dt>

`autoUpdate?: boolean | AutoUpdateOptions`

</dt>

<dd>

Options to activate auto-update listeners

**See**

https://floating-ui.com/docs/autoUpdate

**Default**: `true`

</dd>

<dt>

`boundary?: Boundary`

</dt>

<dd>

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

**Default**: `'clippingAncestors'`

</dd>

<dt>

`elementContext?: ElementContext`

</dt>

<dd>

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

**Default**: `'floating'`

</dd>

<dt>

`fitViewport?: boolean`

</dt>

<dd>

Whether to constrain the floating element's width and height to not exceed
the viewport.

**Default**: `false`

</dd>

<dt>

`flip?: boolean | Placement[]`

</dt>

<dd>

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

**Default**: `true`

</dd>

<dt>

`hide?: boolean`

</dt>

<dd>

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

**Default**: `false`

</dd>

<dt>

`hoist?: boolean`

</dt>

<dd>

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content. When enabled,
the floating element won't be clipped by an ancestor. This provides a
similar result to React's `<Portals>` or Vue's `<Teleport>`.

**Default**: `true`

</dd>

<dt>

`inline?: boolean`

</dt>

<dd>

Whether to improve positioning for inline reference elements that span over
multiple lines.

**Default**: `false`

</dd>

<dt>

`offset?: OffsetOptions`

</dt>

<dd>

The distance between the reference and floating element.

**Default**: `6`

</dd>

<dt>

`overflowPadding?: number`

</dt>

<dd>

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

**Default**: `4`

</dd>

<dt>

`overlap?: boolean`

</dt>

<dd>

Whether the floating element can overlap the reference element to keep it
in view.

**Default**: `false`

</dd>

<dt>

`placement?: Placement`

</dt>

<dd>

The placement of the popover, relative to the hovered table cell.

**Default**: `"left"`

</dd>

<dt>

`rootBoundary?: RootBoundary`

</dt>

<dd>

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

**Default**: `'viewport'`

</dd>

<dt>

`sameHeight?: boolean`

</dt>

<dd>

Whether to constrain the floating element's height so that it matches the
reference element.

**Default**: `false`

</dd>

<dt>

`sameWidth?: boolean`

</dt>

<dd>

Whether to constrain the floating element's width so that it matches the
reference element.

**Default**: `false`

</dd>

<dt>

`shift?: boolean`

</dt>

<dd>

Whether the floating element should shift to keep it in view.

**Default**: `true`

</dd>

<dt>

`strategy?: "fixed" | "absolute"`

</dt>

<dd>

The strategy to use for positioning

**Default**: `"absolute"`

</dd>

<dt>

`transform?: boolean`

</dt>

<dd>

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

**Default**: `false`

</dd>

</dl>

## TableHandleRowTriggerEmits {#table-handle-row-trigger-emits}

Emits for the [TableHandleRowTrigger](table-handle.md#table-handle-row-trigger-4) component.

<dl>

<dt>

`select: (event: CustomEvent<void>) => void`

</dt>

<dd>

</dd>

</dl>

## TableHandleRowTriggerProps {#table-handle-row-trigger-props-4}

Props for the [TableHandleRowTrigger](table-handle.md#table-handle-row-trigger-4) component.

<dl>

<dt>

`editor?: null | Editor<TableCommandsExtension>`

</dt>

<dd>

</dd>

</dl>

## TableHandleColumnRoot {#table-handle-column-root-4}

**Type**: `DefineSetupFnComponent<TableHandleColumnRootProps & HTMLAttributes, TableHandleColumnRootEmits>`

## TableHandleColumnTrigger {#table-handle-column-trigger-4}

**Type**: `DefineSetupFnComponent<TableHandleColumnTriggerProps & HTMLAttributes, TableHandleColumnTriggerEmits>`

## TableHandlePopoverContent {#table-handle-popover-content-4}

**Type**: `DefineSetupFnComponent<TableHandlePopoverContentProps & HTMLAttributes, TableHandlePopoverContentEmits>`

## TableHandlePopoverItem {#table-handle-popover-item-4}

**Type**: `DefineSetupFnComponent<TableHandlePopoverItemProps & HTMLAttributes, TableHandlePopoverItemEmits>`

## TableHandleRoot {#table-handle-root-4}

**Type**: `DefineSetupFnComponent<TableHandleRootProps & HTMLAttributes, TableHandleRootEmits>`

## TableHandleRowRoot {#table-handle-row-root-4}

**Type**: `DefineSetupFnComponent<TableHandleRowRootProps & HTMLAttributes, TableHandleRowRootEmits>`

## TableHandleRowTrigger {#table-handle-row-trigger-4}

**Type**: `DefineSetupFnComponent<TableHandleRowTriggerProps & HTMLAttributes, TableHandleRowTriggerEmits>`
