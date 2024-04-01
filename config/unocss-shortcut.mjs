// @unocss-include

const dynamicShortcuts = [
  ['background', 'white', 'neutral-900'],
  ['foreground', 'neutral-900', 'zinc-50'],
  ['primary', 'zinc-900', 'zinc-50'],
  ['primary-foreground', 'zinc-50', 'zinc-900'],
  ['secondary', 'zinc-100', 'zinc-800'],
  ['secondary-foreground', 'zinc-900', 'zinc-50'],
  ['muted', 'zinc-100', 'zinc-800'],
  ['muted-foreground', 'zinc-500', 'zinc-500'],
  ['accent', 'gray-200', 'gray-700'],
  ['accent-foreground', 'zinc-900', 'zinc-50'],
  ['destructive', 'red-500', 'red-900'],
  ['destructive-foreground', 'zinc-50', 'zinc-50'],
  ['border', 'zinc-200', 'zinc-800'],
  ['input', 'zinc-200', 'zinc-800'],
  ['ring', 'zinc-900', 'zinc-300'],
].map((colors) => createColorShortcuts(...colors))

function replaceDynamicShortcuts(text) {
  if (typeof text !== 'string') {
    throw new Error('Expects a string')
  }

  if (text.includes(' ')) {
    throw new Error(`Expects a single class name. Received "${text}"`)
  }

  for (let [pattern, replacer] of dynamicShortcuts) {
    pattern.lastIndex = 0
    let match = text.match(pattern)
    pattern.lastIndex = 0
    if (match) {
      return replacer(match)
    }
  }
  return text
}

function clsx(...parts) {
  return parts
    .map((p) => p || '')
    .map((p) => p.split(' '))
    .flat()
    .filter((p) => p)
    .map(replaceDynamicShortcuts)
    .join(' ')
}

const FLOATING_MENU = clsx(
  'z-10 box-border rounded-lg border border-border bg-background shadow-lg',
)

const POPOVER_ANIMATE = clsx(
  'data-[state=open]:animate-in',
  'data-[state=closed]:animate-out',
  'data-[state=closed]:fade-out-0',
  'data-[state=open]:fade-in-0',
  'data-[state=closed]:zoom-out-95',
  'data-[state=open]:zoom-in-95',
  'data-[state=open]:animate-duration-150',
  'data-[state=closed]:animate-duration-200',
  'data-[side=bottom]:slide-in-from-top-2',
  'data-[side=left]:slide-in-from-right-2',
  'data-[side=right]:slide-in-from-left-2',
  'data-[side=top]:slide-in-from-bottom-2',
)

const FLOATING_MENU_ITEM = clsx(
  'box-border cursor-default select-none whitespace-nowrap outline-none aria-selected:bg-secondary',
)

const BUTTON_BASE = clsx(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
)

const BUTTON_VARIANT_PRIMARY =
  'bg-primary text-primary-foreground hover:bg-primary/90'
const BUTTON_VARIANT_SECONDARY =
  'bg-secondary text-secondary-foreground hover:bg-secondary/80'

const BUTTON_SIZE_DEFAULT = 'h-10 px-4 py-2'
const BUTTON_SIZE_SM = 'h-9 px-3'
const BUTTON_SIZE_LG = 'h-1 px-8'
const BUTTON_SIZE_ICON = 'h-10 w-10'

const INPUT = clsx(
  'flex h-10 rounded-md w-full bg-background px-3 py-2 text-sm placeholder:text-muted-foreground transition',
  // border
  'border box-border border-border border-solid',
  // ring
  'ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0',
  // outline
  'outline-none focus-visible:outline-none',
  // file
  'file:border-0 file:bg-transparent file:text-sm file:font-medium',
  // disabled
  'disabled:cursor-not-allowed disabled:opacity-50',
)

