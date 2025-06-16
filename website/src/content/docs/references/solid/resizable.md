---
title: prosekit/solid/resizable
sidebar:
  label: solid/resizable
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Interfaces

### ResizableHandleProps {#resizablehandleprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [ResizableHandle](#resizablehandle) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`ResizableHandleProps`](../web/resizable.md#resizablehandleprops), `Events`\>\>

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

<a id="position"></a> `position?`

</td>
<td>

 \| `"left"` \| `"right"` \| `"top"` \| `"bottom"` \| `"top-left"` \| `"top-right"` \| `"bottom-left"` \| `"bottom-right"`

</td>
<td>

The position of the handle.

**Default**

```ts
"bottom-right"
```

</td>
<td>

```ts
Partial.position
```

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### ResizableRootProps {#resizablerootprops}

<!-- DEBUG memberWithGroups 1 -->

Props for the [ResizableRoot](#resizableroot) component.

#### Extends

- [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<`CreateProps`\<[`ResizableRootProps`](../web/resizable.md#resizablerootprops), [`ResizableRootEvents`](../web/resizable.md#resizablerootevents)\>\>

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
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="aspectratio"></a> `aspectRatio?`

</td>
<td>

`null` \| `number`

</td>
<td>

```ts
Partial.aspectRatio
```

</td>
</tr>
<tr>
<td>

<a id="height"></a> `height?`

</td>
<td>

`null` \| `number`

</td>
<td>

```ts
Partial.height
```

</td>
</tr>
<tr>
<td>

<a id="onresizeend"></a> `onResizeEnd?`

</td>
<td>

(`event`: [`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<\{ `height`: `number`; `width`: `number`; \}\>) => `void`

</td>
<td>

```ts
Partial.onResizeEnd
```

</td>
</tr>
<tr>
<td>

<a id="onresizestart"></a> `onResizeStart?`

</td>
<td>

(`event`: [`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<\{ `height`: `number`; `width`: `number`; \}\>) => `void`

</td>
<td>

```ts
Partial.onResizeStart
```

</td>
</tr>
<tr>
<td>

<a id="width"></a> `width?`

</td>
<td>

`null` \| `number`

</td>
<td>

```ts
Partial.width
```

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

## Variables

### ResizableHandle {#resizablehandle}

```ts
const ResizableHandle: Component<PropsWithElement<ResizableHandleProps, ResizableHandleElement>>;
```

***

### ResizableRoot {#resizableroot}

```ts
const ResizableRoot: Component<PropsWithElement<ResizableRootProps, ResizableRootElement>>;
```

<!-- DEBUG memberWithGroups 10 -->
