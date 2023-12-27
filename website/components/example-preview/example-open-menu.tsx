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

    const onDownload = () => {
      console.log('onDownload', props.example)
    }

    return () => (
      <DropdownMenuRoot>
        <DropdownMenuTrigger>
          <span>Open...</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onOpenCodeSandbox}>
            <span>Open in CodeSandbox</span>
            <span class="i-ci-arrow-up-right-md ml-2 h-4 w-4 opacity-50"></span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onOpenStackBlitz}>
            <span>Open in StackBlitz</span>
            <span class="i-ci-arrow-up-right-md ml-2 h-4 w-4 opacity-50"></span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDownload}>
            <span>Download</span>
            <span class="i-ci-arrow-up-right-md ml-2 h-4 w-4 opacity-50"></span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuRoot>
    )
  },
  {
    props: ['example'],
  },
)
