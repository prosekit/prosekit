import clsx from 'clsx'
import {
  computed,
  defineComponent,
  effect,
  onMounted,
  ref,
  type Ref,
} from 'vue'

import { Switch } from '../switch/switch'

import { ExampleEmbed } from './example-embed'
import { ExampleFrameworkMenu } from './example-framework-menu'

export const ExamplePreview = defineComponent<{
  name: string
}>(
  (props, { slots }) => {
    const showCode = ref(false)
    const frameworks = computed(() => Object.keys(slots))
    const divRef = ref<HTMLElement>()
    const { framework, onFrameworkChange } = useFramework(frameworks)
    const isExamplePage = useIsExamplePage()

    effect(() => {
      if (showCode.value && divRef.value && !isExamplePage.value) {
        setTimeout(() => {
          const codeBlock = divRef.value?.querySelector('.vp-code-group')
          codeBlock?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }, 150)
      }
    })

    return () => (
      <div
        ref={divRef}
        class={clsx(
          'my-8 flex w-full flex-col content-stretch overflow-hidden rounded-md bg-[--vp-code-tab-bg] [&_.vp-code-group]:mt-0',

          // Don't limit height on example page
          isExamplePage.value ? '' : '[&_.shiki]:max-h-[calc(100vh-200px)]',
        )}
      >
        <div class="mx-[-24px] flex justify-end space-x-2 bg-[--vp-code-tab-bg] p-2 sm:mx-0">
          <Switch
            checked={showCode.value}
            onChange={(value) => (showCode.value = value)}
          >
            Code
          </Switch>
          <ExampleFrameworkMenu
            framework={framework.value}
            onChange={onFrameworkChange}
            frameworks={frameworks.value}
          />
          {/* TODO: enable ExampleOpenMenu */}
          {/* <ExampleOpenMenu example={framework.value + '-' + props.name} /> */}
        </div>

        <div class="mx-[-24px] bg-[--vp-code-tab-bg] px-2 pb-2 sm:mx-0">
          <ExampleEmbed
            story={props.name}
            framework={framework.value}
            key={framework.value + '-' + props.name}
          />
        </div>

        {showCode.value && slots[framework.value]?.()}
      </div>
    )
  },
  {
    props: ['name'],
  },
)

function useFramework(frameworks: Ref<string[]>) {
  const selected = ref('')

  onMounted(() => {
    const framework = localStorage.getItem('prosekit-docs-framework')
    if (framework) {
      selected.value = framework
    }
  })

  const framework = computed(() => {
    const value = selected.value || frameworks.value[0]
    return frameworks.value.includes(value) ? value : frameworks.value[0]
  })

  const onFrameworkChange = (framework: string) => {
    localStorage.setItem('prosekit-docs-framework', framework)
    selected.value = framework
  }

  return {
    framework,
    onFrameworkChange,
  }
}

function useIsExamplePage() {
  const isExamplePage = ref(false)

  onMounted(() => {
    isExamplePage.value =
      typeof window !== 'undefined' &&
      window.location.pathname.includes('/examples/')
  })

  return isExamplePage
}
