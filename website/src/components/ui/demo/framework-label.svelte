<script lang="ts">
interface Props {
  framework: string
}

const { framework }: Props = $props()

const frameworkIcons: Record<string, string> = {
  react: 'i-logos-react',
  vue: 'i-logos-vue',
  preact: 'i-logos-preact',
  svelte: 'i-logos-svelte-icon',
  solid: 'i-logos-solidjs-icon',
  lit: 'i-logos-lit-icon',
  vanilla: 'i-logos-javascript',
}

const name = $derived(framework.toLowerCase()[0].toUpperCase() + framework.toLowerCase().slice(1))
const icon = $derived(frameworkIcons[framework.toLowerCase()])
</script>

<span class="flex flex-row items-center space-x-2 w-full items-center">
  <span class="{icon} size-4 min-w-4 block"></span>
  <span>{name}</span>
</span>
