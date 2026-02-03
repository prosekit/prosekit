/** @jsxImportSource react */

import type {
  FC,
  ReactNode,
} from 'react'

export interface ReactFrameworkContents {
  lit?: ReactNode
  preact?: ReactNode
  react?: ReactNode
  solid?: ReactNode
  svelte?: ReactNode
  vanilla?: ReactNode
  vue?: ReactNode
}

interface FrameworkContentProps extends ReactFrameworkContents {
  framework: string
}

export const FrameworkContent: FC<FrameworkContentProps> = (props) => {
  switch (props.framework) {
    case 'lit':
      return props.lit
    case 'preact':
      return props.preact
    case 'react':
      return props.react
    case 'solid':
      return props.solid
    case 'svelte':
      return props.svelte
    case 'vanilla':
      return props.vanilla
    case 'vue':
      return props.vue
    default:
      throw new Error(`Unknown framework: ${props.framework}`)
  }
}
