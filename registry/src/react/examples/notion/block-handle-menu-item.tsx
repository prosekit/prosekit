import { Menu } from '@base-ui/react/menu'

interface Props {
  children: React.ReactNode
  onClick: () => void
}

export default function BlockHandleMenuItem(props: Props) {
  return (
    <Menu.Item
      onClick={props.onClick}
      className="flex cursor-default py-2 pr-8 pl-4 text-sm leading-4 outline-none select-none data-highlighted:relative data-highlighted:z-0 data-highlighted:text-gray-50 data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-sm data-highlighted:before:bg-gray-900"
    >
      {props.children}
    </Menu.Item>
  )
}
