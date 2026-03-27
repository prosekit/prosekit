import type { ComponentChild, MouseEventHandler } from 'preact'
import { TooltipContent, TooltipRoot, TooltipTrigger } from 'prosekit/preact/tooltip'

export default function Button(props: {
  pressed?: boolean
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  tooltip?: string
  children: ComponentChild
}) {
  return (
    <TooltipRoot>
      <TooltipTrigger className="CSS_TOOLTIP_TRIGGER">
        <button
          data-state={props.pressed ? 'on' : 'off'}
          disabled={props.disabled}
          onClick={props.onClick}
          onMouseDown={(event) => {
            // Prevent the editor from being blurred when the button is clicked
            event.preventDefault()
          }}
          className="CSS_TOGGLE_BUTTON"
        >
          {props.children}
          {props.tooltip ? <span className="sr-only">{props.tooltip}</span> : null}
        </button>
      </TooltipTrigger>
      {props.tooltip
        ? (
          <TooltipContent className="CSS_TOOLTIP_CONTENT">
            {props.tooltip}
          </TooltipContent>
        )
        : null}
    </TooltipRoot>
  )
}
