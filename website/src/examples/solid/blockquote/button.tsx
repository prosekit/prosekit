import type { ParentProps } from 'solid-js'
import { Show } from 'solid-js'

export default function Button({
  pressed,
  disabled,
  onClick,
  tooltip,
  children,
}: ParentProps<{
  pressed: () => boolean
  disabled?: () => boolean
  onClick: () => void
  tooltip?: string
}>) {
  return (
    <button
      data-state={pressed() ? 'on' : 'off'}
      disabled={disabled?.()}
      onClick={() => onClick()}
      onMouseDown={(event) => event.preventDefault()}
      class="CSS_TOGGLE_BUTTON"
      title={tooltip}
    >
      {children}
      <Show when={tooltip}>
        <span class="sr-only">{tooltip}</span>
      </Show>
    </button>
  )
}
