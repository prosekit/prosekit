---
title: prosekit/svelte/resizable
sidebar:
  label: svelte/resizable
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

##### position? {#position}

```ts
optional position: 
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";
```

The position of the handle.

###### Default

```ts
"bottom-right"
```

###### Inherited from

```ts
Partial.position
```

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

##### aspectRatio? {#aspectratio}

```ts
optional aspectRatio: null | number;
```

###### Inherited from

```ts
Partial.aspectRatio
```

##### height? {#height}

```ts
optional height: null | number;
```

###### Inherited from

```ts
Partial.height
```

##### onResizeEnd()? {#onresizeend}

```ts
optional onResizeEnd: (event: CustomEvent<{
  height: number;
  width: number;
}>) => void;
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

[`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<\{ `height`: `number`; `width`: `number`; \}\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
Partial.onResizeEnd
```

##### onResizeStart()? {#onresizestart}

```ts
optional onResizeStart: (event: CustomEvent<{
  height: number;
  width: number;
}>) => void;
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

[`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<\{ `height`: `number`; `width`: `number`; \}\>

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

###### Inherited from

```ts
Partial.onResizeStart
```

##### width? {#width}

```ts
optional width: null | number;
```

###### Inherited from

```ts
Partial.width
```

<!-- DEBUG memberWithGroups 10 -->

## Variables

### ResizableHandle {#resizablehandle}

```ts
const ResizableHandle: typeof SvelteComponent;
```

***

### ResizableRoot {#resizableroot}

```ts
const ResizableRoot: typeof SvelteComponent;
```

<!-- DEBUG memberWithGroups 10 -->
