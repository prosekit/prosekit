import { DropdownMenuRoot } from 'radix-vue'
import { defineComponent } from 'vue'

import { DropdownMenuContent } from '../dropdown-menu/dropdown-menu-content'
import { DropdownMenuItem } from '../dropdown-menu/dropdown-menu-item'
import { DropdownMenuTrigger } from '../dropdown-menu/dropdown-menu-trigger'

import { FrameworkItem } from './framework-item'

export const FrameworkMenu = defineComponent<{
  framework: string
  frameworks: string[]
  onChange: (framework: string) => void
}>(
  (props) => {
    return () => (
      <DropdownMenuRoot>
        <DropdownMenuTrigger>
          <FrameworkItem framework={props.framework} />
          <span class="i-lucide-chevron-down size-4 opacity-50" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {props.frameworks.map((framework) => (
            <DropdownMenuItem onClick={() => props.onChange(framework)}>
              <span class="flex items-center justify-center gap-1">
                <span class="h-full w-6 inline-flex items-center justify-start">
                  {props.framework === framework ? <span class="i-lucide-check size-4 opacity-70"></span> : null}
                </span>
                <FrameworkItem framework={framework} />
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
