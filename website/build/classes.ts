import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function tw(...args: Array<string | undefined | null | false>): string {
  return twMerge(clsx(...args))
}

// For those elements that need to toggle visibility based on the `data-state`
// attribute, we hide them by default. This ensures that they do not get
// displayed before SSR hydration is complete.
const CSS_DEFAULT_HIDDEN = '[&:not([data-state])]:hidden'

const CSS_FLOATING_MENU = tw(
  'z-10 box-border rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg',
  CSS_DEFAULT_HIDDEN,
)

const CSS_PRESENCE_ANIMATE = tw(
  CSS_DEFAULT_HIDDEN,
  'will-change-transform',
  'data-[state=open]:animate-in',
  'data-[state=closed]:animate-out',
  'data-[state=open]:fade-in-0',
  'data-[state=closed]:fade-out-0',
  'data-[state=open]:zoom-in-95',
  'data-[state=closed]:zoom-out-95',
  'data-[state=open]:animate-duration-150',
  'data-[state=closed]:animate-duration-200',
)

const CSS_POPOVER_ANIMATE = tw(
  CSS_PRESENCE_ANIMATE,
  'data-[side=bottom]:slide-in-from-top-2',
  'data-[side=bottom]:slide-out-to-top-2',
  'data-[side=left]:slide-in-from-right-2',
  'data-[side=left]:slide-out-to-right-2',
  'data-[side=right]:slide-in-from-left-2',
  'data-[side=right]:slide-out-to-left-2',
  'data-[side=top]:slide-in-from-bottom-2',
  'data-[side=top]:slide-out-to-bottom-2',
)

const CSS_FLOATING_MENU_ITEM = tw(
  'box-border cursor-default select-none whitespace-nowrap outline-hidden data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800',
)

const CSS_BUTTON_BASE = tw(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0',
)

const CSS_BUTTON_VARIANT_PRIMARY = tw(
  'bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-50/90',
)

const CSS_BUTTON_VARIANT_SECONDARY = tw(
  'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50 hover:bg-gray-100/80 dark:hover:bg-gray-800/80',
)

const CSS_BUTTON_SIZE_DEFAULT = 'h-10 px-4 py-2'
const CSS_BUTTON_SIZE_SM = 'h-9 px-3'
// const CSS_BUTTON_SIZE_LG = 'h-1 px-8'
const CSS_BUTTON_SIZE_ICON = 'h-10 w-10'

const CSS_INPUT = tw(
  'flex h-9 rounded-md w-full bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition',
  // border
  'border box-border border-gray-200 dark:border-gray-800 border-solid',
  // ring
  'ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0',
  // outline
  'outline-hidden focus-visible:outline-hidden',
  // file
  'file:border-0 file:bg-transparent file:text-sm file:font-medium',
  // disabled
  'disabled:cursor-not-allowed disabled:opacity-50',
)

// The outermost container of the editor. It limits the height of the editor.
export const CSS_EDITOR_VIEWPORT = tw(
  'box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow-sm flex flex-col bg-white dark:bg-gray-950 text-black dark:text-white',
)

// A scrolling container for the editor content and floating menus.
export const CSS_EDITOR_SCROLLING = tw(
  'relative w-full flex-1 box-border overflow-y-scroll',
)

// Use this class for the contenteditable element.
export const CSS_EDITOR_CONTENT = tw(
  // SolidJS will override the class name which removes the ProseMirror class, so we add it back.
  'ProseMirror',
  'box-border min-h-full px-[max(4rem,calc(50%-20rem))] py-8 outline-hidden outline-0',
  '[&_span[data-mention=user]]:text-blue-500',
  '[&_span[data-mention=tag]]:text-violet-500',
)

export const CSS_INLINE_MENU_MAIN = tw(
  CSS_FLOATING_MENU,
  'relative flex min-w-32 space-x-1 overflow-auto whitespace-nowrap rounded-md p-1',
)

export const CSS_INLINE_MENU_LINK = tw(
  CSS_FLOATING_MENU,
  'relative flex flex-col w-xs rounded-lg p-4 gap-y-2 items-stretch',
)

