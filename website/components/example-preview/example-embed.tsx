import { defineComponent, effect, ref } from 'vue'

import { useDarkMode } from '../use-dark-mode'

export const ExampleEmbed = defineComponent<{
  framework: string
  story: string
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
          { type: 'DARK_MODE', value: dark },
          iframe.src,
        )
      }
    })

    return () => {
      const src =
        import.meta.env.MODE === 'development'
          ? `http://localhost:4321/playground/dist/${props.framework}-${props.story}`
          : `/playground/dist/${props.framework}-${props.story}/index.html`
      return (
        <iframe
          key={src}
          ref={iframeRef}
          style={{
            opacity: iframeLoaded.value ? '1' : '0',
          }}
          src={src}
          class="h-[300px] w-full overflow-hidden transition-opacity"
        />
      )
    }
  },
  {
    props: ['framework', 'story'],
  },
)
