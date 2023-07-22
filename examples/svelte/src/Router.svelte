<script lang="ts">
  import { stories } from './stories'
  import slugify from '@sindresorhus/slugify'
  import { writable, derived } from 'svelte/store'
  import { onMount, onDestroy, type ComponentType } from 'svelte'

  const routes = stories.map(([name, factory]) => ({
    name,
    path: slugify(name),
    module: factory,
  }))

  function usePath() {
    const path = writable(slugify(window.location.hash))

    const handleHashChange = (event: HashChangeEvent) => {
      path.set(slugify(new URL(event.newURL).hash))
    }

    onMount(() => window.addEventListener('hashchange', handleHashChange))
    onDestroy(() => window.removeEventListener('hashchange', handleHashChange))

    return path
  }

  const path = usePath()

  const currentRoute = derived(
    path,
    ($path) => routes.find((route) => route.path === $path) || routes[0],
  )

  const Component = derived(
    currentRoute,
    ($currentRoute, set: (component: ComponentType) => void) => {
      $currentRoute.module().then((module) => set(module.default))
    },
    null,
  )
</script>

<div>
  <ul>
    {#each routes as route}
      <li>
        <a href={`#${route.path}`}>
          {#if route.path === $currentRoute.path}
            <mark>{route.name}</mark>
          {:else}
            <span>{route.name}</span>
          {/if}
        </a>
      </li>
    {/each}
  </ul>

  {#if Component}
    <svelte:component this={$Component} />
  {/if}
</div>
