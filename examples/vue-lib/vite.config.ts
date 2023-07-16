import { resolve } from 'node:path'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      rollupTypes: true,
    }),
  ],
  build: {
    minify: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'prosekit-example-vue-lib',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'prosekit', /^prosekit\/.*/],
    },
  },
})
