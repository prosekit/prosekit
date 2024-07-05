import { Themes } from '@prosekit/themes'
import {
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from 'prosekit/react/tooltip'
import { useState, type ReactNode } from 'react'

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
  const [tooltipOpen, setTooltipOpen] = useState(false)

  return (
    <TooltipRoot open={tooltipOpen} onOpenChange={setTooltipOpen}>
      <TooltipTrigger className={Themes.TOOLTIP_TRIGGER}>
        <button
          data-state={pressed ? 'on' : 'off'}
          disabled={disabled}
          onClick={() => onClick?.()}
          onMouseDown={(event) => event.preventDefault()}
          className={Themes.TOGGLE_BUTTON}
        >
          {children}
          {tooltip ? <span className="sr-only">{tooltip}</span> : null}
        </button>
      </TooltipTrigger>
      {tooltip && !disabled && tooltipOpen ? (
        <TooltipContent className={Themes.TOOLTIP_CONTENT}>
          {tooltip}
        </TooltipContent>
      ) : null}
    </TooltipRoot>
  )
}
