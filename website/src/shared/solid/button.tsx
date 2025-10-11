import {
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from 'prosekit/solid/tooltip'
import type { ParentProps } from 'solid-js'
import { Show } from 'solid-js'

export default function Button(
  props: ParentProps<{
    pressed: () => boolean
    disabled?: () => boolean
    onClick?: () => void
    tooltip?: string
  }>,
) {
  return (
    <TooltipRoot>
      <TooltipTrigger class="CSS_TOOLTIP_TRIGGER">
        <button
          data-state={props.pressed() ? 'on' : 'off'}
          disabled={props.disabled?.()}
          onClick={() => props.onClick?.()}
          onMouseDown={(event) => event.preventDefault()}
          class="CSS_TOGGLE_BUTTON"
        >
          {props.children}
          <Show when={props.tooltip}>
            <span class="sr-only">{props.tooltip}</span>
          </Show>
        </button>
      </TooltipTrigger>
      <Show when={props.tooltip}>
        <TooltipContent class="CSS_TOOLTIP_CONTENT">
          {props.tooltip}
        </TooltipContent>
      </Show>
    </TooltipRoot>
  )
}
