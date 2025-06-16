---
title: prosekit/react/table-handle
sidebar:
  label: react/table-handle
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Interfaces

### TableHandleColumnRootProps {#tablehandlecolumnrootprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [TableHandleColumnRoot](#tablehandlecolumnroot) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`TableHandleColumnRootProps`](../web/table-handle.md#tablehandlecolumnrootprops), `Events`\>\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### altBoundary? {#altboundary}

```ts
optional altBoundary: boolean;
```

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### autoUpdate? {#autoupdate}

```ts
optional autoUpdate: 
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

<!-- DEBUG inheritance start kind=1024 -->

##### boundary? {#boundary}

```ts
optional boundary: Boundary;
```

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

###### Default

```ts
'clippingAncestors'
```

<!-- DEBUG inheritance start kind=1024 -->

##### elementContext? {#elementcontext}

```ts
optional elementContext: ElementContext;
```

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

```ts
'floating'
```

<!-- DEBUG inheritance start kind=1024 -->

##### fitViewport? {#fitviewport}

```ts
optional fitViewport: boolean;
```

Whether to constrain the floating element's width and height to not exceed
the viewport.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### flip? {#flip}

```ts
optional flip: boolean | Placement[];
```

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

###### Default

```ts
true
```

<!-- DEBUG inheritance start kind=1024 -->

##### hide? {#hide}

```ts
optional hide: boolean;
```

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### hoist? {#hoist}

```ts
optional hoist: boolean;
```

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content. When enabled,
the floating element won't be clipped by an ancestor. This provides a
similar result to React's `<Portals>` or Vue's `<Teleport>`.

###### Default

```ts
true
```

<!-- DEBUG inheritance start kind=1024 -->

##### inline? {#inline}

```ts
optional inline: boolean;
```

Whether to improve positioning for inline reference elements that span over
multiple lines.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### offset? {#offset}

```ts
optional offset: OffsetOptions;
```

The distance between the reference and floating element.

###### Default

```ts
6
```

<!-- DEBUG inheritance start kind=1024 -->

##### overflowPadding? {#overflowpadding}

```ts
optional overflowPadding: number;
```

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

###### Default

```ts
4
```

<!-- DEBUG inheritance start kind=1024 -->

##### overlap? {#overlap}

```ts
optional overlap: boolean;
```

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### placement? {#placement}

```ts
optional placement: Placement;
```

The placement of the popover, relative to the hovered table cell.

###### Default

```ts
"top"
```

<!-- DEBUG inheritance start kind=1024 -->

##### rootBoundary? {#rootboundary}

```ts
optional rootBoundary: RootBoundary;
```

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

```ts
'viewport'
```

<!-- DEBUG inheritance start kind=1024 -->

##### sameHeight? {#sameheight}

```ts
optional sameHeight: boolean;
```

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### sameWidth? {#samewidth}

```ts
optional sameWidth: boolean;
```

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### shift? {#shift}

```ts
optional shift: boolean;
```

Whether the floating element should shift to keep it in view.

###### Default

```ts
true
```

<!-- DEBUG inheritance start kind=1024 -->

##### strategy? {#strategy}

```ts
optional strategy: "fixed" | "absolute";
```

The strategy to use for positioning

###### Default

```ts
"absolute"
```

<!-- DEBUG inheritance start kind=1024 -->

##### transform? {#transform}

```ts
optional transform: boolean;
```

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### TableHandleColumnTriggerProps {#tablehandlecolumntriggerprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [TableHandleColumnTrigger](#tablehandlecolumntrigger) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`TableHandleColumnTriggerProps`](../web/table-handle.md#tablehandlecolumntriggerprops), `Events`\>\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### editor? {#editor}

```ts
optional editor: null | Editor<TableCommandsExtension>;
```

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### TableHandlePopoverContentProps {#tablehandlepopovercontentprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [TableHandlePopoverContent](#tablehandlepopovercontent) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`TableHandlePopoverContentProps`](../web/table-handle.md#tablehandlepopovercontentprops), [`TableHandlePopoverContentEvents`](../web/table-handle.md#tablehandlepopovercontentevents)\>\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### altBoundary? {#altboundary-1}

```ts
optional altBoundary: boolean;
```

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### autoUpdate? {#autoupdate-1}

```ts
optional autoUpdate: 
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

