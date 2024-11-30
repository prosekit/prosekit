import {
  defineComponent,
  h,
} from 'vue'

export const Home = defineComponent(() => {
  return () =>
    h(
      'div',
      { class: 'mx-auto max-w-screen-lg px-3 overflow-hidden' },
      h(HeroFrameworks),
    )
})

export const HeroFrameworks = defineComponent(() => {
  const frameworks = [
    { name: 'React', icon: 'i-logos-react' },
    { name: 'Vue', icon: 'i-logos-vue' },
    { name: 'Preact', icon: 'i-logos-preact' },
    { name: 'Svelte', icon: 'i-logos-svelte-icon' },
    { name: 'Solid', icon: 'i-logos-solidjs-icon' },
    { name: 'Lit', icon: 'i-logos-lit-icon' },
  ] as const

  return () => [
    h(HeroTitle, {
      // Make some animation when the framework name changes
      class: 'transition duration-500 ease-in-out',
      value: `It supports your favorite Front-end Framework`,
    }),

    h(
      'div',
      {
        class: [
          'grid grid-cols-3 md:grid-cols-6 mt-20 items-center justify-center',
        ],
      },
      frameworks.map((framework) =>
        h(
          'div',
          {
            class: ['flex flex-col items-center gap-4'],
          },
          [
            h('div', {
              class: [framework.icon, 'w-20 h-20'],
            }),
            h('div', framework.name),
          ],
        )
      ),
    ),
  ]
})

function HeroTitle(props: { value: string }) {
  return h('h2', { class: 'text-4xl font-bold' }, props.value)
}
