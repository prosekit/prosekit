---
title: prosekit/react/resizable
sidebar:
  label: react/resizable
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

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Partial.aspectRatio
```

##### height? {#height}

```ts
optional height: null | number;
```

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

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

<!-- DEBUG inheritance start -->

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Partial.onResizeStart
```

##### width? {#width}

```ts
optional width: null | number;
```

<!-- DEBUG inheritance start -->

###### Inherited from

```ts
Partial.width
```

<!-- DEBUG memberWithGroups 10 -->

## Variables

### ResizableHandle {#resizablehandle}

```ts
const ResizableHandle: ForwardRefExoticComponent<ResizableHandleProps & RefAttributes<ResizableHandleElement> & HTMLAttributes<ResizableHandleElement>>;
```

<!-- DEBUG inheritance start -->

***

### ResizableRoot {#resizableroot}

```ts
const ResizableRoot: ForwardRefExoticComponent<ResizableRootProps & RefAttributes<ResizableRootElement> & HTMLAttributes<ResizableRootElement>>;
```

<!-- DEBUG inheritance start -->

<!-- DEBUG memberWithGroups 10 -->