<!-- DEBUG inheritance start kind=1024 -->

##### boundary? {#boundary-1}

```ts
optional boundary: Boundary;
```

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

###### Default

```ts
'clippingAncestors'
```

<!-- DEBUG inheritance start kind=1024 -->

##### editor? {#editor-1}

```ts
optional editor: null | Editor<any>;
```

<!-- DEBUG inheritance start kind=1024 -->

##### elementContext? {#elementcontext-1}

```ts
optional elementContext: ElementContext;
```

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

```ts
'floating'
```

<!-- DEBUG inheritance start kind=1024 -->

##### eventTarget? {#eventtarget}

```ts
optional eventTarget: 
  | HTMLElement
| TypedEventTarget<"keydown">;
```

By default, the menu element will listen for keydown events. You can pass a
different element to listen for keydown events.

<!-- DEBUG inheritance start kind=1024 -->

##### fitViewport? {#fitviewport-1}

```ts
optional fitViewport: boolean;
```

Whether to constrain the floating element's width and height to not exceed
the viewport.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### flip? {#flip-1}

```ts
optional flip: boolean | Placement[];
```

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

###### Default

```ts
true
```

<!-- DEBUG inheritance start kind=1024 -->

##### hide? {#hide-1}

```ts
optional hide: boolean;
```

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### hoist? {#hoist-1}

```ts
optional hoist: boolean;
```

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content. When enabled,
the floating element won't be clipped by an ancestor. This provides a
similar result to React's `<Portals>` or Vue's `<Teleport>`.

###### Default

```ts
true
```

<!-- DEBUG inheritance start kind=1024 -->

##### inline? {#inline-1}

```ts
optional inline: boolean;
```

Whether to improve positioning for inline reference elements that span over
multiple lines.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### offset? {#offset-1}

```ts
optional offset: OffsetOptions;
```

###### Default

```ts
{mainAxis: -4, crossAxis: 4}
```

<!-- DEBUG inheritance start kind=1024 -->

##### onEscapeKeyDown()? {#onescapekeydown}

```ts
optional onEscapeKeyDown: (event: EscapeKeyDownEvent) => void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`event`

</td>
<td>

`EscapeKeyDownEvent`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG inheritance start kind=1024 -->

##### onFocusOutside()? {#onfocusoutside}

```ts
optional onFocusOutside: (event: FocusOutsideEvent) => void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`event`

</td>
<td>

`FocusOutsideEvent`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG inheritance start kind=1024 -->

##### onInteractOutside()? {#oninteractoutside}

```ts
optional onInteractOutside: (event: InteractOutsideEvent) => void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`event`

</td>
<td>

`InteractOutsideEvent`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG inheritance start kind=1024 -->

##### onPointerDownOutside()? {#onpointerdownoutside}

```ts
optional onPointerDownOutside: (event: PointerDownOutsideEvent) => void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`event`

</td>
<td>

`PointerDownOutsideEvent`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG inheritance start kind=1024 -->

##### overflowPadding? {#overflowpadding-1}

```ts
optional overflowPadding: number;
```

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

###### Default

```ts
4
```

<!-- DEBUG inheritance start kind=1024 -->

##### overlap? {#overlap-1}

```ts
optional overlap: boolean;
```

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### placement? {#placement-1}

```ts
optional placement: Placement;
```

###### Default

```ts
'bottom-start'
```

<!-- DEBUG inheritance start kind=1024 -->

##### rootBoundary? {#rootboundary-1}

```ts
optional rootBoundary: RootBoundary;
```

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

```ts
'viewport'
```

<!-- DEBUG inheritance start kind=1024 -->

##### sameHeight? {#sameheight-1}

```ts
optional sameHeight: boolean;
```

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### sameWidth? {#samewidth-1}

```ts
optional sameWidth: boolean;
```

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### shift? {#shift-1}

```ts
optional shift: boolean;
```

Whether the floating element should shift to keep it in view.

###### Default

```ts
true
```

<!-- DEBUG inheritance start kind=1024 -->

