# prosekit/vue/popover

## PopoverContentEmits {#popover-content-emits}

Emits for the [PopoverContent](popover.md#popover-content-5) component.

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

## PopoverContentProps {#popover-content-props-4}

Props for the [PopoverContent](popover.md#popover-content-5) component.

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

The initial placement of the floating element

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

## PopoverRootEmits {#popover-root-emits}

Emits for the [PopoverRoot](popover.md#popover-root-5) component.

<dl>

<dt>

`openChange: (event: boolean) => void`

</dt>

<dd>

</dd>

</dl>

## PopoverRootProps {#popover-root-props-4}

Props for the [PopoverRoot](popover.md#popover-root-5) component.

<dl>

<dt>

`defaultOpen?: boolean`

</dt>

<dd>

Whether the popover is open by default.

**Default**: `false`

</dd>

<dt>

`open?: boolean`

</dt>

<dd>

Whether the popover is open.

**Default**: `false`

</dd>

</dl>

## PopoverTriggerEmits {#popover-trigger-emits}

Emits for the [PopoverTrigger](popover.md#popover-trigger-5) component.

## PopoverTriggerProps {#popover-trigger-props-4}

Props for the [PopoverTrigger](popover.md#popover-trigger-5) component.

## PopoverContent {#popover-content-5}

**Type**: `DefineSetupFnComponent<PopoverContentProps & HTMLAttributes, PopoverContentEmits>`

## PopoverRoot {#popover-root-5}

**Type**: `DefineSetupFnComponent<PopoverRootProps & HTMLAttributes, PopoverRootEmits>`

## PopoverTrigger {#popover-trigger-5}

**Type**: `DefineSetupFnComponent<PopoverTriggerProps & HTMLAttributes, PopoverTriggerEmits>`
