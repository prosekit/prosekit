import { DropdownMenuTrigger as RadixDropdownMenuTrigger } from 'radix-vue'
import { defineComponent } from 'vue'

export const DropdownMenuTrigger = defineComponent((props, { slots }) => {
  return () => (
    <RadixDropdownMenuTrigger class="flex items-center justify-between rounded px-3 py-2 text-sm transition space-x-1 hover:bg-[--vp-c-default-soft] [*&_]:selection:bg-transparent">
      {slots.default?.()}
    </RadixDropdownMenuTrigger>
  )
})
