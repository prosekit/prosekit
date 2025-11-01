// This file is generated from update-website-pages.ts
import { lazy } from 'solid-js'

export const loaders = {
  'full': lazy(() => import('prosekit-registry/solid/examples/full').then((m) => ({ default: m.ExampleEditor }))),
  'heading': lazy(() => import('prosekit-registry/solid/examples/heading').then((m) => ({ default: m.ExampleEditor }))),
  'minimal': lazy(() => import('prosekit-registry/solid/examples/minimal').then((m) => ({ default: m.ExampleEditor }))),
}
