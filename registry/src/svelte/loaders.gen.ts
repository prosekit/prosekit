// This file is generated from update-loader.ts

export const loaders = {
  'full': () => import('./examples/full').then((m) => ({ default: m.ExampleEditor })),
  'minimal': () => import('./examples/minimal').then((m) => ({ default: m.ExampleEditor })),
}
