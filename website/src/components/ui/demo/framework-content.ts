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
export const FrameworkContent: FC<FrameworkContentProps> = ({ framework, ...slots }) => {
  const child = slots[framework as keyof typeof slots]
  if (!child) {
    throw new Error(`no content for framework ${framework}`)
  }
  return createElement(Fragment, { key: framework }, child)
}
