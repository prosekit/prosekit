import { defineComponent } from 'vue'

const frameworkIcons: Record<string, string> = {
  react: 'i-logos-react',
  vue: 'i-logos-vue',
  preact: 'i-logos-preact',
  svelte: 'i-logos-svelte-icon',
  solid: 'i-logos-solidjs-icon',
  lit: 'i-logos-lit-icon',
  vanilla: 'i-logos-javascript',
}

export const FrameworkItem = defineComponent<{
  framework: string
}>(
  (props) => {
    return () => {
      const framework = props.framework.toLowerCase()
      const name = framework[0].toUpperCase() + framework.slice(1)
      const icon = frameworkIcons[framework]

      return (
        <span class="flex items-center space-x-2">
          <span class={icon}></span>
          <span>{name}</span>
        </span>
      )
    }
  },
  {
    props: ['framework'],
  },
)
