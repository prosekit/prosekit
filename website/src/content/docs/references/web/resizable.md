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

<!-- DEBUG inheritance start kind=16384 -->

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

<!-- DEBUG inheritance start kind=16384 -->

###### Inherited from

```ts
ResizableRootElementBase.constructor
```

#### Properties

##### aspectRatio {#aspectratio}

```ts
aspectRatio: null | number;
```

##### height {#height}

```ts
height: null | number;
```

##### width {#width}

```ts
width: null | number;
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

##### position {#position-1}

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

<!-- DEBUG memberWithGroups 10 -->

***

### ResizableRootEvents {#resizablerootevents}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### resizeEnd {#resizeend}

```ts
resizeEnd: CustomEvent<{
  height: number;
  width: number;
}>;
```

##### resizeStart {#resizestart}

```ts
resizeStart: CustomEvent<{
  height: number;
  width: number;
}>;
```

<!-- DEBUG memberWithGroups 10 -->

***

### ResizableRootProps {#resizablerootprops}

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### aspectRatio {#aspectratio-1}

```ts
aspectRatio: null | number;
```

##### height {#height-1}

```ts
height: null | number;
```

##### width {#width-1}

```ts
width: null | number;
```

<!-- DEBUG memberWithGroups 10 -->

<!-- DEBUG memberWithGroups 10 -->
