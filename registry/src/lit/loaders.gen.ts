// This file is generated from update-loader.ts

export const loaders = {
  'code-block': () => import('./examples/code-block').then((m) => m.registerLitEditor()),
  'minimal': () => import('./examples/minimal').then((m) => m.registerLitEditor()),
  'slash-menu': () => import('./examples/slash-menu').then((m) => m.registerLitEditor()),
  'table': () => import('./examples/table').then((m) => m.registerLitEditor()),
  'toolbar': () => import('./examples/toolbar').then((m) => m.registerLitEditor()),
}
