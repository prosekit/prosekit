import ListboxStory from './listbox.astro'

export default {
  component: ListboxStory,
}

export const Basic = {
  args: { story: 'basic' },
}

export const Multiple = {
  args: { story: 'multiple' },
}

export const Filter = {
  args: { story: 'filter' },
}
