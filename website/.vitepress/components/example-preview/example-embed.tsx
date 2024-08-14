import { defineComponent, effect, ref } from 'vue'

import { useDarkMode } from '../use-dark-mode'

import { getExampleUrl } from './example-url'

export const ExampleEmbed = defineComponent<{
  example: string
}>(
  (props) => {
    const iframeRef = ref<HTMLIFrameElement>()
    const iframeLoaded = ref(false)
    const isDark = useDarkMode()

    effect(() => {
      const iframe = iframeRef.value
      iframe?.addEventListener(
        'load',
        () => {
          // We add a small delay here because the editor inside the iframe
          // is lazy loaded
          setTimeout(() => {
            iframeLoaded.value = true
          }, 50)
        },
        { once: true },
      )
    })

    effect(() => {
      const dark = isDark.value
      const iframe = iframeRef.value

      if (iframeLoaded.value) {
        iframe?.contentWindow?.postMessage(
          { type: 'astrobook:set-theme', theme: dark ? 'dark' : 'light' },
          iframe.src,
        )
      }
    })

    return () => {
      return (
        <iframe
          ref={iframeRef}
          style={{
            opacity: iframeLoaded.value ? '1' : '0',
          }}
          src={getExampleUrl(props.example)}
          class="h-[300px] w-full overflow-hidden transition-opacity"
        />
      )
    }
  },
  {
    props: ['example'],
  },
)
