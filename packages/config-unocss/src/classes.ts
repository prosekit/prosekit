// @unocss-include

import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { replaceColor } from './colors'

function cn(...args: Array<string | undefined | null | false>): string {
  return twMerge(replaceColor(clsx(...args)))
}

// For those elements that need to toggle visibility based on the `data-state`
// attribute, we hide them by default. This ensures that they do not get
// displayed before SSR hydration is complete.
const CSS_DEFAULT_HIDDEN = '[&:not([data-state])]:hidden'

const CSS_FLOATING_MENU = cn(
  'z-10 box-border rounded-lg border border-border bg-background shadow-lg',
  CSS_DEFAULT_HIDDEN,
)

const CSS_PRESENCE_ANIMATE = cn(
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

const CSS_POPOVER_ANIMATE = cn(
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

const CSS_FLOATING_MENU_ITEM = cn(
  'box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-secondary',
)

const CSS_BUTTON_BASE = cn(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0',
)

const CSS_BUTTON_VARIANT_PRIMARY = cn(
  'bg-primary text-primary-foreground hover:bg-primary/90',
)

const CSS_BUTTON_VARIANT_SECONDARY = cn(
  'bg-secondary text-secondary-foreground hover:bg-secondary/80',
)

const CSS_BUTTON_SIZE_DEFAULT = 'h-10 px-4 py-2'
const CSS_BUTTON_SIZE_SM = 'h-9 px-3'
// const CSS_BUTTON_SIZE_LG = 'h-1 px-8'
const CSS_BUTTON_SIZE_ICON = 'h-10 w-10'

const CSS_INPUT = cn(
  'flex h-9 rounded-md w-full bg-background px-3 py-2 text-sm placeholder:text-muted-foreground transition',
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

// The outermost container of the editor. It limits the height of the editor.
export const CSS_EDITOR_VIEWPORT = cn(
  'box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow flex flex-col bg-background color-black dark:color-white',
)

// A scrolling container for the editor content and floating menus.
export const CSS_EDITOR_SCROLLING = cn(
  'relative w-full flex-1 box-border overflow-y-scroll',
)

// Use this class for the contenteditable element.
export const CSS_EDITOR_CONTENT = cn(
  // SolidJS will override the class name which removes the ProseMirror class, so we add it back.
  'ProseMirror',
  'box-border min-h-full px-[max(4rem,_calc(50%-20rem))] py-8 outline-none outline-0',
  '[&_span[data-mention=user]]:text-blue-500',
  '[&_span[data-mention=tag]]:text-violet-500',
)

export const CSS_INLINE_MENU_MAIN = cn(
  CSS_FLOATING_MENU,
  'relative flex min-w-[8rem] space-x-1 overflow-auto whitespace-nowrap rounded-md p-1',
)

export const CSS_INLINE_MENU_LINK = cn(
  CSS_FLOATING_MENU,
  'relative flex flex-col w-xs rounded-lg p-4 gap-y-2 items-stretch',
)

export const CSS_INLINE_MENU_LINK_INPUT = cn(CSS_INPUT)

export const CSS_INLINE_MENU_LINK_REMOVE_BUTTON = cn(
  CSS_BUTTON_BASE,
  CSS_BUTTON_VARIANT_PRIMARY,
  CSS_BUTTON_SIZE_SM,
)

export const CSS_AUTOCOMPLETE_MENU = cn(
  'relative block max-h-[25rem] min-w-[15rem] select-none overflow-auto whitespace-nowrap p-1',
  CSS_FLOATING_MENU,
)

export const CSS_AUTOCOMPLETE_MENU_ITEM = cn(
  'relative flex items-center justify-between min-w-[8rem] scroll-my-1 rounded px-3 py-1.5',
  CSS_FLOATING_MENU_ITEM,
)

export const CSS_AUTOCOMPLETE_MENU_KEYBOARD = cn(
  'text-xs font-mono text-gray-400 dark:text-gray-500',
)

export const CSS_LANGUAGE_WRAPPER = cn(
  'relative mx-2 top-3 h-0 select-none overflow-visible text-xs',
)

export const CSS_LANGUAGE_SELECT = cn(
  'outline-unset focus:outline-unset relative box-border w-auto cursor-pointer select-none appearance-none rounded border-none bg-transparent px-2 py-1 text-xs transition text-[var(--prosemirror-highlight)]',
  // Only visible when hovering the code block
  'opacity-0 hover:opacity-80 [div[data-node-view-root]:hover_&]:opacity-50 [div[data-node-view-root]:hover_&]:hover:opacity-80',
)

const CSS_TOP_BAR = cn(
  'z-2 box-border',
  'border-border border-solid border-l-0 border-r-0 border-t-0 border-b',
)

export const CSS_TOOLBAR = cn(CSS_TOP_BAR, 'flex flex-wrap gap-1 p-2 items-center')

export const CSS_TOGGLE_BUTTON = cn(
  'outline-unset focus-visible:outline-unset flex items-center justify-center rounded-md p-2 font-medium transition focus-visible:ring-2 text-sm focus-visible:ring-ring disabled:pointer-events-none min-w-9 min-h-9',
  'disabled:opacity-50 hover:disabled:opacity-50',
  'bg-transparent hover:bg-secondary data-[state=on]:bg-accent',
)

export const CSS_IMAGE_UPLOAD_CARD = cn(
  'flex flex-col gap-y-4 p-6 text-sm w-sm',
  CSS_FLOATING_MENU,
  CSS_POPOVER_ANIMATE,
)

export const CSS_IMAGE_UPLOAD_INPUT = cn(CSS_INPUT)

export const CSS_IMAGE_UPLOAD_BUTTON = cn(
  CSS_BUTTON_BASE,
  CSS_BUTTON_VARIANT_PRIMARY,
  CSS_BUTTON_SIZE_DEFAULT,
  'w-full',
)

export const CSS_IMAGE_RESIZEALE = cn(
  'relative flex items-center justify-center box-border overflow-hidden my-2 group',
  'max-h-[600px] max-w-full min-h-[64px] min-w-[64px]',
  'outline-2 outline-transparent data-[selected]:outline-blue-500 outline-solid',
)

export const CSS_IMAGE_RESIZEALE_IMAGE = cn(
  'h-full w-full max-w-full max-h-full object-contain',
)

export const CSS_IMAGE_RESIZEALE_HANDLE = cn(
  'absolute bottom-0 right-0 rounded m-1.5 p-1 transition',
  'bg-gray-900/30 active:bg-gray-800/60 hover:bg-gray-800/60 text-white/50 active:text-white/80',
  'active:translate-x-0.5 active:translate-y-0.5',
  // Only visible when hovering the image block
  'opacity-0 hover:opacity-100 group-hover:opacity-100 group-[[data-resizing]]:opacity-100',
)

export const CSS_IMAGE_UPLOAD_PROGRESS = cn(
  'absolute bottom-0 left-0 m-1 flex content-center items-center gap-2 rounded bg-gray-800/60 p-1.5 text-xs text-white/80 transition',
)

export const CSS_IMAGE_UPLOAD_ERROR = cn(
  'absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center gap-4 bg-gray-200 p-2 text-sm dark:bg-gray-800 @container',
)

export const CSS_IMAGE_UPLOAD_ERROR_MESSAGE = cn('hidden opacity-80 @xs:block')

export const CSS_DROP_CURSOR = cn('transition-all bg-blue-500')

export const CSS_BLOCK_HANDLE_POPOVER = cn(
  'flex items-center flex-row box-border justify-center transition border-0',
  CSS_PRESENCE_ANIMATE,
)

export const CSS_BLOCK_HANDLE_ADD = cn(
  'flex items-center box-border justify-center h-[1.5em] w-[1.5em] hover:bg-secondary rounded text-muted-foreground/50 cursor-pointer',
)

export const CSS_BLOCK_HANDLE_DRAG = cn(
  'flex items-center box-border justify-center h-[1.5em] w-[1.2em] hover:bg-secondary rounded text-muted-foreground/50 cursor-grab',
)

export const CSS_TABLE_COLUMN_HANDLE = cn(
  'flex items-center box-border justify-center h-[1.2em] w-[1.5em] bg-white hover:bg-secondary rounded text-muted-foreground/50 translate-y-3 border border-border border-solid',
  CSS_PRESENCE_ANIMATE,
)

export const CSS_TABLE_ROW_HANDLE = cn(
  'flex items-center box-border justify-center h-[1.5em] w-[1.2em] bg-white hover:bg-secondary rounded text-muted-foreground/50 translate-x-3 border border-border border-solid',
  CSS_PRESENCE_ANIMATE,
)

export const CSS_TABLE_ROOT_HANDLE = cn(
  'flex items-center box-border justify-center h-[1.2em] w-[1.2em] bg-white hover:bg-secondary rounded text-muted-foreground/50 border translate-x-4 -translate-y-4 border-border border-solid',
  CSS_PRESENCE_ANIMATE,
)

export const CSS_TABLE_HANDLE_MENU = cn(
  'relative block max-h-[25rem] min-w-[8rem] select-none overflow-auto whitespace-nowrap p-1',
  CSS_FLOATING_MENU,
)

export const CSS_TABLE_CELL_MENU_ITEM = cn(
  'relative min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 flex items-center justify-between gap-8 cursor-default',
  'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50',
  CSS_FLOATING_MENU_ITEM,
)

export const CSS_TABLE_CELL_MENU_ITEM_SHORTCUT = cn(
  'text-xs tracking-widest text-muted-foreground',
)

export const CSS_TOOLTIP_TRIGGER = cn('block')
export const CSS_TOOLTIP_CONTENT = cn(
  'z-50 overflow-hidden rounded-md border border-solid bg-primary px-3 py-1.5 text-xs text-primary-foreground shadow-sm',
  CSS_POPOVER_ANIMATE,
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
  'mt-4 box-border flex max-w-full w-full overflow-x-auto border p-4 rounded-md shadow min-w-0',
)

export const CSS_TOGGLE_ROTATE = 'transition-transform data-[rotate]:rotate-90'

export const CSS_ICON_ITALIC = cn('i-lucide-italic h-5 w-5')
export const CSS_ICON_BOLD = cn('i-lucide-bold h-5 w-5')
export const CSS_ICON_UNDERLINE = cn('i-lucide-underline h-5 w-5')
export const CSS_ICON_STRIKE = cn('i-lucide-strikethrough h-5 w-5')
export const CSS_ICON_CODE = cn('i-lucide-code h-5 w-5')
export const CSS_ICON_H1 = cn('i-lucide-heading-1 h-5 w-5')
export const CSS_ICON_H2 = cn('i-lucide-heading-2 h-5 w-5')
export const CSS_ICON_H3 = cn('i-lucide-heading-3 h-5 w-5')
export const CSS_ICON_H4 = cn('i-lucide-heading-4 h-5 w-5')
export const CSS_ICON_H5 = cn('i-lucide-heading-5 h-5 w-5')
export const CSS_ICON_H6 = cn('i-lucide-heading-6 h-5 w-5')
export const CSS_ICON_UNDO = cn('i-lucide-undo-2 h-5 w-5')
export const CSS_ICON_REDO = cn('i-lucide-redo-2 h-5 w-5')
export const CSS_ICON_IMAGE = cn('i-lucide-image h-5 w-5')
export const CSS_ICON_LINK = cn('i-lucide-link h-5 w-5')
export const CSS_ICON_LIST_BULLET = cn('i-lucide-list h-5 w-5')
export const CSS_ICON_LIST_ORDERED = cn('i-lucide-list-ordered h-5 w-5')
export const CSS_ICON_LIST_TASK = cn('i-lucide-list-checks h-5 w-5')
export const CSS_ICON_LIST_TOGGLE = cn('i-lucide-list-collapse h-5 w-5')
export const CSS_ICON_LIST_INDENT = cn('i-lucide-indent-increase h-5 w-5')
export const CSS_ICON_LIST_DEDENT = cn('i-lucide-indent-decrease h-5 w-5')
export const CSS_ICON_CODE_BLOCK = cn('i-lucide-square-code h-5 w-5')
export const CSS_ICON_CORNER_HANDLE = cn('i-lucide-arrow-down-right h-4 w-4')
export const CSS_ICON_LOADER = cn('i-lucide-loader-circle h-4 w-4 animate-spin')
export const CSS_ICON_DRAG_HANDLE = cn('i-lucide-grip-vertical h-5 w-5')
export const CSS_ICON_PLUS = cn('i-lucide-plus h-5 w-5')
export const CSS_ICON_SEARCH = cn('i-lucide-search h-5 w-5')
export const CSS_ICON_CLOSE = cn('i-lucide-x h-5 w-5')
export const CSS_ICON_ARROW_LEFT = cn('i-lucide-arrow-left h-5 w-5')
export const CSS_ICON_ARROW_RIGHT = cn('i-lucide-arrow-right h-5 w-5')
export const CSS_ICON_CHEVRON_RIGHT = cn('i-lucide-chevron-right h-5 w-5')
export const CSS_ICON_TABLE_COLUMN_HANDLE = cn('i-lucide-grip-horizontal h-5 w-5')
export const CSS_ICON_TABLE_ROW_HANDLE = cn('i-lucide-grip-vertical h-5 w-5')
export const CSS_ICON_BLOCKQUOTE = cn('i-lucide-text-quote h-5 w-5')
export const CSS_ICON_MINUS = cn('i-lucide-minus h-5 w-5')
export const CSS_ICON_IMAGE_ERROR = cn('i-lucide-image-off h-8 w-8')
