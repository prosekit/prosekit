import { Themes } from '@prosekit/themes'
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
      {tooltip ? (
        <TooltipContent className={Themes.TOOLTIP_CONTENT}>
          {tooltip}
        </TooltipContent>
      ) : null}
    </TooltipRoot>
  )
}
