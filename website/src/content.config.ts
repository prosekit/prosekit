import { docsLoader } from '@astrojs/starlight/loaders'
import { docsSchema } from '@astrojs/starlight/schema'
import { defineCollection } from 'astro:content'
import type { CollectionConfig } from 'astro/content/config'

type Docs = CollectionConfig<ReturnType<ReturnType<typeof docsSchema>>>
const docs: Docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema(),
})

export const collections: { docs: Docs } = { docs }