##### strategy? {#strategy-1}

```ts
optional strategy: "fixed" | "absolute";
```

The strategy to use for positioning

###### Default

```ts
"absolute"
```

<!-- DEBUG inheritance start kind=1024 -->

##### transform? {#transform-1}

```ts
optional transform: boolean;
```

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### TableHandlePopoverItemProps {#tablehandlepopoveritemprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [TableHandlePopoverItem](#tablehandlepopoveritem) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`TableHandlePopoverItemProps`](../web/table-handle.md#tablehandlepopoveritemprops), [`TableHandlePopoverItemEvents`](../web/table-handle.md#tablehandlepopoveritemevents)\>\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### filter? {#filter}

```ts
optional filter: ItemFilter;
```

The filter function to determine if an item should be shown in the listbox.

###### Default

```ts
defaultItemFilter
```

<!-- DEBUG inheritance start kind=1024 -->

##### onSelect()? {#onselect}

```ts
optional onSelect: (event: CustomEvent<void>) => void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`event`

</td>
<td>

[`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<`void`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG inheritance start kind=1024 -->

##### query? {#query}

```ts
optional query: string;
```

The query string to filter the listbox items.

###### Default

```ts
""
```

<!-- DEBUG inheritance start kind=1024 -->

##### value? {#value}

```ts
optional value: string;
```

The value of the item. Every item must have a unique value in the parent
list. By default, a random value is generated.

###### Default

```ts
""
```

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### TableHandleRootProps {#tablehandlerootprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [TableHandleRoot](#tablehandleroot) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`TableHandleRootProps`](../web/table-handle.md#tablehandlerootprops), `Events`\>\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

<!-- DEBUG memberWithGroups 10 -->

***

### TableHandleRowRootProps {#tablehandlerowrootprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [TableHandleRowRoot](#tablehandlerowroot) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`TableHandleRowRootProps`](../web/table-handle.md#tablehandlerowrootprops), `Events`\>\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### altBoundary? {#altboundary-2}

```ts
optional altBoundary: boolean;
```

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### autoUpdate? {#autoupdate-2}

```ts
optional autoUpdate: 
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

<!-- DEBUG inheritance start kind=1024 -->

##### boundary? {#boundary-2}

```ts
optional boundary: Boundary;
```

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

###### Default

```ts
'clippingAncestors'
```

<!-- DEBUG inheritance start kind=1024 -->

##### elementContext? {#elementcontext-2}

```ts
optional elementContext: ElementContext;
```

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

```ts
'floating'
```

<!-- DEBUG inheritance start kind=1024 -->

##### fitViewport? {#fitviewport-2}

```ts
optional fitViewport: boolean;
```

Whether to constrain the floating element's width and height to not exceed
the viewport.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### flip? {#flip-2}

```ts
optional flip: boolean | Placement[];
```

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

###### Default

```ts
true
```

<!-- DEBUG inheritance start kind=1024 -->

##### hide? {#hide-2}

```ts
optional hide: boolean;
```

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### hoist? {#hoist-2}

```ts
optional hoist: boolean;
```

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content. When enabled,
the floating element won't be clipped by an ancestor. This provides a
similar result to React's `<Portals>` or Vue's `<Teleport>`.

###### Default

```ts
true
```

<!-- DEBUG inheritance start kind=1024 -->

##### inline? {#inline-2}

```ts
optional inline: boolean;
```

Whether to improve positioning for inline reference elements that span over
multiple lines.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### offset? {#offset-2}

```ts
optional offset: OffsetOptions;
```

The distance between the reference and floating element.

###### Default

```ts
6
```

<!-- DEBUG inheritance start kind=1024 -->

##### overflowPadding? {#overflowpadding-2}

```ts
optional overflowPadding: number;
```

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

###### Default

```ts
4
```

<!-- DEBUG inheritance start kind=1024 -->

##### overlap? {#overlap-2}

```ts
optional overlap: boolean;
```

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### placement? {#placement-2}

```ts
optional placement: Placement;
```

The placement of the popover, relative to the hovered table cell.

###### Default

```ts
"left"
```

<!-- DEBUG inheritance start kind=1024 -->

##### rootBoundary? {#rootboundary-2}

```ts
optional rootBoundary: RootBoundary;
```

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

```ts
'viewport'
```

<!-- DEBUG inheritance start kind=1024 -->

##### sameHeight? {#sameheight-2}

```ts
optional sameHeight: boolean;
```

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### sameWidth? {#samewidth-2}

```ts
optional sameWidth: boolean;
```

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

##### shift? {#shift-2}

```ts
optional shift: boolean;
```

Whether the floating element should shift to keep it in view.

###### Default

```ts
true
```

<!-- DEBUG inheritance start kind=1024 -->

##### strategy? {#strategy-2}

```ts
optional strategy: "fixed" | "absolute";
```

The strategy to use for positioning

###### Default

```ts
"absolute"
```

<!-- DEBUG inheritance start kind=1024 -->

##### transform? {#transform-2}

```ts
optional transform: boolean;
```

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

###### Default

```ts
false
```

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

***

### TableHandleRowTriggerProps {#tablehandlerowtriggerprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [TableHandleRowTrigger](#tablehandlerowtrigger) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`TableHandleRowTriggerProps`](../web/table-handle.md#tablehandlerowtriggerprops), [`TableHandleRowTriggerEvents`](../web/table-handle.md#tablehandlerowtriggerevents)\>\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### editor? {#editor-2}

```ts
optional editor: null | Editor<TableCommandsExtension>;
```

<!-- DEBUG inheritance start kind=1024 -->

##### onSelect()? {#onselect-1}

```ts
optional onSelect: (event: CustomEvent<void>) => void;
```

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`event`

</td>
<td>

[`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<`void`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

