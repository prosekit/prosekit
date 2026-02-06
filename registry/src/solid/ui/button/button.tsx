import { TooltipContent, TooltipRoot, TooltipTrigger } from 'prosekit/solid/tooltip'
import type { JSX } from 'solid-js'

export default function Button(props: {
  pressed?: boolean
  disabled?: boolean
  onClick?: () => void
  tooltip?: string
  children: JSX.Element
}): JSX.Element {
  return (
    <TooltipRoot>
      <TooltipTrigger class="CSS_TOOLTIP_TRIGGER">
        <button
          data-state={props.pressed ? 'on' : 'off'}
          disabled={props.disabled}
          onClick={props.onClick}
          onMouseDown={(event) => {
            // Prevent the editor from being blurred when the button is clicked
            event.preventDefault()
          }}
          class="CSS_TOGGLE_BUTTON"
        >
          {props.children}
          {props.tooltip ? <span class="sr-only">{props.tooltip}</span> : null}
        </button>
      </TooltipTrigger>
      {props.tooltip
        ? (
          <TooltipContent class="CSS_TOOLTIP_CONTENT">
            {props.tooltip}
          </TooltipContent>
        )
        : null}
    </TooltipRoot>
  )
}
