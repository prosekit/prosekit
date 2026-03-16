import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import astrobook from 'astrobook'

export default defineConfig({
  integrations: [
    astrobook({
      css: ['./src/styles/tailwind.css'],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      conditions: ['aria-ui-dev'],
    },
  },
})
