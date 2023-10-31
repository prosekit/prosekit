// @unocss-include

function clsx(s) {
  return s
}

export const shortcuts = {
  EDITOR_CONTENT: clsx(
    'relative box-border h-[250px] w-full overflow-auto rounded-md p-4 outline outline-2',
  ),

  SLASH_MENU: clsx(
    'relative block max-h-[400px] min-w-[120px] select-none overflow-auto whitespace-nowrap rounded border border-solid border-gray-500 bg-white dark:bg-zinc-800',
  ),

  SLASH_MENU_ITEM: clsx(
    'relative block min-w-[64px] cursor-default select-none whitespace-nowrap p-2 data-[selected]:bg-gray-200 data-[selected]:dark:bg-gray-700',
  ),

  LANGUAGE_WRAPPER: clsx('relative top-5 flex h-0 w-full overflow-visible'),

  LANGUAGE_BUTTON: clsx(
    'absolute mx-[0.5em] box-border cursor-pointer rounded-md border-none bg-transparent px-2 py-0.5 text-xs text-gray-400 outline-none hover:bg-gray-500/30',
  ),

  LANGUAGE_COMBO_BOX: clsx(
    'divide-y-1 w-50 box-border flex flex-col divide-y divide-gray-200 overflow-hidden rounded-md rounded-md border border-solid border-gray-200 bg-white shadow-lg dark:bg-zinc-800',
  ),

  LANGUAGE_COMBO_BOX_INPUT: clsx(
    'flex h-8 w-full rounded-md bg-transparent px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 [&_input]:border-none [&_input]:outline-none',
  ),

  LANGUAGE_COMBO_BOX_LIST: clsx(
    'flex max-h-[300px] flex-col overflow-y-auto overflow-x-hidden border-0 border-solid px-1 py-2',
  ),

  LANGUAGE_COMBO_BOX_ITEM: clsx(
    'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-gray-100 aria-selected:text-gray-900',
  ),

  TOOLBAR: clsx('z-2 my-2 grid auto-cols-max grid-flow-col gap-1'),

  TOGGLE_BUTTON: clsx(
    'inline-flex h-11 w-11 items-center justify-center rounded-md bg-transparent font-medium outline-none transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:text-blue-600 hover:data-[state=on]:text-blue-600 dark:hover:bg-gray-800 dark:focus-visible:ring-gray-300 dark:data-[state=on]:text-blue-500 hover:dark:data-[state=on]:text-blue-500',
  ),

  IMAGE_UPLOAD_CARD: clsx(
    'w-full max-w-md space-y-6 rounded-lg border border-gray-200 bg-white p-6 text-sm shadow-lg dark:bg-zinc-800',
  ),

  IMAGE_UPLOAD_INPUT: clsx(
    'mt-2 flex h-10 w-full rounded-md border border-gray-200 px-3 py-2 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  ),

  IMAGE_UPLOAD_BUTTON: clsx(
    'dark:text-dark inline-flex h-10 w-full items-center justify-center rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-100',
  ),

  ICON_ITALIC: 'i-ci-italic w-4 h-4',
  ICON_BOLD: 'i-ci-bold w-4 h-4',
  ICON_H1: 'i-ci-heading-h1 w-4 h-4',
  ICON_H2: 'i-ci-heading-h2 w-4 h-4',
  ICON_H3: 'i-ci-heading-h3 w-4 h-4',
  ICON_H4: 'i-ci-heading-h4 w-4 h-4',
  ICON_H5: 'i-ci-heading-h5 w-4 h-4',
  ICON_H6: 'i-ci-heading-h6 w-4 h-4',
  ICON_UNDO: 'i-ci-arrow-undo-up-left w-4 h-4',
  ICON_REDO: 'i-ci-arrow-undo-up-right w-4 h-4',
  ICON_IMAGE: 'i-ci-image-02 w-4 h-4',
  ICON_LIST_BULLET: 'i-ci-list-ul w-4 h-4',
  ICON_LIST_ORDERED: 'i-ci-list-ol w-4 h-4',
  ICON_LIST_TASK: 'i-ci-list-checklist w-4 h-4',
  ICON_LIST_TOGGLE: 'i-ci-sort-descending w-4 h-4 rotate-180',
}
