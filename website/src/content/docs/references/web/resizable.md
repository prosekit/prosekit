---
title: prosekit/web/resizable
sidebar:
  label: web/resizable
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Classes

### ResizableHandleElement {#resizablehandleelement}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `ResizableHandleElementBase`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new ResizableHandleElement(): ResizableHandleElement;
```

###### Returns

[`ResizableHandleElement`](#resizablehandleelement)

###### Inherited from

```ts
ResizableHandleElementBase.constructor
```

#### Properties

##### position {#position}

```ts
position: 
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
ResizableHandleElementBase.position
```

<!-- DEBUG memberWithGroups 10 -->

***

### ResizableRootElement {#resizablerootelement}

<!-- DEBUG memberWithGroups 1 -->

#### Extends

- `ResizableRootElementBase`

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Constructors

##### Constructor

```ts
new ResizableRootElement(): ResizableRootElement;
```

###### Returns

[`ResizableRootElement`](#resizablerootelement)

###### Inherited from

```ts
ResizableRootElementBase.constructor
```

#### Properties

##### aspectRatio {#aspectratio}

```ts
aspectRatio: null | number;
```

###### Inherited from

```ts
ResizableRootElementBase.aspectRatio
```

##### height {#height}

```ts
height: null | number;
```

###### Inherited from

```ts
ResizableRootElementBase.height
```

##### width {#width}

```ts
width: null | number;
```

###### Inherited from

```ts
ResizableRootElementBase.width
```

<!-- DEBUG memberWithGroups 10 -->

## Interfaces

### ResizableHandleProps {#resizablehandleprops}

<!-- DEBUG memberWithGroups 1 -->

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

<a id="position-1"></a> `position`

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
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### ResizableRootEvents {#resizablerootevents}

<!-- DEBUG memberWithGroups 1 -->

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
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="resizeend"></a> `resizeEnd`

</td>
<td>

[`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<\{ `height`: `number`; `width`: `number`; \}\>

</td>
</tr>
<tr>
<td>

<a id="resizestart"></a> `resizeStart`

</td>
<td>

[`CustomEvent`](https://developer.mozilla.org/docs/Web/API/CustomEvent)\<\{ `height`: `number`; `width`: `number`; \}\>

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

***

### ResizableRootProps {#resizablerootprops}

<!-- DEBUG memberWithGroups 1 -->

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
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="aspectratio-1"></a> `aspectRatio`

</td>
<td>

`null` \| `number`

</td>
</tr>
<tr>
<td>

<a id="height-1"></a> `height`

</td>
<td>

`null` \| `number`

</td>
</tr>
<tr>
<td>

<a id="width-1"></a> `width`

</td>
<td>

`null` \| `number`

</td>
</tr>
</tbody>
</table>

<!-- DEBUG memberWithGroups 10 -->

<!-- DEBUG memberWithGroups 10 -->
