<script lang="ts">
import { DropdownMenu } from 'bits-ui'
import DropdownMenuItem from './dropdown-menu-item.svelte'

const {
  story,
  framework,
}: {
  story: string
  framework: string
} = $props()

const handleDownload = () => {
  const params = new URLSearchParams()
  params.set(
    'url',
    `https://github.com/prosekit/examples/tree/master/${framework}-${story}`,
  )
  const url = 'https://downgit.github.io/#/home?' + params.toString()
  window.open(url, '_blank')
}

const handleOpenCodeSandbox = () => {
  const url = `https://githubbox.com/prosekit/examples/tree/master/${framework}-${story}`
  window.open(url, '_blank')
}

const handleOpenStackBlitz = () => {
  const url = `https://stackblitz.com/github/prosekit/examples/tree/master/${framework}-${story}`
  window.open(url, '_blank')
}

const handleOpenInNewPage = () => {
  // get current hostname
  let url = new URL(window.location.href)
  url.pathname = `/playground/-/${framework}/${story}/`
  window.open(url.toString(), '_blank')
}
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger class="focus-visible border-border inline-flex size-8 select-none items-center justify-center rounded-lg border text-sm bg-background hover:bg-muted transition-colors">
    <div class="i-lucide-ellipsis size-5"></div>
  </DropdownMenu.Trigger>
  <DropdownMenu.Portal>
    <DropdownMenu.Content
      class={[
        'w-[220px] rounded-lg border border-border bg-background p-1 shadow-lg outline-none focus-visible:outline-none',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      ]}
      sideOffset={6}
    >
      <DropdownMenuItem onSelect={handleOpenCodeSandbox}>
        Open in CodeSandbox
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={handleOpenStackBlitz}>
        Open in StackBlitz
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={handleOpenInNewPage}>
        Open in New Page
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={handleDownload}>
        Download
      </DropdownMenuItem>
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>
