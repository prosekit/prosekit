// This file is generated from gen-website-pages.ts
import { lazy } from 'solid-js'

export const loaders = {
  'minimal': lazy(() => import('./minimal/editor')),
  'block-handle': lazy(() => import('./block-handle/editor')),
  'bold': lazy(() => import('./bold/editor')),
  'code': lazy(() => import('./code/editor')),
  'code-block': lazy(() => import('./code-block/editor')),
  'drop-cursor': lazy(() => import('./drop-cursor/editor')),
  'hard-break': lazy(() => import('./hard-break/editor')),
  'heading': lazy(() => import('./heading/editor')),
  'image-view': lazy(() => import('./image-view/editor')),
  'keymap': lazy(() => import('./keymap/editor')),
  'link-mark-view': lazy(() => import('./link-mark-view/editor')),
  'readonly': lazy(() => import('./readonly/editor')),
  'slash-menu': lazy(() => import('./slash-menu/editor')),
  'table': lazy(() => import('./table/editor')),
  'text-align': lazy(() => import('./text-align/editor')),
  'typography': lazy(() => import('./typography/editor')),
}
