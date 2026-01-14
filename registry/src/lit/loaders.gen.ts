// This file is generated from update-loader.ts

export const loaders = {
  'minimal': () => import('./examples/minimal').then((m) => m.registerLitEditor()),
  'slash-menu': () => import('./examples/slash-menu').then((m) => m.registerLitEditor()),
}
