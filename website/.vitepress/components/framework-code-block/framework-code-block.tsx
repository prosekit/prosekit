import clsx from 'clsx/lite'
import { computed, defineComponent } from 'vue'

import { FrameworkMenu } from '../framework-menu'
import { useFramework } from '../use-framework'

export const FrameworkCodeBlock = defineComponent((props, { slots }) => {
  const frameworks = computed(() => Object.keys(slots))
  const { framework, onFrameworkChange } = useFramework(frameworks)

  return () => (
    <div
      class={clsx(
        'relative [&_.tabs]:p-l-[120px]!',

        // Remove the top margin from the code block
        `[&_.vp-code-group]:mt-0 `,

        // Remove the bottom margin from the code block
        `[&_.vp-adaptive-theme]:mb-0!`,

        'my-8 flex w-full flex-col rounded-md bg-[--vp-code-tab-bg] sm:overflow-hidden',
      )}
    >
      <div class="absolute top-0 z-10 mx-[-24px] flex justify-start bg-[--vp-code-tab-bg] px-2 pb-1 pt-2 sm:mx-0 space-x-2">
        <FrameworkMenu
          framework={framework.value}
          onChange={onFrameworkChange}
          frameworks={frameworks.value}
        />
      </div>

      {slots[framework.value]?.()}
    </div>
  )
})
