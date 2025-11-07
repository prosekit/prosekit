// This file is generated from update-loader.ts
import { lazy } from 'solid-js'

export const loaders = {
  'full': lazy(() => import('./examples/full').then((m) => ({ default: m.ExampleEditor }))),
  'heading': lazy(() => import('./examples/heading').then((m) => ({ default: m.ExampleEditor }))),
  'minimal': lazy(() => import('./examples/minimal').then((m) => ({ default: m.ExampleEditor }))),
}
