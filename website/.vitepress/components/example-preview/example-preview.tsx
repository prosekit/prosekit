import clsx from 'clsx/lite'
import { computed, defineComponent, effect, onMounted, ref } from 'vue'

import { FrameworkMenu } from '../framework-menu'
import { Switch } from '../switch/switch'
import { useFramework } from '../use-framework'

import { ExampleDownloadButton } from './example-download-button'
import { ExampleEmbed } from './example-embed'
import { ExampleForkMenu } from './example-fork-menu'

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
          'my-8 flex w-full flex-col rounded-md bg-[--vp-code-tab-bg] sm:overflow-hidden',

          // Reduce the gap between the preview embed and the code block
          `[&_.vp-code-group]:-mt-2 `,

          // Remove the bottom margin on the active code block
          `[&_div.vp-adaptive-theme.active]:mb-0`,

          // Don't limit height on example page
          isExamplePage.value ? '' : '[&_.shiki]:max-h-[calc(100vh-200px)]',
        )}
      >
        <div class="mx-[-24px] flex justify-end bg-[--vp-code-tab-bg] px-2 pb-1 pt-2 sm:mx-0 space-x-2">
          <FrameworkMenu
            framework={framework.value}
            onChange={onFrameworkChange}
            frameworks={frameworks.value}
          />
          <Switch
            checked={showCode.value}
            onChange={(value) => (showCode.value = value)}
          >
            Code
          </Switch>
          <div class="flex-1"></div>
          <ExampleDownloadButton example={framework.value + '-' + props.name} />
          <ExampleForkMenu example={framework.value + '-' + props.name} />
        </div>

        <div class="mx-[-24px] bg-[--vp-code-tab-bg] px-1 pb-2 pt-0 sm:mx-0">
          <ExampleEmbed
            example={framework.value + '-' + props.name}
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

function useIsExamplePage() {
  const isExamplePage = ref(false)

  onMounted(() => {
    isExamplePage.value =
      typeof window !== 'undefined' &&
      window.location.pathname.includes('/examples/')
  })

  return isExamplePage
}
