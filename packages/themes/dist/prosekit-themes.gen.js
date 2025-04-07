function replaceShortcuts(code, shortcuts) {
  const keys = Object.keys(shortcuts);
  keys.sort((a, b) => b.length - a.length);
  for (const key of keys) {
    code = replaceShortcut(code, key, shortcuts[key]);
  }
  return code;
}
function replaceShortcut(code, source, target) {
  if (target.includes(`'`)) {
    throw new Error("Target cannot contain single quotes: " + target);
  }
  return code
    .replaceAll(` :class="Themes.${source}"`, ` class='${target}'`)
    .replaceAll(` className={Themes.${source}}`, ` className='${target}'`)
    .replaceAll(` class={Themes.${source}}`, ` class='${target}'`)
    .replaceAll(` class=\${Themes.${source}}`, ` class='${target}'`)
    .replaceAll(`Themes.${source}`, `'${target}'`)
    .replaceAll(source, target);
}
function replaceImport(code) {
  return code.replace(
    /import\s*{\s*Themes\s*}\s*from\s*["']@prosekit\/themes["'];?\n+/m,
    "",
  );
}
function replaceThemesWith(code, shortcuts) {
  return replaceImport(replaceShortcuts(code, shortcuts));
}
var THEMES = {
  EDITOR_VIEWPORT:
    "box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow flex flex-col bg-white dark:bg-gray-950 color-black dark:color-white",
  EDITOR_SCROLLING: "relative w-full flex-1 box-border overflow-y-scroll",
  EDITOR_CONTENT:
    'ProseMirror box-border min-h-full px-[max(4rem,_calc(50%-20rem))] py-8 outline-none outline-0 [&_span[data-mention="user"]]:text-blue-500 [&_span[data-mention="tag"]]:text-violet-500',
  INLINE_MENU_MAIN:
    "z-10 box-border border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden relative flex min-w-[8rem] space-x-1 overflow-auto whitespace-nowrap rounded-md p-1",
  INLINE_MENU_LINK:
    "z-10 box-border border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden relative flex flex-col w-xs rounded-lg p-4 gap-y-2 items-stretch",
  INLINE_MENU_LINK_INPUT:
    "flex h-9 rounded-md w-full bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-none focus-visible:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50",
  INLINE_MENU_LINK_REMOVE_BUTTON:
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-50/90 h-9 px-3",
  AUTOCOMPLETE_MENU:
    "relative block max-h-[25rem] min-w-[15rem] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden",
  AUTOCOMPLETE_MENU_ITEM:
    "relative flex items-center justify-between min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800",
  AUTOCOMPLETE_MENU_KEYBOARD:
    "text-xs font-mono text-gray-400 dark:text-gray-500",
  LANGUAGE_WRAPPER:
    "relative mx-2 top-3 h-0 select-none overflow-visible text-xs",
  LANGUAGE_SELECT:
    "outline-unset focus:outline-unset relative box-border w-auto cursor-pointer select-none appearance-none rounded border-none bg-transparent px-2 py-1 text-xs transition text-[var(--prosemirror-highlight)] opacity-0 hover:opacity-80 [div[data-node-view-root]:hover_&]:opacity-50 [div[data-node-view-root]:hover_&]:hover:opacity-80",
  TOOLBAR:
    "z-2 box-border border-gray-200 dark:border-gray-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center",
  TOGGLE_BUTTON:
    "outline-unset focus-visible:outline-unset flex items-center justify-center rounded-md p-2 font-medium transition focus-visible:ring-2 text-sm focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 disabled:pointer-events-none min-w-9 min-h-9 disabled:opacity-50 hover:disabled:opacity-50 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 data-[state=on]:bg-gray-200 dark:data-[state=on]:bg-gray-700",
  IMAGE_UPLOAD_CARD:
    "flex flex-col gap-y-4 p-6 text-sm w-sm z-10 box-border rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden will-change-transform data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:animate-duration-150 data-[state=closed]:animate-duration-200 data-[side=bottom]:slide-in-from-top-2 data-[side=bottom]:slide-out-to-top-2 data-[side=left]:slide-in-from-right-2 data-[side=left]:slide-out-to-right-2 data-[side=right]:slide-in-from-left-2 data-[side=right]:slide-out-to-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=top]:slide-out-to-bottom-2",
  IMAGE_UPLOAD_INPUT:
    "flex h-9 rounded-md w-full bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-none focus-visible:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50",
  IMAGE_UPLOAD_BUTTON:
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-50/90 h-10 px-4 py-2 w-full",
  IMAGE_RESIZEALE:
    "relative flex items-center justify-center box-border overflow-hidden my-2 group max-h-[600px] max-w-full min-h-[64px] min-w-[64px] outline-2 outline-transparent data-[selected]:outline-blue-500 outline-solid",
  IMAGE_RESIZEALE_IMAGE: "h-full w-full max-w-full max-h-full object-contain",
  IMAGE_RESIZEALE_HANDLE:
    "absolute bottom-0 right-0 rounded m-1.5 p-1 transition bg-gray-900/30 active:bg-gray-800/60 hover:bg-gray-800/60 text-white/50 active:text-white/80 active:translate-x-0.5 active:translate-y-0.5 opacity-0 hover:opacity-100 group-hover:opacity-100 group-[[data-resizing]]:opacity-100",
  IMAGE_UPLOAD_PROGRESS:
    "absolute bottom-0 left-0 m-1 flex content-center items-center gap-2 rounded bg-gray-800/60 p-1.5 text-xs text-white/80 transition",
  IMAGE_UPLOAD_ERROR:
    "absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center gap-4 bg-gray-200 p-2 text-sm dark:bg-gray-800 @container",
  IMAGE_UPLOAD_ERROR_MESSAGE: "hidden opacity-80 @xs:block",
  DROP_CURSOR: "transition-all bg-blue-500",
  BLOCK_HANDLE_POPOVER:
    "flex items-center flex-row box-border justify-center transition border-0 [&:not([data-state])]:hidden will-change-transform data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:animate-duration-150 data-[state=closed]:animate-duration-200",
  BLOCK_HANDLE_ADD:
    "flex items-center box-border justify-center h-[1.5em] w-[1.5em] hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-500/50 dark:text-gray-500/50 cursor-pointer",
  BLOCK_HANDLE_DRAG:
    "flex items-center box-border justify-center h-[1.5em] w-[1.2em] hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-500/50 dark:text-gray-500/50 cursor-grab",
  TABLE_COLUMN_HANDLE:
    "flex items-center box-border justify-center h-[1.2em] w-[1.5em] bg-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-500/50 dark:text-gray-500/50 translate-y-3 border border-gray-200 dark:border-gray-800 border-solid [&:not([data-state])]:hidden will-change-transform data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:animate-duration-150 data-[state=closed]:animate-duration-200",
  TABLE_ROW_HANDLE:
    "flex items-center box-border justify-center h-[1.5em] w-[1.2em] bg-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-500/50 dark:text-gray-500/50 translate-x-3 border border-gray-200 dark:border-gray-800 border-solid [&:not([data-state])]:hidden will-change-transform data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:animate-duration-150 data-[state=closed]:animate-duration-200",
  TABLE_ROOT_HANDLE:
    "flex items-center box-border justify-center h-[1.2em] w-[1.2em] bg-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-500/50 dark:text-gray-500/50 border translate-x-4 -translate-y-4 border-gray-200 dark:border-gray-800 border-solid [&:not([data-state])]:hidden will-change-transform data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:animate-duration-150 data-[state=closed]:animate-duration-200",
  TABLE_HANDLE_MENU:
    "relative block max-h-[25rem] min-w-[8rem] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden",
  TABLE_CELL_MENU_ITEM:
    "relative min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800",
  TABLE_CELL_MENU_ITEM_SHORTCUT:
    "text-xs tracking-widest text-gray-500 dark:text-gray-500",
  TOOLTIP_TRIGGER: "block",
  TOOLTIP_CONTENT:
    "z-50 overflow-hidden rounded-md border border-solid bg-gray-900 dark:bg-gray-50 px-3 py-1.5 text-xs text-gray-50 dark:text-gray-900 shadow-sm [&:not([data-state])]:hidden will-change-transform data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:animate-duration-150 data-[state=closed]:animate-duration-200 data-[side=bottom]:slide-in-from-top-2 data-[side=bottom]:slide-out-to-top-2 data-[side=left]:slide-in-from-right-2 data-[side=left]:slide-out-to-right-2 data-[side=right]:slide-in-from-left-2 data-[side=right]:slide-out-to-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=top]:slide-out-to-bottom-2",
  SEARCH:
    "z-2 box-border border-gray-200 dark:border-gray-800 border-solid border-l-0 border-r-0 border-t-0 border-b grid grid-cols-[min-content_1fr_min-content] gap-2 p-2",
  SEARCH_ICON_BUTTON:
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 h-10 w-10",
  SEARCH_TEXT_BUTTON:
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 h-10 px-4 py-2",
  BUTTON_PRIMARY:
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-50/90 h-10 px-4 py-2",
  SEARCH_INPUT:
    "flex h-9 rounded-md w-full bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-none focus-visible:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 col-start-2",
  SEARCH_CONTROLLER: "flex items-center justify-between gap-1",
  KEYMAP_FIELDSET:
    "mt-4 box-border flex max-w-full w-full overflow-x-auto border p-4 rounded-md shadow min-w-0",
  ICON_ITALIC: "i-lucide-italic h-5 w-5",
  ICON_BOLD: "i-lucide-bold h-5 w-5",
  ICON_UNDERLINE: "i-lucide-underline h-5 w-5",
  ICON_STRIKE: "i-lucide-strikethrough h-5 w-5",
  ICON_CODE: "i-lucide-code h-5 w-5",
  ICON_H1: "i-lucide-heading-1 h-5 w-5",
  ICON_H2: "i-lucide-heading-2 h-5 w-5",
  ICON_H3: "i-lucide-heading-3 h-5 w-5",
  ICON_H4: "i-lucide-heading-4 h-5 w-5",
  ICON_H5: "i-lucide-heading-5 h-5 w-5",
  ICON_H6: "i-lucide-heading-6 h-5 w-5",
  ICON_UNDO: "i-lucide-undo-2 h-5 w-5",
  ICON_REDO: "i-lucide-redo-2 h-5 w-5",
  ICON_IMAGE: "i-lucide-image h-5 w-5",
  ICON_LINK: "i-lucide-link h-5 w-5",
  ICON_LIST_BULLET: "i-lucide-list h-5 w-5",
  ICON_LIST_ORDERED: "i-lucide-list-ordered h-5 w-5",
  ICON_LIST_TASK: "i-lucide-list-checks h-5 w-5",
  ICON_LIST_TOGGLE: "i-lucide-list-collapse h-5 w-5",
  ICON_LIST_INDENT: "i-lucide-indent-increase h-5 w-5",
  ICON_LIST_DEDENT: "i-lucide-indent-decrease h-5 w-5",
  ICON_CODE_BLOCK: "i-lucide-square-code h-5 w-5",
  ICON_CORNER_HANDLE: "i-lucide-arrow-down-right h-4 w-4",
  ICON_LOADER: "i-lucide-loader-circle h-4 w-4 animate-spin",
  ICON_DRAG_HANDLE: "i-lucide-grip-vertical h-5 w-5",
  ICON_PLUS: "i-lucide-plus h-5 w-5",
  ICON_SEARCH: "i-lucide-search h-5 w-5",
  ICON_CLOSE: "i-lucide-x h-5 w-5",
  ICON_ARROW_LEFT: "i-lucide-arrow-left h-5 w-5",
  ICON_ARROW_RIGHT: "i-lucide-arrow-right h-5 w-5",
  ICON_CHEVRON_RIGHT: "i-lucide-chevron-right h-5 w-5",
  ICON_TABLE_COLUMN_HANDLE: "i-lucide-grip-horizontal h-5 w-5",
  ICON_TABLE_ROW_HANDLE: "i-lucide-grip-vertical h-5 w-5",
  ICON_BLOCKQUOTE: "i-lucide-text-quote h-5 w-5",
  ICON_MINUS: "i-lucide-minus h-5 w-5",
  ICON_IMAGE_ERROR: "i-lucide-image-off h-8 w-8",
};
function replaceThemes(code) {
  return replaceThemesWith(code, THEMES);
}
export { THEMES as Themes, replaceThemes };
