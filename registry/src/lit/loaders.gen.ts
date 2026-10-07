// This file is generated from update-loader.ts

export const loaders = {
  'block-handle': () => import('./examples/block-handle/index.ts').then((m) => m.registerLitEditor()),
  'code-block': () => import('./examples/code-block/index.ts').then((m) => m.registerLitEditor()),
  'full': () => import('./examples/full/index.ts').then((m) => m.registerLitEditor()),
  'inline-menu': () => import('./examples/inline-menu/index.ts').then((m) => m.registerLitEditor()),
  'minimal': () => import('./examples/minimal/index.ts').then((m) => m.registerLitEditor()),
  'slash-menu': () => import('./examples/slash-menu/index.ts').then((m) => m.registerLitEditor()),
  'table': () => import('./examples/table/index.ts').then((m) => m.registerLitEditor()),
  'toolbar': () => import('./examples/toolbar/index.ts').then((m) => m.registerLitEditor()),
}
