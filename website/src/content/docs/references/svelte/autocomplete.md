---
title: prosekit/svelte/autocomplete
sidebar:
  label: svelte/autocomplete
---


## AutocompleteEmptyProps {#autocomplete-empty-props-3}

Props for the [AutocompleteEmpty](autocomplete.md#autocomplete-empty-3) component.

## AutocompleteItemProps {#autocomplete-item-props-3}

Props for the [AutocompleteItem](autocomplete.md#autocomplete-item-3) component.

<dl>

<dt>

`onSelect?: (event: CustomEvent<void>) => void`

</dt>

<dd>

</dd>

<dt>

`value?: string`

</dt>

<dd>

The value of the item, which will be matched against the query.

If not provided, the value is the item's text content.

**Default**: `""`

</dd>

</dl>

## AutocompleteListProps {#autocomplete-list-props-3}

Props for the [AutocompleteList](autocomplete.md#autocomplete-list-3) component.

<dl>

<dt>

`filter?: null | ItemFilter`

</dt>

<dd>

The filter function to determine if an item should be shown in the listbox.
By default, a simple case-insensitive substring match is used. You can
provide a custom filter function to match against a more complex pattern.
You can also pass `null` to disable filtering and allow all items to be
shown.

**Default**: `defaultItemFilter`

</dd>

<dt>

`onValueChange?: (event: string) => void`

</dt>

<dd>

</dd>

</dl>

## AutocompletePopoverProps {#autocomplete-popover-props-3}

Props for the [AutocompletePopover](autocomplete.md#autocomplete-popover-3) component.

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

**Default**: `"The body element"`

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

**Default**: `true`

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

**Default**: `true`

</dd>

<dt>

`inline?: boolean`

</dt>

<dd>

**Default**: `true`

</dd>

<dt>

`offset?: OffsetOptions`

</dt>

<dd>

The distance between the popover and the hovered block.

**Default**: `4`

</dd>

<dt>

`onOpenChange?: (event: boolean) => void`

</dt>

<dd>

</dd>

<dt>

`onQueryChange?: (event: string) => void`

</dt>

<dd>

</dd>

<dt>

`overflowPadding?: number`

</dt>

<dd>

**Default**: `8`

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

The placement of the popover, relative to the text cursor.

**Default**: `"bottom-start"`

</dd>

<dt>

`regex?: null | RegExp`

</dt>

<dd>

The regular expression to match the query text to autocomplete.

**Default**: `null`

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

## AutocompleteEmpty {#autocomplete-empty-3}

**Type**: `typeof SvelteComponent`

## AutocompleteItem {#autocomplete-item-3}

**Type**: `typeof SvelteComponent`

## AutocompleteList {#autocomplete-list-3}

**Type**: `typeof SvelteComponent`

## AutocompletePopover {#autocomplete-popover-3}

**Type**: `typeof SvelteComponent`
