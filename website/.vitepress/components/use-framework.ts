import {
  computed,
  onMounted,
  ref,
  type Ref,
} from 'vue'

export function useFramework(frameworks: Ref<string[]>) {
  const selected = ref('')

  onMounted(() => {
    const framework = localStorage.getItem('prosekit-docs-framework')
    if (framework) {
      selected.value = framework
    }
  })

  const framework = computed((): string => {
    const available = frameworks.value
    const value = selected.value || available[0]
    return available.includes(value) ? value : frameworks.value[0]
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