export const CSS_INLINE_MENU_LINK_INPUT = tw(CSS_INPUT)

export const CSS_INLINE_MENU_LINK_REMOVE_BUTTON = tw(
  CSS_BUTTON_BASE,
  CSS_BUTTON_VARIANT_PRIMARY,
  CSS_BUTTON_SIZE_SM,
)

export const CSS_AUTOCOMPLETE_MENU = tw(
  'relative block max-h-100 min-w-60 select-none overflow-auto whitespace-nowrap p-1',
  CSS_FLOATING_MENU,
)

export const CSS_AUTOCOMPLETE_MENU_ITEM = tw(
  'relative flex items-center justify-between min-w-32 scroll-my-1 rounded-sm px-3 py-1.5',
  CSS_FLOATING_MENU_ITEM,
)

export const CSS_AUTOCOMPLETE_MENU_KEYBOARD = tw(
  'text-xs font-mono text-gray-400 dark:text-gray-500',
)

export const CSS_LANGUAGE_WRAPPER = tw(
  'relative mx-2 top-3 h-0 select-none overflow-visible text-xs',
)

export const CSS_LANGUAGE_SELECT = tw(
  'outline-unset focus:outline-unset relative box-border w-auto cursor-pointer select-none appearance-none rounded-sm border-none bg-transparent px-2 py-1 text-xs transition text-(--prosemirror-highlight)',
  // Only visible when hovering the code block
  'opacity-0 hover:opacity-80 [div[data-node-view-root]:hover_&]:opacity-50 hover:[div[data-node-view-root]:hover_&]:opacity-80',
)

const CSS_TOP_BAR = tw(
  'z-2 box-border',
  'border-gray-200 dark:border-gray-800 border-solid border-l-0 border-r-0 border-t-0 border-b',
)

export const CSS_TOOLBAR = tw(CSS_TOP_BAR, 'flex flex-wrap gap-1 p-2 items-center')

export const CSS_TOGGLE_BUTTON = tw(
  'outline-unset focus-visible:outline-unset flex items-center justify-center rounded-md p-2 font-medium transition focus-visible:ring-2 text-sm focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 disabled:pointer-events-none min-w-9 min-h-9',
  'text-gray-900 dark:text-gray-50 disabled:text-gray-900/50 dark:disabled:text-gray-50/50',
  'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 data-[state=on]:bg-gray-200 dark:data-[state=on]:bg-gray-700',
)

export const CSS_IMAGE_UPLOAD_CARD = tw(
  'flex flex-col gap-y-4 p-6 text-sm w-sm',
  CSS_FLOATING_MENU,
  CSS_POPOVER_ANIMATE,
)

export const CSS_IMAGE_UPLOAD_INPUT = tw(CSS_INPUT)

export const CSS_IMAGE_UPLOAD_BUTTON = tw(
  CSS_BUTTON_BASE,
  CSS_BUTTON_VARIANT_PRIMARY,
  CSS_BUTTON_SIZE_DEFAULT,
  'w-full',
)

export const CSS_IMAGE_RESIZEALE = tw(
  'relative flex items-center justify-center box-border overflow-hidden my-2 group',
  'max-h-[600px] max-w-full min-h-[64px] min-w-[64px]',
  'outline-2 outline-transparent data-selected:outline-blue-500 outline-solid',
)

export const CSS_IMAGE_RESIZEALE_IMAGE = tw(
  'h-full w-full max-w-full max-h-full object-contain',
)

export const CSS_IMAGE_RESIZEALE_HANDLE = tw(
  'absolute bottom-0 right-0 rounded-sm m-1.5 p-1 transition',
  'bg-gray-900/30 active:bg-gray-800/60 hover:bg-gray-800/60 text-white/50 active:text-white/80',
  'active:translate-x-0.5 active:translate-y-0.5',
  // Only visible when hovering the image block
  'opacity-0 hover:opacity-100 group-hover:opacity-100 group-data-resizing:opacity-100',
)

