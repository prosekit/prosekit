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

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="altboundary-3"></a> `altBoundary`

</td>
<td>

`boolean`

</td>
<td>

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.altBoundary
```

</td>
</tr>
<tr>
<td>

<a id="autoupdate-3"></a> `autoUpdate`

</td>
<td>

 \| `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)

</td>
<td>

Options to activate auto-update listeners

**See**

https://floating-ui.com/docs/autoUpdate

**Default**

```ts
true
```

</td>
<td>

```ts
Omit.autoUpdate
```

</td>
</tr>
<tr>
<td>

<a id="boundary-3"></a> `boundary`

</td>
<td>

`Boundary`

</td>
<td>

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

**Default**

```ts
'clippingAncestors'
```

</td>
<td>

```ts
Omit.boundary
```

</td>
</tr>
<tr>
<td>

<a id="elementcontext-3"></a> `elementContext`

</td>
<td>

`ElementContext`

</td>
<td>

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

**Default**

```ts
'floating'
```

</td>
<td>

```ts
Omit.elementContext
```

</td>
</tr>
<tr>
<td>

<a id="fitviewport-3"></a> `fitViewport`

</td>
<td>

`boolean`

</td>
<td>

Whether to constrain the floating element's width and height to not exceed
the viewport.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.fitViewport
```

</td>
</tr>
<tr>
<td>

<a id="flip-3"></a> `flip`

</td>
<td>

`boolean` \| `Placement`[]

</td>
<td>

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

**Default**

```ts
true
```

</td>
<td>

```ts
Omit.flip
```

</td>
</tr>
<tr>
<td>

<a id="hide-3"></a> `hide`

</td>
<td>

`boolean`

</td>
<td>

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.hide
```

</td>
</tr>
<tr>
<td>

<a id="hoist-3"></a> `hoist`

</td>
<td>

`boolean`

</td>
<td>

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content. When enabled,
the floating element won't be clipped by an ancestor. This provides a
similar result to React's `<Portals>` or Vue's `<Teleport>`.

**Default**

```ts
true
```

</td>
<td>

```ts
Omit.hoist
```

</td>
</tr>
<tr>
<td>

<a id="inline-3"></a> `inline`

</td>
<td>

`boolean`

</td>
<td>

Whether to improve positioning for inline reference elements that span over
multiple lines.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.inline
```

</td>
</tr>
<tr>
<td>

<a id="offset-3"></a> `offset?`

</td>
<td>

`OffsetOptions`

</td>
<td>

The distance between the reference and floating element.

**Default**

```ts
6
```

</td>
<td>

```ts
Omit.offset
```

</td>
</tr>
<tr>
<td>

<a id="overflowpadding-3"></a> `overflowPadding`

</td>
<td>

`number`

</td>
<td>

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

**Default**

```ts
4
```

</td>
<td>

```ts
Omit.overflowPadding
```

</td>
</tr>
<tr>
<td>

<a id="overlap-3"></a> `overlap`

</td>
<td>

`boolean`

</td>
<td>

Whether the floating element can overlap the reference element to keep it
in view.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.overlap
```

</td>
</tr>
<tr>
<td>

<a id="placement-3"></a> `placement`

</td>
<td>

`Placement`

</td>
<td>

The placement of the popover, relative to the hovered table cell.

**Default**

```ts
"top"
```

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="rootboundary-3"></a> `rootBoundary`

</td>
<td>

`RootBoundary`

</td>
<td>

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

**Default**

```ts
'viewport'
```

</td>
<td>

```ts
Omit.rootBoundary
```

</td>
</tr>
<tr>
<td>

<a id="sameheight-3"></a> `sameHeight`

</td>
<td>

`boolean`

</td>
<td>

Whether to constrain the floating element's height so that it matches the
reference element.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.sameHeight
```

</td>
</tr>
<tr>
<td>

<a id="samewidth-3"></a> `sameWidth`

</td>
<td>

`boolean`

</td>
<td>

Whether to constrain the floating element's width so that it matches the
reference element.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.sameWidth
```

</td>
</tr>
<tr>
<td>

<a id="shift-3"></a> `shift`

</td>
<td>

`boolean`

</td>
<td>

Whether the floating element should shift to keep it in view.

**Default**

```ts
true
```

</td>
<td>

```ts
Omit.shift
```

</td>
</tr>
<tr>
<td>

<a id="strategy-3"></a> `strategy`

</td>
<td>

