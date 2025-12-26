import { vfs } from '@prosekit/dev'

import type { ItemAccumulator } from './types'

const STORY_META_PATH = 'registry/src/story-meta.gen.yaml'

export async function updateStoryMeta(items: ItemAccumulator[]): Promise<void> {
  const storyItems = await readStoryMeta()
  const storyByName = new Map(storyItems.map(item => [item.name, item]))
  const itemsByStory = Map.groupBy(items, item => item.story)

  const meta: StoryItem[] = []
  for (const [storyName, items] of itemsByStory) {
    if (!storyName) continue
    const frameworks = items.map(item => item.framework)
    const description = storyByName.get(storyName)?.description || undefined
    const hidden = storyByName.get(storyName)?.hidden || undefined
    meta.push({ name: storyName, frameworks, hidden, description })
  }

  writeStoryMeta(meta)
}

type StoryItem = {
  name: string
  frameworks: string[]
  description?: string
  hidden?: boolean
}

async function readStoryMeta(): Promise<StoryItem[]> {
  try {
    return await vfs.readYAML(STORY_META_PATH)
  } catch {
    return []
  }
}

function writeStoryMeta(items: StoryItem[]): void {
  vfs.updateYAML(STORY_META_PATH, items, { flowLevel: 2 })
}
