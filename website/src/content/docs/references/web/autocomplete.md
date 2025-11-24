---
title: prosekit/web/autocomplete
sidebar:
  label: web/autocomplete
---

## Classes

### AutocompleteEmptyElement {#autocompleteemptyelement}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor" href="#constructor">AutocompleteEmptyElement</a>(): [`AutocompleteEmptyElement`](#autocompleteemptyelement)</code>

</dt>

</dl>

***

### AutocompleteItemElement {#autocompleteitemelement}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-1" href="#constructor-1">AutocompleteItemElement</a>(): [`AutocompleteItemElement`](#autocompleteitemelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="value" href="#value">value</a>: `string`</code>

</dt>

<dd>

The value of the item, which will be matched against the query.

If not provided, the value is the item's text content.

###### Default

`""`

</dd>

</dl>

***

### AutocompleteListElement {#autocompletelistelement}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-2" href="#constructor-2">AutocompleteListElement</a>(): [`AutocompleteListElement`](#autocompletelistelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="filter" href="#filter">filter</a>: `ItemFilter` \| `null`</code>

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

***

### AutocompletePopoverElement {#autocompletepopoverelement}

#### Constructors

##### Constructor

<dl>

<dt>

<code data-typedoc-code>new <a id="constructor-3" href="#constructor-3">AutocompletePopoverElement</a>(): [`AutocompletePopoverElement`](#autocompletepopoverelement)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="strategy" href="#strategy">strategy</a>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

`"absolute"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="autoupdate" href="#autoupdate">autoUpdate</a>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

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

<code data-typedoc-code><a id="transform" href="#transform">transform</a>: `boolean`</code>

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

<code data-typedoc-code><a id="flip" href="#flip">flip</a>: `boolean` \| `Placement`[]</code>

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

<code data-typedoc-code><a id="shift" href="#shift">shift</a>: `boolean`</code>

</dt>

<dd>

Whether the floating element should shift to keep it in view.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overlap" href="#overlap">overlap</a>: `boolean`</code>

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

<code data-typedoc-code><a id="samewidth" href="#samewidth">sameWidth</a>: `boolean`</code>

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

<code data-typedoc-code><a id="sameheight" href="#sameheight">sameHeight</a>: `boolean`</code>

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

<code data-typedoc-code><a id="hide" href="#hide">hide</a>: `boolean`</code>

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

<code data-typedoc-code><a id="rootboundary" href="#rootboundary">rootBoundary</a>: `RootBoundary`</code>

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

<code data-typedoc-code><a id="elementcontext" href="#elementcontext">elementContext</a>: `ElementContext`</code>

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

<code data-typedoc-code><a id="altboundary" href="#altboundary">altBoundary</a>: `boolean`</code>

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

<code data-typedoc-code><a id="regex" href="#regex">regex</a>: [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp) \| `null`</code>

</dt>

<dd>

The regular expression to match the query text to autocomplete.

###### Default

`null`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="placement" href="#placement">placement</a>: `Placement`</code>

</dt>

<dd>

The placement of the popover, relative to the text cursor.

###### Default

`"bottom-start"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="offset" href="#offset">offset</a>: `OffsetOptions` \| `undefined`</code>

</dt>

<dd>

The distance between the popover and the hovered block.

###### Default

`4`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="inline" href="#inline">inline</a>: `boolean`</code>

</dt>

<dd>

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="hoist" href="#hoist">hoist</a>: `boolean`</code>

</dt>

<dd>

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="fitviewport" href="#fitviewport">fitViewport</a>: `boolean`</code>

</dt>

<dd>

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="boundary" href="#boundary">boundary</a>: `Boundary`</code>

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

<code data-typedoc-code><a id="overflowpadding" href="#overflowpadding">overflowPadding</a>: `number`</code>

</dt>

<dd>

###### Default

`8`

</dd>

</dl>

## Interfaces

### AutocompleteItemProps {#autocompleteitemprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="value-1" href="#value-1">value</a>: `string`</code>

</dt>

<dd>

The value of the item, which will be matched against the query.

If not provided, the value is the item's text content.

###### Default

`""`

</dd>

</dl>

***

### AutocompleteItemEvents {#autocompleteitemevents}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="select" href="#select">select</a>: [`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<`void`\></code>

</dt>

<dd>

Fired when the item is selected.

</dd>

</dl>

***

### AutocompleteListProps {#autocompletelistprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="filter-1" href="#filter-1">filter</a>: `ItemFilter` \| `null`</code>

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

***

### AutocompleteListEvents {#autocompletelistevents}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="valuechange" href="#valuechange">valueChange</a>: [`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<`string`\></code>

</dt>

</dl>

***

### AutocompletePopoverProps {#autocompletepopoverprops}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="strategy-1" href="#strategy-1">strategy</a>: `"fixed"` \| `"absolute"`</code>

</dt>

<dd>

The strategy to use for positioning

###### Default

`"absolute"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="autoupdate-1" href="#autoupdate-1">autoUpdate</a>: `boolean` \| [`AutoUpdateOptions`](https://floating-ui.com/docs/autoUpdate#options)</code>

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

<code data-typedoc-code><a id="transform-1" href="#transform-1">transform</a>: `boolean`</code>

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

<code data-typedoc-code><a id="flip-1" href="#flip-1">flip</a>: `boolean` \| `Placement`[]</code>

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

<code data-typedoc-code><a id="shift-1" href="#shift-1">shift</a>: `boolean`</code>

</dt>

<dd>

Whether the floating element should shift to keep it in view.

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="overlap-1" href="#overlap-1">overlap</a>: `boolean`</code>

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

<code data-typedoc-code><a id="samewidth-1" href="#samewidth-1">sameWidth</a>: `boolean`</code>

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

<code data-typedoc-code><a id="sameheight-1" href="#sameheight-1">sameHeight</a>: `boolean`</code>

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

<code data-typedoc-code><a id="hide-1" href="#hide-1">hide</a>: `boolean`</code>

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

<code data-typedoc-code><a id="rootboundary-1" href="#rootboundary-1">rootBoundary</a>: `RootBoundary`</code>

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

<code data-typedoc-code><a id="elementcontext-1" href="#elementcontext-1">elementContext</a>: `ElementContext`</code>

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

<code data-typedoc-code><a id="altboundary-1" href="#altboundary-1">altBoundary</a>: `boolean`</code>

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

<code data-typedoc-code><a id="regex-1" href="#regex-1">regex</a>: [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp) \| `null`</code>

</dt>

<dd>

The regular expression to match the query text to autocomplete.

###### Default

`null`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="placement-1" href="#placement-1">placement</a>: `Placement`</code>

</dt>

<dd>

The placement of the popover, relative to the text cursor.

###### Default

`"bottom-start"`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="offset-1" href="#offset-1">offset</a>: `OffsetOptions` \| `undefined`</code>

</dt>

<dd>

The distance between the popover and the hovered block.

###### Default

`4`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="inline-1" href="#inline-1">inline</a>: `boolean`</code>

</dt>

<dd>

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="hoist-1" href="#hoist-1">hoist</a>: `boolean`</code>

</dt>

<dd>

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="fitviewport-1" href="#fitviewport-1">fitViewport</a>: `boolean`</code>

</dt>

<dd>

###### Default

`true`

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="boundary-1" href="#boundary-1">boundary</a>: `Boundary`</code>

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

<code data-typedoc-code><a id="overflowpadding-1" href="#overflowpadding-1">overflowPadding</a>: `number`</code>

</dt>

<dd>

###### Default

`8`

</dd>

</dl>

***

### AutocompletePopoverEvents {#autocompletepopoverevents}

#### Properties

<dl>

<dt>

<code data-typedoc-code><a id="openchange" href="#openchange">openChange</a>: [`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<`boolean`\></code>

</dt>

<dd>

Fired when the open state changes.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><a id="querychange" href="#querychange">queryChange</a>: [`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<`string`\></code>

</dt>

<dd>

Fired when the query changes.

</dd>

</dl>

## Variables

### autocompleteListProps {#autocompletelistprops-1}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="autocompletelistprops-1" href="#autocompletelistprops-1">autocompleteListProps</a>: `PropDeclarations`\<[`AutocompleteListProps`](#autocompletelistprops)\></code>

</dt>

</dl>

***

### autocompleteListEvents {#autocompletelistevents-1}

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="autocompletelistevents-1" href="#autocompletelistevents-1">autocompleteListEvents</a>: `EventDeclarations`\<[`AutocompleteListEvents`](#autocompletelistevents)\></code>

</dt>

</dl>
