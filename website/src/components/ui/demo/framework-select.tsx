/** @jsxImportSource react */

import { Select } from '@base-ui/react/select'

import { FrameworkLabel } from './framework-label.tsx'

interface FrameworkSelectProps {
  frameworks: string[]
  framework: string
  onFrameworkChange: (framework: string) => void
}

export function FrameworkSelect({
  frameworks,
  framework,
  onFrameworkChange,
}: FrameworkSelectProps) {
  return (
    <Select.Root
      value={framework}
      onValueChange={(value) => {
        if (value) {
          onFrameworkChange(value)
        }
      }}
    >
      <Select.Trigger
        className="flex h-8 select-none items-center rounded-lg border border-border bg-background pl-3 pr-3 w-32 text-sm gap-2 justify-between"
        aria-label="Select a framework"
      >
        <Select.Value>
          <FrameworkLabel framework={framework} />
        </Select.Value>
        <Select.Icon className="i-lucide-chevron-down size-4 min-w-4 text-muted-foreground" />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner sideOffset={6}>
          <Select.Popup className="z-50 max-h-96 select-none rounded-lg border border-border bg-background p-1 shadow-lg outline-none min-w-(--anchor-width) data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
            {frameworks.map((framework) => (
              <Select.Item
                key={framework}
                value={framework}
                className="flex h-8 select-none items-center rounded py-3 px-2 text-sm outline-none ring-transparent data-highlighted:bg-muted"
              >
                <Select.ItemText>
                  <FrameworkLabel framework={framework} />
                </Select.ItemText>
                <Select.ItemIndicator className="ml-auto i-lucide-check size-4 min-w-4 text-muted-foreground" />
              </Select.Item>
            ))}
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  )
}
