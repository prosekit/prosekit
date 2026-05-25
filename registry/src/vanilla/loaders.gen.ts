// This file is generated from update-loader.ts

export const loaders = {
  'minimal': () => import('./examples/minimal/index.ts').then((m) => m.setupVanillaEditor()),
  'slash-menu': () => import('./examples/slash-menu/index.ts').then((m) => m.setupVanillaEditor()),
}
