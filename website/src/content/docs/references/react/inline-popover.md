---
title: prosekit/react/inline-popover
sidebar:
  label: react/inline-popover
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Interfaces

### InlinePopoverProps {#inlinepopoverprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [InlinePopover](#inlinepopover) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`InlinePopoverProps`](../web/inline-popover.md#inlinepopoverprops), [`InlinePopoverEvents`](../web/inline-popover.md#inlinepopoverevents)\>\>

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

<a id="defaultopen"></a> `defaultOpen?`

</td>
<td>

`boolean`

</td>
<td>

Whether the popover is open by default when some inline content is
selected.

When `defaultOpen` is true, the popover will open or close based on the
inline selection. When `defaultOpen` is false, the popover will never be
opened unless the `open` prop is true.

**Default**

```ts
true
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

<a id="dismissonescape"></a> `dismissOnEscape?`

</td>
<td>

`boolean`

</td>
<td>

Whether the inline popover should be dismissed when the editor receives an
Escape key press.

**Default**

```ts
true
```

</td>
<td>

```ts
Partial.dismissOnEscape
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

**Default**

```ts
true
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

**Default**

```ts
true
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

**Default**

```ts
12
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

Notice that the popover will be always hidden if the inline selection is
empty.

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
<tr>
<td>

<a id="overflowpadding"></a> `overflowPadding?`

</td>
<td>

`number`

</td>
<td>

**Default**

```ts
8
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

**Default**

```ts
true
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

## Variables

### InlinePopover {#inlinepopover}

```ts
const InlinePopover: ForwardRefExoticComponent<InlinePopoverProps & RefAttributes<InlinePopoverElement> & HTMLAttributes<InlinePopoverElement>>;
```

<!-- DEBUG memberWithGroups 10 -->
