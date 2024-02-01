import { DropdownMenuItem as RadixDropdownMenuItem } from 'radix-vue'
import { defineComponent } from 'vue'

export const DropdownMenuItem = defineComponent((props, { slots }) => {
  return () => (
    <RadixDropdownMenuItem class="relative w-full flex select-none items-center justify-between rounded px-2 py-1.5 text-sm outline-none transition focus:bg-[--vp-c-default-soft] focus:text-[--vp-c-brand-1]">
      {slots.default?.()}
    </RadixDropdownMenuItem>
  )
})
