import { vfs } from '@prosekit/dev'

import type { ItemAccumulator } from './types'

const STORY_META_PATH = 'registry/src/story-meta.gen.yaml'

export async function updateStoryMeta(items: ItemAccumulator[]): Promise<void> {
  const descriptionsByStory: { [storyName: string]: string | undefined } = {}
  for (const item of await readStoryMeta()) {
    descriptionsByStory[item.name] = item.description
  }

  const itemsByStory = Map.groupBy(items, item => item.story)

  const meta: StoryItem[] = []
  for (const [storyName, items] of itemsByStory) {
    if (!storyName) continue
    const frameworks = items.map(item => item.framework)
    const description = descriptionsByStory[storyName] || undefined
    meta.push({ name: storyName, description, frameworks })
  }

  await writeStoryMeta(meta)
}

type StoryItem = {
  name: string
  frameworks: string[]
  description?: string
}

async function readStoryMeta(): Promise<StoryItem[]> {
  try {
    return await vfs.readYaml(STORY_META_PATH) as StoryItem[]
  } catch {
    return []
  }
}

async function writeStoryMeta(items: StoryItem[]): Promise<void> {
  await vfs.updateYaml(STORY_META_PATH, items, { flowLevel: 2 })
}
