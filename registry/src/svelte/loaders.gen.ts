// This file is generated from update-loader.ts

export const loaders = {
  'blockquote': () => import('./examples/blockquote').then((m) => ({ default: m.ExampleEditor })),
  'bold': () => import('./examples/bold').then((m) => ({ default: m.ExampleEditor })),
  'code-block': () => import('./examples/code-block').then((m) => ({ default: m.ExampleEditor })),
  'full': () => import('./examples/full').then((m) => ({ default: m.ExampleEditor })),
  'minimal': () => import('./examples/minimal').then((m) => ({ default: m.ExampleEditor })),
}
