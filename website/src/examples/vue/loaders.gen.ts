// This file is generated from update-website-pages.ts
import { defineAsyncComponent } from 'vue'

export const loaders = {
  'full': defineAsyncComponent(() => import('prosekit-registry/vue/examples/full').then((m) => m.ExampleEditor)),
  'minimal': defineAsyncComponent(() => import('prosekit-registry/vue/examples/minimal').then((m) => m.ExampleEditor)),
}
