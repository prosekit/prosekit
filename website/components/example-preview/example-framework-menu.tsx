import { Check } from 'lucide-vue-next'
import { DropdownMenuRoot } from 'radix-vue'
import { defineComponent } from 'vue'

import { DropdownMenuContent } from '../dropdown-menu/dropdown-menu-content'
import { DropdownMenuItem } from '../dropdown-menu/dropdown-menu-item'
import { DropdownMenuTrigger } from '../dropdown-menu/dropdown-menu-trigger'

import { ExampleFrameworkItem } from './example-framework-item'

export const ExampleFrameworkMenu = defineComponent<{
  framework: string
  frameworks: string[]
  onChange: (framework: string) => void
}>(
  (props) => {
    return () => (
      <DropdownMenuRoot>
        <DropdownMenuTrigger>
          <ExampleFrameworkItem framework={props.framework} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {props.frameworks.map((framework) => (
            <DropdownMenuItem onClick={() => props.onChange(framework)}>
              <span class="flex items-center justify-center">
                <span class="w-6">
                  {props.framework === framework ? (
                    <Check class="h-4 w-4" />
                  ) : null}
                </span>
                <ExampleFrameworkItem framework={framework} />
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenuRoot>
    )
  },
  {
    props: ['framework', 'frameworks', 'onChange'],
  },
)
