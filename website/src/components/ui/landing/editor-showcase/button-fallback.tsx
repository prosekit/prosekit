/** @jsxImportSource react */

// Keep the same structure as registry/src/react/ui/button/button.tsx

import type {
  FC,
  ReactNode,
} from 'react'

export const ButtonFallback: FC<{
  pressed?: boolean
  disabled?: boolean
  children?: ReactNode
}> = ({ pressed = false, disabled = false, children }) => {
  return (
    <button
      data-state={pressed ? 'on' : 'off'}
      disabled={disabled}
      className="CSS_TOGGLE_BUTTON"
    >
      {children}
    </button>
  )
}
