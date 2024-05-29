import { Themes } from '@prosekit/themes'
import type { ParentProps } from 'solid-js'

export default function Button({
  pressed,
  disabled,
  onClick,
  children,
}: ParentProps<{
  pressed: () => boolean
  disabled?: () => boolean
  onClick: () => void
}>) {
  return (
    <button
      data-state={pressed() ? 'on' : 'off'}
      disabled={disabled?.()}
      onClick={() => onClick()}
      onMouseDown={(event) => event.preventDefault()}
      class={Themes.TOGGLE_BUTTON}
    >
      {children}
    </button>
  )
}
