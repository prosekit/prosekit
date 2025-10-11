import type { ComponentChild } from 'preact'
import {
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from 'prosekit/preact/tooltip'

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
