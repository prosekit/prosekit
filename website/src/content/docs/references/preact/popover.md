---
title: prosekit/preact/popover
sidebar:
  label: preact/popover
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Interfaces

### PopoverContentProps {#popovercontentprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [PopoverContent](#popovercontent) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`PopoverContentProps`](../web/popover.md#popovercontentprops), [`PopoverContentEvents`](../web/popover.md#popovercontentevents)\>\>

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

<a id="altboundary"></a> `altBoundary?`

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
Partial.altBoundary
```

</td>
</tr>
<tr>
<td>

<a id="autoupdate"></a> `autoUpdate?`

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
Partial.autoUpdate
```

</td>
</tr>
<tr>
<td>

<a id="boundary"></a> `boundary?`

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
Partial.boundary
```

</td>
</tr>
<tr>
<td>

<a id="elementcontext"></a> `elementContext?`

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
Partial.elementContext
```

</td>
</tr>
<tr>
<td>

<a id="fitviewport"></a> `fitViewport?`

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
Partial.fitViewport
```

</td>
</tr>
<tr>
<td>

<a id="flip"></a> `flip?`

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
Partial.flip
```

</td>
</tr>
<tr>
<td>

<a id="hide"></a> `hide?`

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
Partial.hide
```

</td>
</tr>
<tr>
<td>

<a id="hoist"></a> `hoist?`

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
Partial.hoist
```

</td>
</tr>
<tr>
<td>

<a id="inline"></a> `inline?`

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
Partial.inline
```

</td>
</tr>
<tr>
<td>

<a id="offset"></a> `offset?`

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
Partial.offset
```

</td>
</tr>
<tr>
<td>

<a id="onescapekeydown"></a> `onEscapeKeyDown?`

</td>
<td>

(`event`: `EscapeKeyDownEvent`) => `void`

</td>
<td>

&hyphen;

</td>
<td>

```ts
Partial.onEscapeKeyDown
```

</td>
</tr>
<tr>
<td>

<a id="onfocusoutside"></a> `onFocusOutside?`

</td>
<td>

(`event`: `FocusOutsideEvent`) => `void`

</td>
<td>

&hyphen;

</td>
<td>

```ts
Partial.onFocusOutside
```

</td>
</tr>
<tr>
<td>

<a id="oninteractoutside"></a> `onInteractOutside?`

</td>
<td>

(`event`: `InteractOutsideEvent`) => `void`

</td>
<td>

&hyphen;

</td>
<td>

```ts
Partial.onInteractOutside
```

</td>
</tr>
<tr>
<td>

<a id="onpointerdownoutside"></a> `onPointerDownOutside?`

</td>
<td>

(`event`: `PointerDownOutsideEvent`) => `void`

</td>
<td>

&hyphen;

</td>
<td>

```ts
Partial.onPointerDownOutside
```

</td>
</tr>
<tr>
<td>

<a id="overflowpadding"></a> `overflowPadding?`

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
Partial.overflowPadding
```

</td>
</tr>
<tr>
<td>

<a id="overlap"></a> `overlap?`

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
Partial.overlap
```

</td>
</tr>
<tr>
<td>

<a id="placement"></a> `placement?`

</td>
<td>

`Placement`

</td>
<td>

The initial placement of the floating element

**Default**

```ts
"top"
```

</td>
<td>

```ts
Partial.placement
```

</td>
</tr>
<tr>
<td>

<a id="rootboundary"></a> `rootBoundary?`

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
Partial.rootBoundary
```

</td>
</tr>
<tr>
<td>

<a id="sameheight"></a> `sameHeight?`

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
Partial.sameHeight
```

</td>
</tr>
<tr>
<td>

<a id="samewidth"></a> `sameWidth?`

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
Partial.sameWidth
```

</td>
</tr>
<tr>
<td>

<a id="shift"></a> `shift?`

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
Partial.shift
```

</td>
</tr>
<tr>
<td>

<a id="strategy"></a> `strategy?`

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
Partial.strategy
```

</td>
</tr>
<tr>
<td>

<a id="transform"></a> `transform?`

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
Partial.transform
```

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### PopoverRootProps {#popoverrootprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [PopoverRoot](#popoverroot) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`PopoverRootProps`](../web/popover.md#popoverrootprops), [`PopoverRootEvents`](../web/popover.md#popoverrootevents)\>\>

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

<a id="defaultopen"></a> `defaultOpen?`

</td>
<td>

`boolean`

</td>
<td>

Whether the popover is open by default.

**Default**

```ts
false
```

</td>
<td>

```ts
Partial.defaultOpen
```

</td>
</tr>
<tr>
<td>

<a id="onopenchange"></a> `onOpenChange?`

</td>
<td>

(`event`: `boolean`) => `void`

</td>
<td>

&hyphen;

</td>
<td>

```ts
Partial.onOpenChange
```

</td>
</tr>
<tr>
<td>

<a id="open"></a> `open?`

</td>
<td>

`boolean`

</td>
<td>

Whether the popover is open.

**Default**

```ts
false
```

</td>
<td>

```ts
Partial.open
```

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### PopoverTriggerProps {#popovertriggerprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [PopoverTrigger](#popovertrigger) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`PopoverTriggerProps`](../web/popover.md#popovertriggerprops), [`PopoverTriggerEvents`](../web/popover.md#popovertriggerevents)\>\>

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

<!-- DEBUG memberWithGroups 10 -->

## Variables

### PopoverContent {#popovercontent}

```ts
const PopoverContent: ForwardRefExoticComponent<Partial<PopoverContentProps> & RefAttributes<PopoverContentElement> & HTMLAttributes<PopoverContentElement>>;
```

***

### PopoverRoot {#popoverroot}

```ts
const PopoverRoot: ForwardRefExoticComponent<Partial<PopoverRootProps> & RefAttributes<PopoverRootElement> & HTMLAttributes<PopoverRootElement>>;
```

***

### PopoverTrigger {#popovertrigger}

```ts
const PopoverTrigger: ForwardRefExoticComponent<Partial<PopoverTriggerProps> & RefAttributes<PopoverTriggerElement> & HTMLAttributes<PopoverTriggerElement>>;
```

<!-- DEBUG memberWithGroups 10 -->
