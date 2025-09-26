// This file is generated from gen-website-pages.ts
import { lazy } from 'preact/compat'

export const loaders = {
  'minimal': lazy(() => import('./minimal/editor')),
  'block-handle': lazy(() => import('./block-handle/editor')),
  'keymap': lazy(() => import('./keymap/editor')),
  'image-view': lazy(() => import('./image-view/editor')),
  'readonly': lazy(() => import('./readonly/editor')),
  'slash-menu': lazy(() => import('./slash-menu/editor')),
  'table': lazy(() => import('./table/editor')),
  'typography': lazy(() => import('./typography/editor')),
}
