// This file is generated from gen-website-pages.ts
import { lazy } from 'preact/compat'

export const loaders = {
  'minimal': lazy(() => import('./minimal/editor')),
  'keymap': lazy(() => import('./keymap/editor')),
  'readonly': lazy(() => import('./readonly/editor')),
  'slash-menu': lazy(() => import('./slash-menu/editor')),
  'typography': lazy(() => import('./typography/editor')),
}