`"fixed"` \| `"absolute"`

</td>
<td>

The strategy to use for positioning

**Default**

```ts
"absolute"
```

</td>
<td>

```ts
Omit.strategy
```

</td>
</tr>
<tr>
<td>

<a id="transform-3"></a> `transform`

</td>
<td>

`boolean`

</td>
<td>

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.transform
```

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### TableHandleColumnTriggerProps {#tablehandlecolumntriggerprops}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="editor-3"></a> `editor`

</td>
<td>

`null` \| [`Editor`](../core.md#editor)\<`TableCommandsExtension`\>

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="escapekeydown"></a> `escapeKeyDown`

</td>
<td>

`EscapeKeyDownEvent`

</td>
<td>

Fired when the escape key is pressed.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

</td>
<td>

```ts
MenuContentEvents.escapeKeyDown
```

</td>
</tr>
<tr>
<td>

<a id="focusoutside"></a> `focusOutside`

</td>
<td>

`FocusOutsideEvent`

</td>
<td>

Fired when the focus is moved outside the element.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

</td>
<td>

```ts
MenuContentEvents.focusOutside
```

</td>
</tr>
<tr>
<td>

<a id="interactoutside"></a> `interactOutside`

</td>
<td>

`InteractOutsideEvent`

</td>
<td>

Fired when an interaction (pointer or focus) happens outside the
component.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

</td>
<td>

```ts
MenuContentEvents.interactOutside
```

</td>
</tr>
<tr>
<td>

<a id="pointerdownoutside"></a> `pointerDownOutside`

</td>
<td>

`PointerDownOutsideEvent`

</td>
<td>

Fired when the pointer is pressed down outside the element.

By default, the popover will be closed. It can be prevented by calling
`preventDefault()`.

</td>
<td>

```ts
MenuContentEvents.pointerDownOutside
```

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="altboundary-4"></a> `altBoundary`

</td>
<td>

`boolean`

</td>
<td>

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.altBoundary
```

</td>
</tr>
<tr>
<td>

<a id="autoupdate-4"></a> `autoUpdate`

</td>
<td>

 \| `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)

</td>
<td>

Options to activate auto-update listeners

**See**

https://floating-ui.com/docs/autoUpdate

**Default**

```ts
true
```

</td>
<td>

```ts
Omit.autoUpdate
```

</td>
</tr>
<tr>
<td>

<a id="boundary-4"></a> `boundary`

</td>
<td>

`Boundary`

</td>
<td>

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

**Default**

```ts
'clippingAncestors'
```

</td>
<td>

```ts
Omit.boundary
```

</td>
</tr>
<tr>
<td>

<a id="editor-4"></a> `editor`

</td>
<td>

`null` \| [`Editor`](../core.md#editor)\<`any`\>

</td>
<td>

&hyphen;

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="elementcontext-4"></a> `elementContext`

</td>
<td>

`ElementContext`

</td>
<td>

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

**Default**

```ts
'floating'
```

</td>
<td>

```ts
Omit.elementContext
```

</td>
</tr>
<tr>
<td>

<a id="eventtarget-1"></a> `eventTarget?`

</td>
<td>

 \| [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement) \| `TypedEventTarget`\<`"keydown"`\>

</td>
<td>

By default, the menu element will listen for keydown events. You can pass a
different element to listen for keydown events.

</td>
<td>

```ts
Omit.eventTarget
```

</td>
</tr>
<tr>
<td>

<a id="fitviewport-4"></a> `fitViewport`

</td>
<td>

`boolean`

</td>
<td>

Whether to constrain the floating element's width and height to not exceed
the viewport.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.fitViewport
```

</td>
</tr>
<tr>
<td>

<a id="flip-4"></a> `flip`

</td>
<td>

`boolean` \| `Placement`[]

</td>
<td>

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

**Default**

```ts
true
```

</td>
<td>

```ts
Omit.flip
```

</td>
</tr>
<tr>
<td>

<a id="hide-4"></a> `hide`

</td>
<td>

`boolean`

</td>
<td>

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.hide
```

</td>
</tr>
<tr>
<td>

<a id="hoist-4"></a> `hoist`

</td>
<td>

`boolean`

</td>
<td>

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content. When enabled,
the floating element won't be clipped by an ancestor. This provides a
similar result to React's `<Portals>` or Vue's `<Teleport>`.

**Default**

```ts
true
```

</td>
<td>

```ts
Omit.hoist
```

</td>
</tr>
<tr>
<td>

<a id="inline-4"></a> `inline`

</td>
<td>

`boolean`

</td>
<td>

Whether to improve positioning for inline reference elements that span over
multiple lines.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.inline
```

