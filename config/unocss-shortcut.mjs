// @unocss-include

// A helper function to make Prettier format the class names
function clsx(...parts) {
  return parts
    .map((p) => p || '')
    .filter((p) => p)
    .join(' ')
}

const FLOATING_MENU = clsx(
  'z-10 box-border rounded border border-solid border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-zinc-800',
)

const FLOATING_MENU_ITEM = clsx(
  'box-border cursor-default select-none whitespace-nowrap outline-none aria-selected:bg-gray-200/70 aria-selected:dark:bg-gray-700/70',
)

export const shortcuts = {
  // The outermost container of the editor. It limits the height of the editor.
  EDITOR_VIEWPORT: clsx(
    'box-border max-h-[500px] w-full overflow-y-auto overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700',
  ),

  // Use this class if you have floating menus. We want to scroll menus along with the document.
  EDITOR_DOCUMENT: clsx('relative w-full'),

  // Use this class for the contenteditable element.
  EDITOR_CONTENT: clsx(
    'relative box-border min-h-[250px] w-full overflow-auto px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0',
    '[&_span[data-mention="user"]]:color-blue-500',
    '[&_span[data-mention="tag"]]:color-violet-500',
    '[&_pre]:bg-slate-100',
  ),

  INLINE_MENU: clsx(
    'relative block max-h-[400px] min-w-[120px] space-x-1 overflow-auto whitespace-nowrap rounded p-1',
    FLOATING_MENU,
  ),

  AUTOCOMPLETE_MENU: clsx(
    'relative block max-h-[400px] min-w-[120px] select-none overflow-auto whitespace-nowrap p-1',
    FLOATING_MENU,
  ),

  AUTOCOMPLETE_MENU_ITEM: clsx(
    'relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5',
    FLOATING_MENU_ITEM,
  ),

  LANGUAGE_WRAPPER: clsx(
    'relative top-2 box-border flex h-0 w-full overflow-visible',
  ),

  LANGUAGE_BUTTON: clsx(
    'absolute m-2 box-border cursor-pointer rounded-md border-none bg-transparent px-2 py-0.5 text-xs text-gray-400 outline-none transition-colors hover:bg-gray-500/30 hover:text-gray-800',
  ),

  LANGUAGE_COMBO_BOX: clsx(
    'divide-y-1 w-50 box-border flex flex-col divide-y divide-gray-200 overflow-hidden rounded-md rounded-md border border-solid border-gray-200 bg-white shadow-lg dark:bg-zinc-800',
  ),

  LANGUAGE_COMBO_BOX_INPUT: clsx(
    'box-border flex h-8 w-full rounded-md bg-transparent px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 [&_input]:border-none [&_input]:outline-none',
  ),

  LANGUAGE_COMBO_BOX_LIST: clsx(
    'box-border flex max-h-[300px] flex-col overflow-y-auto overflow-x-hidden border-0 border-solid p-1',
  ),

  LANGUAGE_COMBO_BOX_ITEM: clsx(
    'relative block scroll-my-1 rounded px-2 py-1.5 text-sm',
    FLOATING_MENU_ITEM,
  ),

  TOOLBAR: clsx(
    'z-2 sticky top-0 box-border flex flex-wrap gap-1 bg-gray-100 p-2 dark:bg-zinc-900',
  ),

  TOGGLE_BUTTON: clsx(
    'inline-flex items-center justify-center rounded-md bg-transparent bg-transparent p-2 font-medium outline-none transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:pointer-events-none',
    'hover:opacity-90 disabled:opacity-50 hover:disabled:opacity-50 data-[state=on]:opacity-80',
    'text-gray-500 data-[state=on]:text-black dark:text-gray-400 dark:data-[state=on]:text-white',
    'box-border bg-transparent data-[state=on]:bg-gray-400/20 hover:data-[state=off]:bg-gray-400/20 dark:data-[state=on]:bg-gray-700 dark:hover:data-[state=off]:bg-gray-700/80',
  ),

  IMAGE_UPLOAD_CARD: clsx(
    'w-full max-w-md space-y-6 overflow-auto rounded-lg border border-gray-200 bg-white p-6 text-sm shadow-lg dark:bg-zinc-800',
    FLOATING_MENU,
  ),

  IMAGE_UPLOAD_INPUT: clsx(
    'mt-2 box-border flex h-10 w-full rounded-md border border-gray-200 px-3 py-2 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  ),

  IMAGE_UPLOAD_BUTTON: clsx(
    'dark:text-dark box-border inline-flex h-10 w-full items-center justify-center rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-100',
  ),

  ICON_ITALIC: clsx('i-ci-italic h-5 w-5'),
  ICON_BOLD: clsx('i-ci-bold h-5 w-5'),
  ICON_UNDERLINE: clsx('i-ci-underline h-5 w-5'),
  ICON_STRIKE: clsx('i-ci-strikethrough h-5 w-5'),
  ICON_CODE: clsx('i-ci-code h-5 w-5'),
  ICON_H1: clsx('i-ci-heading-h1 h-5 w-5'),
  ICON_H2: clsx('i-ci-heading-h2 h-5 w-5'),
  ICON_H3: clsx('i-ci-heading-h3 h-5 w-5'),
  ICON_H4: clsx('i-ci-heading-h4 h-5 w-5'),
  ICON_H5: clsx('i-ci-heading-h5 h-5 w-5'),
  ICON_H6: clsx('i-ci-heading-h6 h-5 w-5'),
  ICON_UNDO: clsx('i-ci-arrow-undo-up-left h-5 w-5'),
  ICON_REDO: clsx('i-ci-arrow-undo-up-right h-5 w-5'),
  ICON_IMAGE: clsx('i-ci-image-02 h-5 w-5'),
  ICON_LIST_BULLET: clsx('i-ci-list-ul h-5 w-5'),
  ICON_LIST_ORDERED: clsx('i-ci-list-ol h-5 w-5'),
  ICON_LIST_TASK: clsx('i-ci-list-checklist h-5 w-5'),
  ICON_LIST_TOGGLE: clsx('i-ci-sort-descending h-5 w-5 rotate-180'),
  ICON_CODE_BLOCK: clsx('i-ci-window-code-block h-5 w-5'),
}

/**
 * Replace CSS class names from shortcuts with the actual tailwindcss/unocss
 * class names.
 *
 * @param {string} code - The code to be processed.
 * @returns {string} - The processed code.
 */
export function replaceShortcuts(code) {
  // Sort by length, so that longer shortcuts are replaced first
  const shortcutNames = Object.keys(shortcuts).sort(
    (a, b) => b.length - a.length,
  )

  return (
    code
      // Replace " with ', because some class names contain "
      .replace(
        new RegExp(`\"(${shortcutNames.join('|')})\"`, 'g'),
        (match) => `'` + shortcuts[match.slice(1, -1)] + `'`,
      )
      .replace(
        new RegExp(`\\b(${shortcutNames.join('|')})\\b`, 'g'),
        (match) => shortcuts[match],
      )
  )
}
