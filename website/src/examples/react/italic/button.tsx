import {
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from 'prosekit/react/tooltip'
import type { ReactNode } from 'react'

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
  children: ReactNode
}) {
  return (
    <TooltipRoot>
      <TooltipTrigger className="CSS_TOOLTIP_TRIGGER">
        <button
          data-state={pressed ? 'on' : 'off'}
          disabled={disabled}
          onClick={() => onClick?.()}
          onMouseDown={(event) => event.preventDefault()}
          className="CSS_TOGGLE_BUTTON"
        >
          {children}
          {tooltip ? <span className="sr-only">{tooltip}</span> : null}
        </button>
      </TooltipTrigger>
      {tooltip
        ? (
          <TooltipContent className="CSS_TOOLTIP_CONTENT">
            {tooltip}
          </TooltipContent>
        )
        : null}
    </TooltipRoot>
  )
}
