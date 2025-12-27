import type { StarlightUserConfig } from '@astrojs/starlight/types'
import registry from 'prosekit-registry/registry.gen.json'

interface Story {
  name: string
  link: string
  description: string
}

export const storyMap = new Map<string, Story>()

for (const item of registry.items) {
  if (item.meta.hidden) {
    continue
  }
  const name = item.meta.story
  if (!name) {
    continue
  }
  if (storyMap.has(name)) {
    continue
  }
  storyMap.set(name, {
    name,
    link: `/examples/${name}`,
    description: item.description,
  })
}

type Sidebar = StarlightUserConfig['sidebar']

export const stories: Story[] = Array.from(storyMap.values())

const exampleSidebarItems = stories.map(story => ({
  label: story.name,
  link: story.link,
}))

export const exampleSidebar = [
  {
    label: 'Examples',
    items: exampleSidebarItems,
  },
] as const satisfies Sidebar
