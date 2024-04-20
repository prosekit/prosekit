import {
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from 'prosekit/react/tooltip'
import type { ReactNode } from 'react'

export default function Toggle({
  pressed,
  disabled,
  onClick,
  tooltip,
  children,
}: {
  pressed: boolean
  disabled?: boolean
  onClick?: VoidFunction
  tooltip?: string
  children: ReactNode
}) {
  return (
    <TooltipRoot>
      <TooltipTrigger className="TOOLTIP_TRIGGER">
        <button
          data-state={pressed ? 'on' : 'off'}
          disabled={disabled}
          onClick={() => onClick?.()}
          onMouseDown={(event) => event.preventDefault()}
          className="TOGGLE_BUTTON"
        >
          {children}
        </button>
      </TooltipTrigger>
      {tooltip && !disabled ? (
        <TooltipContent offset={4} className="TOOLTIP_CONTENT">
          {tooltip}
        </TooltipContent>
      ) : null}
    </TooltipRoot>
  )
}
