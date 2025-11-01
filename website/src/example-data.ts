import type { StarlightUserConfig } from '@astrojs/starlight/types'

import registry from '../build/registry.gen.json'

export const stories = Array.from(
  new Set(
    registry.items.map((item) => item.meta.story).filter(story => !!story),
  ),
).sort()

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
