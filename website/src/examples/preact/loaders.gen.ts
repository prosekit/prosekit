// This file is generated from gen-website-pages.ts
import { lazy } from 'preact/compat'

export const loaders = {
  'minimal': lazy(() => import('./minimal/editor')),
  'block-handle': lazy(() => import('./block-handle/editor')),
  'blockquote': lazy(() => import('./blockquote/editor')),
  'bold': lazy(() => import('./bold/editor')),
  'code': lazy(() => import('./code/editor')),
  'image-view': lazy(() => import('./image-view/editor')),
  'italic': lazy(() => import('./italic/editor')),
  'keymap': lazy(() => import('./keymap/editor')),
  'link-mark-view': lazy(() => import('./link-mark-view/editor')),
  'readonly': lazy(() => import('./readonly/editor')),
  'slash-menu': lazy(() => import('./slash-menu/editor')),
  'strike': lazy(() => import('./strike/editor')),
  'table': lazy(() => import('./table/editor')),
  'typography': lazy(() => import('./typography/editor')),
}
