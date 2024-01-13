import { DropdownMenuRoot } from 'radix-vue'
import { defineComponent } from 'vue'

import { DropdownMenuContent } from '../dropdown-menu/dropdown-menu-content'
import { DropdownMenuItem } from '../dropdown-menu/dropdown-menu-item'
import { DropdownMenuTrigger } from '../dropdown-menu/dropdown-menu-trigger'

import { getExampleUrl } from './example-url'

export interface ExampleLanguageSelectProps {
  example: string
}

export const ExampleOpenMenu = defineComponent<ExampleLanguageSelectProps>(
  (props) => {
    const onOpenCodeSandbox = () => {
      const url = `https://githubbox.com/prosekit/examples/tree/master/${props.example}`
      window.open(url, '_blank')
    }

    const onOpenStackBlitz = () => {
      const url = `https://stackblitz.com/github/prosekit/examples/tree/master/${props.example}`
      window.open(url, '_blank')
    }

    const onOpenNewTab = () => {
      const url = getExampleUrl(props.example)
      window.open(url, '_blank')
    }

    return () => (
      <DropdownMenuRoot>
        <DropdownMenuTrigger>
          <span>Open...</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onOpenCodeSandbox}>
            <span>Open in CodeSandbox</span>
            <span class="i-lucide-arrow-up-right ml-2 h-4 w-4 opacity-50"></span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onOpenStackBlitz}>
            <span>Open in StackBlitz</span>
            <span class="i-lucide-arrow-up-right ml-2 h-4 w-4 opacity-50"></span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onOpenNewTab}>
            <span>Open in a new tab</span>
            <span class="i-lucide-arrow-up-right ml-2 h-4 w-4 opacity-50"></span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuRoot>
    )
  },
  {
    props: ['example'],
  },
)
