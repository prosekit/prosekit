import type { StarlightUserConfig } from '@astrojs/starlight/types'
import { DefaultMap } from '@ocavue/utils'
import registry from 'prosekit-registry/registry.gen.json'

interface Story {
  name: string
  link: string
  description: string
  frameworks: string[]
}

export const storyMap = new DefaultMap<string, Story>(() => ({
  name: '(unknown)',
  link: '(unknown)',
  description: '(unknown)',
  frameworks: [],
}))

for (const item of registry.items) {
  if (item.meta.hidden) {
    continue
  }
  const name = item.meta.story
  if (!name) {
    continue
  }
  const story = storyMap.get(name)
  story.name = name
  story.link = `/examples/${name}`
  story.description = item.description
  story.frameworks.push(item.meta.framework)
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
