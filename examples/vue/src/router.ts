import slugify from '@sindresorhus/slugify'
import {
  Component,
  computed,
  defineAsyncComponent,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  ref,
} from 'vue'

import { stories } from './stories'

const routes = stories.map(([name, factory]) => ({
  name,
  path: slugify(name),
  Component: defineAsyncComponent(factory) as Component,
}))

function usePath() {
  const path = ref(slugify(window.location.hash))

  const handleHashChange = (event: HashChangeEvent) => {
    path.value = slugify(new URL(event.newURL).hash)
  }

  onMounted(() => window.addEventListener('hashchange', handleHashChange))
  onUnmounted(() => window.removeEventListener('hashchange', handleHashChange))

  return path
}

export const Router = defineComponent(() => {
  const path = usePath()
  const currentRoute = computed(
    () => routes.find((route) => route.path === path.value) || routes[0],
  )

  return () =>
    h('div', [
      h(
        'ul',
        routes.map((route) =>
          h(
            'li',
            { key: route.path },
            h(
              'a',
              { href: '#' + route.path },
              h(
                route.path === currentRoute.value.path ? 'mark' : 'span',
                route.name,
              ),
            ),
          ),
        ),
      ),
      h(currentRoute.value.Component),
    ])
})
