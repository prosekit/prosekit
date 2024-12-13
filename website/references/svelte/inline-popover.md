# prosekit/svelte/inline-popover

## InlinePopoverProps {#inline-popover-props-3}

Props for the [InlinePopover](inline-popover.md#inline-popover-4) component.

<dl>

<dt>

`defaultOpen?: boolean`

</dt>

<dd>

Whether the popover is open by default when some inline content is
selected.

When `defaultOpen` is true, the popover will open or close based on the
inline selection. When `defaultOpen` is false, the popover will never be
opened unless the `open` prop is true.

**Default**: `true`

</dd>

<dt>

`dismissOnEscape?: boolean`

</dt>

<dd>

Whether the inline popover should be dismissed when the editor receives an
Escape key press.

**Default**: `true`

</dd>

<dt>

`hide?: boolean`

</dt>

<dd>

**Default**: `true`

</dd>

<dt>

`inline?: boolean`

</dt>

<dd>

**Default**: `true`

</dd>

<dt>

`offset?: OffsetOptions`

</dt>

<dd>

**Default**: `12`

</dd>

<dt>

`onOpenChange?: (event: boolean) => void`

</dt>

<dd>

</dd>

<dt>

`open?: boolean`

</dt>

<dd>

Whether the popover is open.

Notice that the popover will be always hidden if the inline selection is
empty.

**Default**: `false`

</dd>

<dt>

`overflowPadding?: number`

</dt>

<dd>

**Default**: `8`

</dd>

<dt>

`overlap?: boolean`

</dt>

<dd>

**Default**: `true`

</dd>

<dt>

`placement?: Placement`

</dt>

<dd>

**Default**: `"top"`

</dd>

</dl>

## InlinePopover {#inline-popover-4}

**Type**: `typeof SvelteComponent`
