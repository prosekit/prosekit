import MenuStory from './menu.astro'

export default {
  component: MenuStory,
}

export const Basic = {
  args: { story: 'basic' },
}

export const DisabledItems = {
  args: { story: 'disabled-items' },
}

export const Submenu = {
  args: { story: 'submenu' },
}

export const NestedSubmenu = {
  args: { story: 'nested-submenu' },
}