## Variables

### TableHandleColumnRoot {#tablehandlecolumnroot}

```ts
const TableHandleColumnRoot: ForwardRefExoticComponent<TableHandleColumnRootProps & RefAttributes<TableHandleColumnRootElement> & HTMLAttributes<TableHandleColumnRootElement>>;
```

<!-- DEBUG inheritance start kind=32 -->

***

### TableHandleColumnTrigger {#tablehandlecolumntrigger}

```ts
const TableHandleColumnTrigger: ForwardRefExoticComponent<TableHandleColumnTriggerProps & RefAttributes<TableHandleColumnTriggerElement> & HTMLAttributes<TableHandleColumnTriggerElement>>;
```

<!-- DEBUG inheritance start kind=32 -->

***

### TableHandlePopoverContent {#tablehandlepopovercontent}

```ts
const TableHandlePopoverContent: ForwardRefExoticComponent<TableHandlePopoverContentProps & RefAttributes<TableHandlePopoverContentElement> & HTMLAttributes<TableHandlePopoverContentElement>>;
```

<!-- DEBUG inheritance start kind=32 -->

***

### TableHandlePopoverItem {#tablehandlepopoveritem}

```ts
const TableHandlePopoverItem: ForwardRefExoticComponent<TableHandlePopoverItemProps & RefAttributes<TableHandlePopoverItemElement> & HTMLAttributes<TableHandlePopoverItemElement>>;
```

<!-- DEBUG inheritance start kind=32 -->

***

### TableHandleRoot {#tablehandleroot}

```ts
const TableHandleRoot: ForwardRefExoticComponent<TableHandleRootProps & RefAttributes<TableHandleRootElement> & HTMLAttributes<TableHandleRootElement>>;
```

<!-- DEBUG inheritance start kind=32 -->

***

### TableHandleRowRoot {#tablehandlerowroot}

```ts
const TableHandleRowRoot: ForwardRefExoticComponent<TableHandleRowRootProps & RefAttributes<TableHandleRowRootElement> & HTMLAttributes<TableHandleRowRootElement>>;
```

<!-- DEBUG inheritance start kind=32 -->

***

### TableHandleRowTrigger {#tablehandlerowtrigger}

```ts
const TableHandleRowTrigger: ForwardRefExoticComponent<TableHandleRowTriggerProps & RefAttributes<TableHandleRowTriggerElement> & HTMLAttributes<TableHandleRowTriggerElement>>;
```

<!-- DEBUG inheritance start kind=32 -->

<!-- DEBUG memberWithGroups 10 -->
