import { DropdownMenuRoot } from 'radix-vue'
import { defineComponent } from 'vue'

import { DropdownMenuContent } from '../dropdown-menu/dropdown-menu-content'
import { DropdownMenuItem } from '../dropdown-menu/dropdown-menu-item'
import { DropdownMenuTrigger } from '../dropdown-menu/dropdown-menu-trigger'

export const ExampleForkMenu = defineComponent<{
  example: string
}>(
  (props) => {
    const handleOpenCodeSandbox = () => {
      const url = `https://githubbox.com/prosekit/examples/tree/master/${props.example}`
      window.open(url, '_blank')
    }

    const handleOpenStackBlitz = () => {
      const url = `https://stackblitz.com/github/prosekit/examples/tree/master/${props.example}`
      window.open(url, '_blank')
    }

    

    return () => (
      <DropdownMenuRoot>
        <DropdownMenuTrigger hideButton={true} class="flex gap-1">
          <span class="i-lucide-external-link size-4 opacity-70" />
          <span class="hidden sm:inline">Fork</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleOpenCodeSandbox}>
            <span>Open in CodeSandbox</span>
            <span class="i-lucide-arrow-up-right ml-2 size-4 opacity-50"></span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOpenStackBlitz}>
            <span>Open in StackBlitz</span>
            <span class="i-lucide-arrow-up-right ml-2 size-4 opacity-50"></span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuRoot>
    )
  },
  {
    props: ['example'],
  },
)
