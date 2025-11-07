// This file is generated from update-loader.ts
import { lazy } from 'preact/compat'

export const loaders = {
  'block-handle': lazy(() => import('./examples/block-handle').then((m) => ({ default: m.ExampleEditor }))),
  'blockquote': lazy(() => import('./examples/blockquote').then((m) => ({ default: m.ExampleEditor }))),
  'change-tracking': lazy(() => import('./examples/change-tracking').then((m) => ({ default: m.ExampleEditor }))),
  'code-block-themes': lazy(() => import('./examples/code-block-themes').then((m) => ({ default: m.ExampleEditor }))),
  'full': lazy(() => import('./examples/full').then((m) => ({ default: m.ExampleEditor }))),
  'gap-cursor': lazy(() => import('./examples/gap-cursor').then((m) => ({ default: m.ExampleEditor }))),
  'heading': lazy(() => import('./examples/heading').then((m) => ({ default: m.ExampleEditor }))),
  'horizontal-rule': lazy(() => import('./examples/horizontal-rule').then((m) => ({ default: m.ExampleEditor }))),
  'image-view': lazy(() => import('./examples/image-view').then((m) => ({ default: m.ExampleEditor }))),
  'inline-menu': lazy(() => import('./examples/inline-menu').then((m) => ({ default: m.ExampleEditor }))),
  'keymap': lazy(() => import('./examples/keymap').then((m) => ({ default: m.ExampleEditor }))),
  'link': lazy(() => import('./examples/link').then((m) => ({ default: m.ExampleEditor }))),
  'link-mark-view': lazy(() => import('./examples/link-mark-view').then((m) => ({ default: m.ExampleEditor }))),
  'list': lazy(() => import('./examples/list').then((m) => ({ default: m.ExampleEditor }))),
  'list-custom-checkbox': lazy(() => import('./examples/list-custom-checkbox').then((m) => ({ default: m.ExampleEditor }))),
  'mark-rule': lazy(() => import('./examples/mark-rule').then((m) => ({ default: m.ExampleEditor }))),
  'minimal': lazy(() => import('./examples/minimal').then((m) => ({ default: m.ExampleEditor }))),
  'placeholder': lazy(() => import('./examples/placeholder').then((m) => ({ default: m.ExampleEditor }))),
  'readonly': lazy(() => import('./examples/readonly').then((m) => ({ default: m.ExampleEditor }))),
  'save-html': lazy(() => import('./examples/save-html').then((m) => ({ default: m.ExampleEditor }))),
  'save-json': lazy(() => import('./examples/save-json').then((m) => ({ default: m.ExampleEditor }))),
  'save-markdown': lazy(() => import('./examples/save-markdown').then((m) => ({ default: m.ExampleEditor }))),
  'toolbar': lazy(() => import('./examples/toolbar').then((m) => ({ default: m.ExampleEditor }))),
}
