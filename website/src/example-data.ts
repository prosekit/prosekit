import type { StarlightUserConfig } from '@astrojs/starlight/types'
import { DefaultMap } from '@ocavue/utils'
import examples from 'prosekit-registry/examples.gen.json'

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

for (const [name, storyData] of Object.entries(examples.stories)) {
  if (storyData.hidden) {
    continue
  }
  const story = storyMap.get(name)
  story.name = name
  story.link = `/examples/${name}`
  story.description = storyData.description
  story.frameworks = storyData.frameworks
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
