// This file is generated from update-loader.ts

export const loaders = {
  'block-handle': () => import('./examples/block-handle').then((m) => m.registerLitEditor()),
  'minimal': () => import('./examples/minimal').then((m) => m.registerLitEditor()),
  'slash-menu': () => import('./examples/slash-menu').then((m) => m.registerLitEditor()),
}
