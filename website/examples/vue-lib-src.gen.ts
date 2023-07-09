/* eslint-disable */

// This file is generated from gen-example-markdown.ts

import { defineComponent, h } from 'vue'
import { SandpackBlock } from '../components/sandpack-block'

import file4290348798 from '../../examples/vue-lib/index.html?raw'
import file287687199 from '../../examples/vue-lib/main.ts?raw'
import file3903849209 from '../../examples/vue-lib/package.json?raw'
import file3224753694 from '../../examples/vue-lib/tsconfig.json?raw'
import file3757056628 from '../../examples/vue-lib/uno.config.ts?raw'
import file685975072 from '../../examples/vue-lib/vite.config.ts?raw'

const files = {
  '/index.html': { hidden: false, code: file4290348798 },
  '/main.ts': { hidden: false, code: file287687199 },
  '/package.json': { hidden: false, code: file3903849209 },
  '/tsconfig.json': { hidden: false, code: file3224753694 },
  '/uno.config.ts': { hidden: false, code: file3757056628 },
  '/vite.config.ts': { hidden: false, code: file685975072 }
}

export const StoryBlock = defineComponent(() => {
  return () => h(SandpackBlock, { files })
})
