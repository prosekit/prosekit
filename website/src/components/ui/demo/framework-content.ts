import { createElement, Fragment, type FC, type ReactNode } from 'react'

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

// Each slot is wrapped in a keyed Fragment to force React to unmount and
// remount when the framework changes.  Astro's StaticHtml component is
// wrapped in React.memo(() => true) which prevents any prop-driven
// re-render, so without distinct keys React would reuse the old slot DOM.
// https://github.com/withastro/astro/blob/a8a926eecc2fb9a2e48a63afcf444d3ca2921a9c/packages/integrations/react/src/static-html.ts#L36
export const FrameworkContent: FC<FrameworkContentProps> = (props) => {
  switch (props.framework) {
    case 'lit':
      return createElement(Fragment, { key: 1 }, props.lit)
    case 'preact':
      return createElement(Fragment, { key: 2 }, props.preact)
    case 'react':
      return createElement(Fragment, { key: 3 }, props.react)
    case 'solid':
      return createElement(Fragment, { key: 4 }, props.solid)
    case 'svelte':
      return createElement(Fragment, { key: 5 }, props.svelte)
    case 'vanilla':
      return createElement(Fragment, { key: 6 }, props.vanilla)
    case 'vue':
      return createElement(Fragment, { key: 7 }, props.vue)
    default:
      throw new Error(`Unknown framework: ${props.framework}`)
  }
}
