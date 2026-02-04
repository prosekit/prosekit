import { defineReadonly } from 'prosekit/extensions/readonly'
import { useExtension } from 'prosekit/vue'
import { computed, ref } from 'vue'

export function useReadonly() {
  const readonly = ref(true)

  const extension = computed(() => {
    return readonly.value ? defineReadonly() : null
  })
  useExtension(extension)

  function setReadonly(value: boolean) {
    readonly.value = value
  }

  return { readonly, setReadonly }
}
