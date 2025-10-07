import type { ComponentChild } from 'preact'

export default function Button({
  pressed,
  disabled,
  onClick,
  tooltip,
  children,
}: {
  pressed?: boolean
  disabled?: boolean
  onClick?: VoidFunction
  tooltip?: string
  children: ComponentChild
}) {
  return (
    <button
      data-state={pressed ? 'on' : 'off'}
      disabled={disabled}
      onClick={() => onClick?.()}
      onMouseDown={(event) => event.preventDefault()}
      class="CSS_TOGGLE_BUTTON"
      title={tooltip}
    >
      {children}
      {tooltip ? <span class="sr-only">{tooltip}</span> : null}
    </button>
  )
}