export const CSS_IMAGE_UPLOAD_PROGRESS = tw(
  'absolute bottom-0 left-0 m-1 flex content-center items-center gap-2 rounded-sm bg-gray-800/60 p-1.5 text-xs text-white/80 transition',
)

export const CSS_IMAGE_UPLOAD_ERROR = tw(
  'absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center gap-4 bg-gray-200 p-2 text-sm dark:bg-gray-800 @container',
)

export const CSS_IMAGE_UPLOAD_ERROR_MESSAGE = tw('hidden opacity-80 @xs:block')

export const CSS_DROP_CURSOR = tw('transition-all bg-blue-500')
export const CSS_DROP_INDICATOR = tw('z-50 transition-all bg-blue-500')

export const CSS_BLOCK_HANDLE_POPOVER = tw(
  'flex items-center flex-row box-border justify-center transition border-0',
  CSS_PRESENCE_ANIMATE,
)

export const CSS_BLOCK_HANDLE_ADD = tw(
  'flex items-center box-border justify-center h-[1.5em] w-[1.5em] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm text-gray-500/50 dark:text-gray-500/50 cursor-pointer',
)

export const CSS_BLOCK_HANDLE_DRAG = tw(
  'flex items-center box-border justify-center h-[1.5em] w-[1.2em] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm text-gray-500/50 dark:text-gray-500/50 cursor-grab',
)

const CSS_TABLE_HANDLE_BASE = tw(
  'flex items-center box-border justify-center bg-white dark:bg-gray-950 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm text-gray-500/50 dark:text-gray-500/50 border border-gray-200 dark:border-gray-800 border-solid p-0',
  'overflow-hidden',
  'duration-150 transition-discrete transition',
  'data-[state=closed]:opacity-0 starting:opacity-0 opacity-100',
  'data-[state=closed]:scale-95 starting:scale-95 scale-100',
)

export const CSS_TABLE_COLUMN_HANDLE = tw(
  'h-[1.2em] w-[1.5em] translate-y-[80%]',
  CSS_TABLE_HANDLE_BASE,
)

export const CSS_TABLE_ROW_HANDLE = tw(
  'h-[1.5em] w-[1.2em] translate-x-[80%]',
  CSS_TABLE_HANDLE_BASE,
)

export const CSS_TABLE_COLUMN_HANDLE_TRIGGER = tw(
  'flex items-center justify-center',
)

export const CSS_TABLE_ROW_HANDLE_TRIGGER = tw(
  'flex items-center justify-center',
)

export const CSS_TABLE_HANDLE_MENU = tw(
  'relative block max-h-100 min-w-32 select-none overflow-auto whitespace-nowrap p-1',
  CSS_FLOATING_MENU,
)

export const CSS_TABLE_CELL_MENU_ITEM = tw(
  'relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 cursor-default',
  'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50',
  CSS_FLOATING_MENU_ITEM,
)

export const CSS_TABLE_CELL_MENU_ITEM_SHORTCUT = tw(
  'text-xs tracking-widest text-gray-500 dark:text-gray-500',
)

export const CSS_TOOLTIP_TRIGGER = tw('block')
export const CSS_TOOLTIP_CONTENT = tw(
  'z-50 overflow-hidden rounded-md border border-solid bg-gray-900 dark:bg-gray-50 px-3 py-1.5 text-xs text-gray-50 dark:text-gray-900 shadow-xs',
  CSS_POPOVER_ANIMATE,
)

export const CSS_SEARCH = tw(
  CSS_TOP_BAR,
  'grid grid-cols-[min-content_1fr_min-content] gap-2 p-2',
)

export const CSS_SEARCH_ICON_BUTTON = tw(
  CSS_BUTTON_BASE,
  CSS_BUTTON_VARIANT_SECONDARY,
  CSS_BUTTON_SIZE_ICON,
)

export const CSS_SEARCH_TEXT_BUTTON = tw(
  CSS_BUTTON_BASE,
  CSS_BUTTON_VARIANT_SECONDARY,
  CSS_BUTTON_SIZE_DEFAULT,
)

