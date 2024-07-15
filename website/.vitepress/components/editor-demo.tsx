// @unocss-include

import clsx from 'clsx'
import { defineComponent } from 'vue'

import { EditorDynamic } from './editor-dynamic'
import { useDarkMode } from './use-dark-mode'

export const EditorDemo = defineComponent(() => {
  const isDark = useDarkMode()

  return () => (
    <div
      class={clsx(
        'mx-auto mt-10 flex h-[400px] w-[760px] max-w-full flex-col items-center p-4',
        isDark.value ? 'dark' : null,
      )}
    >
      <EditorDynamic />
    </div>
  )
})
