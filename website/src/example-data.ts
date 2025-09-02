import type { StarlightUserConfig } from '@astrojs/starlight/types'

import exampleMeta from '../example.meta.json' with { type: 'json' }

export const stories = Array.from(new Set(exampleMeta.examples.map((example) => example.story)))

type Sidebar = StarlightUserConfig['sidebar']

export const exampleSidebarItems = stories.map((story) => ({
  label: story,
  link: `/examples/${story}`,
}))

export const exampleSidebar = [
  {
    label: 'Examples',
    items: exampleSidebarItems,
  },
] as const satisfies Sidebar
