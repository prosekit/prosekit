import { SwitchRoot, SwitchThumb } from 'radix-vue'
import { defineComponent } from 'vue'

export const Switch = defineComponent<{
  checked: boolean
  onChange: (value: boolean) => void
}>(
  (props, { slots }) => {
    return () => (
      <div class="flex items-center gap-2 p-2">
        <SwitchRoot
          id="code"
          checked={props.checked}
          onUpdate:checked={props.onChange}
          class="border-box peer inline-flex h-[22px] w-[40px] shrink-0 cursor-pointer items-center rounded-full border-2 border-solid border-transparent transition-colors data-[state=checked]:bg-[--vp-c-neutral] data-[state=unchecked]:bg-[--vp-c-gray-1]"
        >
          <SwitchThumb class="pointer-events-none block h-[18px] w-[18px] rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[18px] data-[state=unchecked]:translate-x-0  dark:bg-slate-950" />
        </SwitchRoot>
        <label class="select-none text-sm" for="code">
          {slots.default?.()}
        </label>
      </div>
    )
  },
  { props: ['checked', 'onChange'] },
)
