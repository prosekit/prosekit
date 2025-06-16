---
title: prosekit/web/table-handle
sidebar:
  label: web/table-handle
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Classes

### TableHandleColumnRootElement {#tablehandlecolumnrootelement}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `TableHandleColumnRootElementBase`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new TableHandleColumnRootElement(): TableHandleColumnRootElement;
```

###### Returns

[`TableHandleColumnRootElement`](#tablehandlecolumnrootelement)

###### Inherited from

```ts
TableHandleColumnRootElementBase.constructor
```

#### Properties

##### altBoundary {#altboundary}

```ts
altBoundary: boolean;
```

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

```ts
false
```

###### Inherited from

```ts
TableHandleColumnRootElementBase.altBoundary
```

##### autoUpdate {#autoupdate}

```ts
autoUpdate: 
  | boolean
  | AutoUpdateOptions;
```

Options to activate auto-update listeners

###### See

https://floating-ui.com/docs/autoUpdate

###### Default

```ts
true
```

###### Inherited from

```ts
TableHandleColumnRootElementBase.autoUpdate
```

##### boundary {#boundary}

```ts
boundary: Boundary;
```

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

###### Default

```ts
'clippingAncestors'
```

###### Inherited from

```ts
TableHandleColumnRootElementBase.boundary
```

##### elementContext {#elementcontext}

```ts
elementContext: ElementContext;
```

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

```ts
'floating'
```

###### Inherited from

```ts
TableHandleColumnRootElementBase.elementContext
```

##### fitViewport {#fitviewport}

```ts
fitViewport: boolean;
```

Whether to constrain the floating element's width and height to not exceed
the viewport.

###### Default

```ts
false
```

###### Inherited from

```ts
TableHandleColumnRootElementBase.fitViewport
```

##### flip {#flip}

```ts
flip: boolean | Placement[];
```

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

###### Default

```ts
true
```

###### Inherited from

```ts
TableHandleColumnRootElementBase.flip
```

##### hide {#hide}

```ts
hide: boolean;
```

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

```ts
false
```

###### Inherited from

```ts
TableHandleColumnRootElementBase.hide
```

##### hoist {#hoist}

```ts
hoist: boolean;
```

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content. When enabled,
the floating element won't be clipped by an ancestor. This provides a
similar result to React's `<Portals>` or Vue's `<Teleport>`.

###### Default

```ts
true
```

###### Inherited from

```ts
TableHandleColumnRootElementBase.hoist
```

##### inline {#inline}

```ts
inline: boolean;
```

Whether to improve positioning for inline reference elements that span over
multiple lines.

###### Default

```ts
false
```

###### Inherited from

```ts
TableHandleColumnRootElementBase.inline
```

##### offset? {#offset}

```ts
optional offset: OffsetOptions;
```

The distance between the reference and floating element.

###### Default

```ts
6
```

###### Inherited from

```ts
TableHandleColumnRootElementBase.offset
```

##### overflowPadding {#overflowpadding}

```ts
overflowPadding: number;
```

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

###### Default

```ts
4
```

###### Inherited from

```ts
TableHandleColumnRootElementBase.overflowPadding
```

##### overlap {#overlap}

```ts
overlap: boolean;
```

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

```ts
false
```

###### Inherited from

```ts
TableHandleColumnRootElementBase.overlap
```

##### placement {#placement}

```ts
placement: Placement;
```

The placement of the popover, relative to the hovered table cell.

###### Default

```ts
"top"
```

###### Inherited from

```ts
TableHandleColumnRootElementBase.placement
```

##### rootBoundary {#rootboundary}

```ts
rootBoundary: RootBoundary;
```

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

```ts
'viewport'
```

###### Inherited from

```ts
TableHandleColumnRootElementBase.rootBoundary
```

##### sameHeight {#sameheight}

```ts
sameHeight: boolean;
```

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

```ts
false
```

###### Inherited from

```ts
TableHandleColumnRootElementBase.sameHeight
```

##### sameWidth {#samewidth}

```ts
sameWidth: boolean;
```

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

```ts
false
```

###### Inherited from

```ts
TableHandleColumnRootElementBase.sameWidth
```

##### shift {#shift}

```ts
shift: boolean;
```

Whether the floating element should shift to keep it in view.

###### Default

```ts
true
```

###### Inherited from

```ts
TableHandleColumnRootElementBase.shift
```

##### strategy {#strategy}

```ts
strategy: "fixed" | "absolute";
```

The strategy to use for positioning

###### Default

```ts
"absolute"
```

###### Inherited from

```ts
TableHandleColumnRootElementBase.strategy
```

##### transform {#transform}

```ts
transform: boolean;
```

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

###### Default

```ts
false
```

###### Inherited from

```ts
TableHandleColumnRootElementBase.transform
```

<!-- DEBUG memberWithGroups 10 -->

***

### TableHandleColumnTriggerElement {#tablehandlecolumntriggerelement}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `TableHandleColumnTriggerElementBase`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new TableHandleColumnTriggerElement(): TableHandleColumnTriggerElement;
```

