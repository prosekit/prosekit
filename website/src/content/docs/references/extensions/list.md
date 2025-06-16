---
title: prosekit/extensions/list
sidebar:
  label: extensions/list
---

<!-- DEBUG memberWithGroups 1 -->

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

## Interfaces

### ListAttrs {#listattrs}

<!-- DEBUG memberWithGroups 1 -->

The attributes of a list node.

<!-- DEBUG memberWithGroups 4 -->

<!-- DEBUG memberWithGroups 7 -->

<!-- DEBUG memberWithGroups 8 -->

<!-- DEBUG memberWithGroups 9 -->

#### Properties

##### checked? {#checked}

```ts
optional checked: boolean;
```

Whether the list node is checked if its `kind` is `"task"`.

<!-- DEBUG inheritance start kind=1024 -->

##### collapsed? {#collapsed}

```ts
optional collapsed: boolean;
```

Whether the list node is collapsed if its `kind` is `"toggle"`.

<!-- DEBUG inheritance start kind=1024 -->

##### kind? {#kind}

```ts
optional kind: "toggle" | "bullet" | "ordered" | "task";
```

The kind of list node.

<!-- DEBUG inheritance start kind=1024 -->

##### order? {#order}

```ts
optional order: null | number;
```

The optional order of the list node.

<!-- DEBUG inheritance start kind=1024 -->

<!-- DEBUG memberWithGroups 10 -->

## Functions

### defineList() {#definelist}

```ts
function defineList(): ListExtension;
```

#### Returns

`ListExtension`

<!-- DEBUG inheritance start kind=4096 -->

<!-- DEBUG memberWithGroups 10 -->
