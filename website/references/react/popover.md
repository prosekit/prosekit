# prosekit/react/popover

## PopoverContentProps {#popover-content-props-1}

Props for the [PopoverContent](popover.md#popover-content-2) component.

<dl>

<dt>

`onEscapeKeyDown`

</dt>

<dd>

**Type**: `undefined | ((event: EscapeKeyDownEvent) => void)`

</dd>

<dt>

`onFocusOutside`

</dt>

<dd>

**Type**: `undefined | ((event: FocusOutsideEvent) => void)`

</dd>

<dt>

`onInteractOutside`

</dt>

<dd>

**Type**: `undefined | ((event: InteractOutsideEvent) => void)`

</dd>

<dt>

`onPointerDownOutside`

</dt>

<dd>

**Type**: `undefined | ((event: PointerDownOutsideEvent) => void)`

</dd>

</dl>

## PopoverRootProps {#popover-root-props-1}

Props for the [PopoverRoot](popover.md#popover-root-2) component.

<dl>

<dt>

`onOpenChange`

</dt>

<dd>

**Type**: `undefined | ((event: boolean) => void)`

</dd>

</dl>

## PopoverTriggerProps {#popover-trigger-props-1}

Props for the [PopoverTrigger](popover.md#popover-trigger-2) component.

## PopoverContent {#popover-content-2}

```ts
function PopoverContent(props: PopoverContentProps & RefAttributes<PopoverContent> & HTMLAttributes<PopoverContent>): ReactNode
```

## PopoverRoot {#popover-root-2}

```ts
function PopoverRoot(props: PopoverRootProps & RefAttributes<PopoverRoot> & HTMLAttributes<PopoverRoot>): ReactNode
```

## PopoverTrigger {#popover-trigger-2}

```ts
function PopoverTrigger(props: PopoverTriggerProps & RefAttributes<PopoverTrigger> & HTMLAttributes<PopoverTrigger>): ReactNode
```
