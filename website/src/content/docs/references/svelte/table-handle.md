---
title: prosekit/svelte/table-handle
sidebar:
  label: svelte/table-handle
---

## Interfaces

### TableHandleColumnRootProps {#tablehandlecolumnrootprops}

Props for the [TableHandleColumnRoot](#tablehandlecolumnroot) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`TableHandleColumnRootProps`](../web/table-handle.md#tablehandlecolumnrootprops), `Events`\>\>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="altboundary" href="#altboundary">altBoundary</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="autoupdate" href="#autoupdate">autoUpdate</a><i>?</i>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

</dt>

<dd>

Options to activate auto-update listeners

###### See

https://floating-ui.com/docs/autoUpdate

###### Default

```ts
true
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="boundary" href="#boundary">boundary</a><i>?</i>: `Boundary`</code>

</dt>

<dd>

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

###### Default

```ts
'clippingAncestors'
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="elementcontext" href="#elementcontext">elementContext</a><i>?</i>: `ElementContext`</code>

</dt>

<dd>

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

```ts
'floating'
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="fitviewport" href="#fitviewport">fitViewport</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width and height to not exceed
the viewport.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="flip" href="#flip">flip</a><i>?</i>: `boolean` \| `Placement`[]</code>

</dt>

<dd>

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

###### Default

```ts
true
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="hide" href="#hide">hide</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="hoist" href="#hoist">hoist</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content. When enabled,
the floating element won't be clipped by an ancestor. This provides a
similar result to React's `<Portals>` or Vue's `<Teleport>`.

###### Default

```ts
true
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="inline" href="#inline">inline</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to improve positioning for inline reference elements that span over
multiple lines.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="offset" href="#offset">offset</a><i>?</i>: `OffsetOptions`</code>

</dt>

<dd>

The distance between the reference and floating element.

###### Default

```ts
6
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="overflowpadding" href="#overflowpadding">overflowPadding</a><i>?</i>: `number`</code>

</dt>

<dd>

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

###### Default

```ts
4
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="overlap" href="#overlap">overlap</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="placement" href="#placement">placement</a><i>?</i>: `Placement`</code>

</dt>

<dd>

The placement of the popover, relative to the hovered table cell.

###### Default

```ts
"top"
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="rootboundary" href="#rootboundary">rootBoundary</a><i>?</i>: `RootBoundary`</code>

</dt>

<dd>

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

```ts
'viewport'
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="sameheight" href="#sameheight">sameHeight</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="samewidth" href="#samewidth">sameWidth</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="shift" href="#shift">shift</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the floating element should shift to keep it in view.

###### Default

```ts
true
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="strategy" href="#strategy">strategy</a><i>?</i>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

```ts
"absolute"
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="transform" href="#transform">transform</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

###### Default

```ts
false
```

</dd>

</dl>

***

### TableHandleColumnTriggerProps {#tablehandlecolumntriggerprops}

Props for the [TableHandleColumnTrigger](#tablehandlecolumntrigger) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`TableHandleColumnTriggerProps`](../web/table-handle.md#tablehandlecolumntriggerprops), `Events`\>\>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="editor" href="#editor">editor</a><i>?</i>: `null` \| [`Editor`](../core.md#editor)\<`TableCommandsExtension`\></code>

</dt>

</dl>

***

### TableHandlePopoverContentProps {#tablehandlepopovercontentprops}

Props for the [TableHandlePopoverContent](#tablehandlepopovercontent) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`TableHandlePopoverContentProps`](../web/table-handle.md#tablehandlepopovercontentprops), [`TableHandlePopoverContentEvents`](../web/table-handle.md#tablehandlepopovercontentevents)\>\>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="altboundary-1" href="#altboundary-1">altBoundary</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="autoupdate-1" href="#autoupdate-1">autoUpdate</a><i>?</i>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

</dt>

<dd>

Options to activate auto-update listeners

###### See

https://floating-ui.com/docs/autoUpdate

###### Default

```ts
true
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="boundary-1" href="#boundary-1">boundary</a><i>?</i>: `Boundary`</code>

</dt>

<dd>

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

###### Default

```ts
'clippingAncestors'
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="editor-1" href="#editor-1">editor</a><i>?</i>: `null` \| [`Editor`](../core.md#editor)\<`any`\></code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="elementcontext-1" href="#elementcontext-1">elementContext</a><i>?</i>: `ElementContext`</code>

</dt>

<dd>

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

```ts
'floating'
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="eventtarget" href="#eventtarget">eventTarget</a><i>?</i>: [`HTMLElement`](https://developer.mozilla.org/docs/Web/API/HTMLElement) \| `TypedEventTarget`\<`"keydown"`\></code>

</dt>

<dd>

By default, the menu element will listen for keydown events. You can pass a
different element to listen for keydown events.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="fitviewport-1" href="#fitviewport-1">fitViewport</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width and height to not exceed
the viewport.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="flip-1" href="#flip-1">flip</a><i>?</i>: `boolean` \| `Placement`[]</code>

</dt>

<dd>

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

###### Default

```ts
true
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="hide-1" href="#hide-1">hide</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="hoist-1" href="#hoist-1">hoist</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content. When enabled,
the floating element won't be clipped by an ancestor. This provides a
similar result to React's `<Portals>` or Vue's `<Teleport>`.

###### Default

```ts
true
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="inline-1" href="#inline-1">inline</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to improve positioning for inline reference elements that span over
multiple lines.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="offset-1" href="#offset-1">offset</a><i>?</i>: `OffsetOptions`</code>

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

<code data-typedoc-declaration><i></i> <a id="onescapekeydown" href="#onescapekeydown">onEscapeKeyDown</a><i>?</i>: (`event`: `EscapeKeyDownEvent`) => `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="onfocusoutside" href="#onfocusoutside">onFocusOutside</a><i>?</i>: (`event`: `FocusOutsideEvent`) => `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="oninteractoutside" href="#oninteractoutside">onInteractOutside</a><i>?</i>: (`event`: `InteractOutsideEvent`) => `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="onpointerdownoutside" href="#onpointerdownoutside">onPointerDownOutside</a><i>?</i>: (`event`: `PointerDownOutsideEvent`) => `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="overflowpadding-1" href="#overflowpadding-1">overflowPadding</a><i>?</i>: `number`</code>

</dt>

<dd>

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

###### Default

```ts
4
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="overlap-1" href="#overlap-1">overlap</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="placement-1" href="#placement-1">placement</a><i>?</i>: `Placement`</code>

</dt>

<dd>

###### Default

```ts
'bottom-start'
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="rootboundary-1" href="#rootboundary-1">rootBoundary</a><i>?</i>: `RootBoundary`</code>

</dt>

<dd>

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

```ts
'viewport'
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="sameheight-1" href="#sameheight-1">sameHeight</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="samewidth-1" href="#samewidth-1">sameWidth</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="shift-1" href="#shift-1">shift</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the floating element should shift to keep it in view.

###### Default

```ts
true
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="strategy-1" href="#strategy-1">strategy</a><i>?</i>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

```ts
"absolute"
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="transform-1" href="#transform-1">transform</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

###### Default

```ts
false
```

</dd>

</dl>

***

### TableHandlePopoverItemProps {#tablehandlepopoveritemprops}

Props for the [TableHandlePopoverItem](#tablehandlepopoveritem) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`TableHandlePopoverItemProps`](../web/table-handle.md#tablehandlepopoveritemprops), [`TableHandlePopoverItemEvents`](../web/table-handle.md#tablehandlepopoveritemevents)\>\>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="filter" href="#filter">filter</a><i>?</i>: `ItemFilter`</code>

</dt>

<dd>

The filter function to determine if an item should be shown in the listbox.

###### Default

```ts
defaultItemFilter
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="onselect" href="#onselect">onSelect</a><i>?</i>: (`event`: [`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<`void`\>) => `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="query" href="#query">query</a><i>?</i>: `string`</code>

</dt>

<dd>

The query string to filter the listbox items.

###### Default

```ts
""
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="value" href="#value">value</a><i>?</i>: `string`</code>

</dt>

<dd>

The value of the item. Every item must have a unique value in the parent
list. By default, a random value is generated.

###### Default

```ts
""
```

</dd>

</dl>

***

### TableHandleRootProps {#tablehandlerootprops}

Props for the [TableHandleRoot](#tablehandleroot) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`TableHandleRootProps`](../web/table-handle.md#tablehandlerootprops), `Events`\>\>

***

### TableHandleRowRootProps {#tablehandlerowrootprops}

Props for the [TableHandleRowRoot](#tablehandlerowroot) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`TableHandleRowRootProps`](../web/table-handle.md#tablehandlerowrootprops), `Events`\>\>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="altboundary-2" href="#altboundary-2">altBoundary</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="autoupdate-2" href="#autoupdate-2">autoUpdate</a><i>?</i>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

</dt>

<dd>

Options to activate auto-update listeners

###### See

https://floating-ui.com/docs/autoUpdate

###### Default

```ts
true
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="boundary-2" href="#boundary-2">boundary</a><i>?</i>: `Boundary`</code>

</dt>

<dd>

Describes the clipping element(s) or area that overflow will be checked relative to.
Please see https://floating-ui.com/docs/detectoverflow#boundary for more information.

###### Default

```ts
'clippingAncestors'
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="elementcontext-2" href="#elementcontext-2">elementContext</a><i>?</i>: `ElementContext`</code>

</dt>

<dd>

The element that will be used to check for overflow. Please see
https://floating-ui.com/docs/detectoverflow#elementcontext for more
information.

###### Default

```ts
'floating'
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="fitviewport-2" href="#fitviewport-2">fitViewport</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width and height to not exceed
the viewport.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="flip-2" href="#flip-2">flip</a><i>?</i>: `boolean` \| `Placement`[]</code>

</dt>

<dd>

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

###### Default

```ts
true
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="hide-2" href="#hide-2">hide</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="hoist-2" href="#hoist-2">hoist</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
to place the floating element on top of other page content. When enabled,
the floating element won't be clipped by an ancestor. This provides a
similar result to React's `<Portals>` or Vue's `<Teleport>`.

###### Default

```ts
true
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="inline-2" href="#inline-2">inline</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to improve positioning for inline reference elements that span over
multiple lines.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="offset-2" href="#offset-2">offset</a><i>?</i>: `OffsetOptions`</code>

</dt>

<dd>

The distance between the reference and floating element.

###### Default

```ts
6
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="overflowpadding-2" href="#overflowpadding-2">overflowPadding</a><i>?</i>: `number`</code>

</dt>

<dd>

Describes the virtual padding around the boundary to check for overflow.
Please see https://floating-ui.com/docs/detectoverflow#padding for more information.

###### Default

```ts
4
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="overlap-2" href="#overlap-2">overlap</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the floating element can overlap the reference element to keep it
in view.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="placement-2" href="#placement-2">placement</a><i>?</i>: `Placement`</code>

</dt>

<dd>

The placement of the popover, relative to the hovered table cell.

###### Default

```ts
"left"
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="rootboundary-2" href="#rootboundary-2">rootBoundary</a><i>?</i>: `RootBoundary`</code>

</dt>

<dd>

Describes the root boundary that the element will be checked for overflow relative to.
Please see https://floating-ui.com/docs/detectoverflow#rootboundary for more information.

###### Default

```ts
'viewport'
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="sameheight-2" href="#sameheight-2">sameHeight</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's height so that it matches the
reference element.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="samewidth-2" href="#samewidth-2">sameWidth</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to constrain the floating element's width so that it matches the
reference element.

###### Default

```ts
false
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="shift-2" href="#shift-2">shift</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the floating element should shift to keep it in view.

###### Default

```ts
true
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="strategy-2" href="#strategy-2">strategy</a><i>?</i>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

```ts
"absolute"
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="transform-2" href="#transform-2">transform</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

###### Default

```ts
false
```

</dd>

</dl>

***

### TableHandleRowTriggerProps {#tablehandlerowtriggerprops}

Props for the [TableHandleRowTrigger](#tablehandlerowtrigger) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`TableHandleRowTriggerProps`](../web/table-handle.md#tablehandlerowtriggerprops), [`TableHandleRowTriggerEvents`](../web/table-handle.md#tablehandlerowtriggerevents)\>\>

#### Properties

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="editor-2" href="#editor-2">editor</a><i>?</i>: `null` \| [`Editor`](../core.md#editor)\<`TableCommandsExtension`\></code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-declaration><i></i> <a id="onselect-1" href="#onselect-1">onSelect</a><i>?</i>: (`event`: [`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<`void`\>) => `void`</code>

</dt>

</dl>

## Variables

### TableHandleColumnRoot {#tablehandlecolumnroot}

<dl>

<dt>

<code data-typedoc-declaration><i>const</i> <a id="tablehandlecolumnroot" href="#tablehandlecolumnroot">TableHandleColumnRoot</a>: *typeof* `SvelteComponent`</code>

</dt>

</dl>

***

### TableHandleColumnTrigger {#tablehandlecolumntrigger}

<dl>

<dt>

<code data-typedoc-declaration><i>const</i> <a id="tablehandlecolumntrigger" href="#tablehandlecolumntrigger">TableHandleColumnTrigger</a>: *typeof* `SvelteComponent`</code>

</dt>

</dl>

***

### TableHandlePopoverContent {#tablehandlepopovercontent}

<dl>

<dt>

<code data-typedoc-declaration><i>const</i> <a id="tablehandlepopovercontent" href="#tablehandlepopovercontent">TableHandlePopoverContent</a>: *typeof* `SvelteComponent`</code>

</dt>

</dl>

***

### TableHandlePopoverItem {#tablehandlepopoveritem}

<dl>

<dt>

<code data-typedoc-declaration><i>const</i> <a id="tablehandlepopoveritem" href="#tablehandlepopoveritem">TableHandlePopoverItem</a>: *typeof* `SvelteComponent`</code>

</dt>

</dl>

***

### TableHandleRoot {#tablehandleroot}

<dl>

<dt>

<code data-typedoc-declaration><i>const</i> <a id="tablehandleroot" href="#tablehandleroot">TableHandleRoot</a>: *typeof* `SvelteComponent`</code>

</dt>

</dl>

***

### TableHandleRowRoot {#tablehandlerowroot}

<dl>

<dt>

<code data-typedoc-declaration><i>const</i> <a id="tablehandlerowroot" href="#tablehandlerowroot">TableHandleRowRoot</a>: *typeof* `SvelteComponent`</code>

</dt>

</dl>

***

### TableHandleRowTrigger {#tablehandlerowtrigger}

<dl>

<dt>

<code data-typedoc-declaration><i>const</i> <a id="tablehandlerowtrigger" href="#tablehandlerowtrigger">TableHandleRowTrigger</a>: *typeof* `SvelteComponent`</code>

</dt>

</dl>
