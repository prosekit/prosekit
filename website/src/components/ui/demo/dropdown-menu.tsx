/** @jsxImportSource react */

import { Menu } from '@base-ui/react/menu'

interface DropdownMenuProps {
  story: string
  framework: string
}

export function DropdownMenu({ story, framework }: DropdownMenuProps) {
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
    const url = new URL(window.location.href)
    url.pathname = `/playground/-/${framework}/${story}/`
    window.open(url.toString(), '_blank')
  }

  return (
    <Menu.Root>
      <Menu.Trigger
        aria-label="More options"
        className="focus-visible border-border inline-flex size-8 select-none items-center justify-center rounded-lg border text-sm bg-background hover:bg-muted transition-colors"
      >
        <div className="i-lucide-ellipsis size-5"></div>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={6}>
          <Menu.Popup className="w-[220px] rounded-lg border border-border bg-background p-1 shadow-lg outline-none focus-visible:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
            <Menu.Item
              className="flex h-8 select-none items-center rounded py-3 pl-3 pr-1.5 text-sm outline-none ring-transparent data-highlighted:bg-muted"
              onClick={handleOpenCodeSandbox}
            >
              Open in CodeSandbox
            </Menu.Item>
            <Menu.Item
              className="flex h-8 select-none items-center rounded py-3 pl-3 pr-1.5 text-sm outline-none ring-transparent data-highlighted:bg-muted"
              onClick={handleOpenStackBlitz}
            >
              Open in StackBlitz
            </Menu.Item>
            <Menu.Item
              className="flex h-8 select-none items-center rounded py-3 pl-3 pr-1.5 text-sm outline-none ring-transparent data-highlighted:bg-muted"
              onClick={handleOpenInNewPage}
            >
              Open in New Page
            </Menu.Item>
            <Menu.Item
              className="flex h-8 select-none items-center rounded py-3 pl-3 pr-1.5 text-sm outline-none ring-transparent data-highlighted:bg-muted"
              onClick={handleDownload}
            >
              Download
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}
