// This file is generated from gen-playground-pages.ts
import { lazy } from 'solid-js'

export const loaders = {
  'minimal': lazy(() => import('./minimal/editor')),
  'code-block': lazy(() => import('./code-block/editor')),
  'drop-cursor': lazy(() => import('./drop-cursor/editor')),
  'heading': lazy(() => import('./heading/editor')),
  'keymap': lazy(() => import('./keymap/editor')),
  'link-mark-view': lazy(() => import('./link-mark-view/editor')),
  'readonly': lazy(() => import('./readonly/editor')),
  'slash-menu': lazy(() => import('./slash-menu/editor')),
  'text-align': lazy(() => import('./text-align/editor')),
}
