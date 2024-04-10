import {
  DropdownMenuPortal,
  DropdownMenuContent as RadixDropdownMenuContent,
} from 'radix-vue'
import { defineComponent } from 'vue'

export const DropdownMenuContent = defineComponent({
  setup(props, { slots }) {
    return () => (
      <DropdownMenuPortal>
        <RadixDropdownMenuContent
          class="z-50 min-w-40 data-[state=closed]:animate-out data-[state=open]:animate-in overflow-hidden border-1 border-color-[--vp-c-divider] rounded-lg border-solid bg-[--vp-c-bg-elv] p-2 shadow-md data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          collisionPadding={20}
        >
          {slots.default?.()}
        </RadixDropdownMenuContent>
      </DropdownMenuPortal>
    )
  },
})
