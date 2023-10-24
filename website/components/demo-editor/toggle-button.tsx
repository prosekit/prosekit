import { defineComponent } from 'vue'

export const ToggleButton = defineComponent<{
  active?: boolean
  available: boolean
  onChange: VoidFunction
}>((props, { slots }) => {
  return () => (
    <button
      class="TOGGLE_BUTTON"
      disabled={!props.available}
      data-state={props.active ? 'on' : 'off'}
      onClick={() => props.onChange?.()}
      onMousedown={(event: MouseEvent) => event.preventDefault()}
    >
      {slots.default?.()}
    </button>
  )
})
