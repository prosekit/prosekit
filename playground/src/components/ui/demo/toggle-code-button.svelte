<script lang="ts">
import { Button } from 'bits-ui'

interface Props {
  showCode: boolean
  onShowCodeChange: (showCode: boolean) => void
}

const { showCode, onShowCodeChange }: Props = $props()
const toggleShowCode = () => {
  onShowCodeChange(!showCode)
}
</script>

<Button.Root
  class="inline-flex h-8 items-center justify-center rounded-lg text-sm p-2 font-500 text-secondary-foreground bg-transparent transition-colors hover:bg-muted"
  onclick={toggleShowCode}
>
  {showCode ? 'Hide code' : 'Show code'}
</Button.Root>
