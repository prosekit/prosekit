import { defineComponent } from 'vue'

export const ToggleButton = defineComponent({
  name: 'ToggleButton',
  props: {
    active: Boolean,
    available: Boolean,
    onChange: Function,
  },
  setup(props, { slots }) {
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
  },
})