export const CSS_BUTTON_PRIMARY = tw(
  CSS_BUTTON_BASE,
  CSS_BUTTON_VARIANT_PRIMARY,
  CSS_BUTTON_SIZE_DEFAULT,
)

export const CSS_SEARCH_INPUT = tw(CSS_INPUT, 'col-start-2')
export const CSS_SEARCH_CONTROLLER = tw('flex items-center justify-between gap-1')

export const CSS_KEYMAP_FIELDSET = tw(
  'mt-4 box-border flex max-w-full w-full overflow-x-auto border p-4 rounded-md shadow-sm min-w-0',
)

export const CSS_TOGGLE_ROTATE = 'transition-transform data-rotate:rotate-90'

export const CSS_ICON_ITALIC = tw('i-lucide-italic size-5 block')
export const CSS_ICON_BOLD = tw('i-lucide-bold size-5 block')
export const CSS_ICON_UNDERLINE = tw('i-lucide-underline size-5 block')
export const CSS_ICON_STRIKE = tw('i-lucide-strikethrough size-5 block')
export const CSS_ICON_CODE = tw('i-lucide-code size-5 block')
export const CSS_ICON_H1 = tw('i-lucide-heading-1 size-5 block')
export const CSS_ICON_H2 = tw('i-lucide-heading-2 size-5 block')
export const CSS_ICON_H3 = tw('i-lucide-heading-3 size-5 block')
export const CSS_ICON_H4 = tw('i-lucide-heading-4 size-5 block')
export const CSS_ICON_H5 = tw('i-lucide-heading-5 size-5 block')
export const CSS_ICON_H6 = tw('i-lucide-heading-6 size-5 block')
export const CSS_ICON_UNDO = tw('i-lucide-undo-2 size-5 block')
export const CSS_ICON_REDO = tw('i-lucide-redo-2 size-5 block')
export const CSS_ICON_IMAGE = tw('i-lucide-image size-5 block')
export const CSS_ICON_LINK = tw('i-lucide-link size-5 block')
export const CSS_ICON_LIST_BULLET = tw('i-lucide-list size-5 block')
export const CSS_ICON_LIST_ORDERED = tw('i-lucide-list-ordered size-5 block')
export const CSS_ICON_LIST_TASK = tw('i-lucide-list-checks size-5 block')
export const CSS_ICON_LIST_TOGGLE = tw('i-lucide-list-collapse size-5 block')
export const CSS_ICON_LIST_INDENT = tw('i-lucide-indent-increase size-5 block')
export const CSS_ICON_LIST_DEDENT = tw('i-lucide-indent-decrease size-5 block')
export const CSS_ICON_CODE_BLOCK = tw('i-lucide-square-code size-5 block')
export const CSS_ICON_CORNER_HANDLE = tw('i-lucide-arrow-down-right size-4 block')
export const CSS_ICON_LOADER = tw('i-lucide-loader-circle size-4 animate-spin block')
export const CSS_ICON_DRAG_HANDLE = tw('i-lucide-grip-vertical size-5 block')
export const CSS_ICON_PLUS = tw('i-lucide-plus size-5 block')
export const CSS_ICON_SEARCH = tw('i-lucide-search size-5 block')
export const CSS_ICON_CLOSE = tw('i-lucide-x size-5 block')
export const CSS_ICON_ARROW_LEFT = tw('i-lucide-arrow-left size-5 block')
export const CSS_ICON_ARROW_RIGHT = tw('i-lucide-arrow-right size-5 block')
export const CSS_ICON_CHEVRON_RIGHT = tw('i-lucide-chevron-right size-5 block')
export const CSS_ICON_TABLE_COLUMN_HANDLE = tw('i-lucide-grip-horizontal size-5 block')
export const CSS_ICON_TABLE_ROW_HANDLE = tw('i-lucide-grip-vertical size-5 block')
export const CSS_ICON_BLOCKQUOTE = tw('i-lucide-text-quote size-5 block')
export const CSS_ICON_MINUS = tw('i-lucide-minus size-5 block')
export const CSS_ICON_IMAGE_ERROR = tw('i-lucide-image-off size-8 block')
