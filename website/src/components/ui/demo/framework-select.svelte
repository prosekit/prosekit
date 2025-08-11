<script lang="ts">
import { Select } from 'bits-ui'

import FrameworkLabel from './framework-label.svelte'

interface Props {
  frameworks: string[]
  framework: string
  onFrameworkChange: (framework: string) => void
}

const { frameworks, framework, onFrameworkChange }: Props = $props()
</script>

<Select.Root type="single" onValueChange={(v) => onFrameworkChange(v)} value={framework}>
  <Select.Trigger
    class="flex h-8 select-none items-center rounded-lg border border-border bg-background pl-3 pr-3 w-32 text-sm gap-2"
    aria-label="Select a framework"
  >
    <FrameworkLabel {framework} />
    <div class="i-lucide-chevron-down size-4 min-w-4 text-muted-foreground"></div>
  </Select.Trigger>
  <Select.Portal>
    <Select.Content
      class={[
        'z-50 max-h-96 select-none rounded-lg border border-border bg-background p-1 shadow-lg outline-none',
        'w-(--bits-select-anchor-width) min-w-(--bits-select-anchor-width)',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      ]}
      sideOffset={6}
    >
      <Select.Viewport class="p-0">
        {#each frameworks as framework, i (i + framework)}
          <Select.Item
            class="flex h-8 select-none items-center rounded py-3 px-2 text-sm outline-none ring-transparent data-[highlighted]:bg-muted"
            value={framework}
            label={framework}
          >
            {#snippet children({ selected })}
              <FrameworkLabel {framework} />
              {#if selected}
                <div class="i-lucide-check size-4 min-w-4 text-muted-foreground"></div>
              {/if}
            {/snippet}
          </Select.Item>
        {/each}
      </Select.Viewport>
    </Select.Content>
  </Select.Portal>
</Select.Root>
