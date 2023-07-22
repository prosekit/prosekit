export const stories = [
  ['Minimal', () => import('./minimal/App')],
  ['Slash Menu', () => import('./slash-menu/App')],
  ['User Menu', () => import('./user-menu/App')],
] as const