const staticShortcuts = {
  // The outermost container of the editor. It limits the height of the editor.
  EDITOR_VIEWPORT: clsx(
    'box-border h-full w-full min-h-32 overflow-y-auto overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700',
  ),

  // Use this class if you have floating menus. We want to scroll menus along with the document.
  EDITOR_DOCUMENT: clsx('relative flex min-h-full w-full flex-col'),

  // Use this class for the contenteditable element.
  EDITOR_CONTENT: clsx(
    'dark:bg-zinc-900 relative box-border min-h-full flex-1 overflow-auto bg-background px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0',
    '[&_span[data-mention="user"]]:color-blue-500',
    '[&_span[data-mention="tag"]]:color-violet-500',
    '[&_pre]:color-white [&_pre]:bg-zinc-800',
  ),

  INLINE_MENU_MAIN: clsx(
    FLOATING_MENU,

    'relative block min-w-[120px] space-x-1 overflow-auto whitespace-nowrap rounded-md p-1',
  ),

  INLINE_MENU_LINK: clsx(
    FLOATING_MENU,
    'relative flex flex-col w-xs rounded-lg p-4 gap-y-2 items-stretch',
  ),

  INLINE_MENU_LINK_INPUT: clsx(INPUT),

  INLINE_MENU_LINK_REMOVE_BUTTON: clsx(
    BUTTON_BASE,
    BUTTON_VARIANT_PRIMARY,
    BUTTON_SIZE_SM,
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
    'relative left-2 top-3 h-0 select-none overflow-visible',
  ),

  LANGUAGE_SELECT: clsx(
    'outline-unset focus:outline-unset relative box-border w-auto cursor-pointer select-none appearance-none rounded border-none bg-transparent px-2 py-1 text-xs transition color-white',

    // Only visible when hovering the code block
    'opacity-0 hover:opacity-80 [div[data-node-view-root]:hover_&]:opacity-50 [div[data-node-view-root]:hover_&]:hover:opacity-80',
  ),

  TOOLBAR: clsx(
    'z-2 sticky top-0 box-border flex flex-wrap gap-1 p-2 items-center bg-background',
    'border-border border-solid border-l-0 border-r-0 border-t-0 border-b',
  ),

  TOGGLE_BUTTON: clsx(
    'outline-unset focus-visible:outline-unset inline-flex items-center justify-center rounded-md p-2 font-medium transition focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none',
    'disabled:opacity-50 hover:disabled:opacity-50',
    'bg-transparent hover:bg-secondary data-[state=on]:bg-accent/60',
  ),

  IMAGE_UPLOAD_CARD: clsx(
    'flex flex-col gap-y-4 p-6 text-sm w-sm',
    FLOATING_MENU,
    POPOVER_ANIMATE,
  ),

  IMAGE_UPLOAD_INPUT: clsx(INPUT),

  IMAGE_UPLOAD_BUTTON: clsx(
    BUTTON_BASE,
    BUTTON_VARIANT_PRIMARY,
    BUTTON_SIZE_DEFAULT,
    'w-full',
  ),

  IMAGE_RESIZEALE: clsx('relative block max-h-[600px] max-w-full'),

  IMAGE_RESIZEALE_IMAGE: clsx('h-full w-full object-contain'),

  IMAGE_RESIZEALE_HANDLE: clsx(
    'absolute bottom-0 right-0 rounded mb-1.5 mr-1.5 p-0.5 transition bg-gray-900/30 active:bg-gray-800/60 text-white/50 active:text-white/80 active:translate-x-0.5 active:translate-y-0.5',
    // Only visible when hovering the image block
    'opacity-0 hover:opacity-100 [prosekit-resizable:hover_&]:opacity-100 [prosekit-resizable[data-resizing]_&]:opacity-100',
  ),

  DROP_CURSOR: clsx('transition-all bg-blue-500'),

  BLOCK_HANDLE: clsx(
    'flex items-center box-border justify-center my-[0.5em] h-[1.5em] w-[1.2em] hover:bg-secondary rounded text-muted-foreground/50 transition-colors',
  ),

  ICON_ITALIC: clsx('i-lucide-italic h-5 w-5'),
  ICON_BOLD: clsx('i-lucide-bold h-5 w-5'),
  ICON_UNDERLINE: clsx('i-lucide-underline h-5 w-5'),
  ICON_STRIKE: clsx('i-lucide-strikethrough h-5 w-5'),
  ICON_CODE: clsx('i-lucide-code h-5 w-5'),
  ICON_H1: clsx('i-lucide-heading-1 h-5 w-5'),
  ICON_H2: clsx('i-lucide-heading-2 h-5 w-5'),
  ICON_H3: clsx('i-lucide-heading-3 h-5 w-5'),
  ICON_H4: clsx('i-lucide-heading-4 h-5 w-5'),
  ICON_H5: clsx('i-lucide-heading-5 h-5 w-5'),
  ICON_H6: clsx('i-lucide-heading-6 h-5 w-5'),
  ICON_UNDO: clsx('i-lucide-undo-2 h-5 w-5'),
  ICON_REDO: clsx('i-lucide-redo-2 h-5 w-5'),
  ICON_IMAGE: clsx('i-lucide-image h-5 w-5'),
  ICON_LINK: clsx('i-lucide-link h-5 w-5'),
  ICON_LIST_BULLET: clsx('i-lucide-list h-5 w-5'),
  ICON_LIST_ORDERED: clsx('i-lucide-list-ordered h-5 w-5'),
  ICON_LIST_TASK: clsx('i-lucide-list-checks h-5 w-5'),
  ICON_LIST_TOGGLE: clsx('i-lucide-list-collapse h-5 w-5'),
  ICON_CODE_BLOCK: clsx('i-lucide-square-code h-5 w-5'),
  ICON_CORNER_HANDLE: clsx('i-lucide-arrow-down-right h-4 w-4'),
  ICON_DRAG_HANDLE: clsx('i-lucide-grip-vertical h-5 w-5'),
}

/**
 * Replace color aliases.
 */
function createColorShortcuts(name, color, darkColor) {
  let pattern = new RegExp(
    `^(.*(?:text|bg|border|ring|ring-offset))-(${name})(\\/.*)?$`,
    'g',
  )

  return [
    pattern,
    (match) => {
      let input = String(match[0])

      if (input.includes(' ')) {
        throw new Error(`Expects a single class name. Received "${input}"`)
      }

      return String(match[0]).replace(
        pattern,
        `$1-${color}$3 dark:$1-${darkColor}$3`,
      )
    },
  ]
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
  const shortcutNames = Object.keys(staticShortcuts).sort(
    (a, b) => b.length - a.length,
  )

  return (
    code
      // Replace " with ', because some class names contain "
      .replace(
        new RegExp(`\"(${shortcutNames.join('|')})\"`, 'g'),
        (match) => `'` + staticShortcuts[match.slice(1, -1)] + `'`,
      )
      .replace(
        new RegExp(`\\b(${shortcutNames.join('|')})\\b`, 'g'),
        (match) => staticShortcuts[match],
      )
  )
}

export const shortcuts = [staticShortcuts, ...dynamicShortcuts]
