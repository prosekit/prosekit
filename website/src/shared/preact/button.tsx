import type { ComponentChild } from 'preact'

export default function Button({
  pressed,
  disabled,
  onClick,
  children,
}: {
  pressed?: boolean
  disabled?: boolean
  onClick: VoidFunction
  children: ComponentChild
}) {
  return (
    <button
      data-state={pressed ? 'on' : 'off'}
      disabled={disabled}
      onClick={() => onClick()}
      onMouseDown={(event) => event.preventDefault()}
      class="CSS_TOGGLE_BUTTON"
    >
      {children}
    </button>
  )
}
