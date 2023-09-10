import { h, defineComponent } from 'vue'

export const ToggleButton = defineComponent({
  props: {
    active: Boolean,
    onChange: Function,
  },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        {
          class: 'TOGGLE_BUTTON',
          'data-state': props.active ? 'on' : 'off',
          onClick: props.onChange,
          onMousedown: (event: MouseEvent) => event.preventDefault(),
        },
        slots.default?.(),
      )
  },
})
