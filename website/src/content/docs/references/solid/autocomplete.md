---
title: prosekit/solid/autocomplete
sidebar:
  label: solid/autocomplete
---

## Interfaces

### AutocompleteEmptyProps {#autocompleteemptyprops}

Props for the [AutocompleteEmpty](#autocompleteempty) component.

***

### AutocompleteItemProps {#autocompleteitemprops}

Props for the [AutocompleteItem](#autocompleteitem) component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="value" href="#value">value</a><i>?</i>: `string`</code>

</dt>

<dd>

The value of the item, which will be matched against the query.

If not provided, the value is the item's text content.

###### Default

`""`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="onselect" href="#onselect">onSelect</a><i>?</i>: (`event`: [`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<`void`\>) => `void`</code>

</dt>

</dl>

***

### AutocompleteListProps {#autocompletelistprops}

Props for the [AutocompleteList](#autocompletelist) component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="filter" href="#filter">filter</a><i>?</i>: `null` \| `ItemFilter`</code>

</dt>

<dd>

The filter function to determine if an item should be shown in the listbox.
By default, a simple case-insensitive substring match is used. You can
provide a custom filter function to match against a more complex pattern.
You can also pass `null` to disable filtering and allow all items to be
shown.

###### Default

`defaultItemFilter`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="onvaluechange" href="#onvaluechange">onValueChange</a><i>?</i>: (`event`: `string`) => `void`</code>

</dt>

</dl>

***

### AutocompletePopoverProps {#autocompletepopoverprops}

Props for the [AutocompletePopover](#autocompletepopover) component.

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="strategy" href="#strategy">strategy</a><i>?</i>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

`"absolute"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="autoupdate" href="#autoupdate">autoUpdate</a><i>?</i>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

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

<code data-typedoc-code><a id="transform" href="#transform">transform</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to use CSS transforms to position the floating element instead of
layout (`top` and `left` CSS properties). CSS transforms are more
performant, but can cause conflicts with transform animations.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="flip" href="#flip">flip</a><i>?</i>: `boolean` \| `Placement`[]</code>

</dt>

<dd>

Whether to flip the `placement` in order to keep it in view when the
preferred placement(s) will overflow the clipping boundary. You can also
provide an array of placements to try sequentially if the preferred
`placement` does not fit.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="shift" href="#shift">shift</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether the floating element should shift to keep it in view.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overlap" href="#overlap">overlap</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="samewidth" href="#samewidth">sameWidth</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="sameheight" href="#sameheight">sameHeight</a><i>?</i>: `boolean`</code>

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

<code data-typedoc-code><a id="hide" href="#hide">hide</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to hide the floating element when the reference element or the
floating element is fully clipped.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="rootboundary" href="#rootboundary">rootBoundary</a><i>?</i>: `RootBoundary`</code>

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

<code data-typedoc-code><a id="elementcontext" href="#elementcontext">elementContext</a><i>?</i>: `ElementContext`</code>

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

<code data-typedoc-code><a id="altboundary" href="#altboundary">altBoundary</a><i>?</i>: `boolean`</code>

</dt>

<dd>

Whether to check the alternate elementContext’s boundary. Please see
https://floating-ui.com/docs/detectoverflow#altboundary for more
information.

###### Default

`false`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="regex" href="#regex">regex</a><i>?</i>: `null` \| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)</code>

</dt>

<dd>

The regular expression to match the query text to autocomplete.

###### Default

`null`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="placement" href="#placement">placement</a><i>?</i>: `Placement`</code>

</dt>

<dd>

The placement of the popover, relative to the text cursor.

###### Default

`"bottom-start"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="offset" href="#offset">offset</a><i>?</i>: `OffsetOptions`</code>

</dt>

<dd>

The distance between the popover and the hovered block.

###### Default

`4`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="inline" href="#inline">inline</a><i>?</i>: `boolean`</code>

</dt>

<dd>

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="hoist" href="#hoist">hoist</a><i>?</i>: `boolean`</code>

</dt>

<dd>

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="fitviewport" href="#fitviewport">fitViewport</a><i>?</i>: `boolean`</code>

</dt>

<dd>

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="boundary" href="#boundary">boundary</a><i>?</i>: `Boundary`</code>

</dt>

<dd>

###### Default

```ts
"The body element"
```

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overflowpadding" href="#overflowpadding">overflowPadding</a><i>?</i>: `number`</code>

</dt>

<dd>

###### Default

`8`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="onopenchange" href="#onopenchange">onOpenChange</a><i>?</i>: (`event`: `boolean`) => `void`</code>

</dt>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="onquerychange" href="#onquerychange">onQueryChange</a><i>?</i>: (`event`: `string`) => `void`</code>

</dt>

</dl>

## Variables

### AutocompleteEmpty {#autocompleteempty}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="autocompleteempty" href="#autocompleteempty">AutocompleteEmpty</a>: `Component`\<`PropsWithElement`\<[`AutocompleteEmptyProps`](#autocompleteemptyprops), [`AutocompleteEmptyElement`](../web/autocomplete.md#autocompleteemptyelement)\>\></code>

</dt>

</dl>

***

### AutocompleteItem {#autocompleteitem}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="autocompleteitem" href="#autocompleteitem">AutocompleteItem</a>: `Component`\<`PropsWithElement`\<[`AutocompleteItemProps`](#autocompleteitemprops), [`AutocompleteItemElement`](../web/autocomplete.md#autocompleteitemelement)\>\></code>

</dt>

</dl>

***

### AutocompleteList {#autocompletelist}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="autocompletelist" href="#autocompletelist">AutocompleteList</a>: `Component`\<`PropsWithElement`\<[`AutocompleteListProps`](#autocompletelistprops), [`AutocompleteListElement`](../web/autocomplete.md#autocompletelistelement)\>\></code>

</dt>

</dl>

***

### AutocompletePopover {#autocompletepopover}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="autocompletepopover" href="#autocompletepopover">AutocompletePopover</a>: `Component`\<`PropsWithElement`\<[`AutocompletePopoverProps`](#autocompletepopoverprops), [`AutocompletePopoverElement`](../web/autocomplete.md#autocompletepopoverelement)\>\></code>

</dt>

</dl>
