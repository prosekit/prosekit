import { DropdownMenuRoot } from 'radix-vue'
import { defineComponent } from 'vue'

import { DropdownMenuTrigger } from '../dropdown-menu/dropdown-menu-trigger'

export const ExampleDownloadButton = defineComponent<{
  example: string
}>(
  (props) => {
    const handleDownload = () => {
      const url = new URL(`https://download-directory.github.io/`)
      url.searchParams.set(
        'url',
        `https://github.com/prosekit/examples/tree/master/${props.example}`,
      )
      window.open(url, '_blank')
    }

    https: return () => (
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
