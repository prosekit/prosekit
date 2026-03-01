import { docsLoader } from '@astrojs/starlight/loaders'
import { docsSchema } from '@astrojs/starlight/schema'
import { defineCollection } from 'astro:content'
import type { CollectionConfig } from 'astro/content/config'
import type { Loader } from 'astro/loaders'

type ExtendedSchema = ReturnType<ReturnType<typeof docsSchema>>

type Docs = CollectionConfig<ExtendedSchema, Loader>

const docs: Docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema(),
})

export const collections = { docs }