</td>
</tr>
<tr>
<td>

<a id="offset-4"></a> `offset`

</td>
<td>

`undefined` \| `OffsetOptions`

</td>
<td>

**Default**

```ts
{mainAxis: -4, crossAxis: 4}
```

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="overflowpadding-4"></a> `overflowPadding`

</td>
<td>

`number`

</td>
<td>

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

**Default**

```ts
4
```

</td>
<td>

```ts
Omit.overflowPadding
```

</td>
</tr>
<tr>
<td>

<a id="overlap-4"></a> `overlap`

</td>
<td>

`boolean`

</td>
<td>

Whether the floating element can overlap the reference element to keep it
in view.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.overlap
```

</td>
</tr>
<tr>
<td>

<a id="placement-4"></a> `placement`

</td>
<td>

`Placement`

</td>
<td>

**Default**

```ts
'bottom-start'
```

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="rootboundary-4"></a> `rootBoundary`

</td>
<td>

`RootBoundary`

</td>
<td>

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

**Default**

```ts
'viewport'
```

</td>
<td>

```ts
Omit.rootBoundary
```

</td>
</tr>
<tr>
<td>

<a id="sameheight-4"></a> `sameHeight`

</td>
<td>

`boolean`

</td>
<td>

Whether to constrain the floating element's height so that it matches the
reference element.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.sameHeight
```

</td>
</tr>
<tr>
<td>

<a id="samewidth-4"></a> `sameWidth`

</td>
<td>

`boolean`

</td>
<td>

Whether to constrain the floating element's width so that it matches the
reference element.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.sameWidth
```

</td>
</tr>
<tr>
<td>

<a id="shift-4"></a> `shift`

</td>
<td>

`boolean`

</td>
<td>

Whether the floating element should shift to keep it in view.

**Default**

```ts
true
```

</td>
<td>

```ts
Omit.shift
```

</td>
</tr>
<tr>
<td>

<a id="strategy-4"></a> `strategy`

</td>
<td>

`"fixed"` \| `"absolute"`

</td>
<td>

The strategy to use for positioning

**Default**

```ts
"absolute"
```

</td>
<td>

```ts
Omit.strategy
```

</td>
</tr>
<tr>
<td>

<a id="transform-4"></a> `transform`

</td>
<td>

`boolean`

</td>
<td>

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.transform
```

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="select"></a> `select`

</td>
<td>