###### Returns

[`TableHandleColumnTriggerElement`](#tablehandlecolumntriggerelement)

###### Inherited from

```ts
TableHandleColumnTriggerElementBase.constructor
```

#### Properties

##### editor {#editor}

```ts
editor: null | Editor<TableCommandsExtension>;
```

###### Inherited from

```ts
TableHandleColumnTriggerElementBase.editor
```

<!-- DEBUG memberWithGroups 10 -->

***

### TableHandlePopoverContentElement {#tablehandlepopovercontentelement}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `TableHandlePopoverContentElementBase`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new TableHandlePopoverContentElement(): TableHandlePopoverContentElement;
```

###### Returns

[`TableHandlePopoverContentElement`](#tablehandlepopovercontentelement)

###### Inherited from

```ts
TableHandlePopoverContentElementBase.constructor
```

#### Properties

##### altBoundary {#altboundary-1}

```ts
altBoundary: boolean;
```

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

```ts
false
```

###### Inherited from

```ts
TableHandlePopoverContentElementBase.altBoundary
```

##### autoUpdate {#autoupdate-1}

```ts
autoUpdate: 
  | boolean
  | AutoUpdateOptions;
```

Options to activate auto-update listeners

###### See

https://floating-ui.com/docs/autoUpdate

###### Default

```ts
true
```

###### Inherited from

```ts
TableHandlePopoverContentElementBase.autoUpdate
```

##### boundary {#boundary-1}

```ts
boundary: Boundary;
```

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

###### Default

```ts
'clippingAncestors'
```

###### Inherited from

```ts
TableHandlePopoverContentElementBase.boundary
```

##### editor {#editor-1}

```ts
editor: null | Editor<any>;
```

###### Inherited from

```ts
TableHandlePopoverContentElementBase.editor
```

##### elementContext {#elementcontext-1}

```ts
elementContext: ElementContext;
```

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

```ts
'floating'
```

###### Inherited from

```ts
TableHandlePopoverContentElementBase.elementContext
```

##### eventTarget? {#eventtarget}

```ts
optional eventTarget: 
  | HTMLElement
| TypedEventTarget<"keydown">;
```

By default, the menu element will listen for keydown events. You can pass a
different element to listen for keydown events.

###### Inherited from

```ts
TableHandlePopoverContentElementBase.eventTarget
```

##### fitViewport {#fitviewport-1}

```ts
fitViewport: boolean;
```

Whether to constrain the floating element's width and height to not exceed
the viewport.

###### Default

```ts
false
```

###### Inherited from

```ts
TableHandlePopoverContentElementBase.fitViewport
```

##### flip {#flip-1}

```ts
flip: boolean | Placement[];
```

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

###### Default

```ts
true
```

###### Inherited from

```ts
TableHandlePopoverContentElementBase.flip
```

##### hide {#hide-1}

```ts
hide: boolean;
```

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

```ts
false
```

###### Inherited from

```ts
TableHandlePopoverContentElementBase.hide
```

##### hoist {#hoist-1}

```ts
hoist: boolean;
```

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content. When enabled,
the floating element won't be clipped by an ancestor. This provides a
similar result to React's `<Portals>` or Vue's `<Teleport>`.

###### Default

```ts
true
```

###### Inherited from

```ts
TableHandlePopoverContentElementBase.hoist
```

##### inline {#inline-1}

```ts
inline: boolean;
```

Whether to improve positioning for inline reference elements that span over
multiple lines.

###### Default

```ts
false
```

###### Inherited from

```ts
TableHandlePopoverContentElementBase.inline
```

##### offset {#offset-1}

```ts
offset: undefined | OffsetOptions;
```

###### Default

```ts
{mainAxis: -4, crossAxis: 4}
```

###### Inherited from

```ts
TableHandlePopoverContentElementBase.offset
```

##### overflowPadding {#overflowpadding-1}

```ts
overflowPadding: number;
```

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

###### Default

```ts
4
```

###### Inherited from

```ts
TableHandlePopoverContentElementBase.overflowPadding
```

##### overlap {#overlap-1}

```ts
overlap: boolean;
```

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

```ts
false
```

###### Inherited from

```ts
TableHandlePopoverContentElementBase.overlap
```

##### placement {#placement-1}

```ts
placement: Placement;
```

###### Default

```ts
'bottom-start'
```

###### Inherited from

```ts
TableHandlePopoverContentElementBase.placement
```

##### rootBoundary {#rootboundary-1}

```ts
rootBoundary: RootBoundary;
```

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

```ts
'viewport'
```

###### Inherited from

```ts
TableHandlePopoverContentElementBase.rootBoundary
```

##### sameHeight {#sameheight-1}

```ts
sameHeight: boolean;
```

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

```ts
false
```

###### Inherited from

```ts
TableHandlePopoverContentElementBase.sameHeight
```

##### sameWidth {#samewidth-1}

```ts
sameWidth: boolean;
```

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

```ts
false
```

###### Inherited from

```ts
TableHandlePopoverContentElementBase.sameWidth
```

##### shift {#shift-1}

```ts
shift: boolean;
```

Whether the floating element should shift to keep it in view.

###### Default

```ts
true
```

###### Inherited from

```ts
TableHandlePopoverContentElementBase.shift
```

##### strategy {#strategy-1}

```ts
strategy: "fixed" | "absolute";
```

The strategy to use for positioning

###### Default

```ts
"absolute"
```

###### Inherited from

```ts
TableHandlePopoverContentElementBase.strategy
```

##### transform {#transform-1}

```ts
transform: boolean;
```

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

###### Default

```ts
false
```

###### Inherited from

```ts
TableHandlePopoverContentElementBase.transform
```

<!-- DEBUG memberWithGroups 10 -->

***

### TableHandlePopoverItemElement {#tablehandlepopoveritemelement}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `TableHandlePopoverItemElementBase`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new TableHandlePopoverItemElement(): TableHandlePopoverItemElement;
```

###### Returns

[`TableHandlePopoverItemElement`](#tablehandlepopoveritemelement)

###### Inherited from

```ts
TableHandlePopoverItemElementBase.constructor
```

#### Properties

##### filter {#filter}

```ts
filter: ItemFilter;
```

The filter function to determine if an item should be shown in the listbox.

###### Default

```ts
defaultItemFilter
```

###### Inherited from

```ts
TableHandlePopoverItemElementBase.filter
```

##### query {#query}

```ts
query: string;
```

The query string to filter the listbox items.

###### Default

```ts
""
```

###### Inherited from

```ts
TableHandlePopoverItemElementBase.query
```

##### value {#value}

```ts
value: string;
```

The value of the item. Every item must have a unique value in the parent
list. By default, a random value is generated.

###### Default

```ts
""
```

###### Inherited from

```ts
TableHandlePopoverItemElementBase.value
```

<!-- DEBUG memberWithGroups 10 -->

***

### TableHandleRootElement {#tablehandlerootelement}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `TableHandleRootElementBase`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new TableHandleRootElement(): TableHandleRootElement;
```

###### Returns

[`TableHandleRootElement`](#tablehandlerootelement)

###### Inherited from

```ts
TableHandleRootElementBase.constructor
```

<!-- DEBUG memberWithGroups 10 -->

***

### TableHandleRowRootElement {#tablehandlerowrootelement}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `TableHandleRowRootElementBase`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new TableHandleRowRootElement(): TableHandleRowRootElement;
```

###### Returns

[`TableHandleRowRootElement`](#tablehandlerowrootelement)

###### Inherited from

```ts
TableHandleRowRootElementBase.constructor
```

#### Properties

##### altBoundary {#altboundary-2}

```ts
altBoundary: boolean;
```

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

```ts
false
```

###### Inherited from

```ts
TableHandleRowRootElementBase.altBoundary
```

##### autoUpdate {#autoupdate-2}

```ts
autoUpdate: 
  | boolean
  | AutoUpdateOptions;
```

Options to activate auto-update listeners

###### See

https://floating-ui.com/docs/autoUpdate

###### Default

```ts
true
```

###### Inherited from

```ts
TableHandleRowRootElementBase.autoUpdate
```

##### boundary {#boundary-2}

```ts
boundary: Boundary;
```

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

###### Default

```ts
'clippingAncestors'
```

###### Inherited from

```ts
TableHandleRowRootElementBase.boundary
```

##### elementContext {#elementcontext-2}

```ts
elementContext: ElementContext;
```

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

```ts
'floating'
```

###### Inherited from

```ts
TableHandleRowRootElementBase.elementContext
```

##### fitViewport {#fitviewport-2}

```ts
fitViewport: boolean;
```

Whether to constrain the floating element's width and height to not exceed
the viewport.

###### Default

```ts
false
```

###### Inherited from

```ts
TableHandleRowRootElementBase.fitViewport
```

##### flip {#flip-2}

```ts
flip: boolean | Placement[];
```

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

###### Default

```ts
true
```

###### Inherited from

```ts
TableHandleRowRootElementBase.flip
```

##### hide {#hide-2}

```ts
hide: boolean;
```

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

```ts
false
```

###### Inherited from

```ts
TableHandleRowRootElementBase.hide
```

##### hoist {#hoist-2}

```ts
hoist: boolean;
```

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content. When enabled,
the floating element won't be clipped by an ancestor. This provides a
similar result to React's `<Portals>` or Vue's `<Teleport>`.

###### Default

```ts
true
```

###### Inherited from

```ts
TableHandleRowRootElementBase.hoist
```

##### inline {#inline-2}

```ts
inline: boolean;
```

Whether to improve positioning for inline reference elements that span over
multiple lines.

###### Default

```ts
false
```

###### Inherited from

```ts
TableHandleRowRootElementBase.inline
```

##### offset? {#offset-2}

```ts
optional offset: OffsetOptions;
```

The distance between the reference and floating element.

###### Default

```ts
6
```

###### Inherited from

```ts
TableHandleRowRootElementBase.offset
```

##### overflowPadding {#overflowpadding-2}

```ts
overflowPadding: number;
```

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

###### Default

```ts
4
```

###### Inherited from

```ts
TableHandleRowRootElementBase.overflowPadding
```

##### overlap {#overlap-2}

```ts
overlap: boolean;
```

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

```ts
false
```

###### Inherited from

```ts
TableHandleRowRootElementBase.overlap
```

##### placement {#placement-2}

```ts
placement: Placement;
```

The placement of the popover, relative to the hovered table cell.

###### Default

```ts
"left"
```

###### Inherited from

```ts
TableHandleRowRootElementBase.placement
```

##### rootBoundary {#rootboundary-2}

```ts
rootBoundary: RootBoundary;
```

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

```ts
'viewport'
```

###### Inherited from

```ts
TableHandleRowRootElementBase.rootBoundary
```

##### sameHeight {#sameheight-2}

```ts
sameHeight: boolean;
```

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

```ts
false
```

###### Inherited from

```ts
TableHandleRowRootElementBase.sameHeight
```

##### sameWidth {#samewidth-2}

```ts
sameWidth: boolean;
```

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

```ts
false
```

###### Inherited from

```ts
TableHandleRowRootElementBase.sameWidth
```

##### shift {#shift-2}

```ts
shift: boolean;
```

Whether the floating element should shift to keep it in view.

###### Default

```ts
true
```

###### Inherited from

```ts
TableHandleRowRootElementBase.shift
```

##### strategy {#strategy-2}

```ts
strategy: "fixed" | "absolute";
```

The strategy to use for positioning

###### Default

```ts
"absolute"
```

###### Inherited from

```ts
TableHandleRowRootElementBase.strategy
```

##### transform {#transform-2}

```ts
transform: boolean;
```

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

###### Default

```ts
false
```

###### Inherited from

```ts
TableHandleRowRootElementBase.transform
```

<!-- DEBUG memberWithGroups 10 -->

***

### TableHandleRowTriggerElement {#tablehandlerowtriggerelement}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `TableHandleRowTriggerElementBase`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new TableHandleRowTriggerElement(): TableHandleRowTriggerElement;
```

###### Returns

[`TableHandleRowTriggerElement`](#tablehandlerowtriggerelement)

###### Inherited from

```ts
TableHandleRowTriggerElementBase.constructor
```

#### Properties

##### editor {#editor-2}

```ts
editor: null | Editor<TableCommandsExtension>;
```

###### Inherited from

```ts
TableHandleRowTriggerElementBase.editor
```

<!-- DEBUG memberWithGroups 10 -->

## Interfaces

### TableHandleColumnRootProps {#tablehandlecolumnrootprops}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`OverlayPositionerProps`, `"placement"`\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### altBoundary {#altboundary-3}

```ts
altBoundary: boolean;
```

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

```ts
false
```

###### Inherited from

```ts
Omit.altBoundary
```

##### autoUpdate {#autoupdate-3}

```ts
autoUpdate: 
  | boolean
  | AutoUpdateOptions;
```

Options to activate auto-update listeners

###### See

https://floating-ui.com/docs/autoUpdate

###### Default

```ts
true
```

###### Inherited from

```ts
Omit.autoUpdate
```

##### boundary {#boundary-3}

```ts
boundary: Boundary;
```

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

###### Default

```ts
'clippingAncestors'
```

###### Inherited from

```ts
Omit.boundary
```

##### elementContext {#elementcontext-3}

```ts
elementContext: ElementContext;
```

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

```ts
'floating'
```

###### Inherited from

```ts
Omit.elementContext
```

##### fitViewport {#fitviewport-3}

```ts
fitViewport: boolean;
```

Whether to constrain the floating element's width and height to not exceed
the viewport.

###### Default

```ts
false
```

###### Inherited from

```ts
Omit.fitViewport
```

##### flip {#flip-3}

```ts
flip: boolean | Placement[];
```

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

###### Default

```ts
true
```

###### Inherited from

```ts
Omit.flip
```

##### hide {#hide-3}

```ts
hide: boolean;
```

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

```ts
false
```

###### Inherited from

```ts
Omit.hide
```

##### hoist {#hoist-3}

```ts
hoist: boolean;
```

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content. When enabled,
the floating element won't be clipped by an ancestor. This provides a
similar result to React's `<Portals>` or Vue's `<Teleport>`.

###### Default

```ts
true
```

###### Inherited from

```ts
Omit.hoist
```

##### inline {#inline-3}

```ts
inline: boolean;
```

Whether to improve positioning for inline reference elements that span over
multiple lines.

###### Default

```ts
false
```

###### Inherited from

```ts
Omit.inline
```

##### offset? {#offset-3}

```ts
optional offset: OffsetOptions;
```

The distance between the reference and floating element.

###### Default

```ts
6
```

###### Inherited from

```ts
Omit.offset
```

##### overflowPadding {#overflowpadding-3}

```ts
overflowPadding: number;
```

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

###### Default

```ts
4
```

###### Inherited from

```ts
Omit.overflowPadding
```

##### overlap {#overlap-3}

```ts
overlap: boolean;
```

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

```ts
false
```

###### Inherited from

```ts
Omit.overlap
```

##### placement {#placement-3}

```ts
placement: Placement;
```

The placement of the popover, relative to the hovered table cell.

###### Default

```ts
"top"
```

##### rootBoundary {#rootboundary-3}

```ts
rootBoundary: RootBoundary;
```

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

```ts
'viewport'
```

###### Inherited from

```ts
Omit.rootBoundary
```

##### sameHeight {#sameheight-3}

```ts
sameHeight: boolean;
```

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

```ts
false
```

###### Inherited from

```ts
Omit.sameHeight
```

##### sameWidth {#samewidth-3}

```ts
sameWidth: boolean;
```

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

```ts
false
```

###### Inherited from

```ts
Omit.sameWidth
```

##### shift {#shift-3}

```ts
shift: boolean;
```

Whether the floating element should shift to keep it in view.

###### Default

```ts
true
```

###### Inherited from

```ts
Omit.shift
```

##### strategy {#strategy-3}

```ts
strategy: "fixed" | "absolute";
```

The strategy to use for positioning

###### Default

```ts
"absolute"
```

###### Inherited from

```ts
Omit.strategy
```

##### transform {#transform-3}

```ts
transform: boolean;
```

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

###### Default

```ts
false
```

###### Inherited from

```ts
Omit.transform
```

<!-- DEBUG memberWithGroups 10 -->

***

### TableHandleColumnTriggerProps {#tablehandlecolumntriggerprops}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### editor {#editor-3}

```ts
editor: null | Editor<TableCommandsExtension>;
```

<!-- DEBUG memberWithGroups 10 -->

***

### TableHandlePopoverContentEvents {#tablehandlepopovercontentevents}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `MenuContentEvents`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### escapeKeyDown {#escapekeydown}

```ts
escapeKeyDown: EscapeKeyDownEvent;
```

Fired when the escape key is pressed.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

###### Inherited from

```ts
MenuContentEvents.escapeKeyDown
```

##### focusOutside {#focusoutside}

```ts
focusOutside: FocusOutsideEvent;
```

Fired when the focus is moved outside the element.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

###### Inherited from

```ts
MenuContentEvents.focusOutside
```

##### interactOutside {#interactoutside}

```ts
interactOutside: InteractOutsideEvent;
```

Fired when an interaction (pointer or focus) happens outside the
component.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

###### Inherited from

```ts
MenuContentEvents.interactOutside
```

##### pointerDownOutside {#pointerdownoutside}

```ts
pointerDownOutside: PointerDownOutsideEvent;
```

Fired when the pointer is pressed down outside the element.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

###### Inherited from

```ts
MenuContentEvents.pointerDownOutside
```

<!-- DEBUG memberWithGroups 10 -->

***

### TableHandlePopoverContentProps {#tablehandlepopovercontentprops}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`MenuContentProps`, `"placement"` \| `"offset"`\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### altBoundary {#altboundary-4}

```ts
altBoundary: boolean;
```

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

```ts
false
```

###### Inherited from

```ts
Omit.altBoundary
```

##### autoUpdate {#autoupdate-4}

```ts
autoUpdate: 
  | boolean
  | AutoUpdateOptions;
```

Options to activate auto-update listeners

###### See

https://floating-ui.com/docs/autoUpdate

###### Default

```ts
true
```

###### Inherited from

```ts
Omit.autoUpdate
```

##### boundary {#boundary-4}

```ts
boundary: Boundary;
```

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

###### Default

```ts
'clippingAncestors'
```

###### Inherited from

```ts
Omit.boundary
```

##### editor {#editor-4}

```ts
editor: null | Editor<any>;
```

##### elementContext {#elementcontext-4}

```ts
elementContext: ElementContext;
```

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

```ts
'floating'
```

###### Inherited from

```ts
Omit.elementContext
```

##### eventTarget? {#eventtarget-1}

```ts
optional eventTarget: 
  | HTMLElement
| TypedEventTarget<"keydown">;
```

By default, the menu element will listen for keydown events. You can pass a
different element to listen for keydown events.

###### Inherited from

```ts
Omit.eventTarget
```

##### fitViewport {#fitviewport-4}

```ts
fitViewport: boolean;
```

Whether to constrain the floating element's width and height to not exceed
the viewport.

###### Default

```ts
false
```

###### Inherited from

```ts
Omit.fitViewport
```

##### flip {#flip-4}

```ts
flip: boolean | Placement[];
```

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

###### Default

```ts
true
```

###### Inherited from

```ts
Omit.flip
```

##### hide {#hide-4}

```ts
hide: boolean;
```

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

```ts
false
```

###### Inherited from

```ts
Omit.hide
```

##### hoist {#hoist-4}

```ts
hoist: boolean;
```

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content. When enabled,
the floating element won't be clipped by an ancestor. This provides a
similar result to React's `<Portals>` or Vue's `<Teleport>`.

###### Default

```ts
true
```

###### Inherited from

```ts
Omit.hoist
```

##### inline {#inline-4}

```ts
inline: boolean;
```

Whether to improve positioning for inline reference elements that span over
multiple lines.

###### Default

```ts
false
```

###### Inherited from

```ts
Omit.inline
```

##### offset {#offset-4}

```ts
offset: undefined | OffsetOptions;
```

###### Default

```ts
{mainAxis: -4, crossAxis: 4}
```

##### overflowPadding {#overflowpadding-4}

```ts
overflowPadding: number;
```

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

###### Default

```ts
4
```

###### Inherited from

```ts
Omit.overflowPadding
```

##### overlap {#overlap-4}

```ts
overlap: boolean;
```

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

```ts
false
```

###### Inherited from

```ts
Omit.overlap
```

##### placement {#placement-4}

```ts
placement: Placement;
```

###### Default

```ts
'bottom-start'
```

##### rootBoundary {#rootboundary-4}

```ts
rootBoundary: RootBoundary;
```

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

```ts
'viewport'
```

###### Inherited from

```ts
Omit.rootBoundary
```

##### sameHeight {#sameheight-4}

```ts
sameHeight: boolean;
```

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

```ts
false
```

###### Inherited from

```ts
Omit.sameHeight
```

##### sameWidth {#samewidth-4}

```ts
sameWidth: boolean;
```

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

```ts
false
```

###### Inherited from

```ts
Omit.sameWidth
```

##### shift {#shift-4}

```ts
shift: boolean;
```

Whether the floating element should shift to keep it in view.

###### Default

```ts
true
```

###### Inherited from

```ts
Omit.shift
```

##### strategy {#strategy-4}

```ts
strategy: "fixed" | "absolute";
```

The strategy to use for positioning

###### Default

```ts
"absolute"
```

###### Inherited from

```ts
Omit.strategy
```

##### transform {#transform-4}

```ts
transform: boolean;
```

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

###### Default

```ts
false
```

###### Inherited from

```ts
Omit.transform
```

<!-- DEBUG memberWithGroups 10 -->

***

### TableHandlePopoverItemEvents {#tablehandlepopoveritemevents}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `MenuItemEvents`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### select {#select}

```ts
select: CustomEvent<void>;
```

Fired when the item is selected.

###### Inherited from

```ts
MenuItemEvents.select
```

<!-- DEBUG memberWithGroups 10 -->

***

### TableHandlePopoverItemProps {#tablehandlepopoveritemprops}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `MenuItemProps`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### filter {#filter-1}

```ts
filter: ItemFilter;
```

The filter function to determine if an item should be shown in the listbox.

###### Default

```ts
defaultItemFilter
```

###### Inherited from

```ts
MenuItemProps.filter
```

##### query {#query-1}

```ts
query: string;
```

The query string to filter the listbox items.

###### Default

```ts
""
```

###### Inherited from

```ts
MenuItemProps.query
```

##### value {#value-1}

```ts
value: string;
```

The value of the item. Every item must have a unique value in the parent
list. By default, a random value is generated.

###### Default

```ts
""
```

###### Inherited from

```ts
MenuItemProps.value
```

<!-- DEBUG memberWithGroups 10 -->

***

### TableHandleRootProps {#tablehandlerootprops}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

<!-- DEBUG memberWithGroups 10 -->

***

### TableHandleRowRootProps {#tablehandlerowrootprops}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`OverlayPositionerProps`, `"placement"`\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### altBoundary {#altboundary-5}

```ts
altBoundary: boolean;
```

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

```ts
false
```

###### Inherited from

```ts
Omit.altBoundary
```

##### autoUpdate {#autoupdate-5}

```ts
autoUpdate: 
  | boolean
  | AutoUpdateOptions;
```

Options to activate auto-update listeners

###### See

https://floating-ui.com/docs/autoUpdate

###### Default

```ts
true
```

###### Inherited from

```ts
Omit.autoUpdate
```

##### boundary {#boundary-5}

```ts
boundary: Boundary;
```

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

###### Default

```ts
'clippingAncestors'
```

###### Inherited from

```ts
Omit.boundary
```

##### elementContext {#elementcontext-5}

```ts
elementContext: ElementContext;
```

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

```ts
'floating'
```

###### Inherited from

```ts
Omit.elementContext
```

##### fitViewport {#fitviewport-5}

```ts
fitViewport: boolean;
```

Whether to constrain the floating element's width and height to not exceed
the viewport.

###### Default

```ts
false
```

###### Inherited from

```ts
Omit.fitViewport
```

##### flip {#flip-5}

```ts
flip: boolean | Placement[];
```

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

###### Default

```ts
true
```

###### Inherited from

```ts
Omit.flip
```

##### hide {#hide-5}

```ts
hide: boolean;
```

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

```ts
false
```

###### Inherited from

```ts
Omit.hide
```

##### hoist {#hoist-5}

```ts
hoist: boolean;
```

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content. When enabled,
the floating element won't be clipped by an ancestor. This provides a
similar result to React's `<Portals>` or Vue's `<Teleport>`.

###### Default

```ts
true
```

###### Inherited from

```ts
Omit.hoist
```

##### inline {#inline-5}

```ts
inline: boolean;
```

Whether to improve positioning for inline reference elements that span over
multiple lines.

###### Default

```ts
false
```

###### Inherited from

```ts
Omit.inline
```

##### offset? {#offset-5}

```ts
optional offset: OffsetOptions;
```

The distance between the reference and floating element.

###### Default

```ts
6
```

###### Inherited from

```ts
Omit.offset
```

##### overflowPadding {#overflowpadding-5}

```ts
overflowPadding: number;
```

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

###### Default

```ts
4
```

###### Inherited from

```ts
Omit.overflowPadding
```

##### overlap {#overlap-5}

```ts
overlap: boolean;
```

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

```ts
false
```

###### Inherited from

```ts
Omit.overlap
```

##### placement {#placement-5}

```ts
placement: Placement;
```

The placement of the popover, relative to the hovered table cell.

###### Default

```ts
"left"
```

##### rootBoundary {#rootboundary-5}

```ts
rootBoundary: RootBoundary;
```

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

```ts
'viewport'
```

###### Inherited from

```ts
Omit.rootBoundary
```

##### sameHeight {#sameheight-5}

```ts
sameHeight: boolean;
```

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

```ts
false
```

###### Inherited from

```ts
Omit.sameHeight
```

##### sameWidth {#samewidth-5}

```ts
sameWidth: boolean;
```

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

```ts
false
```

###### Inherited from

```ts
Omit.sameWidth
```

##### shift {#shift-5}

```ts
shift: boolean;
```

Whether the floating element should shift to keep it in view.

###### Default

```ts
true
```

###### Inherited from

```ts
Omit.shift
```

##### strategy {#strategy-5}

```ts
strategy: "fixed" | "absolute";
```

The strategy to use for positioning

###### Default

```ts
"absolute"
```

###### Inherited from

```ts
Omit.strategy
```

##### transform {#transform-5}

```ts
transform: boolean;
```

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

###### Default

```ts
false
```

###### Inherited from

```ts
Omit.transform
```

<!-- DEBUG memberWithGroups 10 -->

***

### TableHandleRowTriggerEvents {#tablehandlerowtriggerevents}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### select {#select-1}

```ts
select: CustomEvent<void>;
```

<!-- DEBUG memberWithGroups 10 -->

***

### TableHandleRowTriggerProps {#tablehandlerowtriggerprops}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### editor {#editor-5}

```ts
editor: null | Editor<TableCommandsExtension>;
```

<!-- DEBUG memberWithGroups 10 -->

<!-- DEBUG memberWithGroups 10 -->
