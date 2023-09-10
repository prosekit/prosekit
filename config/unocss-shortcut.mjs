// @unocss-include

export const shortcuts = {
  EDITOR_CONTENT:
    'h-[250px] box-border w-full overflow-auto rounded-md p-4 outline outline-2 relative',

  SLASH_MENU:
    'relative max-h-[400px] min-w-[120px] select-none overflow-auto whitespace-nowrap rounded bg-white dark:bg-zinc-800 border border-solid border-gray-500',

  SLASH_MENU_ITEM:
    'relative min-w-[64px] cursor-default select-none whitespace-nowrap p-2 data-[selected]:bg-gray-200 data-[selected]:dark:bg-gray-700',

  LANGUAGE_BUTTON:
    'rounded-md text-xs px-2 py-0.5 bg-transparent hover:bg-gray-500/30 border-none text-gray-400 outline-none cursor-pointer box-border m-2',

  LANGUAGE_COMBO_BOX:
    'flex flex-col overflow-hidden rounded-md  bg-white dark:bg-zinc-800 rounded-md   shadow-lg border border-solid border-gray-200 divide-y divide-y-1 divide-gray-200 box-border w-50',

  LANGUAGE_COMBO_BOX_INPUT:
    'flex h-8 w-full rounded-md bg-transparent text-sm [&_input]:outline-none [&_input]:border-none disabled:cursor-not-allowed disabled:opacity-50 px-4 py-2',

  LANGUAGE_COMBO_BOX_LIST:
    'max-h-[300px] overflow-y-auto overflow-x-hidden border-solid border-0 px-1 py-2 flex flex-col',

  LANGUAGE_COMBO_BOX_ITEM:
    'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-gray-100 aria-selected:text-gray-900',

  TOGGLE_BUTTON:
    'inline-flex items-center justify-center rounded-md font-medium ring-offset-white transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:text-blue-600 hover:data-[state=on]:text-blue-600 dark:ring-offset-gray-950 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-300 dark:data-[state=on]:text-blue-500 hover:dark:data-[state=on]:text-blue-500 bg-transparent h-10 px-3',

  ICON_ITALIC: 'i-ci:italic',
  ICON_BOLD: 'i-ci:bold',
  ICON_H1: 'i-ci:heading-h1',
  ICON_H2: 'i-ci:heading-h2',
  ICON_H3: 'i-ci:heading-h3',
  ICON_H4: 'i-ci:heading-h4',
  ICON_H5: 'i-ci:heading-h5',
  ICON_H6: 'i-ci:heading-h6',
}
