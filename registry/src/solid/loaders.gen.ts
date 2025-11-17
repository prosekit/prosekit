// This file is generated from update-loader.ts
import { lazy } from 'solid-js'

export const loaders = {
  'block-handle': lazy(() => import('./examples/block-handle').then((m) => ({ default: m.ExampleEditor }))),
  'blockquote': lazy(() => import('./examples/blockquote').then((m) => ({ default: m.ExampleEditor }))),
  'bold': lazy(() => import('./examples/bold').then((m) => ({ default: m.ExampleEditor }))),
  'code': lazy(() => import('./examples/code').then((m) => ({ default: m.ExampleEditor }))),
  'code-block': lazy(() => import('./examples/code-block').then((m) => ({ default: m.ExampleEditor }))),
  'code-block-themes': lazy(() => import('./examples/code-block-themes').then((m) => ({ default: m.ExampleEditor }))),
  'drop-cursor': lazy(() => import('./examples/drop-cursor').then((m) => ({ default: m.ExampleEditor }))),
  'emoji-rules': lazy(() => import('./examples/emoji-rules').then((m) => ({ default: m.ExampleEditor }))),
  'full': lazy(() => import('./examples/full').then((m) => ({ default: m.ExampleEditor }))),
  'hard-break': lazy(() => import('./examples/hard-break').then((m) => ({ default: m.ExampleEditor }))),
  'heading': lazy(() => import('./examples/heading').then((m) => ({ default: m.ExampleEditor }))),
  'italic': lazy(() => import('./examples/italic').then((m) => ({ default: m.ExampleEditor }))),
  'minimal': lazy(() => import('./examples/minimal').then((m) => ({ default: m.ExampleEditor }))),
  'placeholder': lazy(() => import('./examples/placeholder').then((m) => ({ default: m.ExampleEditor }))),
  'strike': lazy(() => import('./examples/strike').then((m) => ({ default: m.ExampleEditor }))),
  'underline': lazy(() => import('./examples/underline').then((m) => ({ default: m.ExampleEditor }))),
}
