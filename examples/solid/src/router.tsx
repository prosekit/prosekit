import slugify from '@sindresorhus/slugify'
import { For, createSignal, lazy, onCleanup, onMount } from 'solid-js'
import { Dynamic } from 'solid-js/web'

import { stories } from './stories'

const routes = stories.map(([name, factory]) => ({
  name,
  path: slugify(name),
  Component: lazy(factory),
}))

function usePath() {
  const [path, setPath] = createSignal(slugify(window.location.hash))

  const handleHashChange = (event: HashChangeEvent) => {
    setPath(slugify(new URL(event.newURL).hash))
  }

  onMount(() => window.addEventListener('hashchange', handleHashChange))
  onCleanup(() => window.removeEventListener('hashchange', handleHashChange))

  return path
}

export function Router() {
  const path = usePath()
  const currentRoute = () =>
    routes.find((route) => route.path === path()) || routes[0]

  return (
    <div>
      <ul>
        <For each={routes}>
          {(route) => (
            <li>
              <a href={`#${route.path}`}>
                {route.path === currentRoute().path ? (
                  <mark>{route.name}</mark>
                ) : (
                  <span>{route.name}</span>
                )}
              </a>
            </li>
          )}
        </For>
      </ul>
      <Dynamic component={currentRoute().Component} />
    </div>
  )
}
