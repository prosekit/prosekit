import { onMounted, onUnmounted, ref } from 'vue'

export function useScrolled() {
  const scrolled = ref(false)

  const handler = () => {
    scrolled.value = window.scrollY >= 32
  }

  onMounted(() => {
    handler()

    window.addEventListener('scroll', handler, {
      capture: false,
    })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handler, {
      capture: false,
    })
  })

  return scrolled
}
