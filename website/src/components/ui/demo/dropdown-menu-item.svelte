<script lang="ts">
import { DropdownMenu } from 'bits-ui'

const props: DropdownMenu.ItemProps = $props()
</script>

<DropdownMenu.Item
  class="flex h-8 select-none items-center rounded py-3 pl-3 pr-1.5 text-sm outline-none ring-transparent data-[highlighted]:bg-muted"
  {...props}
>
  {@render props.children?.()}
</DropdownMenu.Item>
