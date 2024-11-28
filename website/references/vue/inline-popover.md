# prosekit/vue/inline-popover

## InlinePopoverEmits {#inline-popover-emits}

Emits for the [InlinePopover](inline-popover.md#inline-popover-5) component.

<dl>

<dt>

`openChange`

</dt>

<dd>

Fired when the open state changes.

**Type**: `(event: boolean) => void`

</dd>

</dl>

## InlinePopoverProps {#inline-popover-props-4}

Props for the [InlinePopover](inline-popover.md#inline-popover-5) component.

<dl>

<dt>

`defaultOpen`

</dt>

<dd>

Whether the popover is open by default when some inline content is
selected.

When `defaultOpen` is true, the popover will open or close based on the
inline selection. When `defaultOpen` is false, the popover will never be
opened unless the `open` prop is true.

**Type**: `boolean`

**Default**: `true`

</dd>

<dt>

`dismissOnEscape`

</dt>

<dd>

Whether the inline popover should be dismissed when the editor receives an
Escape key press.

**Type**: `boolean`

**Default**: `true`

</dd>

<dt>

`hide`

</dt>

<dd>

**Type**: `boolean`

**Default**: `true`

</dd>

<dt>

`inline`

</dt>

<dd>

**Type**: `boolean`

**Default**: `true`

</dd>

<dt>

`offset`

</dt>

<dd>

**Type**: `OffsetOptions`

**Default**: `12`

</dd>

<dt>

`open`

</dt>

<dd>

Whether the popover is open.

Notice that the popover will be always hidden if the inline selection is
empty.

**Type**: `boolean`

**Default**: `false`

</dd>

<dt>

`overflowPadding`

</dt>

<dd>

**Type**: `number`

**Default**: `8`

</dd>

<dt>

`overlap`

</dt>

<dd>

**Type**: `boolean`

**Default**: `true`

</dd>

<dt>

`placement`

</dt>

<dd>

**Type**: `Placement`

**Default**: `"top"`

</dd>

</dl>

## InlinePopover {#inline-popover-5}

**Type**: `DefineSetupFnComponent<InlinePopoverProps & HTMLAttributes, InlinePopoverEmits>`
