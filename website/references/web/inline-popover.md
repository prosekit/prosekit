# prosekit/web/inline-popover

## InlinePopoverEvents {#inline-popover-events}

<dl>

<dt>

`openChange`

</dt>

<dd>

Fired when the open state changes.

**Type**: `CustomEvent<boolean>`

</dd>

</dl>

## InlinePopoverProps {#inline-popover-props-5}

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

**Type**: `undefined | OffsetOptions`

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

## InlinePopoverElement {#inline-popover-element}

<!-- Declaration kind 4194304 is not implemented (name: InlinePopoverElement) -->
