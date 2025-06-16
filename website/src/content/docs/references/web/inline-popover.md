---
title: prosekit/web/inline-popover
sidebar:
  label: web/inline-popover
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Classes

### InlinePopoverElement {#inlinepopoverelement}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `InlinePopoverElementBase`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

<!-- DEBUG memberWithGroups 10 -->

## Interfaces

### InlinePopoverEvents {#inlinepopoverevents}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `OverlayPositionerEvents`

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
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="openchange"></a> `openChange`

</td>
<td>

[`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<`boolean`\>

</td>
<td>

Fired when the open state changes.

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### InlinePopoverProps {#inlinepopoverprops}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- [`Omit`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)\<`OverlayPositionerProps`, 
  \| `"placement"`
  \| `"offset"`
  \| `"hide"`
  \| `"overlap"`
  \| `"inline"`
  \| `"overflowPadding"`\>

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
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="defaultopen"></a> `defaultOpen`

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
</tr>
<tr>
<td>

<a id="dismissonescape"></a> `dismissOnEscape`

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
</tr>
<tr>
<td>

<a id="hide"></a> `hide`

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
</tr>
<tr>
<td>

<a id="inline"></a> `inline`

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
</tr>
<tr>
<td>

<a id="offset"></a> `offset`

</td>
<td>

`undefined` \| `OffsetOptions`

</td>
<td>

**Default**

```ts
12
```

</td>
</tr>
<tr>
<td>

<a id="open"></a> `open`

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
</tr>
<tr>
<td>

<a id="overflowpadding"></a> `overflowPadding`

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
</tr>
<tr>
<td>

<a id="overlap"></a> `overlap`

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
</tr>
<tr>
<td>

<a id="placement"></a> `placement`

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
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

<!-- DEBUG memberWithGroups 10 -->
