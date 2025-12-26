import { vfs } from '@prosekit/dev'

import type { ItemAccumulator } from './types'

const STORY_META_PATH = 'registry/src/story-meta.gen.yaml'

// Sync data from passed ItemAccumulators to story-meta.gen.yaml
export async function updateStoryMeta(items: ItemAccumulator[]): Promise<void> {
  const metaMap = await loadStoryMeta()
  const metaItems: StoryItem[] = []
  const itemsByStory = Map.groupBy(items, item => item.story)

  for (const [storyName, items] of itemsByStory) {
    if (!storyName) continue
    const frameworks = items.map(item => item.framework)
    const description = metaMap.get(storyName)?.description || undefined
    const hidden = metaMap.get(storyName)?.hidden || undefined
    metaItems.push({ name: storyName, frameworks, hidden, description })
  }

  writeStoryMeta(metaItems)
}

type StoryItem = {
  name: string
  frameworks: string[]
  description?: string
  hidden?: boolean
}

export type StoryMeta = Map<string, { hidden: boolean; description: string }>

export async function loadStoryMeta(): Promise<StoryMeta> {
  const items = await readStoryItems()
  return new Map(items.map(item => [item.name, {
    hidden: item.hidden || false,
    description: item.description || '',
  }]))
}

async function readStoryItems(): Promise<StoryItem[]> {
  try {
    return await vfs.readYAML(STORY_META_PATH)
  } catch {
    return []
  }
}

function writeStoryMeta(items: StoryItem[]): void {
  vfs.updateYAML(STORY_META_PATH, items, { flowLevel: 2 })
}
