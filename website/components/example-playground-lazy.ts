import { defineClientComponent } from 'vitepress'

export const ExamplePlaygroundLazy = defineClientComponent(async () => {
  const mod = await import('./example-playground')
  return mod.ExamplePlayground
})
