// This file is generated from update-loader.ts
import { lazy } from 'solid-js'

export const loaders = {
  'block-handle': lazy(() => import('./examples/block-handle').then((m) => ({ default: m.ExampleEditor }))),
  'blockquote': lazy(() => import('./examples/blockquote').then((m) => ({ default: m.ExampleEditor }))),
  'bold': lazy(() => import('./examples/bold').then((m) => ({ default: m.ExampleEditor }))),
  'change-tracking': lazy(() => import('./examples/change-tracking').then((m) => ({ default: m.ExampleEditor }))),
  'code': lazy(() => import('./examples/code').then((m) => ({ default: m.ExampleEditor }))),
  'code-block': lazy(() => import('./examples/code-block').then((m) => ({ default: m.ExampleEditor }))),
  'full': lazy(() => import('./examples/full').then((m) => ({ default: m.ExampleEditor }))),
  'heading': lazy(() => import('./examples/heading').then((m) => ({ default: m.ExampleEditor }))),
  'minimal': lazy(() => import('./examples/minimal').then((m) => ({ default: m.ExampleEditor }))),
}
