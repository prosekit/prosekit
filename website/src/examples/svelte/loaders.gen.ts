// This file is generated from update-website-pages.ts

export const loaders = {
  'full': () => import('prosekit-registry/svelte/examples/full').then((m) => ({ default: m.ExampleEditor })),
  'minimal': () => import('prosekit-registry/svelte/examples/minimal').then((m) => ({ default: m.ExampleEditor })),
}
