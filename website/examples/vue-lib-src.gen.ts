/* eslint-disable */

// This file is generated from gen-example-markdown.ts

import { defineComponent, h } from 'vue'
import { SandpackBlock } from '../components/sandpack-block'

import file4290348798 from '../../examples/vue-lib/index.html?raw'
import file287687199 from '../../examples/vue-lib/main.ts?raw'
import file3903849209 from '../../examples/vue-lib/package.json?raw'
import file3297326623 from '../../examples/vue-lib/postcss.config.js?raw'
import file3224753694 from '../../examples/vue-lib/tsconfig.json?raw'
import file685975072 from '../../examples/vue-lib/vite.config.ts?raw'

const files = {
  '/index.html': { hidden: true, code: file4290348798 },
  '/main.ts': { hidden: true, code: file287687199 },
  '/package.json': { hidden: true, code: file3903849209 },
  '/postcss.config.js': { hidden: true, code: file3297326623 },
  '/tsconfig.json': { hidden: true, code: file3224753694 },
  '/vite.config.ts': { hidden: true, code: file685975072 }
}

export const StoryBlock = defineComponent(() => {
  return () => h(SandpackBlock, { files })
})
