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
          class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 border-1 border-color-[--vp-c-divider] min-w-40 z-50 overflow-hidden rounded-lg border-solid
          bg-[--vp-c-bg-elv] p-2 shadow-md"
          collisionPadding={20}
        >
          {slots.default?.()}
        </RadixDropdownMenuContent>
      </DropdownMenuPortal>
    )
  },
})
