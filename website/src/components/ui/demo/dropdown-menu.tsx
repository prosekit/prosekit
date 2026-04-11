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
          <Menu.Popup className="
            border rounded-lg border-border bg-background p-1 shadow-lg outline-none
            transition-[transform,scale,opacity]
            origin-(--transform-origin) 
            data-ending-style:scale-90 
            data-ending-style:opacity-0 
            data-starting-style:scale-90 
            data-starting-style:opacity-0">
            <DropdownMenuItem text="Open in CodeSandbox" onClick={handleOpenCodeSandbox} />
            <DropdownMenuItem text="Open in StackBlitz" onClick={handleOpenStackBlitz} />
            <DropdownMenuItem text="Open in New Page" onClick={handleOpenInNewPage} />
            <DropdownMenuItem text="Download" onClick={handleDownload} />
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}

function DropdownMenuItem({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <Menu.Item
      className="flex items-center cursor-default py-2 pl-3 pr-2 text-sm leading-4 outline-hidden select-none outline-none ring-transparent data-highlighted:bg-muted relative"
      onClick={onClick}
    >
      <span>{text}</span>
      <span className="flex-1 inline-flex w-3"></span>
      <span className="size-4 inline-flex opacity-50 i-lucide-square-arrow-out-up-right"></span>
    </Menu.Item>
  )
}
