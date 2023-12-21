import { useData } from 'vitepress'

export function useDarkMode() {
  return useData().isDark
}
