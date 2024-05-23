import { DropdownMenuRoot } from 'radix-vue'
import { defineComponent } from 'vue'

import { DropdownMenuTrigger } from '../dropdown-menu/dropdown-menu-trigger'

export const ExampleDownloadButton = defineComponent<{
  example: string
}>(
  (props) => {
    const handleDownload = () => {
      const params = new URLSearchParams()
      params.set(
        'url',
        `https://github.com/prosekit/examples/tree/master/${props.example}`,
      )
      const url = 'https://downgit.github.io/#/home?' + params.toString()
      window.open(url, '_blank')
    }

    return () => (
      <DropdownMenuRoot>
        <DropdownMenuTrigger onClick={handleDownload} class="flex gap-1">
          <span class="i-lucide-arrow-down-to-line size-4 opacity-70" />
          <span class="hidden sm:inline">Download</span>
        </DropdownMenuTrigger>
      </DropdownMenuRoot>
    )
  },
  {
    props: ['example'],
  },
)
