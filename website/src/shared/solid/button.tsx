import {
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from 'prosekit/solid/tooltip'
import type { ParentProps } from 'solid-js'
import { Show } from 'solid-js'

export default function Button({
  pressed,
  disabled,
  onClick,
  tooltip,
  children,
}: ParentProps<{
  pressed: () => boolean
  disabled?: () => boolean
  onClick?: () => void
  tooltip?: string
}>) {
  return (
    <TooltipRoot>
      <TooltipTrigger class="CSS_TOOLTIP_TRIGGER">
        <button
          data-state={pressed() ? 'on' : 'off'}
          disabled={disabled?.()}
          onClick={() => onClick?.()}
          onMouseDown={(event) => event.preventDefault()}
          class="CSS_TOGGLE_BUTTON"
        >
          {children}
          <Show when={tooltip}>
            {(content) => <span class="sr-only">{content}</span>}
          </Show>
        </button>
      </TooltipTrigger>
      <Show when={tooltip}>
        {(content) => (
          <TooltipContent class="CSS_TOOLTIP_CONTENT">
            {content}
          </TooltipContent>
        )}
      </Show>
    </TooltipRoot>
  )
}
