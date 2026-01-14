<script lang="ts">
import { frameworkIcons } from '../framework-icons'

interface Props {
  framework: string
}

const { framework }: Props = $props()

const name = $derived(framework.toLowerCase()[0].toUpperCase() + framework.toLowerCase().slice(1))
const icon = $derived(frameworkIcons[framework.toLowerCase()])
</script>

<span class="flex flex-row space-x-2 w-full items-center">
  <span class="{icon} size-4 min-w-4 block"></span>
  <span>{name}</span>
</span>
