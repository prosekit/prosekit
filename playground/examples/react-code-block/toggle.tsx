import type { ReactNode } from 'react'

export default function Toggle({
  pressed,
  disabled,
  onClick,
  children,
}: {
  pressed: boolean
  disabled?: boolean
  onClick: VoidFunction
  children: ReactNode
}) {
  return (
    <button
      data-state={pressed ? 'on' : 'off'}
      disabled={disabled}
      onClick={() => onClick()}
      onMouseDown={(event) => event.preventDefault()}
      className="TOGGLE_BUTTON"
    >
      {children}
    </button>
  )
}
