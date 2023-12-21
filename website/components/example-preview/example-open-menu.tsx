import { DropdownMenuRoot } from 'radix-vue'
import { defineComponent } from 'vue'

import { DropdownMenuContent } from '../dropdown-menu/dropdown-menu-content'
import { DropdownMenuItem } from '../dropdown-menu/dropdown-menu-item'
import { DropdownMenuTrigger } from '../dropdown-menu/dropdown-menu-trigger'

export interface ExampleLanguageSelectProps {
  example: string
}

export const ExampleOpenMenu = defineComponent<ExampleLanguageSelectProps>(
  (props) => {
    const onOpenCodeSandbox = () => {
      console.log('onOpenCodeSandbox', props.example)
    }

    const onOpenStackBlitz = () => {
      console.log('onOpenStackBlitz', props.example)
    }

    return () => (
      <DropdownMenuRoot>
        <DropdownMenuTrigger>
          <span>Open In...</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onOpenCodeSandbox}>
            <span>CodeSandbox</span>
            <span class="i-ci-arrow-up-right-lg ml-2 opacity-50"></span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onOpenStackBlitz}>
            <span>StackBlitz</span>
            <span class="i-ci-arrow-up-right-lg ml-2 opacity-50"></span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuRoot>
    )
  },
  {
    props: ['example'],
  },
)