[`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<`void`\>

</td>
<td>

Fired when the item is selected.

</td>
<td>

```ts
MenuItemEvents.select
```

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="filter-1"></a> `filter`

</td>
<td>

`ItemFilter`

</td>
<td>

The filter function to determine if an item should be shown in the listbox.

**Default**

```ts
defaultItemFilter
```

</td>
<td>

```ts
MenuItemProps.filter
```

</td>
</tr>
<tr>
<td>

<a id="query-1"></a> `query`

</td>
<td>

`string`

</td>
<td>

The query string to filter the listbox items.

**Default**

```ts
""
```

</td>
<td>

```ts
MenuItemProps.query
```

</td>
</tr>
<tr>
<td>

<a id="value-1"></a> `value`

</td>
<td>

`string`

</td>
<td>

The value of the item. Every item must have a unique value in the parent
list. By default, a random value is generated.

**Default**

```ts
""
```

</td>
<td>

```ts
MenuItemProps.value
```

</td>
</tr>
</tbody>
</table>

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

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="altboundary-5"></a> `altBoundary`

</td>
<td>

`boolean`

</td>
<td>

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.altBoundary
```

</td>
</tr>
<tr>
<td>

<a id="autoupdate-5"></a> `autoUpdate`

</td>
<td>

 \| `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)

</td>
<td>

Options to activate auto-update listeners

**See**

https://floating-ui.com/docs/autoUpdate

**Default**

```ts
true
```

</td>
<td>

```ts
Omit.autoUpdate
```

</td>
</tr>
<tr>
<td>

<a id="boundary-5"></a> `boundary`

</td>
<td>

`Boundary`

</td>
<td>

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

**Default**

```ts
'clippingAncestors'
```

</td>
<td>

```ts
Omit.boundary
```

</td>
</tr>
<tr>
<td>

<a id="elementcontext-5"></a> `elementContext`

</td>
<td>

`ElementContext`

</td>
<td>

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

**Default**

```ts
'floating'
```

</td>
<td>

```ts
Omit.elementContext
```

</td>
</tr>
<tr>
<td>

<a id="fitviewport-5"></a> `fitViewport`

</td>
<td>

`boolean`

</td>
<td>

Whether to constrain the floating element's width and height to not exceed
the viewport.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.fitViewport
```

</td>
</tr>
<tr>
<td>

<a id="flip-5"></a> `flip`

</td>
<td>

`boolean` \| `Placement`[]

</td>
<td>

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

**Default**

```ts
true
```

</td>
<td>

```ts
Omit.flip
```

</td>
</tr>
<tr>
<td>

<a id="hide-5"></a> `hide`

</td>
<td>

`boolean`

</td>
<td>

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.hide
```

</td>
</tr>
<tr>
<td>

<a id="hoist-5"></a> `hoist`

</td>
<td>

`boolean`

</td>
<td>

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content. When enabled,
the floating element won't be clipped by an ancestor. This provides a
similar result to React's `<Portals>` or Vue's `<Teleport>`.

**Default**

```ts
true
```

</td>
<td>

```ts
Omit.hoist
```

</td>
</tr>
<tr>
<td>

<a id="inline-5"></a> `inline`

</td>
<td>

`boolean`

</td>
<td>

Whether to improve positioning for inline reference elements that span over
multiple lines.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.inline
```

</td>
</tr>
<tr>
<td>

<a id="offset-5"></a> `offset?`

</td>
<td>

`OffsetOptions`

</td>
<td>

The distance between the reference and floating element.

**Default**

```ts
6
```

</td>
<td>

```ts
Omit.offset
```

</td>
</tr>
<tr>
<td>

<a id="overflowpadding-5"></a> `overflowPadding`

</td>
<td>

`number`

</td>
<td>

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

**Default**

```ts
4
```

</td>
<td>

```ts
Omit.overflowPadding
```

</td>
</tr>
<tr>
<td>

<a id="overlap-5"></a> `overlap`

</td>
<td>

`boolean`

</td>
<td>

Whether the floating element can overlap the reference element to keep it
in view.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.overlap
```

</td>
</tr>
<tr>
<td>

<a id="placement-5"></a> `placement`

</td>
<td>

`Placement`

</td>
<td>

The placement of the popover, relative to the hovered table cell.

**Default**

```ts
"left"
```

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="rootboundary-5"></a> `rootBoundary`

</td>
<td>

`RootBoundary`

</td>
<td>

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

**Default**

```ts
'viewport'
```

</td>
<td>

```ts
Omit.rootBoundary
```

</td>
</tr>
<tr>
<td>

<a id="sameheight-5"></a> `sameHeight`

</td>
<td>

`boolean`

</td>
<td>

Whether to constrain the floating element's height so that it matches the
reference element.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.sameHeight
```

</td>
</tr>
<tr>
<td>

<a id="samewidth-5"></a> `sameWidth`

</td>
<td>

`boolean`

</td>
<td>

Whether to constrain the floating element's width so that it matches the
reference element.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.sameWidth
```

</td>
</tr>
<tr>
<td>

<a id="shift-5"></a> `shift`

</td>
<td>

`boolean`

</td>
<td>

Whether the floating element should shift to keep it in view.

**Default**

```ts
true
```

</td>
<td>

```ts
Omit.shift
```

</td>
</tr>
<tr>
<td>

<a id="strategy-5"></a> `strategy`

</td>
<td>

`"fixed"` \| `"absolute"`

</td>
<td>

The strategy to use for positioning

**Default**

```ts
"absolute"
```

</td>
<td>

```ts
Omit.strategy
```

</td>
</tr>
<tr>
<td>

<a id="transform-5"></a> `transform`

</td>
<td>

`boolean`

</td>
<td>

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

**Default**

```ts
false
```

</td>
<td>

```ts
Omit.transform
```

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### TableHandleRowTriggerEvents {#tablehandlerowtriggerevents}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="select-1"></a> `select`

</td>
<td>

[`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<`void`\>

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### TableHandleRowTriggerProps {#tablehandlerowtriggerprops}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="editor-5"></a> `editor`

</td>
<td>

`null` \| [`Editor`](../core.md#editor)\<`TableCommandsExtension`\>

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

<!-- DEBUG memberWithGroups 10 -->
