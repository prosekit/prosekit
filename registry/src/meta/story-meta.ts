import { stories } from '../stories.ts'

export const storyMeta = new Map<string, { hidden: boolean; description: string }>(
  stories.map(entry => [
    entry.name,
    {
      hidden: entry.hidden ?? false,
      description: entry.description ?? '',
    },
  ]),
)

export function checkStoryMeta(items: ReadonlyArray<{ story?: string }>) {
  const scannedStories = new Set<string>()
  for (const item of items) {
    if (item.story) {
      scannedStories.add(item.story)
    }
  }

  for (const story of scannedStories) {
    if (!storyMeta.has(story)) {
      console.warn(
        `[${import.meta.filename}] Warning: Story "${story}" is not defined in registry/src/stories.ts. `
          + `Please add an entry for it.`,
      )
    }
  }

  for (const name of storyMeta.keys()) {
    if (!scannedStories.has(name)) {
      console.warn(
        `[${import.meta.filename}] Warning: Story "${name}" is defined in registry/src/stories.ts `
          + `but no matching example was found.`,
      )
    }
  }
}
