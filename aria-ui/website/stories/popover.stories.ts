import PopoverStory from './popover.astro'

export default {
  component: PopoverStory,
}

export const Basic = {
  args: { story: 'basic' },
}

export const DefaultOpen = {
  args: { story: 'default-open' },
}

export const OpenOnHover = {
  args: { story: 'open-on-hover' },
}
