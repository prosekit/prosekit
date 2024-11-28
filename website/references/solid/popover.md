# prosekit/solid/popover

## PopoverContentProps {#popover-content-props-2}

Props for the [PopoverContent](popover.md#popover-content-3) component.

<dl>

<dt>

`onEscapeKeyDown`

</dt>

<dd>

**Type**: `(event: EscapeKeyDownEvent) => void`

</dd>

<dt>

`onFocusOutside`

</dt>

<dd>

**Type**: `(event: FocusOutsideEvent) => void`

</dd>

<dt>

`onInteractOutside`

</dt>

<dd>

**Type**: `(event: InteractOutsideEvent) => void`

</dd>

<dt>

`onPointerDownOutside`

</dt>

<dd>

**Type**: `(event: PointerDownOutsideEvent) => void`

</dd>

</dl>

## PopoverRootProps {#popover-root-props-2}

Props for the [PopoverRoot](popover.md#popover-root-3) component.

<dl>

<dt>

`onOpenChange`

</dt>

<dd>

**Type**: `(event: boolean) => void`

</dd>

</dl>

## PopoverTriggerProps {#popover-trigger-props-2}

Props for the [PopoverTrigger](popover.md#popover-trigger-3) component.

## PopoverContent {#popover-content-3}

```ts
function PopoverContent(props: Partial<PopoverContentProps> & HTMLAttributes<PopoverContent>): Element
```

## PopoverRoot {#popover-root-3}

```ts
function PopoverRoot(props: Partial<PopoverRootProps> & HTMLAttributes<PopoverRoot>): Element
```

## PopoverTrigger {#popover-trigger-3}

```ts
function PopoverTrigger(props: Partial<PopoverTriggerProps> & HTMLAttributes<PopoverTrigger>): Element
```
