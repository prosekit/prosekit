import type { ElementType, HTMLAttributes, ReactNode } from 'react'

export default function Toggle({
  as,
  pressed,
  disabled,
  onClick,
  children,
}: {
  as?: ElementType<HTMLAttributes<HTMLElement>>
  pressed: boolean
  disabled?: boolean
  onClick?: VoidFunction
  children: ReactNode
}) {
  const Component = as ?? 'button'
  return (
    <Component
      data-state={pressed ? 'on' : 'off'}
      disabled={disabled}
      onClick={() => onClick?.()}
      onMouseDown={(event) => event.preventDefault()}
      className="TOGGLE_BUTTON"
    >
      {children}
    </Component>
  )
}
