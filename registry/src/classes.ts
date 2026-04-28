import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...args: Array<string | undefined | null | false>): string {
  return twMerge(clsx(...args))
}

const CSS_BUTTON_BASE = cn(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0',
)
const CSS_BUTTON_VARIANT_PRIMARY = cn(
  'bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-50/90',
)
const CSS_BUTTON_VARIANT_SECONDARY = cn(
  'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50 hover:bg-gray-100/80 dark:hover:bg-gray-800/80',
)

const CSS_BUTTON_SIZE_DEFAULT = 'h-10 px-4 py-2'
const CSS_BUTTON_SIZE_SM = 'h-9 px-3'
const CSS_BUTTON_SIZE_ICON = 'h-10 w-10'

const CSS_INPUT = cn(
  'flex h-9 rounded-md w-full bg-[canvas] px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition',
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

const CSS_POSITIONER = cn(
  'block overflow-visible w-min h-min z-50',
  'ease-out transition-transform duration-100 motion-reduce:transition-none',
)
const CSS_POPUP = cn(
  'flex box-border',
  'origin-(--transform-origin)',
  'transition-[opacity,scale] transition-discrete motion-reduce:transition-none',
  'duration-100 data-[state=closed]:duration-150',
  'data-[state=closed]:opacity-0 starting:opacity-0',
  'data-[state=closed]:scale-95 starting:scale-95',
)
const CSS_MENU_POPUP = cn(
  CSS_POPUP,
  'duration-40',
  'rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg',
  'bg-[canvas]',
)
const CSS_MENU_ITEM = cn(
  'box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800',
)

export const CSS_MINIMAL_EDITOR = cn(
  'outline-solid p-4',
)

// The outermost container of the editor. It limits the height of the editor.
export const CSS_EDITOR_VIEWPORT = cn(
  'box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow-sm flex flex-col bg-[canvas] text-black dark:text-white',
)

// A scrolling container for the editor content and floating menus.
export const CSS_EDITOR_SCROLLING = cn(
  'relative w-full flex-1 box-border overflow-y-auto',
)

// Use this class for the contenteditable element.
export const CSS_EDITOR_CONTENT = cn(
  // SolidJS will override the class name which removes the ProseMirror class, so we add it back.
  'ProseMirror',
  'box-border min-h-full px-[max(4rem,calc(50%-20rem))] py-8 outline-hidden outline-0',
  '[&_span[data-mention=user]]:text-blue-500',
  '[&_span[data-mention=tag]]:text-violet-500',
)

export const CSS_INLINE_MENU_POSITIONER = CSS_POSITIONER

export const CSS_INLINE_MENU_MAIN_POPUP = cn(
  CSS_MENU_POPUP,
  'relative flex min-w-32 space-x-1 overflow-auto whitespace-nowrap rounded-lg p-1',
)

export const CSS_INLINE_MENU_LINK_POPUP = cn(
  CSS_MENU_POPUP,
  'relative flex flex-col w-xs rounded-lg p-4 gap-y-2 items-stretch',
)

export const CSS_INLINE_MENU_LINK_POPUP_INPUT = cn(CSS_INPUT)

export const CSS_INLINE_MENU_LINK_POPUP_REMOVE_BUTTON = cn(
  CSS_BUTTON_BASE,
  CSS_BUTTON_VARIANT_PRIMARY,
  CSS_BUTTON_SIZE_SM,
)

export const CSS_AUTOCOMPLETE_POSITIONER = CSS_POSITIONER
export const CSS_AUTOCOMPLETE_POPUP = cn(
  CSS_MENU_POPUP,
  'flex flex-col',
  'relative max-h-100 min-h-0 min-w-60 select-none overflow-hidden whitespace-nowrap',
)
export const CSS_AUTOCOMPLETE_POPUP_CONTENT = cn(
  'flex flex-col flex-1 min-h-0 overflow-y-auto p-1 bg-[canvas] overscroll-contain',
)

export const CSS_AUTOCOMPLETE_MENU_ITEM = cn(
  'relative flex items-center justify-between min-w-32 scroll-my-1 rounded-md px-3 py-1.5 text-sm',
  CSS_MENU_ITEM,
)
export const CSS_AUTOCOMPLETE_MENU_KEYBOARD = cn(
  'text-xs font-mono text-gray-400 dark:text-gray-500',
)

export const CSS_LANGUAGE_WRAPPER = cn(
  'relative mx-2 top-3 h-0 select-none overflow-visible text-xs',
)

export const CSS_LANGUAGE_SELECT = cn(
  'outline-unset focus:outline-unset relative box-border w-auto cursor-pointer select-none appearance-none rounded-sm border-none bg-transparent px-2 py-1 text-xs transition text-(--prosemirror-highlight)',
  // Only visible when hovering the code block
  'opacity-0 hover:opacity-80 [div[data-node-view-root]:hover_&]:opacity-50 hover:[div[data-node-view-root]:hover_&]:opacity-80',
)

const CSS_TOP_BAR = cn(
  'z-2 box-border',
  'border-gray-200 dark:border-gray-800 border-solid border-l-0 border-r-0 border-t-0 border-b',
)

export const CSS_TOOLBAR = cn(CSS_TOP_BAR, 'flex flex-wrap gap-1 p-2 items-center')

export const CSS_TOGGLE_BUTTON = cn(
  'outline-unset focus-visible:outline-unset flex items-center justify-center rounded-md p-2 font-medium transition focus-visible:ring-2 text-sm focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 disabled:pointer-events-none min-w-9 min-h-9',
  'text-gray-900 dark:text-gray-50 disabled:text-gray-900/50 dark:disabled:text-gray-50/50',
  'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 data-[state=on]:bg-gray-200 dark:data-[state=on]:bg-gray-700',
)

export const CSS_IMAGE_UPLOAD_POSITIONER = CSS_POSITIONER
export const CSS_IMAGE_UPLOAD_CARD = cn(
  CSS_MENU_POPUP,
  'flex flex-col gap-y-4 p-6 text-sm w-sm',
)

export const CSS_IMAGE_UPLOAD_INPUT = cn(CSS_INPUT)

export const CSS_IMAGE_UPLOAD_BUTTON = cn(
  CSS_BUTTON_BASE,
  CSS_BUTTON_VARIANT_PRIMARY,
  CSS_BUTTON_SIZE_DEFAULT,
  'w-full',
)

export const CSS_IMAGE_RESIZABLE = cn(
  'relative flex items-center justify-center box-border overflow-hidden my-2 group',
  'max-h-150 max-w-full min-h-16 min-w-16',
  'outline-2 outline-transparent data-selected:outline-blue-500 outline-solid',
)

export const CSS_IMAGE_RESIZABLE_IMAGE = cn(
  'h-full w-full max-w-full max-h-full object-contain',
)

export const CSS_IMAGE_RESIZABLE_HANDLE = cn(
  'absolute bottom-0 right-0 rounded-sm m-1.5 p-1 transition',
  'bg-gray-900/30 active:bg-gray-800/60 hover:bg-gray-800/60 text-white/50 active:text-white/80',
  'active:translate-x-0.5 active:translate-y-0.5',
  // Only visible when hovering the image block
  'opacity-0 hover:opacity-100 group-hover:opacity-100 group-data-resizing:opacity-100',
)

export const CSS_IMAGE_UPLOAD_PROGRESS = cn(
  'absolute bottom-0 left-0 m-1 flex content-center items-center gap-2 rounded-sm bg-gray-800/60 p-1.5 text-xs text-white/80 transition',
)

export const CSS_IMAGE_UPLOAD_ERROR = cn(
  'absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center gap-4 bg-gray-200 p-2 text-sm dark:bg-gray-800 @container',
)

export const CSS_IMAGE_UPLOAD_ERROR_MESSAGE = cn('hidden opacity-80 @xs:block')

export const CSS_DROP_CURSOR = cn('transition-all bg-blue-500')
export const CSS_DROP_INDICATOR = cn('z-50 transition-all bg-blue-500')

export const CSS_BLOCK_HANDLE_POSITIONER = CSS_POSITIONER
export const CSS_BLOCK_HANDLE_POPUP = CSS_POPUP

export const CSS_BLOCK_HANDLE_ADD = cn(
  // "h-6" currently matches a 24px paragraph line-height (with a 16px base font size and line-height 1.5); if the base font size changes, this equivalence may no longer hold.
  'h-6 w-6',
  'cursor-pointer',
  'flex items-center box-border justify-center',
  'hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm text-gray-500/50 dark:text-gray-400/50',
)

export const CSS_BLOCK_HANDLE_DRAG = cn(
  'h-6 w-5',
  'cursor-grab',
  'flex items-center box-border justify-center',
  'hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm text-gray-500/50 dark:text-gray-400/50',
)

export const CSS_TABLE_HANDLE_COLUMN_POSITIONER = CSS_POSITIONER
export const CSS_TABLE_HANDLE_ROW_POSITIONER = CSS_POSITIONER

export const CSS_TABLE_HANDLE_COLUMN_POPUP = cn(
  'translate-y-[50%]',
  CSS_POPUP,
)

export const CSS_TABLE_HANDLE_ROW_POPUP = cn(
  'ltr:translate-x-[50%] rtl:translate-x-[-50%]',
  CSS_POPUP,
)

const CSS_TABLE_HANDLE_TRIGGER_BASE = cn(
  'flex items-center box-border justify-center bg-[canvas] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm text-gray-500/50 dark:text-gray-400/50 border border-gray-200 dark:border-gray-800 border-solid p-0 transition-colors',
  'overflow-clip',
)

export const CSS_TABLE_COLUMN_HANDLE_TRIGGER = cn(
  'h-4.5 w-6',
  CSS_TABLE_HANDLE_TRIGGER_BASE,
)

export const CSS_TABLE_ROW_HANDLE_TRIGGER = cn(
  'h-6 w-4.5',
  CSS_TABLE_HANDLE_TRIGGER_BASE,
)

export const CSS_TABLE_MENU_POSITIONER = CSS_POSITIONER

export const CSS_TABLE_MENU_POPUP = cn(
  CSS_MENU_POPUP,
  'relative flex flex-col max-h-100 min-w-32 select-none overflow-auto whitespace-nowrap p-1 outline-none ',
)

export const CSS_TABLE_CELL_MENU_ITEM = cn(
  'relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 cursor-default',
  'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50',
  'data-danger:text-red-500',
  CSS_MENU_ITEM,
)

export const CSS_TABLE_CELL_MENU_ITEM_SHORTCUT = cn(
  'text-xs tracking-widest text-gray-500 dark:text-gray-500',
)

export const CSS_TOOLTIP_TRIGGER = cn('block')
export const CSS_TOOLTIP_POSITIONER = CSS_POSITIONER
export const CSS_TOOLTIP_POPUP = cn(
  CSS_POPUP,
  'overflow-hidden rounded-md border border-solid bg-gray-900 dark:bg-gray-50 px-3 py-1.5 text-xs text-gray-50 dark:text-gray-900 shadow-xs text-nowrap',
)

export const CSS_SEARCH = cn(
  CSS_TOP_BAR,
  'grid grid-cols-[min-content_1fr_min-content] gap-2 p-2',
)

export const CSS_SEARCH_ICON_BUTTON = cn(
  CSS_BUTTON_BASE,
  CSS_BUTTON_VARIANT_SECONDARY,
  CSS_BUTTON_SIZE_ICON,
)

export const CSS_SEARCH_TEXT_BUTTON = cn(
  CSS_BUTTON_BASE,
  CSS_BUTTON_VARIANT_SECONDARY,
  CSS_BUTTON_SIZE_DEFAULT,
)

export const CSS_BUTTON_PRIMARY = cn(
  CSS_BUTTON_BASE,
  CSS_BUTTON_VARIANT_PRIMARY,
  CSS_BUTTON_SIZE_DEFAULT,
)

export const CSS_SEARCH_INPUT = cn(CSS_INPUT, 'col-start-2')
export const CSS_SEARCH_CONTROLLER = cn('flex items-center justify-between gap-1')

export const CSS_KEYMAP_FIELDSET = cn(
  'mt-4 box-border flex max-w-full w-full overflow-x-auto border p-4 rounded-md shadow-sm min-w-0',
)

export const CSS_TOGGLE_ROTATE = 'transition-transform data-rotate:rotate-90'

export const CSS_ICON_ITALIC = cn('i-lucide-italic size-5 block')
export const CSS_ICON_BOLD = cn('i-lucide-bold size-5 block')
export const CSS_ICON_UNDERLINE = cn('i-lucide-underline size-5 block')
export const CSS_ICON_STRIKETHROUGH = cn('i-lucide-strikethrough size-5 block')
export const CSS_ICON_CODE = cn('i-lucide-code size-5 block')
export const CSS_ICON_H1 = cn('i-lucide-heading-1 size-5 block')
export const CSS_ICON_H2 = cn('i-lucide-heading-2 size-5 block')
export const CSS_ICON_H3 = cn('i-lucide-heading-3 size-5 block')
export const CSS_ICON_H4 = cn('i-lucide-heading-4 size-5 block')
export const CSS_ICON_H5 = cn('i-lucide-heading-5 size-5 block')
export const CSS_ICON_H6 = cn('i-lucide-heading-6 size-5 block')
export const CSS_ICON_UNDO = cn('i-lucide-undo-2 size-5 block')
export const CSS_ICON_REDO = cn('i-lucide-redo-2 size-5 block')
export const CSS_ICON_IMAGE = cn('i-lucide-image size-5 block')
export const CSS_ICON_LINK = cn('i-lucide-link size-5 block')
export const CSS_ICON_LIST_BULLET = cn('i-lucide-list size-5 block')
export const CSS_ICON_LIST_ORDERED = cn('i-lucide-list-ordered size-5 block')
export const CSS_ICON_LIST_TASK = cn('i-lucide-list-checks size-5 block')
export const CSS_ICON_LIST_TOGGLE = cn('i-lucide-list-collapse size-5 block')
export const CSS_ICON_LIST_INDENT = cn('i-lucide-indent-increase size-5 block')
export const CSS_ICON_LIST_DEDENT = cn('i-lucide-indent-decrease size-5 block')
export const CSS_ICON_CODE_BLOCK = cn('i-lucide-square-code size-5 block')
export const CSS_ICON_CORNER_HANDLE = cn('i-lucide-arrow-down-right size-4 block')
export const CSS_ICON_LOADER = cn('i-lucide-loader-circle size-4 animate-spin block')
export const CSS_ICON_DRAG_HANDLE = cn('i-lucide-grip-vertical size-5 block')
export const CSS_ICON_PLUS = cn('i-lucide-plus size-5 block')
export const CSS_ICON_SEARCH = cn('i-lucide-search size-5 block')
export const CSS_ICON_CLOSE = cn('i-lucide-x size-5 block')
export const CSS_ICON_ARROW_LEFT = cn('i-lucide-arrow-left size-5 block')
export const CSS_ICON_ARROW_RIGHT = cn('i-lucide-arrow-right size-5 block')
export const CSS_ICON_CHEVRON_RIGHT = cn('i-lucide-chevron-right size-5 block')
export const CSS_ICON_TABLE_COLUMN_HANDLE = cn('i-lucide-grip-horizontal size-5 min-h-5 min-w-5 block')
export const CSS_ICON_TABLE_ROW_HANDLE = cn('i-lucide-grip-vertical size-5 min-h-5 min-w-5 block')
export const CSS_ICON_BLOCKQUOTE = cn('i-lucide-text-quote size-5 block')
export const CSS_ICON_MINUS = cn('i-lucide-minus size-5 block')
export const CSS_ICON_IMAGE_ERROR = cn('i-lucide-image-off size-8 block')
